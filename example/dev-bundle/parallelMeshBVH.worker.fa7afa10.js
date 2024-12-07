importScripts("./generateMeshBVH.worker.b472b5d6.js");
// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"apS16":[function(require,module,exports,__globalThis) {
var _three = require("three");
var _workerPoolJs = require("./utils/WorkerPool.js");
var _constantsJs = require("../core/Constants.js");
var _buildTreeJs = require("../core/build/buildTree.js");
var _buildUtilsJs = require("../core/build/buildUtils.js");
var _computeBoundsUtilsJs = require("../core/build/computeBoundsUtils.js");
var _geometryUtilsJs = require("../core/build/geometryUtils.js");
var _meshBVHJs = require("../core/MeshBVH.js");
let isRunning = false;
let prevTime = 0;
const workerPool = new (0, _workerPoolJs.WorkerPool)(()=>new Worker(require("39a2e3d5355e7366")));
onmessage = async ({ data })=>{
    if (isRunning) throw new Error('Worker is already running a task.');
    const { operation } = data;
    if (operation === 'BUILD_BVH') {
        isRunning = true;
        const { maxWorkerCount, index, position, options } = data;
        // initialize the number of workers balanced for a binary tree
        workerPool.setWorkerCount((0, _three.MathUtils).floorPowerOfTwo(maxWorkerCount));
        // generate necessary buffers and objects
        const geometry = getGeometry(index, position);
        const geometryRanges = options.indirect ? (0, _geometryUtilsJs.getFullGeometryRange)(geometry) : (0, _geometryUtilsJs.getRootIndexRanges)(geometry);
        const indirectBuffer = options.indirect ? (0, _buildTreeJs.generateIndirectBuffer)(geometry, true) : null;
        const triCount = (0, _geometryUtilsJs.getTriCount)(geometry);
        const triangleBounds = new Float32Array(new SharedArrayBuffer(triCount * 24));
        // generate portions of the triangle bounds buffer over multiple frames
        const boundsPromises = [];
        for(let i = 0, l = workerPool.workerCount; i < l; i++){
            const countPerWorker = Math.ceil(triCount / l);
            const offset = i * countPerWorker;
            const count = Math.min(countPerWorker, triCount - offset);
            boundsPromises.push(workerPool.runSubTask(i, {
                operation: 'BUILD_TRIANGLE_BOUNDS',
                offset,
                count,
                index,
                position,
                triangleBounds
            }));
        }
        await Promise.all(boundsPromises);
        // create a proxy bvh structure
        const proxyBvh = {
            _indirectBuffer: indirectBuffer,
            geometry: geometry
        };
        let totalProgress = 0;
        const localOptions = {
            ...(0, _meshBVHJs.DEFAULT_OPTIONS),
            ...options,
            verbose: false,
            maxDepth: Math.round(Math.log2(workerPool.workerCount)),
            onProgress: options.includedProgressCallback ? getOnProgressDeltaCallback((delta)=>{
                totalProgress += 0.1 * delta;
                triggerOnProgress(totalProgress);
            }) : null
        };
        // generate the ranges for all roots asynchronously
        const packedRoots = [];
        for(let i = 0, l = geometryRanges.length; i < l; i++){
            // build the tree down to the necessary depth
            const promises = [];
            const range = geometryRanges[i];
            const root = (0, _buildTreeJs.buildTree)(proxyBvh, triangleBounds, range.offset, range.count, localOptions);
            const flatNodes = flattenNodes(root);
            let bufferLengths = 0;
            let remainingNodes = 0;
            let nextWorker = 0;
            // trigger workers for each generated leaf node
            for(let j = 0, l = flatNodes.length; j < l; j++){
                const node = flatNodes[j];
                const isLeaf = Boolean(node.count);
                if (isLeaf) {
                    // adjust the maxDepth to account for the depth we've already traversed
                    const workerOptions = {
                        ...(0, _meshBVHJs.DEFAULT_OPTIONS),
                        ...options
                    };
                    workerOptions.maxDepth = workerOptions.maxDepth - node.depth;
                    const pr = workerPool.runSubTask(nextWorker++, {
                        operation: 'BUILD_SUBTREE',
                        offset: node.offset,
                        count: node.count,
                        indirectBuffer,
                        index,
                        position,
                        triangleBounds,
                        options: workerOptions
                    }, getOnProgressDeltaCallback((delta)=>{
                        totalProgress += 0.9 * delta / nextWorker;
                        triggerOnProgress(totalProgress);
                    })).then((data)=>{
                        const buffer = data.buffer;
                        node.buffer = buffer;
                        bufferLengths += buffer.byteLength;
                    });
                    promises.push(pr);
                } else remainingNodes++;
            }
            // wait for the sub trees to complete
            await Promise.all(promises);
            const BufferConstructor = options.useSharedArrayBuffer ? SharedArrayBuffer : ArrayBuffer;
            const buffer = new BufferConstructor(bufferLengths + remainingNodes * (0, _constantsJs.BYTES_PER_NODE));
            (0, _buildUtilsJs.populateBuffer)(0, root, buffer);
            packedRoots.push(buffer);
        }
        // transfer the data back
        postMessage({
            error: null,
            serialized: {
                roots: packedRoots,
                index: index,
                indirectBuffer: indirectBuffer
            },
            position,
            progress: 1
        });
        isRunning = false;
    } else if (operation === 'BUILD_SUBTREE') {
        const { offset, count, indirectBuffer, index, position, triangleBounds, options } = data;
        const proxyBvh = {
            _indirectBuffer: indirectBuffer,
            geometry: getGeometry(index, position)
        };
        const localOptions = {
            ...(0, _meshBVHJs.DEFAULT_OPTIONS),
            ...options,
            onProgress: options.includedProgressCallback ? triggerOnProgress : null
        };
        const root = (0, _buildTreeJs.buildTree)(proxyBvh, triangleBounds, offset, count, localOptions);
        const nodeCount = (0, _buildUtilsJs.countNodes)(root);
        const buffer = new ArrayBuffer((0, _constantsJs.BYTES_PER_NODE) * nodeCount);
        (0, _buildUtilsJs.populateBuffer)(0, root, buffer);
        postMessage({
            type: 'result',
            buffer,
            progress: 1
        }, [
            buffer
        ]);
    } else if (operation === 'BUILD_TRIANGLE_BOUNDS') {
        const { index, position, triangleBounds, offset, count } = data;
        const geometry = getGeometry(index, position);
        (0, _computeBoundsUtilsJs.computeTriangleBounds)(geometry, triangleBounds, offset, count);
        postMessage({
            type: 'result'
        });
    } else if (operation === 'REFIT') ;
    else operation;
};
// Helper functions and utils
function getOnProgressDeltaCallback(cb) {
    let lastProgress = 0;
    return function onProgressDeltaCallback(progress) {
        cb(progress - lastProgress);
        lastProgress = progress;
    };
}
function triggerOnProgress(progress) {
    // account for error
    progress = Math.min(progress, 1);
    const currTime = performance.now();
    if (currTime - prevTime >= 10 && progress !== 1.0) {
        postMessage({
            error: null,
            progress,
            type: 'progress'
        });
        prevTime = currTime;
    }
}
function getGeometry(index, position) {
    const geometry = new (0, _three.BufferGeometry)();
    if (index) geometry.index = new (0, _three.BufferAttribute)(index, 1, false);
    geometry.setAttribute('position', new (0, _three.BufferAttribute)(position, 3));
    return geometry;
}
function flattenNodes(node) {
    const arr = [];
    traverse(node);
    return arr;
    function traverse(node, depth = 0) {
        node.depth = depth;
        arr.push(node);
        const isLeaf = Boolean(node.count);
        if (!isLeaf) {
            traverse(node.left, depth + 1);
            traverse(node.right, depth + 1);
        }
    }
}

},{"three":"eavIA","./utils/WorkerPool.js":"4s5nl","../core/Constants.js":"8Gz6D","../core/build/buildTree.js":"3qvTG","../core/build/buildUtils.js":"9kmhX","../core/build/computeBoundsUtils.js":"afLXC","../core/build/geometryUtils.js":"fP9CF","../core/MeshBVH.js":"lnYEU","39a2e3d5355e7366":"2gnP3"}],"4s5nl":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "WorkerPool", ()=>WorkerPool);
class WorkerPool {
    get workerCount() {
        return this.workers.length;
    }
    constructor(getWorkerCallback){
        this.workers = [];
        this._getWorker = getWorkerCallback;
    }
    setWorkerCount(count) {
        const workers = this.workers;
        while(workers.length < count)workers.push(this._getWorker());
        while(workers.length > count)workers.pop().terminate();
    }
    runSubTask(i, msg, onProgress) {
        return new Promise((resolve, reject)=>{
            const worker = this.workers[i];
            if (worker.isRunning) throw new Error(`${this.name}: Worker ${i} is already running.`);
            worker.isRunning = true;
            worker.postMessage(msg);
            worker.onerror = (e)=>{
                worker.isRunning = false;
                reject(e);
            };
            worker.onmessage = (e)=>{
                if (e.data.type === 'progress') {
                    if (onProgress) onProgress(e.data.progress);
                } else {
                    if (onProgress) onProgress(1);
                    worker.isRunning = false;
                    resolve(e.data);
                }
            };
        });
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"2gnP3":[function(require,module,exports,__globalThis) {
let workerURL = require("6890f787c7787ce2");
let bundleURL = require("fc36e37516bceca7");
let url = bundleURL.getBundleURL('2so9O') + "parallelMeshBVH.worker.fa7afa10.js";
module.exports = workerURL(url, bundleURL.getOrigin(url), false);

},{"6890f787c7787ce2":"6pzw8","fc36e37516bceca7":"acFkO"}],"6pzw8":[function(require,module,exports,__globalThis) {
"use strict";
module.exports = function(workerUrl, origin, isESM) {
    if (origin === self.location.origin) // If the worker bundle's url is on the same origin as the document,
    // use the worker bundle's own url.
    return workerUrl;
    else {
        // Otherwise, create a blob URL which loads the worker bundle with `importScripts`.
        var source = isESM ? 'import ' + JSON.stringify(workerUrl) + ';' : 'importScripts(' + JSON.stringify(workerUrl) + ');';
        return URL.createObjectURL(new Blob([
            source
        ], {
            type: 'application/javascript'
        }));
    }
};

},{}],"acFkO":[function(require,module,exports,__globalThis) {
"use strict";
var bundleURL = {};
function getBundleURLCached(id) {
    var value = bundleURL[id];
    if (!value) {
        value = getBundleURL();
        bundleURL[id] = value;
    }
    return value;
}
function getBundleURL() {
    try {
        throw new Error();
    } catch (err) {
        var matches = ('' + err.stack).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^)\n]+/g);
        if (matches) // The first two stack frames will be this function and getBundleURLCached.
        // Use the 3rd one, which will be a runtime in the original bundle.
        return getBaseURL(matches[2]);
    }
    return '/';
}
function getBaseURL(url) {
    return ('' + url).replace(/^((?:https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}
// TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.
function getOrigin(url) {
    var matches = ('' + url).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^/]+/);
    if (!matches) throw new Error('Origin not found');
    return matches[0];
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
exports.getOrigin = getOrigin;

},{}]},["apS16"], "apS16", "parcelRequire94c2")

//# sourceMappingURL=parallelMeshBVH.worker.fa7afa10.js.map

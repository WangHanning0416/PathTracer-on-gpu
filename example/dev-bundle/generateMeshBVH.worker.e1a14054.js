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
})({"2XVd3":[function(require,module,exports,__globalThis) {
var _three = require("three");
var _meshBVHJs = require("../core/MeshBVH.js");
onmessage = ({ data })=>{
    let prevTime = performance.now();
    function onProgressCallback(progress) {
        // account for error
        progress = Math.min(progress, 1);
        const currTime = performance.now();
        if (currTime - prevTime >= 10 && progress !== 1.0) {
            postMessage({
                error: null,
                serialized: null,
                position: null,
                progress
            });
            prevTime = currTime;
        }
    }
    const { index, position, options } = data;
    try {
        const geometry = new (0, _three.BufferGeometry)();
        geometry.setAttribute('position', new (0, _three.BufferAttribute)(position, 3, false));
        if (index) geometry.setIndex(new (0, _three.BufferAttribute)(index, 1, false));
        if (options.includedProgressCallback) options.onProgress = onProgressCallback;
        if (options.groups) {
            const groups = options.groups;
            for(const i in groups){
                const group = groups[i];
                geometry.addGroup(group.start, group.count, group.materialIndex);
            }
        }
        const bvh = new (0, _meshBVHJs.MeshBVH)(geometry, options);
        const serialized = (0, _meshBVHJs.MeshBVH).serialize(bvh, {
            copyIndexBuffer: false
        });
        let toTransfer = [
            position.buffer,
            ...serialized.roots
        ];
        if (serialized.index) toTransfer.push(serialized.index.buffer);
        toTransfer = toTransfer.filter((v)=>typeof SharedArrayBuffer === 'undefined' || !(v instanceof SharedArrayBuffer));
        if (bvh._indirectBuffer) toTransfer.push(serialized.indirectBuffer.buffer);
        postMessage({
            error: null,
            serialized,
            position,
            progress: 1
        }, toTransfer);
    } catch (error) {
        postMessage({
            error,
            serialized: null,
            position: null,
            progress: 1
        });
    }
};

},{"three":"eavIA","../core/MeshBVH.js":"lnYEU"}]},["2XVd3"], "2XVd3", "parcelRequire94c2")

//# sourceMappingURL=generateMeshBVH.worker.e1a14054.js.map

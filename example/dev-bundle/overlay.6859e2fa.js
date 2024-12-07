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
})({"iu4Bd":[function(require,module,exports,__globalThis) {
var _three = require("three");
var _orbitControlsJs = require("three/examples/jsm/controls/OrbitControls.js");
var _indexJs = require("../src/index.js");
var _rgbeloaderJs = require("three/examples/jsm/loaders/RGBELoader.js");
var _lilGuiModuleMinJs = require("three/examples/jsm/libs/lil-gui.module.min.js");
var _gltfloaderJs = require("three/examples/jsm/loaders/GLTFLoader.js");
var _meshoptDecoderModuleJs = require("three/examples/jsm/libs/meshopt_decoder.module.js");
var _parallelMeshBVHWorkerJs = require("three-mesh-bvh/src/workers/ParallelMeshBVHWorker.js");
var _getScaledSettingsJs = require("./utils/getScaledSettings.js");
var _loaderElementJs = require("./utils/LoaderElement.js");
const ENV_URL = 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/equirectangular/royal_esplanade_1k.hdr';
const MODEL_URL = 'https://raw.githubusercontent.com/gkjohnson/3d-demo-data/main/models/sd-macross-city-standoff-diorama/scene.glb';
const CREDITS = 'Model by tipatat on Sketchfab';
let pathTracer, renderer, controls, scene, camera;
let overlayScene, floatingObjects;
let loader;
const params = {
    // path tracer settings
    bounces: 5,
    renderScale: 1 / window.devicePixelRatio,
    filterGlossyFactor: 0.5,
    tiles: 1,
    multipleImportanceSampling: true,
    enabled: true,
    ...(0, _getScaledSettingsJs.getScaledSettings)()
};
init();
async function init() {
    loader = new (0, _loaderElementJs.LoaderElement)();
    loader.attach(document.body);
    // renderer
    renderer = new (0, _three.WebGLRenderer)({
        antialias: true
    });
    renderer.toneMapping = (0, _three.ACESFilmicToneMapping);
    document.body.appendChild(renderer.domElement);
    // path tracer
    pathTracer = new (0, _indexJs.WebGLPathTracer)(renderer);
    pathTracer.tiles.set(params.tiles, params.tiles);
    pathTracer.setBVHWorker(new (0, _parallelMeshBVHWorkerJs.ParallelMeshBVHWorker)());
    // camera
    camera = new (0, _three.PerspectiveCamera)(75, window.innerWidth / window.innerHeight, 0.025, 500);
    camera.position.set(2.996, 3.795, 0.697);
    // controls
    controls = new (0, _orbitControlsJs.OrbitControls)(camera, renderer.domElement);
    controls.target.set(0.311, 1.13, 0.489);
    controls.addEventListener('change', ()=>pathTracer.updateCamera());
    controls.update();
    // init scene
    scene = new (0, _three.Scene)();
    // init overlayScene
    overlayScene = new (0, _three.Scene)();
    // load the assets
    const [envTexture, gltf] = await Promise.all([
        new (0, _rgbeloaderJs.RGBELoader)().loadAsync(ENV_URL),
        new (0, _gltfloaderJs.GLTFLoader)().setMeshoptDecoder((0, _meshoptDecoderModuleJs.MeshoptDecoder)).loadAsync(MODEL_URL)
    ]);
    // update the env map
    envTexture.mapping = (0, _three.EquirectangularReflectionMapping);
    scene.background = envTexture;
    scene.environment = envTexture;
    // position the model
    const box = new (0, _three.Box3)();
    gltf.scene.traverse((c)=>{
        if (c.material) c.material.map = null;
    });
    gltf.scene.updateMatrixWorld(true);
    box.setFromObject(gltf.scene);
    gltf.scene.position.y -= box.min.y;
    scene.add(gltf.scene);
    // set the floor
    const floorGeom = new (0, _three.CylinderGeometry)(3.5, 3.5, 0.05, 60);
    const floorMat = new (0, _three.MeshStandardMaterial)({
        color: new (0, _three.Color)(0x999999),
        metalness: 0.2,
        roughness: 0.02
    });
    const floor = new (0, _three.Mesh)(floorGeom, floorMat);
    floor.position.y = -0.025;
    scene.add(floor);
    // set floating Objects
    floatingObjects = [];
    const sampleMesh = new (0, _three.Mesh)(new (0, _three.CylinderGeometry)(0.5, 0.5, 0.5, 32), new (0, _three.MeshBasicMaterial)({
        color: 0xff0000
    }));
    const sampleMesh2 = new (0, _three.Mesh)(new (0, _three.BoxGeometry)(0.3, 0.3, 0.3), new (0, _three.MeshBasicMaterial)({
        color: 0x00ff00
    }));
    sampleMesh.position.set(-1, 0, 1);
    sampleMesh2.position.set(1, 0, -1);
    floatingObjects.push(sampleMesh, sampleMesh2);
    overlayScene.add(sampleMesh, sampleMesh2);
    // initialize scene
    await pathTracer.setSceneAsync(scene, camera, {
        onProgress: (v)=>{
            loader.setPercentage(v);
        }
    });
    loader.setCredits(CREDITS);
    // gui
    const gui = new (0, _lilGuiModuleMinJs.GUI)();
    const ptFolder = gui.addFolder('Path Tracer');
    ptFolder.add(params, 'tiles', 1, 4, 1).onChange((value)=>{
        pathTracer.tiles.set(value, value);
    });
    ptFolder.add(params, 'filterGlossyFactor', 0, 1).onChange(onParamsChange);
    ptFolder.add(params, 'bounces', 1, 15, 1).onChange(onParamsChange);
    ptFolder.add(params, 'renderScale', 0.1, 1).onChange(onParamsChange);
    ptFolder.add(params, 'multipleImportanceSampling').onChange(onParamsChange);
    ptFolder.close();
    onParamsChange();
    onResize();
    window.addEventListener('resize', onResize);
    animate();
}
function onParamsChange() {
    pathTracer.filterGlossyFactor = params.filterGlossyFactor;
    pathTracer.bounces = params.bounces;
    pathTracer.renderScale = params.renderScale;
    pathTracer.multipleImportanceSampling = params.multipleImportanceSampling;
}
function onResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    pathTracer.updateCamera();
}
// it's a dummy material for rendering depth only
const depthMaterial = new (0, _three.MeshBasicMaterial)({
    colorWrite: false
});
function updateFloatingObjects() {
    for(let i = 0; i < floatingObjects.length; i++){
        const obj = floatingObjects[i];
        // controlled y value by sin value
        obj.position.y = Math.sin(Date.now() * 0.001 + i);
    }
}
function animate() {
    requestAnimationFrame(animate);
    updateFloatingObjects();
    pathTracer.renderSample();
    const originAutoClear = renderer.autoClear;
    renderer.autoClear = false;
    scene.overrideMaterial = depthMaterial;
    renderer.clearDepth();
    // render depth of the scene
    renderer.render(scene, camera);
    scene.overrideMaterial = null;
    // render real time floating objects
    renderer.render(overlayScene, camera);
    renderer.autoClear = originAutoClear;
    loader.setSamples(pathTracer.samples, pathTracer.isCompiling);
}

},{"three":"ktPTu","three/examples/jsm/controls/OrbitControls.js":"7mqRv","../src/index.js":"8lqZg","three/examples/jsm/loaders/RGBELoader.js":"cfP3d","three/examples/jsm/libs/lil-gui.module.min.js":"dUXFx","three/examples/jsm/loaders/GLTFLoader.js":"dVRsF","three/examples/jsm/libs/meshopt_decoder.module.js":"Go3D5","three-mesh-bvh/src/workers/ParallelMeshBVHWorker.js":"iSl3b","./utils/getScaledSettings.js":"lfwhv","./utils/LoaderElement.js":"h1Zxa"}],"cfP3d":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "RGBELoader", ()=>RGBELoader);
var _three = require("three");
// https://github.com/mrdoob/three.js/issues/5552
// http://en.wikipedia.org/wiki/RGBE_image_format
class RGBELoader extends (0, _three.DataTextureLoader) {
    constructor(manager){
        super(manager);
        this.type = (0, _three.HalfFloatType);
    }
    // adapted from http://www.graphics.cornell.edu/~bjw/rgbe.html
    parse(buffer) {
        const /* default error routine.  change this to change error handling */ rgbe_read_error = 1, rgbe_write_error = 2, rgbe_format_error = 3, rgbe_memory_error = 4, rgbe_error = function(rgbe_error_code, msg) {
            switch(rgbe_error_code){
                case rgbe_read_error:
                    throw new Error('THREE.RGBELoader: Read Error: ' + (msg || ''));
                case rgbe_write_error:
                    throw new Error('THREE.RGBELoader: Write Error: ' + (msg || ''));
                case rgbe_format_error:
                    throw new Error('THREE.RGBELoader: Bad File Format: ' + (msg || ''));
                default:
                case rgbe_memory_error:
                    throw new Error('THREE.RGBELoader: Memory Error: ' + (msg || ''));
            }
        }, /* offsets to red, green, and blue components in a data (float) pixel */ //RGBE_DATA_RED = 0,
        //RGBE_DATA_GREEN = 1,
        //RGBE_DATA_BLUE = 2,
        /* number of floats per pixel, use 4 since stored in rgba image format */ //RGBE_DATA_SIZE = 4,
        /* flags indicating which fields in an rgbe_header_info are valid */ RGBE_VALID_PROGRAMTYPE = 1, RGBE_VALID_FORMAT = 2, RGBE_VALID_DIMENSIONS = 4, NEWLINE = '\n', fgets = function(buffer, lineLimit, consume) {
            const chunkSize = 128;
            lineLimit = !lineLimit ? 1024 : lineLimit;
            let p = buffer.pos, i = -1, len = 0, s = '', chunk = String.fromCharCode.apply(null, new Uint16Array(buffer.subarray(p, p + chunkSize)));
            while(0 > (i = chunk.indexOf(NEWLINE)) && len < lineLimit && p < buffer.byteLength){
                s += chunk;
                len += chunk.length;
                p += chunkSize;
                chunk += String.fromCharCode.apply(null, new Uint16Array(buffer.subarray(p, p + chunkSize)));
            }
            if (-1 < i) {
                /*for (i=l-1; i>=0; i--) {
						byteCode = m.charCodeAt(i);
						if (byteCode > 0x7f && byteCode <= 0x7ff) byteLen++;
						else if (byteCode > 0x7ff && byteCode <= 0xffff) byteLen += 2;
						if (byteCode >= 0xDC00 && byteCode <= 0xDFFF) i--; //trail surrogate
					}*/ if (false !== consume) buffer.pos += len + i + 1;
                return s + chunk.slice(0, i);
            }
            return false;
        }, /* minimal header reading.  modify if you want to parse more information */ RGBE_ReadHeader = function(buffer) {
            // regexes to parse header info fields
            const magic_token_re = /^#\?(\S+)/, gamma_re = /^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/, exposure_re = /^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/, format_re = /^\s*FORMAT=(\S+)\s*$/, dimensions_re = /^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/, // RGBE format header struct
            header = {
                valid: 0,
                /* indicate which fields are valid */ string: '',
                /* the actual header string */ comments: '',
                /* comments found in header */ programtype: 'RGBE',
                /* listed at beginning of file to identify it after "#?". defaults to "RGBE" */ format: '',
                /* RGBE format, default 32-bit_rle_rgbe */ gamma: 1.0,
                /* image has already been gamma corrected with given gamma. defaults to 1.0 (no correction) */ exposure: 1.0,
                /* a value of 1.0 in an image corresponds to <exposure> watts/steradian/m^2. defaults to 1.0 */ width: 0,
                height: 0 /* image dimensions, width/height */ 
            };
            let line, match;
            if (buffer.pos >= buffer.byteLength || !(line = fgets(buffer))) rgbe_error(rgbe_read_error, 'no header found');
            /* if you want to require the magic token then uncomment the next line */ if (!(match = line.match(magic_token_re))) rgbe_error(rgbe_format_error, 'bad initial token');
            header.valid |= RGBE_VALID_PROGRAMTYPE;
            header.programtype = match[1];
            header.string += line + '\n';
            while(true){
                line = fgets(buffer);
                if (false === line) break;
                header.string += line + '\n';
                if ('#' === line.charAt(0)) {
                    header.comments += line + '\n';
                    continue; // comment line
                }
                if (match = line.match(gamma_re)) header.gamma = parseFloat(match[1]);
                if (match = line.match(exposure_re)) header.exposure = parseFloat(match[1]);
                if (match = line.match(format_re)) {
                    header.valid |= RGBE_VALID_FORMAT;
                    header.format = match[1]; //'32-bit_rle_rgbe';
                }
                if (match = line.match(dimensions_re)) {
                    header.valid |= RGBE_VALID_DIMENSIONS;
                    header.height = parseInt(match[1], 10);
                    header.width = parseInt(match[2], 10);
                }
                if (header.valid & RGBE_VALID_FORMAT && header.valid & RGBE_VALID_DIMENSIONS) break;
            }
            if (!(header.valid & RGBE_VALID_FORMAT)) rgbe_error(rgbe_format_error, 'missing format specifier');
            if (!(header.valid & RGBE_VALID_DIMENSIONS)) rgbe_error(rgbe_format_error, 'missing image size specifier');
            return header;
        }, RGBE_ReadPixels_RLE = function(buffer, w, h) {
            const scanline_width = w;
            if (scanline_width < 8 || scanline_width > 0x7fff || // this file is not run length encoded
            2 !== buffer[0] || 2 !== buffer[1] || buffer[2] & 0x80) // return the flat buffer
            return new Uint8Array(buffer);
            if (scanline_width !== (buffer[2] << 8 | buffer[3])) rgbe_error(rgbe_format_error, 'wrong scanline width');
            const data_rgba = new Uint8Array(4 * w * h);
            if (!data_rgba.length) rgbe_error(rgbe_memory_error, 'unable to allocate buffer space');
            let offset = 0, pos = 0;
            const ptr_end = 4 * scanline_width;
            const rgbeStart = new Uint8Array(4);
            const scanline_buffer = new Uint8Array(ptr_end);
            let num_scanlines = h;
            // read in each successive scanline
            while(num_scanlines > 0 && pos < buffer.byteLength){
                if (pos + 4 > buffer.byteLength) rgbe_error(rgbe_read_error);
                rgbeStart[0] = buffer[pos++];
                rgbeStart[1] = buffer[pos++];
                rgbeStart[2] = buffer[pos++];
                rgbeStart[3] = buffer[pos++];
                if (2 != rgbeStart[0] || 2 != rgbeStart[1] || (rgbeStart[2] << 8 | rgbeStart[3]) != scanline_width) rgbe_error(rgbe_format_error, 'bad rgbe scanline format');
                // read each of the four channels for the scanline into the buffer
                // first red, then green, then blue, then exponent
                let ptr = 0, count;
                while(ptr < ptr_end && pos < buffer.byteLength){
                    count = buffer[pos++];
                    const isEncodedRun = count > 128;
                    if (isEncodedRun) count -= 128;
                    if (0 === count || ptr + count > ptr_end) rgbe_error(rgbe_format_error, 'bad scanline data');
                    if (isEncodedRun) {
                        // a (encoded) run of the same value
                        const byteValue = buffer[pos++];
                        for(let i = 0; i < count; i++)scanline_buffer[ptr++] = byteValue;
                    //ptr += count;
                    } else {
                        // a literal-run
                        scanline_buffer.set(buffer.subarray(pos, pos + count), ptr);
                        ptr += count;
                        pos += count;
                    }
                }
                // now convert data from buffer into rgba
                // first red, then green, then blue, then exponent (alpha)
                const l = scanline_width; //scanline_buffer.byteLength;
                for(let i = 0; i < l; i++){
                    let off = 0;
                    data_rgba[offset] = scanline_buffer[i + off];
                    off += scanline_width; //1;
                    data_rgba[offset + 1] = scanline_buffer[i + off];
                    off += scanline_width; //1;
                    data_rgba[offset + 2] = scanline_buffer[i + off];
                    off += scanline_width; //1;
                    data_rgba[offset + 3] = scanline_buffer[i + off];
                    offset += 4;
                }
                num_scanlines--;
            }
            return data_rgba;
        };
        const RGBEByteToRGBFloat = function(sourceArray, sourceOffset, destArray, destOffset) {
            const e = sourceArray[sourceOffset + 3];
            const scale = Math.pow(2.0, e - 128.0) / 255.0;
            destArray[destOffset + 0] = sourceArray[sourceOffset + 0] * scale;
            destArray[destOffset + 1] = sourceArray[sourceOffset + 1] * scale;
            destArray[destOffset + 2] = sourceArray[sourceOffset + 2] * scale;
            destArray[destOffset + 3] = 1;
        };
        const RGBEByteToRGBHalf = function(sourceArray, sourceOffset, destArray, destOffset) {
            const e = sourceArray[sourceOffset + 3];
            const scale = Math.pow(2.0, e - 128.0) / 255.0;
            // clamping to 65504, the maximum representable value in float16
            destArray[destOffset + 0] = (0, _three.DataUtils).toHalfFloat(Math.min(sourceArray[sourceOffset + 0] * scale, 65504));
            destArray[destOffset + 1] = (0, _three.DataUtils).toHalfFloat(Math.min(sourceArray[sourceOffset + 1] * scale, 65504));
            destArray[destOffset + 2] = (0, _three.DataUtils).toHalfFloat(Math.min(sourceArray[sourceOffset + 2] * scale, 65504));
            destArray[destOffset + 3] = (0, _three.DataUtils).toHalfFloat(1);
        };
        const byteArray = new Uint8Array(buffer);
        byteArray.pos = 0;
        const rgbe_header_info = RGBE_ReadHeader(byteArray);
        const w = rgbe_header_info.width, h = rgbe_header_info.height, image_rgba_data = RGBE_ReadPixels_RLE(byteArray.subarray(byteArray.pos), w, h);
        let data, type;
        let numElements;
        switch(this.type){
            case 0, _three.FloatType:
                numElements = image_rgba_data.length / 4;
                const floatArray = new Float32Array(numElements * 4);
                for(let j = 0; j < numElements; j++)RGBEByteToRGBFloat(image_rgba_data, j * 4, floatArray, j * 4);
                data = floatArray;
                type = (0, _three.FloatType);
                break;
            case 0, _three.HalfFloatType:
                numElements = image_rgba_data.length / 4;
                const halfArray = new Uint16Array(numElements * 4);
                for(let j = 0; j < numElements; j++)RGBEByteToRGBHalf(image_rgba_data, j * 4, halfArray, j * 4);
                data = halfArray;
                type = (0, _three.HalfFloatType);
                break;
            default:
                throw new Error('THREE.RGBELoader: Unsupported type: ' + this.type);
        }
        return {
            width: w,
            height: h,
            data: data,
            header: rgbe_header_info.string,
            gamma: rgbe_header_info.gamma,
            exposure: rgbe_header_info.exposure,
            type: type
        };
    }
    setDataType(value) {
        this.type = value;
        return this;
    }
    load(url, onLoad, onProgress, onError) {
        function onLoadCallback(texture, texData) {
            switch(texture.type){
                case 0, _three.FloatType:
                case 0, _three.HalfFloatType:
                    texture.colorSpace = (0, _three.LinearSRGBColorSpace);
                    texture.minFilter = (0, _three.LinearFilter);
                    texture.magFilter = (0, _three.LinearFilter);
                    texture.generateMipmaps = false;
                    texture.flipY = true;
                    break;
            }
            if (onLoad) onLoad(texture, texData);
        }
        return super.load(url, onLoadCallback, onProgress, onError);
    }
}

},{"three":"ktPTu","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iSl3b":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ParallelMeshBVHWorker", ()=>ParallelMeshBVHWorker);
var _three = require("three");
var _meshBVHJs = require("../core/MeshBVH.js");
var _workerBaseJs = require("./utils/WorkerBase.js");
var _bufferUtilsJs = require("../utils/BufferUtils.js");
var _generateMeshBVHWorkerJs = require("./GenerateMeshBVHWorker.js");
var _geometryUtilsJs = require("../core/build/geometryUtils.js");
const DEFAULT_WORKER_COUNT = typeof navigator !== 'undefined' ? navigator.hardwareConcurrency : 4;
class _ParallelMeshBVHWorker extends (0, _workerBaseJs.WorkerBase) {
    constructor(){
        const worker = new Worker(require("fcf328a20d6da8f8"));
        super(worker);
        this.name = 'ParallelMeshBVHWorker';
        this.maxWorkerCount = Math.max(DEFAULT_WORKER_COUNT, 4);
        if (!(0, _bufferUtilsJs.isSharedArrayBufferSupported)()) throw new Error('ParallelMeshBVHWorker: Shared Array Buffers are not supported.');
    }
    runTask(worker, geometry, options = {}) {
        return new Promise((resolve, reject)=>{
            if (!geometry.index && !options.indirect) (0, _geometryUtilsJs.ensureIndex)(geometry, options);
            if (geometry.getAttribute('position').isInterleavedBufferAttribute || geometry.index && geometry.index.isInterleavedBufferAttribute) throw new Error('ParallelMeshBVHWorker: InterleavedBufferAttribute are not supported for the geometry attributes.');
            worker.onerror = (e)=>{
                reject(new Error(`ParallelMeshBVHWorker: ${e.message}`));
            };
            worker.onmessage = (e)=>{
                const { data } = e;
                if (data.error) {
                    reject(new Error(data.error));
                    worker.onmessage = null;
                } else if (data.serialized) {
                    const { serialized, position } = data;
                    const bvh = (0, _meshBVHJs.MeshBVH).deserialize(serialized, geometry, {
                        setIndex: false
                    });
                    const boundsOptions = {
                        setBoundingBox: true,
                        ...options
                    };
                    // we need to replace the arrays because they're neutered entirely by the
                    // webworker transfer.
                    geometry.attributes.position.array = position;
                    if (serialized.index) {
                        if (geometry.index) geometry.index.array = serialized.index;
                        else {
                            const newIndex = new (0, _three.BufferAttribute)(serialized.index, 1, false);
                            geometry.setIndex(newIndex);
                        }
                    }
                    if (boundsOptions.setBoundingBox) geometry.boundingBox = bvh.getBoundingBox(new (0, _three.Box3)());
                    if (options.onProgress) options.onProgress(data.progress);
                    resolve(bvh);
                    worker.onmessage = null;
                } else if (options.onProgress) options.onProgress(data.progress);
            };
            const index = geometry.index ? geometry.index.array : null;
            const position = geometry.attributes.position.array;
            worker.postMessage({
                operation: 'BUILD_BVH',
                maxWorkerCount: this.maxWorkerCount,
                index: (0, _bufferUtilsJs.convertToBufferType)(index, SharedArrayBuffer),
                position: (0, _bufferUtilsJs.convertToBufferType)(position, SharedArrayBuffer),
                options: {
                    ...options,
                    onProgress: null,
                    includedProgressCallback: Boolean(options.onProgress),
                    groups: [
                        ...geometry.groups
                    ]
                }
            });
        });
    }
}
class ParallelMeshBVHWorker {
    constructor(){
        if ((0, _bufferUtilsJs.isSharedArrayBufferSupported)()) return new _ParallelMeshBVHWorker();
        else {
            console.warn('ParallelMeshBVHWorker: SharedArrayBuffers not supported. Falling back to single-threaded GenerateMeshBVHWorker.');
            const object = new (0, _generateMeshBVHWorkerJs.GenerateMeshBVHWorker)();
            object.maxWorkerCount = DEFAULT_WORKER_COUNT;
            return object;
        }
    }
}

},{"three":"ktPTu","../core/MeshBVH.js":"biELs","./utils/WorkerBase.js":"bGfl5","../utils/BufferUtils.js":"gBAF9","./GenerateMeshBVHWorker.js":"3qwBo","../core/build/geometryUtils.js":"ejhro","fcf328a20d6da8f8":"8D5A5","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bGfl5":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "WorkerBase", ()=>WorkerBase);
class WorkerBase {
    constructor(worker){
        this.name = 'WorkerBase';
        this.running = false;
        this.worker = worker;
        this.worker.onerror = (e)=>{
            if (e.message) throw new Error(`${this.name}: Could not create Web Worker with error "${e.message}"`);
            else throw new Error(`${this.name}: Could not create Web Worker.`);
        };
    }
    runTask() {}
    generate(...args) {
        if (this.running) throw new Error('GenerateMeshBVHWorker: Already running job.');
        if (this.worker === null) throw new Error('GenerateMeshBVHWorker: Worker has been disposed.');
        this.running = true;
        const promise = this.runTask(this.worker, ...args);
        promise.finally(()=>{
            this.running = false;
        });
        return promise;
    }
    dispose() {
        this.worker.terminate();
        this.worker = null;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3qwBo":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "GenerateMeshBVHWorker", ()=>GenerateMeshBVHWorker);
var _three = require("three");
var _meshBVHJs = require("../core/MeshBVH.js");
var _workerBaseJs = require("./utils/WorkerBase.js");
class GenerateMeshBVHWorker extends (0, _workerBaseJs.WorkerBase) {
    constructor(){
        const worker = new Worker(require("a30a60cb1342ab0e"));
        super(worker);
        this.name = 'GenerateMeshBVHWorker';
    }
    runTask(worker, geometry, options = {}) {
        return new Promise((resolve, reject)=>{
            if (geometry.getAttribute('position').isInterleavedBufferAttribute || geometry.index && geometry.index.isInterleavedBufferAttribute) throw new Error('GenerateMeshBVHWorker: InterleavedBufferAttribute are not supported for the geometry attributes.');
            worker.onerror = (e)=>{
                reject(new Error(`GenerateMeshBVHWorker: ${e.message}`));
            };
            worker.onmessage = (e)=>{
                const { data } = e;
                if (data.error) {
                    reject(new Error(data.error));
                    worker.onmessage = null;
                } else if (data.serialized) {
                    const { serialized, position } = data;
                    const bvh = (0, _meshBVHJs.MeshBVH).deserialize(serialized, geometry, {
                        setIndex: false
                    });
                    const boundsOptions = Object.assign({
                        setBoundingBox: true
                    }, options);
                    // we need to replace the arrays because they're neutered entirely by the
                    // webworker transfer.
                    geometry.attributes.position.array = position;
                    if (serialized.index) {
                        if (geometry.index) geometry.index.array = serialized.index;
                        else {
                            const newIndex = new (0, _three.BufferAttribute)(serialized.index, 1, false);
                            geometry.setIndex(newIndex);
                        }
                    }
                    if (boundsOptions.setBoundingBox) geometry.boundingBox = bvh.getBoundingBox(new (0, _three.Box3)());
                    if (options.onProgress) options.onProgress(data.progress);
                    resolve(bvh);
                    worker.onmessage = null;
                } else if (options.onProgress) options.onProgress(data.progress);
            };
            const index = geometry.index ? geometry.index.array : null;
            const position = geometry.attributes.position.array;
            const transferable = [
                position
            ];
            if (index) transferable.push(index);
            worker.postMessage({
                index,
                position,
                options: {
                    ...options,
                    onProgress: null,
                    includedProgressCallback: Boolean(options.onProgress),
                    groups: [
                        ...geometry.groups
                    ]
                }
            }, transferable.map((arr)=>arr.buffer).filter((v)=>typeof SharedArrayBuffer === 'undefined' || !(v instanceof SharedArrayBuffer)));
        });
    }
}

},{"three":"ktPTu","../core/MeshBVH.js":"biELs","./utils/WorkerBase.js":"bGfl5","a30a60cb1342ab0e":"5IB4G","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5IB4G":[function(require,module,exports,__globalThis) {
let workerURL = require("4f0cbb852fe7a821");
let bundleURL = require("b81e564036157e0a");
let url = bundleURL.getBundleURL('fGKuJ') + "generateMeshBVH.worker.e1a14054.js";
module.exports = workerURL(url, bundleURL.getOrigin(url), false);

},{"4f0cbb852fe7a821":"cn2gM","b81e564036157e0a":"lgJ39"}],"cn2gM":[function(require,module,exports,__globalThis) {
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

},{}],"lgJ39":[function(require,module,exports,__globalThis) {
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

},{}],"8D5A5":[function(require,module,exports,__globalThis) {
let workerURL = require("7cf7ccedbf3d0fb4");
let bundleURL = require("fdef5a246a3ac43");
let url = bundleURL.getBundleURL('fGKuJ') + "parallelMeshBVH.worker.fa7afa10.js";
module.exports = workerURL(url, bundleURL.getOrigin(url), false);

},{"7cf7ccedbf3d0fb4":"cn2gM","fdef5a246a3ac43":"lgJ39"}],"lfwhv":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getScaledSettings", ()=>getScaledSettings);
function getScaledSettings() {
    let tiles = 3;
    let renderScale = Math.max(1 / window.devicePixelRatio, 0.5);
    // adjust performance parameters for mobile
    const aspectRatio = window.innerWidth / window.innerHeight;
    if (aspectRatio < 0.65) {
        tiles = 4;
        renderScale = 0.5 / window.devicePixelRatio;
    }
    return {
        tiles,
        renderScale
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"h1Zxa":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "LoaderElement", ()=>LoaderElement);
let _styleElement;
function initializeStyles() {
    if (_styleElement) return;
    _styleElement = document.createElement('style');
    _styleElement.textContent = /* css */ `

		.loader-container, .description {
			position: absolute;
			width: 100%;
			font-family: 'Courier New', Courier, monospace;
			color: white;
			font-weight: light;
			align-items: flex-start;
			font-size: 14px;
			pointer-events: none;
			user-select: none;
		}

		.loader-container {
			display: flex;
			flex-direction: column;
			bottom: 0;
		}

		.description {
			top: 0;
			width: 100%;
			text-align: center;
			padding: 5px 0;
		}

		.loader-container .bar {
			height: 2px;
			background: white;
			width: 100%;
		}

		.loader-container .credits,
		.loader-container .samples,
		.loader-container .percentage {
			padding: 5px;
			margin: 0 0 1px 1px;
			background: rgba( 0, 0, 0, 0.2 );
			border-radius: 2px;
			display: inline-block;
		}

		.loader-container:not(.loading) .bar,
		.loader-container:not(.loading) .percentage,
		.loader-container.loading .credits,
		.loader-container.loading .samples,
		.loader-container .credits:empty {
			display: none;
		}

		.loader-container .credits a,
		.loader-container .credits,
		.loader-container .samples {
			color: rgba( 255, 255, 255, 0.75 );
		}
	`;
    document.head.appendChild(_styleElement);
}
class LoaderElement {
    constructor(){
        initializeStyles();
        const container = document.createElement('div');
        container.classList.add('loader-container');
        const percentageEl = document.createElement('div');
        percentageEl.classList.add('percentage');
        container.appendChild(percentageEl);
        const samplesEl = document.createElement('div');
        samplesEl.classList.add('samples');
        container.appendChild(samplesEl);
        const creditsEl = document.createElement('div');
        creditsEl.classList.add('credits');
        container.appendChild(creditsEl);
        const loaderBarEl = document.createElement('div');
        loaderBarEl.classList.add('bar');
        container.appendChild(loaderBarEl);
        const descriptionEl = document.createElement('div');
        descriptionEl.classList.add('description');
        container.appendChild(descriptionEl);
        this._description = descriptionEl;
        this._loaderBar = loaderBarEl;
        this._percentage = percentageEl;
        this._credits = creditsEl;
        this._samples = samplesEl;
        this._container = container;
        this.setPercentage(0);
    }
    attach(container) {
        container.appendChild(this._container);
        container.appendChild(this._description);
    }
    setPercentage(perc) {
        this._loaderBar.style.width = `${perc * 100}%`;
        if (perc === 0) this._percentage.innerText = 'Loading...';
        else this._percentage.innerText = `${(perc * 100).toFixed(0)}%`;
        if (perc >= 1) this._container.classList.remove('loading');
        else this._container.classList.add('loading');
    }
    setSamples(count, compiling = false) {
        if (compiling) this._samples.innerText = 'compiling shader...';
        else this._samples.innerText = `${Math.floor(count)} samples`;
    }
    setCredits(credits) {
        this._credits.innerHTML = credits;
    }
    setDescription(description) {
        this._description.innerHTML = description;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["iu4Bd"], "iu4Bd", "parcelRequire94c2")

//# sourceMappingURL=overlay.6859e2fa.js.map

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
})({"jJ0VJ":[function(require,module,exports,__globalThis) {
var _three = require("three");
var _meshoptDecoderModuleJs = require("three/examples/jsm/libs/meshopt_decoder.module.js");
var _rgbeloaderJs = require("three/examples/jsm/loaders/RGBELoader.js");
var _gltfloaderJs = require("three/examples/jsm/loaders/GLTFLoader.js");
var _lilGuiModuleMinJs = require("three/examples/jsm/libs/lil-gui.module.min.js");
var _indexJs = require("../src/index.js");
var _orbitControlsJs = require("three/examples/jsm/controls/OrbitControls.js");
var _parallelMeshBVHWorkerJs = require("three-mesh-bvh/src/workers/ParallelMeshBVHWorker.js");
var _loaderElementJs = require("./utils/LoaderElement.js");
const CONFIG_URL = 'https://raw.githubusercontent.com/google/model-viewer/master/packages/render-fidelity-tools/test/config.json';
const BASE_URL = 'https://raw.githubusercontent.com/google/model-viewer/master/packages/render-fidelity-tools/test/config/';
const urlParams = new URLSearchParams(window.location.search);
const maxSamples = parseInt(urlParams.get('samples')) || -1;
const hideUI = urlParams.get('hideUI') === 'true';
const tiles = parseInt(urlParams.get('tiles')) || 2;
const scale = parseInt(urlParams.get('scale')) || 1 / window.devicePixelRatio;
const params = {
    enable: true,
    bounces: 10,
    transmissiveBounces: 10,
    pause: false,
    multipleImportanceSampling: true,
    acesToneMapping: true,
    tiles: tiles,
    scale: scale,
    model: '',
    checkerboardTransparency: true,
    displayImage: false,
    imageMode: 'overlay',
    imageOpacity: 1.0,
    imageType: 'dspbr-pt'
};
let containerEl, imgEl, loader;
let gui, model, envMap;
let pathTracer, renderer, camera, scene, controls;
let loadingModel = false;
let delaySamples = 0;
let modelDatabase;
init();
async function init() {
    // get elements
    containerEl = document.getElementById('container');
    imgEl = document.querySelector('img');
    if (hideUI) {
        containerEl.style.background = 'transparent';
        document.body.style.background = 'transparent';
    }
    loader = new (0, _loaderElementJs.LoaderElement)();
    if (!hideUI) loader.attach(document.body);
    // renderer
    renderer = new (0, _three.WebGLRenderer)({
        antialias: true,
        preserveDrawingBuffer: true
    });
    renderer.physicallyCorrectLights = true;
    renderer.toneMapping = (0, _three.ACESFilmicToneMapping);
    renderer.setClearAlpha(0);
    containerEl.appendChild(renderer.domElement);
    // path tracer
    pathTracer = new (0, _indexJs.WebGLPathTracer)(renderer);
    pathTracer.filterGlossyFactor = 0.5;
    pathTracer.tiles.set(params.tiles);
    pathTracer.setBVHWorker(new (0, _parallelMeshBVHWorkerJs.ParallelMeshBVHWorker)());
    pathTracer.multipleImportanceSampling = params.multipleImportanceSampling;
    // scene
    scene = new (0, _three.Scene)();
    // init camera
    const aspect = window.innerWidth / window.innerHeight;
    camera = new (0, _three.PerspectiveCamera)(60, aspect, 0.01, 500);
    camera.position.set(-1, 0.25, 1);
    // controls
    controls = new (0, _orbitControlsJs.OrbitControls)(camera, containerEl);
    controls.addEventListener('change', ()=>pathTracer.updateCamera());
    // models
    const { scenarios } = await fetch(CONFIG_URL).then((res)=>res.json());
    modelDatabase = {};
    scenarios.forEach((s)=>modelDatabase[s.name] = s);
    window.addEventListener('hashchange', onHashChange);
    onHashChange();
    animate();
}
function animate() {
    requestAnimationFrame(animate);
    // if rendering has completed then don't render
    if (pathTracer.samples >= maxSamples && maxSamples !== -1) return;
    imgEl.style.display = !params.displayImage ? 'none' : 'inline-block';
    imgEl.style.opacity = params.imageMode === 'side-by-side' ? 1.0 : params.imageOpacity;
    imgEl.style.position = params.imageMode === 'side-by-side' ? 'initial' : 'absolute';
    imgEl.style.width = renderer.domElement.style.width;
    imgEl.style.height = renderer.domElement.style.height;
    if (loadingModel) return;
    // TODO: use a delay field from WebGLPathTracer
    if (params.enable && delaySamples === 0) {
        pathTracer.enablePathTracing = params.enable;
        pathTracer.pausePathTracing = params.pause || pathTracer.samples > maxSamples && maxSamples !== -1;
        pathTracer.renderSample();
    } else if (delaySamples > 0 || !params.enable) {
        delaySamples = Math.max(delaySamples - 1, 0);
        renderer.render(scene, camera);
    }
    // rendering has completed
    if (pathTracer.samples >= maxSamples && maxSamples !== -1) requestAnimationFrame(()=>window.dispatchEvent(new Event('render-complete')));
    loader.setSamples(pathTracer.samples, pathTracer.isCompiling);
}
function onHashChange() {
    params.model = Object.keys(modelDatabase)[0];
    if (window.location.hash) {
        const modelName = window.location.hash.substring(1).replaceAll('%20', ' ');
        if (modelName in modelDatabase) params.model = modelName;
    }
    updateModel();
}
function onParamsChange() {
    if (pathTracer.tiles !== 1.0) delaySamples = 1;
    if (params.checkerboardTransparency) containerEl.classList.add('checkerboard');
    else containerEl.classList.remove('checkerboard');
    pathTracer.multipleImportanceSampling = params.multipleImportanceSampling;
    pathTracer.bounces = params.bounces;
    pathTracer.transmissiveBounces = params.transmissiveBounces;
    pathTracer.renderScale = params.scale;
    const model = modelDatabase[params.model];
    scene.background = model && model.renderSkybox ? scene.environment : null;
    pathTracer.updateEnvironment();
}
function buildGui() {
    if (hideUI) return;
    if (gui) gui.destroy();
    gui = new (0, _lilGuiModuleMinJs.GUI)();
    gui.add(params, 'model', Object.keys(modelDatabase)).onChange((v)=>{
        window.location.hash = v;
    });
    const pathTracingFolder = gui.addFolder('Path Tracer');
    pathTracingFolder.add(params, 'enable');
    pathTracingFolder.add(params, 'pause');
    pathTracingFolder.add(params, 'scale', 0.1, 1).onChange(onParamsChange);
    pathTracingFolder.add(params, 'multipleImportanceSampling').onChange(onParamsChange);
    pathTracingFolder.add(params, 'acesToneMapping').onChange((v)=>{
        renderer.toneMapping = v ? (0, _three.ACESFilmicToneMapping) : (0, _three.NoToneMapping);
    });
    pathTracingFolder.add(params, 'tiles', 1, 10, 1).onChange((v)=>{
        pathTracer.tiles.set(v, v);
    });
    pathTracingFolder.add(params, 'bounces', 1, 20, 1).onChange(onParamsChange);
    pathTracingFolder.add(params, 'transmissiveBounces', 1, 20, 1).onChange(onParamsChange);
    const comparisonFolder = gui.addFolder('Comparison');
    comparisonFolder.add(params, 'displayImage');
    comparisonFolder.add(params, 'imageMode', [
        'overlay',
        'side-by-side'
    ]);
    comparisonFolder.add(params, 'imageType', [
        'dspbr-pt',
        'filament',
        'babylon',
        'gltf-sample-viewer',
        'model-viewer',
        'rhodonite',
        'stellar'
    ]).onChange(updateImage);
    comparisonFolder.add(params, 'imageOpacity', 0, 1.0);
    comparisonFolder.add(params, 'checkerboardTransparency').onChange(onParamsChange);
}
async function updateModel() {
    // dispose of a gui
    if (gui) {
        containerEl.classList.remove('checkerboard');
        gui.destroy();
        gui = null;
    }
    // dispose of everything
    if (model) {
        model.traverse((c)=>{
            if (c.material) {
                const material = c.material;
                for(const key in material)if (material[key] && material[key].isTexture) material[key].dispose();
            }
        });
        scene.remove(model);
    }
    // dispose of the background
    if (envMap) envMap.dispose();
    const modelInfo = modelDatabase[params.model];
    const { verticalFoV = 45, lighting = '../../../shared-assets/environments/lightroom_14b.hdr' } = modelInfo;
    let { orbit = {}, target = {}, dimensions = {} } = modelInfo;
    orbit = {
        theta: 0,
        phi: 90,
        radius: 1,
        ...orbit
    };
    target = {
        x: 0,
        y: 0,
        z: 0,
        ...target
    };
    dimensions = {
        width: 768,
        height: 768,
        ...dimensions
    };
    // add a minimal radius so the camera orientation is correct when radius is 0
    orbit.radius = Math.max(orbit.radius, 1e-5);
    loadingModel = true;
    containerEl.style.display = 'none';
    // load assets
    const envUrl = new URL(lighting, BASE_URL).toString();
    const modelUrl = new URL(modelInfo.model, BASE_URL).toString().replace(/.*?glTF-Sample-Assets/, 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main');
    const manager = new (0, _three.LoadingManager)();
    const [envTexture, gltf] = await Promise.all([
        new (0, _rgbeloaderJs.RGBELoader)(manager).loadAsync(envUrl),
        new (0, _gltfloaderJs.GLTFLoader)(manager).setMeshoptDecoder((0, _meshoptDecoderModuleJs.MeshoptDecoder)).loadAsync(modelUrl, (progress)=>{
            if (progress.total !== 0 && progress.total >= progress.loaded) loader.setPercentage(0.5 * progress.loaded / progress.total);
        }),
        new Promise((resolve)=>manager.onLoad = resolve)
    ]);
    envMap = envTexture;
    envMap.mapping = (0, _three.EquirectangularReflectionMapping);
    scene.environment = envMap;
    model = gltf.scene;
    const targetsToDisconnect = [];
    model.traverse((c)=>{
        if (c.isLight && c.target) targetsToDisconnect.push(c.target);
    });
    // disconnect all light targets from parents because that's what happens after a clone which
    // is needed to match the model viewer setup
    targetsToDisconnect.forEach((t)=>t.removeFromParent());
    // add a parent group to process the parent offset
    const targetGroup = new (0, _three.Group)();
    targetGroup.position.set(-target.x, -target.y, -target.z);
    targetGroup.add(model);
    // replace the target group TODO
    model = targetGroup;
    model.updateMatrixWorld(true);
    scene.add(model);
    const box = new (0, _three.Box3)();
    const sphere = new (0, _three.Sphere)();
    box.setFromObject(model);
    box.getBoundingSphere(sphere);
    // mirror the model-viewer near / far planes
    const radius = Math.max(orbit.radius, sphere.radius);
    camera.near = 2 * radius / 1000;
    camera.far = 2 * radius;
    camera.updateProjectionMatrix();
    camera.position.setFromSphericalCoords(orbit.radius, (0, _three.MathUtils).DEG2RAD * orbit.phi, (0, _three.MathUtils).DEG2RAD * orbit.theta);
    // initialize the canvas size
    const { width, height } = dimensions;
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    camera.aspect = width / height;
    camera.fov = verticalFoV;
    camera.updateProjectionMatrix();
    controls.update();
    await pathTracer.setSceneAsync(scene, camera, {
        onProgress: (v)=>{
            loader.setPercentage(0.5 + 0.5 * v);
        }
    });
    loader.setCredits(modelInfo.credit || '');
    containerEl.style.display = 'flex';
    loadingModel = false;
    onParamsChange();
    buildGui();
    updateImage();
}
function updateImage() {
    imgEl.src = `https://raw.githubusercontent.com/google/model-viewer/master/packages/render-fidelity-tools/test/goldens/${params.model}/${params.imageType}-golden.png`;
}

},{"three":"ktPTu","three/examples/jsm/libs/meshopt_decoder.module.js":"Go3D5","three/examples/jsm/loaders/RGBELoader.js":"cfP3d","three/examples/jsm/loaders/GLTFLoader.js":"dVRsF","three/examples/jsm/libs/lil-gui.module.min.js":"dUXFx","../src/index.js":"8lqZg","three/examples/jsm/controls/OrbitControls.js":"7mqRv","three-mesh-bvh/src/workers/ParallelMeshBVHWorker.js":"iSl3b","./utils/LoaderElement.js":"h1Zxa"}],"cfP3d":[function(require,module,exports,__globalThis) {
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

},{"three":"ktPTu","../core/MeshBVH.js":"biELs","./utils/WorkerBase.js":"bGfl5","../utils/BufferUtils.js":"gBAF9","./GenerateMeshBVHWorker.js":"3qwBo","../core/build/geometryUtils.js":"ejhro","fcf328a20d6da8f8":"5cgr6","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bGfl5":[function(require,module,exports,__globalThis) {
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

},{"three":"ktPTu","../core/MeshBVH.js":"biELs","./utils/WorkerBase.js":"bGfl5","a30a60cb1342ab0e":"6dvHT","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6dvHT":[function(require,module,exports,__globalThis) {
let workerURL = require("2afcc7f348126509");
let bundleURL = require("43d3b67d63ea5d5d");
let url = bundleURL.getBundleURL('g9kjC') + "generateMeshBVH.worker.e1a14054.js";
module.exports = workerURL(url, bundleURL.getOrigin(url), false);

},{"2afcc7f348126509":"cn2gM","43d3b67d63ea5d5d":"lgJ39"}],"cn2gM":[function(require,module,exports,__globalThis) {
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

},{}],"5cgr6":[function(require,module,exports,__globalThis) {
let workerURL = require("f67d480de949a953");
let bundleURL = require("1a3533263a9b9505");
let url = bundleURL.getBundleURL('g9kjC') + "parallelMeshBVH.worker.fa7afa10.js";
module.exports = workerURL(url, bundleURL.getOrigin(url), false);

},{"f67d480de949a953":"cn2gM","1a3533263a9b9505":"lgJ39"}],"h1Zxa":[function(require,module,exports,__globalThis) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["jJ0VJ"], "jJ0VJ", "parcelRequire94c2")

//# sourceMappingURL=viewerTest.894980bb.js.map

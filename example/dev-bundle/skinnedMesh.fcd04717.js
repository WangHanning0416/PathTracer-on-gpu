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
})({"ePQPH":[function(require,module,exports,__globalThis) {
var _three = require("three");
var _gltfloaderJs = require("three/examples/jsm/loaders/GLTFLoader.js");
var _orbitControlsJs = require("three/examples/jsm/controls/OrbitControls.js");
var _indexJs = require("../src/index.js");
var _rgbeloaderJs = require("three/examples/jsm/loaders/RGBELoader.js");
var _meshoptDecoderModuleJs = require("three/examples/jsm/libs/meshopt_decoder.module.js");
var _lilGuiModuleMinJs = require("three/examples/jsm/libs/lil-gui.module.min.js");
var _generateRadialFloorTextureJs = require("./utils/generateRadialFloorTexture.js");
var _getScaledSettingsJs = require("./utils/getScaledSettings.js");
var _loaderElementJs = require("./utils/LoaderElement.js");
const ENV_URL = 'https://raw.githubusercontent.com/gkjohnson/3d-demo-data/master/hdri/aristea_wreck_puresky_2k.hdr';
const MORPH_URL = 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/RobotExpressive/RobotExpressive.glb';
const SKINNED_URL = 'https://raw.githubusercontent.com/gkjohnson/3d-demo-data/main/models/trex/scene.gltf';
const CREDITS = 'Model by DailyArt on Sketchfab';
const DESCRIPTION = 'Rendering deformable geometry with path tracing.';
let pathTracer, renderer, controls, camera, scene, clock;
let mixer, mixerAction;
let loader;
let counter = 0;
const params = {
    bounces: 5,
    samplesPerFrame: 1,
    renderScale: 1 / window.devicePixelRatio,
    tiles: 1,
    autoPause: true,
    pause: false,
    continuous: false,
    stableNoise: false,
    ...(0, _getScaledSettingsJs.getScaledSettings)()
};
init();
async function init() {
    loader = new (0, _loaderElementJs.LoaderElement)();
    loader.setDescription(DESCRIPTION);
    loader.attach(document.body);
    // renderer
    renderer = new (0, _three.WebGLRenderer)({
        antialias: true
    });
    renderer.toneMapping = (0, _three.ACESFilmicToneMapping);
    document.body.appendChild(renderer.domElement);
    // path tracer
    pathTracer = new (0, _indexJs.WebGLPathTracer)(renderer);
    pathTracer.multipleImportanceSampling = false;
    pathTracer.tiles.set(params.tiles, params.tiles);
    pathTracer.filterGlossyFactor = 0.25;
    pathTracer.minSamples = 1;
    pathTracer.renderDelay = 0;
    pathTracer.fadeDuration = 0;
    // scene
    scene = new (0, _three.Scene)();
    // camera
    camera = new (0, _three.PerspectiveCamera)(75, window.innerWidth / window.innerHeight, 0.025, 500);
    camera.position.set(5.5, 3.5, 7.5);
    // controls
    controls = new (0, _orbitControlsJs.OrbitControls)(camera, renderer.domElement);
    camera.lookAt(controls.target);
    controls.addEventListener('change', ()=>pathTracer.updateCamera());
    controls.update();
    // clock
    clock = new (0, _three.Clock)();
    // load assets
    const modelUrl = window.location.hash === '#morphtarget' ? MORPH_URL : SKINNED_URL;
    const [envTexture, gltf] = await Promise.all([
        new (0, _rgbeloaderJs.RGBELoader)().loadAsync(ENV_URL),
        new (0, _gltfloaderJs.GLTFLoader)().setMeshoptDecoder((0, _meshoptDecoderModuleJs.MeshoptDecoder)).loadAsync(modelUrl)
    ]);
    // update env map
    const generator = new (0, _indexJs.BlurredEnvMapGenerator)(renderer);
    const blurredTex = generator.generate(envTexture, 0.1);
    scene.background = blurredTex;
    scene.environment = blurredTex;
    generator.dispose();
    // animations
    const animations = gltf.animations;
    mixer = new (0, _three.AnimationMixer)(gltf.scene);
    mixerAction = mixer.clipAction(animations[0]);
    mixerAction.play();
    mixerAction.paused = params.pause;
    // initialize scene
    scene.add(gltf.scene);
    const floorTex = (0, _generateRadialFloorTextureJs.generateRadialFloorTexture)(2048);
    const floorPlane = new (0, _three.Mesh)(new (0, _three.PlaneGeometry)(), new (0, _three.MeshStandardMaterial)({
        map: floorTex,
        transparent: true,
        color: 0xdddddd,
        roughness: 0.15,
        metalness: 1.0
    }));
    floorPlane.scale.setScalar(50);
    floorPlane.rotation.x = -Math.PI / 2;
    floorPlane.position.y = 0.075;
    scene.add(floorPlane);
    // initial generation
    pathTracer.setScene(scene, camera);
    loader.setPercentage(1);
    loader.setCredits(CREDITS);
    onResize();
    window.addEventListener('resize', onResize);
    // gui
    const gui = new (0, _lilGuiModuleMinJs.GUI)();
    gui.add(params, 'tiles', 1, 4, 1).onChange((value)=>{
        pathTracer.tiles.set(value, value);
    });
    gui.add(params, 'bounces', 1, 10, 1).onChange(regenerateScene);
    gui.add(params, 'renderScale', 0.1, 1).onChange((v)=>{
        pathTracer.renderScale = v;
        pathTracer.reset();
    });
    gui.add(params, 'autoPause').listen();
    gui.add(params, 'pause').onChange((v)=>{
        params.autoPause = false;
        setPause(v);
    }).listen();
    gui.add(params, 'continuous').onChange(()=>{
        params.autoPause = false;
    });
    gui.add(params, 'stableNoise').onChange((v)=>{
        pathTracer.stableNoise = v;
    });
    animate();
}
function setPause(v) {
    mixerAction.paused = v;
    params.pause = v;
    if (v) regenerateScene();
}
function onResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    pathTracer.updateCamera();
}
function regenerateScene() {
    pathTracer.bounces = params.bounces;
    pathTracer.setScene(scene, camera);
}
function animate() {
    requestAnimationFrame(animate);
    // step the animation forward
    const delta = Math.min(clock.getDelta(), 0.03);
    mixer.update(delta);
    if (params.autoPause) {
        // auto pause the animation
        counter += delta;
        if (!params.pause && counter >= 2.5 || params.pause && counter >= 5) {
            setPause(!params.pause);
            counter = 0;
        }
    } else counter = 0;
    pathTracer.dynamicLowRes = params.continuous;
    if (!params.pause && !params.continuous) {
        renderer.render(scene, camera);
        loader.setSamples(0, pathTracer.isCompiling);
    } else {
        // if we're continuously path tracing then update the scene
        if (!params.pause && params.continuous) regenerateScene();
        pathTracer.renderSample();
        loader.setSamples(pathTracer.samples, pathTracer.isCompiling);
    }
}

},{"three":"ktPTu","three/examples/jsm/loaders/GLTFLoader.js":"dVRsF","three/examples/jsm/controls/OrbitControls.js":"7mqRv","../src/index.js":"8lqZg","three/examples/jsm/loaders/RGBELoader.js":"cfP3d","three/examples/jsm/libs/meshopt_decoder.module.js":"Go3D5","three/examples/jsm/libs/lil-gui.module.min.js":"dUXFx","./utils/generateRadialFloorTexture.js":"fyW1M","./utils/getScaledSettings.js":"lfwhv","./utils/LoaderElement.js":"h1Zxa"}],"cfP3d":[function(require,module,exports,__globalThis) {
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

},{"three":"ktPTu","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fyW1M":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "generateRadialFloorTexture", ()=>generateRadialFloorTexture);
var _three = require("three");
function generateRadialFloorTexture(dim) {
    const data = new Uint8Array(dim * dim * 4);
    for(let x = 0; x < dim; x++)for(let y = 0; y < dim; y++){
        const xNorm = x / (dim - 1);
        const yNorm = y / (dim - 1);
        const xCent = 2.0 * (xNorm - 0.5);
        const yCent = 2.0 * (yNorm - 0.5);
        let a = Math.max(Math.min(1.0 - Math.sqrt(xCent ** 2 + yCent ** 2), 1.0), 0.0);
        a = a ** 2;
        a = a * 1.5;
        a = Math.min(a, 1.0);
        const i = y * dim + x;
        data[i * 4 + 0] = 255;
        data[i * 4 + 1] = 255;
        data[i * 4 + 2] = 255;
        data[i * 4 + 3] = a * 255;
    }
    const tex = new _three.DataTexture(data, dim, dim);
    tex.format = _three.RGBAFormat;
    tex.type = _three.UnsignedByteType;
    tex.minFilter = _three.LinearFilter;
    tex.magFilter = _three.LinearFilter;
    tex.wrapS = _three.RepeatWrapping;
    tex.wrapT = _three.RepeatWrapping;
    tex.needsUpdate = true;
    return tex;
}

},{"three":"ktPTu","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lfwhv":[function(require,module,exports,__globalThis) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["ePQPH"], "ePQPH", "parcelRequire94c2")

//# sourceMappingURL=skinnedMesh.fcd04717.js.map

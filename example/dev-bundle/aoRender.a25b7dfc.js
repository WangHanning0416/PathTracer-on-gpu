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
})({"4JijA":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _three = require("three");
var _passJs = require("three/examples/jsm/postprocessing/Pass.js");
var _gltfloaderJs = require("three/examples/jsm/loaders/GLTFLoader.js");
var _orbitControlsJs = require("three/examples/jsm/controls/OrbitControls.js");
var _pathTracingSceneGeneratorJs = require("../src/core/PathTracingSceneGenerator.js");
var _meshoptDecoderModuleJs = require("three/examples/jsm/libs/meshopt_decoder.module.js");
var _lilGuiModuleMinJs = require("three/examples/jsm/libs/lil-gui.module.min.js");
var _ambientOcclusionMaterialJs = require("../src/materials/surface/AmbientOcclusionMaterial.js");
var _statsModuleJs = require("three/examples/jsm/libs/stats.module.js");
var _statsModuleJsDefault = parcelHelpers.interopDefault(_statsModuleJs);
var _threeMeshBvh = require("three-mesh-bvh");
var _mikktspaceModuleJs = require("three/examples/jsm/libs/mikktspace.module.js");
var _bufferGeometryUtilsJs = require("three/examples/jsm/utils/BufferGeometryUtils.js");
let renderer, controls, camera, scene, stats;
let fsQuad, target1, target2, materials;
let samplesEl, samples, totalSamples;
const params = {
    renderScale: 1 / window.devicePixelRatio,
    radius: 2.0,
    samplesPerFrame: 2.0,
    accumulate: true,
    pause: false
};
init();
async function init() {
    // initialize renderer
    renderer = new _three.WebGLRenderer({
        antialias: true
    });
    document.body.appendChild(renderer.domElement);
    fsQuad = new (0, _passJs.FullScreenQuad)(new _three.MeshBasicMaterial({
        transparent: true
    }));
    camera = new _three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.set(-4, 2, 3);
    scene = new _three.Scene();
    controls = new (0, _orbitControlsJs.OrbitControls)(camera, renderer.domElement);
    controls.addEventListener('change', ()=>{
        reset();
    });
    samplesEl = document.getElementById('samples');
    // will be null if extension not supported
    const floatLinearExtensionSupported = renderer.extensions.get('OES_texture_float_linear');
    // initialize render targs
    target1 = new _three.WebGLRenderTarget(1, 1, {
        type: floatLinearExtensionSupported ? _three.FloatType : _three.HalfFloatType,
        colorSpace: _three.LinearSRGBColorSpace
    });
    target2 = new _three.WebGLRenderTarget(1, 1, {
        type: floatLinearExtensionSupported ? _three.FloatType : _three.HalfFloatType,
        colorSpace: _three.LinearSRGBColorSpace
    });
    materials = [];
    const url = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/FlightHelmet/glTF/FlightHelmet.gltf';
    const gltfPromise = new (0, _gltfloaderJs.GLTFLoader)().setMeshoptDecoder((0, _meshoptDecoderModuleJs.MeshoptDecoder)).loadAsync(url).then(async (gltf)=>{
        const group = new _three.Group();
        // scale the scene to a reasonable size
        const box = new _three.Box3();
        box.setFromObject(gltf.scene);
        const sphere = new _three.Sphere();
        box.getBoundingSphere(sphere);
        gltf.scene.scale.setScalar(2.5 / sphere.radius);
        gltf.scene.position.y = -0.25 * (box.max.y - box.min.y) * 2.5 / sphere.radius;
        gltf.scene.updateMatrixWorld();
        group.add(gltf.scene);
        // position the floor
        box.setFromObject(gltf.scene);
        const floor = new _three.Mesh(new _three.CylinderGeometry(3, 3, 0.05, 200), new _three.MeshStandardMaterial({
            color: 0x1a1a1a
        }));
        floor.geometry.clearGroups();
        floor.position.y = box.min.y - 0.025;
        group.add(floor);
        await _mikktspaceModuleJs.ready;
        // requires bundle support for top level await
        group.traverse((c)=>{
            if (c.geometry) {
                const geometry = c.geometry;
                if (!('tangent' in geometry.attributes) && 'normal' in geometry.attributes && 'uv' in geometry.attributes) {
                    c.geometry = (0, _bufferGeometryUtilsJs.computeMikkTSpaceTangents)(geometry, _mikktspaceModuleJs);
                    c.geometry = (0, _bufferGeometryUtilsJs.mergeVertices)(geometry);
                }
            }
        });
        group.updateMatrixWorld(true);
        return {
            ...new (0, _pathTracingSceneGeneratorJs.PathTracingSceneGenerator)(group).generate(),
            scene: group
        };
    }).then((result)=>{
        const { bvh } = result;
        const bvhUniform = new (0, _threeMeshBvh.MeshBVHUniformStruct)();
        bvhUniform.updateFrom(bvh);
        // TODO: for some reason creating multiple materials _really_ slows down the rendering?
        const materialMap = new Map();
        const group = result.scene;
        group.traverse((c)=>{
            // reuse materials as much as possible since different ones cause slow down
            if (c.isMesh) {
                const normalMap = c.material.normalMap;
                if (!materialMap.has(normalMap)) {
                    const material = new (0, _ambientOcclusionMaterialJs.AmbientOcclusionMaterial)({
                        bvh: bvhUniform,
                        normalScale: c.material.normalScale,
                        normalMap,
                        normalMapType: c.material.normalMapType
                    });
                    materialMap.set(normalMap, material);
                    materials.push(material);
                }
                c.material = materialMap.get(normalMap);
            }
        });
        scene.add(group);
    });
    await gltfPromise;
    document.getElementById('loading').remove();
    onResize();
    window.addEventListener('resize', onResize);
    const gui = new (0, _lilGuiModuleMinJs.GUI)();
    gui.add(params, 'renderScale', 0.1, 1).onChange(onResize);
    gui.add(params, 'samplesPerFrame', 1, 10, 1);
    gui.add(params, 'radius', 0, 4).onChange(reset);
    gui.add(params, 'accumulate').onChange(reset);
    gui.add(params, 'pause');
    stats = new (0, _statsModuleJsDefault.default)();
    document.body.appendChild(stats.domElement);
    reset();
    animate();
}
function onResize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const dpr = window.devicePixelRatio * params.renderScale;
    target1.setSize(w * dpr, h * dpr);
    target2.setSize(w * dpr, h * dpr);
    renderer.setSize(w, h);
    renderer.setPixelRatio(window.devicePixelRatio);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    reset();
}
function reset() {
    samples = 0;
    totalSamples = 0;
}
function animate() {
    requestAnimationFrame(animate);
    stats.update();
    // update all the material parameters
    materials.forEach((material)=>{
        if (!params.pause) material.seed++;
        material.radius = params.radius;
        material.setDefine('SAMPLES', params.samplesPerFrame);
    });
    // update the render targets if it's a first frame or not paused
    if (samples === 0 || !params.pause) {
        samples++;
        totalSamples += params.samplesPerFrame;
        if (params.accumulate && !params.pause) {
            const w = target1.width;
            const h = target1.height;
            camera.setViewOffset(w, h, Math.random() - 0.5, Math.random() - 0.5, w, h);
        }
        renderer.setRenderTarget(target1);
        renderer.render(scene, camera);
        renderer.setRenderTarget(target2);
        renderer.autoClear = false;
        fsQuad.material.map = target1.texture;
        fsQuad.material.opacity = params.accumulate ? 1 / samples : 1;
        fsQuad.render(renderer);
        renderer.autoClear = true;
    }
    // render to screen
    renderer.setRenderTarget(null);
    fsQuad.material.map = target2.texture;
    fsQuad.material.opacity = 1;
    fsQuad.render(renderer);
    samplesEl.innerText = `Samples: ${totalSamples}`;
}

},{"three":"ktPTu","three/examples/jsm/postprocessing/Pass.js":"i2IfB","three/examples/jsm/loaders/GLTFLoader.js":"dVRsF","three/examples/jsm/controls/OrbitControls.js":"7mqRv","../src/core/PathTracingSceneGenerator.js":"ul5NI","three/examples/jsm/libs/meshopt_decoder.module.js":"Go3D5","three/examples/jsm/libs/lil-gui.module.min.js":"dUXFx","../src/materials/surface/AmbientOcclusionMaterial.js":"6Rpw8","three/examples/jsm/libs/stats.module.js":"6xUSB","three-mesh-bvh":"6y2ur","three/examples/jsm/libs/mikktspace.module.js":"ebumH","three/examples/jsm/utils/BufferGeometryUtils.js":"5o7x9","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6Rpw8":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "AmbientOcclusionMaterial", ()=>AmbientOcclusionMaterial);
var _three = require("three");
var _materialBaseJs = require("../MaterialBase.js");
var _threeMeshBvh = require("three-mesh-bvh");
var _indexJs = require("../../shader/structs/index.js");
var _indexJs1 = require("../../shader/sampling/index.js");
var _indexJs2 = require("../../shader/rand/index.js");
class AmbientOcclusionMaterial extends (0, _materialBaseJs.MaterialBase) {
    get normalMap() {
        return this.uniforms.normalMap.value;
    }
    set normalMap(v) {
        this.uniforms.normalMap.value = v;
        this.setDefine('USE_NORMALMAP', v ? null : '');
    }
    get normalMapType() {
        return 0, _three.TangentSpaceNormalMap;
    }
    set normalMapType(v) {
        if (v !== (0, _three.TangentSpaceNormalMap)) throw new Error('AmbientOcclusionMaterial: Only tangent space normal map are supported');
    }
    constructor(parameters){
        super({
            defines: {
                SAMPLES: 10
            },
            uniforms: {
                bvh: {
                    value: new (0, _threeMeshBvh.MeshBVHUniformStruct)()
                },
                radius: {
                    value: 1.0
                },
                seed: {
                    value: 0
                },
                normalMap: {
                    value: null
                },
                normalScale: {
                    value: new (0, _three.Vector2)(1, 1)
                }
            },
            vertexShader: /* glsl */ `

				varying vec3 vNorm;
				varying vec3 vPos;

				#if defined( USE_NORMALMAP ) && defined( USE_TANGENT )

					varying vec2 vUv;
					varying vec4 vTan;

				#endif

				void main() {

					vec4 mvPosition = vec4( position, 1.0 );
					mvPosition = modelViewMatrix * mvPosition;
					gl_Position = projectionMatrix * mvPosition;

					mat3 modelNormalMatrix = transpose( inverse( mat3( modelMatrix ) ) );
					vNorm = normalize( modelNormalMatrix * normal );
					vPos = ( modelMatrix * vec4( position, 1.0 ) ).xyz;

					#if defined( USE_NORMALMAP ) && defined( USE_TANGENT )

						vUv = uv;
						vTan = tangent;

					#endif

				}

			`,
            fragmentShader: /* glsl */ `
				#define RAY_OFFSET 1e-4

				precision highp isampler2D;
				precision highp usampler2D;
				precision highp sampler2DArray;
				#include <common>
				#include <cube_uv_reflection_fragment>

				// bvh
				${(0, _threeMeshBvh.BVHShaderGLSL).common_functions}
				${(0, _threeMeshBvh.BVHShaderGLSL).bvh_struct_definitions}
				${(0, _threeMeshBvh.BVHShaderGLSL).bvh_ray_functions}

				// uniform structs
				${_indexJs.material_struct}

				// rand
				${_indexJs2.pcg_functions}

				// common
				${_indexJs1.shape_sampling_functions}

				uniform BVH bvh;
				uniform int seed;
				uniform float radius;

				varying vec3 vNorm;
				varying vec3 vPos;

				#if defined(USE_NORMALMAP) && defined(USE_TANGENT)

					uniform sampler2D normalMap;
					uniform vec2 normalScale;
					varying vec2 vUv;
					varying vec4 vTan;

				#endif

				void main() {

					rng_initialize( gl_FragCoord.xy, seed );

					// compute the flat face surface normal
					vec3 fdx = vec3( dFdx( vPos.x ), dFdx( vPos.y ), dFdx( vPos.z ) );
					vec3 fdy = vec3( dFdy( vPos.x ), dFdy( vPos.y ), dFdy( vPos.z ) );
					vec3 faceNormal = normalize( cross( fdx, fdy ) );

					// find the max component to scale the offset to account for floating point error
					vec3 absPoint = abs( vPos );
					float maxPoint = max( absPoint.x, max( absPoint.y, absPoint.z ) );
					vec3 normal = vNorm;

					#if defined( USE_NORMALMAP ) && defined( USE_TANGENT )

						// some provided tangents can be malformed (0, 0, 0) causing the normal to be degenerate
						// resulting in NaNs and slow path tracing.
						if ( length( vTan.xyz ) > 0.0 ) {

							vec2 uv = vUv;
							vec3 tangent = normalize( vTan.xyz );
							vec3 bitangent = normalize( cross( normal, tangent ) * vTan.w );
							mat3 vTBN = mat3( tangent, bitangent, normal );

							vec3 texNormal = texture2D( normalMap, uv ).xyz * 2.0 - 1.0;
							texNormal.xy *= normalScale;
							normal = vTBN * texNormal;

						}

					#endif

					normal *= gl_FrontFacing ? 1.0 : - 1.0;

					vec3 rayOrigin = vPos + faceNormal * ( maxPoint + 1.0 ) * RAY_OFFSET;
					float accumulated = 0.0;
					for ( int i = 0; i < SAMPLES; i ++ ) {

						// sample the cosine weighted hemisphere and discard the sample if it's below
						// the geometric surface
						vec3 rayDirection = sampleHemisphere( normalize( normal ), pcgRand4().xy );

						// check if we hit the mesh and its within the specified radius
						float side = 1.0;
						float dist = 0.0;
						vec3 barycoord = vec3( 0.0 );
						vec3 outNormal = vec3( 0.0 );
						uvec4 faceIndices = uvec4( 0u );

						// if the ray is above the geometry surface, and it doesn't hit another surface within the specified radius then
						// we consider it lit
						if (
							dot( rayDirection, faceNormal ) > 0.0 &&
							(
								! bvhIntersectFirstHit( bvh, rayOrigin, rayDirection, faceIndices, outNormal, barycoord, side, dist ) ||
								dist >= radius
							)
						) {

							accumulated += 1.0;

						}

					}

					gl_FragColor.rgb = vec3( accumulated / float( SAMPLES ) );
					gl_FragColor.a = 1.0;

				}

			`
        });
        this.setValues(parameters);
    }
}

},{"three":"ktPTu","../MaterialBase.js":"hgRM3","three-mesh-bvh":"6y2ur","../../shader/structs/index.js":"ey0rD","../../shader/sampling/index.js":"k0HOQ","../../shader/rand/index.js":"Lo4Te","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6xUSB":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var Stats = function() {
    var mode = 0;
    var container = document.createElement('div');
    container.style.cssText = 'position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000';
    container.addEventListener('click', function(event) {
        event.preventDefault();
        showPanel(++mode % container.children.length);
    }, false);
    //
    function addPanel(panel) {
        container.appendChild(panel.dom);
        return panel;
    }
    function showPanel(id) {
        for(var i = 0; i < container.children.length; i++)container.children[i].style.display = i === id ? 'block' : 'none';
        mode = id;
    }
    //
    var beginTime = (performance || Date).now(), prevTime = beginTime, frames = 0;
    var fpsPanel = addPanel(new Stats.Panel('FPS', '#0ff', '#002'));
    var msPanel = addPanel(new Stats.Panel('MS', '#0f0', '#020'));
    if (self.performance && self.performance.memory) var memPanel = addPanel(new Stats.Panel('MB', '#f08', '#201'));
    showPanel(0);
    return {
        REVISION: 16,
        dom: container,
        addPanel: addPanel,
        showPanel: showPanel,
        begin: function() {
            beginTime = (performance || Date).now();
        },
        end: function() {
            frames++;
            var time = (performance || Date).now();
            msPanel.update(time - beginTime, 200);
            if (time >= prevTime + 1000) {
                fpsPanel.update(frames * 1000 / (time - prevTime), 100);
                prevTime = time;
                frames = 0;
                if (memPanel) {
                    var memory = performance.memory;
                    memPanel.update(memory.usedJSHeapSize / 1048576, memory.jsHeapSizeLimit / 1048576);
                }
            }
            return time;
        },
        update: function() {
            beginTime = this.end();
        },
        // Backwards Compatibility
        domElement: container,
        setMode: showPanel
    };
};
Stats.Panel = function(name, fg, bg) {
    var min = Infinity, max = 0, round = Math.round;
    var PR = round(window.devicePixelRatio || 1);
    var WIDTH = 80 * PR, HEIGHT = 48 * PR, TEXT_X = 3 * PR, TEXT_Y = 2 * PR, GRAPH_X = 3 * PR, GRAPH_Y = 15 * PR, GRAPH_WIDTH = 74 * PR, GRAPH_HEIGHT = 30 * PR;
    var canvas = document.createElement('canvas');
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    canvas.style.cssText = 'width:80px;height:48px';
    var context = canvas.getContext('2d');
    context.font = 'bold ' + 9 * PR + 'px Helvetica,Arial,sans-serif';
    context.textBaseline = 'top';
    context.fillStyle = bg;
    context.fillRect(0, 0, WIDTH, HEIGHT);
    context.fillStyle = fg;
    context.fillText(name, TEXT_X, TEXT_Y);
    context.fillRect(GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT);
    context.fillStyle = bg;
    context.globalAlpha = 0.9;
    context.fillRect(GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT);
    return {
        dom: canvas,
        update: function(value, maxValue) {
            min = Math.min(min, value);
            max = Math.max(max, value);
            context.fillStyle = bg;
            context.globalAlpha = 1;
            context.fillRect(0, 0, WIDTH, GRAPH_Y);
            context.fillStyle = fg;
            context.fillText(round(value) + ' ' + name + ' (' + round(min) + '-' + round(max) + ')', TEXT_X, TEXT_Y);
            context.drawImage(canvas, GRAPH_X + PR, GRAPH_Y, GRAPH_WIDTH - PR, GRAPH_HEIGHT, GRAPH_X, GRAPH_Y, GRAPH_WIDTH - PR, GRAPH_HEIGHT);
            context.fillRect(GRAPH_X + GRAPH_WIDTH - PR, GRAPH_Y, PR, GRAPH_HEIGHT);
            context.fillStyle = bg;
            context.globalAlpha = 0.9;
            context.fillRect(GRAPH_X + GRAPH_WIDTH - PR, GRAPH_Y, PR, round((1 - value / maxValue) * GRAPH_HEIGHT));
        }
    };
};
exports.default = Stats;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ebumH":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
* Generates vertex tangents for the given position/normal/texcoord attributes.
* @param {Float32Array} position
* @param {Float32Array} normal
* @param {Float32Array} texcoord
* @returns {Float32Array}
*/ parcelHelpers.export(exports, "generateTangents", ()=>generateTangents);
parcelHelpers.export(exports, "__wbindgen_string_new", ()=>__wbindgen_string_new);
parcelHelpers.export(exports, "__wbindgen_rethrow", ()=>__wbindgen_rethrow);
parcelHelpers.export(exports, "wasm", ()=>wasm);
parcelHelpers.export(exports, "isReady", ()=>isReady);
parcelHelpers.export(exports, "ready", ()=>ready);
const lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;
let cachedTextDecoder = new lTextDecoder('utf-8', {
    ignoreBOM: true,
    fatal: true
});
cachedTextDecoder.decode();
let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    return cachegetUint8Memory0;
}
function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}
const heap = new Array(32).fill(undefined);
heap.push(undefined, null, true, false);
let heap_next = heap.length;
function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];
    heap[idx] = obj;
    return idx;
}
function getObject(idx) {
    return heap[idx];
}
function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}
function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}
let cachegetFloat32Memory0 = null;
function getFloat32Memory0() {
    if (cachegetFloat32Memory0 === null || cachegetFloat32Memory0.buffer !== wasm.memory.buffer) cachegetFloat32Memory0 = new Float32Array(wasm.memory.buffer);
    return cachegetFloat32Memory0;
}
let WASM_VECTOR_LEN = 0;
function passArrayF32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4);
    getFloat32Memory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}
let cachegetInt32Memory0 = null;
function getInt32Memory0() {
    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
    return cachegetInt32Memory0;
}
function getArrayF32FromWasm0(ptr, len) {
    return getFloat32Memory0().subarray(ptr / 4, ptr / 4 + len);
}
function generateTangents(position, normal, texcoord) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        var ptr0 = passArrayF32ToWasm0(position, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = passArrayF32ToWasm0(normal, wasm.__wbindgen_malloc);
        var len1 = WASM_VECTOR_LEN;
        var ptr2 = passArrayF32ToWasm0(texcoord, wasm.__wbindgen_malloc);
        var len2 = WASM_VECTOR_LEN;
        wasm.generateTangents(retptr, ptr0, len0, ptr1, len1, ptr2, len2);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var v3 = getArrayF32FromWasm0(r0, r1).slice();
        wasm.__wbindgen_free(r0, r1 * 4);
        return v3;
    } finally{
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}
const __wbindgen_string_new = function(arg0, arg1) {
    var ret = getStringFromWasm0(arg0, arg1);
    return addHeapObject(ret);
};
const __wbindgen_rethrow = function(arg0) {
    throw takeObject(arg0);
};
//
const wasmDataURI = 'data:application/octet-stream;base64,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TQ0WIARBAnRqIgQgBCgCAEEBajYCACACQQRqIQIgA0F/aiIDDQALCyABQdgFaigCACABKALgBUUNFUEAIQJBADYCAEEBIQQDQCABQfgCaiABQdgFahBjIAEoAvwCIgMgBEF/aiIHTQ0UIAEoAvgCIAJqKAIAIQMgAUHwAmogAUHoBWoQYyABKAL0AiINIAdNDRMgASgC8AIgAmooAgAhByABQdgFaigCACENIAEoAuAFIhEgBE0NEiACIA1qQQRqIAMgB2o2AgAgAkEEaiECIARBAWoiBEGAEEcNAAsgCEEJTwRAQQAhBCABQZgGakEAQQRBCCAGGyALG2ohCCAFIQMDQCABQegCaiADKAIAEGEgAUGYBmogACABKALoAiABKALsAhAxIDAgLiAIKgIAEDwhAiABQeACaiABQdgFahBjIAEoAuQCIgYgAk0NEiABQcgFaigCACABKALQBSINIAJBAnQiBiABKALgAmooAgAiC00NESABQdgCaiABQfgFahBjIAEoAtwCIg0gAk0NECALQQJ0aiABKALYAiAGaigCAEECdGogBDYCACABQfgFaigCACELIAEoAoAGIgcgAk0NDyAGIAtqIgIgAigCAEEBajYCACADQQRqIQMgCiAEQQFqIgRHDQALCyABQdACaiABQegFahBjIAEoAtQCRQ0MIAEoAtACKAIAIQNBBCECQQEhBANAIAFByAJqIAFB6AVqEGMgASgCzAIiCiAETQ0MIAMgASgCyAIgAmooAgBJBEAgAUHAAmogAUHoBWoQYyABKALEAiIDIARNDQwgASgCwAIgAmooAgAhAwsgAkEEaiECIARBAWoiBEGAEEcNAAsgAUHgA2oiAkIANwIAIAJBCGpCADcCACABQaAGaiABQegDaikDADcDACABIAEpA+ADNwOYBiABQYgGaiABQZgGaiADEEEgASgCiAYhCiABKAKQBiELQQAhBgNAIAFBuAJqIAFB2AVqEGMgASgCvAIiAyAGTQ0KIAFByAVqKAIAIQIgASgC0AUiBCAGQQJ0IgggASgCuAJqKAIAIgNNDQkgAUGwAmogAUHoBWoQYyABKAK0AiIEIAZNDQggASgCsAIgCGooAgAiCEECTwRAIAIgA0ECdGohBEEAIQMgCiECA0AgAUGoAmogBSAEKAIAIgdBAnRqKAIAEGEgAUGYBmogACABKAKoAiABKAKsAhAxIAMgC0YNCSACIAEoApgGNgIAIAJBBGogASgCnAY2AgAgASgCoAYhDSACQQxqIAc2AgAgAkEIaiANNgIAIARBBGohBCACQRBqIQIgCCADQQFqIgNHDQALIAUgCiAAQQAgCEF/ahAECyAGQQFqIgZBgBBHDQALIBNBASATQQFLGyEFIA5BPGohAyABQYgGahBSIAFB+AVqKAIAGiABQfgFahBWIAFB6AVqKAIAGiABQegFahBWIAFB2AVqKAIAGiABQdgFahBWIAFByAVqKAIAGiABQcgFahBWQQAhAkEAIQRBACEGQQAhBwNAIAFBoAJqIAFBwANqEGMgASgCpAIiCiAETQ0GIAEoAqACIAJqKAIAIQogAUGYAmogAUHAA2oQYyABKAKcAiILIARBAWpNDQUgASgCmAIgAmpBBGooAgAhCyABQZACaiABQcADahBjIAEoApQCIgggBEECak0NBCABKAKQAiACakEIaigCACEIIAFBiAJqIAoQYSABQYgGaiAAIAEoAogCIAEoAowCEDEgAUGAAmogCxBhIAFB4ANqIAAgASgCgAIgASgChAIQMSABQfgBaiAIEGEgAUGYBmogACABKAL4ASABKAL8ARAxAkACQCABQYgGaiABQeADahALDQAgAUGIBmogAUGYBmoQCw0AIAFB4ANqIAFBmAZqEAtFDQELIAwgBk0NBCADIAMoAgBBAXI2AgAgB0EBaiEHCyACQQxqIQIgBEEDaiEEIANByABqIQMgBSAGQQFqIgZHDQALIA4gAUHAA2ooAgAgEyAHayIKIBMQECABQcADaigCACELAkACQCAKRQRAQX8hBgwBC0EAIQYDQCAOIAZByABsaiIDQn83AgAgA0EIakF/NgIAIANBDGpCADcCACADQRRqQQA2AgAgA0E8aiADQRhqIQIgAygCPCEEQQMhAwNAIAJCADcCACACQRhqQgA3AgAgAkEQakIANwIAIAJBCGpCADcCACAEQQRyIQQgA0F/aiIDDQALIAQ2AgAgBkEBaiIGIApHDQALIAFBpAZqIQYgAUHsA2ohDEEAIQUDQCABQfABaiALIAVBDGxqIgMoAgAQYSABQagFaiAAIAEoAvABIAEoAvQBEDEgAUHoAWogA0EEaiICKAIAEGEgAUG4BWogACABKALoASABKALsARAxIAFB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AkAgASgCRBAxIAEpA4gGISsgASgCkAYhFyABQThqIAIQYSABQYgGaiAAIAEoAjggASgCPBAxIAEoAogGIQIgASgCjAYhECABKAKQBiESIAFBMGogHRBhIAFBiAZqIAAgASgCMCABKAI0EDEgASkDiAYhLCABKAKQBiEdIAEgFzYCgAYgASArNwP4BSABIBI2ApAGIAEgEDYCjAYgASACNgKIBiABQcgFaiABQfgFaiABQYgGahAVIAEgHTYCgAYgASAsNwP4BSABIBI2ApAGIAEgEDYCjAYgASACNgKIBiABQdgFaiABQfgFaiABQYgGahAVIBYgAUHQBWoiECgCADYCACABIAEpA8gFNwP4BSABQbgFaiABQcgFahARITUgBCAYKAIANgIAIAEgASkDuAU3A4gGIAFBKGogAUGIBmogGRBoIAEoAigiAiABKAIsIhJHBEADQCACIDUgAioCAJQ4AgAgEiACQQRqIgJHDQALCyABQcgFaiABQfgFaiABQYgGahAVIAQgECgCADYCACABIAEpA8gFNwOIBiABQYgGahBRBEAgBCAQKAIANgIAIAEgASkDyAU3A4gGIAFByAVqIAFBiAZqECMLIBYgAUHgBWoiECgCADYCACABIAEpA9gFNwP4BSABQbgFaiABQdgFahARITUgBCAYKAIANgIAIAEgASkDuAU3A4gGIAFBIGogAUGIBmogGRBoIAEoAiAiAiABKAIkIhJHBEADQCACIDUgAioCAJQ4AgAgEiACQQRqIgJHDQALCyABQdgFaiABQfgFaiABQYgGahAVIAQgECgCADYCACABIAEpA9gFNwOIBiABQYgGahBRBEAgBCAQKAIANgIAIAEgASkD2AU3A4gGIAFB2AVqIAFBiAZqECMLQwAAgD8gAUHIBWogAUHYBWoQESI1QwAAgL+XIDVDAACAP14buxAOIA8qAjQhNSAPKgIwITcgFiADKAIANgIAIAEgASkDmAY3A/gFIAEgMjgCkAYgASAvOAKMBiABIDM4AogGIAFBGGogAUGIBmogGRBotiEvIAEoAhgiAiABKAIcIg9HBEADQCACIAIqAgAgL5Q4AgAgDyACQQRqIgJHDQALCyABQZgGaiABQfgFaiABQYgGahAWIBYgFUEIaiIPKAIANgIAIAEgFSkCADcD+AUgASAxOAKQBiABIDA4AowGIAEgNDgCiAYgAUEQaiABQYgGaiAZEGggASgCECICIAEoAhQiEEcEQANAIAIgAioCACAvlDgCACAQIAJBBGoiAkcNAAsLIAFB6AVqIAFB+AVqIAFBiAZqEBYgDyABQfAFaigCADYCACAVIAEpA+gFNwIAIAEgNyAvlCABKgKkBpI4AqQGIAEgNSAvlCABKgK0BpI4ArQGIC4gL5IhLgsgCSAHQQFqIgdHDQALDAQLIAkgD0HcgsAAED8ACyAFIAJB7ILAABA/AAsgDCACQfyCwAAQPwALIAwgB0GMg8AAED8ACyAEIAMoAgA2AgAgASABKQOYBjcDiAYgAUGIBmoQUQRAIAQgAygCADYCACABIAEpA5gGNwOIBiABQZgGaiABQYgGahAjCyAEIBVBCGoiAigCADYCACABIBUpAgA3A4gGIAFBiAZqEFEEQCAEIAIoAgA2AgAgASAVKQIANwOIBiABQfgFaiABQYgGahAjIAIgAUGABmooAgA2AgAgFSABKQP4BTcCAAsgLkMAAAAAXkEBc0UEQCABIAEqAqQGIC6VOAKkBiABIAEqArQGIC6VOAK0BgsgASgC4AQiAiAMTQ0DIAEoAtgEIAxBKGxqIAFBmAZqQSgQTiAMQQFqIQwLICAEQCAIKAJAIAggKGpBxABqLQAAaiICICJPDQICfyAUIAJBKGxqIgIoAiBBAUcEQCABKALgBCIEIAVNDQYgAiABKALYBCAFQShsakEoEDsaQQEMAQsgASgC4AQiBCAFTQ0GIAFBmAZqIAIgASgC2AQgBUEobGoQBSACIAFBmAZqQSgQTkECCyEFIAJBIGogBTYCACACICYtAAA6ACQgESgCABogERBWIB9BAWoiHyANKAIASA0BDAYLC0F/QQRBrIPAABA/AAsgAiAiQbyDwAAQPwALIAwgAkGcg8AAED8ACyAFIARBzIPAABA/AAsgBSAEQdyDwAAQPwALICNBAWoiIyAGRw0ACyABQfgEaigCABogAUH4BGoQViABQegEahBJIAFB6ARqEFIgAUHYBGoQVCABKALIBCEUIAEoAtADIQsLIAFBwANqKAIAIQUgCiATSARAIBtBAUghCSAKIQMDQCALIANByABsaiIELQA8QQJxRQRAIANBA2whDCAEQUBrIQhBACEGA0ACQCAJDQAgBSAGIAxqQQJ0aigCACEOQQAhAgNAAkAgAiAOIAUgAkECdGooAgAiB0ciDWohAiAHIA5GDQAgAiAbSA0BCwsgDQ0AIBQgCCgCACAEIAZqQcQAai0AAGpBKGxqIBQgCyACQQNuIg5ByABsaiIHKAJAIAcgAiAOQQNsa2pBxABqLQAAakEobGpBKBA7GgsgBkEBaiIGQQNHDQALCyADICVGIANBAWohA0UNAAsLIApBAU4EQCALQcQAaiEEQQAhBQNAAkAgCyAFQcgAbGoiAy0APEECcUUNACABQQA2AugDIAFCADcD4AMgAUEIaiADKAI4IgYCf0EBQQEgA0HFAGotAABBH3F0QQEgAy0AREEfcXRyQQEgA0HGAGotAABBH3F0ciICQQJxRQ0AGkECIAJBBHFFDQAaQQBBAyACQQhxGwsiDhBmEGEgAUGYBmogACABKAIIIAEoAgwQMSABQegDaiABQaAGaigCADYCACABIAEpA5gGNwPgAyADQUBrIQNBACECA0AgASAGIAIgBGotAAAiCRBmEGEgAUGYBmogACABKAIAIAEoAgQQMSABQZgGaiABQeADahALBEAgFCADKAIAIgMgDmpBKGxqIBQgAyAJakEobGpBKBA7GgwCCyACQQFqIgJBA0cNAAsLIARByABqIQQgBUEBaiIFIApHDQALCyABKALQBCEFQQAhBkEAIQkDQEEAIAUgCWsiAyADIAVLGyEKIBQgCUEobGohDkEAIQNBACEEA0AgBCAKRg0DIAMgDmoiAikCACErIAEgAkEIaigCADYC6AMgASArNwLgAyAAIAFB4ANqIAJBDGoqAgAgAkEcaioCACACQSRqLQAAEB8gBEEBaiEEIANBKGoiA0H4AEcNAAsgBCAJaiEJIAZBAWoiBiATRw0ACyABQcgEahBUIAFBuARqKAIAGiABQbgEahBWIAFBqARqEFIgAUHQA2oQUyABQcADaigCABogAUHAA2oQVkEBIQILIAFB4AZqJAAgAg8LIAQgCWogBUHMgsAAED8ACyAGIAxBvILAABA/AAsgBEECaiAIQayCwAAQPwALIARBAWogC0GcgsAAED8ACyAEIApBjILAABA/AAsgCyALQdyFwAAQPwALIAYgBEHMhcAAED8ACyADIARBvIXAABA/AAsgBiADQayFwAAQPwALIAQgA0GchcAAED8ACyAEIApBjIXAABA/AAtBAEEA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AiALIANBEGogAiABIANBIGoQLSADQRhqKAIAIQEgAygCFCECIAMoAhBBAUYNASAAIAI2AgAgACABQShuNgIECyADQTBqJAAPCyADQQhqIAIgARBoIAMoAgghASADKAIMDAELIAMgAkEAEGggAygCACEBIAMoAgQLIgAEQCABIAAQcAALEGsAC6cCAgN/AX4jAEEwayIDJAACfwJAAkAgACgCBCIEIAFrIAJJBEAgASACaiICIAFJDQJBBCEBAkAgBEEBdCIFIAIgBSACSxsiAkEEIAJBBEsbrUIMfiIGQiCIp0UEQCAGpyECDAELIAAoAgQhBEEAIQELAkAgBARAIAAoAgAhBSADQShqQQQ2AgAgAyAEQQxsNgIkIAMgBTYCIAwBCyADQQA2AiALIANBEGogAiABIANBIGoQLSADQRhqKAIAIQEgAygCFCECIAMoAhBBAUYNASAAIAI2AgAgACABQQxuNgIECyADQTBqJAAPCyADQQhqIAIgARBoIAMoAgghASADKAIMDAELIAMgAkEAEGggAygCACEBIAMoAgQLIgAEQCABIAAQcAALEGsAC6gCAQN/IwBBMGsiAyQAAn8CQAJAIAAoAgQiBCABayACSQRAIAEgAmoiAiABSQ0CQQQhAQJAIARBAXQiBSACIAUgAksbIgJBBCACQQRLGyICQf////8DcSACRgRAIAJBAnQhAgwBCyAAKAIEIQRBACEBCwJAIAQEQCAAKAIAIQUgA0EoakEENgIAIAMgBEECdDYCJCADIAU2AiAMAQsgA0EANgIgCyADQRBqIAIgASADQSBqEC0gA0EYaigCACEBIAMoAhQhAiADKAIQQQFGDQEgACACNgIAIAAgAUECdjYCBAsgA0EwaiQADwsgA0EIaiACIAEQaCADKAIIIQEgAygCDAwBCyADIAJBABBoIAMoAgAhASADKAIECyIABEAgASAAEHAACxBrAAuoAgEDfyMAQTBrIgMkAAJ/AkACQCAAKAIEIgQgAWsgAkkEQCABIAJqIgIgAUkNAkEEIQECQCAEQQF0IgUgAiAFIAJLGyICQQQgAkEESxsiAkH/////AHEgAkYEQCACQQR0IQIMAQsgACgCBCEEQQAhAQsCQCAEBEAgACgCACEFIANBKGpBBDYCACADIARBBHQ2AiQgAyAFNgIgDAELIANBADYCIAsgA0EQ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aiEDIAUoAggiBiAFKAIMIgdJBEAgByAGayEIA0AgAikCACEJIANBCGogAkEIaikCADcCACADIAk3AgAgA0EQaiEDIAhBf2oiCA0ACyAEIAdqIAZrIQQLIAAgAQR/IAIpAgAhCSADQQhqIAJBCGopAgA3AgAgAyAJNwIAIARBAWoFIAQLNgIIIAVBEGokAAuqAQMBfwN+An0jAEEgayICJAAgAkEYaiABKAIAEGEgACACKAIYIAIoAhwQPSEDIAJBEGogASgCBBBhIAAgAigCECACKAIUED0hBCACQQhqIAEoAggQYSAAIAIoAgggAigCDBA9IQUgAkEgaiQAIASnviADp74iBpMgBUIgiKe+IANCIIinviIHk5QgBEIgiKe+IAeTIAWnviAGk5STIgaMIAYgBkMAAAAAXRsLsQEBBX8jAEEQayIDJAACQCAAKAIEIgIgAU8EQAJAIAIEQCACQQJ0IQIgACgCACEEAkAgAUECdCIFRQRAQQQhBiACRQ0BIAQgAkEEEGoMAQsgBCACQQQgBRBiIgZFDQILIAAgBjYCACAAIAFB/////wNxNgIECyADQRBqJAAPCyADQQhqIAVBBBBoIAMoAgwiAEUNASADKAIIIAAQcAALQcWIwABBJEHsiMAAEEgACxBrAAu2AQEBfyMAQRBrIgMkAAJAIABFDQAgAyAANgIEIAFFDQACQCACQQRLDQAgAUEDakECdkF/aiIAQf8BSw0AIANBoJXAADYCCCADIABBAnRBpJXAAGoiACgCADYCDCADQQRqIANBDGogA0EIakGUicAAEBMgACADKAIMNgIADAELIANBoJXAACgCADYCDCADQQRqIANBDGpB/IjAAEH8iMAAEBNBoJXAACADKAIMNgIACyADQRBqJAALmQEBBn8jAEEQayIFJAAgACAAKAIIIAEQGCAAKAIAIAAoAgghAyAFQQhqQQEgARBoIANByABsaiEEIAUoAggiBiAFKAIMIgdJBEAgByAGayEIA0AgBCACQcgAEDtByABqIQQgCEF/aiIIDQALIAMgB2ogBmshAwsgACABBH8gBCACQcgAEDsaIANBAWoFIAMLNgIIIAVBEGokAAuVAQEGfyMAQRBrIgUkACAAIAAoAgggARAZIAAoAgAgACgCCCEDIAVBCGpBASABEGggA0EobGohBCAFKAIIIgYgBSgC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AWoiAiABIAJLG0GHgARqIgFBEHZAACICQX9GBEBBACEDQQEMAQsgAkEQdCIDQgA3AwAgA0EANgIIIAMgAyABQYCAfHFqQQJyNgIAQQALIQIgACADNgIEIAAgAjYCAAtvAQF/AkAgASAATwRAIAJFDQEgACEDA0AgAyABLQAAOgAAIAFBAWohASADQQFqIQMgAkF/aiICDQALDAELIAJFDQAgAUF/aiEBIABBf2ohAwNAIAIgA2ogASACai0AADoAACACQX9qIgINAAsLIAALbwECfwJ/IAIgAJMgASAAk5VDAAAARZQiAEMAAADPYCIDQQFzIABD////Tl9FckUEQCAAqAwBC0H/////B0GAgICAeCADGyIEIARBACAAQ////05fGyADGwsiA0EAIANBAEobIgNB/w8gA0H/D0gbC2YBAX8CQCAAQSBqKAIAIgMgAUEGbCACQQF0aiIBSwRAIAMgAUEBciICTQ0BIAAoAhgiACACQQJ0ajUCAEIghiAAIAFBAnRqNQIAhA8LIAEgA0HsgMAAED8ACyACIANB/IDAABA/AAtrAQJ/IwBBEGsiBiQAAkAgACABIAIgAyAEEAoiBQ0AIAZBCGogAyAAIAEgBCgCDBEFAEEAIQUgBigCCA0AIAYoAgwiBSACKAIANgIIIAIgBTYCACAAIAEgAiADIAQQCiEFCyAGQRBqJAAgBQtsAQF/IwBBMGsiAyQAIAMgATYCBCADIAA2AgAgA0EcakECNgIAIANBLGpBHTYCACADQgI3AgwgA0G0kMAANgIIIANBHTYCJCADIANBIGo2AhggAyADNgIoIAMgA0EEajYCICADQQhqIAIQWQALVAEBfyMAQSBrIgIkACACIAAoAgA2AgQgAkEYaiABQRBqKQIANwMAIAJBEGogAUEIaikCADcDACACIAEpAgA3AwggAkEEaiACQQhqEAggAkEgaiQAC1kCAX8BfiMAQSBrIgMkACADQQhqIAIQNyADKQMIIQQgAEEANgIIIAAgBDcCACADQRhqIAFBCGopAgA3AwAgAyABKQIANwMQIAAgAiADQRBqECcgA0EgaiQAC1kCAX8BfiMAQSBrIgMkACADQQhqIAIQNCADKQMIIQQgAEEANgIIIAAgBDcCACADQRhqIAFBCGooAgA2AgAgAyABKQIANwMQIAAgAiADQRBqECYgA0EgaiQAC1kCAX8BfiMAQSBrIgMkACADQQhqIAIQNyADKQMIIQQgAEEANgIIIAAgBDcCACADQRhqIAFBCGopAgA3AwAgAyABKQIANwMQIAAgAiADQRBqECAgA0EgaiQAC1QBAn8gASgCACECIAFBADYCAAJAIAIEQCABKAIEIQNBCEEEEGciAUUNASABIAM2AgQgASACNgIAIABByI3AADYCBCAAIAE2AgAPCwALQQhBBBBwAAtKAgF/AX4jAEHQAGsiAyQAIAMgAhA2IAMpAwAhBCAAQQA2AgggACAENwIAIANBCGogAUHIABBOIAAgAiADQQhqECsgA0HQAGokAAtHAgF/AX4jAEEwayIDJAAgAyACEDUgAykDACEEIABBADYCCCAAIAQ3AgAgA0EIaiABQSgQTiAAIAIgA0EIahAsIANBMGokAAtKAAJ/IAFBgIDEAEcEQEEBIAAoAhggASAAQRxqKAIAKAIQEQIADQEaCyACRQRAQQAPCyAAKAIYIAJBACAAQRxqKAIAKAIMEQQACwtHAQF/IwBBIGsiAyQAIANBFGpBADYCACADQfCPwAA2AhAgA0IBNwIEIAMgATYCHCADIAA2AhggAyADQRhqNgIAIAMgAhBZAAs8AQF/IAAoAggiAQRAIAFBBHQhASAAKAIAQQRqIQADQCAAKAIAGiAAEFYgAEEQaiEAIAFBcGoiAQ0ACwsLOAAgAEIANwIAIABBCGpBADYCACAAQSRqQQA6AAAgAEEcakIANwIAIABBFGpCADcCACAAQgA3AgwLRAECfyABKAIEIQIgASgCACEDQQhBBBBnIgFFBEBBCEEEEHAACyABIAI2AgQgASADNgIAIABBoI/AADYCBCAAIAE2AgALPQAgAEIANwIgIAAgASkCADcCACAAIAIpAgA3AhAgAEEIaiABQQhqKQIANwIAIABBGGogAkEIaikCADcCAAtbAQN/IwBBEGsiASQAIAAoAgwiAkUEQEGAjsAAQStByI7AABBIAAsgACgCCCIDRQRAQYCOwABBK0HYjsAAEEgACyABIAI2AgggASAANgIEIAEgAzYCACABEFgACysAIAIEQANAIAAgAS0AADoAACABQQFqIQEgAEEBaiEAIAJBf2oiAg0ACwsLKQEBfyADIAIQLiIEBEAgBCAAIAMgASABIANLGxBOIAAgASACECoLIAQLLAACQCAAQXxNBEAgAEUEQEEEIQAMAgsgACAAQX1JQQJ0EGciAA0BCwALIAALNwEBf0EBIQECQCAAKgIAi0MAAIAAXg0AIAAqAgSLQwAAgABeDQAgACoCCItDAACAAF4hAQsgAQsmAQF/AkAgACgCBCIBRQ0AIAAoAgAgAUEEdCIBRQ0AIAFBBBBqCwsnAQF/AkAgACgCBCIBRQ0AIAAoAgAgAUHIAGwiAUUNACABQQQQagsLJgEBfwJAIAAoAgQiAUUNACAAKAIAIAFBKGwiAUUNACABQQQQagsLJgEBfwJAIAAoAgQiAUUNACAAKAIAIAFBDGwiAUUNACABQQQQagsLJgEBfwJAIAAoAgQiAUUNACAAKAIAIAFBAnQiAUUNACABQQQQagsLLAEBfyMAQRBrIgEkACABQQhqIABBCGooAgA2AgAgASAAKQIANwMAIAEQWwALLAEBfyMAQRBrIgEkACABQQhqIABBCGooAgA2AgAgASAAKQIANwMAIAEQMwALNAEBfyMAQRBrIgIkACACIAE2AgwgAiAANgIIIAJB8I/AADYCBCACQfCPwAA2AgAgAhBNAAspAQF/IAEEQCAAIQIDQCACQQA6AAAgAkEBaiECIAFBf2oiAQ0ACwsgAAsrAQF/IwBBEGsiASQAIAEgACkCADcDCCABQQhqQbSNwABBACAAKAIIECUACycBAX8jAEEQayICJAAgAiABNgIIIAJBHTYCBCACIAA2AgAgAhBXAAsmAQF/AkAgACgCACIBRQ0AIABBBGooAgAiAEUNACABIABBARBqCwsmAQF/AkAgACgCBCIBRQ0AIABBCGooAgAiAEUNACABIABBARBqCwshACAAQQM2AgwgACABNgIEIAAgATYCACAAIAFBDGo2AggLHQAgASgCAEUEQAALIABByI3AADYCBCAAIAE2AgALFgAgACABQQNxNgIEIAAgAUECdjYCAAsMACAAIAEgAiADEE8LFgAgACABKAIINgIEIAAgASgCADYCAAsPACABBEAgACABQQQQagsLEgAgACgCACABIAEgAmoQIkEACw0AIAFBA3EgAEECdHILCAAgACABEC4LEAAgACACNgIEIAAgATYCAAsTACAAQaCPwAA2AgQgACABNgIACwoAIAAgASACECoLEQBBzI/AAEERQeCPwAAQSAALDgAgACgCABoDQAwACwALCwAgADUCACABEBQLCwAgACMAaiQAIwALCwAgAItDAACAAF4LGQAgACABQcSdwAAoAgAiAEEPIAAbEQEAAAsFAEGABAsEAEEBCwQAIAELBABBAAsNAEL0+Z7m7qOq+f4ACw0AQve47vqqzNXu5QALDABC6dCi28yi6rtGCwMAAQsDAAELC6QVAgBBgIDAAAvBCnNyYy9saWIucnMAAAAAEAAKAAAANgAAAA0AAAAAABAACgAAADcAAAANAAAAAAAQAAoAAAA4AAAADQAAAAAAEAAKAAAAPgAAAA0AAAAAABAACgAAAD8AAAANAAAAAAAQAAoAAABAAAAADQAAAAAAEAAKAAAARgAAAA0AAAAAABAACgAAAEcAAAANAAAARmFpbGVkIHRvIGdlbmVyYXRlIHRhbmdlbnRzLi9Vc2Vycy9kb25tY2N1cmR5Ly5jYXJnby9yZWdpc3RyeS9zcmMvZ2l0aHViLmNvbS0xZWNjNjI5OWRiOWVjODIzL21pa2t0c3BhY2UtMC4yLjAvc3JjL2dlbmVyYXRlZC5ycwCoABAAYwAAANcAAAASAAAAqAAQAGMAAADYAAAAEgAAAKgAEABjAAAA2QAAABIAAACoABAAYwAAAN4AAAANAAAAqAAQAGMAAAAjAQAAOAAAAKgAEABjAAAA/QEAABUAAACoABAAYwAAAA8CAABAAAAAqAAQAGMAAAAVAgAAEQAAAKgAEABjAAAAFgIAABEAAACoABAAYwAAABgCAAARAAAAqAAQAGMAAAAjAgAAGQAAAKgAEABjAAAAJAIAADIAAACoABAAYwAAACoCAAAcAAAAqAAQAGMAAAAmAgAANAAAAKgAEABjAAAAvQUAAAkAAACoABAAYwAAAMAFAAAFAAAAqAAQAGMAAADDBQAAHAAAAKgAEABjAAAAwwUAADMAAACoABAAYwAAAMMFAAAJAAAAqAAQAGMAAADTBQAAIwAAAKgAEABjAAAA0wUAABcAAACoABAAYwAAANQFAAAYAAAAqAAQAGMAAADVBQAACQAAAKgAEABjAAAA3AUAABEAAACoABAAYwAAAN8FAAAYAAAAqAAQAGMAAADgBQAAGQAAAKgAEABjAAAA6AUAAC0AAACoABAAYwAAAOgFAAAhAAAAqAAQAGMAAADpBQAAGAAAAKgAEABjAAAA8gUAABEAAACoABAAYwAAAKcGAAANAAAAqAAQAGMAAACuBgAAEQAAAKgAEABjAAAArwYAABEAAACoABAAYwAAALAGAAARAAAAqAAQAGMAAAD9BgAACQAAAE1hdHJpeCBzbGljaW5nIG91dCBvZiBib3VuZHMuL1VzZXJzL2Rvbm1jY3VyZHkvLmNhcmdvL3JlZ2lzdHJ5L3NyYy9naXRodWIuY29tLTFlY2M2Mjk5ZGI5ZWM4MjMvbmFsZ2VicmEtMC4xOS4wL3NyYy9iYXNlL21hdHJpeF9zbGljZS5ycwBZAxAAagAAAOMAAAAJAAAAL1VzZXJzL2Rvbm1jY3VyZHkvLnJ1c3R1cC90b29sY2hhaW5zL3N0YWJsZS14ODZfNjQtYXBwbGUtZGFyd2luL2xpYi9ydXN0bGliL3NyYy9ydXN0L2xpYnJhcnkvYWxsb2Mvc3JjL3Jhd192ZWMucnNUcmllZCB0byBzaHJpbmsgdG8gYSBsYXJnZXIgY2FwYWNpdHkAAADUAxAAcQAAAMUBAAAJAAAAAQAAAAAAAAABAAAAAgAAAAMAAAAEAAAABQAAAAQAAAAEAAAABgAAAAcAAAAIAAAACQAAAAAAAAABAAAAAgAAAAMAAAAEAAAAL1VzZXJzL2Rvbm1jY3VyZHkvLnJ1c3R1cC90b29sY2hhaW5zL3N0YWJsZS14ODZfNjQtYXBwbGUtZGFyd2luL2xpYi9ydXN0bGliL3NyYy9ydXN0L2xpYnJhcnkvY29yZS9zcmMvbnVtL21vZC5yc8QEEABwAAAAnQIAAAUAQdCKwAAL0AphdHRlbXB0IHRvIGNhbGN1bGF0ZSB0aGUgcmVtYWluZGVyIHdpdGggYSBkaXZpc29yIG9mIHplcm9NYXRyaXggc2xpY2luZyBvdXQgb2YgYm91bmRzLi9Vc2Vycy9kb25tY2N1cmR5Ly5jYXJnby9yZWdpc3RyeS9zcmMvZ2l0aHViLmNvbS0xZWNjNjI5OWRiOWVjODIzL25hbGdlYnJhLTAuMTkuMC9zcmMvYmFzZS9tYXRyaXhfc2xpY2UucnOmBRAAagAAAOMAAAAJAAAAL1VzZXJzL2Rvbm1jY3VyZHkvLmNhcmdvL3JlZ2lzdHJ5L3NyYy9naXRodWIuY29tLTFlY2M2Mjk5ZGI5ZWM4MjMvbWlra3RzcGFjZS0wLjIuMC9zcmMvZ2VuZXJhdGVkLnJzACAGEABjAAAA2wIAABkAAAAgBhAAYwAAANsCAAAyAAAAIAYQAGMAAAB+AwAACAAAAAoAAAAIAAAABAAAAAsAAAAMAAAADQAAAAgAAAAEAAAADgAAABAAAAAEAAAABAAAABEAAAASAAAAEwAAABAAAAAAAAAAAQAAABQAAABjYWxsZWQgYE9wdGlvbjo6dW53cmFwKClgIG9uIGEgYE5vbmVgIHZhbHVlbGlicmFyeS9zdGQvc3JjL3Bhbmlja2luZy5ycwArBxAAHAAAAO0BAAAfAAAAKwcQABwAAADuAQAAHgAAABUAAAAQAAAABAAAABYAAAAXAAAAEAAAAAgAAAAEAAAAGAAAABkAAAAaAAAADAAAAAQAAAAbAAAAEAAAAAgAAAAEAAAAHAAAAGxpYnJhcnkvYWxsb2Mvc3JjL3Jhd192ZWMucnNjYXBhY2l0eSBvdmVyZmxvdwAAALAHEAAcAAAAHgIAAAUAAAAfAAAAAAAAAAEAAAAgAAAAaW5kZXggb3V0IG9mIGJvdW5kczogdGhlIGxlbiBpcyAgYnV0IHRoZSBpbmRleCBpcyAAAAAIEAAgAAAAIAgQABIAAAAwMDAxMDIwMzA0MDUwNjA3MDgwOTEwMTExMjEzMTQxNTE2MTcxODE5MjAyMTIyMjMyNDI1MjYyNzI4MjkzMDMxMzIzMzM0MzUzNjM3MzgzOTQwNDE0MjQzNDQ0NTQ2NDc0ODQ5NTA1MTUyNTM1NDU1NTY1NzU4NTk2MDYxNjI2MzY0NjU2NjY3Njg2OTcwNzE3MjczNzQ3NTc2Nzc3ODc5ODA4MTgyODM4NDg1ODY4Nzg4ODk5MDkxOTI5Mzk0OTU5Njk3OTg5OWxpYnJhcnkvY29yZS9zcmMvZm10L21vZC5ycwAMCRAAGwAAAFUEAAARAAAADAkQABsAAABfBAAAJAAAAAMAAAAEAAAABAAAAAYAAACD+aIARE5uAPwpFQDRVycA3TT1AGLbwAA8mZUAQZBDAGNR/gC73qsAt2HFADpuJADSTUIASQbgAAnqLgAcktEA6x3+ACmxHADoPqcA9TWCAES7LgCc6YQAtCZwAEF+XwDWkTkAU4M5AJz0OQCLX4QAKPm9APgfOwDe/5cAD5gFABEv7wAKWosAbR9tAM9+NgAJyycARk+3AJ5mPwAt6l8Auid1AOXrxwA9e/EA9zkHAJJSigD7a+oAH7FfAAhdjQAwA1YAe/xGAPCrawAgvM8ANvSaAOOpHQBeYZEACBvmAIWZZQCgFF8AjUBoAIDY/wAnc00ABgYxAMpWFQDJqHMAe+JgAGuMwAAAAABA+yH5PwAAAAAtRHQ+AAAAgJhG+DwAAABgUcx4OwAAAICDG/A5AAAAQCAlejgAAACAIoLjNgAAAAAd82k1AHsJcHJvZHVjZXJzAghsYW5ndWFnZQEEUnVzdAAMcHJvY2Vzc2VkLWJ5AwVydXN0Yx0xLjQ5LjAgKGUxODg0YThlMyAyMDIwLTEyLTI5KQZ3YWxydXMGMC4xOC4wDHdhc20tYmluZGdlbhIwLjIuNzMgKDNjZWZlMmM4Mik=';
let wasm;
let isReady = false;
const ready = fetch(wasmDataURI).then((res)=>res.arrayBuffer()).then((buffer)=>WebAssembly.instantiate(buffer, {
        './mikktspace_module_bg.js': {
            __wbindgen_string_new,
            __wbindgen_rethrow
        }
    })).then((result)=>{
    wasm = result.instance.exports;
    isReady = true;
});

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["4JijA"], "4JijA", "parcelRequire94c2")

//# sourceMappingURL=aoRender.a25b7dfc.js.map

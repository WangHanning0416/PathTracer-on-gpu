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
})({"fj5J1":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _three = require("three");
var _meshoptDecoderModuleJs = require("three/examples/jsm/libs/meshopt_decoder.module.js");
var _rgbeloaderJs = require("three/examples/jsm/loaders/RGBELoader.js");
var _gltfloaderJs = require("three/examples/jsm/loaders/GLTFLoader.js");
var _colladaLoaderJs = require("three/examples/jsm/loaders/ColladaLoader.js");
var _ldrawLoaderJs = require("three/examples/jsm/loaders/LDrawLoader.js");
var _ldrawUtilsJs = require("three/examples/jsm/utils/LDrawUtils.js");
var _lilGuiModuleMinJs = require("three/examples/jsm/libs/lil-gui.module.min.js");
var _statsModuleJs = require("three/examples/jsm/libs/stats.module.js");
var _statsModuleJsDefault = parcelHelpers.interopDefault(_statsModuleJs);
var _generateRadialFloorTextureJs = require("./utils/generateRadialFloorTexture.js");
var _indexJs = require("../src/index.js");
var _orbitControlsJs = require("three/examples/jsm/controls/OrbitControls.js");
var _getScaledSettingsJs = require("./utils/getScaledSettings.js");
var _loaderElementJs = require("./utils/LoaderElement.js");
var _parallelMeshBVHWorkerJs = require("three-mesh-bvh/src/workers/ParallelMeshBVHWorker.js");
const envMaps = {
    'Royal Esplanade': 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/equirectangular/royal_esplanade_1k.hdr',
    'Moonless Golf': 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/equirectangular/moonless_golf_1k.hdr',
    'Overpass': 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/equirectangular/pedestrian_overpass_1k.hdr',
    'Venice Sunset': 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/equirectangular/venice_sunset_1k.hdr',
    'Small Studio': 'https://raw.githubusercontent.com/gkjohnson/3d-demo-data/master/hdri/studio_small_05_1k.hdr',
    'Pfalzer Forest': 'https://raw.githubusercontent.com/gkjohnson/3d-demo-data/master/hdri/phalzer_forest_01_1k.hdr',
    'Leadenhall Market': 'https://raw.githubusercontent.com/gkjohnson/3d-demo-data/master/hdri/leadenhall_market_1k.hdr',
    'Kloppenheim': 'https://raw.githubusercontent.com/gkjohnson/3d-demo-data/master/hdri/kloppenheim_05_1k.hdr',
    'Hilly Terrain': 'https://raw.githubusercontent.com/gkjohnson/3d-demo-data/master/hdri/hilly_terrain_01_1k.hdr',
    'Circus Arena': 'https://raw.githubusercontent.com/gkjohnson/3d-demo-data/master/hdri/circus_arena_1k.hdr',
    'Chinese Garden': 'https://raw.githubusercontent.com/gkjohnson/3d-demo-data/master/hdri/chinese_garden_1k.hdr',
    'Autoshop': 'https://raw.githubusercontent.com/gkjohnson/3d-demo-data/master/hdri/autoshop_01_1k.hdr',
    'Measuring Lab': 'https://raw.githubusercontent.com/gkjohnson/3d-demo-data/master/hdri/vintage_measuring_lab_2k.hdr',
    'Whale Skeleton': 'https://raw.githubusercontent.com/gkjohnson/3d-demo-data/master/hdri/whale_skeleton_2k.hdr',
    'Hall of Mammals': 'https://raw.githubusercontent.com/gkjohnson/3d-demo-data/master/hdri/hall_of_mammals_2k.hdr',
    'Drachenfels Cellar': 'https://raw.githubusercontent.com/gkjohnson/3d-demo-data/master/hdri/drachenfels_cellar_2k.hdr',
    'Adams Place Bridge': 'https://raw.githubusercontent.com/gkjohnson/3d-demo-data/master/hdri/adams_place_bridge_2k.hdr',
    'Sepulchral Chapel Rotunda': 'https://raw.githubusercontent.com/gkjohnson/3d-demo-data/master/hdri/sepulchral_chapel_rotunda_2k.hdr',
    'Peppermint Powerplant': 'https://raw.githubusercontent.com/gkjohnson/3d-demo-data/master/hdri/peppermint_powerplant_2k.hdr',
    'Noon Grass': 'https://raw.githubusercontent.com/gkjohnson/3d-demo-data/master/hdri/noon_grass_2k.hdr',
    'Narrow Moonlit Road': 'https://raw.githubusercontent.com/gkjohnson/3d-demo-data/master/hdri/narrow_moonlit_road_2k.hdr',
    'St Peters Square Night': 'https://raw.githubusercontent.com/gkjohnson/3d-demo-data/master/hdri/st_peters_square_night_2k.hdr',
    'Brown Photostudio 01': 'https://raw.githubusercontent.com/gkjohnson/3d-demo-data/master/hdri/brown_photostudio_01_2k.hdr',
    'Rainforest Trail': 'https://raw.githubusercontent.com/gkjohnson/3d-demo-data/master/hdri/rainforest_trail_2k.hdr',
    'Brown Photostudio 07': 'https://raw.githubusercontent.com/gkjohnson/3d-demo-data/master/hdri/brown_photostudio_07_2k.hdr',
    'Brown Photostudio 06': 'https://raw.githubusercontent.com/gkjohnson/3d-demo-data/master/hdri/brown_photostudio_06_2k.hdr',
    'Dancing Hall': 'https://raw.githubusercontent.com/gkjohnson/3d-demo-data/master/hdri/dancing_hall_2k.hdr',
    'Aristea Wreck Puresky': 'https://raw.githubusercontent.com/gkjohnson/3d-demo-data/master/hdri/aristea_wreck_puresky_2k.hdr',
    'Modern Buildings 2': 'https://raw.githubusercontent.com/gkjohnson/3d-demo-data/master/hdri/modern_buildings_2_2k.hdr',
    'Thatch Chapel': 'https://raw.githubusercontent.com/gkjohnson/3d-demo-data/master/hdri/thatch_chapel_2k.hdr',
    'Vestibule': 'https://raw.githubusercontent.com/gkjohnson/3d-demo-data/master/hdri/vestibule_2k.hdr',
    'Blocky Photo Studio': 'https://raw.githubusercontent.com/gkjohnson/3d-demo-data/master/hdri/blocky_photo_studio_1k.hdr',
    'Christmas Photo Studio 07': 'https://raw.githubusercontent.com/gkjohnson/3d-demo-data/master/hdri/christmas_photo_studio_07_2k.hdr',
    'Aerodynamics Workshop': 'https://raw.githubusercontent.com/gkjohnson/3d-demo-data/master/hdri/aerodynamics_workshop_1k.hdr'
};
const models = window.MODEL_LIST || {};
const params = {
    multipleImportanceSampling: true,
    acesToneMapping: true,
    renderScale: 1 / window.devicePixelRatio,
    tiles: 2,
    model: '',
    envMap: envMaps['Aristea Wreck Puresky'],
    gradientTop: '#bfd8ff',
    gradientBottom: '#ffffff',
    environmentIntensity: 1.0,
    environmentRotation: 0,
    cameraProjection: 'Perspective',
    backgroundType: 'Gradient',
    bgGradientTop: '#111111',
    bgGradientBottom: '#000000',
    backgroundBlur: 0.0,
    transparentBackground: false,
    checkerboardTransparency: true,
    enable: true,
    bounces: 5,
    filterGlossyFactor: 0.5,
    pause: false,
    floorColor: '#111111',
    floorOpacity: 1.0,
    floorRoughness: 0.2,
    floorMetalness: 0.2,
    ...(0, _getScaledSettingsJs.getScaledSettings)()
};
let floorPlane, gui, stats;
let pathTracer, renderer, orthoCamera, perspectiveCamera, activeCamera;
let controls, scene, model;
let gradientMap;
let loader;
const orthoWidth = 2;
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
    pathTracer.setBVHWorker(new (0, _parallelMeshBVHWorkerJs.ParallelMeshBVHWorker)());
    pathTracer.physicallyCorrectLights = true;
    pathTracer.tiles.set(params.tiles, params.tiles);
    pathTracer.multipleImportanceSampling = params.multipleImportanceSampling;
    pathTracer.transmissiveBounces = 10;
    // camera
    const aspect = window.innerWidth / window.innerHeight;
    perspectiveCamera = new (0, _three.PerspectiveCamera)(60, aspect, 0.025, 500);
    perspectiveCamera.position.set(-1, 0.25, 1);
    const orthoHeight = orthoWidth / aspect;
    orthoCamera = new (0, _three.OrthographicCamera)(orthoWidth / -2, orthoWidth / 2, orthoHeight / 2, orthoHeight / -2, 0, 100);
    orthoCamera.position.set(-1, 0.25, 1);
    // background map
    gradientMap = new (0, _indexJs.GradientEquirectTexture)();
    gradientMap.topColor.set(params.bgGradientTop);
    gradientMap.bottomColor.set(params.bgGradientBottom);
    gradientMap.update();
    // controls
    controls = new (0, _orbitControlsJs.OrbitControls)(perspectiveCamera, renderer.domElement);
    controls.addEventListener('change', ()=>{
        pathTracer.updateCamera();
    });
    // scene
    scene = new (0, _three.Scene)();
    scene.background = gradientMap;
    const floorTex = (0, _generateRadialFloorTextureJs.generateRadialFloorTexture)(2048);
    floorPlane = new (0, _three.Mesh)(new (0, _three.PlaneGeometry)(), new (0, _three.MeshStandardMaterial)({
        map: floorTex,
        transparent: true,
        color: 0x111111,
        roughness: 0.1,
        metalness: 0.0,
        side: (0, _three.DoubleSide)
    }));
    floorPlane.scale.setScalar(5);
    floorPlane.rotation.x = -Math.PI / 2;
    scene.add(floorPlane);
    stats = new (0, _statsModuleJsDefault.default)();
    document.body.appendChild(stats.dom);
    updateCameraProjection(params.cameraProjection);
    onHashChange();
    updateEnvMap();
    onResize();
    animate();
    window.addEventListener('resize', onResize);
    window.addEventListener('hashchange', onHashChange);
}
function animate() {
    requestAnimationFrame(animate);
    stats.update();
    if (!model) return;
    if (params.enable) {
        if (!params.pause || pathTracer.samples < 1) pathTracer.renderSample();
    } else renderer.render(scene, activeCamera);
    loader.setSamples(pathTracer.samples, pathTracer.isCompiling);
}
function onParamsChange() {
    pathTracer.multipleImportanceSampling = params.multipleImportanceSampling;
    pathTracer.bounces = params.bounces;
    pathTracer.filterGlossyFactor = params.filterGlossyFactor;
    pathTracer.renderScale = params.renderScale;
    floorPlane.material.color.set(params.floorColor);
    floorPlane.material.roughness = params.floorRoughness;
    floorPlane.material.metalness = params.floorMetalness;
    floorPlane.material.opacity = params.floorOpacity;
    scene.environmentIntensity = params.environmentIntensity;
    scene.environmentRotation.y = params.environmentRotation;
    scene.backgroundBlurriness = params.backgroundBlur;
    if (params.backgroundType === 'Gradient') {
        gradientMap.topColor.set(params.bgGradientTop);
        gradientMap.bottomColor.set(params.bgGradientBottom);
        gradientMap.update();
        scene.background = gradientMap;
        scene.backgroundIntensity = 1;
        scene.environmentRotation.y = 0;
    } else {
        scene.background = scene.environment;
        scene.backgroundIntensity = params.environmentIntensity;
        scene.backgroundRotation.y = params.environmentRotation;
    }
    if (params.transparentBackground) {
        scene.background = null;
        renderer.setClearAlpha(0);
    }
    pathTracer.updateMaterials();
    pathTracer.updateEnvironment();
}
function onHashChange() {
    let hashModel = '';
    if (window.location.hash) {
        const modelName = decodeURI(window.location.hash.substring(1));
        if (modelName in models) hashModel = modelName;
    }
    if (!(hashModel in models)) hashModel = Object.keys(models)[0];
    params.model = hashModel;
    updateModel();
}
function onResize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const dpr = window.devicePixelRatio;
    renderer.setSize(w, h);
    renderer.setPixelRatio(dpr);
    const aspect = w / h;
    perspectiveCamera.aspect = aspect;
    perspectiveCamera.updateProjectionMatrix();
    const orthoHeight = orthoWidth / aspect;
    orthoCamera.top = orthoHeight / 2;
    orthoCamera.bottom = orthoHeight / -2;
    orthoCamera.updateProjectionMatrix();
    pathTracer.updateCamera();
}
function buildGui() {
    if (gui) gui.destroy();
    gui = new (0, _lilGuiModuleMinJs.GUI)();
    gui.add(params, 'model', Object.keys(models).sort()).onChange((v)=>{
        window.location.hash = v;
    });
    const pathTracingFolder = gui.addFolder('Path Tracer');
    pathTracingFolder.add(params, 'enable');
    pathTracingFolder.add(params, 'pause');
    pathTracingFolder.add(params, 'multipleImportanceSampling').onChange(onParamsChange);
    pathTracingFolder.add(params, 'acesToneMapping').onChange((v)=>{
        renderer.toneMapping = v ? (0, _three.ACESFilmicToneMapping) : (0, _three.NoToneMapping);
    });
    pathTracingFolder.add(params, 'bounces', 1, 20, 1).onChange(onParamsChange);
    pathTracingFolder.add(params, 'filterGlossyFactor', 0, 1).onChange(onParamsChange);
    pathTracingFolder.add(params, 'renderScale', 0.1, 1.0, 0.01).onChange(()=>{
        onParamsChange();
    });
    pathTracingFolder.add(params, 'tiles', 1, 10, 1).onChange((v)=>{
        pathTracer.tiles.set(v, v);
    });
    pathTracingFolder.add(params, 'cameraProjection', [
        'Perspective',
        'Orthographic'
    ]).onChange((v)=>{
        updateCameraProjection(v);
    });
    pathTracingFolder.open();
    const environmentFolder = gui.addFolder('environment');
    environmentFolder.add(params, 'envMap', envMaps).name('map').onChange(updateEnvMap);
    environmentFolder.add(params, 'environmentIntensity', 0.0, 10.0).onChange(onParamsChange).name('intensity');
    environmentFolder.add(params, 'environmentRotation', 0, 2 * Math.PI).onChange(onParamsChange);
    environmentFolder.open();
    const backgroundFolder = gui.addFolder('background');
    backgroundFolder.add(params, 'backgroundType', [
        'Environment',
        'Gradient'
    ]).onChange(onParamsChange);
    backgroundFolder.addColor(params, 'bgGradientTop').onChange(onParamsChange);
    backgroundFolder.addColor(params, 'bgGradientBottom').onChange(onParamsChange);
    backgroundFolder.add(params, 'backgroundBlur', 0, 1).onChange(onParamsChange);
    backgroundFolder.add(params, 'transparentBackground', 0, 1).onChange(onParamsChange);
    backgroundFolder.add(params, 'checkerboardTransparency').onChange((v)=>{
        if (v) document.body.classList.add('checkerboard');
        else document.body.classList.remove('checkerboard');
    });
    const floorFolder = gui.addFolder('floor');
    floorFolder.addColor(params, 'floorColor').onChange(onParamsChange);
    floorFolder.add(params, 'floorRoughness', 0, 1).onChange(onParamsChange);
    floorFolder.add(params, 'floorMetalness', 0, 1).onChange(onParamsChange);
    floorFolder.add(params, 'floorOpacity', 0, 1).onChange(onParamsChange);
    floorFolder.close();
}
function updateEnvMap() {
    new (0, _rgbeloaderJs.RGBELoader)().load(params.envMap, (texture)=>{
        if (scene.environment) scene.environment.dispose();
        texture.mapping = (0, _three.EquirectangularReflectionMapping);
        scene.environment = texture;
        pathTracer.updateEnvironment();
        onParamsChange();
    });
}
function updateCameraProjection(cameraProjection) {
    // sync position
    if (activeCamera) {
        perspectiveCamera.position.copy(activeCamera.position);
        orthoCamera.position.copy(activeCamera.position);
    }
    // set active camera
    if (cameraProjection === 'Perspective') activeCamera = perspectiveCamera;
    else activeCamera = orthoCamera;
    controls.object = activeCamera;
    controls.update();
    pathTracer.setCamera(activeCamera);
}
function convertOpacityToTransmission(model, ior) {
    model.traverse((c)=>{
        if (c.material) {
            const material = c.material;
            if (material.opacity < 0.65 && material.opacity > 0.2) {
                const newMaterial = new (0, _three.MeshPhysicalMaterial)();
                for(const key in material)if (key in material) {
                    if (material[key] === null) continue;
                    if (material[key].isTexture) newMaterial[key] = material[key];
                    else if (material[key].copy && material[key].constructor === newMaterial[key].constructor) newMaterial[key].copy(material[key]);
                    else if (typeof material[key] === 'number') newMaterial[key] = material[key];
                }
                newMaterial.opacity = 1.0;
                newMaterial.transmission = 1.0;
                newMaterial.ior = ior;
                const hsl = {};
                newMaterial.color.getHSL(hsl);
                hsl.l = Math.max(hsl.l, 0.35);
                newMaterial.color.setHSL(hsl.h, hsl.s, hsl.l);
                c.material = newMaterial;
            }
        }
    });
}
async function updateModel() {
    if (gui) {
        document.body.classList.remove('checkerboard');
        gui.destroy();
        gui = null;
    }
    const modelInfo = models[params.model];
    renderer.domElement.style.visibility = 'hidden';
    loader.setPercentage(0);
    if (model) {
        model.traverse((c)=>{
            if (c.material) {
                const material = c.material;
                for(const key in material)if (material[key] && material[key].isTexture) material[key].dispose();
            }
        });
        scene.remove(model);
        model = null;
    }
    try {
        model = await loadModel(modelInfo.url, (v)=>{
            loader.setPercentage(0.5 * v);
        });
    } catch (err) {
        loader.setCredits('Failed to load model:' + err.message);
        loader.setPercentage(1);
    }
    // update after model load
    // TODO: clean up
    if (modelInfo.removeEmission) model.traverse((c)=>{
        if (c.material) {
            c.material.emissiveMap = null;
            c.material.emissiveIntensity = 0;
        }
    });
    if (modelInfo.opacityToTransmission) convertOpacityToTransmission(model, modelInfo.ior || 1.5);
    model.traverse((c)=>{
        if (c.material) // set the thickness so we render the material as a volumetric object
        c.material.thickness = 1.0;
    });
    if (modelInfo.postProcess) modelInfo.postProcess(model);
    // rotate model after so it doesn't affect the bounding sphere scale
    if (modelInfo.rotation) model.rotation.set(...modelInfo.rotation);
    // center the model
    const box = new (0, _three.Box3)();
    box.setFromObject(model);
    model.position.addScaledVector(box.min, -0.5).addScaledVector(box.max, -0.5);
    const sphere = new (0, _three.Sphere)();
    box.getBoundingSphere(sphere);
    model.scale.setScalar(1 / sphere.radius);
    model.position.multiplyScalar(1 / sphere.radius);
    box.setFromObject(model);
    floorPlane.position.y = box.min.y;
    scene.add(model);
    await pathTracer.setSceneAsync(scene, activeCamera, {
        onProgress: (v)=>loader.setPercentage(0.5 + 0.5 * v)
    });
    loader.setPercentage(1);
    loader.setCredits(modelInfo.credit || '');
    params.bounces = modelInfo.bounces || 5;
    params.floorColor = modelInfo.floorColor || '#111111';
    params.floorRoughness = modelInfo.floorRoughness || 0.2;
    params.floorMetalness = modelInfo.floorMetalness || 0.2;
    params.bgGradientTop = modelInfo.gradientTop || '#111111';
    params.bgGradientBottom = modelInfo.gradientBot || '#000000';
    buildGui();
    onParamsChange();
    renderer.domElement.style.visibility = 'visible';
    if (params.checkerboardTransparency) document.body.classList.add('checkerboard');
}
async function loadModel(url, onProgress) {
    // TODO: clean up
    const manager = new (0, _three.LoadingManager)();
    if (/dae$/i.test(url)) {
        const complete = new Promise((resolve)=>manager.onLoad = resolve);
        const res = await new (0, _colladaLoaderJs.ColladaLoader)(manager).loadAsync(url, (progress)=>{
            if (progress.total !== 0 && progress.total >= progress.loaded) onProgress(progress.loaded / progress.total);
        });
        await complete;
        res.scene.scale.setScalar(1);
        res.scene.traverse((c)=>{
            const { material } = c;
            if (material && material.isMeshPhongMaterial) c.material = new (0, _three.MeshStandardMaterial)({
                color: material.color,
                roughness: material.roughness || 0,
                metalness: material.metalness || 0,
                map: material.map || null
            });
        });
        return res.scene;
    } else if (/(gltf|glb)$/i.test(url)) {
        const complete = new Promise((resolve)=>manager.onLoad = resolve);
        const gltf = await new (0, _gltfloaderJs.GLTFLoader)(manager).setMeshoptDecoder((0, _meshoptDecoderModuleJs.MeshoptDecoder)).loadAsync(url, (progress)=>{
            if (progress.total !== 0 && progress.total >= progress.loaded) onProgress(progress.loaded / progress.total);
        });
        await complete;
        return gltf.scene;
    } else if (/mpd$/i.test(url)) {
        manager.onProgress = (url, loaded, total)=>{
            onProgress(loaded / total);
        };
        const complete = new Promise((resolve)=>manager.onLoad = resolve);
        const ldrawLoader = new (0, _ldrawLoaderJs.LDrawLoader)(manager);
        await ldrawLoader.preloadMaterials('https://raw.githubusercontent.com/gkjohnson/ldraw-parts-library/master/colors/ldcfgalt.ldr');
        const result = await ldrawLoader.setPartsLibraryPath('https://raw.githubusercontent.com/gkjohnson/ldraw-parts-library/master/complete/ldraw/').loadAsync(url);
        await complete;
        const model = (0, _ldrawUtilsJs.LDrawUtils).mergeObject(result);
        model.rotation.set(Math.PI, 0, 0);
        const toRemove = [];
        model.traverse((c)=>{
            if (c.isLineSegments) toRemove.push(c);
            if (c.isMesh) c.material.roughness *= 0.25;
        });
        toRemove.forEach((c)=>{
            c.parent.remove(c);
        });
        return model;
    }
}

},{"three":"ktPTu","three/examples/jsm/libs/meshopt_decoder.module.js":"Go3D5","three/examples/jsm/loaders/RGBELoader.js":"cfP3d","three/examples/jsm/loaders/GLTFLoader.js":"dVRsF","three/examples/jsm/loaders/ColladaLoader.js":"lRwT9","three/examples/jsm/loaders/LDrawLoader.js":"jbXFV","three/examples/jsm/utils/LDrawUtils.js":"n46Yb","three/examples/jsm/libs/lil-gui.module.min.js":"dUXFx","three/examples/jsm/libs/stats.module.js":"6xUSB","./utils/generateRadialFloorTexture.js":"fyW1M","../src/index.js":"8lqZg","three/examples/jsm/controls/OrbitControls.js":"7mqRv","./utils/getScaledSettings.js":"lfwhv","./utils/LoaderElement.js":"h1Zxa","three-mesh-bvh/src/workers/ParallelMeshBVHWorker.js":"iSl3b","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cfP3d":[function(require,module,exports,__globalThis) {
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

},{"three":"ktPTu","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lRwT9":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ColladaLoader", ()=>ColladaLoader);
var _three = require("three");
var _tgaloaderJs = require("../loaders/TGALoader.js");
class ColladaLoader extends (0, _three.Loader) {
    load(url, onLoad, onProgress, onError) {
        const scope = this;
        const path = scope.path === '' ? (0, _three.LoaderUtils).extractUrlBase(url) : scope.path;
        const loader = new (0, _three.FileLoader)(scope.manager);
        loader.setPath(scope.path);
        loader.setRequestHeader(scope.requestHeader);
        loader.setWithCredentials(scope.withCredentials);
        loader.load(url, function(text) {
            try {
                onLoad(scope.parse(text, path));
            } catch (e) {
                if (onError) onError(e);
                else console.error(e);
                scope.manager.itemError(url);
            }
        }, onProgress, onError);
    }
    parse(text, path) {
        function getElementsByTagName(xml, name) {
            // Non recursive xml.getElementsByTagName() ...
            const array = [];
            const childNodes = xml.childNodes;
            for(let i = 0, l = childNodes.length; i < l; i++){
                const child = childNodes[i];
                if (child.nodeName === name) array.push(child);
            }
            return array;
        }
        function parseStrings(text) {
            if (text.length === 0) return [];
            const parts = text.trim().split(/\s+/);
            const array = new Array(parts.length);
            for(let i = 0, l = parts.length; i < l; i++)array[i] = parts[i];
            return array;
        }
        function parseFloats(text) {
            if (text.length === 0) return [];
            const parts = text.trim().split(/\s+/);
            const array = new Array(parts.length);
            for(let i = 0, l = parts.length; i < l; i++)array[i] = parseFloat(parts[i]);
            return array;
        }
        function parseInts(text) {
            if (text.length === 0) return [];
            const parts = text.trim().split(/\s+/);
            const array = new Array(parts.length);
            for(let i = 0, l = parts.length; i < l; i++)array[i] = parseInt(parts[i]);
            return array;
        }
        function parseId(text) {
            return text.substring(1);
        }
        function generateId() {
            return 'three_default_' + count++;
        }
        function isEmpty(object) {
            return Object.keys(object).length === 0;
        }
        // asset
        function parseAsset(xml) {
            return {
                unit: parseAssetUnit(getElementsByTagName(xml, 'unit')[0]),
                upAxis: parseAssetUpAxis(getElementsByTagName(xml, 'up_axis')[0])
            };
        }
        function parseAssetUnit(xml) {
            if (xml !== undefined && xml.hasAttribute('meter') === true) return parseFloat(xml.getAttribute('meter'));
            else return 1; // default 1 meter
        }
        function parseAssetUpAxis(xml) {
            return xml !== undefined ? xml.textContent : 'Y_UP';
        }
        // library
        function parseLibrary(xml, libraryName, nodeName, parser) {
            const library = getElementsByTagName(xml, libraryName)[0];
            if (library !== undefined) {
                const elements = getElementsByTagName(library, nodeName);
                for(let i = 0; i < elements.length; i++)parser(elements[i]);
            }
        }
        function buildLibrary(data, builder) {
            for(const name in data){
                const object = data[name];
                object.build = builder(data[name]);
            }
        }
        // get
        function getBuild(data, builder) {
            if (data.build !== undefined) return data.build;
            data.build = builder(data);
            return data.build;
        }
        // animation
        function parseAnimation(xml) {
            const data = {
                sources: {},
                samplers: {},
                channels: {}
            };
            let hasChildren = false;
            for(let i = 0, l = xml.childNodes.length; i < l; i++){
                const child = xml.childNodes[i];
                if (child.nodeType !== 1) continue;
                let id;
                switch(child.nodeName){
                    case 'source':
                        id = child.getAttribute('id');
                        data.sources[id] = parseSource(child);
                        break;
                    case 'sampler':
                        id = child.getAttribute('id');
                        data.samplers[id] = parseAnimationSampler(child);
                        break;
                    case 'channel':
                        id = child.getAttribute('target');
                        data.channels[id] = parseAnimationChannel(child);
                        break;
                    case 'animation':
                        // hierarchy of related animations
                        parseAnimation(child);
                        hasChildren = true;
                        break;
                    default:
                        console.log(child);
                }
            }
            if (hasChildren === false) // since 'id' attributes can be optional, it's necessary to generate a UUID for unqiue assignment
            library.animations[xml.getAttribute('id') || (0, _three.MathUtils).generateUUID()] = data;
        }
        function parseAnimationSampler(xml) {
            const data = {
                inputs: {}
            };
            for(let i = 0, l = xml.childNodes.length; i < l; i++){
                const child = xml.childNodes[i];
                if (child.nodeType !== 1) continue;
                switch(child.nodeName){
                    case 'input':
                        const id = parseId(child.getAttribute('source'));
                        const semantic = child.getAttribute('semantic');
                        data.inputs[semantic] = id;
                        break;
                }
            }
            return data;
        }
        function parseAnimationChannel(xml) {
            const data = {};
            const target = xml.getAttribute('target');
            // parsing SID Addressing Syntax
            let parts = target.split('/');
            const id = parts.shift();
            let sid = parts.shift();
            // check selection syntax
            const arraySyntax = sid.indexOf('(') !== -1;
            const memberSyntax = sid.indexOf('.') !== -1;
            if (memberSyntax) {
                //  member selection access
                parts = sid.split('.');
                sid = parts.shift();
                data.member = parts.shift();
            } else if (arraySyntax) {
                // array-access syntax. can be used to express fields in one-dimensional vectors or two-dimensional matrices.
                const indices = sid.split('(');
                sid = indices.shift();
                for(let i = 0; i < indices.length; i++)indices[i] = parseInt(indices[i].replace(/\)/, ''));
                data.indices = indices;
            }
            data.id = id;
            data.sid = sid;
            data.arraySyntax = arraySyntax;
            data.memberSyntax = memberSyntax;
            data.sampler = parseId(xml.getAttribute('source'));
            return data;
        }
        function buildAnimation(data) {
            const tracks = [];
            const channels = data.channels;
            const samplers = data.samplers;
            const sources = data.sources;
            for(const target in channels)if (channels.hasOwnProperty(target)) {
                const channel = channels[target];
                const sampler = samplers[channel.sampler];
                const inputId = sampler.inputs.INPUT;
                const outputId = sampler.inputs.OUTPUT;
                const inputSource = sources[inputId];
                const outputSource = sources[outputId];
                const animation = buildAnimationChannel(channel, inputSource, outputSource);
                createKeyframeTracks(animation, tracks);
            }
            return tracks;
        }
        function getAnimation(id) {
            return getBuild(library.animations[id], buildAnimation);
        }
        function buildAnimationChannel(channel, inputSource, outputSource) {
            const node = library.nodes[channel.id];
            const object3D = getNode(node.id);
            const transform = node.transforms[channel.sid];
            const defaultMatrix = node.matrix.clone().transpose();
            let time, stride;
            let i, il, j, jl;
            const data = {};
            // the collada spec allows the animation of data in various ways.
            // depending on the transform type (matrix, translate, rotate, scale), we execute different logic
            switch(transform){
                case 'matrix':
                    for(i = 0, il = inputSource.array.length; i < il; i++){
                        time = inputSource.array[i];
                        stride = i * outputSource.stride;
                        if (data[time] === undefined) data[time] = {};
                        if (channel.arraySyntax === true) {
                            const value = outputSource.array[stride];
                            const index = channel.indices[0] + 4 * channel.indices[1];
                            data[time][index] = value;
                        } else for(j = 0, jl = outputSource.stride; j < jl; j++)data[time][j] = outputSource.array[stride + j];
                    }
                    break;
                case 'translate':
                    console.warn('THREE.ColladaLoader: Animation transform type "%s" not yet implemented.', transform);
                    break;
                case 'rotate':
                    console.warn('THREE.ColladaLoader: Animation transform type "%s" not yet implemented.', transform);
                    break;
                case 'scale':
                    console.warn('THREE.ColladaLoader: Animation transform type "%s" not yet implemented.', transform);
                    break;
            }
            const keyframes = prepareAnimationData(data, defaultMatrix);
            const animation = {
                name: object3D.uuid,
                keyframes: keyframes
            };
            return animation;
        }
        function prepareAnimationData(data, defaultMatrix) {
            const keyframes = [];
            // transfer data into a sortable array
            for(const time in data)keyframes.push({
                time: parseFloat(time),
                value: data[time]
            });
            // ensure keyframes are sorted by time
            keyframes.sort(ascending);
            // now we clean up all animation data, so we can use them for keyframe tracks
            for(let i = 0; i < 16; i++)transformAnimationData(keyframes, i, defaultMatrix.elements[i]);
            return keyframes;
            // array sort function
            function ascending(a, b) {
                return a.time - b.time;
            }
        }
        const position = new (0, _three.Vector3)();
        const scale = new (0, _three.Vector3)();
        const quaternion = new (0, _three.Quaternion)();
        function createKeyframeTracks(animation, tracks) {
            const keyframes = animation.keyframes;
            const name = animation.name;
            const times = [];
            const positionData = [];
            const quaternionData = [];
            const scaleData = [];
            for(let i = 0, l = keyframes.length; i < l; i++){
                const keyframe = keyframes[i];
                const time = keyframe.time;
                const value = keyframe.value;
                matrix.fromArray(value).transpose();
                matrix.decompose(position, quaternion, scale);
                times.push(time);
                positionData.push(position.x, position.y, position.z);
                quaternionData.push(quaternion.x, quaternion.y, quaternion.z, quaternion.w);
                scaleData.push(scale.x, scale.y, scale.z);
            }
            if (positionData.length > 0) tracks.push(new (0, _three.VectorKeyframeTrack)(name + '.position', times, positionData));
            if (quaternionData.length > 0) tracks.push(new (0, _three.QuaternionKeyframeTrack)(name + '.quaternion', times, quaternionData));
            if (scaleData.length > 0) tracks.push(new (0, _three.VectorKeyframeTrack)(name + '.scale', times, scaleData));
            return tracks;
        }
        function transformAnimationData(keyframes, property, defaultValue) {
            let keyframe;
            let empty = true;
            let i, l;
            // check, if values of a property are missing in our keyframes
            for(i = 0, l = keyframes.length; i < l; i++){
                keyframe = keyframes[i];
                if (keyframe.value[property] === undefined) keyframe.value[property] = null; // mark as missing
                else empty = false;
            }
            if (empty === true) // no values at all, so we set a default value
            for(i = 0, l = keyframes.length; i < l; i++){
                keyframe = keyframes[i];
                keyframe.value[property] = defaultValue;
            }
            else // filling gaps
            createMissingKeyframes(keyframes, property);
        }
        function createMissingKeyframes(keyframes, property) {
            let prev, next;
            for(let i = 0, l = keyframes.length; i < l; i++){
                const keyframe = keyframes[i];
                if (keyframe.value[property] === null) {
                    prev = getPrev(keyframes, i, property);
                    next = getNext(keyframes, i, property);
                    if (prev === null) {
                        keyframe.value[property] = next.value[property];
                        continue;
                    }
                    if (next === null) {
                        keyframe.value[property] = prev.value[property];
                        continue;
                    }
                    interpolate(keyframe, prev, next, property);
                }
            }
        }
        function getPrev(keyframes, i, property) {
            while(i >= 0){
                const keyframe = keyframes[i];
                if (keyframe.value[property] !== null) return keyframe;
                i--;
            }
            return null;
        }
        function getNext(keyframes, i, property) {
            while(i < keyframes.length){
                const keyframe = keyframes[i];
                if (keyframe.value[property] !== null) return keyframe;
                i++;
            }
            return null;
        }
        function interpolate(key, prev, next, property) {
            if (next.time - prev.time === 0) {
                key.value[property] = prev.value[property];
                return;
            }
            key.value[property] = (key.time - prev.time) * (next.value[property] - prev.value[property]) / (next.time - prev.time) + prev.value[property];
        }
        // animation clips
        function parseAnimationClip(xml) {
            const data = {
                name: xml.getAttribute('id') || 'default',
                start: parseFloat(xml.getAttribute('start') || 0),
                end: parseFloat(xml.getAttribute('end') || 0),
                animations: []
            };
            for(let i = 0, l = xml.childNodes.length; i < l; i++){
                const child = xml.childNodes[i];
                if (child.nodeType !== 1) continue;
                switch(child.nodeName){
                    case 'instance_animation':
                        data.animations.push(parseId(child.getAttribute('url')));
                        break;
                }
            }
            library.clips[xml.getAttribute('id')] = data;
        }
        function buildAnimationClip(data) {
            const tracks = [];
            const name = data.name;
            const duration = data.end - data.start || -1;
            const animations = data.animations;
            for(let i = 0, il = animations.length; i < il; i++){
                const animationTracks = getAnimation(animations[i]);
                for(let j = 0, jl = animationTracks.length; j < jl; j++)tracks.push(animationTracks[j]);
            }
            return new (0, _three.AnimationClip)(name, duration, tracks);
        }
        function getAnimationClip(id) {
            return getBuild(library.clips[id], buildAnimationClip);
        }
        // controller
        function parseController(xml) {
            const data = {};
            for(let i = 0, l = xml.childNodes.length; i < l; i++){
                const child = xml.childNodes[i];
                if (child.nodeType !== 1) continue;
                switch(child.nodeName){
                    case 'skin':
                        // there is exactly one skin per controller
                        data.id = parseId(child.getAttribute('source'));
                        data.skin = parseSkin(child);
                        break;
                    case 'morph':
                        data.id = parseId(child.getAttribute('source'));
                        console.warn('THREE.ColladaLoader: Morph target animation not supported yet.');
                        break;
                }
            }
            library.controllers[xml.getAttribute('id')] = data;
        }
        function parseSkin(xml) {
            const data = {
                sources: {}
            };
            for(let i = 0, l = xml.childNodes.length; i < l; i++){
                const child = xml.childNodes[i];
                if (child.nodeType !== 1) continue;
                switch(child.nodeName){
                    case 'bind_shape_matrix':
                        data.bindShapeMatrix = parseFloats(child.textContent);
                        break;
                    case 'source':
                        const id = child.getAttribute('id');
                        data.sources[id] = parseSource(child);
                        break;
                    case 'joints':
                        data.joints = parseJoints(child);
                        break;
                    case 'vertex_weights':
                        data.vertexWeights = parseVertexWeights(child);
                        break;
                }
            }
            return data;
        }
        function parseJoints(xml) {
            const data = {
                inputs: {}
            };
            for(let i = 0, l = xml.childNodes.length; i < l; i++){
                const child = xml.childNodes[i];
                if (child.nodeType !== 1) continue;
                switch(child.nodeName){
                    case 'input':
                        const semantic = child.getAttribute('semantic');
                        const id = parseId(child.getAttribute('source'));
                        data.inputs[semantic] = id;
                        break;
                }
            }
            return data;
        }
        function parseVertexWeights(xml) {
            const data = {
                inputs: {}
            };
            for(let i = 0, l = xml.childNodes.length; i < l; i++){
                const child = xml.childNodes[i];
                if (child.nodeType !== 1) continue;
                switch(child.nodeName){
                    case 'input':
                        const semantic = child.getAttribute('semantic');
                        const id = parseId(child.getAttribute('source'));
                        const offset = parseInt(child.getAttribute('offset'));
                        data.inputs[semantic] = {
                            id: id,
                            offset: offset
                        };
                        break;
                    case 'vcount':
                        data.vcount = parseInts(child.textContent);
                        break;
                    case 'v':
                        data.v = parseInts(child.textContent);
                        break;
                }
            }
            return data;
        }
        function buildController(data) {
            const build = {
                id: data.id
            };
            const geometry = library.geometries[build.id];
            if (data.skin !== undefined) {
                build.skin = buildSkin(data.skin);
                // we enhance the 'sources' property of the corresponding geometry with our skin data
                geometry.sources.skinIndices = build.skin.indices;
                geometry.sources.skinWeights = build.skin.weights;
            }
            return build;
        }
        function buildSkin(data) {
            const BONE_LIMIT = 4;
            const build = {
                joints: [],
                indices: {
                    array: [],
                    stride: BONE_LIMIT
                },
                weights: {
                    array: [],
                    stride: BONE_LIMIT
                }
            };
            const sources = data.sources;
            const vertexWeights = data.vertexWeights;
            const vcount = vertexWeights.vcount;
            const v = vertexWeights.v;
            const jointOffset = vertexWeights.inputs.JOINT.offset;
            const weightOffset = vertexWeights.inputs.WEIGHT.offset;
            const jointSource = data.sources[data.joints.inputs.JOINT];
            const inverseSource = data.sources[data.joints.inputs.INV_BIND_MATRIX];
            const weights = sources[vertexWeights.inputs.WEIGHT.id].array;
            let stride = 0;
            let i, j, l;
            // process skin data for each vertex
            for(i = 0, l = vcount.length; i < l; i++){
                const jointCount = vcount[i]; // this is the amount of joints that affect a single vertex
                const vertexSkinData = [];
                for(j = 0; j < jointCount; j++){
                    const skinIndex = v[stride + jointOffset];
                    const weightId = v[stride + weightOffset];
                    const skinWeight = weights[weightId];
                    vertexSkinData.push({
                        index: skinIndex,
                        weight: skinWeight
                    });
                    stride += 2;
                }
                // we sort the joints in descending order based on the weights.
                // this ensures, we only procced the most important joints of the vertex
                vertexSkinData.sort(descending);
                // now we provide for each vertex a set of four index and weight values.
                // the order of the skin data matches the order of vertices
                for(j = 0; j < BONE_LIMIT; j++){
                    const d = vertexSkinData[j];
                    if (d !== undefined) {
                        build.indices.array.push(d.index);
                        build.weights.array.push(d.weight);
                    } else {
                        build.indices.array.push(0);
                        build.weights.array.push(0);
                    }
                }
            }
            // setup bind matrix
            if (data.bindShapeMatrix) build.bindMatrix = new (0, _three.Matrix4)().fromArray(data.bindShapeMatrix).transpose();
            else build.bindMatrix = new (0, _three.Matrix4)().identity();
            // process bones and inverse bind matrix data
            for(i = 0, l = jointSource.array.length; i < l; i++){
                const name = jointSource.array[i];
                const boneInverse = new (0, _three.Matrix4)().fromArray(inverseSource.array, i * inverseSource.stride).transpose();
                build.joints.push({
                    name: name,
                    boneInverse: boneInverse
                });
            }
            return build;
            // array sort function
            function descending(a, b) {
                return b.weight - a.weight;
            }
        }
        function getController(id) {
            return getBuild(library.controllers[id], buildController);
        }
        // image
        function parseImage(xml) {
            const data = {
                init_from: getElementsByTagName(xml, 'init_from')[0].textContent
            };
            library.images[xml.getAttribute('id')] = data;
        }
        function buildImage(data) {
            if (data.build !== undefined) return data.build;
            return data.init_from;
        }
        function getImage(id) {
            const data = library.images[id];
            if (data !== undefined) return getBuild(data, buildImage);
            console.warn('THREE.ColladaLoader: Couldn\'t find image with ID:', id);
            return null;
        }
        // effect
        function parseEffect(xml) {
            const data = {};
            for(let i = 0, l = xml.childNodes.length; i < l; i++){
                const child = xml.childNodes[i];
                if (child.nodeType !== 1) continue;
                switch(child.nodeName){
                    case 'profile_COMMON':
                        data.profile = parseEffectProfileCOMMON(child);
                        break;
                }
            }
            library.effects[xml.getAttribute('id')] = data;
        }
        function parseEffectProfileCOMMON(xml) {
            const data = {
                surfaces: {},
                samplers: {}
            };
            for(let i = 0, l = xml.childNodes.length; i < l; i++){
                const child = xml.childNodes[i];
                if (child.nodeType !== 1) continue;
                switch(child.nodeName){
                    case 'newparam':
                        parseEffectNewparam(child, data);
                        break;
                    case 'technique':
                        data.technique = parseEffectTechnique(child);
                        break;
                    case 'extra':
                        data.extra = parseEffectExtra(child);
                        break;
                }
            }
            return data;
        }
        function parseEffectNewparam(xml, data) {
            const sid = xml.getAttribute('sid');
            for(let i = 0, l = xml.childNodes.length; i < l; i++){
                const child = xml.childNodes[i];
                if (child.nodeType !== 1) continue;
                switch(child.nodeName){
                    case 'surface':
                        data.surfaces[sid] = parseEffectSurface(child);
                        break;
                    case 'sampler2D':
                        data.samplers[sid] = parseEffectSampler(child);
                        break;
                }
            }
        }
        function parseEffectSurface(xml) {
            const data = {};
            for(let i = 0, l = xml.childNodes.length; i < l; i++){
                const child = xml.childNodes[i];
                if (child.nodeType !== 1) continue;
                switch(child.nodeName){
                    case 'init_from':
                        data.init_from = child.textContent;
                        break;
                }
            }
            return data;
        }
        function parseEffectSampler(xml) {
            const data = {};
            for(let i = 0, l = xml.childNodes.length; i < l; i++){
                const child = xml.childNodes[i];
                if (child.nodeType !== 1) continue;
                switch(child.nodeName){
                    case 'source':
                        data.source = child.textContent;
                        break;
                }
            }
            return data;
        }
        function parseEffectTechnique(xml) {
            const data = {};
            for(let i = 0, l = xml.childNodes.length; i < l; i++){
                const child = xml.childNodes[i];
                if (child.nodeType !== 1) continue;
                switch(child.nodeName){
                    case 'constant':
                    case 'lambert':
                    case 'blinn':
                    case 'phong':
                        data.type = child.nodeName;
                        data.parameters = parseEffectParameters(child);
                        break;
                    case 'extra':
                        data.extra = parseEffectExtra(child);
                        break;
                }
            }
            return data;
        }
        function parseEffectParameters(xml) {
            const data = {};
            for(let i = 0, l = xml.childNodes.length; i < l; i++){
                const child = xml.childNodes[i];
                if (child.nodeType !== 1) continue;
                switch(child.nodeName){
                    case 'emission':
                    case 'diffuse':
                    case 'specular':
                    case 'bump':
                    case 'ambient':
                    case 'shininess':
                    case 'transparency':
                        data[child.nodeName] = parseEffectParameter(child);
                        break;
                    case 'transparent':
                        data[child.nodeName] = {
                            opaque: child.hasAttribute('opaque') ? child.getAttribute('opaque') : 'A_ONE',
                            data: parseEffectParameter(child)
                        };
                        break;
                }
            }
            return data;
        }
        function parseEffectParameter(xml) {
            const data = {};
            for(let i = 0, l = xml.childNodes.length; i < l; i++){
                const child = xml.childNodes[i];
                if (child.nodeType !== 1) continue;
                switch(child.nodeName){
                    case 'color':
                        data[child.nodeName] = parseFloats(child.textContent);
                        break;
                    case 'float':
                        data[child.nodeName] = parseFloat(child.textContent);
                        break;
                    case 'texture':
                        data[child.nodeName] = {
                            id: child.getAttribute('texture'),
                            extra: parseEffectParameterTexture(child)
                        };
                        break;
                }
            }
            return data;
        }
        function parseEffectParameterTexture(xml) {
            const data = {
                technique: {}
            };
            for(let i = 0, l = xml.childNodes.length; i < l; i++){
                const child = xml.childNodes[i];
                if (child.nodeType !== 1) continue;
                switch(child.nodeName){
                    case 'extra':
                        parseEffectParameterTextureExtra(child, data);
                        break;
                }
            }
            return data;
        }
        function parseEffectParameterTextureExtra(xml, data) {
            for(let i = 0, l = xml.childNodes.length; i < l; i++){
                const child = xml.childNodes[i];
                if (child.nodeType !== 1) continue;
                switch(child.nodeName){
                    case 'technique':
                        parseEffectParameterTextureExtraTechnique(child, data);
                        break;
                }
            }
        }
        function parseEffectParameterTextureExtraTechnique(xml, data) {
            for(let i = 0, l = xml.childNodes.length; i < l; i++){
                const child = xml.childNodes[i];
                if (child.nodeType !== 1) continue;
                switch(child.nodeName){
                    case 'repeatU':
                    case 'repeatV':
                    case 'offsetU':
                    case 'offsetV':
                        data.technique[child.nodeName] = parseFloat(child.textContent);
                        break;
                    case 'wrapU':
                    case 'wrapV':
                        // some files have values for wrapU/wrapV which become NaN via parseInt
                        if (child.textContent.toUpperCase() === 'TRUE') data.technique[child.nodeName] = 1;
                        else if (child.textContent.toUpperCase() === 'FALSE') data.technique[child.nodeName] = 0;
                        else data.technique[child.nodeName] = parseInt(child.textContent);
                        break;
                    case 'bump':
                        data[child.nodeName] = parseEffectExtraTechniqueBump(child);
                        break;
                }
            }
        }
        function parseEffectExtra(xml) {
            const data = {};
            for(let i = 0, l = xml.childNodes.length; i < l; i++){
                const child = xml.childNodes[i];
                if (child.nodeType !== 1) continue;
                switch(child.nodeName){
                    case 'technique':
                        data.technique = parseEffectExtraTechnique(child);
                        break;
                }
            }
            return data;
        }
        function parseEffectExtraTechnique(xml) {
            const data = {};
            for(let i = 0, l = xml.childNodes.length; i < l; i++){
                const child = xml.childNodes[i];
                if (child.nodeType !== 1) continue;
                switch(child.nodeName){
                    case 'double_sided':
                        data[child.nodeName] = parseInt(child.textContent);
                        break;
                    case 'bump':
                        data[child.nodeName] = parseEffectExtraTechniqueBump(child);
                        break;
                }
            }
            return data;
        }
        function parseEffectExtraTechniqueBump(xml) {
            const data = {};
            for(let i = 0, l = xml.childNodes.length; i < l; i++){
                const child = xml.childNodes[i];
                if (child.nodeType !== 1) continue;
                switch(child.nodeName){
                    case 'texture':
                        data[child.nodeName] = {
                            id: child.getAttribute('texture'),
                            texcoord: child.getAttribute('texcoord'),
                            extra: parseEffectParameterTexture(child)
                        };
                        break;
                }
            }
            return data;
        }
        function buildEffect(data) {
            return data;
        }
        function getEffect(id) {
            return getBuild(library.effects[id], buildEffect);
        }
        // material
        function parseMaterial(xml) {
            const data = {
                name: xml.getAttribute('name')
            };
            for(let i = 0, l = xml.childNodes.length; i < l; i++){
                const child = xml.childNodes[i];
                if (child.nodeType !== 1) continue;
                switch(child.nodeName){
                    case 'instance_effect':
                        data.url = parseId(child.getAttribute('url'));
                        break;
                }
            }
            library.materials[xml.getAttribute('id')] = data;
        }
        function getTextureLoader(image) {
            let loader;
            let extension = image.slice((image.lastIndexOf('.') - 1 >>> 0) + 2); // http://www.jstips.co/en/javascript/get-file-extension/
            extension = extension.toLowerCase();
            switch(extension){
                case 'tga':
                    loader = tgaLoader;
                    break;
                default:
                    loader = textureLoader;
            }
            return loader;
        }
        function buildMaterial(data) {
            const effect = getEffect(data.url);
            const technique = effect.profile.technique;
            let material;
            switch(technique.type){
                case 'phong':
                case 'blinn':
                    material = new (0, _three.MeshPhongMaterial)();
                    break;
                case 'lambert':
                    material = new (0, _three.MeshLambertMaterial)();
                    break;
                default:
                    material = new (0, _three.MeshBasicMaterial)();
                    break;
            }
            material.name = data.name || '';
            function getTexture(textureObject, colorSpace = null) {
                const sampler = effect.profile.samplers[textureObject.id];
                let image = null;
                // get image
                if (sampler !== undefined) {
                    const surface = effect.profile.surfaces[sampler.source];
                    image = getImage(surface.init_from);
                } else {
                    console.warn('THREE.ColladaLoader: Undefined sampler. Access image directly (see #12530).');
                    image = getImage(textureObject.id);
                }
                // create texture if image is avaiable
                if (image !== null) {
                    const loader = getTextureLoader(image);
                    if (loader !== undefined) {
                        const texture = loader.load(image);
                        const extra = textureObject.extra;
                        if (extra !== undefined && extra.technique !== undefined && isEmpty(extra.technique) === false) {
                            const technique = extra.technique;
                            texture.wrapS = technique.wrapU ? (0, _three.RepeatWrapping) : (0, _three.ClampToEdgeWrapping);
                            texture.wrapT = technique.wrapV ? (0, _three.RepeatWrapping) : (0, _three.ClampToEdgeWrapping);
                            texture.offset.set(technique.offsetU || 0, technique.offsetV || 0);
                            texture.repeat.set(technique.repeatU || 1, technique.repeatV || 1);
                        } else {
                            texture.wrapS = (0, _three.RepeatWrapping);
                            texture.wrapT = (0, _three.RepeatWrapping);
                        }
                        if (colorSpace !== null) texture.colorSpace = colorSpace;
                        return texture;
                    } else {
                        console.warn('THREE.ColladaLoader: Loader for texture %s not found.', image);
                        return null;
                    }
                } else {
                    console.warn('THREE.ColladaLoader: Couldn\'t create texture with ID:', textureObject.id);
                    return null;
                }
            }
            const parameters = technique.parameters;
            for(const key in parameters){
                const parameter = parameters[key];
                switch(key){
                    case 'diffuse':
                        if (parameter.color) material.color.fromArray(parameter.color);
                        if (parameter.texture) material.map = getTexture(parameter.texture, (0, _three.SRGBColorSpace));
                        break;
                    case 'specular':
                        if (parameter.color && material.specular) material.specular.fromArray(parameter.color);
                        if (parameter.texture) material.specularMap = getTexture(parameter.texture);
                        break;
                    case 'bump':
                        if (parameter.texture) material.normalMap = getTexture(parameter.texture);
                        break;
                    case 'ambient':
                        if (parameter.texture) material.lightMap = getTexture(parameter.texture, (0, _three.SRGBColorSpace));
                        break;
                    case 'shininess':
                        if (parameter.float && material.shininess) material.shininess = parameter.float;
                        break;
                    case 'emission':
                        if (parameter.color && material.emissive) material.emissive.fromArray(parameter.color);
                        if (parameter.texture) material.emissiveMap = getTexture(parameter.texture, (0, _three.SRGBColorSpace));
                        break;
                }
            }
            material.color.convertSRGBToLinear();
            if (material.specular) material.specular.convertSRGBToLinear();
            if (material.emissive) material.emissive.convertSRGBToLinear();
            //
            let transparent = parameters['transparent'];
            let transparency = parameters['transparency'];
            // <transparency> does not exist but <transparent>
            if (transparency === undefined && transparent) transparency = {
                float: 1
            };
            // <transparent> does not exist but <transparency>
            if (transparent === undefined && transparency) transparent = {
                opaque: 'A_ONE',
                data: {
                    color: [
                        1,
                        1,
                        1,
                        1
                    ]
                }
            };
            if (transparent && transparency) {
                // handle case if a texture exists but no color
                if (transparent.data.texture) // we do not set an alpha map (see #13792)
                material.transparent = true;
                else {
                    const color = transparent.data.color;
                    switch(transparent.opaque){
                        case 'A_ONE':
                            material.opacity = color[3] * transparency.float;
                            break;
                        case 'RGB_ZERO':
                            material.opacity = 1 - color[0] * transparency.float;
                            break;
                        case 'A_ZERO':
                            material.opacity = 1 - color[3] * transparency.float;
                            break;
                        case 'RGB_ONE':
                            material.opacity = color[0] * transparency.float;
                            break;
                        default:
                            console.warn('THREE.ColladaLoader: Invalid opaque type "%s" of transparent tag.', transparent.opaque);
                    }
                    if (material.opacity < 1) material.transparent = true;
                }
            }
            //
            if (technique.extra !== undefined && technique.extra.technique !== undefined) {
                const techniques = technique.extra.technique;
                for(const k in techniques){
                    const v = techniques[k];
                    switch(k){
                        case 'double_sided':
                            material.side = v === 1 ? (0, _three.DoubleSide) : (0, _three.FrontSide);
                            break;
                        case 'bump':
                            material.normalMap = getTexture(v.texture);
                            material.normalScale = new (0, _three.Vector2)(1, 1);
                            break;
                    }
                }
            }
            return material;
        }
        function getMaterial(id) {
            return getBuild(library.materials[id], buildMaterial);
        }
        // camera
        function parseCamera(xml) {
            const data = {
                name: xml.getAttribute('name')
            };
            for(let i = 0, l = xml.childNodes.length; i < l; i++){
                const child = xml.childNodes[i];
                if (child.nodeType !== 1) continue;
                switch(child.nodeName){
                    case 'optics':
                        data.optics = parseCameraOptics(child);
                        break;
                }
            }
            library.cameras[xml.getAttribute('id')] = data;
        }
        function parseCameraOptics(xml) {
            for(let i = 0; i < xml.childNodes.length; i++){
                const child = xml.childNodes[i];
                switch(child.nodeName){
                    case 'technique_common':
                        return parseCameraTechnique(child);
                }
            }
            return {};
        }
        function parseCameraTechnique(xml) {
            const data = {};
            for(let i = 0; i < xml.childNodes.length; i++){
                const child = xml.childNodes[i];
                switch(child.nodeName){
                    case 'perspective':
                    case 'orthographic':
                        data.technique = child.nodeName;
                        data.parameters = parseCameraParameters(child);
                        break;
                }
            }
            return data;
        }
        function parseCameraParameters(xml) {
            const data = {};
            for(let i = 0; i < xml.childNodes.length; i++){
                const child = xml.childNodes[i];
                switch(child.nodeName){
                    case 'xfov':
                    case 'yfov':
                    case 'xmag':
                    case 'ymag':
                    case 'znear':
                    case 'zfar':
                    case 'aspect_ratio':
                        data[child.nodeName] = parseFloat(child.textContent);
                        break;
                }
            }
            return data;
        }
        function buildCamera(data) {
            let camera;
            switch(data.optics.technique){
                case 'perspective':
                    camera = new (0, _three.PerspectiveCamera)(data.optics.parameters.yfov, data.optics.parameters.aspect_ratio, data.optics.parameters.znear, data.optics.parameters.zfar);
                    break;
                case 'orthographic':
                    let ymag = data.optics.parameters.ymag;
                    let xmag = data.optics.parameters.xmag;
                    const aspectRatio = data.optics.parameters.aspect_ratio;
                    xmag = xmag === undefined ? ymag * aspectRatio : xmag;
                    ymag = ymag === undefined ? xmag / aspectRatio : ymag;
                    xmag *= 0.5;
                    ymag *= 0.5;
                    camera = new (0, _three.OrthographicCamera)(-xmag, xmag, ymag, -ymag, data.optics.parameters.znear, data.optics.parameters.zfar);
                    break;
                default:
                    camera = new (0, _three.PerspectiveCamera)();
                    break;
            }
            camera.name = data.name || '';
            return camera;
        }
        function getCamera(id) {
            const data = library.cameras[id];
            if (data !== undefined) return getBuild(data, buildCamera);
            console.warn('THREE.ColladaLoader: Couldn\'t find camera with ID:', id);
            return null;
        }
        // light
        function parseLight(xml) {
            let data = {};
            for(let i = 0, l = xml.childNodes.length; i < l; i++){
                const child = xml.childNodes[i];
                if (child.nodeType !== 1) continue;
                switch(child.nodeName){
                    case 'technique_common':
                        data = parseLightTechnique(child);
                        break;
                }
            }
            library.lights[xml.getAttribute('id')] = data;
        }
        function parseLightTechnique(xml) {
            const data = {};
            for(let i = 0, l = xml.childNodes.length; i < l; i++){
                const child = xml.childNodes[i];
                if (child.nodeType !== 1) continue;
                switch(child.nodeName){
                    case 'directional':
                    case 'point':
                    case 'spot':
                    case 'ambient':
                        data.technique = child.nodeName;
                        data.parameters = parseLightParameters(child);
                }
            }
            return data;
        }
        function parseLightParameters(xml) {
            const data = {};
            for(let i = 0, l = xml.childNodes.length; i < l; i++){
                const child = xml.childNodes[i];
                if (child.nodeType !== 1) continue;
                switch(child.nodeName){
                    case 'color':
                        const array = parseFloats(child.textContent);
                        data.color = new (0, _three.Color)().fromArray(array).convertSRGBToLinear();
                        break;
                    case 'falloff_angle':
                        data.falloffAngle = parseFloat(child.textContent);
                        break;
                    case 'quadratic_attenuation':
                        const f = parseFloat(child.textContent);
                        data.distance = f ? Math.sqrt(1 / f) : 0;
                        break;
                }
            }
            return data;
        }
        function buildLight(data) {
            let light;
            switch(data.technique){
                case 'directional':
                    light = new (0, _three.DirectionalLight)();
                    break;
                case 'point':
                    light = new (0, _three.PointLight)();
                    break;
                case 'spot':
                    light = new (0, _three.SpotLight)();
                    break;
                case 'ambient':
                    light = new (0, _three.AmbientLight)();
                    break;
            }
            if (data.parameters.color) light.color.copy(data.parameters.color);
            if (data.parameters.distance) light.distance = data.parameters.distance;
            return light;
        }
        function getLight(id) {
            const data = library.lights[id];
            if (data !== undefined) return getBuild(data, buildLight);
            console.warn('THREE.ColladaLoader: Couldn\'t find light with ID:', id);
            return null;
        }
        // geometry
        function parseGeometry(xml) {
            const data = {
                name: xml.getAttribute('name'),
                sources: {},
                vertices: {},
                primitives: []
            };
            const mesh = getElementsByTagName(xml, 'mesh')[0];
            // the following tags inside geometry are not supported yet (see https://github.com/mrdoob/three.js/pull/12606): convex_mesh, spline, brep
            if (mesh === undefined) return;
            for(let i = 0; i < mesh.childNodes.length; i++){
                const child = mesh.childNodes[i];
                if (child.nodeType !== 1) continue;
                const id = child.getAttribute('id');
                switch(child.nodeName){
                    case 'source':
                        data.sources[id] = parseSource(child);
                        break;
                    case 'vertices':
                        // data.sources[ id ] = data.sources[ parseId( getElementsByTagName( child, 'input' )[ 0 ].getAttribute( 'source' ) ) ];
                        data.vertices = parseGeometryVertices(child);
                        break;
                    case 'polygons':
                        console.warn('THREE.ColladaLoader: Unsupported primitive type: ', child.nodeName);
                        break;
                    case 'lines':
                    case 'linestrips':
                    case 'polylist':
                    case 'triangles':
                        data.primitives.push(parseGeometryPrimitive(child));
                        break;
                    default:
                        console.log(child);
                }
            }
            library.geometries[xml.getAttribute('id')] = data;
        }
        function parseSource(xml) {
            const data = {
                array: [],
                stride: 3
            };
            for(let i = 0; i < xml.childNodes.length; i++){
                const child = xml.childNodes[i];
                if (child.nodeType !== 1) continue;
                switch(child.nodeName){
                    case 'float_array':
                        data.array = parseFloats(child.textContent);
                        break;
                    case 'Name_array':
                        data.array = parseStrings(child.textContent);
                        break;
                    case 'technique_common':
                        const accessor = getElementsByTagName(child, 'accessor')[0];
                        if (accessor !== undefined) data.stride = parseInt(accessor.getAttribute('stride'));
                        break;
                }
            }
            return data;
        }
        function parseGeometryVertices(xml) {
            const data = {};
            for(let i = 0; i < xml.childNodes.length; i++){
                const child = xml.childNodes[i];
                if (child.nodeType !== 1) continue;
                data[child.getAttribute('semantic')] = parseId(child.getAttribute('source'));
            }
            return data;
        }
        function parseGeometryPrimitive(xml) {
            const primitive = {
                type: xml.nodeName,
                material: xml.getAttribute('material'),
                count: parseInt(xml.getAttribute('count')),
                inputs: {},
                stride: 0,
                hasUV: false
            };
            for(let i = 0, l = xml.childNodes.length; i < l; i++){
                const child = xml.childNodes[i];
                if (child.nodeType !== 1) continue;
                switch(child.nodeName){
                    case 'input':
                        const id = parseId(child.getAttribute('source'));
                        const semantic = child.getAttribute('semantic');
                        const offset = parseInt(child.getAttribute('offset'));
                        const set = parseInt(child.getAttribute('set'));
                        const inputname = set > 0 ? semantic + set : semantic;
                        primitive.inputs[inputname] = {
                            id: id,
                            offset: offset
                        };
                        primitive.stride = Math.max(primitive.stride, offset + 1);
                        if (semantic === 'TEXCOORD') primitive.hasUV = true;
                        break;
                    case 'vcount':
                        primitive.vcount = parseInts(child.textContent);
                        break;
                    case 'p':
                        primitive.p = parseInts(child.textContent);
                        break;
                }
            }
            return primitive;
        }
        function groupPrimitives(primitives) {
            const build = {};
            for(let i = 0; i < primitives.length; i++){
                const primitive = primitives[i];
                if (build[primitive.type] === undefined) build[primitive.type] = [];
                build[primitive.type].push(primitive);
            }
            return build;
        }
        function checkUVCoordinates(primitives) {
            let count = 0;
            for(let i = 0, l = primitives.length; i < l; i++){
                const primitive = primitives[i];
                if (primitive.hasUV === true) count++;
            }
            if (count > 0 && count < primitives.length) primitives.uvsNeedsFix = true;
        }
        function buildGeometry(data) {
            const build = {};
            const sources = data.sources;
            const vertices = data.vertices;
            const primitives = data.primitives;
            if (primitives.length === 0) return {};
            // our goal is to create one buffer geometry for a single type of primitives
            // first, we group all primitives by their type
            const groupedPrimitives = groupPrimitives(primitives);
            for(const type in groupedPrimitives){
                const primitiveType = groupedPrimitives[type];
                // second, ensure consistent uv coordinates for each type of primitives (polylist,triangles or lines)
                checkUVCoordinates(primitiveType);
                // third, create a buffer geometry for each type of primitives
                build[type] = buildGeometryType(primitiveType, sources, vertices);
            }
            return build;
        }
        function buildGeometryType(primitives, sources, vertices) {
            const build = {};
            const position = {
                array: [],
                stride: 0
            };
            const normal = {
                array: [],
                stride: 0
            };
            const uv = {
                array: [],
                stride: 0
            };
            const uv1 = {
                array: [],
                stride: 0
            };
            const color = {
                array: [],
                stride: 0
            };
            const skinIndex = {
                array: [],
                stride: 4
            };
            const skinWeight = {
                array: [],
                stride: 4
            };
            const geometry = new (0, _three.BufferGeometry)();
            const materialKeys = [];
            let start = 0;
            for(let p = 0; p < primitives.length; p++){
                const primitive = primitives[p];
                const inputs = primitive.inputs;
                // groups
                let count = 0;
                switch(primitive.type){
                    case 'lines':
                    case 'linestrips':
                        count = primitive.count * 2;
                        break;
                    case 'triangles':
                        count = primitive.count * 3;
                        break;
                    case 'polylist':
                        for(let g = 0; g < primitive.count; g++){
                            const vc = primitive.vcount[g];
                            switch(vc){
                                case 3:
                                    count += 3; // single triangle
                                    break;
                                case 4:
                                    count += 6; // quad, subdivided into two triangles
                                    break;
                                default:
                                    count += (vc - 2) * 3; // polylist with more than four vertices
                                    break;
                            }
                        }
                        break;
                    default:
                        console.warn('THREE.ColladaLoader: Unknow primitive type:', primitive.type);
                }
                geometry.addGroup(start, count, p);
                start += count;
                // material
                if (primitive.material) materialKeys.push(primitive.material);
                // geometry data
                for(const name in inputs){
                    const input = inputs[name];
                    switch(name){
                        case 'VERTEX':
                            for(const key in vertices){
                                const id = vertices[key];
                                switch(key){
                                    case 'POSITION':
                                        const prevLength = position.array.length;
                                        buildGeometryData(primitive, sources[id], input.offset, position.array);
                                        position.stride = sources[id].stride;
                                        if (sources.skinWeights && sources.skinIndices) {
                                            buildGeometryData(primitive, sources.skinIndices, input.offset, skinIndex.array);
                                            buildGeometryData(primitive, sources.skinWeights, input.offset, skinWeight.array);
                                        }
                                        // see #3803
                                        if (primitive.hasUV === false && primitives.uvsNeedsFix === true) {
                                            const count = (position.array.length - prevLength) / position.stride;
                                            for(let i = 0; i < count; i++)// fill missing uv coordinates
                                            uv.array.push(0, 0);
                                        }
                                        break;
                                    case 'NORMAL':
                                        buildGeometryData(primitive, sources[id], input.offset, normal.array);
                                        normal.stride = sources[id].stride;
                                        break;
                                    case 'COLOR':
                                        buildGeometryData(primitive, sources[id], input.offset, color.array);
                                        color.stride = sources[id].stride;
                                        break;
                                    case 'TEXCOORD':
                                        buildGeometryData(primitive, sources[id], input.offset, uv.array);
                                        uv.stride = sources[id].stride;
                                        break;
                                    case 'TEXCOORD1':
                                        buildGeometryData(primitive, sources[id], input.offset, uv1.array);
                                        uv.stride = sources[id].stride;
                                        break;
                                    default:
                                        console.warn('THREE.ColladaLoader: Semantic "%s" not handled in geometry build process.', key);
                                }
                            }
                            break;
                        case 'NORMAL':
                            buildGeometryData(primitive, sources[input.id], input.offset, normal.array);
                            normal.stride = sources[input.id].stride;
                            break;
                        case 'COLOR':
                            buildGeometryData(primitive, sources[input.id], input.offset, color.array, true);
                            color.stride = sources[input.id].stride;
                            break;
                        case 'TEXCOORD':
                            buildGeometryData(primitive, sources[input.id], input.offset, uv.array);
                            uv.stride = sources[input.id].stride;
                            break;
                        case 'TEXCOORD1':
                            buildGeometryData(primitive, sources[input.id], input.offset, uv1.array);
                            uv1.stride = sources[input.id].stride;
                            break;
                    }
                }
            }
            // build geometry
            if (position.array.length > 0) geometry.setAttribute('position', new (0, _three.Float32BufferAttribute)(position.array, position.stride));
            if (normal.array.length > 0) geometry.setAttribute('normal', new (0, _three.Float32BufferAttribute)(normal.array, normal.stride));
            if (color.array.length > 0) geometry.setAttribute('color', new (0, _three.Float32BufferAttribute)(color.array, color.stride));
            if (uv.array.length > 0) geometry.setAttribute('uv', new (0, _three.Float32BufferAttribute)(uv.array, uv.stride));
            if (uv1.array.length > 0) geometry.setAttribute('uv1', new (0, _three.Float32BufferAttribute)(uv1.array, uv1.stride));
            if (skinIndex.array.length > 0) geometry.setAttribute('skinIndex', new (0, _three.Float32BufferAttribute)(skinIndex.array, skinIndex.stride));
            if (skinWeight.array.length > 0) geometry.setAttribute('skinWeight', new (0, _three.Float32BufferAttribute)(skinWeight.array, skinWeight.stride));
            build.data = geometry;
            build.type = primitives[0].type;
            build.materialKeys = materialKeys;
            return build;
        }
        function buildGeometryData(primitive, source, offset, array, isColor = false) {
            const indices = primitive.p;
            const stride = primitive.stride;
            const vcount = primitive.vcount;
            function pushVector(i) {
                let index = indices[i + offset] * sourceStride;
                const length = index + sourceStride;
                for(; index < length; index++)array.push(sourceArray[index]);
                if (isColor) {
                    // convert the vertex colors from srgb to linear if present
                    const startIndex = array.length - sourceStride - 1;
                    tempColor.setRGB(array[startIndex + 0], array[startIndex + 1], array[startIndex + 2]).convertSRGBToLinear();
                    array[startIndex + 0] = tempColor.r;
                    array[startIndex + 1] = tempColor.g;
                    array[startIndex + 2] = tempColor.b;
                }
            }
            const sourceArray = source.array;
            const sourceStride = source.stride;
            if (primitive.vcount !== undefined) {
                let index = 0;
                for(let i = 0, l = vcount.length; i < l; i++){
                    const count = vcount[i];
                    if (count === 4) {
                        const a = index + stride * 0;
                        const b = index + stride * 1;
                        const c = index + stride * 2;
                        const d = index + stride * 3;
                        pushVector(a);
                        pushVector(b);
                        pushVector(d);
                        pushVector(b);
                        pushVector(c);
                        pushVector(d);
                    } else if (count === 3) {
                        const a = index + stride * 0;
                        const b = index + stride * 1;
                        const c = index + stride * 2;
                        pushVector(a);
                        pushVector(b);
                        pushVector(c);
                    } else if (count > 4) for(let k = 1, kl = count - 2; k <= kl; k++){
                        const a = index + stride * 0;
                        const b = index + stride * k;
                        const c = index + stride * (k + 1);
                        pushVector(a);
                        pushVector(b);
                        pushVector(c);
                    }
                    index += stride * count;
                }
            } else for(let i = 0, l = indices.length; i < l; i += stride)pushVector(i);
        }
        function getGeometry(id) {
            return getBuild(library.geometries[id], buildGeometry);
        }
        // kinematics
        function parseKinematicsModel(xml) {
            const data = {
                name: xml.getAttribute('name') || '',
                joints: {},
                links: []
            };
            for(let i = 0; i < xml.childNodes.length; i++){
                const child = xml.childNodes[i];
                if (child.nodeType !== 1) continue;
                switch(child.nodeName){
                    case 'technique_common':
                        parseKinematicsTechniqueCommon(child, data);
                        break;
                }
            }
            library.kinematicsModels[xml.getAttribute('id')] = data;
        }
        function buildKinematicsModel(data) {
            if (data.build !== undefined) return data.build;
            return data;
        }
        function getKinematicsModel(id) {
            return getBuild(library.kinematicsModels[id], buildKinematicsModel);
        }
        function parseKinematicsTechniqueCommon(xml, data) {
            for(let i = 0; i < xml.childNodes.length; i++){
                const child = xml.childNodes[i];
                if (child.nodeType !== 1) continue;
                switch(child.nodeName){
                    case 'joint':
                        data.joints[child.getAttribute('sid')] = parseKinematicsJoint(child);
                        break;
                    case 'link':
                        data.links.push(parseKinematicsLink(child));
                        break;
                }
            }
        }
        function parseKinematicsJoint(xml) {
            let data;
            for(let i = 0; i < xml.childNodes.length; i++){
                const child = xml.childNodes[i];
                if (child.nodeType !== 1) continue;
                switch(child.nodeName){
                    case 'prismatic':
                    case 'revolute':
                        data = parseKinematicsJointParameter(child);
                        break;
                }
            }
            return data;
        }
        function parseKinematicsJointParameter(xml) {
            const data = {
                sid: xml.getAttribute('sid'),
                name: xml.getAttribute('name') || '',
                axis: new (0, _three.Vector3)(),
                limits: {
                    min: 0,
                    max: 0
                },
                type: xml.nodeName,
                static: false,
                zeroPosition: 0,
                middlePosition: 0
            };
            for(let i = 0; i < xml.childNodes.length; i++){
                const child = xml.childNodes[i];
                if (child.nodeType !== 1) continue;
                switch(child.nodeName){
                    case 'axis':
                        const array = parseFloats(child.textContent);
                        data.axis.fromArray(array);
                        break;
                    case 'limits':
                        const max = child.getElementsByTagName('max')[0];
                        const min = child.getElementsByTagName('min')[0];
                        data.limits.max = parseFloat(max.textContent);
                        data.limits.min = parseFloat(min.textContent);
                        break;
                }
            }
            // if min is equal to or greater than max, consider the joint static
            if (data.limits.min >= data.limits.max) data.static = true;
            // calculate middle position
            data.middlePosition = (data.limits.min + data.limits.max) / 2.0;
            return data;
        }
        function parseKinematicsLink(xml) {
            const data = {
                sid: xml.getAttribute('sid'),
                name: xml.getAttribute('name') || '',
                attachments: [],
                transforms: []
            };
            for(let i = 0; i < xml.childNodes.length; i++){
                const child = xml.childNodes[i];
                if (child.nodeType !== 1) continue;
                switch(child.nodeName){
                    case 'attachment_full':
                        data.attachments.push(parseKinematicsAttachment(child));
                        break;
                    case 'matrix':
                    case 'translate':
                    case 'rotate':
                        data.transforms.push(parseKinematicsTransform(child));
                        break;
                }
            }
            return data;
        }
        function parseKinematicsAttachment(xml) {
            const data = {
                joint: xml.getAttribute('joint').split('/').pop(),
                transforms: [],
                links: []
            };
            for(let i = 0; i < xml.childNodes.length; i++){
                const child = xml.childNodes[i];
                if (child.nodeType !== 1) continue;
                switch(child.nodeName){
                    case 'link':
                        data.links.push(parseKinematicsLink(child));
                        break;
                    case 'matrix':
                    case 'translate':
                    case 'rotate':
                        data.transforms.push(parseKinematicsTransform(child));
                        break;
                }
            }
            return data;
        }
        function parseKinematicsTransform(xml) {
            const data = {
                type: xml.nodeName
            };
            const array = parseFloats(xml.textContent);
            switch(data.type){
                case 'matrix':
                    data.obj = new (0, _three.Matrix4)();
                    data.obj.fromArray(array).transpose();
                    break;
                case 'translate':
                    data.obj = new (0, _three.Vector3)();
                    data.obj.fromArray(array);
                    break;
                case 'rotate':
                    data.obj = new (0, _three.Vector3)();
                    data.obj.fromArray(array);
                    data.angle = (0, _three.MathUtils).degToRad(array[3]);
                    break;
            }
            return data;
        }
        // physics
        function parsePhysicsModel(xml) {
            const data = {
                name: xml.getAttribute('name') || '',
                rigidBodies: {}
            };
            for(let i = 0; i < xml.childNodes.length; i++){
                const child = xml.childNodes[i];
                if (child.nodeType !== 1) continue;
                switch(child.nodeName){
                    case 'rigid_body':
                        data.rigidBodies[child.getAttribute('name')] = {};
                        parsePhysicsRigidBody(child, data.rigidBodies[child.getAttribute('name')]);
                        break;
                }
            }
            library.physicsModels[xml.getAttribute('id')] = data;
        }
        function parsePhysicsRigidBody(xml, data) {
            for(let i = 0; i < xml.childNodes.length; i++){
                const child = xml.childNodes[i];
                if (child.nodeType !== 1) continue;
                switch(child.nodeName){
                    case 'technique_common':
                        parsePhysicsTechniqueCommon(child, data);
                        break;
                }
            }
        }
        function parsePhysicsTechniqueCommon(xml, data) {
            for(let i = 0; i < xml.childNodes.length; i++){
                const child = xml.childNodes[i];
                if (child.nodeType !== 1) continue;
                switch(child.nodeName){
                    case 'inertia':
                        data.inertia = parseFloats(child.textContent);
                        break;
                    case 'mass':
                        data.mass = parseFloats(child.textContent)[0];
                        break;
                }
            }
        }
        // scene
        function parseKinematicsScene(xml) {
            const data = {
                bindJointAxis: []
            };
            for(let i = 0; i < xml.childNodes.length; i++){
                const child = xml.childNodes[i];
                if (child.nodeType !== 1) continue;
                switch(child.nodeName){
                    case 'bind_joint_axis':
                        data.bindJointAxis.push(parseKinematicsBindJointAxis(child));
                        break;
                }
            }
            library.kinematicsScenes[parseId(xml.getAttribute('url'))] = data;
        }
        function parseKinematicsBindJointAxis(xml) {
            const data = {
                target: xml.getAttribute('target').split('/').pop()
            };
            for(let i = 0; i < xml.childNodes.length; i++){
                const child = xml.childNodes[i];
                if (child.nodeType !== 1) continue;
                switch(child.nodeName){
                    case 'axis':
                        const param = child.getElementsByTagName('param')[0];
                        data.axis = param.textContent;
                        const tmpJointIndex = data.axis.split('inst_').pop().split('axis')[0];
                        data.jointIndex = tmpJointIndex.substring(0, tmpJointIndex.length - 1);
                        break;
                }
            }
            return data;
        }
        function buildKinematicsScene(data) {
            if (data.build !== undefined) return data.build;
            return data;
        }
        function getKinematicsScene(id) {
            return getBuild(library.kinematicsScenes[id], buildKinematicsScene);
        }
        function setupKinematics() {
            const kinematicsModelId = Object.keys(library.kinematicsModels)[0];
            const kinematicsSceneId = Object.keys(library.kinematicsScenes)[0];
            const visualSceneId = Object.keys(library.visualScenes)[0];
            if (kinematicsModelId === undefined || kinematicsSceneId === undefined) return;
            const kinematicsModel = getKinematicsModel(kinematicsModelId);
            const kinematicsScene = getKinematicsScene(kinematicsSceneId);
            const visualScene = getVisualScene(visualSceneId);
            const bindJointAxis = kinematicsScene.bindJointAxis;
            const jointMap = {};
            for(let i = 0, l = bindJointAxis.length; i < l; i++){
                const axis = bindJointAxis[i];
                // the result of the following query is an element of type 'translate', 'rotate','scale' or 'matrix'
                const targetElement = collada.querySelector('[sid="' + axis.target + '"]');
                if (targetElement) {
                    // get the parent of the transform element
                    const parentVisualElement = targetElement.parentElement;
                    // connect the joint of the kinematics model with the element in the visual scene
                    connect(axis.jointIndex, parentVisualElement);
                }
            }
            function connect(jointIndex, visualElement) {
                const visualElementName = visualElement.getAttribute('name');
                const joint = kinematicsModel.joints[jointIndex];
                visualScene.traverse(function(object) {
                    if (object.name === visualElementName) jointMap[jointIndex] = {
                        object: object,
                        transforms: buildTransformList(visualElement),
                        joint: joint,
                        position: joint.zeroPosition
                    };
                });
            }
            const m0 = new (0, _three.Matrix4)();
            kinematics = {
                joints: kinematicsModel && kinematicsModel.joints,
                getJointValue: function(jointIndex) {
                    const jointData = jointMap[jointIndex];
                    if (jointData) return jointData.position;
                    else console.warn('THREE.ColladaLoader: Joint ' + jointIndex + ' doesn\'t exist.');
                },
                setJointValue: function(jointIndex, value) {
                    const jointData = jointMap[jointIndex];
                    if (jointData) {
                        const joint = jointData.joint;
                        if (value > joint.limits.max || value < joint.limits.min) console.warn('THREE.ColladaLoader: Joint ' + jointIndex + ' value ' + value + ' outside of limits (min: ' + joint.limits.min + ', max: ' + joint.limits.max + ').');
                        else if (joint.static) console.warn('THREE.ColladaLoader: Joint ' + jointIndex + ' is static.');
                        else {
                            const object = jointData.object;
                            const axis = joint.axis;
                            const transforms = jointData.transforms;
                            matrix.identity();
                            // each update, we have to apply all transforms in the correct order
                            for(let i = 0; i < transforms.length; i++){
                                const transform = transforms[i];
                                // if there is a connection of the transform node with a joint, apply the joint value
                                if (transform.sid && transform.sid.indexOf(jointIndex) !== -1) switch(joint.type){
                                    case 'revolute':
                                        matrix.multiply(m0.makeRotationAxis(axis, (0, _three.MathUtils).degToRad(value)));
                                        break;
                                    case 'prismatic':
                                        matrix.multiply(m0.makeTranslation(axis.x * value, axis.y * value, axis.z * value));
                                        break;
                                    default:
                                        console.warn('THREE.ColladaLoader: Unknown joint type: ' + joint.type);
                                        break;
                                }
                                else switch(transform.type){
                                    case 'matrix':
                                        matrix.multiply(transform.obj);
                                        break;
                                    case 'translate':
                                        matrix.multiply(m0.makeTranslation(transform.obj.x, transform.obj.y, transform.obj.z));
                                        break;
                                    case 'scale':
                                        matrix.scale(transform.obj);
                                        break;
                                    case 'rotate':
                                        matrix.multiply(m0.makeRotationAxis(transform.obj, transform.angle));
                                        break;
                                }
                            }
                            object.matrix.copy(matrix);
                            object.matrix.decompose(object.position, object.quaternion, object.scale);
                            jointMap[jointIndex].position = value;
                        }
                    } else console.log('THREE.ColladaLoader: ' + jointIndex + ' does not exist.');
                }
            };
        }
        function buildTransformList(node) {
            const transforms = [];
            const xml = collada.querySelector('[id="' + node.id + '"]');
            for(let i = 0; i < xml.childNodes.length; i++){
                const child = xml.childNodes[i];
                if (child.nodeType !== 1) continue;
                let array, vector;
                switch(child.nodeName){
                    case 'matrix':
                        array = parseFloats(child.textContent);
                        const matrix = new (0, _three.Matrix4)().fromArray(array).transpose();
                        transforms.push({
                            sid: child.getAttribute('sid'),
                            type: child.nodeName,
                            obj: matrix
                        });
                        break;
                    case 'translate':
                    case 'scale':
                        array = parseFloats(child.textContent);
                        vector = new (0, _three.Vector3)().fromArray(array);
                        transforms.push({
                            sid: child.getAttribute('sid'),
                            type: child.nodeName,
                            obj: vector
                        });
                        break;
                    case 'rotate':
                        array = parseFloats(child.textContent);
                        vector = new (0, _three.Vector3)().fromArray(array);
                        const angle = (0, _three.MathUtils).degToRad(array[3]);
                        transforms.push({
                            sid: child.getAttribute('sid'),
                            type: child.nodeName,
                            obj: vector,
                            angle: angle
                        });
                        break;
                }
            }
            return transforms;
        }
        // nodes
        function prepareNodes(xml) {
            const elements = xml.getElementsByTagName('node');
            // ensure all node elements have id attributes
            for(let i = 0; i < elements.length; i++){
                const element = elements[i];
                if (element.hasAttribute('id') === false) element.setAttribute('id', generateId());
            }
        }
        const matrix = new (0, _three.Matrix4)();
        const vector = new (0, _three.Vector3)();
        function parseNode(xml) {
            const data = {
                name: xml.getAttribute('name') || '',
                type: xml.getAttribute('type'),
                id: xml.getAttribute('id'),
                sid: xml.getAttribute('sid'),
                matrix: new (0, _three.Matrix4)(),
                nodes: [],
                instanceCameras: [],
                instanceControllers: [],
                instanceLights: [],
                instanceGeometries: [],
                instanceNodes: [],
                transforms: {}
            };
            for(let i = 0; i < xml.childNodes.length; i++){
                const child = xml.childNodes[i];
                if (child.nodeType !== 1) continue;
                let array;
                switch(child.nodeName){
                    case 'node':
                        data.nodes.push(child.getAttribute('id'));
                        parseNode(child);
                        break;
                    case 'instance_camera':
                        data.instanceCameras.push(parseId(child.getAttribute('url')));
                        break;
                    case 'instance_controller':
                        data.instanceControllers.push(parseNodeInstance(child));
                        break;
                    case 'instance_light':
                        data.instanceLights.push(parseId(child.getAttribute('url')));
                        break;
                    case 'instance_geometry':
                        data.instanceGeometries.push(parseNodeInstance(child));
                        break;
                    case 'instance_node':
                        data.instanceNodes.push(parseId(child.getAttribute('url')));
                        break;
                    case 'matrix':
                        array = parseFloats(child.textContent);
                        data.matrix.multiply(matrix.fromArray(array).transpose());
                        data.transforms[child.getAttribute('sid')] = child.nodeName;
                        break;
                    case 'translate':
                        array = parseFloats(child.textContent);
                        vector.fromArray(array);
                        data.matrix.multiply(matrix.makeTranslation(vector.x, vector.y, vector.z));
                        data.transforms[child.getAttribute('sid')] = child.nodeName;
                        break;
                    case 'rotate':
                        array = parseFloats(child.textContent);
                        const angle = (0, _three.MathUtils).degToRad(array[3]);
                        data.matrix.multiply(matrix.makeRotationAxis(vector.fromArray(array), angle));
                        data.transforms[child.getAttribute('sid')] = child.nodeName;
                        break;
                    case 'scale':
                        array = parseFloats(child.textContent);
                        data.matrix.scale(vector.fromArray(array));
                        data.transforms[child.getAttribute('sid')] = child.nodeName;
                        break;
                    case 'extra':
                        break;
                    default:
                        console.log(child);
                }
            }
            if (hasNode(data.id)) console.warn('THREE.ColladaLoader: There is already a node with ID %s. Exclude current node from further processing.', data.id);
            else library.nodes[data.id] = data;
            return data;
        }
        function parseNodeInstance(xml) {
            const data = {
                id: parseId(xml.getAttribute('url')),
                materials: {},
                skeletons: []
            };
            for(let i = 0; i < xml.childNodes.length; i++){
                const child = xml.childNodes[i];
                switch(child.nodeName){
                    case 'bind_material':
                        const instances = child.getElementsByTagName('instance_material');
                        for(let j = 0; j < instances.length; j++){
                            const instance = instances[j];
                            const symbol = instance.getAttribute('symbol');
                            const target = instance.getAttribute('target');
                            data.materials[symbol] = parseId(target);
                        }
                        break;
                    case 'skeleton':
                        data.skeletons.push(parseId(child.textContent));
                        break;
                    default:
                        break;
                }
            }
            return data;
        }
        function buildSkeleton(skeletons, joints) {
            const boneData = [];
            const sortedBoneData = [];
            let i, j, data;
            // a skeleton can have multiple root bones. collada expresses this
            // situtation with multiple "skeleton" tags per controller instance
            for(i = 0; i < skeletons.length; i++){
                const skeleton = skeletons[i];
                let root;
                if (hasNode(skeleton)) {
                    root = getNode(skeleton);
                    buildBoneHierarchy(root, joints, boneData);
                } else if (hasVisualScene(skeleton)) {
                    // handle case where the skeleton refers to the visual scene (#13335)
                    const visualScene = library.visualScenes[skeleton];
                    const children = visualScene.children;
                    for(let j = 0; j < children.length; j++){
                        const child = children[j];
                        if (child.type === 'JOINT') {
                            const root = getNode(child.id);
                            buildBoneHierarchy(root, joints, boneData);
                        }
                    }
                } else console.error('THREE.ColladaLoader: Unable to find root bone of skeleton with ID:', skeleton);
            }
            // sort bone data (the order is defined in the corresponding controller)
            for(i = 0; i < joints.length; i++)for(j = 0; j < boneData.length; j++){
                data = boneData[j];
                if (data.bone.name === joints[i].name) {
                    sortedBoneData[i] = data;
                    data.processed = true;
                    break;
                }
            }
            // add unprocessed bone data at the end of the list
            for(i = 0; i < boneData.length; i++){
                data = boneData[i];
                if (data.processed === false) {
                    sortedBoneData.push(data);
                    data.processed = true;
                }
            }
            // setup arrays for skeleton creation
            const bones = [];
            const boneInverses = [];
            for(i = 0; i < sortedBoneData.length; i++){
                data = sortedBoneData[i];
                bones.push(data.bone);
                boneInverses.push(data.boneInverse);
            }
            return new (0, _three.Skeleton)(bones, boneInverses);
        }
        function buildBoneHierarchy(root, joints, boneData) {
            // setup bone data from visual scene
            root.traverse(function(object) {
                if (object.isBone === true) {
                    let boneInverse;
                    // retrieve the boneInverse from the controller data
                    for(let i = 0; i < joints.length; i++){
                        const joint = joints[i];
                        if (joint.name === object.name) {
                            boneInverse = joint.boneInverse;
                            break;
                        }
                    }
                    if (boneInverse === undefined) // Unfortunately, there can be joints in the visual scene that are not part of the
                    // corresponding controller. In this case, we have to create a dummy boneInverse matrix
                    // for the respective bone. This bone won't affect any vertices, because there are no skin indices
                    // and weights defined for it. But we still have to add the bone to the sorted bone list in order to
                    // ensure a correct animation of the model.
                    boneInverse = new (0, _three.Matrix4)();
                    boneData.push({
                        bone: object,
                        boneInverse: boneInverse,
                        processed: false
                    });
                }
            });
        }
        function buildNode(data) {
            const objects = [];
            const matrix = data.matrix;
            const nodes = data.nodes;
            const type = data.type;
            const instanceCameras = data.instanceCameras;
            const instanceControllers = data.instanceControllers;
            const instanceLights = data.instanceLights;
            const instanceGeometries = data.instanceGeometries;
            const instanceNodes = data.instanceNodes;
            // nodes
            for(let i = 0, l = nodes.length; i < l; i++)objects.push(getNode(nodes[i]));
            // instance cameras
            for(let i = 0, l = instanceCameras.length; i < l; i++){
                const instanceCamera = getCamera(instanceCameras[i]);
                if (instanceCamera !== null) objects.push(instanceCamera.clone());
            }
            // instance controllers
            for(let i = 0, l = instanceControllers.length; i < l; i++){
                const instance = instanceControllers[i];
                const controller = getController(instance.id);
                const geometries = getGeometry(controller.id);
                const newObjects = buildObjects(geometries, instance.materials);
                const skeletons = instance.skeletons;
                const joints = controller.skin.joints;
                const skeleton = buildSkeleton(skeletons, joints);
                for(let j = 0, jl = newObjects.length; j < jl; j++){
                    const object = newObjects[j];
                    if (object.isSkinnedMesh) {
                        object.bind(skeleton, controller.skin.bindMatrix);
                        object.normalizeSkinWeights();
                    }
                    objects.push(object);
                }
            }
            // instance lights
            for(let i = 0, l = instanceLights.length; i < l; i++){
                const instanceLight = getLight(instanceLights[i]);
                if (instanceLight !== null) objects.push(instanceLight.clone());
            }
            // instance geometries
            for(let i = 0, l = instanceGeometries.length; i < l; i++){
                const instance = instanceGeometries[i];
                // a single geometry instance in collada can lead to multiple object3Ds.
                // this is the case when primitives are combined like triangles and lines
                const geometries = getGeometry(instance.id);
                const newObjects = buildObjects(geometries, instance.materials);
                for(let j = 0, jl = newObjects.length; j < jl; j++)objects.push(newObjects[j]);
            }
            // instance nodes
            for(let i = 0, l = instanceNodes.length; i < l; i++)objects.push(getNode(instanceNodes[i]).clone());
            let object;
            if (nodes.length === 0 && objects.length === 1) object = objects[0];
            else {
                object = type === 'JOINT' ? new (0, _three.Bone)() : new (0, _three.Group)();
                for(let i = 0; i < objects.length; i++)object.add(objects[i]);
            }
            object.name = type === 'JOINT' ? data.sid : data.name;
            object.matrix.copy(matrix);
            object.matrix.decompose(object.position, object.quaternion, object.scale);
            return object;
        }
        const fallbackMaterial = new (0, _three.MeshBasicMaterial)({
            name: (0, _three.Loader).DEFAULT_MATERIAL_NAME,
            color: 0xff00ff
        });
        function resolveMaterialBinding(keys, instanceMaterials) {
            const materials = [];
            for(let i = 0, l = keys.length; i < l; i++){
                const id = instanceMaterials[keys[i]];
                if (id === undefined) {
                    console.warn('THREE.ColladaLoader: Material with key %s not found. Apply fallback material.', keys[i]);
                    materials.push(fallbackMaterial);
                } else materials.push(getMaterial(id));
            }
            return materials;
        }
        function buildObjects(geometries, instanceMaterials) {
            const objects = [];
            for(const type in geometries){
                const geometry = geometries[type];
                const materials = resolveMaterialBinding(geometry.materialKeys, instanceMaterials);
                // handle case if no materials are defined
                if (materials.length === 0) {
                    if (type === 'lines' || type === 'linestrips') materials.push(new (0, _three.LineBasicMaterial)());
                    else materials.push(new (0, _three.MeshPhongMaterial)());
                }
                // Collada allows to use phong and lambert materials with lines. Replacing these cases with LineBasicMaterial.
                if (type === 'lines' || type === 'linestrips') for(let i = 0, l = materials.length; i < l; i++){
                    const material = materials[i];
                    if (material.isMeshPhongMaterial === true || material.isMeshLambertMaterial === true) {
                        const lineMaterial = new (0, _three.LineBasicMaterial)();
                        // copy compatible properties
                        lineMaterial.color.copy(material.color);
                        lineMaterial.opacity = material.opacity;
                        lineMaterial.transparent = material.transparent;
                        // replace material
                        materials[i] = lineMaterial;
                    }
                }
                // regard skinning
                const skinning = geometry.data.attributes.skinIndex !== undefined;
                // choose between a single or multi materials (material array)
                const material = materials.length === 1 ? materials[0] : materials;
                // now create a specific 3D object
                let object;
                switch(type){
                    case 'lines':
                        object = new (0, _three.LineSegments)(geometry.data, material);
                        break;
                    case 'linestrips':
                        object = new (0, _three.Line)(geometry.data, material);
                        break;
                    case 'triangles':
                    case 'polylist':
                        if (skinning) object = new (0, _three.SkinnedMesh)(geometry.data, material);
                        else object = new (0, _three.Mesh)(geometry.data, material);
                        break;
                }
                objects.push(object);
            }
            return objects;
        }
        function hasNode(id) {
            return library.nodes[id] !== undefined;
        }
        function getNode(id) {
            return getBuild(library.nodes[id], buildNode);
        }
        // visual scenes
        function parseVisualScene(xml) {
            const data = {
                name: xml.getAttribute('name'),
                children: []
            };
            prepareNodes(xml);
            const elements = getElementsByTagName(xml, 'node');
            for(let i = 0; i < elements.length; i++)data.children.push(parseNode(elements[i]));
            library.visualScenes[xml.getAttribute('id')] = data;
        }
        function buildVisualScene(data) {
            const group = new (0, _three.Group)();
            group.name = data.name;
            const children = data.children;
            for(let i = 0; i < children.length; i++){
                const child = children[i];
                group.add(getNode(child.id));
            }
            return group;
        }
        function hasVisualScene(id) {
            return library.visualScenes[id] !== undefined;
        }
        function getVisualScene(id) {
            return getBuild(library.visualScenes[id], buildVisualScene);
        }
        // scenes
        function parseScene(xml) {
            const instance = getElementsByTagName(xml, 'instance_visual_scene')[0];
            return getVisualScene(parseId(instance.getAttribute('url')));
        }
        function setupAnimations() {
            const clips = library.clips;
            if (isEmpty(clips) === true) {
                if (isEmpty(library.animations) === false) {
                    // if there are animations but no clips, we create a default clip for playback
                    const tracks = [];
                    for(const id in library.animations){
                        const animationTracks = getAnimation(id);
                        for(let i = 0, l = animationTracks.length; i < l; i++)tracks.push(animationTracks[i]);
                    }
                    animations.push(new (0, _three.AnimationClip)('default', -1, tracks));
                }
            } else for(const id in clips)animations.push(getAnimationClip(id));
        }
        // convert the parser error element into text with each child elements text
        // separated by new lines.
        function parserErrorToText(parserError) {
            let result = '';
            const stack = [
                parserError
            ];
            while(stack.length){
                const node = stack.shift();
                if (node.nodeType === Node.TEXT_NODE) result += node.textContent;
                else {
                    result += '\n';
                    stack.push.apply(stack, node.childNodes);
                }
            }
            return result.trim();
        }
        if (text.length === 0) return {
            scene: new (0, _three.Scene)()
        };
        const xml = new DOMParser().parseFromString(text, 'application/xml');
        const collada = getElementsByTagName(xml, 'COLLADA')[0];
        const parserError = xml.getElementsByTagName('parsererror')[0];
        if (parserError !== undefined) {
            // Chrome will return parser error with a div in it
            const errorElement = getElementsByTagName(parserError, 'div')[0];
            let errorText;
            if (errorElement) errorText = errorElement.textContent;
            else errorText = parserErrorToText(parserError);
            console.error('THREE.ColladaLoader: Failed to parse collada file.\n', errorText);
            return null;
        }
        // metadata
        const version = collada.getAttribute('version');
        console.debug('THREE.ColladaLoader: File version', version);
        const asset = parseAsset(getElementsByTagName(collada, 'asset')[0]);
        const textureLoader = new (0, _three.TextureLoader)(this.manager);
        textureLoader.setPath(this.resourcePath || path).setCrossOrigin(this.crossOrigin);
        let tgaLoader;
        if (0, _tgaloaderJs.TGALoader) {
            tgaLoader = new (0, _tgaloaderJs.TGALoader)(this.manager);
            tgaLoader.setPath(this.resourcePath || path);
        }
        //
        const tempColor = new (0, _three.Color)();
        const animations = [];
        let kinematics = {};
        let count = 0;
        //
        const library = {
            animations: {},
            clips: {},
            controllers: {},
            images: {},
            effects: {},
            materials: {},
            cameras: {},
            lights: {},
            geometries: {},
            nodes: {},
            visualScenes: {},
            kinematicsModels: {},
            physicsModels: {},
            kinematicsScenes: {}
        };
        parseLibrary(collada, 'library_animations', 'animation', parseAnimation);
        parseLibrary(collada, 'library_animation_clips', 'animation_clip', parseAnimationClip);
        parseLibrary(collada, 'library_controllers', 'controller', parseController);
        parseLibrary(collada, 'library_images', 'image', parseImage);
        parseLibrary(collada, 'library_effects', 'effect', parseEffect);
        parseLibrary(collada, 'library_materials', 'material', parseMaterial);
        parseLibrary(collada, 'library_cameras', 'camera', parseCamera);
        parseLibrary(collada, 'library_lights', 'light', parseLight);
        parseLibrary(collada, 'library_geometries', 'geometry', parseGeometry);
        parseLibrary(collada, 'library_nodes', 'node', parseNode);
        parseLibrary(collada, 'library_visual_scenes', 'visual_scene', parseVisualScene);
        parseLibrary(collada, 'library_kinematics_models', 'kinematics_model', parseKinematicsModel);
        parseLibrary(collada, 'library_physics_models', 'physics_model', parsePhysicsModel);
        parseLibrary(collada, 'scene', 'instance_kinematics_scene', parseKinematicsScene);
        buildLibrary(library.animations, buildAnimation);
        buildLibrary(library.clips, buildAnimationClip);
        buildLibrary(library.controllers, buildController);
        buildLibrary(library.images, buildImage);
        buildLibrary(library.effects, buildEffect);
        buildLibrary(library.materials, buildMaterial);
        buildLibrary(library.cameras, buildCamera);
        buildLibrary(library.lights, buildLight);
        buildLibrary(library.geometries, buildGeometry);
        buildLibrary(library.visualScenes, buildVisualScene);
        setupAnimations();
        setupKinematics();
        const scene = parseScene(getElementsByTagName(collada, 'scene')[0]);
        scene.animations = animations;
        if (asset.upAxis === 'Z_UP') {
            console.warn('THREE.ColladaLoader: You are loading an asset with a Z-UP coordinate system. The loader just rotates the asset to transform it into Y-UP. The vertex data are not converted, see #24289.');
            scene.rotation.set(-Math.PI / 2, 0, 0);
        }
        scene.scale.multiplyScalar(asset.unit);
        return {
            get animations () {
                console.warn('THREE.ColladaLoader: Please access animations over scene.animations now.');
                return animations;
            },
            kinematics: kinematics,
            library: library,
            scene: scene
        };
    }
}

},{"three":"ktPTu","../loaders/TGALoader.js":"1srWM","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1srWM":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "TGALoader", ()=>TGALoader);
var _three = require("three");
class TGALoader extends (0, _three.DataTextureLoader) {
    constructor(manager){
        super(manager);
    }
    parse(buffer) {
        // reference from vthibault, https://github.com/vthibault/roBrowser/blob/master/src/Loaders/Targa.js
        function tgaCheckHeader(header) {
            switch(header.image_type){
                // check indexed type
                case TGA_TYPE_INDEXED:
                case TGA_TYPE_RLE_INDEXED:
                    if (header.colormap_length > 256 || header.colormap_size !== 24 || header.colormap_type !== 1) throw new Error('THREE.TGALoader: Invalid type colormap data for indexed type.');
                    break;
                // check colormap type
                case TGA_TYPE_RGB:
                case TGA_TYPE_GREY:
                case TGA_TYPE_RLE_RGB:
                case TGA_TYPE_RLE_GREY:
                    if (header.colormap_type) throw new Error('THREE.TGALoader: Invalid type colormap data for colormap type.');
                    break;
                // What the need of a file without data ?
                case TGA_TYPE_NO_DATA:
                    throw new Error('THREE.TGALoader: No data.');
                // Invalid type ?
                default:
                    throw new Error('THREE.TGALoader: Invalid type ' + header.image_type);
            }
            // check image width and height
            if (header.width <= 0 || header.height <= 0) throw new Error('THREE.TGALoader: Invalid image size.');
            // check image pixel size
            if (header.pixel_size !== 8 && header.pixel_size !== 16 && header.pixel_size !== 24 && header.pixel_size !== 32) throw new Error('THREE.TGALoader: Invalid pixel size ' + header.pixel_size);
        }
        // parse tga image buffer
        function tgaParse(use_rle, use_pal, header, offset, data) {
            let pixel_data, palettes;
            const pixel_size = header.pixel_size >> 3;
            const pixel_total = header.width * header.height * pixel_size;
            // read palettes
            if (use_pal) palettes = data.subarray(offset, offset += header.colormap_length * (header.colormap_size >> 3));
            // read RLE
            if (use_rle) {
                pixel_data = new Uint8Array(pixel_total);
                let c, count, i;
                let shift = 0;
                const pixels = new Uint8Array(pixel_size);
                while(shift < pixel_total){
                    c = data[offset++];
                    count = (c & 0x7f) + 1;
                    // RLE pixels
                    if (c & 0x80) {
                        // bind pixel tmp array
                        for(i = 0; i < pixel_size; ++i)pixels[i] = data[offset++];
                        // copy pixel array
                        for(i = 0; i < count; ++i)pixel_data.set(pixels, shift + i * pixel_size);
                        shift += pixel_size * count;
                    } else {
                        // raw pixels
                        count *= pixel_size;
                        for(i = 0; i < count; ++i)pixel_data[shift + i] = data[offset++];
                        shift += count;
                    }
                }
            } else // raw pixels
            pixel_data = data.subarray(offset, offset += use_pal ? header.width * header.height : pixel_total);
            return {
                pixel_data: pixel_data,
                palettes: palettes
            };
        }
        function tgaGetImageData8bits(imageData, y_start, y_step, y_end, x_start, x_step, x_end, image, palettes) {
            const colormap = palettes;
            let color, i = 0, x, y;
            const width = header.width;
            for(y = y_start; y !== y_end; y += y_step)for(x = x_start; x !== x_end; x += x_step, i++){
                color = image[i];
                imageData[(x + width * y) * 4 + 3] = 255;
                imageData[(x + width * y) * 4 + 2] = colormap[color * 3 + 0];
                imageData[(x + width * y) * 4 + 1] = colormap[color * 3 + 1];
                imageData[(x + width * y) * 4 + 0] = colormap[color * 3 + 2];
            }
            return imageData;
        }
        function tgaGetImageData16bits(imageData, y_start, y_step, y_end, x_start, x_step, x_end, image) {
            let color, i = 0, x, y;
            const width = header.width;
            for(y = y_start; y !== y_end; y += y_step)for(x = x_start; x !== x_end; x += x_step, i += 2){
                color = image[i + 0] + (image[i + 1] << 8);
                imageData[(x + width * y) * 4 + 0] = (color & 0x7C00) >> 7;
                imageData[(x + width * y) * 4 + 1] = (color & 0x03E0) >> 2;
                imageData[(x + width * y) * 4 + 2] = (color & 0x001F) << 3;
                imageData[(x + width * y) * 4 + 3] = color & 0x8000 ? 0 : 255;
            }
            return imageData;
        }
        function tgaGetImageData24bits(imageData, y_start, y_step, y_end, x_start, x_step, x_end, image) {
            let i = 0, x, y;
            const width = header.width;
            for(y = y_start; y !== y_end; y += y_step)for(x = x_start; x !== x_end; x += x_step, i += 3){
                imageData[(x + width * y) * 4 + 3] = 255;
                imageData[(x + width * y) * 4 + 2] = image[i + 0];
                imageData[(x + width * y) * 4 + 1] = image[i + 1];
                imageData[(x + width * y) * 4 + 0] = image[i + 2];
            }
            return imageData;
        }
        function tgaGetImageData32bits(imageData, y_start, y_step, y_end, x_start, x_step, x_end, image) {
            let i = 0, x, y;
            const width = header.width;
            for(y = y_start; y !== y_end; y += y_step)for(x = x_start; x !== x_end; x += x_step, i += 4){
                imageData[(x + width * y) * 4 + 2] = image[i + 0];
                imageData[(x + width * y) * 4 + 1] = image[i + 1];
                imageData[(x + width * y) * 4 + 0] = image[i + 2];
                imageData[(x + width * y) * 4 + 3] = image[i + 3];
            }
            return imageData;
        }
        function tgaGetImageDataGrey8bits(imageData, y_start, y_step, y_end, x_start, x_step, x_end, image) {
            let color, i = 0, x, y;
            const width = header.width;
            for(y = y_start; y !== y_end; y += y_step)for(x = x_start; x !== x_end; x += x_step, i++){
                color = image[i];
                imageData[(x + width * y) * 4 + 0] = color;
                imageData[(x + width * y) * 4 + 1] = color;
                imageData[(x + width * y) * 4 + 2] = color;
                imageData[(x + width * y) * 4 + 3] = 255;
            }
            return imageData;
        }
        function tgaGetImageDataGrey16bits(imageData, y_start, y_step, y_end, x_start, x_step, x_end, image) {
            let i = 0, x, y;
            const width = header.width;
            for(y = y_start; y !== y_end; y += y_step)for(x = x_start; x !== x_end; x += x_step, i += 2){
                imageData[(x + width * y) * 4 + 0] = image[i + 0];
                imageData[(x + width * y) * 4 + 1] = image[i + 0];
                imageData[(x + width * y) * 4 + 2] = image[i + 0];
                imageData[(x + width * y) * 4 + 3] = image[i + 1];
            }
            return imageData;
        }
        function getTgaRGBA(data, width, height, image, palette) {
            let x_start, y_start, x_step, y_step, x_end, y_end;
            switch((header.flags & TGA_ORIGIN_MASK) >> TGA_ORIGIN_SHIFT){
                default:
                case TGA_ORIGIN_UL:
                    x_start = 0;
                    x_step = 1;
                    x_end = width;
                    y_start = 0;
                    y_step = 1;
                    y_end = height;
                    break;
                case TGA_ORIGIN_BL:
                    x_start = 0;
                    x_step = 1;
                    x_end = width;
                    y_start = height - 1;
                    y_step = -1;
                    y_end = -1;
                    break;
                case TGA_ORIGIN_UR:
                    x_start = width - 1;
                    x_step = -1;
                    x_end = -1;
                    y_start = 0;
                    y_step = 1;
                    y_end = height;
                    break;
                case TGA_ORIGIN_BR:
                    x_start = width - 1;
                    x_step = -1;
                    x_end = -1;
                    y_start = height - 1;
                    y_step = -1;
                    y_end = -1;
                    break;
            }
            if (use_grey) switch(header.pixel_size){
                case 8:
                    tgaGetImageDataGrey8bits(data, y_start, y_step, y_end, x_start, x_step, x_end, image);
                    break;
                case 16:
                    tgaGetImageDataGrey16bits(data, y_start, y_step, y_end, x_start, x_step, x_end, image);
                    break;
                default:
                    throw new Error('THREE.TGALoader: Format not supported.');
            }
            else switch(header.pixel_size){
                case 8:
                    tgaGetImageData8bits(data, y_start, y_step, y_end, x_start, x_step, x_end, image, palette);
                    break;
                case 16:
                    tgaGetImageData16bits(data, y_start, y_step, y_end, x_start, x_step, x_end, image);
                    break;
                case 24:
                    tgaGetImageData24bits(data, y_start, y_step, y_end, x_start, x_step, x_end, image);
                    break;
                case 32:
                    tgaGetImageData32bits(data, y_start, y_step, y_end, x_start, x_step, x_end, image);
                    break;
                default:
                    throw new Error('THREE.TGALoader: Format not supported.');
            }
            // Load image data according to specific method
            // let func = 'tgaGetImageData' + (use_grey ? 'Grey' : '') + (header.pixel_size) + 'bits';
            // func(data, y_start, y_step, y_end, x_start, x_step, x_end, width, image, palette );
            return data;
        }
        // TGA constants
        const TGA_TYPE_NO_DATA = 0, TGA_TYPE_INDEXED = 1, TGA_TYPE_RGB = 2, TGA_TYPE_GREY = 3, TGA_TYPE_RLE_INDEXED = 9, TGA_TYPE_RLE_RGB = 10, TGA_TYPE_RLE_GREY = 11, TGA_ORIGIN_MASK = 0x30, TGA_ORIGIN_SHIFT = 0x04, TGA_ORIGIN_BL = 0x00, TGA_ORIGIN_BR = 0x01, TGA_ORIGIN_UL = 0x02, TGA_ORIGIN_UR = 0x03;
        if (buffer.length < 19) throw new Error('THREE.TGALoader: Not enough data to contain header.');
        let offset = 0;
        const content = new Uint8Array(buffer), header = {
            id_length: content[offset++],
            colormap_type: content[offset++],
            image_type: content[offset++],
            colormap_index: content[offset++] | content[offset++] << 8,
            colormap_length: content[offset++] | content[offset++] << 8,
            colormap_size: content[offset++],
            origin: [
                content[offset++] | content[offset++] << 8,
                content[offset++] | content[offset++] << 8
            ],
            width: content[offset++] | content[offset++] << 8,
            height: content[offset++] | content[offset++] << 8,
            pixel_size: content[offset++],
            flags: content[offset++]
        };
        // check tga if it is valid format
        tgaCheckHeader(header);
        if (header.id_length + offset > buffer.length) throw new Error('THREE.TGALoader: No data.');
        // skip the needn't data
        offset += header.id_length;
        // get targa information about RLE compression and palette
        let use_rle = false, use_pal = false, use_grey = false;
        switch(header.image_type){
            case TGA_TYPE_RLE_INDEXED:
                use_rle = true;
                use_pal = true;
                break;
            case TGA_TYPE_INDEXED:
                use_pal = true;
                break;
            case TGA_TYPE_RLE_RGB:
                use_rle = true;
                break;
            case TGA_TYPE_RGB:
                break;
            case TGA_TYPE_RLE_GREY:
                use_rle = true;
                use_grey = true;
                break;
            case TGA_TYPE_GREY:
                use_grey = true;
                break;
        }
        //
        const imageData = new Uint8Array(header.width * header.height * 4);
        const result = tgaParse(use_rle, use_pal, header, offset, content);
        getTgaRGBA(imageData, header.width, header.height, result.pixel_data, result.palettes);
        return {
            data: imageData,
            width: header.width,
            height: header.height,
            flipY: true,
            generateMipmaps: true,
            minFilter: (0, _three.LinearMipmapLinearFilter)
        };
    }
}

},{"three":"ktPTu","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6xUSB":[function(require,module,exports,__globalThis) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fyW1M":[function(require,module,exports,__globalThis) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iSl3b":[function(require,module,exports,__globalThis) {
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

},{"three":"ktPTu","../core/MeshBVH.js":"biELs","./utils/WorkerBase.js":"bGfl5","../utils/BufferUtils.js":"gBAF9","./GenerateMeshBVHWorker.js":"3qwBo","../core/build/geometryUtils.js":"ejhro","fcf328a20d6da8f8":"a3V7i","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bGfl5":[function(require,module,exports,__globalThis) {
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

},{"three":"ktPTu","../core/MeshBVH.js":"biELs","./utils/WorkerBase.js":"bGfl5","a30a60cb1342ab0e":"fdDYf","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fdDYf":[function(require,module,exports,__globalThis) {
let workerURL = require("e749081da713e3e0");
let bundleURL = require("f5f696cc5788c7cc");
let url = bundleURL.getBundleURL('bOlxE') + "generateMeshBVH.worker.e1a14054.js";
module.exports = workerURL(url, bundleURL.getOrigin(url), false);

},{"e749081da713e3e0":"cn2gM","f5f696cc5788c7cc":"lgJ39"}],"cn2gM":[function(require,module,exports,__globalThis) {
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

},{}],"a3V7i":[function(require,module,exports,__globalThis) {
let workerURL = require("da62a61870d65f2");
let bundleURL = require("7eb1529063851933");
let url = bundleURL.getBundleURL('bOlxE') + "parallelMeshBVH.worker.fa7afa10.js";
module.exports = workerURL(url, bundleURL.getOrigin(url), false);

},{"da62a61870d65f2":"cn2gM","7eb1529063851933":"lgJ39"}]},["fj5J1"], "fj5J1", "parcelRequire94c2")

//# sourceMappingURL=index.ef8dcd8d.js.map

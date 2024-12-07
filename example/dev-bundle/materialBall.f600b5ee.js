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
})({"claRZ":[function(require,module,exports,__globalThis) {
var _three = require("three");
var _passJs = require("three/examples/jsm/postprocessing/Pass.js");
var _orbitControlsJs = require("three/examples/jsm/controls/OrbitControls.js");
var _indexJs = require("../src/index.js");
var _lilGuiModuleMinJs = require("three/examples/jsm/libs/lil-gui.module.min.js");
var _loaderElementJs = require("./utils/LoaderElement.js");
var _materialOrbSceneLoaderJs = require("./utils/MaterialOrbSceneLoader.js");
var _rectAreaLightUniformsLibJs = require("three/examples/jsm/lights/RectAreaLightUniformsLib.js");
const CREDITS = 'Material orb model courtesy of USD Working Group';
let pathTracer, renderer, controls, denoiseQuad, material;
let camera, scene, loader;
const params = {
    materialProperties: {
        color: '#ffe6bd',
        emissive: '#000000',
        emissiveIntensity: 1,
        roughness: 0,
        metalness: 1,
        ior: 1.495,
        transmission: 0.0,
        thinFilm: false,
        attenuationColor: '#ffffff',
        attenuationDistance: 0.5,
        opacity: 1.0,
        clearcoat: 0.0,
        clearcoatRoughness: 0.0,
        sheenColor: '#000000',
        sheenRoughness: 0.0,
        iridescence: 0.0,
        iridescenceIOR: 1.5,
        iridescenceThickness: 400,
        specularColor: '#ffffff',
        specularIntensity: 1.0,
        matte: false,
        flatShading: false,
        castShadow: true
    },
    multipleImportanceSampling: true,
    denoiseEnabled: true,
    denoiseSigma: 2.5,
    denoiseThreshold: 0.1,
    denoiseKSigma: 1.0,
    bounces: 5,
    renderScale: 1 / window.devicePixelRatio,
    transmissiveBounces: 20,
    filterGlossyFactor: 0.5,
    tiles: 3
};
if (window.location.hash.includes('transmission')) {
    params.materialProperties.metalness = 0.0;
    params.materialProperties.roughness = 0.23;
    params.materialProperties.transmission = 1.0;
    params.materialProperties.color = '#ffffff';
    params.bounces = 10;
    params.tiles = 2;
} else if (window.location.hash.includes('iridescent')) {
    params.materialProperties.color = '#474747';
    params.materialProperties.roughness = 0.25;
    params.materialProperties.metalness = 1.0;
    params.materialProperties.iridescence = 1.0;
    params.materialProperties.iridescenceIOR = 2.2;
} else if (window.location.hash.includes('acrylic')) {
    params.materialProperties.color = '#ffffff';
    params.materialProperties.roughness = 0;
    params.materialProperties.metalness = 0;
    params.materialProperties.transmission = 1.0;
    params.materialProperties.attenuationDistance = 0.75;
    params.materialProperties.attenuationColor = '#2a6dc6';
    params.bounces = 20;
    params.tiles = 3;
}
// adjust performance parameters for mobile
const aspectRatio = window.innerWidth / window.innerHeight;
if (aspectRatio < 0.65) {
    params.bounces = Math.max(params.bounces, 6);
    params.renderScale *= 0.5;
    params.tiles = 2;
    params.multipleImportanceSampling = false;
}
init();
async function init() {
    (0, _rectAreaLightUniformsLibJs.RectAreaLightUniformsLib).init();
    loader = new (0, _loaderElementJs.LoaderElement)();
    loader.attach(document.body);
    // renderer
    renderer = new (0, _three.WebGLRenderer)({
        antialias: true
    });
    renderer.toneMapping = (0, _three.ACESFilmicToneMapping);
    renderer.toneMappingExposure = 0.02;
    document.body.appendChild(renderer.domElement);
    // path tracer
    pathTracer = new (0, _indexJs.WebGLPathTracer)(renderer);
    pathTracer.tiles.set(params.tiles, params.tiles);
    pathTracer.textureSize.set(2048, 2048);
    pathTracer.renderToCanvasCallback = (target, renderer, quad)=>{
        denoiseQuad.material.sigma = params.denoiseSigma;
        denoiseQuad.material.threshold = params.denoiseThreshold;
        denoiseQuad.material.kSigma = params.denoiseKSigma;
        denoiseQuad.material.opacity = quad.material.opacity;
        const autoClear = renderer.autoClear;
        const finalQuad = params.denoiseEnabled ? denoiseQuad : quad;
        renderer.autoClear = false;
        finalQuad.material.map = target.texture;
        finalQuad.render(renderer);
        renderer.autoClear = autoClear;
    };
    // denoiser
    denoiseQuad = new (0, _passJs.FullScreenQuad)(new (0, _indexJs.DenoiseMaterial)({
        map: null,
        blending: (0, _three.CustomBlending),
        premultipliedAlpha: renderer.getContextAttributes().premultipliedAlpha
    }));
    scene = new (0, _three.Scene)();
    window.SCENE = scene;
    // load assets
    const orb = await new (0, _materialOrbSceneLoaderJs.MaterialOrbSceneLoader)().loadAsync();
    // scene initialization
    scene.add(orb.scene);
    camera = orb.camera;
    material = orb.material;
    // move camera to the scene
    scene.attach(camera);
    camera.removeFromParent();
    // controls
    controls = new (0, _orbitControlsJs.OrbitControls)(camera, renderer.domElement);
    controls.addEventListener('change', ()=>pathTracer.updateCamera());
    // shift target
    const fwd = new (0, _three.Vector3)(0, 0, -1).transformDirection(camera.matrixWorld).normalize();
    controls.target.copy(camera.position).addScaledVector(fwd, 25);
    controls.update();
    loader.setPercentage(1);
    loader.setCredits(CREDITS);
    onParamsChange();
    onResize();
    window.addEventListener('resize', onResize);
    // gui
    const gui = new (0, _lilGuiModuleMinJs.GUI)();
    const ptFolder = gui.addFolder('Path Tracer');
    ptFolder.add(params, 'multipleImportanceSampling').onChange(onParamsChange);
    ptFolder.add(params, 'tiles', 1, 4, 1).onChange((value)=>{
        pathTracer.tiles.set(value, value);
    });
    ptFolder.add(params, 'filterGlossyFactor', 0, 1).onChange(onParamsChange);
    ptFolder.add(params, 'bounces', 1, 30, 1).onChange(onParamsChange);
    ptFolder.add(params, 'transmissiveBounces', 0, 40, 1).onChange(onParamsChange);
    ptFolder.add(params, 'renderScale', 0.1, 1).onChange(onParamsChange);
    const denoiseFolder = gui.addFolder('Denoising');
    denoiseFolder.add(params, 'denoiseEnabled');
    denoiseFolder.add(params, 'denoiseSigma', 0.01, 12.0);
    denoiseFolder.add(params, 'denoiseThreshold', 0.01, 1.0);
    denoiseFolder.add(params, 'denoiseKSigma', 0.0, 12.0);
    denoiseFolder.close();
    const matFolder1 = gui.addFolder('Material');
    matFolder1.addColor(params.materialProperties, 'color').onChange(onParamsChange);
    matFolder1.addColor(params.materialProperties, 'emissive').onChange(onParamsChange);
    matFolder1.add(params.materialProperties, 'emissiveIntensity', 0.0, 50.0, 0.01).onChange(onParamsChange);
    matFolder1.add(params.materialProperties, 'roughness', 0, 1).onChange(onParamsChange);
    matFolder1.add(params.materialProperties, 'metalness', 0, 1).onChange(onParamsChange);
    matFolder1.add(params.materialProperties, 'opacity', 0, 1).onChange(onParamsChange);
    matFolder1.add(params.materialProperties, 'transmission', 0, 1).onChange(onParamsChange);
    matFolder1.add(params.materialProperties, 'thinFilm', 0, 1).onChange(onParamsChange);
    matFolder1.add(params.materialProperties, 'attenuationDistance', 0.05, 2.0).onChange(onParamsChange);
    matFolder1.addColor(params.materialProperties, 'attenuationColor').onChange(onParamsChange);
    matFolder1.add(params.materialProperties, 'ior', 0.9, 3.0).onChange(onParamsChange);
    matFolder1.add(params.materialProperties, 'clearcoat', 0, 1).onChange(onParamsChange);
    matFolder1.add(params.materialProperties, 'clearcoatRoughness', 0, 1).onChange(onParamsChange);
    matFolder1.addColor(params.materialProperties, 'sheenColor').onChange(onParamsChange);
    matFolder1.add(params.materialProperties, 'sheenRoughness', 0, 1).onChange(onParamsChange);
    matFolder1.add(params.materialProperties, 'iridescence', 0.0, 1.0).onChange(onParamsChange);
    matFolder1.add(params.materialProperties, 'iridescenceIOR', 0.1, 3.0).onChange(onParamsChange);
    matFolder1.add(params.materialProperties, 'iridescenceThickness', 0.0, 1200.0).onChange(onParamsChange);
    matFolder1.addColor(params.materialProperties, 'specularColor').onChange(onParamsChange);
    matFolder1.add(params.materialProperties, 'specularIntensity', 0.0, 1.0).onChange(onParamsChange);
    matFolder1.add(params.materialProperties, 'matte').onChange(onParamsChange);
    matFolder1.add(params.materialProperties, 'flatShading').onChange(onParamsChange);
    matFolder1.add(params.materialProperties, 'castShadow').onChange(onParamsChange);
    matFolder1.close();
    animate();
}
function onResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    pathTracer.updateCamera();
}
function onParamsChange() {
    const materialProperties = params.materialProperties;
    material.color.set(materialProperties.color);
    material.emissive.set(materialProperties.emissive);
    material.emissiveIntensity = materialProperties.emissiveIntensity;
    material.metalness = materialProperties.metalness;
    material.roughness = materialProperties.roughness;
    material.transmission = materialProperties.transmission;
    material.attenuationDistance = materialProperties.thinFilm ? Infinity : materialProperties.attenuationDistance;
    material.attenuationColor.set(materialProperties.attenuationColor);
    material.ior = materialProperties.ior;
    material.opacity = materialProperties.opacity;
    material.clearcoat = materialProperties.clearcoat;
    material.clearcoatRoughness = materialProperties.clearcoatRoughness;
    material.sheenColor.set(materialProperties.sheenColor);
    material.sheenRoughness = materialProperties.sheenRoughness;
    material.iridescence = materialProperties.iridescence;
    material.iridescenceIOR = materialProperties.iridescenceIOR;
    material.iridescenceThicknessRange = [
        0,
        materialProperties.iridescenceThickness
    ];
    material.specularColor.set(materialProperties.specularColor);
    material.specularIntensity = materialProperties.specularIntensity;
    material.transparent = material.opacity < 1;
    material.flatShading = materialProperties.flatShading;
    pathTracer.transmissiveBounces = params.transmissiveBounces;
    pathTracer.multipleImportanceSampling = params.multipleImportanceSampling;
    pathTracer.filterGlossyFactor = params.filterGlossyFactor;
    pathTracer.bounces = params.bounces;
    pathTracer.renderScale = params.renderScale;
    // note: custom properties
    material.matte = materialProperties.matte;
    material.castShadow = materialProperties.castShadow;
    pathTracer.updateMaterials();
    pathTracer.setScene(scene, camera);
}
function animate() {
    requestAnimationFrame(animate);
    pathTracer.renderSample();
    loader.setSamples(pathTracer.samples, pathTracer.isCompiling);
}

},{"three":"ktPTu","three/examples/jsm/postprocessing/Pass.js":"i2IfB","three/examples/jsm/controls/OrbitControls.js":"7mqRv","../src/index.js":"8lqZg","three/examples/jsm/libs/lil-gui.module.min.js":"dUXFx","./utils/LoaderElement.js":"h1Zxa","./utils/MaterialOrbSceneLoader.js":"cJAJ1","three/examples/jsm/lights/RectAreaLightUniformsLib.js":"kWNzB"}],"h1Zxa":[function(require,module,exports,__globalThis) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["claRZ"], "claRZ", "parcelRequire94c2")

//# sourceMappingURL=materialBall.f600b5ee.js.map

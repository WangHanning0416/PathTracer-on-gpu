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
})({"6OSnB":[function(require,module,exports,__globalThis) {
var _three = require("three");
var _orbitControlsJs = require("three/examples/jsm/controls/OrbitControls.js");
var _indexJs = require("../src/index.js");
var _lilGuiModuleMinJs = require("three/examples/jsm/libs/lil-gui.module.min.js");
var _loaderElementJs = require("./utils/LoaderElement.js");
var _getScaledSettingsJs = require("./utils/getScaledSettings.js");
var _materialOrbSceneLoaderJs = require("./utils/MaterialOrbSceneLoader.js");
var _rectAreaLightUniformsLibJs = require("three/examples/jsm/lights/RectAreaLightUniformsLib.js");
const DB_URL = 'https://api.physicallybased.info/materials';
const CREDITS = 'Materials courtesy of "physicallybased.info"</br>Material orb model courtesy of USD Working Group';
let pathTracer, renderer, controls, material;
let camera, database, scene;
let loader, imgEl;
const params = {
    material: null,
    tiles: 2,
    bounces: 5,
    multipleImportanceSampling: true,
    renderScale: 1 / window.devicePixelRatio,
    ...(0, _getScaledSettingsJs.getScaledSettings)()
};
init();
async function init() {
    (0, _rectAreaLightUniformsLibJs.RectAreaLightUniformsLib).init();
    loader = new (0, _loaderElementJs.LoaderElement)();
    loader.attach(document.body);
    imgEl = document.getElementById('materialImage');
    // renderer
    renderer = new (0, _three.WebGLRenderer)({
        antialias: true
    });
    renderer.toneMapping = (0, _three.AgXToneMapping);
    renderer.toneMappingExposure = 0.02;
    document.body.appendChild(renderer.domElement);
    // path tracer
    pathTracer = new (0, _indexJs.WebGLPathTracer)(renderer);
    pathTracer.multipleImportanceSampling = params.multipleImportanceSampling;
    pathTracer.tiles.set(params.tiles, params.tiles);
    pathTracer.textureSize.set(2048, 2048);
    pathTracer.filterGlossyFactor = 0.5;
    // scene
    scene = new (0, _three.Scene)();
    // load assets
    const [orb, dbJson] = await Promise.all([
        new (0, _materialOrbSceneLoaderJs.MaterialOrbSceneLoader)().loadAsync(),
        fetch(DB_URL).then((res)=>res.json())
    ]);
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
    // database set up
    database = {};
    dbJson.forEach((mat)=>database[mat.name] = mat);
    params.material = Object.keys(database)[0];
    // initialize scene
    pathTracer.setScene(scene, camera);
    loader.setPercentage(1);
    loader.setCredits(CREDITS);
    onParamsChange();
    onResize();
    window.addEventListener('resize', onResize);
    // gui
    const gui = new (0, _lilGuiModuleMinJs.GUI)();
    gui.add(params, 'material', Object.keys(database)).onChange(onParamsChange);
    const ptFolder = gui.addFolder('Path Tracing');
    ptFolder.add(params, 'multipleImportanceSampling').onChange(onParamsChange);
    ptFolder.add(params, 'tiles', 1, 4, 1).onChange((value)=>{
        pathTracer.tiles.set(value, value);
    });
    ptFolder.add(params, 'bounces', 1, 30, 1).onChange(onParamsChange);
    ptFolder.add(params, 'renderScale', 0.1, 1).onChange(onParamsChange);
    animate();
}
function onResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    pathTracer.updateCamera();
}
function applyMaterialInfo(info, material) {
    // defaults
    material.color.set(0xffffff);
    material.transmission = 0.0;
    material.attenuationDistance = Infinity;
    material.attenuationColor.set(0xffffff);
    material.specularColor.set(0xffffff);
    material.metalness = 0.0;
    material.roughness = 1.0;
    material.ior = 1.5;
    material.thickness = 1.0;
    material.iridescence = 0.0;
    material.iridescenceIOR = 1.0;
    material.iridescenceThicknessRange = [
        0,
        0
    ];
    // apply database values
    if (info.specularColor) material.specularColor.setRGB(...info.specularColor);
    if ('metalness' in info) material.metalness = info.metalness;
    if ('roughness' in info) material.roughness = info.roughness;
    if ('ior' in info) material.ior = info.ior;
    if ('transmission' in info) material.transmission = info.transmission;
    if ('thinFilmThickness' in info) {
        material.iridescence = 1.0;
        material.iridescenceIOR = info.thinFilmIor;
        material.iridescenceThicknessRange = [
            info.thinFilmThickness,
            info.thinFilmThickness
        ];
    }
    if (material.transmission) {
        if (info.color) material.attenuationColor.setRGB(...info.color);
        // Blender uses 1 / density when exporting volume transmission which doesn't look
        // exactly right. But because the scene is 1000x in size we multiply by 1000 here.
        material.attenuationDistance = 1000 / info.density;
    } else if (info.color) material.color.setRGB(...info.color);
    imgEl.src = info.reference[0];
}
function onParamsChange() {
    applyMaterialInfo(database[params.material], material);
    pathTracer.multipleImportanceSampling = params.multipleImportanceSampling;
    pathTracer.renderScale = params.renderScale;
    pathTracer.bounces = params.bounces;
    pathTracer.updateMaterials();
}
function animate() {
    requestAnimationFrame(animate);
    pathTracer.renderSample();
    loader.setSamples(pathTracer.samples, pathTracer.isCompiling);
}

},{"three":"ktPTu","three/examples/jsm/controls/OrbitControls.js":"7mqRv","../src/index.js":"8lqZg","three/examples/jsm/libs/lil-gui.module.min.js":"dUXFx","./utils/LoaderElement.js":"h1Zxa","./utils/getScaledSettings.js":"lfwhv","./utils/MaterialOrbSceneLoader.js":"cJAJ1","three/examples/jsm/lights/RectAreaLightUniformsLib.js":"kWNzB"}],"h1Zxa":[function(require,module,exports,__globalThis) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lfwhv":[function(require,module,exports,__globalThis) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["6OSnB"], "6OSnB", "parcelRequire94c2")

//# sourceMappingURL=materialDatabase.6b25a3d9.js.map

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
})({"jKoNW":[function(require,module,exports,__globalThis) {
var _three = require("three");
var _orbitControlsJs = require("three/examples/jsm/controls/OrbitControls.js");
var _indexJs = require("../src/index.js");
var _lilGuiModuleMinJs = require("three/examples/jsm/libs/lil-gui.module.min.js");
var _getScaledSettingsJs = require("./utils/getScaledSettings.js");
var _loaderElementJs = require("./utils/LoaderElement.js");
let pathTracer, renderer, controls;
let camera, scene, fogMaterial, spotLight;
let loader;
const params = {
    multipleImportanceSampling: true,
    tiles: 2,
    renderScale: 1 / window.devicePixelRatio,
    color: '#eeeeee',
    fog: true,
    density: 0.01,
    lightIntensity: 500,
    lightColor: '#ffffff',
    bounces: 10,
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
    // camera
    const aspect = window.innerWidth / window.innerHeight;
    camera = new (0, _indexJs.PhysicalCamera)(75, aspect, 0.025, 500);
    camera.position.set(0, 1, 6);
    // controls
    controls = new (0, _orbitControlsJs.OrbitControls)(camera, renderer.domElement);
    controls.addEventListener('change', ()=>{
        pathTracer.updateCamera();
    });
    // scene
    scene = new (0, _three.Scene)();
    scene.background = new (0, _three.Color)(0);
    fogMaterial = new (0, _indexJs.FogVolumeMaterial)();
    const material = new (0, _three.MeshStandardMaterial)({
        color: 0x999999,
        roughness: 1,
        metalness: 0
    });
    const fogMesh = new (0, _three.Mesh)(new (0, _three.BoxGeometry)(8, 4.05, 8), fogMaterial);
    const floor = new (0, _three.Mesh)(new (0, _three.CylinderGeometry)(5, 5, 0.1, 40), material);
    floor.position.y = -1.1;
    // prepare light
    spotLight = new (0, _indexJs.PhysicalSpotLight)();
    spotLight.position.set(0, 1, 0).multiplyScalar(3);
    spotLight.angle = Math.PI / 4.5;
    spotLight.decay = 2;
    spotLight.penumbra = 0.15;
    spotLight.distance = 0.0;
    spotLight.intensity = 50.0;
    spotLight.radius = 0.05;
    // prepare slats
    const group = new (0, _three.Group)();
    group.add(spotLight);
    const TOTAL_SLATS = 10;
    const WIDTH = 2.0;
    const slat = new (0, _three.Mesh)(new (0, _three.BoxGeometry)(0.1, 0.1, 2), material);
    for(let i = 0; i < TOTAL_SLATS; i++){
        const s = slat.clone();
        s.position.x = -WIDTH * 0.5 + WIDTH * i / (TOTAL_SLATS - 1);
        s.position.y = 2;
        group.add(s);
    }
    scene.add(fogMesh, floor, group);
    pathTracer.setScene(scene, camera);
    loader.setPercentage(1);
    onParamsChange();
    onResize();
    window.addEventListener('resize', onResize);
    // gui
    const gui = new (0, _lilGuiModuleMinJs.GUI)();
    const ptFolder = gui.addFolder('Path Tracer');
    ptFolder.add(params, 'bounces', 1, 20, 1).onChange(onParamsChange);
    ptFolder.add(params, 'multipleImportanceSampling').onChange(onParamsChange);
    ptFolder.add(params, 'tiles', 1, 4, 1).onChange((value)=>{
        pathTracer.tiles.set(value, value);
    });
    ptFolder.add(params, 'renderScale', 0.1, 1).onChange(onParamsChange);
    const fogFolder = gui.addFolder('Fog');
    fogFolder.addColor(params, 'color').onChange(onParamsChange);
    fogFolder.add(params, 'density', 0, 1).onChange(onParamsChange);
    const lightFolder = gui.addFolder('Spot Light');
    lightFolder.add(params, 'lightIntensity', 0, 1000).onChange(onParamsChange);
    lightFolder.addColor(params, 'lightColor').onChange(onParamsChange);
    animate();
}
function onParamsChange() {
    fogMaterial.color.set(params.color).convertSRGBToLinear();
    fogMaterial.density = params.density;
    spotLight.intensity = params.lightIntensity;
    spotLight.color.set(params.lightColor);
    pathTracer.multipleImportanceSampling = params.multipleImportanceSampling;
    pathTracer.bounces = params.bounces;
    pathTracer.renderScale = params.renderScale;
    pathTracer.updateLights();
    pathTracer.updateMaterials();
}
function onResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    pathTracer.updateCamera();
}
function animate() {
    requestAnimationFrame(animate);
    pathTracer.renderSample();
    loader.setSamples(pathTracer.samples, pathTracer.isCompiling);
}

},{"three":"ktPTu","three/examples/jsm/controls/OrbitControls.js":"7mqRv","../src/index.js":"8lqZg","three/examples/jsm/libs/lil-gui.module.min.js":"dUXFx","./utils/getScaledSettings.js":"lfwhv","./utils/LoaderElement.js":"h1Zxa"}],"lfwhv":[function(require,module,exports,__globalThis) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["jKoNW"], "jKoNW", "parcelRequire94c2")

//# sourceMappingURL=fog.f93bc75d.js.map

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
})({"5sRMS":[function(require,module,exports,__globalThis) {
var _three = require("three");
var _ = require("..");
var _getScaledSettingsJs = require("./utils/getScaledSettings.js");
// init scene, renderer, camera, controls, etc
const scene = new (0, _three.Scene)();
const sphereGeom = new (0, _three.SphereGeometry)(0.49, 64, 32);
const ball1 = new (0, _three.Mesh)(sphereGeom, new (0, _three.MeshStandardMaterial)({
    color: '#e91e63',
    roughness: 0.25,
    metalness: 1
}));
const ball2 = new (0, _three.Mesh)(sphereGeom, new (0, _three.MeshStandardMaterial)({
    color: '#ff9800',
    roughness: 0.1,
    metalness: 1
}));
const ball3 = new (0, _three.Mesh)(sphereGeom, new (0, _three.MeshStandardMaterial)({
    color: '#2196f3',
    roughness: 0.2,
    metalness: 1
}));
const ground = new (0, _three.Mesh)(new (0, _three.BoxGeometry)(3.5, 0.1, 1.5), new (0, _three.MeshStandardMaterial)());
ball1.position.x = -1;
ball3.position.x = 1;
ground.position.y = -0.54;
scene.add(ball1, ball2, ball3, ground);
// set the environment map
const texture = new (0, _.GradientEquirectTexture)();
texture.bottomColor.set(0xffffff);
texture.bottomColor.set(0x666666);
texture.update();
scene.environment = texture;
scene.background = texture;
const camera = new (0, _three.PerspectiveCamera)();
camera.position.set(0, 1, -5);
camera.lookAt(0, 0, 0);
const renderer = new (0, _three.WebGLRenderer)({
    antialias: true
});
renderer.toneMapping = (0, _three.ACESFilmicToneMapping);
document.body.appendChild(renderer.domElement);
const settings = (0, _getScaledSettingsJs.getScaledSettings)();
const pathTracer = new (0, _.WebGLPathTracer)(renderer);
pathTracer.renderScale = settings.renderScale;
pathTracer.tiles.setScalar(settings.tiles);
pathTracer.setScene(scene, camera);
onResize();
animate();
window.addEventListener('resize', onResize);
function animate() {
    // if the camera position changes call "ptRenderer.reset()"
    requestAnimationFrame(animate);
    // update the camera and render one sample
    pathTracer.renderSample();
}
function onResize() {
    // update rendering resolution
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w, h);
    renderer.setPixelRatio(window.devicePixelRatio);
    const aspect = w / h;
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
    pathTracer.setScene(scene, camera);
}

},{"three":"ktPTu","..":"8lqZg","./utils/getScaledSettings.js":"lfwhv"}],"lfwhv":[function(require,module,exports,__globalThis) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["5sRMS"], "5sRMS", "parcelRequire94c2")

//# sourceMappingURL=primitives.81fd17a7.js.map

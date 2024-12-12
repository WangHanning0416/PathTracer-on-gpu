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
})({"8lqZg":[function(require,module,exports,__globalThis) {
// core
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _pathTracingSceneGeneratorJs = require("./core/PathTracingSceneGenerator.js");
parcelHelpers.exportAll(_pathTracingSceneGeneratorJs, exports);
var _webGLPathTracerJs = require("./core/WebGLPathTracer.js");
parcelHelpers.exportAll(_webGLPathTracerJs, exports);
// objects
var _physicalCameraJs = require("./objects/PhysicalCamera.js");
parcelHelpers.exportAll(_physicalCameraJs, exports);
var _equirectCameraJs = require("./objects/EquirectCamera.js");
parcelHelpers.exportAll(_equirectCameraJs, exports);
var _physicalSpotLightJs = require("./objects/PhysicalSpotLight.js");
parcelHelpers.exportAll(_physicalSpotLightJs, exports);
var _shapedAreaLightJs = require("./objects/ShapedAreaLight.js");
parcelHelpers.exportAll(_shapedAreaLightJs, exports);
// textures
var _proceduralEquirectTextureJs = require("./textures/ProceduralEquirectTexture.js");
parcelHelpers.exportAll(_proceduralEquirectTextureJs, exports);
var _gradientEquirectTextureJs = require("./textures/GradientEquirectTexture.js");
parcelHelpers.exportAll(_gradientEquirectTextureJs, exports);
// utils
var _blurredEnvMapGeneratorJs = require("./utils/BlurredEnvMapGenerator.js");
parcelHelpers.exportAll(_blurredEnvMapGeneratorJs, exports);
// materials
var _denoiseMaterialJs = require("./materials/fullscreen/DenoiseMaterial.js");
parcelHelpers.exportAll(_denoiseMaterialJs, exports);
var _fogVolumeMaterialJs = require("./materials/surface/FogVolumeMaterial.js");
parcelHelpers.exportAll(_fogVolumeMaterialJs, exports);
// deprecated
var _physicalPathTracingMaterialJs = require("./materials/pathtracing/PhysicalPathTracingMaterial.js");
parcelHelpers.exportAll(_physicalPathTracingMaterialJs, exports);
var _pathTracingRendererJs = require("./core/PathTracingRenderer.js");
parcelHelpers.exportAll(_pathTracingRendererJs, exports);

},{"./core/PathTracingSceneGenerator.js":"ul5NI","./core/WebGLPathTracer.js":"f6mRb","./objects/PhysicalCamera.js":"gtiba","./objects/EquirectCamera.js":"drTJS","./objects/PhysicalSpotLight.js":"jWRcx","./objects/ShapedAreaLight.js":"aNBRO","./textures/ProceduralEquirectTexture.js":"i2WMa","./textures/GradientEquirectTexture.js":"1CzbI","./utils/BlurredEnvMapGenerator.js":"9Da5R","./materials/fullscreen/DenoiseMaterial.js":"8E6PE","./materials/surface/FogVolumeMaterial.js":"a7Hf2","./materials/pathtracing/PhysicalPathTracingMaterial.js":"2zJa6","./core/PathTracingRenderer.js":"3DJJZ","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"f6mRb":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "WebGLPathTracer", ()=>WebGLPathTracer);
var _three = require("three");
var _pathTracingSceneGeneratorJs = require("./PathTracingSceneGenerator.js");
var _pathTracingRendererJs = require("./PathTracingRenderer.js");
var _passJs = require("three/examples/jsm/postprocessing/Pass.js");
var _gradientEquirectTextureJs = require("../textures/GradientEquirectTexture.js");
var _sceneUpdateUtilsJs = require("./utils/sceneUpdateUtils.js");
var _clampedInterpolationMaterialJs = require("../materials/fullscreen/ClampedInterpolationMaterial.js");
var _cubeToEquirectGeneratorJs = require("../utils/CubeToEquirectGenerator.js");
function supportsFloatBlending(renderer) {
    return renderer.extensions.get('EXT_float_blend');
}
const _resolution = new (0, _three.Vector2)();
class WebGLPathTracer {
    get multipleImportanceSampling() {
        return Boolean(this._pathTracer.material.defines.FEATURE_MIS);
    }
    set multipleImportanceSampling(v) {
        this._pathTracer.material.setDefine('FEATURE_MIS', v ? 1 : 0);
    }
    get transmissiveBounces() {
        return this._pathTracer.material.transmissiveBounces;
    }
    set transmissiveBounces(v) {
        this._pathTracer.material.transmissiveBounces = v;
    }
    get bounces() {
        return this._pathTracer.material.bounces;
    }
    set bounces(v) {
        this._pathTracer.material.bounces = v;
    }
    get filterGlossyFactor() {
        return this._pathTracer.material.filterGlossyFactor;
    }
    set filterGlossyFactor(v) {
        this._pathTracer.material.filterGlossyFactor = v;
    }
    get samples() {
        return this._pathTracer.samples;
    }
    get target() {
        return this._pathTracer.target;
    }
    get tiles() {
        return this._pathTracer.tiles;
    }
    get stableNoise() {
        return this._pathTracer.stableNoise;
    }
    set stableNoise(v) {
        this._pathTracer.stableNoise = v;
    }
    get isCompiling() {
        return Boolean(this._pathTracer.isCompiling);
    }
    constructor(renderer){
        // members
        this._renderer = renderer;
        this._generator = new (0, _pathTracingSceneGeneratorJs.PathTracingSceneGenerator)();
        this._pathTracer = new (0, _pathTracingRendererJs.PathTracingRenderer)(renderer);
        this._queueReset = false;
        this._clock = new (0, _three.Clock)();
        this._compilePromise = null;
        this._lowResPathTracer = new (0, _pathTracingRendererJs.PathTracingRenderer)(renderer);
        this._lowResPathTracer.tiles.set(1, 1);
        this._quad = new (0, _passJs.FullScreenQuad)(new (0, _clampedInterpolationMaterialJs.ClampedInterpolationMaterial)({
            map: null,
            transparent: true,
            blending: (0, _three.NoBlending),
            premultipliedAlpha: renderer.getContextAttributes().premultipliedAlpha
        }));
        this._materials = null;
        this._previousEnvironment = null;
        this._previousBackground = null;
        this._internalBackground = null;
        // options
        this.renderDelay = 100;
        this.minSamples = 5;
        this.fadeDuration = 500;
        this.enablePathTracing = true;
        this.pausePathTracing = false;
        this.dynamicLowRes = false;
        this.lowResScale = 0.25;
        this.renderScale = 1;
        this.synchronizeRenderSize = true;
        this.rasterizeScene = true;
        this.renderToCanvas = true;
        this.textureSize = new (0, _three.Vector2)(1024, 1024);
        this.rasterizeSceneCallback = (scene, camera)=>{
            this._renderer.render(scene, camera);
        };
        this.renderToCanvasCallback = (target, renderer, quad)=>{
            const currentAutoClear = renderer.autoClear;
            renderer.autoClear = false;
            quad.render(renderer);
            renderer.autoClear = currentAutoClear;
        };
        // initialize the scene so it doesn't fail
        this.setScene(new (0, _three.Scene)(), new (0, _three.PerspectiveCamera)());
    }
    setBVHWorker(worker) {
        this._generator.setBVHWorker(worker);
    }
    setScene(scene, camera, options = {}) {
        scene.updateMatrixWorld(true);
        camera.updateMatrixWorld();
        const generator = this._generator;
        generator.setObjects(scene);
        if (this._buildAsync) return generator.generateAsync(options.onProgress).then((result)=>{
            return this._updateFromResults(scene, camera, result);
        });
        else {
            const result = generator.generate();
            return this._updateFromResults(scene, camera, result);
        }
    }
    setSceneAsync(...args) {
        this._buildAsync = true;
        const result = this.setScene(...args);
        this._buildAsync = false;
        return result;
    }
    setCamera(camera) {
        this.camera = camera;
        this.updateCamera();
    }
    updateCamera() {
        const camera = this.camera;
        camera.updateMatrixWorld();
        this._pathTracer.setCamera(camera);
        this._lowResPathTracer.setCamera(camera);
        this.reset();
    }
    updateMaterials() {
        const material = this._pathTracer.material;
        const renderer = this._renderer;
        const materials = this._materials;
        const textureSize = this.textureSize;
        // reduce texture sources here - we don't want to do this in the
        // textures array because we need to pass the textures array into the
        // material target
        const textures = (0, _sceneUpdateUtilsJs.getTextures)(materials);
        material.textures.setTextures(renderer, textures, textureSize.x, textureSize.y);
        material.materials.updateFrom(materials, textures);
        this.reset();
    }
    updateLights() {
        const scene = this.scene;
        const renderer = this._renderer;
        const material = this._pathTracer.material;
        const lights = (0, _sceneUpdateUtilsJs.getLights)(scene);
        const iesTextures = (0, _sceneUpdateUtilsJs.getIesTextures)(lights);
        material.lights.updateFrom(lights, iesTextures);
        material.iesProfiles.setTextures(renderer, iesTextures);
        this.reset();
    }
    updateEnvironment() {
        const scene = this.scene;
        const material = this._pathTracer.material;
        if (this._internalBackground) {
            this._internalBackground.dispose();
            this._internalBackground = null;
        }
        // update scene background
        material.backgroundBlur = scene.backgroundBlurriness;
        material.backgroundIntensity = scene.backgroundIntensity ?? 1;
        material.backgroundRotation.makeRotationFromEuler(scene.backgroundRotation).invert();
        if (scene.background === null) {
            material.backgroundMap = null;
            material.backgroundAlpha = 0;
        } else if (scene.background.isColor) {
            this._colorBackground = this._colorBackground || new (0, _gradientEquirectTextureJs.GradientEquirectTexture)(16);
            const colorBackground = this._colorBackground;
            if (!colorBackground.topColor.equals(scene.background)) {
                // set the texture color
                colorBackground.topColor.set(scene.background);
                colorBackground.bottomColor.set(scene.background);
                colorBackground.update();
            }
            // assign to material
            material.backgroundMap = colorBackground;
            material.backgroundAlpha = 1;
        } else if (scene.background.isCubeTexture) {
            if (scene.background !== this._previousBackground) {
                const background = new (0, _cubeToEquirectGeneratorJs.CubeToEquirectGenerator)(this._renderer).generate(scene.background);
                this._internalBackground = background;
                material.backgroundMap = background;
                material.backgroundAlpha = 1;
            }
        } else {
            material.backgroundMap = scene.background;
            material.backgroundAlpha = 1;
        }
        // update scene environment
        material.environmentIntensity = scene.environment !== null ? scene.environmentIntensity ?? 1 : 0;
        material.environmentRotation.makeRotationFromEuler(scene.environmentRotation).invert();
        if (this._previousEnvironment !== scene.environment) {
            if (scene.environment !== null) {
                if (scene.environment.isCubeTexture) {
                    const environment = new (0, _cubeToEquirectGeneratorJs.CubeToEquirectGenerator)(this._renderer).generate(scene.environment);
                    material.envMapInfo.updateFrom(environment);
                } else // TODO: Consider setting this to the highest supported bit depth by checking for
                // OES_texture_float_linear or OES_texture_half_float_linear. Requires changes to
                // the equirect uniform
                material.envMapInfo.updateFrom(scene.environment);
            }
        }
        this._previousEnvironment = scene.environment;
        this._previousBackground = scene.background;
        this.reset();
    }
    _updateFromResults(scene, camera, results) {
        const { materials, geometry, bvh, bvhChanged, needsMaterialIndexUpdate } = results;
        this._materials = materials;
        const pathTracer = this._pathTracer;
        const material = pathTracer.material;
        if (bvhChanged) {
            material.bvh.updateFrom(bvh);
            material.attributesArray.updateFrom(geometry.attributes.normal, geometry.attributes.tangent, geometry.attributes.uv, geometry.attributes.color);
        }
        if (needsMaterialIndexUpdate) material.materialIndexAttribute.updateFrom(geometry.attributes.materialIndex);
        // save previously used items
        this._previousScene = scene;
        this.scene = scene;
        this.camera = camera;
        this.updateCamera();
        this.updateMaterials();
        this.updateEnvironment();
        this.updateLights();
        return results;
    }
    renderSample() {
        const lowResPathTracer = this._lowResPathTracer;
        const pathTracer = this._pathTracer;
        const renderer = this._renderer;
        const clock = this._clock;
        const quad = this._quad;
        this._updateScale();
        if (this._queueReset) {
            pathTracer.reset();
            lowResPathTracer.reset();
            this._queueReset = false;
            quad.material.opacity = 0;
            clock.start();
        }
        // render the path tracing sample after enough time has passed
        const delta = clock.getDelta() * 1e3;
        const elapsedTime = clock.getElapsedTime() * 1e3;
        if (!this.pausePathTracing && this.enablePathTracing && this.renderDelay <= elapsedTime && !this.isCompiling) pathTracer.update();
        // when alpha is enabled we use a manual blending system rather than
        // rendering with a blend function
        pathTracer.alpha = pathTracer.material.backgroundAlpha !== 1 || !supportsFloatBlending(renderer);
        lowResPathTracer.alpha = pathTracer.alpha;
        if (this.renderToCanvas) {
            const renderer = this._renderer;
            const minSamples = this.minSamples;
            if (elapsedTime >= this.renderDelay && this.samples >= this.minSamples) {
                if (this.fadeDuration !== 0) quad.material.opacity = Math.min(quad.material.opacity + delta / this.fadeDuration, 1);
                else quad.material.opacity = 1;
            }
            // render the fallback if we haven't rendered enough samples, are paused, or are occluded
            if (!this.enablePathTracing || this.samples < minSamples || quad.material.opacity < 1) {
                if (this.dynamicLowRes && !this.isCompiling) {
                    if (lowResPathTracer.samples < 1) {
                        lowResPathTracer.material = pathTracer.material;
                        lowResPathTracer.update();
                    }
                    const currentOpacity = quad.material.opacity;
                    quad.material.opacity = 1 - quad.material.opacity;
                    quad.material.map = lowResPathTracer.target.texture;
                    quad.render(renderer);
                    quad.material.opacity = currentOpacity;
                }
                if (!this.dynamicLowRes && this.rasterizeScene || this.dynamicLowRes && this.isCompiling) this.rasterizeSceneCallback(this.scene, this.camera);
            }
            if (this.enablePathTracing && quad.material.opacity > 0) {
                if (quad.material.opacity < 1) // use additive blending when the low res texture is rendered so we can fade the
                // background out while the full res fades in
                quad.material.blending = this.dynamicLowRes ? (0, _three.AdditiveBlending) : (0, _three.NormalBlending);
                quad.material.map = pathTracer.target.texture;
                this.renderToCanvasCallback(pathTracer.target, renderer, quad);
                quad.material.blending = (0, _three.NoBlending);
            }
        }
    }
    reset() {
        this._queueReset = true;
        this._pathTracer.samples = 0;
    }
    dispose() {
        this._quad.dispose();
        this._quad.material.dispose();
        this._pathTracer.dispose();
    }
    _updateScale() {
        // update the path tracer scale if it has changed
        if (this.synchronizeRenderSize) {
            this._renderer.getDrawingBufferSize(_resolution);
            const w = Math.floor(this.renderScale * _resolution.x);
            const h = Math.floor(this.renderScale * _resolution.y);
            this._pathTracer.getSize(_resolution);
            if (_resolution.x !== w || _resolution.y !== h) {
                const lowResScale = this.lowResScale;
                this._pathTracer.setSize(w, h);
                this._lowResPathTracer.setSize(Math.floor(w * lowResScale), Math.floor(h * lowResScale));
            }
        }
    }
}

},{"three":"ktPTu","./PathTracingSceneGenerator.js":"ul5NI","./PathTracingRenderer.js":"3DJJZ","three/examples/jsm/postprocessing/Pass.js":"i2IfB","../textures/GradientEquirectTexture.js":"1CzbI","./utils/sceneUpdateUtils.js":"cC7mP","../materials/fullscreen/ClampedInterpolationMaterial.js":"l9Mxp","../utils/CubeToEquirectGenerator.js":"knSnR","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3DJJZ":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "PathTracingRenderer", ()=>PathTracingRenderer);
var _three = require("three");
var _passJs = require("three/examples/jsm/postprocessing/Pass.js");
var _blendMaterialJs = require("../materials/fullscreen/BlendMaterial.js");
var _sobolNumberMapGeneratorJs = require("../utils/SobolNumberMapGenerator.js");
var _physicalPathTracingMaterialJs = require("../materials/pathtracing/PhysicalPathTracingMaterial.js");
function* renderTask() {
    const { _renderer, _fsQuad, _blendQuad, _primaryTarget, _blendTargets, _sobolTarget, _subframe, alpha, material } = this;
    const _ogScissor = new (0, _three.Vector4)();
    const _ogViewport = new (0, _three.Vector4)();
    const blendMaterial = _blendQuad.material;
    let [blendTarget1, blendTarget2] = _blendTargets;
    while(true){
        if (alpha) {
            blendMaterial.opacity = this._opacityFactor / (this.samples + 1);
            material.blending = (0, _three.NoBlending);
            material.opacity = 1;
        } else {
            material.opacity = this._opacityFactor / (this.samples + 1);
            material.blending = (0, _three.NormalBlending);
        }
        const [subX, subY, subW, subH] = _subframe;
        const w = _primaryTarget.width;
        const h = _primaryTarget.height;
        material.resolution.set(w * subW, h * subH);
        material.sobolTexture = _sobolTarget.texture;
        material.stratifiedTexture.init(20, material.bounces + material.transmissiveBounces + 5);
        material.stratifiedTexture.next();
        material.seed++;
        const tilesX = this.tiles.x || 1;
        const tilesY = this.tiles.y || 1;
        const totalTiles = tilesX * tilesY;
        const pxSubW = Math.ceil(w * subW);
        const pxSubH = Math.ceil(h * subH);
        const pxSubX = Math.floor(subX * w);
        const pxSubY = Math.floor(subY * h);
        const pxTileW = Math.ceil(pxSubW / tilesX);
        const pxTileH = Math.ceil(pxSubH / tilesY);
        for(let y = 0; y < tilesY; y++)for(let x = 0; x < tilesX; x++){
            // store og state
            const ogRenderTarget = _renderer.getRenderTarget();
            const ogAutoClear = _renderer.autoClear;
            const ogScissorTest = _renderer.getScissorTest();
            _renderer.getScissor(_ogScissor);
            _renderer.getViewport(_ogViewport);
            let tx = x;
            let ty = y;
            if (!this.stableTiles) {
                const tileIndex = this._currentTile % (tilesX * tilesY);
                tx = tileIndex % tilesX;
                ty = ~~(tileIndex / tilesX);
                this._currentTile = tileIndex + 1;
            }
            // set the scissor and the viewport on the render target
            // note that when using the webgl renderer set viewport the device pixel ratio
            // is multiplied into the field causing some pixels to not be rendered
            const reverseTy = tilesY - ty - 1;
            _primaryTarget.scissor.set(pxSubX + tx * pxTileW, pxSubY + reverseTy * pxTileH, Math.min(pxTileW, pxSubW - tx * pxTileW), Math.min(pxTileH, pxSubH - reverseTy * pxTileH));
            _primaryTarget.viewport.set(pxSubX, pxSubY, pxSubW, pxSubH);
            // three.js renderer takes values relative to the current pixel ratio
            _renderer.setRenderTarget(_primaryTarget);
            _renderer.setScissorTest(true);
            _renderer.autoClear = false;
            _fsQuad.render(_renderer);
            // reset original renderer state
            _renderer.setViewport(_ogViewport);
            _renderer.setScissor(_ogScissor);
            _renderer.setScissorTest(ogScissorTest);
            _renderer.setRenderTarget(ogRenderTarget);
            _renderer.autoClear = ogAutoClear;
            // swap and blend alpha targets
            if (alpha) {
                blendMaterial.target1 = blendTarget1.texture;
                blendMaterial.target2 = _primaryTarget.texture;
                _renderer.setRenderTarget(blendTarget2);
                _blendQuad.render(_renderer);
                _renderer.setRenderTarget(ogRenderTarget);
            }
            this.samples += 1 / totalTiles;
            // round the samples value if we've finished the tiles
            if (x === tilesX - 1 && y === tilesY - 1) this.samples = Math.round(this.samples);
            yield;
        }
        [blendTarget1, blendTarget2] = [
            blendTarget2,
            blendTarget1
        ];
    }
}
const ogClearColor = new (0, _three.Color)();
class PathTracingRenderer {
    get material() {
        return this._fsQuad.material;
    }
    set material(v) {
        this._fsQuad.material.removeEventListener('recompilation', this._compileFunction);
        v.addEventListener('recompilation', this._compileFunction);
        this._fsQuad.material = v;
    }
    get target() {
        return this._alpha ? this._blendTargets[1] : this._primaryTarget;
    }
    set alpha(v) {
        if (this._alpha === v) return;
        if (!v) {
            this._blendTargets[0].dispose();
            this._blendTargets[1].dispose();
        }
        this._alpha = v;
        this.reset();
    }
    get alpha() {
        return this._alpha;
    }
    get isCompiling() {
        return Boolean(this._compilePromise);
    }
    constructor(renderer){
        this.camera = null;
        this.tiles = new (0, _three.Vector2)(3, 3);
        this.stableNoise = false;
        this.stableTiles = true;
        this.samples = 0;
        this._subframe = new (0, _three.Vector4)(0, 0, 1, 1);
        this._opacityFactor = 1.0;
        this._renderer = renderer;
        this._alpha = false;
        this._fsQuad = new (0, _passJs.FullScreenQuad)(new (0, _physicalPathTracingMaterialJs.PhysicalPathTracingMaterial)());
        this._blendQuad = new (0, _passJs.FullScreenQuad)(new (0, _blendMaterialJs.BlendMaterial)());
        this._task = null;
        this._currentTile = 0;
        this._compilePromise = null;
        this._sobolTarget = new (0, _sobolNumberMapGeneratorJs.SobolNumberMapGenerator)().generate(renderer);
        this._primaryTarget = new (0, _three.WebGLRenderTarget)(1, 1, {
            format: (0, _three.RGBAFormat),
            type: (0, _three.FloatType),
            magFilter: (0, _three.NearestFilter),
            minFilter: (0, _three.NearestFilter)
        });
        this._blendTargets = [
            new (0, _three.WebGLRenderTarget)(1, 1, {
                format: (0, _three.RGBAFormat),
                type: (0, _three.FloatType),
                magFilter: (0, _three.NearestFilter),
                minFilter: (0, _three.NearestFilter)
            }),
            new (0, _three.WebGLRenderTarget)(1, 1, {
                format: (0, _three.RGBAFormat),
                type: (0, _three.FloatType),
                magFilter: (0, _three.NearestFilter),
                minFilter: (0, _three.NearestFilter)
            })
        ];
        // function for listening to for triggered compilation so we can wait for compilation to finish
        // before starting to render
        this._compileFunction = ()=>{
            const promise = this.compileMaterial(this._fsQuad._mesh);
            promise.then(()=>{
                if (this._compilePromise === promise) this._compilePromise = null;
            });
            this._compilePromise = promise;
        };
        this.material.addEventListener('recompilation', this._compileFunction);
    }
    compileMaterial() {
        return this._renderer.compileAsync(this._fsQuad._mesh);
    }
    setCamera(camera) {
        const { material } = this;
        material.cameraWorldMatrix.copy(camera.matrixWorld);
        material.invProjectionMatrix.copy(camera.projectionMatrixInverse);
        material.physicalCamera.updateFrom(camera);
        // Perspective camera (default)
        let cameraType = 0;
        // An orthographic projection matrix will always have the bottom right element == 1
        // And a perspective projection matrix will always have the bottom right element == 0
        if (camera.projectionMatrix.elements[15] > 0) // Orthographic
        cameraType = 1;
        if (camera.isEquirectCamera) // Equirectangular
        cameraType = 2;
        material.setDefine('CAMERA_TYPE', cameraType);
        this.camera = camera;
    }
    setSize(w, h) {
        w = Math.ceil(w);
        h = Math.ceil(h);
        if (this._primaryTarget.width === w && this._primaryTarget.height === h) return;
        this._primaryTarget.setSize(w, h);
        this._blendTargets[0].setSize(w, h);
        this._blendTargets[1].setSize(w, h);
        this.reset();
    }
    getSize(target) {
        target.x = this._primaryTarget.width;
        target.y = this._primaryTarget.height;
    }
    dispose() {
        this._primaryTarget.dispose();
        this._blendTargets[0].dispose();
        this._blendTargets[1].dispose();
        this._sobolTarget.dispose();
        this._fsQuad.dispose();
        this._blendQuad.dispose();
        this._task = null;
    }
    reset() {
        const { _renderer, _primaryTarget, _blendTargets } = this;
        const ogRenderTarget = _renderer.getRenderTarget();
        const ogClearAlpha = _renderer.getClearAlpha();
        _renderer.getClearColor(ogClearColor);
        _renderer.setRenderTarget(_primaryTarget);
        _renderer.setClearColor(0, 0);
        _renderer.clearColor();
        _renderer.setRenderTarget(_blendTargets[0]);
        _renderer.setClearColor(0, 0);
        _renderer.clearColor();
        _renderer.setRenderTarget(_blendTargets[1]);
        _renderer.setClearColor(0, 0);
        _renderer.clearColor();
        _renderer.setClearColor(ogClearColor, ogClearAlpha);
        _renderer.setRenderTarget(ogRenderTarget);
        this.samples = 0;
        this._task = null;
        this.material.stratifiedTexture.stableNoise = this.stableNoise;
        if (this.stableNoise) {
            this.material.seed = 0;
            this.material.stratifiedTexture.reset();
        }
    }
    update() {
        // ensure we've updated our defines before rendering so we can ensure we
        // can wait for compilation to finish
        this.material.onBeforeRender();
        if (this.isCompiling) return;
        if (!this._task) this._task = renderTask.call(this);
        this._task.next();
    }
}

},{"three":"ktPTu","three/examples/jsm/postprocessing/Pass.js":"i2IfB","../materials/fullscreen/BlendMaterial.js":"ecXtc","../utils/SobolNumberMapGenerator.js":"bNCSm","../materials/pathtracing/PhysicalPathTracingMaterial.js":"2zJa6","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ecXtc":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
//实现混合的效果
parcelHelpers.export(exports, "BlendMaterial", ()=>BlendMaterial);
var _three = require("three");
var _materialBaseJs = require("../MaterialBase.js");
class BlendMaterial extends (0, _materialBaseJs.MaterialBase) {
    constructor(parameters){
        super({
            blending: (0, _three.NoBlending),
            uniforms: {
                target1: {
                    value: null
                },
                target2: {
                    value: null
                },
                opacity: {
                    value: 1.0
                }
            },
            vertexShader: /* glsl */ `
				varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,
            fragmentShader: /* glsl */ `
				uniform float opacity;
				uniform sampler2D target1;
				uniform sampler2D target2;
				varying vec2 vUv;
				void main() {
					vec4 color1 = texture2D( target1, vUv );
					vec4 color2 = texture2D( target2, vUv );
					float invOpacity = 1.0 - opacity;
					float totalAlpha = color1.a * invOpacity + color2.a * opacity;
					if ( color1.a != 0.0 || color2.a != 0.0 ) {
						gl_FragColor.rgb = color1.rgb * ( invOpacity * color1.a / totalAlpha ) + color2.rgb * ( opacity * color2.a / totalAlpha );
						gl_FragColor.a = totalAlpha;
					} else {
						gl_FragColor = vec4( 0.0 );
					}
				}`
        });
        this.setValues(parameters);
    }
}

},{"three":"ktPTu","../MaterialBase.js":"hgRM3","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bNCSm":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "SobolNumberMapGenerator", ()=>SobolNumberMapGenerator);
var _three = require("three");
var _passJs = require("three/examples/jsm/postprocessing/Pass.js");
var _materialBaseJs = require("../materials/MaterialBase.js");
var _sobolGlslJs = require("../shader/rand/sobol.glsl.js");
class SobolNumbersMaterial extends (0, _materialBaseJs.MaterialBase) {
    constructor(){
        super({
            blending: (0, _three.NoBlending),
            uniforms: {
                resolution: {
                    value: new (0, _three.Vector2)()
                }
            },
            vertexShader: /* glsl */ `

				varying vec2 vUv;
				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}
			`,
            fragmentShader: /* glsl */ `

				${(0, _sobolGlslJs.sobol_common)}
				${(0, _sobolGlslJs.sobol_point_generation)}

				varying vec2 vUv;
				uniform vec2 resolution;
				void main() {

					uint index = uint( gl_FragCoord.y ) * uint( resolution.x ) + uint( gl_FragCoord.x );
					gl_FragColor = generateSobolPoint( index );

				}
			`
        });
    }
}
class SobolNumberMapGenerator {
    generate(renderer, dimensions = 256) {
        const target = new (0, _three.WebGLRenderTarget)(dimensions, dimensions, {
            type: (0, _three.FloatType),
            format: (0, _three.RGBAFormat),
            minFilter: (0, _three.NearestFilter),
            magFilter: (0, _three.NearestFilter),
            generateMipmaps: false
        });
        const ogTarget = renderer.getRenderTarget();
        renderer.setRenderTarget(target);
        const quad = new (0, _passJs.FullScreenQuad)(new SobolNumbersMaterial());
        quad.material.resolution.set(dimensions, dimensions);
        quad.render(renderer);
        renderer.setRenderTarget(ogTarget);
        quad.dispose();
        return target;
    }
}

},{"three":"ktPTu","three/examples/jsm/postprocessing/Pass.js":"i2IfB","../materials/MaterialBase.js":"hgRM3","../shader/rand/sobol.glsl.js":"517Qi","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2zJa6":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "PhysicalPathTracingMaterial", ()=>PhysicalPathTracingMaterial);
var _three = require("three");
var _materialBaseJs = require("../MaterialBase.js");
var _threeMeshBvh = require("three-mesh-bvh");
// uniforms
var _physicalCameraUniformJs = require("../../uniforms/PhysicalCameraUniform.js");
var _equirectHdrInfoUniformJs = require("../../uniforms/EquirectHdrInfoUniform.js");
var _lightsInfoUniformStructJs = require("../../uniforms/LightsInfoUniformStruct.js");
var _attributesTextureArrayJs = require("../../uniforms/AttributesTextureArray.js");
var _materialsTextureJs = require("../../uniforms/MaterialsTexture.js");
var _renderTarget2DArrayJs = require("../../uniforms/RenderTarget2DArray.js");
var _stratifiedSamplesTextureJs = require("../../uniforms/StratifiedSamplesTexture.js");
var _blueNoiseTextureJs = require("../../textures/BlueNoiseTexture.js");
// general glsl
var _indexJs = require("../../shader/structs/index.js");
var _indexJs1 = require("../../shader/sampling/index.js");
var _indexJs2 = require("../../shader/common/index.js");
var _indexJs3 = require("../../shader/rand/index.js");
var _indexJs4 = require("../../shader/bsdf/index.js");
var _indexJs5 = require("../../shader/bvh/index.js");
// path tracer glsl
var _indexJs6 = require("./glsl/index.js");
class PhysicalPathTracingMaterial extends (0, _materialBaseJs.MaterialBase) {
    onBeforeRender() {
        this.setDefine('FEATURE_DOF', this.physicalCamera.bokehSize === 0 ? 0 : 1);
        this.setDefine('FEATURE_BACKGROUND_MAP', this.backgroundMap ? 1 : 0);
        this.setDefine('FEATURE_FOG', this.materials.features.isUsed('FOG') ? 1 : 0);
    }
    constructor(parameters){
        super({
            transparent: true,
            depthWrite: false,
            defines: {
                FEATURE_MIS: 1,
                FEATURE_RUSSIAN_ROULETTE: 1,
                FEATURE_DOF: 1,
                FEATURE_BACKGROUND_MAP: 0,
                FEATURE_FOG: 1,
                // 0 = PCG
                // 1 = Sobol
                // 2 = Stratified List
                RANDOM_TYPE: 2,
                // 0 = Perspective
                // 1 = Orthographic
                // 2 = Equirectangular
                CAMERA_TYPE: 0,
                DEBUG_MODE: 0,
                ATTR_NORMAL: 0,
                ATTR_TANGENT: 1,
                ATTR_UV: 2,
                ATTR_COLOR: 3,
                MATERIAL_PIXELS: (0, _materialsTextureJs.MATERIAL_PIXELS)
            },
            uniforms: {
                // path trace uniforms
                resolution: {
                    value: new (0, _three.Vector2)()
                },
                opacity: {
                    value: 1
                },
                bounces: {
                    value: 10
                },
                transmissiveBounces: {
                    value: 10
                },
                filterGlossyFactor: {
                    value: 0
                },
                // camera uniforms
                physicalCamera: {
                    value: new (0, _physicalCameraUniformJs.PhysicalCameraUniform)()
                },
                cameraWorldMatrix: {
                    value: new (0, _three.Matrix4)()
                },
                invProjectionMatrix: {
                    value: new (0, _three.Matrix4)()
                },
                // scene uniforms
                bvh: {
                    value: new (0, _threeMeshBvh.MeshBVHUniformStruct)()
                },
                attributesArray: {
                    value: new (0, _attributesTextureArrayJs.AttributesTextureArray)()
                },
                materialIndexAttribute: {
                    value: new (0, _threeMeshBvh.UIntVertexAttributeTexture)()
                },
                materials: {
                    value: new (0, _materialsTextureJs.MaterialsTexture)()
                },
                textures: {
                    value: new (0, _renderTarget2DArrayJs.RenderTarget2DArray)().texture
                },
                // light uniforms
                lights: {
                    value: new (0, _lightsInfoUniformStructJs.LightsInfoUniformStruct)()
                },
                iesProfiles: {
                    value: new (0, _renderTarget2DArrayJs.RenderTarget2DArray)(360, 180, {
                        type: (0, _three.HalfFloatType),
                        wrapS: (0, _three.ClampToEdgeWrapping),
                        wrapT: (0, _three.ClampToEdgeWrapping)
                    }).texture
                },
                environmentIntensity: {
                    value: 1.0
                },
                environmentRotation: {
                    value: new (0, _three.Matrix4)()
                },
                envMapInfo: {
                    value: new (0, _equirectHdrInfoUniformJs.EquirectHdrInfoUniform)()
                },
                // background uniforms
                backgroundBlur: {
                    value: 0.0
                },
                backgroundMap: {
                    value: null
                },
                backgroundAlpha: {
                    value: 1.0
                },
                backgroundIntensity: {
                    value: 1.0
                },
                backgroundRotation: {
                    value: new (0, _three.Matrix4)()
                },
                // randomness uniforms
                seed: {
                    value: 0
                },
                sobolTexture: {
                    value: null
                },
                stratifiedTexture: {
                    value: new (0, _stratifiedSamplesTextureJs.StratifiedSamplesTexture)()
                },
                stratifiedOffsetTexture: {
                    value: new (0, _blueNoiseTextureJs.BlueNoiseTexture)(64, 1)
                }
            },
            vertexShader: /* glsl */ `

				varying vec2 vUv;
				void main() {

					vec4 mvPosition = vec4( position, 1.0 );
					mvPosition = modelViewMatrix * mvPosition;
					gl_Position = projectionMatrix * mvPosition;

					vUv = uv;

				}

			`,
            fragmentShader: /* glsl */ `
				#define RAY_OFFSET 1e-4
				#define INFINITY 1e20

				precision highp isampler2D;
				precision highp usampler2D;
				precision highp sampler2DArray;
				vec4 envMapTexelToLinear( vec4 a ) { return a; }
				#include <common>

				// bvh intersection
				${(0, _threeMeshBvh.BVHShaderGLSL).common_functions}
				${(0, _threeMeshBvh.BVHShaderGLSL).bvh_struct_definitions}
				${(0, _threeMeshBvh.BVHShaderGLSL).bvh_ray_functions}

				// uniform structs
				${_indexJs.camera_struct}
				${_indexJs.lights_struct}
				${_indexJs.equirect_struct}
				${_indexJs.material_struct}
				${_indexJs.surface_record_struct}

				// random
				#if RANDOM_TYPE == 2 	// Stratified List

					${_indexJs3.stratified_functions}

				#elif RANDOM_TYPE == 1 	// Sobol

					${_indexJs3.pcg_functions}
					${_indexJs3.sobol_common}
					${_indexJs3.sobol_functions}

					#define rand(v) sobol(v)
					#define rand2(v) sobol2(v)
					#define rand3(v) sobol3(v)
					#define rand4(v) sobol4(v)

				#else 					// PCG

				${_indexJs3.pcg_functions}

					// Using the sobol functions seems to break the the compiler on MacOS
					// - specifically the "sobolReverseBits" function.
					uint sobolPixelIndex = 0u;
					uint sobolPathIndex = 0u;
					uint sobolBounceIndex = 0u;

					#define rand(v) pcgRand()
					#define rand2(v) pcgRand2()
					#define rand3(v) pcgRand3()
					#define rand4(v) pcgRand4()

				#endif

				// common
				${_indexJs2.texture_sample_functions}
				${_indexJs2.fresnel_functions}
				${_indexJs2.util_functions}
				${_indexJs2.math_functions}
				${_indexJs2.shape_intersection_functions}

				// environment
				uniform EquirectHdrInfo envMapInfo;
				uniform mat4 environmentRotation;
				uniform float environmentIntensity;

				// lighting
				uniform sampler2DArray iesProfiles;
				uniform LightsInfo lights;

				// background
				uniform float backgroundBlur;
				uniform float backgroundAlpha;
				#if FEATURE_BACKGROUND_MAP

				uniform sampler2D backgroundMap;
				uniform mat4 backgroundRotation;
				uniform float backgroundIntensity;

				#endif

				// camera
				uniform mat4 cameraWorldMatrix;
				uniform mat4 invProjectionMatrix;
				#if FEATURE_DOF

				uniform PhysicalCamera physicalCamera;

				#endif

				// geometry
				uniform sampler2DArray attributesArray;
				uniform usampler2D materialIndexAttribute;
				uniform sampler2D materials;
				uniform sampler2DArray textures;
				uniform BVH bvh;

				// path tracer
				uniform int bounces;
				uniform int transmissiveBounces;
				uniform float filterGlossyFactor;
				uniform int seed;

				// image
				uniform vec2 resolution;
				uniform float opacity;

				varying vec2 vUv;

				// globals
				mat3 envRotation3x3;
				mat3 invEnvRotation3x3;
				float lightsDenom;

				// sampling
				${_indexJs1.shape_sampling_functions}
				${_indexJs1.equirect_functions}
				${_indexJs1.light_sampling_functions}

				${_indexJs5.inside_fog_volume_function}
				${_indexJs4.ggx_functions}
				${_indexJs4.sheen_functions}
				${_indexJs4.iridescence_functions}
				${_indexJs4.fog_functions}
				${_indexJs4.bsdf_functions}

				float applyFilteredGlossy( float roughness, float accumulatedRoughness ) {

					return clamp(
						max(
							roughness,
							accumulatedRoughness * filterGlossyFactor * 5.0 ),
						0.0,
						1.0
					);

				}

				vec3 sampleBackground( vec3 direction, vec2 uv ) {

					vec3 sampleDir = sampleHemisphere( direction, uv ) * 0.5 * backgroundBlur;

					#if FEATURE_BACKGROUND_MAP

					sampleDir = normalize( mat3( backgroundRotation ) * direction + sampleDir );
					return backgroundIntensity * sampleEquirectColor( backgroundMap, sampleDir );

					#else

					sampleDir = normalize( envRotation3x3 * direction + sampleDir );
					return environmentIntensity * sampleEquirectColor( envMapInfo.map, sampleDir );

					#endif

				}

				${_indexJs6.render_structs}
				${_indexJs6.camera_util_functions}
				${_indexJs6.trace_scene_function}
				${_indexJs6.attenuate_hit_function}
				${_indexJs6.direct_light_contribution_function}
				${_indexJs6.get_surface_record_function}

				void main() {

					// init
					rng_initialize( gl_FragCoord.xy, seed );
					sobolPixelIndex = ( uint( gl_FragCoord.x ) << 16 ) | uint( gl_FragCoord.y );
					sobolPathIndex = uint( seed );

					// get camera ray
					Ray ray = getCameraRay();

					// inverse environment rotation
					envRotation3x3 = mat3( environmentRotation );
					invEnvRotation3x3 = inverse( envRotation3x3 );
					lightsDenom =
						( environmentIntensity == 0.0 || envMapInfo.totalSum == 0.0 ) && lights.count != 0u ?
							float( lights.count ) :
							float( lights.count + 1u );

					// final color
					gl_FragColor = vec4( 0, 0, 0, 1 );

					// surface results
					SurfaceHit surfaceHit;
					ScatterRecord scatterRec;

					// path tracing state
					RenderState state = initRenderState();
					state.transmissiveTraversals = transmissiveBounces;
					#if FEATURE_FOG

					state.fogMaterial.fogVolume = bvhIntersectFogVolumeHit(
						ray.origin, - ray.direction,
						materialIndexAttribute, materials,
						state.fogMaterial
					);

					#endif

					for ( int i = 0; i < bounces; i ++ ) {

						sobolBounceIndex ++;

						state.depth ++;
						state.traversals = bounces - i;
						state.firstRay = i == 0 && state.transmissiveTraversals == transmissiveBounces;

						int hitType = traceScene( ray, state.fogMaterial, surfaceHit );

						// check if we intersect any lights and accumulate the light contribution
						// TODO: we can add support for light surface rendering in the else condition if we
						// add the ability to toggle visibility of the the light
						if ( ! state.firstRay && ! state.transmissiveRay ) {

							LightRecord lightRec;
							float lightDist = hitType == NO_HIT ? INFINITY : surfaceHit.dist;
							for ( uint i = 0u; i < lights.count; i ++ ) {

								if (
									intersectLightAtIndex( lights.tex, ray.origin, ray.direction, i, lightRec ) &&
									lightRec.dist < lightDist
								) {

									#if FEATURE_MIS

									// weight the contribution
									// NOTE: Only area lights are supported for forward sampling and can be hit
									float misWeight = misHeuristic( scatterRec.pdf, lightRec.pdf / lightsDenom );
									gl_FragColor.rgb += lightRec.emission * state.throughputColor * misWeight;

									#else

									gl_FragColor.rgb += lightRec.emission * state.throughputColor;

									#endif

								}

							}

						}

						if ( hitType == NO_HIT ) {

							if ( state.firstRay || state.transmissiveRay ) {

								gl_FragColor.rgb += sampleBackground( ray.direction, rand2( 2 ) ) * state.throughputColor;
								gl_FragColor.a = backgroundAlpha;

							} else {

								#if FEATURE_MIS

								// get the PDF of the hit envmap point
								vec3 envColor;
								float envPdf = sampleEquirect( envRotation3x3 * ray.direction, envColor );
								envPdf /= lightsDenom;

								// and weight the contribution
								float misWeight = misHeuristic( scatterRec.pdf, envPdf );
								gl_FragColor.rgb += environmentIntensity * envColor * state.throughputColor * misWeight;

								#else

								gl_FragColor.rgb +=
									environmentIntensity *
									sampleEquirectColor( envMapInfo.map, envRotation3x3 * ray.direction ) *
									state.throughputColor;

								#endif

							}
							break;

						}

						uint materialIndex = uTexelFetch1D( materialIndexAttribute, surfaceHit.faceIndices.x ).r;
						Material material = readMaterialInfo( materials, materialIndex );

						#if FEATURE_FOG

						if ( hitType == FOG_HIT ) {

							material = state.fogMaterial;
							state.accumulatedRoughness += 0.2;

						} else if ( material.fogVolume ) {

							state.fogMaterial = material;
							state.fogMaterial.fogVolume = surfaceHit.side == 1.0;

							ray.origin = stepRayOrigin( ray.origin, ray.direction, - surfaceHit.faceNormal, surfaceHit.dist );

							i -= sign( state.transmissiveTraversals );
							state.transmissiveTraversals -= sign( state.transmissiveTraversals );
							continue;

						}

						#endif

						// early out if this is a matte material
						if ( material.matte && state.firstRay ) {

							gl_FragColor = vec4( 0.0 );
							break;

						}

						// if we've determined that this is a shadow ray and we've hit an item with no shadow casting
						// then skip it
						if ( ! material.castShadow && state.isShadowRay ) {

							ray.origin = stepRayOrigin( ray.origin, ray.direction, - surfaceHit.faceNormal, surfaceHit.dist );
							continue;

						}

						SurfaceRecord surf;
						if (
							getSurfaceRecord(
								material, surfaceHit, attributesArray, state.accumulatedRoughness,
								surf
							) == SKIP_SURFACE
						) {

							// only allow a limited number of transparency discards otherwise we could
							// crash the context with too long a loop.
							i -= sign( state.transmissiveTraversals );
							state.transmissiveTraversals -= sign( state.transmissiveTraversals );

							ray.origin = stepRayOrigin( ray.origin, ray.direction, - surfaceHit.faceNormal, surfaceHit.dist );
							continue;

						}

						scatterRec = bsdfSample( - ray.direction, surf );
						state.isShadowRay = scatterRec.specularPdf < rand( 4 );

						bool isBelowSurface = ! surf.volumeParticle && dot( scatterRec.direction, surf.faceNormal ) < 0.0;
						vec3 hitPoint = stepRayOrigin( ray.origin, ray.direction, isBelowSurface ? - surf.faceNormal : surf.faceNormal, surfaceHit.dist );

						// next event estimation
						#if FEATURE_MIS

						gl_FragColor.rgb += directLightContribution( - ray.direction, surf, state, hitPoint );

						#endif

						// accumulate a roughness value to offset diffuse, specular, diffuse rays that have high contribution
						// to a single pixel resulting in fireflies
						// TODO: handle transmissive surfaces
						if ( ! surf.volumeParticle && ! isBelowSurface ) {

							// determine if this is a rough normal or not by checking how far off straight up it is
							vec3 halfVector = normalize( - ray.direction + scatterRec.direction );
							state.accumulatedRoughness += max(
								sin( acosApprox( dot( halfVector, surf.normal ) ) ),
								sin( acosApprox( dot( halfVector, surf.clearcoatNormal ) ) )
							);

							state.transmissiveRay = false;

						}

						// accumulate emissive color
						gl_FragColor.rgb += ( surf.emission * state.throughputColor );

						// skip the sample if our PDF or ray is impossible
						if ( scatterRec.pdf <= 0.0 || ! isDirectionValid( scatterRec.direction, surf.normal, surf.faceNormal ) ) {

							break;

						}

						// if we're bouncing around the inside a transmissive material then decrement
						// perform this separate from a bounce
						bool isTransmissiveRay = ! surf.volumeParticle && dot( scatterRec.direction, surf.faceNormal * surfaceHit.side ) < 0.0;
						if ( ( isTransmissiveRay || isBelowSurface ) && state.transmissiveTraversals > 0 ) {

							state.transmissiveTraversals --;
							i --;

						}

						//

						// handle throughput color transformation
						// attenuate the throughput color by the medium color
						if ( ! surf.frontFace ) {

							state.throughputColor *= transmissionAttenuation( surfaceHit.dist, surf.attenuationColor, surf.attenuationDistance );

						}

						#if FEATURE_RUSSIAN_ROULETTE

						// russian roulette path termination
						// https://www.arnoldrenderer.com/research/physically_based_shader_design_in_arnold.pdf
						uint minBounces = 3u;
						float depthProb = float( state.depth < minBounces );

						float rrProb = luminance( state.throughputColor * scatterRec.color / scatterRec.pdf );
						rrProb /= luminance( state.throughputColor );
						rrProb = sqrt( rrProb );
						rrProb = max( rrProb, depthProb );
						rrProb = min( rrProb, 1.0 );
						if ( rand( 8 ) > rrProb ) {

							break;

						}

						// perform sample clamping here to avoid bright pixels
						state.throughputColor *= min( 1.0 / rrProb, 20.0 );

						#endif

						// adjust the throughput and discard and exit if we find discard the sample if there are any NaNs
						state.throughputColor *= scatterRec.color / scatterRec.pdf;
						if ( any( isnan( state.throughputColor ) ) || any( isinf( state.throughputColor ) ) ) {

							break;

						}

						//

						// prepare for next ray
						ray.direction = scatterRec.direction;
						ray.origin = hitPoint;

					}

					gl_FragColor.a *= opacity;

					#if DEBUG_MODE == 1

					// output the number of rays checked in the path and number of
					// transmissive rays encountered.
					gl_FragColor.rgb = vec3(
						float( state.depth ),
						transmissiveBounces - state.transmissiveTraversals,
						0.0
					);
					gl_FragColor.a = 1.0;

					#endif

				}

			`
        });
        this.setValues(parameters);
    }
}

},{"three":"ktPTu","../MaterialBase.js":"hgRM3","three-mesh-bvh":"6y2ur","../../uniforms/PhysicalCameraUniform.js":"eXijT","../../uniforms/EquirectHdrInfoUniform.js":"3SziJ","../../uniforms/LightsInfoUniformStruct.js":"lqcXs","../../uniforms/AttributesTextureArray.js":"lGtji","../../uniforms/MaterialsTexture.js":"ctAR3","../../uniforms/RenderTarget2DArray.js":"18sqc","../../uniforms/StratifiedSamplesTexture.js":"5LOFf","../../textures/BlueNoiseTexture.js":"aCALq","../../shader/structs/index.js":"ey0rD","../../shader/sampling/index.js":"k0HOQ","../../shader/common/index.js":"i5W2a","../../shader/rand/index.js":"Lo4Te","../../shader/bsdf/index.js":"7EauB","../../shader/bvh/index.js":"iyhzw","./glsl/index.js":"5BM54","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"eXijT":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "PhysicalCameraUniform", ()=>PhysicalCameraUniform);
var _physicalCameraJs = require("../objects/PhysicalCamera.js");
class PhysicalCameraUniform {
    constructor(){
        this.bokehSize = 0;
        this.apertureBlades = 0;
        this.apertureRotation = 0;
        this.focusDistance = 10;
        this.anamorphicRatio = 1;
    }
    updateFrom(camera) {
        if (camera instanceof (0, _physicalCameraJs.PhysicalCamera)) {
            this.bokehSize = camera.bokehSize;
            this.apertureBlades = camera.apertureBlades;
            this.apertureRotation = camera.apertureRotation;
            this.focusDistance = camera.focusDistance;
            this.anamorphicRatio = camera.anamorphicRatio;
        } else {
            this.bokehSize = 0;
            this.apertureRotation = 0;
            this.apertureBlades = 0;
            this.focusDistance = 10;
            this.anamorphicRatio = 1;
        }
    }
}

},{"../objects/PhysicalCamera.js":"gtiba","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gtiba":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "PhysicalCamera", ()=>PhysicalCamera);
var _three = require("three");
class PhysicalCamera extends (0, _three.PerspectiveCamera) {
    set bokehSize(size) {
        this.fStop = this.getFocalLength() / size;
    }
    get bokehSize() {
        return this.getFocalLength() / this.fStop;
    }
    constructor(...args){
        super(...args);
        this.fStop = 1.4;
        this.apertureBlades = 0;
        this.apertureRotation = 0;
        this.focusDistance = 25;
        this.anamorphicRatio = 1;
    }
    copy(source, recursive) {
        super.copy(source, recursive);
        this.fStop = source.fStop;
        this.apertureBlades = source.apertureBlades;
        this.apertureRotation = source.apertureRotation;
        this.focusDistance = source.focusDistance;
        this.anamorphicRatio = source.anamorphicRatio;
        return this;
    }
}

},{"three":"ktPTu","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3SziJ":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "EquirectHdrInfoUniform", ()=>EquirectHdrInfoUniform);
var _three = require("three");
var _textureUtilsJs = require("../utils/TextureUtils.js");
function binarySearchFindClosestIndexOf(array, targetValue, offset = 0, count = array.length) {
    let lower = offset;
    let upper = offset + count - 1;
    while(lower < upper){
        const mid = lower + upper >> 1;
        if (array[mid] < targetValue) lower = mid + 1;
        else upper = mid;
    }
    return lower - offset;
}
function colorToLuminance(r, g, b) {
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function preprocessEnvMap(envMap, targetType = (0, _three.HalfFloatType)) {
    const map = envMap.clone();
    map.source = new (0, _three.Source)({
        ...map.image
    });
    const { width, height, data } = map.image;
    let newData = data;
    if (map.type !== targetType) {
        if (targetType === (0, _three.HalfFloatType)) newData = new Uint16Array(data.length);
        else newData = new Float32Array(data.length);
        let maxIntValue;
        if (data instanceof Int8Array || data instanceof Int16Array || data instanceof Int32Array) maxIntValue = 2 ** (8 * data.BYTES_PER_ELEMENT - 1) - 1;
        else maxIntValue = 2 ** (8 * data.BYTES_PER_ELEMENT) - 1;
        for(let i = 0, l = data.length; i < l; i++){
            let v = data[i];
            if (map.type === (0, _three.HalfFloatType)) v = (0, _three.DataUtils).fromHalfFloat(data[i]);
            if (map.type !== (0, _three.FloatType) && map.type !== (0, _three.HalfFloatType)) v /= maxIntValue;
            if (targetType === (0, _three.HalfFloatType)) newData[i] = (0, _three.DataUtils).toHalfFloat(v);
        }
        map.image.data = newData;
        map.type = targetType;
    }
    if (map.flipY) {
        const ogData = newData;
        newData = newData.slice();
        for(let y = 0; y < height; y++)for(let x = 0; x < width; x++){
            const newY = height - y - 1;
            const ogIndex = 4 * (y * width + x);
            const newIndex = 4 * (newY * width + x);
            newData[newIndex + 0] = ogData[ogIndex + 0];
            newData[newIndex + 1] = ogData[ogIndex + 1];
            newData[newIndex + 2] = ogData[ogIndex + 2];
            newData[newIndex + 3] = ogData[ogIndex + 3];
        }
        map.flipY = false;
        map.image.data = newData;
    }
    return map;
}
class EquirectHdrInfoUniform {
    constructor(){
        const blackTex = new (0, _three.DataTexture)((0, _textureUtilsJs.toHalfFloatArray)(new Float32Array([
            0,
            0,
            0,
            0
        ])), 1, 1);
        blackTex.type = (0, _three.HalfFloatType);
        blackTex.format = (0, _three.RGBAFormat);
        blackTex.minFilter = (0, _three.LinearFilter);
        blackTex.magFilter = (0, _three.LinearFilter);
        blackTex.wrapS = (0, _three.RepeatWrapping);
        blackTex.wrapT = (0, _three.RepeatWrapping);
        blackTex.generateMipmaps = false;
        blackTex.needsUpdate = true;
        const marginalWeights = new (0, _three.DataTexture)((0, _textureUtilsJs.toHalfFloatArray)(new Float32Array([
            0,
            1
        ])), 1, 2);
        marginalWeights.type = (0, _three.HalfFloatType);
        marginalWeights.format = (0, _three.RedFormat);
        marginalWeights.minFilter = (0, _three.LinearFilter);
        marginalWeights.magFilter = (0, _three.LinearFilter);
        marginalWeights.generateMipmaps = false;
        marginalWeights.needsUpdate = true;
        const conditionalWeights = new (0, _three.DataTexture)((0, _textureUtilsJs.toHalfFloatArray)(new Float32Array([
            0,
            0,
            1,
            1
        ])), 2, 2);
        conditionalWeights.type = (0, _three.HalfFloatType);
        conditionalWeights.format = (0, _three.RedFormat);
        conditionalWeights.minFilter = (0, _three.LinearFilter);
        conditionalWeights.magFilter = (0, _three.LinearFilter);
        conditionalWeights.generateMipmaps = false;
        conditionalWeights.needsUpdate = true;
        this.map = blackTex;
        this.marginalWeights = marginalWeights;
        this.conditionalWeights = conditionalWeights;
        this.totalSum = 0;
    }
    dispose() {
        this.marginalWeights.dispose();
        this.conditionalWeights.dispose();
        this.map.dispose();
    }
    updateFrom(hdr) {
        const map = preprocessEnvMap(hdr);
        map.wrapS = (0, _three.RepeatWrapping);
        map.wrapT = (0, _three.ClampToEdgeWrapping);
        const { width, height, data } = map.image;
        const pdfConditional = new Float32Array(width * height);
        const cdfConditional = new Float32Array(width * height);
        const pdfMarginal = new Float32Array(height);
        const cdfMarginal = new Float32Array(height);
        let totalSumValue = 0.0;
        let cumulativeWeightMarginal = 0.0;
        for(let y = 0; y < height; y++){
            let cumulativeRowWeight = 0.0;
            for(let x = 0; x < width; x++){
                const i = y * width + x;
                const r = (0, _three.DataUtils).fromHalfFloat(data[4 * i + 0]);
                const g = (0, _three.DataUtils).fromHalfFloat(data[4 * i + 1]);
                const b = (0, _three.DataUtils).fromHalfFloat(data[4 * i + 2]);
                const weight = colorToLuminance(r, g, b);
                cumulativeRowWeight += weight;
                totalSumValue += weight;
                pdfConditional[i] = weight;
                cdfConditional[i] = cumulativeRowWeight;
            }
            if (cumulativeRowWeight !== 0) for(let i = y * width, l = y * width + width; i < l; i++){
                pdfConditional[i] /= cumulativeRowWeight;
                cdfConditional[i] /= cumulativeRowWeight;
            }
            cumulativeWeightMarginal += cumulativeRowWeight;
            pdfMarginal[y] = cumulativeRowWeight;
            cdfMarginal[y] = cumulativeWeightMarginal;
        }
        if (cumulativeWeightMarginal !== 0) for(let i = 0, l = pdfMarginal.length; i < l; i++){
            pdfMarginal[i] /= cumulativeWeightMarginal;
            cdfMarginal[i] /= cumulativeWeightMarginal;
        }
        const marginalDataArray = new Uint16Array(height);
        const conditionalDataArray = new Uint16Array(width * height);
        for(let i = 0; i < height; i++){
            const dist = (i + 1) / height;
            const row = binarySearchFindClosestIndexOf(cdfMarginal, dist);
            marginalDataArray[i] = (0, _three.DataUtils).toHalfFloat((row + 0.5) / height);
        }
        for(let y = 0; y < height; y++)for(let x = 0; x < width; x++){
            const i = y * width + x;
            const dist = (x + 1) / width;
            const col = binarySearchFindClosestIndexOf(cdfConditional, dist, y * width, width);
            conditionalDataArray[i] = (0, _three.DataUtils).toHalfFloat((col + 0.5) / width);
        }
        this.dispose();
        const { marginalWeights, conditionalWeights } = this;
        marginalWeights.image = {
            width: height,
            height: 1,
            data: marginalDataArray
        };
        marginalWeights.needsUpdate = true;
        conditionalWeights.image = {
            width,
            height,
            data: conditionalDataArray
        };
        conditionalWeights.needsUpdate = true;
        this.totalSum = totalSumValue;
        this.map = map;
    }
}

},{"three":"ktPTu","../utils/TextureUtils.js":"7a4A8","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7a4A8":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "toHalfFloatArray", ()=>toHalfFloatArray);
var _three = require("three");
function toHalfFloatArray(f32Array) {
    const f16Array = new Uint16Array(f32Array.length);
    for(let i = 0, n = f32Array.length; i < n; ++i)f16Array[i] = (0, _three.DataUtils).toHalfFloat(f32Array[i]);
    return f16Array;
}

},{"three":"ktPTu","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lqcXs":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "LightsInfoUniformStruct", ()=>LightsInfoUniformStruct);
var _three = require("three");
var _bufferToHashJs = require("../utils/bufferToHash.js");
const LIGHT_PIXELS = 6;
const RECT_AREA_LIGHT = 0;
const CIRC_AREA_LIGHT = 1;
const SPOT_LIGHT = 2;
const DIR_LIGHT = 3;
const POINT_LIGHT = 4;
const u = new (0, _three.Vector3)();
const v = new (0, _three.Vector3)();
const m = new (0, _three.Matrix4)();
const worldQuaternion = new (0, _three.Quaternion)();
const eye = new (0, _three.Vector3)();
const target = new (0, _three.Vector3)();
const up = new (0, _three.Vector3)(0, 1, 0);
class LightsInfoUniformStruct {
    constructor(){
        const tex = new (0, _three.DataTexture)(new Float32Array(4), 1, 1);
        tex.format = (0, _three.RGBAFormat);
        tex.type = (0, _three.FloatType);
        tex.wrapS = (0, _three.ClampToEdgeWrapping);
        tex.wrapT = (0, _three.ClampToEdgeWrapping);
        tex.generateMipmaps = false;
        tex.minFilter = (0, _three.NearestFilter);
        tex.magFilter = (0, _three.NearestFilter);
        this.tex = tex;
        this.count = 0;
    }
    updateFrom(lights, iesTextures = []) {
        const tex = this.tex;
        const pixelCount = Math.max(lights.length * LIGHT_PIXELS, 1);
        const dimension = Math.ceil(Math.sqrt(pixelCount));
        if (tex.image.width !== dimension) {
            tex.dispose();
            tex.image.data = new Float32Array(dimension * dimension * 4);
            tex.image.width = dimension;
            tex.image.height = dimension;
        }
        const floatArray = tex.image.data;
        for(let i = 0, l = lights.length; i < l; i++){
            const l = lights[i];
            const baseIndex = i * LIGHT_PIXELS * 4;
            let index = 0;
            // initialize to 0
            for(let p = 0; p < LIGHT_PIXELS * 4; p++)floatArray[baseIndex + p] = 0;
            // sample 1
            // position
            l.getWorldPosition(v);
            floatArray[baseIndex + index++] = v.x;
            floatArray[baseIndex + index++] = v.y;
            floatArray[baseIndex + index++] = v.z;
            // type
            let type = RECT_AREA_LIGHT;
            if (l.isRectAreaLight && l.isCircular) type = CIRC_AREA_LIGHT;
            else if (l.isSpotLight) type = SPOT_LIGHT;
            else if (l.isDirectionalLight) type = DIR_LIGHT;
            else if (l.isPointLight) type = POINT_LIGHT;
            floatArray[baseIndex + index++] = type;
            // sample 2
            // color
            floatArray[baseIndex + index++] = l.color.r;
            floatArray[baseIndex + index++] = l.color.g;
            floatArray[baseIndex + index++] = l.color.b;
            // intensity
            floatArray[baseIndex + index++] = l.intensity;
            l.getWorldQuaternion(worldQuaternion);
            if (l.isRectAreaLight) {
                // sample 3
                // u vector
                u.set(l.width, 0, 0).applyQuaternion(worldQuaternion);
                floatArray[baseIndex + index++] = u.x;
                floatArray[baseIndex + index++] = u.y;
                floatArray[baseIndex + index++] = u.z;
                index++;
                // sample 4
                // v vector
                v.set(0, l.height, 0).applyQuaternion(worldQuaternion);
                floatArray[baseIndex + index++] = v.x;
                floatArray[baseIndex + index++] = v.y;
                floatArray[baseIndex + index++] = v.z;
                // area
                floatArray[baseIndex + index++] = u.cross(v).length() * (l.isCircular ? Math.PI / 4.0 : 1.0);
            } else if (l.isSpotLight) {
                const radius = l.radius || 0;
                eye.setFromMatrixPosition(l.matrixWorld);
                target.setFromMatrixPosition(l.target.matrixWorld);
                m.lookAt(eye, target, up);
                worldQuaternion.setFromRotationMatrix(m);
                // sample 3
                // u vector
                u.set(1, 0, 0).applyQuaternion(worldQuaternion);
                floatArray[baseIndex + index++] = u.x;
                floatArray[baseIndex + index++] = u.y;
                floatArray[baseIndex + index++] = u.z;
                index++;
                // sample 4
                // v vector
                v.set(0, 1, 0).applyQuaternion(worldQuaternion);
                floatArray[baseIndex + index++] = v.x;
                floatArray[baseIndex + index++] = v.y;
                floatArray[baseIndex + index++] = v.z;
                // area
                floatArray[baseIndex + index++] = Math.PI * radius * radius;
                // sample 5
                // radius
                floatArray[baseIndex + index++] = radius;
                // decay
                floatArray[baseIndex + index++] = l.decay;
                // distance
                floatArray[baseIndex + index++] = l.distance;
                // coneCos
                floatArray[baseIndex + index++] = Math.cos(l.angle);
                // sample 6
                // penumbraCos
                floatArray[baseIndex + index++] = Math.cos(l.angle * (1 - l.penumbra));
                // iesProfile
                floatArray[baseIndex + index++] = l.iesMap ? iesTextures.indexOf(l.iesMap) : -1;
            } else if (l.isPointLight) {
                const worldPosition = u.setFromMatrixPosition(l.matrixWorld);
                // sample 3
                // u vector
                floatArray[baseIndex + index++] = worldPosition.x;
                floatArray[baseIndex + index++] = worldPosition.y;
                floatArray[baseIndex + index++] = worldPosition.z;
                index++;
                // sample 4
                index += 4;
                // sample 5
                index += 1;
                floatArray[baseIndex + index++] = l.decay;
                floatArray[baseIndex + index++] = l.distance;
            } else if (l.isDirectionalLight) {
                const worldPosition = u.setFromMatrixPosition(l.matrixWorld);
                const targetPosition = v.setFromMatrixPosition(l.target.matrixWorld);
                target.subVectors(worldPosition, targetPosition).normalize();
                // sample 3
                // u vector
                floatArray[baseIndex + index++] = target.x;
                floatArray[baseIndex + index++] = target.y;
                floatArray[baseIndex + index++] = target.z;
            }
        }
        this.count = lights.length;
        const hash = (0, _bufferToHashJs.bufferToHash)(floatArray.buffer);
        if (this.hash !== hash) {
            this.hash = hash;
            tex.needsUpdate = true;
            return true;
        }
        return false;
    }
}

},{"three":"ktPTu","../utils/bufferToHash.js":"8v9Fx","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lGtji":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "AttributesTextureArray", ()=>AttributesTextureArray);
var _floatAttributeTextureArrayJs = require("./FloatAttributeTextureArray.js");
class AttributesTextureArray extends (0, _floatAttributeTextureArrayJs.FloatAttributeTextureArray) {
    updateNormalAttribute(attr) {
        this.updateAttribute(0, attr);
    }
    updateTangentAttribute(attr) {
        this.updateAttribute(1, attr);
    }
    updateUvAttribute(attr) {
        this.updateAttribute(2, attr);
    }
    updateColorAttribute(attr) {
        this.updateAttribute(3, attr);
    }
    updateFrom(normal, tangent, uv, color) {
        this.setAttributes([
            normal,
            tangent,
            uv,
            color
        ]);
    }
}

},{"./FloatAttributeTextureArray.js":"7TZ14","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7TZ14":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "FloatAttributeTextureArray", ()=>FloatAttributeTextureArray);
var _three = require("three");
var _threeMeshBvh = require("three-mesh-bvh");
function copyArrayToArray(fromArray, fromStride, toArray, toStride, offset) {
    if (fromStride > toStride) throw new Error();
    // scale non-float values to their normalized range
    const count = fromArray.length / fromStride;
    const bpe = fromArray.constructor.BYTES_PER_ELEMENT * 8;
    let maxValue = 1.0;
    switch(fromArray.constructor){
        case Uint8Array:
        case Uint16Array:
        case Uint32Array:
            maxValue = 2 ** bpe - 1;
            break;
        case Int8Array:
        case Int16Array:
        case Int32Array:
            maxValue = 2 ** (bpe - 1) - 1;
            break;
    }
    for(let i = 0; i < count; i++){
        const i4 = 4 * i;
        const is = fromStride * i;
        for(let j = 0; j < toStride; j++)toArray[offset + i4 + j] = fromStride >= j + 1 ? fromArray[is + j] / maxValue : 0;
    }
}
class FloatAttributeTextureArray extends (0, _three.DataArrayTexture) {
    constructor(){
        super();
        this._textures = [];
        this.type = (0, _three.FloatType);
        this.format = (0, _three.RGBAFormat);
        this.internalFormat = 'RGBA32F';
    }
    updateAttribute(index, attr) {
        // update the texture
        const tex = this._textures[index];
        tex.updateFrom(attr);
        // ensure compatibility
        const baseImage = tex.image;
        const image = this.image;
        if (baseImage.width !== image.width || baseImage.height !== image.height) throw new Error('FloatAttributeTextureArray: Attribute must be the same dimensions when updating single layer.');
        // update the image
        const { width, height, data } = image;
        const length = width * height * 4;
        const offset = length * index;
        let itemSize = attr.itemSize;
        if (itemSize === 3) itemSize = 4;
        // copy the data
        copyArrayToArray(tex.image.data, itemSize, data, 4, offset);
        this.dispose();
        this.needsUpdate = true;
    }
    setAttributes(attrs) {
        // ensure the attribute count
        const itemCount = attrs[0].count;
        const attrsLength = attrs.length;
        for(let i = 0, l = attrsLength; i < l; i++){
            if (attrs[i].count !== itemCount) throw new Error('FloatAttributeTextureArray: All attributes must have the same item count.');
        }
        // initialize all textures
        const textures = this._textures;
        while(textures.length < attrsLength){
            const tex = new (0, _threeMeshBvh.FloatVertexAttributeTexture)();
            textures.push(tex);
        }
        while(textures.length > attrsLength)textures.pop();
        // update all textures
        for(let i = 0, l = attrsLength; i < l; i++)textures[i].updateFrom(attrs[i]);
        // determine if we need to create a new array
        const baseTexture = textures[0];
        const baseImage = baseTexture.image;
        const image = this.image;
        if (baseImage.width !== image.width || baseImage.height !== image.height || baseImage.depth !== attrsLength) {
            image.width = baseImage.width;
            image.height = baseImage.height;
            image.depth = attrsLength;
            image.data = new Float32Array(image.width * image.height * image.depth * 4);
        }
        // copy the other texture data into the data array texture
        const { data, width, height } = image;
        for(let i = 0, l = attrsLength; i < l; i++){
            const tex = textures[i];
            const length = width * height * 4;
            const offset = length * i;
            let itemSize = attrs[i].itemSize;
            if (itemSize === 3) itemSize = 4;
            copyArrayToArray(tex.image.data, itemSize, data, 4, offset);
        }
        // reset the texture
        this.dispose();
        this.needsUpdate = true;
    }
}

},{"three":"ktPTu","three-mesh-bvh":"6y2ur","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ctAR3":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MATERIAL_PIXELS", ()=>MATERIAL_PIXELS);
parcelHelpers.export(exports, "MaterialsTexture", ()=>MaterialsTexture);
var _three = require("three");
var _sceneUpdateUtilsJs = require("../core/utils/sceneUpdateUtils.js");
var _bufferToHashJs = require("../utils/bufferToHash.js");
const MATERIAL_PIXELS = 47;
const MATERIAL_STRIDE = MATERIAL_PIXELS * 4;
class MaterialFeatures {
    constructor(){
        this._features = {};
    }
    isUsed(feature) {
        return feature in this._features;
    }
    setUsed(feature, used = true) {
        if (used === false) delete this._features[feature];
        else this._features[feature] = true;
    }
    reset() {
        this._features = {};
    }
}
class MaterialsTexture extends (0, _three.DataTexture) {
    constructor(){
        super(new Float32Array(4), 1, 1);
        this.format = (0, _three.RGBAFormat);
        this.type = (0, _three.FloatType);
        this.wrapS = (0, _three.ClampToEdgeWrapping);
        this.wrapT = (0, _three.ClampToEdgeWrapping);
        this.minFilter = (0, _three.NearestFilter);
        this.magFilter = (0, _three.NearestFilter);
        this.generateMipmaps = false;
        this.features = new MaterialFeatures();
    }
    updateFrom(materials, textures) {
        function getTexture(material, key, def = -1) {
            if (key in material && material[key]) {
                const hash = (0, _sceneUpdateUtilsJs.getTextureHash)(material[key]);
                return textureLookUp[hash];
            } else return def;
        }
        function getField(material, key, def) {
            return key in material ? material[key] : def;
        }
        function writeTextureMatrixToArray(material, textureKey, array, offset) {
            const texture = material[textureKey] && material[textureKey].isTexture ? material[textureKey] : null;
            // check if texture exists
            if (texture) {
                if (texture.matrixAutoUpdate) texture.updateMatrix();
                const elements = texture.matrix.elements;
                let i = 0;
                // first row
                array[offset + i++] = elements[0];
                array[offset + i++] = elements[3];
                array[offset + i++] = elements[6];
                i++;
                // second row
                array[offset + i++] = elements[1];
                array[offset + i++] = elements[4];
                array[offset + i++] = elements[7];
                i++;
            }
            return 8;
        }
        let index = 0;
        const pixelCount = materials.length * MATERIAL_PIXELS;
        const dimension = Math.ceil(Math.sqrt(pixelCount)) || 1;
        const { image, features } = this;
        // index the list of textures based on shareable source
        const textureLookUp = {};
        for(let i = 0, l = textures.length; i < l; i++)textureLookUp[(0, _sceneUpdateUtilsJs.getTextureHash)(textures[i])] = i;
        if (image.width !== dimension) {
            this.dispose();
            image.data = new Float32Array(dimension * dimension * 4);
            image.width = dimension;
            image.height = dimension;
        }
        const floatArray = image.data;
        features.reset();
        for(let i = 0, l = materials.length; i < l; i++){
            const m = materials[i];
            if (m.isFogVolumeMaterial) {
                features.setUsed('FOG');
                for(let j = 0; j < MATERIAL_STRIDE; j++)floatArray[index + j] = 0;
                // sample 0 .rgb
                floatArray[index + 0 + 0] = m.color.r;
                floatArray[index + 0 + 1] = m.color.g;
                floatArray[index + 0 + 2] = m.color.b;
                // sample 2 .a
                floatArray[index + 8 + 3] = getField(m, 'emissiveIntensity', 0.0);
                // sample 3 .rgb
                floatArray[index + 12 + 0] = m.emissive.r;
                floatArray[index + 12 + 1] = m.emissive.g;
                floatArray[index + 12 + 2] = m.emissive.b;
                // sample 13 .g
                // reusing opacity field
                floatArray[index + 52 + 1] = m.density;
                // side
                floatArray[index + 52 + 3] = 0.0;
                // sample 14 .b
                floatArray[index + 56 + 2] = 4;
                index += MATERIAL_STRIDE;
                continue;
            }
            // sample 0
            // color
            floatArray[index++] = m.color.r;
            floatArray[index++] = m.color.g;
            floatArray[index++] = m.color.b;
            floatArray[index++] = getTexture(m, 'map');
            // sample 1
            // metalness & roughness
            floatArray[index++] = getField(m, 'metalness', 0.0);
            floatArray[index++] = getTexture(m, 'metalnessMap');
            floatArray[index++] = getField(m, 'roughness', 0.0);
            floatArray[index++] = getTexture(m, 'roughnessMap');
            // sample 2
            // transmission & emissiveIntensity
            // three.js assumes a default f0 of 0.04 if no ior is provided which equates to an ior of 1.5
            floatArray[index++] = getField(m, 'ior', 1.5);
            floatArray[index++] = getField(m, 'transmission', 0.0);
            floatArray[index++] = getTexture(m, 'transmissionMap');
            floatArray[index++] = getField(m, 'emissiveIntensity', 0.0);
            // sample 3
            // emission
            if ('emissive' in m) {
                floatArray[index++] = m.emissive.r;
                floatArray[index++] = m.emissive.g;
                floatArray[index++] = m.emissive.b;
            } else {
                floatArray[index++] = 0.0;
                floatArray[index++] = 0.0;
                floatArray[index++] = 0.0;
            }
            floatArray[index++] = getTexture(m, 'emissiveMap');
            // sample 4
            // normals
            floatArray[index++] = getTexture(m, 'normalMap');
            if ('normalScale' in m) {
                floatArray[index++] = m.normalScale.x;
                floatArray[index++] = m.normalScale.y;
            } else {
                floatArray[index++] = 1;
                floatArray[index++] = 1;
            }
            // clearcoat
            floatArray[index++] = getField(m, 'clearcoat', 0.0);
            floatArray[index++] = getTexture(m, 'clearcoatMap'); // sample 5
            floatArray[index++] = getField(m, 'clearcoatRoughness', 0.0);
            floatArray[index++] = getTexture(m, 'clearcoatRoughnessMap');
            floatArray[index++] = getTexture(m, 'clearcoatNormalMap');
            // sample 6
            if ('clearcoatNormalScale' in m) {
                floatArray[index++] = m.clearcoatNormalScale.x;
                floatArray[index++] = m.clearcoatNormalScale.y;
            } else {
                floatArray[index++] = 1;
                floatArray[index++] = 1;
            }
            index++;
            floatArray[index++] = getField(m, 'sheen', 0.0);
            // sample 7
            // sheen
            if ('sheenColor' in m) {
                floatArray[index++] = m.sheenColor.r;
                floatArray[index++] = m.sheenColor.g;
                floatArray[index++] = m.sheenColor.b;
            } else {
                floatArray[index++] = 0.0;
                floatArray[index++] = 0.0;
                floatArray[index++] = 0.0;
            }
            floatArray[index++] = getTexture(m, 'sheenColorMap');
            // sample 8
            floatArray[index++] = getField(m, 'sheenRoughness', 0.0);
            floatArray[index++] = getTexture(m, 'sheenRoughnessMap');
            // iridescence
            floatArray[index++] = getTexture(m, 'iridescenceMap');
            floatArray[index++] = getTexture(m, 'iridescenceThicknessMap');
            // sample 9
            floatArray[index++] = getField(m, 'iridescence', 0.0);
            floatArray[index++] = getField(m, 'iridescenceIOR', 1.3);
            const iridescenceThicknessRange = getField(m, 'iridescenceThicknessRange', [
                100,
                400
            ]);
            floatArray[index++] = iridescenceThicknessRange[0];
            floatArray[index++] = iridescenceThicknessRange[1];
            // sample 10
            // specular color
            if ('specularColor' in m) {
                floatArray[index++] = m.specularColor.r;
                floatArray[index++] = m.specularColor.g;
                floatArray[index++] = m.specularColor.b;
            } else {
                floatArray[index++] = 1.0;
                floatArray[index++] = 1.0;
                floatArray[index++] = 1.0;
            }
            floatArray[index++] = getTexture(m, 'specularColorMap');
            // sample 11
            // specular intensity
            floatArray[index++] = getField(m, 'specularIntensity', 1.0);
            floatArray[index++] = getTexture(m, 'specularIntensityMap');
            // isThinFilm
            const isThinFilm = getField(m, 'thickness', 0.0) === 0.0 && getField(m, 'attenuationDistance', Infinity) === Infinity;
            floatArray[index++] = Number(isThinFilm);
            index++;
            // sample 12
            if ('attenuationColor' in m) {
                floatArray[index++] = m.attenuationColor.r;
                floatArray[index++] = m.attenuationColor.g;
                floatArray[index++] = m.attenuationColor.b;
            } else {
                floatArray[index++] = 1.0;
                floatArray[index++] = 1.0;
                floatArray[index++] = 1.0;
            }
            floatArray[index++] = getField(m, 'attenuationDistance', Infinity);
            // sample 13
            // alphaMap
            floatArray[index++] = getTexture(m, 'alphaMap');
            // side & matte
            floatArray[index++] = m.opacity;
            floatArray[index++] = m.alphaTest;
            if (!isThinFilm && m.transmission > 0.0) floatArray[index++] = 0;
            else switch(m.side){
                case 0, _three.FrontSide:
                    floatArray[index++] = 1;
                    break;
                case 0, _three.BackSide:
                    floatArray[index++] = -1;
                    break;
                case 0, _three.DoubleSide:
                    floatArray[index++] = 0;
                    break;
            }
            // sample 14
            floatArray[index++] = Number(getField(m, 'matte', false)); // matte
            floatArray[index++] = Number(getField(m, 'castShadow', true)); // shadow
            floatArray[index++] = Number(m.vertexColors) | Number(m.flatShading) << 1; // vertexColors & flatShading
            floatArray[index++] = Number(m.transparent); // transparent
            // map transform 15
            index += writeTextureMatrixToArray(m, 'map', floatArray, index);
            // metalnessMap transform 17
            index += writeTextureMatrixToArray(m, 'metalnessMap', floatArray, index);
            // roughnessMap transform 19
            index += writeTextureMatrixToArray(m, 'roughnessMap', floatArray, index);
            // transmissionMap transform 21
            index += writeTextureMatrixToArray(m, 'transmissionMap', floatArray, index);
            // emissiveMap transform 22
            index += writeTextureMatrixToArray(m, 'emissiveMap', floatArray, index);
            // normalMap transform 25
            index += writeTextureMatrixToArray(m, 'normalMap', floatArray, index);
            // clearcoatMap transform 27
            index += writeTextureMatrixToArray(m, 'clearcoatMap', floatArray, index);
            // clearcoatNormalMap transform 29
            index += writeTextureMatrixToArray(m, 'clearcoatNormalMap', floatArray, index);
            // clearcoatRoughnessMap transform 31
            index += writeTextureMatrixToArray(m, 'clearcoatRoughnessMap', floatArray, index);
            // sheenColorMap transform 33
            index += writeTextureMatrixToArray(m, 'sheenColorMap', floatArray, index);
            // sheenRoughnessMap transform 35
            index += writeTextureMatrixToArray(m, 'sheenRoughnessMap', floatArray, index);
            // iridescenceMap transform 37
            index += writeTextureMatrixToArray(m, 'iridescenceMap', floatArray, index);
            // iridescenceThicknessMap transform 39
            index += writeTextureMatrixToArray(m, 'iridescenceThicknessMap', floatArray, index);
            // specularColorMap transform 41
            index += writeTextureMatrixToArray(m, 'specularColorMap', floatArray, index);
            // specularIntensityMap transform 43
            index += writeTextureMatrixToArray(m, 'specularIntensityMap', floatArray, index);
            // alphaMap transform 45
            index += writeTextureMatrixToArray(m, 'alphaMap', floatArray, index);
        }
        // check if the contents have changed
        const hash = (0, _bufferToHashJs.bufferToHash)(floatArray.buffer);
        if (this.hash !== hash) {
            this.hash = hash;
            this.needsUpdate = true;
            return true;
        }
        return false;
    }
}

},{"three":"ktPTu","../core/utils/sceneUpdateUtils.js":"cC7mP","../utils/bufferToHash.js":"8v9Fx","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cC7mP":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// we must hash the texture to determine uniqueness using the encoding, as well, because the
// when rendering each texture to the texture array they must have a consistent color space.
parcelHelpers.export(exports, "getTextureHash", ()=>getTextureHash);
parcelHelpers.export(exports, "getIesTextures", ()=>getIesTextures);
parcelHelpers.export(exports, "getTextures", ()=>getTextures);
parcelHelpers.export(exports, "getLights", ()=>getLights);
function uuidSort(a, b) {
    if (a.uuid < b.uuid) return 1;
    if (a.uuid > b.uuid) return -1;
    return 0;
}
function getTextureHash(t) {
    return `${t.source.uuid}:${t.colorSpace}`;
}
// reduce the set of textures to just those with a unique source while retaining
// the order of the textures.
function reduceTexturesToUniqueSources(textures) {
    const sourceSet = new Set();
    const result = [];
    for(let i = 0, l = textures.length; i < l; i++){
        const tex = textures[i];
        const hash = getTextureHash(tex);
        if (!sourceSet.has(hash)) {
            sourceSet.add(hash);
            result.push(tex);
        }
    }
    return result;
}
function getIesTextures(lights) {
    const textures = lights.map((l)=>l.iesMap || null).filter((t)=>t);
    const textureSet = new Set(textures);
    return Array.from(textureSet).sort(uuidSort);
}
function getTextures(materials) {
    const textureSet = new Set();
    for(let i = 0, l = materials.length; i < l; i++){
        const material = materials[i];
        for(const key in material){
            const value = material[key];
            if (value && value.isTexture) textureSet.add(value);
        }
    }
    const textureArray = Array.from(textureSet);
    return reduceTexturesToUniqueSources(textureArray).sort(uuidSort);
}
function getLights(scene) {
    const lights = [];
    scene.traverse((c)=>{
        if (c.visible) {
            if (c.isRectAreaLight || c.isSpotLight || c.isPointLight || c.isDirectionalLight) lights.push(c);
        }
    });
    return lights.sort(uuidSort);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"18sqc":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "RenderTarget2DArray", ()=>RenderTarget2DArray);
var _three = require("three");
var _passJs = require("three/examples/jsm/postprocessing/Pass.js");
const prevColor = new (0, _three.Color)();
function getTextureHash(texture) {
    return texture ? `${texture.uuid}:${texture.version}` : null;
}
function assignOptions(target, options) {
    for(const key in options)if (key in target) target[key] = options[key];
}
class RenderTarget2DArray extends (0, _three.WebGLArrayRenderTarget) {
    constructor(width, height, options){
        const textureOptions = {
            format: (0, _three.RGBAFormat),
            type: (0, _three.UnsignedByteType),
            minFilter: (0, _three.LinearFilter),
            magFilter: (0, _three.LinearFilter),
            wrapS: (0, _three.RepeatWrapping),
            wrapT: (0, _three.RepeatWrapping),
            generateMipmaps: false,
            ...options
        };
        super(width, height, 1, textureOptions);
        // manually assign the options because passing options into the
        // constructor does not work
        assignOptions(this.texture, textureOptions);
        this.texture.setTextures = (...args)=>{
            this.setTextures(...args);
        };
        this.hashes = [
            null
        ];
        const fsQuad = new (0, _passJs.FullScreenQuad)(new CopyMaterial());
        this.fsQuad = fsQuad;
    }
    setTextures(renderer, textures, width = this.width, height = this.height) {
        const prevRenderTarget = renderer.getRenderTarget();
        const prevToneMapping = renderer.toneMapping;
        const prevAlpha = renderer.getClearAlpha();
        renderer.getClearColor(prevColor);
        const depth = textures.length || 1;
        if (width !== this.width || height !== this.height || this.depth !== depth) {
            this.setSize(width, height, depth);
            this.hashes = new Array(depth).fill(null);
        }
        renderer.setClearColor(0, 0);
        renderer.toneMapping = (0, _three.NoToneMapping);
        // render each texture into each layer of the target
        const fsQuad = this.fsQuad;
        const hashes = this.hashes;
        let updated = false;
        for(let i = 0, l = depth; i < l; i++){
            const texture = textures[i];
            const hash = getTextureHash(texture);
            if (texture && (hashes[i] !== hash || texture.isWebGLRenderTarget)) {
                // revert to default texture transform before rendering
                texture.matrixAutoUpdate = false;
                texture.matrix.identity();
                fsQuad.material.map = texture;
                renderer.setRenderTarget(this, i);
                fsQuad.render(renderer);
                // restore custom texture transform
                texture.updateMatrix();
                texture.matrixAutoUpdate = true;
                // ensure textures are not updated unnecessarily
                hashes[i] = hash;
                updated = true;
            }
        }
        // reset the renderer
        fsQuad.material.map = null;
        renderer.setClearColor(prevColor, prevAlpha);
        renderer.setRenderTarget(prevRenderTarget);
        renderer.toneMapping = prevToneMapping;
        return updated;
    }
    dispose() {
        super.dispose();
        this.fsQuad.dispose();
    }
}
class CopyMaterial extends (0, _three.ShaderMaterial) {
    get map() {
        return this.uniforms.map.value;
    }
    set map(v) {
        this.uniforms.map.value = v;
    }
    constructor(){
        super({
            uniforms: {
                map: {
                    value: null
                }
            },
            vertexShader: /* glsl */ `
				varying vec2 vUv;
				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}
			`,
            fragmentShader: /* glsl */ `
				uniform sampler2D map;
				varying vec2 vUv;
				void main() {

					gl_FragColor = texture2D( map, vUv );

				}
			`
        });
    }
}

},{"three":"ktPTu","three/examples/jsm/postprocessing/Pass.js":"i2IfB","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5LOFf":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "StratifiedSamplesTexture", ()=>StratifiedSamplesTexture);
var _three = require("three");
var _stratifiedSamplerCombinedJs = require("./stratified/StratifiedSamplerCombined.js");
class RandomGenerator {
    constructor(seed = 0){
        // LCG using GCC's constants
        this.m = 0x80000000; // 2**31;
        this.a = 1103515245;
        this.c = 12345;
        this.seed = seed;
    }
    nextInt() {
        this.seed = (this.a * this.seed + this.c) % this.m;
        return this.seed;
    }
    nextFloat() {
        // returns in range [0,1]
        return this.nextInt() / (this.m - 1);
    }
}
class StratifiedSamplesTexture extends (0, _three.DataTexture) {
    constructor(count = 1, depth = 1, strata = 8){
        super(new Float32Array(1), 1, 1, (0, _three.RGBAFormat), (0, _three.FloatType));
        this.minFilter = (0, _three.NearestFilter);
        this.magFilter = (0, _three.NearestFilter);
        this.strata = strata;
        this.sampler = null;
        this.generator = new RandomGenerator();
        this.stableNoise = false;
        this.random = ()=>{
            if (this.stableNoise) return this.generator.nextFloat();
            else return Math.random();
        };
        this.init(count, depth, strata);
    }
    init(count = this.image.height, depth = this.image.width, strata = this.strata) {
        const { image } = this;
        if (image.width === depth && image.height === count && this.sampler !== null) return;
        const dimensions = new Array(count * depth).fill(4);
        const sampler = new (0, _stratifiedSamplerCombinedJs.StratifiedSamplerCombined)(strata, dimensions, this.random);
        image.width = depth;
        image.height = count;
        image.data = sampler.samples;
        this.sampler = sampler;
        this.dispose();
        this.next();
    }
    next() {
        this.sampler.next();
        this.needsUpdate = true;
    }
    reset() {
        this.sampler.reset();
        this.generator.seed = 0;
    }
}

},{"three":"ktPTu","./stratified/StratifiedSamplerCombined.js":"9LVx4","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9LVx4":[function(require,module,exports,__globalThis) {
// Stratified Sampling based on implementation from hoverinc pathtracer
// - https://github.com/hoverinc/ray-tracing-renderer
// - http://www.pbr-book.org/3ed-2018/Sampling_and_Reconstruction/Stratified_Sampling.html
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// Stratified set of data with each tuple stratified separately and combined
parcelHelpers.export(exports, "StratifiedSamplerCombined", ()=>StratifiedSamplerCombined);
var _stratifiedSamplerJs = require("./StratifiedSampler.js");
class StratifiedSamplerCombined {
    constructor(strataCount, listOfDimensions, random = Math.random){
        let totalDim = 0;
        for (const dim of listOfDimensions)totalDim += dim;
        const combined = new Float32Array(totalDim);
        const strataObjs = [];
        let offset = 0;
        for (const dim of listOfDimensions){
            const sampler = new (0, _stratifiedSamplerJs.StratifiedSampler)(strataCount, dim, random);
            sampler.samples = new Float32Array(combined.buffer, offset, sampler.samples.length);
            offset += sampler.samples.length * 4;
            strataObjs.push(sampler);
        }
        this.samples = combined;
        this.strataCount = strataCount;
        this.next = function() {
            for (const strata of strataObjs)strata.next();
            return combined;
        };
        this.reshuffle = function() {
            for (const strata of strataObjs)strata.reshuffle();
        };
        this.reset = function() {
            for (const strata of strataObjs)strata.reset();
        };
    }
}

},{"./StratifiedSampler.js":"3NZ6v","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3NZ6v":[function(require,module,exports,__globalThis) {
// Stratified Sampling based on implementation from hoverinc pathtracer
// - https://github.com/hoverinc/ray-tracing-renderer
// - http://www.pbr-book.org/3ed-2018/Sampling_and_Reconstruction/Stratified_Sampling.html
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "shuffle", ()=>shuffle);
// strataCount : The number of bins per dimension
// dimensions  : The number of dimensions to generate stratified values for
parcelHelpers.export(exports, "StratifiedSampler", ()=>StratifiedSampler);
function shuffle(arr, random = Math.random()) {
    for(let i = arr.length - 1; i > 0; i--){
        const j = Math.floor(random() * (i + 1));
        const x = arr[i];
        arr[i] = arr[j];
        arr[j] = x;
    }
    return arr;
}
class StratifiedSampler {
    constructor(strataCount, dimensions, random = Math.random){
        const l = strataCount ** dimensions;
        const strata = new Uint16Array(l);
        let index = l;
        // each integer represents a statum bin
        for(let i = 0; i < l; i++)strata[i] = i;
        this.samples = new Float32Array(dimensions);
        this.strataCount = strataCount;
        this.reset = function() {
            for(let i = 0; i < l; i++)strata[i] = i;
            index = 0;
        };
        this.reshuffle = function() {
            index = 0;
        };
        this.next = function() {
            const { samples } = this;
            if (index >= strata.length) {
                shuffle(strata, random);
                this.reshuffle();
            }
            let stratum = strata[index++];
            for(let i = 0; i < dimensions; i++){
                samples[i] = (stratum % strataCount + random()) / strataCount;
                stratum = Math.floor(stratum / strataCount);
            }
            return samples;
        };
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aCALq":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "BlueNoiseTexture", ()=>BlueNoiseTexture);
var _three = require("three");
var _blueNoiseGeneratorJs = require("./blueNoise/BlueNoiseGenerator.js");
function getStride(channels) {
    if (channels >= 3) return 4;
    else return channels;
}
function getFormat(channels) {
    if (channels == 1) return 0, _three.RedFormat;
    else if (channels == 2) return 0, _three.RGFormat;
    else return 0, _three.RGBAFormat;
}
class BlueNoiseTexture extends (0, _three.DataTexture) {
    constructor(size = 64, channels = 1){
        super(new Float32Array(4), 1, 1, (0, _three.RGBAFormat), (0, _three.FloatType));
        this.minFilter = (0, _three.NearestFilter);
        this.magFilter = (0, _three.NearestFilter);
        this.size = size;
        this.channels = channels;
        this.update();
    }
    update() {
        const channels = this.channels;
        const size = this.size;
        const generator = new (0, _blueNoiseGeneratorJs.BlueNoiseGenerator)();
        generator.channels = channels;
        generator.size = size;
        const stride = getStride(channels);
        const format = getFormat(stride);
        if (this.image.width !== size || format !== this.format) {
            this.image.width = size;
            this.image.height = size;
            this.image.data = new Float32Array(size ** 2 * stride);
            this.format = format;
            this.dispose();
        }
        const data = this.image.data;
        for(let i = 0, l = channels; i < l; i++){
            const result = generator.generate();
            const bin = result.data;
            const maxValue = result.maxValue;
            for(let j = 0, l2 = bin.length; j < l2; j++){
                const value = bin[j] / maxValue;
                data[j * stride + i] = value;
            }
        }
        this.needsUpdate = true;
    }
}

},{"three":"ktPTu","./blueNoise/BlueNoiseGenerator.js":"j2gQJ","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"j2gQJ":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "BlueNoiseGenerator", ()=>BlueNoiseGenerator);
var _utilsJs = require("./utils.js");
var _blueNoiseSamplesJs = require("./BlueNoiseSamples.js");
class BlueNoiseGenerator {
    constructor(){
        this.random = Math.random;
        this.sigma = 1.5;
        this.size = 64;
        this.majorityPointsRatio = 0.1;
        this.samples = new (0, _blueNoiseSamplesJs.BlueNoiseSamples)(1);
        this.savedSamples = new (0, _blueNoiseSamplesJs.BlueNoiseSamples)(1);
    }
    generate() {
        // http://cv.ulichney.com/papers/1993-void-cluster.pdf
        const { samples, savedSamples, sigma, majorityPointsRatio, size } = this;
        samples.resize(size);
        samples.setSigma(sigma);
        // 1. Randomly place the minority points.
        const pointCount = Math.floor(size * size * majorityPointsRatio);
        const initialSamples = samples.binaryPattern;
        (0, _utilsJs.fillWithOnes)(initialSamples, pointCount);
        (0, _utilsJs.shuffleArray)(initialSamples, this.random);
        for(let i = 0, l = initialSamples.length; i < l; i++)if (initialSamples[i] === 1) samples.addPointIndex(i);
        // 2. Remove minority point that is in densest cluster and place it in the largest void.
        while(true){
            const clusterIndex = samples.findCluster();
            samples.removePointIndex(clusterIndex);
            const voidIndex = samples.findVoid();
            if (clusterIndex === voidIndex) {
                samples.addPointIndex(clusterIndex);
                break;
            }
            samples.addPointIndex(voidIndex);
        }
        // 3. PHASE I: Assign a rank to each progressively less dense cluster point and put it
        // in the dither array.
        const ditherArray = new Uint32Array(size * size);
        savedSamples.copy(samples);
        let rank;
        rank = samples.count - 1;
        while(rank >= 0){
            const clusterIndex = samples.findCluster();
            samples.removePointIndex(clusterIndex);
            ditherArray[clusterIndex] = rank;
            rank--;
        }
        // 4. PHASE II: Do the same thing for the largest voids up to half of the total pixels using
        // the initial binary pattern.
        const totalSize = size * size;
        rank = savedSamples.count;
        while(rank < totalSize / 2){
            const voidIndex = savedSamples.findVoid();
            savedSamples.addPointIndex(voidIndex);
            ditherArray[voidIndex] = rank;
            rank++;
        }
        // 5. PHASE III: Invert the pattern and finish out by assigning a rank to the remaining
        // and iteratively removing them.
        savedSamples.invert();
        while(rank < totalSize){
            const clusterIndex = savedSamples.findCluster();
            savedSamples.removePointIndex(clusterIndex);
            ditherArray[clusterIndex] = rank;
            rank++;
        }
        return {
            data: ditherArray,
            maxValue: totalSize
        };
    }
}

},{"./utils.js":"9rbhf","./BlueNoiseSamples.js":"lf9Bj","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9rbhf":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "shuffleArray", ()=>shuffleArray);
parcelHelpers.export(exports, "fillWithOnes", ()=>fillWithOnes);
function shuffleArray(array, random = Math.random) {
    for(let i = array.length - 1; i > 0; i--){
        const replaceIndex = ~~((random() - 1e-6) * i);
        const tmp = array[i];
        array[i] = array[replaceIndex];
        array[replaceIndex] = tmp;
    }
}
function fillWithOnes(array, count) {
    array.fill(0);
    for(let i = 0; i < count; i++)array[i] = 1;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lf9Bj":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "BlueNoiseSamples", ()=>BlueNoiseSamples);
class BlueNoiseSamples {
    constructor(size){
        this.count = 0;
        this.size = -1;
        this.sigma = -1;
        this.radius = -1;
        this.lookupTable = null;
        this.score = null;
        this.binaryPattern = null;
        this.resize(size);
        this.setSigma(1.5);
    }
    findVoid() {
        const { score, binaryPattern } = this;
        let currValue = Infinity;
        let currIndex = -1;
        for(let i = 0, l = binaryPattern.length; i < l; i++){
            if (binaryPattern[i] !== 0) continue;
            const pScore = score[i];
            if (pScore < currValue) {
                currValue = pScore;
                currIndex = i;
            }
        }
        return currIndex;
    }
    findCluster() {
        const { score, binaryPattern } = this;
        let currValue = -Infinity;
        let currIndex = -1;
        for(let i = 0, l = binaryPattern.length; i < l; i++){
            if (binaryPattern[i] !== 1) continue;
            const pScore = score[i];
            if (pScore > currValue) {
                currValue = pScore;
                currIndex = i;
            }
        }
        return currIndex;
    }
    setSigma(sigma) {
        if (sigma === this.sigma) return;
        // generate a radius in which the score will be updated under the
        // assumption that e^-10 is insignificant enough to be the border at
        // which we drop off.
        const radius = ~~(Math.sqrt(20 * sigma ** 2) + 1);
        const lookupWidth = 2 * radius + 1;
        const lookupTable = new Float32Array(lookupWidth * lookupWidth);
        const sigma2 = sigma * sigma;
        for(let x = -radius; x <= radius; x++)for(let y = -radius; y <= radius; y++){
            const index = (radius + y) * lookupWidth + x + radius;
            const dist2 = x * x + y * y;
            lookupTable[index] = Math.E ** (-dist2 / (2 * sigma2));
        }
        this.lookupTable = lookupTable;
        this.sigma = sigma;
        this.radius = radius;
    }
    resize(size) {
        if (this.size !== size) {
            this.size = size;
            this.score = new Float32Array(size * size);
            this.binaryPattern = new Uint8Array(size * size);
        }
    }
    invert() {
        const { binaryPattern, score, size } = this;
        score.fill(0);
        for(let i = 0, l = binaryPattern.length; i < l; i++)if (binaryPattern[i] === 0) {
            const y = ~~(i / size);
            const x = i - y * size;
            this.updateScore(x, y, 1);
            binaryPattern[i] = 1;
        } else binaryPattern[i] = 0;
    }
    updateScore(x, y, multiplier) {
        // TODO: Is there a way to keep track of the highest and lowest scores here to avoid have to search over
        // everything in the buffer?
        const { size, score, lookupTable } = this;
        // const sigma2 = sigma * sigma;
        // const radius = Math.floor( size / 2 );
        const radius = this.radius;
        const lookupWidth = 2 * radius + 1;
        for(let px = -radius; px <= radius; px++)for(let py = -radius; py <= radius; py++){
            // const dist2 = px * px + py * py;
            // const value = Math.E ** ( - dist2 / ( 2 * sigma2 ) );
            const lookupIndex = (radius + py) * lookupWidth + px + radius;
            const value = lookupTable[lookupIndex];
            let sx = x + px;
            sx = sx < 0 ? size + sx : sx % size;
            let sy = y + py;
            sy = sy < 0 ? size + sy : sy % size;
            const sindex = sy * size + sx;
            score[sindex] += multiplier * value;
        }
    }
    addPointIndex(index) {
        this.binaryPattern[index] = 1;
        const size = this.size;
        const y = ~~(index / size);
        const x = index - y * size;
        this.updateScore(x, y, 1);
        this.count++;
    }
    removePointIndex(index) {
        this.binaryPattern[index] = 0;
        const size = this.size;
        const y = ~~(index / size);
        const x = index - y * size;
        this.updateScore(x, y, -1);
        this.count--;
    }
    copy(source) {
        this.resize(source.size);
        this.score.set(source.score);
        this.binaryPattern.set(source.binaryPattern);
        this.setSigma(source.sigma);
        this.count = source.count;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iyhzw":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _insideFogVolumeFunctionGlslJs = require("./inside_fog_volume_function.glsl.js");
parcelHelpers.exportAll(_insideFogVolumeFunctionGlslJs, exports);
var _rayAnyHitFunctionGlslJs = require("./ray_any_hit_function.glsl.js");
parcelHelpers.exportAll(_rayAnyHitFunctionGlslJs, exports);

},{"./inside_fog_volume_function.glsl.js":"6hO6E","./ray_any_hit_function.glsl.js":"6EQ7o","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6hO6E":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "inside_fog_volume_function", ()=>inside_fog_volume_function);
const inside_fog_volume_function = /* glsl */ `

	#ifndef FOG_CHECK
	#define FOG_CHECK 30
	#endif

	bool isMaterialFogVolume( sampler2D materials, uint materialIndex ) {

		uint i = materialIndex * uint( MATERIAL_PIXELS );
		vec4 s14 = texelFetch1D( materials, i + 14u );
		return bool( int( s14.b ) & 4 );

	}

	// \u{5224}\u{65AD}\u{662F}\u{5426}\u{5728}\u{7B2C}\u{4E00}\u{6B21}\u{4E0E}\u{96FE}\u{4F53}\u{76F8}\u{4EA4}\u{7684}\u{5730}\u{65B9}
	bool bvhIntersectFogVolumeHit(
		vec3 rayOrigin, vec3 rayDirection,
		usampler2D materialIndexAttribute, sampler2D materials,
		inout Material material
	) {
		material.fogVolume = false;

		// \u{5C04}\u{7EBF}\u{4E0E}\u{96FE}\u{4F53}\u{76F8}\u{4EA4}\u{7684}\u{6700}\u{5927}\u{68C0}\u{67E5}\u{6B21}\u{6570}
		for ( int i = 0; i < FOG_CHECK; i ++ ) {

			// \u{67E5}\u{627E}\u{6700}\u{8FD1}\u{7684}\u{4EA4}\u{70B9}
			uvec4 faceIndices = uvec4( 0u );
			vec3 faceNormal = vec3( 0.0, 0.0, 1.0 );
			vec3 barycoord = vec3( 0.0 );
			float side = 1.0;
			float dist = 0.0;
			// \u{8BA1}\u{7B97}\u{5C04}\u{7EBF}\u{4E0E} BVH\u{FF08}\u{5305}\u{56F4}\u{4F53}\u{5C42}\u{6B21}\u{FF09}\u{52A0}\u{901F}\u{7ED3}\u{6784}\u{7684}\u{4EA4}\u{70B9}
			bool hit = bvhIntersectFirstHit( bvh, rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist );
			if ( hit ) {
				uint materialIndex = uTexelFetch1D( materialIndexAttribute, faceIndices.x ).r;
				if ( isMaterialFogVolume( materials, materialIndex ) ) {
					material = readMaterialInfo( materials, materialIndex );
					return side == - 1.0;
				} 
				else {
					rayOrigin = stepRayOrigin( rayOrigin, rayDirection, - faceNormal, dist );
				}
			} 
			else {
				return false;
			}
		}
		return false;
	}

`;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6EQ7o":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ray_any_hit_function", ()=>ray_any_hit_function);
const ray_any_hit_function = /* glsl */ `

	bool bvhIntersectAnyHit(
		vec3 rayOrigin, vec3 rayDirection,
		inout float side, inout float dist
	) {

		uvec4 faceIndices;
		vec3 faceNormal;
		vec3 barycoord;

		int ptr = 0;
		uint stack[ 60 ];
		stack[ 0 ] = 0u;

		float triangleDistance = 1e20;
		while ( ptr > - 1 && ptr < 60 ) {
			uint currNodeIndex = stack[ ptr ];
			ptr --;
			float boundsHitDistance = intersectsBVHNodeBounds( rayOrigin, rayDirection, bvh, currNodeIndex );
			if ( boundsHitDistance == INFINITY ) {
				continue;
			}
			uvec2 boundsInfo = uTexelFetch1D( bvh.bvhContents, currNodeIndex ).xy;
			bool isLeaf = bool( boundsInfo.x & 0xffff0000u );

			if ( isLeaf ) {
				uint count = boundsInfo.x & 0x0000ffffu;
				uint offset = boundsInfo.y;
				bool found = intersectTriangles(
					bvh, rayOrigin, rayDirection, offset, count, triangleDistance,
					faceIndices, faceNormal, barycoord, side, dist
				);
				if ( found ) {
					return true;
				}
			}
			else {
				uint leftIndex = currNodeIndex + 1u;
				uint splitAxis = boundsInfo.x & 0x0000ffffu;
				uint rightIndex = boundsInfo.y;
				ptr ++;
				stack[ ptr ] = leftIndex;
				ptr ++;
				stack[ ptr ] = rightIndex;
			}
		}
		return false;
	}
`;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5BM54":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _attenuateHitFunctionGlslJs = require("./attenuate_hit_function.glsl.js");
parcelHelpers.exportAll(_attenuateHitFunctionGlslJs, exports);
var _cameraUtilFunctionsGlslJs = require("./camera_util_functions.glsl.js");
parcelHelpers.exportAll(_cameraUtilFunctionsGlslJs, exports);
var _directLightContributionFunctionGlslJs = require("./direct_light_contribution_function.glsl.js");
parcelHelpers.exportAll(_directLightContributionFunctionGlslJs, exports);
var _getSurfaceRecordFunctionGlslJs = require("./get_surface_record_function.glsl.js");
parcelHelpers.exportAll(_getSurfaceRecordFunctionGlslJs, exports);
var _renderStructsGlslJs = require("./render_structs.glsl.js");
parcelHelpers.exportAll(_renderStructsGlslJs, exports);
var _traceSceneFunctionGlslJs = require("./trace_scene_function.glsl.js");
parcelHelpers.exportAll(_traceSceneFunctionGlslJs, exports);

},{"./attenuate_hit_function.glsl.js":"1Cki6","./camera_util_functions.glsl.js":"hhC6A","./direct_light_contribution_function.glsl.js":"fTUFC","./get_surface_record_function.glsl.js":"faSGg","./render_structs.glsl.js":"a7xU2","./trace_scene_function.glsl.js":"b7Dry","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1Cki6":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "attenuate_hit_function", ()=>attenuate_hit_function);
const attenuate_hit_function = /* glsl */ `

	bool attenuateHit(RenderState state,Ray ray, float rayDist,out vec3 color) 
	{
		uint originalBounceIndex = sobolBounceIndex;

		int traversals = state.traversals;
		int transmissiveTraversals = state.transmissiveTraversals;
		bool isShadowRay = state.isShadowRay;
		Material fogMaterial = state.fogMaterial;

		vec3 startPoint = ray.origin;

		SurfaceHit surfaceHit;

		color = vec3( 1.0 );

		bool result = true;
		for ( int i = 0; i < traversals; i ++ ) {

			sobolBounceIndex ++;

			int hitType = traceScene( ray, fogMaterial, surfaceHit );

			if ( hitType == FOG_HIT ) {

				result = true;
				break;

			} else if ( hitType == SURFACE_HIT ) {

				float totalDist = distance( startPoint, ray.origin + ray.direction * surfaceHit.dist );
				if ( totalDist > rayDist ) {

					result = false;
					break;

				}


				uint materialIndex = uTexelFetch1D( materialIndexAttribute, surfaceHit.faceIndices.x ).r;
				Material material = readMaterialInfo( materials, materialIndex );

				bool isEntering = surfaceHit.side == 1.0;
				ray.origin = stepRayOrigin( ray.origin, ray.direction, - surfaceHit.faceNormal, surfaceHit.dist );

				#if FEATURE_FOG

				if ( material.fogVolume ) {

					fogMaterial = material;
					fogMaterial.fogVolume = surfaceHit.side == 1.0;
					i -= sign( transmissiveTraversals );
					transmissiveTraversals --;
					continue;

				}

				#endif

				if ( ! material.castShadow && isShadowRay ) {

					continue;

				}

				vec2 uv = textureSampleBarycoord( attributesArray, ATTR_UV, surfaceHit.barycoord, surfaceHit.faceIndices.xyz ).xy;
				vec4 vertexColor = textureSampleBarycoord( attributesArray, ATTR_COLOR, surfaceHit.barycoord, surfaceHit.faceIndices.xyz );

				// albedo
				vec4 albedo = vec4( material.color, material.opacity );
				if ( material.map != - 1 ) {

					vec3 uvPrime = material.mapTransform * vec3( uv, 1 );
					albedo *= texture2D( textures, vec3( uvPrime.xy, material.map ) );

				}

				if ( material.vertexColors ) {

					albedo *= vertexColor;

				}

				// alphaMap
				if ( material.alphaMap != - 1 ) {

					vec3 uvPrime = material.alphaMapTransform * vec3( uv, 1 );
					albedo.a *= texture2D( textures, vec3( uvPrime.xy, material.alphaMap ) ).x;

				}

				// transmission
				float transmission = material.transmission;
				if ( material.transmissionMap != - 1 ) {

					vec3 uvPrime = material.transmissionMapTransform * vec3( uv, 1 );
					transmission *= texture2D( textures, vec3( uvPrime.xy, material.transmissionMap ) ).r;

				}

				// metalness
				float metalness = material.metalness;
				if ( material.metalnessMap != - 1 ) {

					vec3 uvPrime = material.metalnessMapTransform * vec3( uv, 1 );
					metalness *= texture2D( textures, vec3( uvPrime.xy, material.metalnessMap ) ).b;

				}

				float alphaTest = material.alphaTest;
				bool useAlphaTest = alphaTest != 0.0;
				float transmissionFactor = ( 1.0 - metalness ) * transmission;
				if (
					transmissionFactor < rand( 9 ) && ! (
						material.side != 0.0 && surfaceHit.side == material.side
						|| useAlphaTest && albedo.a < alphaTest
						|| material.transparent && ! useAlphaTest && albedo.a < rand( 10 )
					)
				) {
					result = true;
					break;
				}

				if ( surfaceHit.side == 1.0 && isEntering ) {
					color *= mix( vec3( 1.0 ), albedo.rgb, transmissionFactor );
				} 
				else if ( surfaceHit.side == - 1.0 ) {
					color *= transmissionAttenuation( surfaceHit.dist, material.attenuationColor, material.attenuationDistance );

				}

				bool isTransmissiveRay = dot( ray.direction, surfaceHit.faceNormal * surfaceHit.side ) < 0.0;
				if ( ( isTransmissiveRay || isEntering ) && transmissiveTraversals > 0 ) {

					i -= sign( transmissiveTraversals );
					transmissiveTraversals --;

				}

			} else {

				result = false;
				break;

			}

		}
		sobolBounceIndex = originalBounceIndex;
		return result;
	}

`;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hhC6A":[function(require,module,exports,__globalThis) {
//生成一个从相机发出的光线（可算写到你了）
//最终返回一个描述该光线起点和方向的 Ray 对象
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "camera_util_functions", ()=>camera_util_functions);
const camera_util_functions = /* glsl */ `

    // \u{5C06}NDC\u{5750}\u{6807}\u{8F6C}\u{6362}\u{4E3A}\u{5149}\u{7EBF}\u{8D77}\u{70B9}
    vec3 ndcToRayOrigin( vec2 coord ) {
        vec4 rayOrigin4 = cameraWorldMatrix * invProjectionMatrix * vec4( coord, - 1.0, 1.0 );
        return rayOrigin4.xyz / rayOrigin4.w;
    }

    // \u{83B7}\u{53D6}\u{76F8}\u{673A}\u{5149}\u{7EBF}
    Ray getCameraRay() {
        vec2 ssd = vec2( 1.0 ) / resolution;

        // \u{4F7F}\u{7528}\u{6297}\u{952F}\u{9F7F}\u{FF08}AA\u{FF09}\u{5BF9}\u{76F8}\u{673A}\u{5149}\u{7EBF}\u{8FDB}\u{884C}\u{6296}\u{52A8}\u{FF0C}\u{968F}\u{673A}\u{9009}\u{62E9}\u{4E00}\u{4E2A}\u{50CF}\u{7D20}\u{9644}\u{8FD1}\u{7684}UV\u{5750}\u{6807}
        vec2 ruv = rand2( 0 );
        vec2 jitteredUv = vUv + vec2( tentFilter( ruv.x ) * ssd.x, tentFilter( ruv.y ) * ssd.y );
        Ray ray;

        #if CAMERA_TYPE == 2

            // \u{5904}\u{7406}\u{7B49}\u{8DDD}\u{6295}\u{5F71}\u{FF08}Equirectangular projection\u{FF09}
            vec4 rayDirection4 = vec4( equirectUvToDirection( jitteredUv ), 0.0 );
            vec4 rayOrigin4 = vec4( 0.0, 0.0, 0.0, 1.0 );

            // \u{5C06}\u{76F8}\u{673A}\u{4E16}\u{754C}\u{77E9}\u{9635}\u{5E94}\u{7528}\u{5230}\u{5149}\u{7EBF}\u{65B9}\u{5411}\u{548C}\u{5149}\u{7EBF}\u{539F}\u{70B9}
            rayDirection4 = cameraWorldMatrix * rayDirection4;
            rayOrigin4 = cameraWorldMatrix * rayOrigin4;

            // \u{5F52}\u{4E00}\u{5316}\u{5149}\u{7EBF}\u{65B9}\u{5411}
            ray.direction = normalize( rayDirection4.xyz );
            ray.origin = rayOrigin4.xyz / rayOrigin4.w;

        #else

            // \u{83B7}\u{53D6}\u{5F52}\u{4E00}\u{5316}\u{8BBE}\u{5907}\u{5750}\u{6807}\u{FF08}NDC\u{FF09}\u{FF0C}\u{8303}\u{56F4}\u{4E3A}[-1, 1]
            vec2 ndc = 2.0 * jitteredUv - vec2( 1.0 );
            ray.origin = ndcToRayOrigin( ndc );

            #if CAMERA_TYPE == 1

                // \u{5904}\u{7406}\u{6B63}\u{5C04}\u{6295}\u{5F71}\u{FF08}Orthographic projection\u{FF09}
                ray.direction = ( cameraWorldMatrix * vec4( 0.0, 0.0, - 1.0, 0.0 ) ).xyz;
                ray.direction = normalize( ray.direction );

            #else

                // \u{900F}\u{89C6}\u{6295}\u{5F71}\u{FF08}Perspective projection\u{FF09}
                ray.direction = normalize( mat3( cameraWorldMatrix ) * ( invProjectionMatrix * vec4( ndc, 0.0, 1.0 ) ).xyz );

            #endif

        #endif

        #if FEATURE_DOF
        {

            // \u{666F}\u{6DF1}\u{6548}\u{679C}\u{FF08}Depth of Field\u{FF09}
            vec3 focalPoint = ray.origin + normalize( ray.direction ) * physicalCamera.focusDistance;

            // \u{83B7}\u{53D6}\u{5149}\u{5708}\u{6837}\u{672C}
            // \u{5982}\u{679C}\u{5149}\u{5708}\u{53F6}\u{7247}\u{6570}\u{4E3A}0\u{FF0C}\u{5047}\u{8BBE}\u{4F7F}\u{7528}\u{5706}\u{5F62}\u{5149}\u{5708}
            vec3 shapeUVW = rand3( 1 );
            int blades = physicalCamera.apertureBlades;
            float anamorphicRatio = physicalCamera.anamorphicRatio;
            vec2 apertureSample = blades == 0 ? sampleCircle( shapeUVW.xy ) : sampleRegularPolygon( blades, shapeUVW );
            apertureSample *= physicalCamera.bokehSize * 0.5 * 1e-3;

            // \u{65CB}\u{8F6C}\u{5149}\u{5708}\u{5F62}\u{72B6}
            apertureSample =
                rotateVector( apertureSample, physicalCamera.apertureRotation ) *
                saturate( vec2( anamorphicRatio, 1.0 / anamorphicRatio ) );

            // \u{521B}\u{5EFA}\u{65B0}\u{7684}\u{5149}\u{7EBF}\u{FF0C}\u{5149}\u{7EBF}\u{8D77}\u{70B9}\u{7A0D}\u{5FAE}\u{8C03}\u{6574}
            ray.origin += ( cameraWorldMatrix * vec4( apertureSample, 0.0, 0.0 ) ).xyz;
            ray.direction = focalPoint - ray.origin;

        }
        #endif

        // \u{786E}\u{4FDD}\u{5149}\u{7EBF}\u{65B9}\u{5411}\u{662F}\u{5355}\u{4F4D}\u{5411}\u{91CF}
        ray.direction = normalize( ray.direction );

        return ray;

    }

`;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fTUFC":[function(require,module,exports,__globalThis) {
//计算直接光照的贡献，包括从环境光或场景中的光源
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "direct_light_contribution_function", ()=>direct_light_contribution_function);
const direct_light_contribution_function = /*glsl*/ `

	vec3 directLightContribution( vec3 worldWo, SurfaceRecord surf, RenderState state, vec3 rayOrigin ) {

		vec3 result = vec3( 0.0 );

		// \u{968F}\u{673A}\u{9009}\u{62E9}\u{4E00}\u{4E2A}\u{5149}\u{6E90}\u{6216}\u{73AF}\u{5883}\u{8D34}\u{56FE}
		if( lightsDenom != 0.0 && rand( 5 ) < float( lights.count ) / lightsDenom ) {

			// \u{4ECE}\u{5149}\u{6E90}\u{6216}\u{73AF}\u{5883}\u{4E2D}\u{91C7}\u{6837}
			LightRecord lightRec = randomLightSample( lights.tex, iesProfiles, lights.count, rayOrigin, rand3( 6 ) );
			bool isSampleBelowSurface = !surf.volumeParticle && dot( surf.faceNormal, lightRec.direction ) < 0.0;

			if (isSampleBelowSurface) {
				lightRec.pdf = 0.0; // \u{5982}\u{679C}\u{91C7}\u{6837}\u{5728}\u{8868}\u{9762}\u{80CC}\u{9762}\u{FF0C}\u{5C06}\u{5176} PDF \u{8BBE}\u{7F6E}\u{4E3A} 0
			}

			// \u{68C0}\u{67E5}\u{5149}\u{7EBF}\u{662F}\u{5426}\u{80FD}\u{5230}\u{8FBE}\u{5149}\u{6E90}
			Ray lightRay = Ray(rayOrigin, lightRec.direction);
			vec3 attenuatedColor;
			if (lightRec.pdf > 0.0 && isDirectionValid( lightRec.direction, surf.normal, surf.faceNormal ) && !attenuateHit( state, lightRay, lightRec.dist, attenuatedColor )) {

				// \u{8BA1}\u{7B97}\u{6750}\u{8D28}\u{7684} PDF
				vec3 sampleColor;
				float lightMaterialPdf = bsdfResult( worldWo, lightRec.direction, surf, sampleColor );
				if (lightMaterialPdf > 0.0 && all( greaterThanEqual( sampleColor, vec3( 0.0 ) ) )) {

					// \u{52A0}\u{6743}\u{8BA1}\u{7B97}\u{76F4}\u{63A5}\u{5149}\u{7167}\u{8D21}\u{732E}
					float lightPdf = lightRec.pdf / lightsDenom;
					float misWeight = (lightRec.type == SPOT_LIGHT_TYPE || lightRec.type == DIR_LIGHT_TYPE || lightRec.type == POINT_LIGHT_TYPE) ? 1.0 : misHeuristic( lightPdf, lightMaterialPdf );
					result = attenuatedColor * lightRec.emission * state.throughputColor * sampleColor * misWeight / lightPdf;
				}
			}

		} 
		else if (envMapInfo.totalSum != 0.0 && environmentIntensity != 0.0) {
			// \u{4ECE}\u{73AF}\u{5883}\u{8D34}\u{56FE}\u{4E2D}\u{91C7}\u{6837}
			vec3 envColor, envDirection;
			float envPdf = sampleEquirectProbability( rand2( 7 ), envColor, envDirection );
			envDirection = invEnvRotation3x3 * envDirection;

			bool isSampleBelowSurface = !surf.volumeParticle && dot( surf.faceNormal, envDirection ) < 0.0;
			if (isSampleBelowSurface) {
				envPdf = 0.0; // \u{5982}\u{679C}\u{91C7}\u{6837}\u{5728}\u{8868}\u{9762}\u{80CC}\u{9762}\u{FF0C}\u{5C06}\u{5176} PDF \u{8BBE}\u{7F6E}\u{4E3A} 0
			}

			// \u{68C0}\u{67E5}\u{5149}\u{7EBF}\u{662F}\u{5426}\u{80FD}\u{5230}\u{8FBE}\u{73AF}\u{5883}
			Ray envRay = Ray(rayOrigin, envDirection);
			vec3 attenuatedColor;
			if (envPdf > 0.0 && isDirectionValid( envDirection, surf.normal, surf.faceNormal ) && !attenuateHit( state, envRay, INFINITY, attenuatedColor )) {

				// \u{8BA1}\u{7B97}\u{6750}\u{8D28}\u{7684} PDF
				vec3 sampleColor;
				float envMaterialPdf = bsdfResult( worldWo, envDirection, surf, sampleColor );
				if (envMaterialPdf > 0.0 && all( greaterThanEqual( sampleColor, vec3( 0.0 ) ) )) {

					// \u{52A0}\u{6743}\u{8BA1}\u{7B97}\u{76F4}\u{63A5}\u{5149}\u{7167}\u{8D21}\u{732E}
					envPdf /= lightsDenom;
					float misWeight = misHeuristic( envPdf, envMaterialPdf );
					result = attenuatedColor * environmentIntensity * envColor * state.throughputColor * sampleColor * misWeight / envPdf;
				}
			}

		}
		return result;
	}
`;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"faSGg":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "get_surface_record_function", ()=>get_surface_record_function);
const get_surface_record_function = /* glsl */ `

	#define SKIP_SURFACE 0
	#define HIT_SURFACE 1
	int getSurfaceRecord(
		Material material, SurfaceHit surfaceHit, sampler2DArray attributesArray,
		float accumulatedRoughness,
		inout SurfaceRecord surf
	) {

		if ( material.fogVolume ) {

			vec3 normal = vec3( 0, 0, 1 );

			SurfaceRecord fogSurface;
			fogSurface.volumeParticle = true;
			fogSurface.color = material.color;
			fogSurface.emission = material.emissiveIntensity * material.emissive;
			fogSurface.normal = normal;
			fogSurface.faceNormal = normal;
			fogSurface.clearcoatNormal = normal;

			surf = fogSurface;
			return HIT_SURFACE;

		}

		// uv coord for textures
		vec2 uv = textureSampleBarycoord( attributesArray, ATTR_UV, surfaceHit.barycoord, surfaceHit.faceIndices.xyz ).xy;
		vec4 vertexColor = textureSampleBarycoord( attributesArray, ATTR_COLOR, surfaceHit.barycoord, surfaceHit.faceIndices.xyz );

		// albedo
		vec4 albedo = vec4( material.color, material.opacity );
		if ( material.map != - 1 ) {

			vec3 uvPrime = material.mapTransform * vec3( uv, 1 );
			albedo *= texture2D( textures, vec3( uvPrime.xy, material.map ) );

		}

		if ( material.vertexColors ) {

			albedo *= vertexColor;

		}

		// alphaMap
		if ( material.alphaMap != - 1 ) {

			vec3 uvPrime = material.alphaMapTransform * vec3( uv, 1 );
			albedo.a *= texture2D( textures, vec3( uvPrime.xy, material.alphaMap ) ).x;

		}
		float alphaTest = material.alphaTest;
		bool useAlphaTest = alphaTest != 0.0;
		if (
			material.side != 0.0 && surfaceHit.side != material.side
			|| useAlphaTest && albedo.a < alphaTest
			|| material.transparent && ! useAlphaTest && albedo.a < rand( 3 )
		) {
			return SKIP_SURFACE;
		}

		vec3 normal = normalize( textureSampleBarycoord(
			attributesArray,
			ATTR_NORMAL,
			surfaceHit.barycoord,
			surfaceHit.faceIndices.xyz
		).xyz );

		// roughness
		float roughness = material.roughness;
		if ( material.roughnessMap != - 1 ) {

			vec3 uvPrime = material.roughnessMapTransform * vec3( uv, 1 );
			roughness *= texture2D( textures, vec3( uvPrime.xy, material.roughnessMap ) ).g;

		}

		// metalness
		float metalness = material.metalness;
		if ( material.metalnessMap != - 1 ) {

			vec3 uvPrime = material.metalnessMapTransform * vec3( uv, 1 );
			metalness *= texture2D( textures, vec3( uvPrime.xy, material.metalnessMap ) ).b;

		}

		// emission
		vec3 emission = material.emissiveIntensity * material.emissive;
		if ( material.emissiveMap != - 1 ) {

			vec3 uvPrime = material.emissiveMapTransform * vec3( uv, 1 );
			emission *= texture2D( textures, vec3( uvPrime.xy, material.emissiveMap ) ).xyz;

		}

		// transmission
		float transmission = material.transmission;
		if ( material.transmissionMap != - 1 ) {

			vec3 uvPrime = material.transmissionMapTransform * vec3( uv, 1 );
			transmission *= texture2D( textures, vec3( uvPrime.xy, material.transmissionMap ) ).r;

		}

		// normal
		if ( material.flatShading ) {
			normal = surfaceHit.faceNormal * surfaceHit.side;
		}

		vec3 baseNormal = normal;
		if ( material.normalMap != - 1 ) {

			vec4 tangentSample = textureSampleBarycoord(
				attributesArray,
				ATTR_TANGENT,
				surfaceHit.barycoord,
				surfaceHit.faceIndices.xyz
			);
			if ( length( tangentSample.xyz ) > 0.0 ) {

				vec3 tangent = normalize( tangentSample.xyz );
				vec3 bitangent = normalize( cross( normal, tangent ) * tangentSample.w );
				mat3 vTBN = mat3( tangent, bitangent, normal );

				vec3 uvPrime = material.normalMapTransform * vec3( uv, 1 );
				vec3 texNormal = texture2D( textures, vec3( uvPrime.xy, material.normalMap ) ).xyz * 2.0 - 1.0;
				texNormal.xy *= material.normalScale;
				normal = vTBN * texNormal;

			}

		}

		normal *= surfaceHit.side;

		// clearcoat
		float clearcoat = material.clearcoat;
		if ( material.clearcoatMap != - 1 ) {

			vec3 uvPrime = material.clearcoatMapTransform * vec3( uv, 1 );
			clearcoat *= texture2D( textures, vec3( uvPrime.xy, material.clearcoatMap ) ).r;

		}

		// clearcoatRoughness
		float clearcoatRoughness = material.clearcoatRoughness;
		if ( material.clearcoatRoughnessMap != - 1 ) {

			vec3 uvPrime = material.clearcoatRoughnessMapTransform * vec3( uv, 1 );
			clearcoatRoughness *= texture2D( textures, vec3( uvPrime.xy, material.clearcoatRoughnessMap ) ).g;

		}

		// clearcoatNormal
		vec3 clearcoatNormal = baseNormal;
		if ( material.clearcoatNormalMap != - 1 ) {

			vec4 tangentSample = textureSampleBarycoord(
				attributesArray,
				ATTR_TANGENT,
				surfaceHit.barycoord,
				surfaceHit.faceIndices.xyz
			);

			if ( length( tangentSample.xyz ) > 0.0 ) {

				vec3 tangent = normalize( tangentSample.xyz );
				vec3 bitangent = normalize( cross( clearcoatNormal, tangent ) * tangentSample.w );
				mat3 vTBN = mat3( tangent, bitangent, clearcoatNormal );

				vec3 uvPrime = material.clearcoatNormalMapTransform * vec3( uv, 1 );
				vec3 texNormal = texture2D( textures, vec3( uvPrime.xy, material.clearcoatNormalMap ) ).xyz * 2.0 - 1.0;
				texNormal.xy *= material.clearcoatNormalScale;
				clearcoatNormal = vTBN * texNormal;

			}

		}

		clearcoatNormal *= surfaceHit.side;

		// sheenColor
		vec3 sheenColor = material.sheenColor;
		if ( material.sheenColorMap != - 1 ) {

			vec3 uvPrime = material.sheenColorMapTransform * vec3( uv, 1 );
			sheenColor *= texture2D( textures, vec3( uvPrime.xy, material.sheenColorMap ) ).rgb;

		}

		// sheenRoughness
		float sheenRoughness = material.sheenRoughness;
		if ( material.sheenRoughnessMap != - 1 ) {

			vec3 uvPrime = material.sheenRoughnessMapTransform * vec3( uv, 1 );
			sheenRoughness *= texture2D( textures, vec3( uvPrime.xy, material.sheenRoughnessMap ) ).a;

		}

		// iridescence
		float iridescence = material.iridescence;
		if ( material.iridescenceMap != - 1 ) {

			vec3 uvPrime = material.iridescenceMapTransform * vec3( uv, 1 );
			iridescence *= texture2D( textures, vec3( uvPrime.xy, material.iridescenceMap ) ).r;

		}

		// iridescence thickness
		float iridescenceThickness = material.iridescenceThicknessMaximum;
		if ( material.iridescenceThicknessMap != - 1 ) {

			vec3 uvPrime = material.iridescenceThicknessMapTransform * vec3( uv, 1 );
			float iridescenceThicknessSampled = texture2D( textures, vec3( uvPrime.xy, material.iridescenceThicknessMap ) ).g;
			iridescenceThickness = mix( material.iridescenceThicknessMinimum, material.iridescenceThicknessMaximum, iridescenceThicknessSampled );

		}

		iridescence = iridescenceThickness == 0.0 ? 0.0 : iridescence;

		// specular color
		vec3 specularColor = material.specularColor;
		if ( material.specularColorMap != - 1 ) {

			vec3 uvPrime = material.specularColorMapTransform * vec3( uv, 1 );
			specularColor *= texture2D( textures, vec3( uvPrime.xy, material.specularColorMap ) ).rgb;

		}

		// specular intensity
		float specularIntensity = material.specularIntensity;
		if ( material.specularIntensityMap != - 1 ) {

			vec3 uvPrime = material.specularIntensityMapTransform * vec3( uv, 1 );
			specularIntensity *= texture2D( textures, vec3( uvPrime.xy, material.specularIntensityMap ) ).a;

		}

		surf.volumeParticle = false;

		surf.faceNormal = surfaceHit.faceNormal;
		surf.normal = normal;

		surf.metalness = metalness;
		surf.color = albedo.rgb;
		surf.emission = emission;

		surf.ior = material.ior;
		surf.transmission = transmission;
		surf.thinFilm = material.thinFilm;
		surf.attenuationColor = material.attenuationColor;
		surf.attenuationDistance = material.attenuationDistance;

		surf.clearcoatNormal = clearcoatNormal;
		surf.clearcoat = clearcoat;

		surf.sheen = material.sheen;
		surf.sheenColor = sheenColor;

		surf.iridescence = iridescence;
		surf.iridescenceIor = material.iridescenceIor;
		surf.iridescenceThickness = iridescenceThickness;

		surf.specularColor = specularColor;
		surf.specularIntensity = specularIntensity;
		surf.roughness = roughness * roughness;
		surf.clearcoatRoughness = clearcoatRoughness * clearcoatRoughness;
		surf.sheenRoughness = sheenRoughness;
		surf.frontFace = surfaceHit.side == 1.0 || transmission == 0.0;
		surf.eta = material.thinFilm || surf.frontFace ? 1.0 / material.ior : material.ior;
		surf.f0 = iorRatioToF0( surf.eta );
		surf.filteredRoughness = applyFilteredGlossy( surf.roughness, accumulatedRoughness );
		surf.filteredClearcoatRoughness = applyFilteredGlossy( surf.clearcoatRoughness, accumulatedRoughness );

		// get the normal frames
		surf.normalBasis = getBasisFromNormal( surf.normal );
		surf.normalInvBasis = inverse( surf.normalBasis );

		surf.clearcoatBasis = getBasisFromNormal( surf.clearcoatNormal );
		surf.clearcoatInvBasis = inverse( surf.clearcoatBasis );

		return HIT_SURFACE;

	}
`;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"a7xU2":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "render_structs", ()=>render_structs);
const render_structs = /* glsl */ `

	struct Ray {

		vec3 origin;
		vec3 direction;

	};

	struct SurfaceHit {

		uvec4 faceIndices;
		vec3 barycoord;
		vec3 faceNormal;
		float side;
		float dist;

	};

	struct RenderState {

		bool firstRay;
		bool transmissiveRay;
		bool isShadowRay;
		float accumulatedRoughness;
		int transmissiveTraversals;
		int traversals;
		uint depth;
		vec3 throughputColor;
		Material fogMaterial;

	};

	RenderState initRenderState() {

		RenderState result;
		result.firstRay = true;
		result.transmissiveRay = true;
		result.isShadowRay = false;
		result.accumulatedRoughness = 0.0;
		result.transmissiveTraversals = 0;
		result.traversals = 0;
		result.throughputColor = vec3( 1.0 );
		result.depth = 0u;
		result.fogMaterial.fogVolume = false;
		return result;

	}

`;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"b7Dry":[function(require,module,exports,__globalThis) {
//计算光线与场景中的物体的交点，并且判断是否与物体（如表面或雾体）相交
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "trace_scene_function", ()=>trace_scene_function);
const trace_scene_function = /* glsl */ `

	#define NO_HIT 0          // \u{6CA1}\u{6709}\u{4EA4}\u{70B9}
	#define SURFACE_HIT 1     // \u{5149}\u{7EBF}\u{4E0E}\u{8868}\u{9762}\u{76F8}\u{4EA4}
	#define LIGHT_HIT 2       // \u{5149}\u{7EBF}\u{4E0E}\u{5149}\u{6E90}\u{76F8}\u{4EA4}
	#define FOG_HIT 3         // \u{5149}\u{7EBF}\u{4E0E}\u{96FE}\u{4F53}\u{76F8}\u{4EA4}

	int traceScene(Ray ray, Material fogMaterial, inout SurfaceHit surfaceHit) {
		int result = NO_HIT;  // \u{521D}\u{59CB}\u{8BBE}\u{7F6E}\u{4E3A}\u{6CA1}\u{6709}\u{4EA4}\u{70B9}

		// \u{68C0}\u{67E5}\u{5149}\u{7EBF}\u{662F}\u{5426}\u{4E0E}\u{573A}\u{666F}\u{4E2D}\u{7684}\u{7269}\u{4F53}\u{6709}\u{4EA4}\u{70B9}\u{FF0C}\u{4F7F}\u{7528}BVH\u{52A0}\u{901F}\u{7ED3}\u{6784}
		bool hit = bvhIntersectFirstHit(
			bvh, 
			ray.origin, 
			ray.direction, 
			surfaceHit.faceIndices, 
			surfaceHit.faceNormal, 
			surfaceHit.barycoord, 
			surfaceHit.side, 
			surfaceHit.dist
		);

		#if FEATURE_FOG  // \u{5982}\u{679C}\u{542F}\u{7528}\u{4E86}\u{96FE}\u{4F53}\u{6548}\u{679C}

		// \u{5982}\u{679C}\u{8BE5}\u{6750}\u{8D28}\u{4E3A}\u{96FE}\u{4F53}\u{6750}\u{8D28}
		if (fogMaterial.fogVolume) {
			// \u{8BA1}\u{7B97}\u{5149}\u{7EBF}\u{4E0E}\u{96FE}\u{4F53}\u{7684}\u{4EA4}\u{70B9}\u{8DDD}\u{79BB}
			float particleDist = intersectFogVolume(fogMaterial, rand(1));

			// \u{5982}\u{679C}\u{4EA4}\u{70B9}\u{5728}\u{8868}\u{9762}\u{4EA4}\u{70B9}\u{4E4B}\u{524D}\u{FF0C}\u{4E14}\u{5927}\u{4E8E}\u{4E00}\u{4E2A}\u{5C0F}\u{7684}\u{504F}\u{79FB}\u{91CF}\u{FF0C}\u{8BA4}\u{4E3A}\u{662F}\u{96FE}\u{4F53}\u{4EA4}\u{70B9}
			if (particleDist + RAY_OFFSET < surfaceHit.dist) {
				surfaceHit.side = 1.0;  // \u{8BBE}\u{7F6E}\u{4EA4}\u{70B9}\u{7684}\u{9762}\u{671D}\u{5411}
				surfaceHit.faceNormal = normalize(-ray.direction);  // \u{6CD5}\u{7EBF}\u{53CD}\u{5411}
				surfaceHit.dist = particleDist;  // \u{66F4}\u{65B0}\u{4EA4}\u{70B9}\u{8DDD}\u{79BB}
				return FOG_HIT;  // \u{8FD4}\u{56DE}\u{96FE}\u{4F53}\u{4EA4}\u{70B9}
			}
		}

		#endif

		// \u{5982}\u{679C}\u{5149}\u{7EBF}\u{4E0E}\u{7269}\u{4F53}\u{6709}\u{4EA4}\u{70B9}\u{FF0C}\u{66F4}\u{65B0}\u{7ED3}\u{679C}\u{4E3A}\u{8868}\u{9762}\u{4EA4}\u{70B9}
		if (hit) {
			result = SURFACE_HIT; 
		}

		return result;
	}


`;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1CzbI":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "GradientEquirectTexture", ()=>GradientEquirectTexture);
var _three = require("three");
var _proceduralEquirectTextureJs = require("./ProceduralEquirectTexture.js");
const _direction = new (0, _three.Vector3)();
class GradientEquirectTexture extends (0, _proceduralEquirectTextureJs.ProceduralEquirectTexture) {
    constructor(resolution = 512){
        super(resolution, resolution);
        this.topColor = new (0, _three.Color)().set(0xffffff);
        this.bottomColor = new (0, _three.Color)().set(0x000000);
        this.exponent = 2;
        this.generationCallback = (polar, uv, coord, color)=>{
            _direction.setFromSpherical(polar);
            const t = _direction.y * 0.5 + 0.5;
            color.lerpColors(this.bottomColor, this.topColor, t ** this.exponent);
        };
    }
    copy(other) {
        super.copy(other);
        this.topColor.copy(other.topColor);
        this.bottomColor.copy(other.bottomColor);
        return this;
    }
}

},{"three":"ktPTu","./ProceduralEquirectTexture.js":"i2WMa","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"i2WMa":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ProceduralEquirectTexture", ()=>ProceduralEquirectTexture);
var _three = require("three");
const _uv = new (0, _three.Vector2)();
const _coord = new (0, _three.Vector2)();
const _polar = new (0, _three.Spherical)();
const _color = new (0, _three.Color)();
class ProceduralEquirectTexture extends (0, _three.DataTexture) {
    constructor(width = 512, height = 512){
        super(new Float32Array(width * height * 4), width, height, (0, _three.RGBAFormat), (0, _three.FloatType), (0, _three.EquirectangularReflectionMapping), (0, _three.RepeatWrapping), (0, _three.ClampToEdgeWrapping), (0, _three.LinearFilter), (0, _three.LinearFilter));
        this.generationCallback = null;
    }
    update() {
        this.dispose();
        this.needsUpdate = true;
        const { data, width, height } = this.image;
        for(let x = 0; x < width; x++)for(let y = 0; y < height; y++){
            _coord.set(width, height);
            _uv.set(x / width, y / height);
            _uv.x -= 0.5;
            _uv.y = 1.0 - _uv.y;
            _polar.theta = _uv.x * 2.0 * Math.PI;
            _polar.phi = _uv.y * Math.PI;
            _polar.radius = 1.0;
            this.generationCallback(_polar, _uv, _coord, _color);
            const i = y * width + x;
            const i4 = 4 * i;
            data[i4 + 0] = _color.r;
            data[i4 + 1] = _color.g;
            data[i4 + 2] = _color.b;
            data[i4 + 3] = 1.0;
        }
    }
    copy(other) {
        super.copy(other);
        this.generationCallback = other.generationCallback;
        return this;
    }
}

},{"three":"ktPTu","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"l9Mxp":[function(require,module,exports,__globalThis) {
//通过自定义的 插值（interpolation） 方法来处理纹理采样
//并在纹理周围使用 "clamping"（限制）的方式进行纹理的边界插值
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ClampedInterpolationMaterial", ()=>ClampedInterpolationMaterial);
var _three = require("three");
class ClampedInterpolationMaterial extends (0, _three.ShaderMaterial) {
    // getter 和 setter 用于纹理和透明度控制
    get map() {
        return this.uniforms.map.value;
    }
    set map(value) {
        this.uniforms.map.value = value;
    }
    get opacity() {
        return this.uniforms.opacity.value;
    }
    set opacity(value) {
        if (this.uniforms) this.uniforms.opacity.value = value;
    }
    constructor(params){
        super({
            uniforms: {
                map: {
                    value: null
                },
                opacity: {
                    value: 1
                }
            },
            vertexShader: /* glsl */ `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: /* glsl */ `
                uniform sampler2D map;
                uniform float opacity;
                varying vec2 vUv;

                // \u{81EA}\u{5B9A}\u{4E49}\u{7684}\u{7EB9}\u{7406}\u{91C7}\u{6837}\u{51FD}\u{6570}
                vec4 fetchClampedTexel(sampler2D tex, ivec2 px) {
                    return texelFetch(tex, px, 0);
                }

                void main() {
                    vec2 textureSize = vec2(textureSize(map, 0));
                    vec2 uvScaled = vUv * textureSize;
                    vec2 pixelCoord = floor(uvScaled);        // \u{83B7}\u{53D6}\u{50CF}\u{7D20}\u{5750}\u{6807}
                    vec2 pixelFraction = fract(uvScaled) - 0.5;  // \u{8BA1}\u{7B97}\u{5C0F}\u{6570}\u{90E8}\u{5206}\u{FF0C}\u{51B3}\u{5B9A}\u{63D2}\u{503C}\u{6743}\u{91CD}

                    // \u{8BA1}\u{7B97}\u{76F8}\u{90BB}\u{50CF}\u{7D20}
                    vec2 offset = step(0.0, pixelFraction); // \u{57FA}\u{4E8E}\u{5C0F}\u{6570}\u{90E8}\u{5206}\u{6765}\u{786E}\u{5B9A}\u{504F}\u{79FB}
                    vec2 nextPixel = clamp(pixelCoord + offset, vec2(0.0), textureSize - 1.0);

                    // \u{8BA1}\u{7B97}\u{63D2}\u{503C}
                    vec2 alpha = abs(pixelFraction);
                    vec4 p1 = mix(fetchClampedTexel(map, ivec2(pixelCoord.x, pixelCoord.y)), fetchClampedTexel(map, ivec2(nextPixel.x, pixelCoord.y)), alpha.x);
                    vec4 p2 = mix(fetchClampedTexel(map, ivec2(pixelCoord.x, nextPixel.y)), fetchClampedTexel(map, ivec2(nextPixel.x, nextPixel.y)), alpha.x);

                    // \u{7EC4}\u{5408}\u{6700}\u{7EC8}\u{7684}\u{989C}\u{8272}\u{5E76}\u{5E94}\u{7528}\u{900F}\u{660E}\u{5EA6}
                    gl_FragColor = mix(p1, p2, alpha.y);
                    gl_FragColor.a *= opacity;
                    #include <premultiplied_alpha_fragment>
                }
            `
        });
        // 使用传入的参数进行配置
        this.setValues(params);
    }
}

},{"three":"ktPTu","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"knSnR":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "CubeToEquirectGenerator", ()=>CubeToEquirectGenerator);
var _three = require("three");
var _passJs = require("three/examples/jsm/postprocessing/Pass.js");
var _indexJs = require("../shader/common/index.js");
class CubeToEquirectMaterial extends (0, _three.ShaderMaterial) {
    constructor(){
        super({
            uniforms: {
                envMap: {
                    value: null
                },
                flipEnvMap: {
                    value: -1
                }
            },
            vertexShader: /* glsl */ `
				varying vec2 vUv;
				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,
            fragmentShader: /* glsl */ `
				#define ENVMAP_TYPE_CUBE_UV

				uniform samplerCube envMap;
				uniform float flipEnvMap;
				varying vec2 vUv;

				#include <common>
				#include <cube_uv_reflection_fragment>

				${_indexJs.util_functions}

				void main() {

					vec3 rayDirection = equirectUvToDirection( vUv );
					rayDirection.x *= flipEnvMap;
					gl_FragColor = textureCube( envMap, rayDirection );

				}`
        });
        this.depthWrite = false;
        this.depthTest = false;
    }
}
class CubeToEquirectGenerator {
    constructor(renderer){
        this._renderer = renderer;
        this._quad = new (0, _passJs.FullScreenQuad)(new CubeToEquirectMaterial());
    }
    generate(source, width = null, height = null) {
        if (!source.isCubeTexture) throw new Error('CubeToEquirectMaterial: Source can only be cube textures.');
        const image = source.images[0];
        const renderer = this._renderer;
        const quad = this._quad;
        // determine the dimensions if not provided
        if (width === null) width = 4 * image.height;
        if (height === null) height = 2 * image.height;
        const target = new (0, _three.WebGLRenderTarget)(width, height, {
            type: (0, _three.FloatType),
            colorSpace: image.colorSpace
        });
        // prep the cube map data
        const imageHeight = image.height;
        const maxMip = Math.log2(imageHeight) - 2;
        const texelHeight = 1.0 / imageHeight;
        const texelWidth = 1.0 / (3 * Math.max(Math.pow(2, maxMip), 112));
        quad.material.defines.CUBEUV_MAX_MIP = `${maxMip}.0`;
        quad.material.defines.CUBEUV_TEXEL_WIDTH = texelWidth;
        quad.material.defines.CUBEUV_TEXEL_HEIGHT = texelHeight;
        quad.material.uniforms.envMap.value = source;
        quad.material.uniforms.flipEnvMap.value = source.isRenderTargetTexture ? 1 : -1;
        quad.material.needsUpdate = true;
        // save state and render the contents
        const currentTarget = renderer.getRenderTarget();
        const currentAutoClear = renderer.autoClear;
        renderer.autoClear = true;
        renderer.setRenderTarget(target);
        quad.render(renderer);
        renderer.setRenderTarget(currentTarget);
        renderer.autoClear = currentAutoClear;
        // read the data back
        const buffer = new Uint16Array(width * height * 4);
        const readBuffer = new Float32Array(width * height * 4);
        renderer.readRenderTargetPixels(target, 0, 0, width, height, readBuffer);
        target.dispose();
        for(let i = 0, l = readBuffer.length; i < l; i++)buffer[i] = (0, _three.DataUtils).toHalfFloat(readBuffer[i]);
        // produce the data texture
        const result = new (0, _three.DataTexture)(buffer, width, height, (0, _three.RGBAFormat), (0, _three.HalfFloatType));
        result.minFilter = (0, _three.LinearMipMapLinearFilter);
        result.magFilter = (0, _three.LinearFilter);
        result.wrapS = (0, _three.RepeatWrapping);
        result.wrapT = (0, _three.RepeatWrapping);
        result.mapping = (0, _three.EquirectangularReflectionMapping);
        result.needsUpdate = true;
        return result;
    }
    dispose() {
        this._quad.dispose();
    }
}

},{"three":"ktPTu","three/examples/jsm/postprocessing/Pass.js":"i2IfB","../shader/common/index.js":"i5W2a","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"drTJS":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "EquirectCamera", ()=>EquirectCamera);
var _three = require("three");
class EquirectCamera extends (0, _three.Camera) {
    constructor(){
        super();
        this.isEquirectCamera = true;
    }
}

},{"three":"ktPTu","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jWRcx":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "PhysicalSpotLight", ()=>PhysicalSpotLight);
var _three = require("three");
class PhysicalSpotLight extends (0, _three.SpotLight) {
    constructor(...args){
        super(...args);
        this.iesMap = null;
        this.radius = 0;
    }
    copy(source, recursive) {
        super.copy(source, recursive);
        this.iesMap = source.iesMap;
        this.radius = source.radius;
        return this;
    }
}

},{"three":"ktPTu","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aNBRO":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ShapedAreaLight", ()=>ShapedAreaLight);
var _three = require("three");
class ShapedAreaLight extends (0, _three.RectAreaLight) {
    constructor(...args){
        super(...args);
        this.isCircular = false;
    }
    copy(source, recursive) {
        super.copy(source, recursive);
        this.isCircular = source.isCircular;
        return this;
    }
}

},{"three":"ktPTu","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9Da5R":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "BlurredEnvMapGenerator", ()=>BlurredEnvMapGenerator);
var _three = require("three");
var _passJs = require("three/examples/jsm/postprocessing/Pass.js");
var _materialBaseJs = require("../materials/MaterialBase.js");
var _indexJs = require("../shader/common/index.js");
class PMREMCopyMaterial extends (0, _materialBaseJs.MaterialBase) {
    constructor(){
        super({
            uniforms: {
                envMap: {
                    value: null
                },
                blur: {
                    value: 0
                }
            },
            vertexShader: /* glsl */ `

				varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}

			`,
            fragmentShader: /* glsl */ `

				#include <common>
				#include <cube_uv_reflection_fragment>

				${_indexJs.util_functions}

				uniform sampler2D envMap;
				uniform float blur;
				varying vec2 vUv;
				void main() {

					vec3 rayDirection = equirectUvToDirection( vUv );
					gl_FragColor = textureCubeUV( envMap, rayDirection, blur );

				}

			`
        });
    }
}
class BlurredEnvMapGenerator {
    constructor(renderer){
        this.renderer = renderer;
        this.pmremGenerator = new (0, _three.PMREMGenerator)(renderer);
        this.copyQuad = new (0, _passJs.FullScreenQuad)(new PMREMCopyMaterial());
        this.renderTarget = new (0, _three.WebGLRenderTarget)(1, 1, {
            type: (0, _three.FloatType),
            format: (0, _three.RGBAFormat)
        });
    }
    dispose() {
        this.pmremGenerator.dispose();
        this.copyQuad.dispose();
        this.renderTarget.dispose();
    }
    generate(texture, blur) {
        const { pmremGenerator, renderTarget, copyQuad, renderer } = this;
        // get the pmrem target
        const pmremTarget = pmremGenerator.fromEquirectangular(texture);
        // set up the material
        const { width, height } = texture.image;
        renderTarget.setSize(width, height);
        copyQuad.material.envMap = pmremTarget.texture;
        copyQuad.material.blur = blur;
        // render
        const prevRenderTarget = renderer.getRenderTarget();
        const prevClear = renderer.autoClear;
        renderer.setRenderTarget(renderTarget);
        renderer.autoClear = true;
        copyQuad.render(renderer);
        renderer.setRenderTarget(prevRenderTarget);
        renderer.autoClear = prevClear;
        // read the data back
        const buffer = new Uint16Array(width * height * 4);
        const readBuffer = new Float32Array(width * height * 4);
        renderer.readRenderTargetPixels(renderTarget, 0, 0, width, height, readBuffer);
        for(let i = 0, l = readBuffer.length; i < l; i++)buffer[i] = (0, _three.DataUtils).toHalfFloat(readBuffer[i]);
        const result = new (0, _three.DataTexture)(buffer, width, height, (0, _three.RGBAFormat), (0, _three.HalfFloatType));
        result.minFilter = texture.minFilter;
        result.magFilter = texture.magFilter;
        result.wrapS = texture.wrapS;
        result.wrapT = texture.wrapT;
        result.mapping = (0, _three.EquirectangularReflectionMapping);
        result.needsUpdate = true;
        // dispose of the now unneeded target
        pmremTarget.dispose();
        return result;
    }
}

},{"three":"ktPTu","three/examples/jsm/postprocessing/Pass.js":"i2IfB","../materials/MaterialBase.js":"hgRM3","../shader/common/index.js":"i5W2a","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8E6PE":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "DenoiseMaterial", ()=>DenoiseMaterial);
var _three = require("three");
var _materialBaseJs = require("../MaterialBase.js");
class DenoiseMaterial extends (0, _materialBaseJs.MaterialBase) {
    constructor(parameters){
        super({
            blending: (0, _three.NoBlending),
            transparent: false,
            depthWrite: false,
            depthTest: false,
            defines: {
                USE_SLIDER: 0
            },
            uniforms: {
                sigma: {
                    value: 5.0
                },
                threshold: {
                    value: 0.03
                },
                kSigma: {
                    value: 1.0
                },
                map: {
                    value: null
                },
                opacity: {
                    value: 1
                }
            },
            vertexShader: /* glsl */ `
                varying vec2 vUv;

                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: /* glsl */ `
                uniform sampler2D map;
                uniform float sigma;
                uniform float threshold;
                uniform float kSigma;
                uniform float opacity;
                varying vec2 vUv;

                #define INV_SQRT_OF_2PI 0.3989422804014327
                #define INV_PI 0.3183098861837907

                // \u{667A}\u{80FD}\u{53BB}\u{566A}\u{51FD}\u{6570}
                vec4 smartDeNoise(sampler2D tex, vec2 uv, float sigma, float kSigma, float threshold) {

                    // \u{8BA1}\u{7B97}\u{6A21}\u{7CCA}\u{534A}\u{5F84}
                    float radius = round(kSigma * sigma);
                    float radQ = radius * radius;

                    // \u{9AD8}\u{65AF}\u{5206}\u{5E03}\u{76F8}\u{5173}\u{5E38}\u{91CF}
                    float invSigmaQx2 = 0.5 / (sigma * sigma);
                    float invSigmaQx2PI = INV_PI * invSigmaQx2;

                    // \u{8FB9}\u{7F18}\u{4FDD}\u{6301}\u{53C2}\u{6570}
                    float invThresholdSqx2 = 0.5 / (threshold * threshold);
                    float invThresholdSqrt2PI = INV_SQRT_OF_2PI / threshold;

                    vec4 centralPixel = texture2D(tex, uv);  // \u{5F53}\u{524D}\u{50CF}\u{7D20}
                    centralPixel.rgb *= centralPixel.a;  // \u{4F7F}\u{7528} alpha \u{901A}\u{9053}\u{8C03}\u{6574}\u{989C}\u{8272}

                    float zBuffer = 0.0;
                    vec4 accumulatedColor = vec4(0.0);
                    vec2 textureSize = vec2(textureSize(tex, 0));  // \u{83B7}\u{53D6}\u{7EB9}\u{7406}\u{5927}\u{5C0F}

                    // \u{904D}\u{5386}\u{90BB}\u{57DF}\u{50CF}\u{7D20}
                    for (float dx = -radius; dx <= radius; dx++) {
                        float pt = sqrt(radQ - dx * dx);
                        for (float dy = -pt; dy <= pt; dy++) {

                            // \u{8BA1}\u{7B97}\u{9AD8}\u{65AF}\u{6743}\u{91CD}
                            float blurFactor = exp(-(dx * dx + dy * dy) * invSigmaQx2) * invSigmaQx2PI;

                            vec4 neighborPixel = texture2D(tex, uv + vec2(dx, dy) / textureSize);
                            neighborPixel.rgb *= neighborPixel.a;

                            // \u{8BA1}\u{7B97}\u{4E0E}\u{5F53}\u{524D}\u{50CF}\u{7D20}\u{7684}\u{5DEE}\u{5F02}\u{5E76}\u{52A0}\u{6743}
                            vec4 colorDifference = neighborPixel - centralPixel;
                            float deltaFactor = exp(-(colorDifference.rgba * colorDifference.rgba) * invThresholdSqx2) * invThresholdSqrt2PI * blurFactor;

                            zBuffer += deltaFactor;
                            accumulatedColor += deltaFactor * neighborPixel;
                        }
                    }

                    return accumulatedColor / zBuffer;  // \u{8FD4}\u{56DE}\u{53BB}\u{566A}\u{540E}\u{7684}\u{989C}\u{8272}
                }

                void main() {
                    // \u{8C03}\u{7528}\u{667A}\u{80FD}\u{53BB}\u{566A}\u{51FD}\u{6570}
                    gl_FragColor = smartDeNoise(map, vUv, sigma, kSigma, threshold);

                    #include <tonemapping_fragment>
                    #include <colorspace_fragment>
                    #include <premultiplied_alpha_fragment>

                    gl_FragColor.a *= opacity;  // \u{5E94}\u{7528}\u{900F}\u{660E}\u{5EA6}
                }
            `
        });
        this.setValues(parameters);
    }
}

},{"three":"ktPTu","../MaterialBase.js":"hgRM3","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"a7Hf2":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "FogVolumeMaterial", ()=>FogVolumeMaterial);
var _three = require("three");
class FogVolumeMaterial extends (0, _three.MeshStandardMaterial) {
    constructor(params){
        super(params);
        this.isFogVolumeMaterial = true;
        this.density = 0.015;
        this.emissive = new (0, _three.Color)();
        this.emissiveIntensity = 0.0;
        this.opacity = 0.15;
        this.transparent = true;
        this.roughness = 1.0;
        this.metalness = 0.0;
        this.setValues(params);
    }
}

},{"three":"ktPTu","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},[], null, "parcelRequire94c2")

//# sourceMappingURL=areaLight.c4483dbf.js.map

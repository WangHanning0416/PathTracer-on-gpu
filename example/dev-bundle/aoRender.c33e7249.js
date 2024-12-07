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
})({"i2IfB":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Pass", ()=>Pass);
parcelHelpers.export(exports, "FullScreenQuad", ()=>FullScreenQuad);
var _three = require("three");
class Pass {
    constructor(){
        this.isPass = true;
        // if set to true, the pass is processed by the composer
        this.enabled = true;
        // if set to true, the pass indicates to swap read and write buffer after rendering
        this.needsSwap = true;
        // if set to true, the pass clears its buffer before rendering
        this.clear = false;
        // if set to true, the result of the pass is rendered to screen. This is set automatically by EffectComposer.
        this.renderToScreen = false;
    }
    setSize() {}
    render() {
        console.error('THREE.Pass: .render() must be implemented in derived pass.');
    }
    dispose() {}
}
// Helper for passes that need to fill the viewport with a single quad.
const _camera = new (0, _three.OrthographicCamera)(-1, 1, 1, -1, 0, 1);
// https://github.com/mrdoob/three.js/pull/21358
class FullscreenTriangleGeometry extends (0, _three.BufferGeometry) {
    constructor(){
        super();
        this.setAttribute('position', new (0, _three.Float32BufferAttribute)([
            -1,
            3,
            0,
            -1,
            -1,
            0,
            3,
            -1,
            0
        ], 3));
        this.setAttribute('uv', new (0, _three.Float32BufferAttribute)([
            0,
            2,
            0,
            0,
            2,
            0
        ], 2));
    }
}
const _geometry = new FullscreenTriangleGeometry();
class FullScreenQuad {
    constructor(material){
        this._mesh = new (0, _three.Mesh)(_geometry, material);
    }
    dispose() {
        this._mesh.geometry.dispose();
    }
    render(renderer) {
        renderer.render(this._mesh, _camera);
    }
    get material() {
        return this._mesh.material;
    }
    set material(value) {
        this._mesh.material = value;
    }
}

},{"three":"ktPTu","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ul5NI":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "PathTracingSceneGenerator", ()=>PathTracingSceneGenerator);
parcelHelpers.export(exports, "DynamicPathTracingSceneGenerator", ()=>DynamicPathTracingSceneGenerator);
parcelHelpers.export(exports, "PathTracingSceneWorker", ()=>PathTracingSceneWorker);
var _three = require("three");
var _threeMeshBvh = require("three-mesh-bvh");
var _staticGeometryGeneratorJs = require("./utils/StaticGeometryGenerator.js");
var _geometryPreparationUtilsJs = require("./utils/GeometryPreparationUtils.js");
// collect the textures from the materials
function getTextures(materials) {
    const textureSet = new Set();
    for(let i = 0, l = materials.length; i < l; i++){
        const material = materials[i];
        for(const key in material){
            const value = material[key];
            if (value && value.isTexture) textureSet.add(value);
        }
    }
    return Array.from(textureSet);
}
// collect the lights in the scene
function getLights(objects) {
    const lights = [];
    const iesSet = new Set();
    for(let i = 0, l = objects.length; i < l; i++)objects[i].traverse((c)=>{
        if (c.visible) {
            if (c.isRectAreaLight || c.isSpotLight || c.isPointLight || c.isDirectionalLight) {
                lights.push(c);
                if (c.iesMap) iesSet.add(c.iesMap);
            }
        }
    });
    const iesTextures = Array.from(iesSet).sort((a, b)=>{
        if (a.uuid < b.uuid) return 1;
        if (a.uuid > b.uuid) return -1;
        return 0;
    });
    return {
        lights,
        iesTextures
    };
}
class PathTracingSceneGenerator {
    get initialized() {
        return Boolean(this.bvh);
    }
    constructor(objects){
        // options
        this.bvhOptions = {};
        this.attributes = [
            'position',
            'normal',
            'tangent',
            'color',
            'uv',
            'uv2'
        ];
        this.generateBVH = true;
        // state
        this.bvh = null;
        this.geometry = new (0, _three.BufferGeometry)();
        this.staticGeometryGenerator = new (0, _staticGeometryGeneratorJs.StaticGeometryGenerator)(objects);
        this._bvhWorker = null;
        this._pendingGenerate = null;
        this._buildAsync = false;
        this._materialUuids = null;
    }
    setObjects(objects) {
        this.staticGeometryGenerator.setObjects(objects);
    }
    setBVHWorker(bvhWorker) {
        this._bvhWorker = bvhWorker;
    }
    async generateAsync(onProgress = null) {
        if (!this._bvhWorker) throw new Error('PathTracingSceneGenerator: "setBVHWorker" must be called before "generateAsync" can be called.');
        if (this.bvh instanceof Promise) {
            // if a bvh is already being generated we can wait for that to finish
            // and build another with the latest data while sharing the results.
            if (!this._pendingGenerate) this._pendingGenerate = new Promise(async ()=>{
                await this.bvh;
                this._pendingGenerate = null;
                // TODO: support multiple callbacks queued?
                return this.generateAsync(onProgress);
            });
            return this._pendingGenerate;
        } else {
            this._buildAsync = true;
            const result = this.generate(onProgress);
            this._buildAsync = false;
            result.bvh = this.bvh = await result.bvh;
            return result;
        }
    }
    generate(onProgress = null) {
        const { staticGeometryGenerator, geometry, attributes } = this;
        const objects = staticGeometryGenerator.objects;
        staticGeometryGenerator.attributes = attributes;
        // update the skeleton animations in case WebGLRenderer is not running
        // to update it.
        objects.forEach((o)=>{
            o.traverse((c)=>{
                if (c.isSkinnedMesh && c.skeleton) c.skeleton.update();
            });
        });
        // generate the geometry
        const result = staticGeometryGenerator.generate(geometry);
        const materials = result.materials;
        let needsMaterialIndexUpdate = result.changeType !== (0, _staticGeometryGeneratorJs.NO_CHANGE) || this._materialUuids === null || this._materialUuids.length !== length;
        if (!needsMaterialIndexUpdate) for(let i = 0, length1 = materials.length; i < length1; i++){
            const material = materials[i];
            if (material.uuid !== this._materialUuids[i]) {
                needsMaterialIndexUpdate = true;
                break;
            }
        }
        const textures = getTextures(materials);
        const { lights, iesTextures } = getLights(objects);
        if (needsMaterialIndexUpdate) {
            (0, _geometryPreparationUtilsJs.updateMaterialIndexAttribute)(geometry, materials, materials);
            this._materialUuids = materials.map((material)=>material.uuid);
        }
        // only generate a new bvh if the objects used have changed
        if (this.generateBVH) {
            if (this.bvh instanceof Promise) throw new Error('PathTracingSceneGenerator: BVH is already building asynchronously.');
            if (result.changeType === (0, _staticGeometryGeneratorJs.GEOMETRY_REBUILT)) {
                const bvhOptions = {
                    strategy: (0, _threeMeshBvh.SAH),
                    maxLeafTris: 1,
                    indirect: true,
                    onProgress,
                    ...this.bvhOptions
                };
                if (this._buildAsync) this.bvh = this._bvhWorker.generate(geometry, bvhOptions);
                else this.bvh = new (0, _threeMeshBvh.MeshBVH)(geometry, bvhOptions);
            } else if (result.changeType === (0, _staticGeometryGeneratorJs.GEOMETRY_ADJUSTED)) this.bvh.refit();
        }
        return {
            bvhChanged: result.changeType !== (0, _staticGeometryGeneratorJs.NO_CHANGE),
            bvh: this.bvh,
            needsMaterialIndexUpdate,
            lights,
            iesTextures,
            geometry,
            materials,
            textures,
            objects
        };
    }
}
class DynamicPathTracingSceneGenerator extends PathTracingSceneGenerator {
    constructor(...args){
        super(...args);
        console.warn('DynamicPathTracingSceneGenerator has been deprecated and renamed to "PathTracingSceneGenerator".');
    }
}
class PathTracingSceneWorker extends PathTracingSceneGenerator {
    constructor(...args){
        super(...args);
        console.warn('PathTracingSceneWorker has been deprecated and renamed to "PathTracingSceneGenerator".');
    }
}

},{"three":"ktPTu","three-mesh-bvh":"6y2ur","./utils/StaticGeometryGenerator.js":"aQCXy","./utils/GeometryPreparationUtils.js":"dBaXO","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6y2ur":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MeshBVH", ()=>(0, _meshBVHJs.MeshBVH));
parcelHelpers.export(exports, "MeshBVHHelper", ()=>(0, _meshBVHHelperJs.MeshBVHHelper));
parcelHelpers.export(exports, "CENTER", ()=>(0, _constantsJs.CENTER));
parcelHelpers.export(exports, "AVERAGE", ()=>(0, _constantsJs.AVERAGE));
parcelHelpers.export(exports, "SAH", ()=>(0, _constantsJs.SAH));
parcelHelpers.export(exports, "NOT_INTERSECTED", ()=>(0, _constantsJs.NOT_INTERSECTED));
parcelHelpers.export(exports, "INTERSECTED", ()=>(0, _constantsJs.INTERSECTED));
parcelHelpers.export(exports, "CONTAINED", ()=>(0, _constantsJs.CONTAINED));
parcelHelpers.export(exports, "getBVHExtremes", ()=>(0, _debugJs.getBVHExtremes));
parcelHelpers.export(exports, "estimateMemoryInBytes", ()=>(0, _debugJs.estimateMemoryInBytes));
parcelHelpers.export(exports, "getJSONStructure", ()=>(0, _debugJs.getJSONStructure));
parcelHelpers.export(exports, "validateBounds", ()=>(0, _debugJs.validateBounds));
parcelHelpers.export(exports, "acceleratedRaycast", ()=>(0, _extensionUtilitiesJs.acceleratedRaycast));
parcelHelpers.export(exports, "computeBoundsTree", ()=>(0, _extensionUtilitiesJs.computeBoundsTree));
parcelHelpers.export(exports, "disposeBoundsTree", ()=>(0, _extensionUtilitiesJs.disposeBoundsTree));
parcelHelpers.export(exports, "getTriangleHitPointInfo", ()=>(0, _triangleUtilitiesJs.getTriangleHitPointInfo));
parcelHelpers.export(exports, "BVHShaderGLSL", ()=>_bvhshaderGLSLJs);
parcelHelpers.export(exports, "shaderStructs", ()=>shaderStructs);
parcelHelpers.export(exports, "shaderDistanceFunction", ()=>shaderDistanceFunction);
parcelHelpers.export(exports, "shaderIntersectFunction", ()=>shaderIntersectFunction);
var _meshBVHJs = require("./core/MeshBVH.js");
var _meshBVHHelperJs = require("./objects/MeshBVHHelper.js");
var _constantsJs = require("./core/Constants.js");
var _debugJs = require("./debug/Debug.js");
var _extensionUtilitiesJs = require("./utils/ExtensionUtilities.js");
var _triangleUtilitiesJs = require("./utils/TriangleUtilities.js");
var _extendedTriangleJs = require("./math/ExtendedTriangle.js");
parcelHelpers.exportAll(_extendedTriangleJs, exports);
var _orientedBoxJs = require("./math/OrientedBox.js");
parcelHelpers.exportAll(_orientedBoxJs, exports);
var _meshBVHUniformStructJs = require("./gpu/MeshBVHUniformStruct.js");
parcelHelpers.exportAll(_meshBVHUniformStructJs, exports);
var _vertexAttributeTextureJs = require("./gpu/VertexAttributeTexture.js");
parcelHelpers.exportAll(_vertexAttributeTextureJs, exports);
var _staticGeometryGeneratorJs = require("./utils/StaticGeometryGenerator.js");
parcelHelpers.exportAll(_staticGeometryGeneratorJs, exports);
var _bvhshaderGLSLJs = require("./gpu/BVHShaderGLSL.js");
const shaderStructs = _bvhshaderGLSLJs.bvh_struct_definitions;
const shaderDistanceFunction = _bvhshaderGLSLJs.bvh_distance_functions;
const shaderIntersectFunction = `
	${_bvhshaderGLSLJs.common_functions}
	${_bvhshaderGLSLJs.bvh_ray_functions}
`;

},{"./core/MeshBVH.js":"biELs","./objects/MeshBVHHelper.js":false,"./core/Constants.js":"i15yM","./debug/Debug.js":false,"./utils/ExtensionUtilities.js":false,"./utils/TriangleUtilities.js":false,"./math/ExtendedTriangle.js":false,"./math/OrientedBox.js":false,"./gpu/MeshBVHUniformStruct.js":"16SjG","./gpu/VertexAttributeTexture.js":"gGJF6","./utils/StaticGeometryGenerator.js":false,"./gpu/BVHShaderGLSL.js":"gZxTc","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"biELs":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "DEFAULT_OPTIONS", ()=>DEFAULT_OPTIONS);
parcelHelpers.export(exports, "MeshBVH", ()=>MeshBVH);
var _three = require("three");
var _constantsJs = require("./Constants.js");
var _buildTreeJs = require("./build/buildTree.js");
var _orientedBoxJs = require("../math/OrientedBox.js");
var _arrayBoxUtilitiesJs = require("../utils/ArrayBoxUtilities.js");
var _extendedTrianglePoolJs = require("../utils/ExtendedTrianglePool.js");
var _shapecastJs = require("./cast/shapecast.js");
var _closestPointToPointJs = require("./cast/closestPointToPoint.js");
var _iterationUtilsGeneratedJs = require("./utils/iterationUtils.generated.js");
var _refitGeneratedJs = require("./cast/refit.generated.js");
var _raycastGeneratedJs = require("./cast/raycast.generated.js");
var _raycastFirstGeneratedJs = require("./cast/raycastFirst.generated.js");
var _intersectsGeometryGeneratedJs = require("./cast/intersectsGeometry.generated.js");
var _closestPointToGeometryGeneratedJs = require("./cast/closestPointToGeometry.generated.js");
var _iterationUtilsIndirectGeneratedJs = require("./utils/iterationUtils_indirect.generated.js");
var _refitIndirectGeneratedJs = require("./cast/refit_indirect.generated.js");
var _raycastIndirectGeneratedJs = require("./cast/raycast_indirect.generated.js");
var _raycastFirstIndirectGeneratedJs = require("./cast/raycastFirst_indirect.generated.js");
var _intersectsGeometryIndirectGeneratedJs = require("./cast/intersectsGeometry_indirect.generated.js");
var _closestPointToGeometryIndirectGeneratedJs = require("./cast/closestPointToGeometry_indirect.generated.js");
var _bufferUtilsJs = require("../utils/BufferUtils.js");
var _triangleUtilitiesJs = require("../utils/TriangleUtilities.js");
var _bvhcastJs = require("./cast/bvhcast.js");
const obb = /* @__PURE__ */ new (0, _orientedBoxJs.OrientedBox)();
const tempBox = /* @__PURE__ */ new (0, _three.Box3)();
const DEFAULT_OPTIONS = {
    strategy: (0, _constantsJs.CENTER),
    maxDepth: 40,
    maxLeafTris: 10,
    useSharedArrayBuffer: false,
    setBoundingBox: true,
    onProgress: null,
    indirect: false,
    verbose: true
};
class MeshBVH {
    static serialize(bvh, options = {}) {
        options = {
            cloneBuffers: true,
            ...options
        };
        const geometry = bvh.geometry;
        const rootData = bvh._roots;
        const indirectBuffer = bvh._indirectBuffer;
        const indexAttribute = geometry.getIndex();
        let result;
        if (options.cloneBuffers) result = {
            roots: rootData.map((root)=>root.slice()),
            index: indexAttribute ? indexAttribute.array.slice() : null,
            indirectBuffer: indirectBuffer ? indirectBuffer.slice() : null
        };
        else result = {
            roots: rootData,
            index: indexAttribute ? indexAttribute.array : null,
            indirectBuffer: indirectBuffer
        };
        return result;
    }
    static deserialize(data, geometry, options = {}) {
        options = {
            setIndex: true,
            indirect: Boolean(data.indirectBuffer),
            ...options
        };
        const { index, roots, indirectBuffer } = data;
        const bvh = new MeshBVH(geometry, {
            ...options,
            [(0, _constantsJs.SKIP_GENERATION)]: true
        });
        bvh._roots = roots;
        bvh._indirectBuffer = indirectBuffer || null;
        if (options.setIndex) {
            const indexAttribute = geometry.getIndex();
            if (indexAttribute === null) {
                const newIndex = new (0, _three.BufferAttribute)(data.index, 1, false);
                geometry.setIndex(newIndex);
            } else if (indexAttribute.array !== index) {
                indexAttribute.array.set(index);
                indexAttribute.needsUpdate = true;
            }
        }
        return bvh;
    }
    get indirect() {
        return !!this._indirectBuffer;
    }
    constructor(geometry, options = {}){
        if (!geometry.isBufferGeometry) throw new Error('MeshBVH: Only BufferGeometries are supported.');
        else if (geometry.index && geometry.index.isInterleavedBufferAttribute) throw new Error('MeshBVH: InterleavedBufferAttribute is not supported for the index attribute.');
        // default options
        options = Object.assign({
            ...DEFAULT_OPTIONS,
            // undocumented options
            // Whether to skip generating the tree. Used for deserialization.
            [(0, _constantsJs.SKIP_GENERATION)]: false
        }, options);
        if (options.useSharedArrayBuffer && !(0, _bufferUtilsJs.isSharedArrayBufferSupported)()) throw new Error('MeshBVH: SharedArrayBuffer is not available.');
        // retain references to the geometry so we can use them it without having to
        // take a geometry reference in every function.
        this.geometry = geometry;
        this._roots = null;
        this._indirectBuffer = null;
        if (!options[0, _constantsJs.SKIP_GENERATION]) {
            (0, _buildTreeJs.buildPackedTree)(this, options);
            if (!geometry.boundingBox && options.setBoundingBox) geometry.boundingBox = this.getBoundingBox(new (0, _three.Box3)());
        }
        this.resolveTriangleIndex = options.indirect ? (i)=>this._indirectBuffer[i] : (i)=>i;
    }
    refit(nodeIndices = null) {
        const refitFunc = this.indirect ? (0, _refitIndirectGeneratedJs.refit_indirect) : (0, _refitGeneratedJs.refit);
        return refitFunc(this, nodeIndices);
    }
    traverse(callback, rootIndex = 0) {
        const buffer = this._roots[rootIndex];
        const uint32Array = new Uint32Array(buffer);
        const uint16Array = new Uint16Array(buffer);
        _traverse(0);
        function _traverse(node32Index, depth = 0) {
            const node16Index = node32Index * 2;
            const isLeaf = uint16Array[node16Index + 15] === (0, _constantsJs.IS_LEAFNODE_FLAG);
            if (isLeaf) {
                const offset = uint32Array[node32Index + 6];
                const count = uint16Array[node16Index + 14];
                callback(depth, isLeaf, new Float32Array(buffer, node32Index * 4, 6), offset, count);
            } else {
                // TODO: use node functions here
                const left = node32Index + (0, _constantsJs.BYTES_PER_NODE) / 4;
                const right = uint32Array[node32Index + 6];
                const splitAxis = uint32Array[node32Index + 7];
                const stopTraversal = callback(depth, isLeaf, new Float32Array(buffer, node32Index * 4, 6), splitAxis);
                if (!stopTraversal) {
                    _traverse(left, depth + 1);
                    _traverse(right, depth + 1);
                }
            }
        }
    }
    /* Core Cast Functions */ raycast(ray, materialOrSide = (0, _three.FrontSide), near = 0, far = Infinity) {
        const roots = this._roots;
        const geometry = this.geometry;
        const intersects = [];
        const isMaterial = materialOrSide.isMaterial;
        const isArrayMaterial = Array.isArray(materialOrSide);
        const groups = geometry.groups;
        const side = isMaterial ? materialOrSide.side : materialOrSide;
        const raycastFunc = this.indirect ? (0, _raycastIndirectGeneratedJs.raycast_indirect) : (0, _raycastGeneratedJs.raycast);
        for(let i = 0, l = roots.length; i < l; i++){
            const materialSide = isArrayMaterial ? materialOrSide[groups[i].materialIndex].side : side;
            const startCount = intersects.length;
            raycastFunc(this, i, materialSide, ray, intersects, near, far);
            if (isArrayMaterial) {
                const materialIndex = groups[i].materialIndex;
                for(let j = startCount, jl = intersects.length; j < jl; j++)intersects[j].face.materialIndex = materialIndex;
            }
        }
        return intersects;
    }
    raycastFirst(ray, materialOrSide = (0, _three.FrontSide), near = 0, far = Infinity) {
        const roots = this._roots;
        const geometry = this.geometry;
        const isMaterial = materialOrSide.isMaterial;
        const isArrayMaterial = Array.isArray(materialOrSide);
        let closestResult = null;
        const groups = geometry.groups;
        const side = isMaterial ? materialOrSide.side : materialOrSide;
        const raycastFirstFunc = this.indirect ? (0, _raycastFirstIndirectGeneratedJs.raycastFirst_indirect) : (0, _raycastFirstGeneratedJs.raycastFirst);
        for(let i = 0, l = roots.length; i < l; i++){
            const materialSide = isArrayMaterial ? materialOrSide[groups[i].materialIndex].side : side;
            const result = raycastFirstFunc(this, i, materialSide, ray, near, far);
            if (result != null && (closestResult == null || result.distance < closestResult.distance)) {
                closestResult = result;
                if (isArrayMaterial) result.face.materialIndex = groups[i].materialIndex;
            }
        }
        return closestResult;
    }
    intersectsGeometry(otherGeometry, geomToMesh) {
        let result = false;
        const roots = this._roots;
        const intersectsGeometryFunc = this.indirect ? (0, _intersectsGeometryIndirectGeneratedJs.intersectsGeometry_indirect) : (0, _intersectsGeometryGeneratedJs.intersectsGeometry);
        for(let i = 0, l = roots.length; i < l; i++){
            result = intersectsGeometryFunc(this, i, otherGeometry, geomToMesh);
            if (result) break;
        }
        return result;
    }
    shapecast(callbacks) {
        const triangle = (0, _extendedTrianglePoolJs.ExtendedTrianglePool).getPrimitive();
        const iterateFunc = this.indirect ? (0, _iterationUtilsIndirectGeneratedJs.iterateOverTriangles_indirect) : (0, _iterationUtilsGeneratedJs.iterateOverTriangles);
        let { boundsTraverseOrder, intersectsBounds, intersectsRange, intersectsTriangle } = callbacks;
        // wrap the intersectsRange function
        if (intersectsRange && intersectsTriangle) {
            const originalIntersectsRange = intersectsRange;
            intersectsRange = (offset, count, contained, depth, nodeIndex)=>{
                if (!originalIntersectsRange(offset, count, contained, depth, nodeIndex)) return iterateFunc(offset, count, this, intersectsTriangle, contained, depth, triangle);
                return true;
            };
        } else if (!intersectsRange) {
            if (intersectsTriangle) intersectsRange = (offset, count, contained, depth)=>{
                return iterateFunc(offset, count, this, intersectsTriangle, contained, depth, triangle);
            };
            else intersectsRange = (offset, count, contained)=>{
                return contained;
            };
        }
        // run shapecast
        let result = false;
        let byteOffset = 0;
        const roots = this._roots;
        for(let i = 0, l = roots.length; i < l; i++){
            const root = roots[i];
            result = (0, _shapecastJs.shapecast)(this, i, intersectsBounds, intersectsRange, boundsTraverseOrder, byteOffset);
            if (result) break;
            byteOffset += root.byteLength;
        }
        (0, _extendedTrianglePoolJs.ExtendedTrianglePool).releasePrimitive(triangle);
        return result;
    }
    bvhcast(otherBvh, matrixToLocal, callbacks) {
        let { intersectsRanges, intersectsTriangles } = callbacks;
        const triangle1 = (0, _extendedTrianglePoolJs.ExtendedTrianglePool).getPrimitive();
        const indexAttr1 = this.geometry.index;
        const positionAttr1 = this.geometry.attributes.position;
        const assignTriangle1 = this.indirect ? (i1)=>{
            const ti = this.resolveTriangleIndex(i1);
            (0, _triangleUtilitiesJs.setTriangle)(triangle1, ti * 3, indexAttr1, positionAttr1);
        } : (i1)=>{
            (0, _triangleUtilitiesJs.setTriangle)(triangle1, i1 * 3, indexAttr1, positionAttr1);
        };
        const triangle2 = (0, _extendedTrianglePoolJs.ExtendedTrianglePool).getPrimitive();
        const indexAttr2 = otherBvh.geometry.index;
        const positionAttr2 = otherBvh.geometry.attributes.position;
        const assignTriangle2 = otherBvh.indirect ? (i2)=>{
            const ti2 = otherBvh.resolveTriangleIndex(i2);
            (0, _triangleUtilitiesJs.setTriangle)(triangle2, ti2 * 3, indexAttr2, positionAttr2);
        } : (i2)=>{
            (0, _triangleUtilitiesJs.setTriangle)(triangle2, i2 * 3, indexAttr2, positionAttr2);
        };
        // generate triangle callback if needed
        if (intersectsTriangles) {
            const iterateOverDoubleTriangles = (offset1, count1, offset2, count2, depth1, index1, depth2, index2)=>{
                for(let i2 = offset2, l2 = offset2 + count2; i2 < l2; i2++){
                    assignTriangle2(i2);
                    triangle2.a.applyMatrix4(matrixToLocal);
                    triangle2.b.applyMatrix4(matrixToLocal);
                    triangle2.c.applyMatrix4(matrixToLocal);
                    triangle2.needsUpdate = true;
                    for(let i1 = offset1, l1 = offset1 + count1; i1 < l1; i1++){
                        assignTriangle1(i1);
                        triangle1.needsUpdate = true;
                        if (intersectsTriangles(triangle1, triangle2, i1, i2, depth1, index1, depth2, index2)) return true;
                    }
                }
                return false;
            };
            if (intersectsRanges) {
                const originalIntersectsRanges = intersectsRanges;
                intersectsRanges = function(offset1, count1, offset2, count2, depth1, index1, depth2, index2) {
                    if (!originalIntersectsRanges(offset1, count1, offset2, count2, depth1, index1, depth2, index2)) return iterateOverDoubleTriangles(offset1, count1, offset2, count2, depth1, index1, depth2, index2);
                    return true;
                };
            } else intersectsRanges = iterateOverDoubleTriangles;
        }
        return (0, _bvhcastJs.bvhcast)(this, otherBvh, matrixToLocal, intersectsRanges);
    }
    /* Derived Cast Functions */ intersectsBox(box, boxToMesh) {
        obb.set(box.min, box.max, boxToMesh);
        obb.needsUpdate = true;
        return this.shapecast({
            intersectsBounds: (box)=>obb.intersectsBox(box),
            intersectsTriangle: (tri)=>obb.intersectsTriangle(tri)
        });
    }
    intersectsSphere(sphere) {
        return this.shapecast({
            intersectsBounds: (box)=>sphere.intersectsBox(box),
            intersectsTriangle: (tri)=>tri.intersectsSphere(sphere)
        });
    }
    closestPointToGeometry(otherGeometry, geometryToBvh, target1 = {}, target2 = {}, minThreshold = 0, maxThreshold = Infinity) {
        const closestPointToGeometryFunc = this.indirect ? (0, _closestPointToGeometryIndirectGeneratedJs.closestPointToGeometry_indirect) : (0, _closestPointToGeometryGeneratedJs.closestPointToGeometry);
        return closestPointToGeometryFunc(this, otherGeometry, geometryToBvh, target1, target2, minThreshold, maxThreshold);
    }
    closestPointToPoint(point, target = {}, minThreshold = 0, maxThreshold = Infinity) {
        return (0, _closestPointToPointJs.closestPointToPoint)(this, point, target, minThreshold, maxThreshold);
    }
    getBoundingBox(target) {
        target.makeEmpty();
        const roots = this._roots;
        roots.forEach((buffer)=>{
            (0, _arrayBoxUtilitiesJs.arrayToBox)(0, new Float32Array(buffer), tempBox);
            target.union(tempBox);
        });
        return target;
    }
}

},{"three":"ktPTu","./Constants.js":"i15yM","./build/buildTree.js":"eWZ4E","../math/OrientedBox.js":"lE14k","../utils/ArrayBoxUtilities.js":"axERW","../utils/ExtendedTrianglePool.js":"9EYXZ","./cast/shapecast.js":"9JLlH","./cast/closestPointToPoint.js":"caGvm","./utils/iterationUtils.generated.js":"brbcV","./cast/refit.generated.js":"iDfT5","./cast/raycast.generated.js":"jcUJj","./cast/raycastFirst.generated.js":"aphx5","./cast/intersectsGeometry.generated.js":"hegxz","./cast/closestPointToGeometry.generated.js":"kRofC","./utils/iterationUtils_indirect.generated.js":"71cmv","./cast/refit_indirect.generated.js":"9BNKz","./cast/raycast_indirect.generated.js":"c0YIL","./cast/raycastFirst_indirect.generated.js":"jsR9F","./cast/intersectsGeometry_indirect.generated.js":"5TeWa","./cast/closestPointToGeometry_indirect.generated.js":"xVEUt","../utils/BufferUtils.js":"gBAF9","../utils/TriangleUtilities.js":"6tB2U","./cast/bvhcast.js":"7URls","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"i15yM":[function(require,module,exports,__globalThis) {
// Split strategy constants
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "CENTER", ()=>CENTER);
parcelHelpers.export(exports, "AVERAGE", ()=>AVERAGE);
parcelHelpers.export(exports, "SAH", ()=>SAH);
parcelHelpers.export(exports, "NOT_INTERSECTED", ()=>NOT_INTERSECTED);
parcelHelpers.export(exports, "INTERSECTED", ()=>INTERSECTED);
parcelHelpers.export(exports, "CONTAINED", ()=>CONTAINED);
parcelHelpers.export(exports, "TRIANGLE_INTERSECT_COST", ()=>TRIANGLE_INTERSECT_COST);
parcelHelpers.export(exports, "TRAVERSAL_COST", ()=>TRAVERSAL_COST);
parcelHelpers.export(exports, "BYTES_PER_NODE", ()=>BYTES_PER_NODE);
parcelHelpers.export(exports, "IS_LEAFNODE_FLAG", ()=>IS_LEAFNODE_FLAG);
parcelHelpers.export(exports, "FLOAT32_EPSILON", ()=>FLOAT32_EPSILON);
parcelHelpers.export(exports, "SKIP_GENERATION", ()=>SKIP_GENERATION);
const CENTER = 0;
const AVERAGE = 1;
const SAH = 2;
const NOT_INTERSECTED = 0;
const INTERSECTED = 1;
const CONTAINED = 2;
const TRIANGLE_INTERSECT_COST = 1.25;
const TRAVERSAL_COST = 1;
const BYTES_PER_NODE = 32;
const IS_LEAFNODE_FLAG = 0xFFFF;
const FLOAT32_EPSILON = Math.pow(2, -24);
const SKIP_GENERATION = Symbol('SKIP_GENERATION');

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"eWZ4E":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "generateIndirectBuffer", ()=>generateIndirectBuffer);
parcelHelpers.export(exports, "buildTree", ()=>buildTree);
parcelHelpers.export(exports, "buildPackedTree", ()=>buildPackedTree);
var _geometryUtilsJs = require("./geometryUtils.js");
var _computeBoundsUtilsJs = require("./computeBoundsUtils.js");
var _splitUtilsJs = require("./splitUtils.js");
var _meshBVHNodeJs = require("../MeshBVHNode.js");
var _constantsJs = require("../Constants.js");
var _sortUtilsGeneratedJs = require("./sortUtils.generated.js");
var _sortUtilsIndirectGeneratedJs = require("./sortUtils_indirect.generated.js");
var _buildUtilsJs = require("./buildUtils.js");
function generateIndirectBuffer(geometry, useSharedArrayBuffer) {
    const triCount = (geometry.index ? geometry.index.count : geometry.attributes.position.count) / 3;
    const useUint32 = triCount > 2 ** 16;
    const byteCount = useUint32 ? 4 : 2;
    const buffer = useSharedArrayBuffer ? new SharedArrayBuffer(triCount * byteCount) : new ArrayBuffer(triCount * byteCount);
    const indirectBuffer = useUint32 ? new Uint32Array(buffer) : new Uint16Array(buffer);
    for(let i = 0, l = indirectBuffer.length; i < l; i++)indirectBuffer[i] = i;
    return indirectBuffer;
}
function buildTree(bvh, triangleBounds, offset, count, options) {
    // epxand variables
    const { maxDepth, verbose, maxLeafTris, strategy, onProgress, indirect } = options;
    const indirectBuffer = bvh._indirectBuffer;
    const geometry = bvh.geometry;
    const indexArray = geometry.index ? geometry.index.array : null;
    const partionFunc = indirect ? (0, _sortUtilsIndirectGeneratedJs.partition_indirect) : (0, _sortUtilsGeneratedJs.partition);
    // generate intermediate variables
    const totalTriangles = (0, _geometryUtilsJs.getTriCount)(geometry);
    const cacheCentroidBoundingData = new Float32Array(6);
    let reachedMaxDepth = false;
    const root = new (0, _meshBVHNodeJs.MeshBVHNode)();
    (0, _computeBoundsUtilsJs.getBounds)(triangleBounds, offset, count, root.boundingData, cacheCentroidBoundingData);
    splitNode(root, offset, count, cacheCentroidBoundingData);
    return root;
    function triggerProgress(trianglesProcessed) {
        if (onProgress) onProgress(trianglesProcessed / totalTriangles);
    }
    // either recursively splits the given node, creating left and right subtrees for it, or makes it a leaf node,
    // recording the offset and count of its triangles and writing them into the reordered geometry index.
    function splitNode(node, offset, count, centroidBoundingData = null, depth = 0) {
        if (!reachedMaxDepth && depth >= maxDepth) {
            reachedMaxDepth = true;
            if (verbose) {
                console.warn(`MeshBVH: Max depth of ${maxDepth} reached when generating BVH. Consider increasing maxDepth.`);
                console.warn(geometry);
            }
        }
        // early out if we've met our capacity
        if (count <= maxLeafTris || depth >= maxDepth) {
            triggerProgress(offset + count);
            node.offset = offset;
            node.count = count;
            return node;
        }
        // Find where to split the volume
        const split = (0, _splitUtilsJs.getOptimalSplit)(node.boundingData, centroidBoundingData, triangleBounds, offset, count, strategy);
        if (split.axis === -1) {
            triggerProgress(offset + count);
            node.offset = offset;
            node.count = count;
            return node;
        }
        const splitOffset = partionFunc(indirectBuffer, indexArray, triangleBounds, offset, count, split);
        // create the two new child nodes
        if (splitOffset === offset || splitOffset === offset + count) {
            triggerProgress(offset + count);
            node.offset = offset;
            node.count = count;
        } else {
            node.splitAxis = split.axis;
            // create the left child and compute its bounding box
            const left = new (0, _meshBVHNodeJs.MeshBVHNode)();
            const lstart = offset;
            const lcount = splitOffset - offset;
            node.left = left;
            (0, _computeBoundsUtilsJs.getBounds)(triangleBounds, lstart, lcount, left.boundingData, cacheCentroidBoundingData);
            splitNode(left, lstart, lcount, cacheCentroidBoundingData, depth + 1);
            // repeat for right
            const right = new (0, _meshBVHNodeJs.MeshBVHNode)();
            const rstart = splitOffset;
            const rcount = count - lcount;
            node.right = right;
            (0, _computeBoundsUtilsJs.getBounds)(triangleBounds, rstart, rcount, right.boundingData, cacheCentroidBoundingData);
            splitNode(right, rstart, rcount, cacheCentroidBoundingData, depth + 1);
        }
        return node;
    }
}
function buildPackedTree(bvh, options) {
    const geometry = bvh.geometry;
    if (options.indirect) {
        bvh._indirectBuffer = generateIndirectBuffer(geometry, options.useSharedArrayBuffer);
        if ((0, _geometryUtilsJs.hasGroupGaps)(geometry) && !options.verbose) console.warn('MeshBVH: Provided geometry contains groups that do not fully span the vertex contents while using the "indirect" option. BVH may incorrectly report intersections on unrendered portions of the geometry.');
    }
    if (!bvh._indirectBuffer) (0, _geometryUtilsJs.ensureIndex)(geometry, options);
    const BufferConstructor = options.useSharedArrayBuffer ? SharedArrayBuffer : ArrayBuffer;
    const triangleBounds = (0, _computeBoundsUtilsJs.computeTriangleBounds)(geometry);
    const geometryRanges = options.indirect ? (0, _geometryUtilsJs.getFullGeometryRange)(geometry) : (0, _geometryUtilsJs.getRootIndexRanges)(geometry);
    bvh._roots = geometryRanges.map((range)=>{
        const root = buildTree(bvh, triangleBounds, range.offset, range.count, options);
        const nodeCount = (0, _buildUtilsJs.countNodes)(root);
        const buffer = new BufferConstructor((0, _constantsJs.BYTES_PER_NODE) * nodeCount);
        (0, _buildUtilsJs.populateBuffer)(0, root, buffer);
        return buffer;
    });
}

},{"./geometryUtils.js":"ejhro","./computeBoundsUtils.js":"eSJzU","./splitUtils.js":"6BBWC","../MeshBVHNode.js":"40pBh","../Constants.js":"i15yM","./sortUtils.generated.js":"dcygQ","./sortUtils_indirect.generated.js":"dG74F","./buildUtils.js":"knIht","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ejhro":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getVertexCount", ()=>getVertexCount);
parcelHelpers.export(exports, "getTriCount", ()=>getTriCount);
parcelHelpers.export(exports, "getIndexArray", ()=>getIndexArray);
// ensures that an index is present on the geometry
parcelHelpers.export(exports, "ensureIndex", ()=>ensureIndex);
// Computes the set of { offset, count } ranges which need independent BVH roots. Each
// region in the geometry index that belongs to a different set of material groups requires
// a separate BVH root, so that triangles indices belonging to one group never get swapped
// with triangle indices belongs to another group. For example, if the groups were like this:
//
// [-------------------------------------------------------------]
// |__________________|
//   g0 = [0, 20]  |______________________||_____________________|
//                      g1 = [16, 40]           g2 = [41, 60]
//
// we would need four BVH roots: [0, 15], [16, 20], [21, 40], [41, 60].
parcelHelpers.export(exports, "getFullGeometryRange", ()=>getFullGeometryRange);
parcelHelpers.export(exports, "getRootIndexRanges", ()=>getRootIndexRanges);
parcelHelpers.export(exports, "hasGroupGaps", ()=>hasGroupGaps);
var _three = require("three");
function getVertexCount(geo) {
    return geo.index ? geo.index.count : geo.attributes.position.count;
}
function getTriCount(geo) {
    return getVertexCount(geo) / 3;
}
function getIndexArray(vertexCount, BufferConstructor = ArrayBuffer) {
    if (vertexCount > 65535) return new Uint32Array(new BufferConstructor(4 * vertexCount));
    else return new Uint16Array(new BufferConstructor(2 * vertexCount));
}
function ensureIndex(geo, options) {
    if (!geo.index) {
        const vertexCount = geo.attributes.position.count;
        const BufferConstructor = options.useSharedArrayBuffer ? SharedArrayBuffer : ArrayBuffer;
        const index = getIndexArray(vertexCount, BufferConstructor);
        geo.setIndex(new (0, _three.BufferAttribute)(index, 1));
        for(let i = 0; i < vertexCount; i++)index[i] = i;
    }
}
function getFullGeometryRange(geo) {
    const triCount = getTriCount(geo);
    const drawRange = geo.drawRange;
    const start = drawRange.start / 3;
    const end = (drawRange.start + drawRange.count) / 3;
    const offset = Math.max(0, start);
    const count = Math.min(triCount, end) - offset;
    return [
        {
            offset: Math.floor(offset),
            count: Math.floor(count)
        }
    ];
}
function getRootIndexRanges(geo) {
    if (!geo.groups || !geo.groups.length) return getFullGeometryRange(geo);
    const ranges = [];
    const rangeBoundaries = new Set();
    const drawRange = geo.drawRange;
    const drawRangeStart = drawRange.start / 3;
    const drawRangeEnd = (drawRange.start + drawRange.count) / 3;
    for (const group of geo.groups){
        const groupStart = group.start / 3;
        const groupEnd = (group.start + group.count) / 3;
        rangeBoundaries.add(Math.max(drawRangeStart, groupStart));
        rangeBoundaries.add(Math.min(drawRangeEnd, groupEnd));
    }
    // note that if you don't pass in a comparator, it sorts them lexicographically as strings :-(
    const sortedBoundaries = Array.from(rangeBoundaries.values()).sort((a, b)=>a - b);
    for(let i = 0; i < sortedBoundaries.length - 1; i++){
        const start = sortedBoundaries[i];
        const end = sortedBoundaries[i + 1];
        ranges.push({
            offset: Math.floor(start),
            count: Math.floor(end - start)
        });
    }
    return ranges;
}
function hasGroupGaps(geometry) {
    if (geometry.groups.length === 0) return false;
    const vertexCount = getTriCount(geometry);
    const groups = getRootIndexRanges(geometry).sort((a, b)=>a.offset - b.offset);
    const finalGroup = groups[groups.length - 1];
    finalGroup.count = Math.min(vertexCount - finalGroup.offset, finalGroup.count);
    let total = 0;
    groups.forEach(({ count })=>total += count);
    return vertexCount !== total;
}

},{"three":"ktPTu","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"eSJzU":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// computes the union of the bounds of all of the given triangles and puts the resulting box in "target".
// A bounding box is computed for the centroids of the triangles, as well, and placed in "centroidTarget".
// These are computed together to avoid redundant accesses to bounds array.
parcelHelpers.export(exports, "getBounds", ()=>getBounds);
// precomputes the bounding box for each triangle; required for quickly calculating tree splits.
// result is an array of size tris.length * 6 where triangle i maps to a
// [x_center, x_delta, y_center, y_delta, z_center, z_delta] tuple starting at index i * 6,
// representing the center and half-extent in each dimension of triangle i
parcelHelpers.export(exports, "computeTriangleBounds", ()=>computeTriangleBounds);
var _constantsJs = require("../Constants.js");
var _geometryUtilsJs = require("./geometryUtils.js");
function getBounds(triangleBounds, offset, count, target, centroidTarget) {
    let minx = Infinity;
    let miny = Infinity;
    let minz = Infinity;
    let maxx = -Infinity;
    let maxy = -Infinity;
    let maxz = -Infinity;
    let cminx = Infinity;
    let cminy = Infinity;
    let cminz = Infinity;
    let cmaxx = -Infinity;
    let cmaxy = -Infinity;
    let cmaxz = -Infinity;
    for(let i = offset * 6, end = (offset + count) * 6; i < end; i += 6){
        const cx = triangleBounds[i + 0];
        const hx = triangleBounds[i + 1];
        const lx = cx - hx;
        const rx = cx + hx;
        if (lx < minx) minx = lx;
        if (rx > maxx) maxx = rx;
        if (cx < cminx) cminx = cx;
        if (cx > cmaxx) cmaxx = cx;
        const cy = triangleBounds[i + 2];
        const hy = triangleBounds[i + 3];
        const ly = cy - hy;
        const ry = cy + hy;
        if (ly < miny) miny = ly;
        if (ry > maxy) maxy = ry;
        if (cy < cminy) cminy = cy;
        if (cy > cmaxy) cmaxy = cy;
        const cz = triangleBounds[i + 4];
        const hz = triangleBounds[i + 5];
        const lz = cz - hz;
        const rz = cz + hz;
        if (lz < minz) minz = lz;
        if (rz > maxz) maxz = rz;
        if (cz < cminz) cminz = cz;
        if (cz > cmaxz) cmaxz = cz;
    }
    target[0] = minx;
    target[1] = miny;
    target[2] = minz;
    target[3] = maxx;
    target[4] = maxy;
    target[5] = maxz;
    centroidTarget[0] = cminx;
    centroidTarget[1] = cminy;
    centroidTarget[2] = cminz;
    centroidTarget[3] = cmaxx;
    centroidTarget[4] = cmaxy;
    centroidTarget[5] = cmaxz;
}
function computeTriangleBounds(geo, target = null, offset = null, count = null) {
    const posAttr = geo.attributes.position;
    const index = geo.index ? geo.index.array : null;
    const triCount = (0, _geometryUtilsJs.getTriCount)(geo);
    const normalized = posAttr.normalized;
    let triangleBounds;
    if (target === null) {
        triangleBounds = new Float32Array(triCount * 24);
        offset = 0;
        count = triCount;
    } else {
        triangleBounds = target;
        offset = offset || 0;
        count = count || triCount;
    }
    // used for non-normalized positions
    const posArr = posAttr.array;
    // support for an interleaved position buffer
    const bufferOffset = posAttr.offset || 0;
    let stride = 3;
    if (posAttr.isInterleavedBufferAttribute) stride = posAttr.data.stride;
    // used for normalized positions
    const getters = [
        'getX',
        'getY',
        'getZ'
    ];
    for(let tri = offset; tri < offset + count; tri++){
        const tri3 = tri * 3;
        const tri6 = tri * 6;
        let ai = tri3 + 0;
        let bi = tri3 + 1;
        let ci = tri3 + 2;
        if (index) {
            ai = index[ai];
            bi = index[bi];
            ci = index[ci];
        }
        // we add the stride and offset here since we access the array directly
        // below for the sake of performance
        if (!normalized) {
            ai = ai * stride + bufferOffset;
            bi = bi * stride + bufferOffset;
            ci = ci * stride + bufferOffset;
        }
        for(let el = 0; el < 3; el++){
            let a, b, c;
            if (normalized) {
                a = posAttr[getters[el]](ai);
                b = posAttr[getters[el]](bi);
                c = posAttr[getters[el]](ci);
            } else {
                a = posArr[ai + el];
                b = posArr[bi + el];
                c = posArr[ci + el];
            }
            let min = a;
            if (b < min) min = b;
            if (c < min) min = c;
            let max = a;
            if (b > max) max = b;
            if (c > max) max = c;
            // Increase the bounds size by float32 epsilon to avoid precision errors when
            // converting to 32 bit float. Scale the epsilon by the size of the numbers being
            // worked with.
            const halfExtents = (max - min) / 2;
            const el2 = el * 2;
            triangleBounds[tri6 + el2 + 0] = min + halfExtents;
            triangleBounds[tri6 + el2 + 1] = halfExtents + (Math.abs(min) + halfExtents) * (0, _constantsJs.FLOAT32_EPSILON);
        }
    }
    return triangleBounds;
}

},{"../Constants.js":"i15yM","./geometryUtils.js":"ejhro","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6BBWC":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getOptimalSplit", ()=>getOptimalSplit);
var _arrayBoxUtilitiesJs = require("../../utils/ArrayBoxUtilities.js");
var _constantsJs = require("../Constants.js");
const BIN_COUNT = 32;
const binsSort = (a, b)=>a.candidate - b.candidate;
const sahBins = new Array(BIN_COUNT).fill().map(()=>{
    return {
        count: 0,
        bounds: new Float32Array(6),
        rightCacheBounds: new Float32Array(6),
        leftCacheBounds: new Float32Array(6),
        candidate: 0
    };
});
const leftBounds = new Float32Array(6);
function getOptimalSplit(nodeBoundingData, centroidBoundingData, triangleBounds, offset, count, strategy) {
    let axis = -1;
    let pos = 0;
    // Center
    if (strategy === (0, _constantsJs.CENTER)) {
        axis = (0, _arrayBoxUtilitiesJs.getLongestEdgeIndex)(centroidBoundingData);
        if (axis !== -1) pos = (centroidBoundingData[axis] + centroidBoundingData[axis + 3]) / 2;
    } else if (strategy === (0, _constantsJs.AVERAGE)) {
        axis = (0, _arrayBoxUtilitiesJs.getLongestEdgeIndex)(nodeBoundingData);
        if (axis !== -1) pos = getAverage(triangleBounds, offset, count, axis);
    } else if (strategy === (0, _constantsJs.SAH)) {
        const rootSurfaceArea = (0, _arrayBoxUtilitiesJs.computeSurfaceArea)(nodeBoundingData);
        let bestCost = (0, _constantsJs.TRIANGLE_INTERSECT_COST) * count;
        // iterate over all axes
        const cStart = offset * 6;
        const cEnd = (offset + count) * 6;
        for(let a = 0; a < 3; a++){
            const axisLeft = centroidBoundingData[a];
            const axisRight = centroidBoundingData[a + 3];
            const axisLength = axisRight - axisLeft;
            const binWidth = axisLength / BIN_COUNT;
            // If we have fewer triangles than we're planning to split then just check all
            // the triangle positions because it will be faster.
            if (count < BIN_COUNT / 4) {
                // initialize the bin candidates
                const truncatedBins = [
                    ...sahBins
                ];
                truncatedBins.length = count;
                // set the candidates
                let b = 0;
                for(let c = cStart; c < cEnd; c += 6, b++){
                    const bin = truncatedBins[b];
                    bin.candidate = triangleBounds[c + 2 * a];
                    bin.count = 0;
                    const { bounds, leftCacheBounds, rightCacheBounds } = bin;
                    for(let d = 0; d < 3; d++){
                        rightCacheBounds[d] = Infinity;
                        rightCacheBounds[d + 3] = -Infinity;
                        leftCacheBounds[d] = Infinity;
                        leftCacheBounds[d + 3] = -Infinity;
                        bounds[d] = Infinity;
                        bounds[d + 3] = -Infinity;
                    }
                    (0, _arrayBoxUtilitiesJs.expandByTriangleBounds)(c, triangleBounds, bounds);
                }
                truncatedBins.sort(binsSort);
                // remove redundant splits
                let splitCount = count;
                for(let bi = 0; bi < splitCount; bi++){
                    const bin = truncatedBins[bi];
                    while(bi + 1 < splitCount && truncatedBins[bi + 1].candidate === bin.candidate){
                        truncatedBins.splice(bi + 1, 1);
                        splitCount--;
                    }
                }
                // find the appropriate bin for each triangle and expand the bounds.
                for(let c = cStart; c < cEnd; c += 6){
                    const center = triangleBounds[c + 2 * a];
                    for(let bi = 0; bi < splitCount; bi++){
                        const bin = truncatedBins[bi];
                        if (center >= bin.candidate) (0, _arrayBoxUtilitiesJs.expandByTriangleBounds)(c, triangleBounds, bin.rightCacheBounds);
                        else {
                            (0, _arrayBoxUtilitiesJs.expandByTriangleBounds)(c, triangleBounds, bin.leftCacheBounds);
                            bin.count++;
                        }
                    }
                }
                // expand all the bounds
                for(let bi = 0; bi < splitCount; bi++){
                    const bin = truncatedBins[bi];
                    const leftCount = bin.count;
                    const rightCount = count - bin.count;
                    // check the cost of this split
                    const leftBounds = bin.leftCacheBounds;
                    const rightBounds = bin.rightCacheBounds;
                    let leftProb = 0;
                    if (leftCount !== 0) leftProb = (0, _arrayBoxUtilitiesJs.computeSurfaceArea)(leftBounds) / rootSurfaceArea;
                    let rightProb = 0;
                    if (rightCount !== 0) rightProb = (0, _arrayBoxUtilitiesJs.computeSurfaceArea)(rightBounds) / rootSurfaceArea;
                    const cost = (0, _constantsJs.TRAVERSAL_COST) + (0, _constantsJs.TRIANGLE_INTERSECT_COST) * (leftProb * leftCount + rightProb * rightCount);
                    if (cost < bestCost) {
                        axis = a;
                        bestCost = cost;
                        pos = bin.candidate;
                    }
                }
            } else {
                // reset the bins
                for(let i = 0; i < BIN_COUNT; i++){
                    const bin = sahBins[i];
                    bin.count = 0;
                    bin.candidate = axisLeft + binWidth + i * binWidth;
                    const bounds = bin.bounds;
                    for(let d = 0; d < 3; d++){
                        bounds[d] = Infinity;
                        bounds[d + 3] = -Infinity;
                    }
                }
                // iterate over all center positions
                for(let c = cStart; c < cEnd; c += 6){
                    const triCenter = triangleBounds[c + 2 * a];
                    const relativeCenter = triCenter - axisLeft;
                    // in the partition function if the centroid lies on the split plane then it is
                    // considered to be on the right side of the split
                    let binIndex = ~~(relativeCenter / binWidth);
                    if (binIndex >= BIN_COUNT) binIndex = BIN_COUNT - 1;
                    const bin = sahBins[binIndex];
                    bin.count++;
                    (0, _arrayBoxUtilitiesJs.expandByTriangleBounds)(c, triangleBounds, bin.bounds);
                }
                // cache the unioned bounds from right to left so we don't have to regenerate them each time
                const lastBin = sahBins[BIN_COUNT - 1];
                (0, _arrayBoxUtilitiesJs.copyBounds)(lastBin.bounds, lastBin.rightCacheBounds);
                for(let i = BIN_COUNT - 2; i >= 0; i--){
                    const bin = sahBins[i];
                    const nextBin = sahBins[i + 1];
                    (0, _arrayBoxUtilitiesJs.unionBounds)(bin.bounds, nextBin.rightCacheBounds, bin.rightCacheBounds);
                }
                let leftCount = 0;
                for(let i = 0; i < BIN_COUNT - 1; i++){
                    const bin = sahBins[i];
                    const binCount = bin.count;
                    const bounds = bin.bounds;
                    const nextBin = sahBins[i + 1];
                    const rightBounds = nextBin.rightCacheBounds;
                    // don't do anything with the bounds if the new bounds have no triangles
                    if (binCount !== 0) {
                        if (leftCount === 0) (0, _arrayBoxUtilitiesJs.copyBounds)(bounds, leftBounds);
                        else (0, _arrayBoxUtilitiesJs.unionBounds)(bounds, leftBounds, leftBounds);
                    }
                    leftCount += binCount;
                    // check the cost of this split
                    let leftProb = 0;
                    let rightProb = 0;
                    if (leftCount !== 0) leftProb = (0, _arrayBoxUtilitiesJs.computeSurfaceArea)(leftBounds) / rootSurfaceArea;
                    const rightCount = count - leftCount;
                    if (rightCount !== 0) rightProb = (0, _arrayBoxUtilitiesJs.computeSurfaceArea)(rightBounds) / rootSurfaceArea;
                    const cost = (0, _constantsJs.TRAVERSAL_COST) + (0, _constantsJs.TRIANGLE_INTERSECT_COST) * (leftProb * leftCount + rightProb * rightCount);
                    if (cost < bestCost) {
                        axis = a;
                        bestCost = cost;
                        pos = bin.candidate;
                    }
                }
            }
        }
    } else console.warn(`MeshBVH: Invalid build strategy value ${strategy} used.`);
    return {
        axis,
        pos
    };
}
// returns the average coordinate on the specified axis of the all the provided triangles
function getAverage(triangleBounds, offset, count, axis) {
    let avg = 0;
    for(let i = offset, end = offset + count; i < end; i++)avg += triangleBounds[i * 6 + axis * 2];
    return avg / count;
}

},{"../../utils/ArrayBoxUtilities.js":"axERW","../Constants.js":"i15yM","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"axERW":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "arrayToBox", ()=>arrayToBox);
parcelHelpers.export(exports, "makeEmptyBounds", ()=>makeEmptyBounds);
parcelHelpers.export(exports, "getLongestEdgeIndex", ()=>getLongestEdgeIndex);
// copies bounds a into bounds b
parcelHelpers.export(exports, "copyBounds", ()=>copyBounds);
// sets bounds target to the union of bounds a and b
parcelHelpers.export(exports, "unionBounds", ()=>unionBounds);
// expands the given bounds by the provided triangle bounds
parcelHelpers.export(exports, "expandByTriangleBounds", ()=>expandByTriangleBounds);
// compute bounds surface area
parcelHelpers.export(exports, "computeSurfaceArea", ()=>computeSurfaceArea);
function arrayToBox(nodeIndex32, array, target) {
    target.min.x = array[nodeIndex32];
    target.min.y = array[nodeIndex32 + 1];
    target.min.z = array[nodeIndex32 + 2];
    target.max.x = array[nodeIndex32 + 3];
    target.max.y = array[nodeIndex32 + 4];
    target.max.z = array[nodeIndex32 + 5];
    return target;
}
function makeEmptyBounds(target) {
    target[0] = target[1] = target[2] = Infinity;
    target[3] = target[4] = target[5] = -Infinity;
}
function getLongestEdgeIndex(bounds) {
    let splitDimIdx = -1;
    let splitDist = -Infinity;
    for(let i = 0; i < 3; i++){
        const dist = bounds[i + 3] - bounds[i];
        if (dist > splitDist) {
            splitDist = dist;
            splitDimIdx = i;
        }
    }
    return splitDimIdx;
}
function copyBounds(source, target) {
    target.set(source);
}
function unionBounds(a, b, target) {
    let aVal, bVal;
    for(let d = 0; d < 3; d++){
        const d3 = d + 3;
        // set the minimum values
        aVal = a[d];
        bVal = b[d];
        target[d] = aVal < bVal ? aVal : bVal;
        // set the max values
        aVal = a[d3];
        bVal = b[d3];
        target[d3] = aVal > bVal ? aVal : bVal;
    }
}
function expandByTriangleBounds(startIndex, triangleBounds, bounds) {
    for(let d = 0; d < 3; d++){
        const tCenter = triangleBounds[startIndex + 2 * d];
        const tHalf = triangleBounds[startIndex + 2 * d + 1];
        const tMin = tCenter - tHalf;
        const tMax = tCenter + tHalf;
        if (tMin < bounds[d]) bounds[d] = tMin;
        if (tMax > bounds[d + 3]) bounds[d + 3] = tMax;
    }
}
function computeSurfaceArea(bounds) {
    const d0 = bounds[3] - bounds[0];
    const d1 = bounds[4] - bounds[1];
    const d2 = bounds[5] - bounds[2];
    return 2 * (d0 * d1 + d1 * d2 + d2 * d0);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"40pBh":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MeshBVHNode", ()=>MeshBVHNode);
class MeshBVHNode {
    constructor(){
        // internal nodes have boundingData, left, right, and splitAxis
        // leaf nodes have offset and count (referring to primitives in the mesh geometry)
        this.boundingData = new Float32Array(6);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dcygQ":[function(require,module,exports,__globalThis) {
/********************************************************/ /* This file is generated from "sortUtils.template.js". */ /********************************************************/ // reorders `tris` such that for `count` elements after `offset`, elements on the left side of the split
// will be on the left and elements on the right side of the split will be on the right. returns the index
// of the first element on the right side, or offset + count if there are no elements on the right side.
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "partition", ()=>partition);
function partition(indirectBuffer, index, triangleBounds, offset, count, split) {
    let left = offset;
    let right = offset + count - 1;
    const pos = split.pos;
    const axisOffset = split.axis * 2;
    // hoare partitioning, see e.g. https://en.wikipedia.org/wiki/Quicksort#Hoare_partition_scheme
    while(true){
        while(left <= right && triangleBounds[left * 6 + axisOffset] < pos)left++;
        // if a triangle center lies on the partition plane it is considered to be on the right side
        while(left <= right && triangleBounds[right * 6 + axisOffset] >= pos)right--;
        if (left < right) {
            // we need to swap all of the information associated with the triangles at index
            // left and right; that's the verts in the geometry index, the bounds,
            // and perhaps the SAH planes
            for(let i = 0; i < 3; i++){
                let t0 = index[left * 3 + i];
                index[left * 3 + i] = index[right * 3 + i];
                index[right * 3 + i] = t0;
            }
            // swap bounds
            for(let i = 0; i < 6; i++){
                let tb = triangleBounds[left * 6 + i];
                triangleBounds[left * 6 + i] = triangleBounds[right * 6 + i];
                triangleBounds[right * 6 + i] = tb;
            }
            left++;
            right--;
        } else return left;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dG74F":[function(require,module,exports,__globalThis) {
/********************************************************/ /* This file is generated from "sortUtils.template.js". */ /********************************************************/ // reorders `tris` such that for `count` elements after `offset`, elements on the left side of the split
// will be on the left and elements on the right side of the split will be on the right. returns the index
// of the first element on the right side, or offset + count if there are no elements on the right side.
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "partition_indirect", ()=>partition_indirect);
function partition_indirect(indirectBuffer, index, triangleBounds, offset, count, split) {
    let left = offset;
    let right = offset + count - 1;
    const pos = split.pos;
    const axisOffset = split.axis * 2;
    // hoare partitioning, see e.g. https://en.wikipedia.org/wiki/Quicksort#Hoare_partition_scheme
    while(true){
        while(left <= right && triangleBounds[left * 6 + axisOffset] < pos)left++;
        // if a triangle center lies on the partition plane it is considered to be on the right side
        while(left <= right && triangleBounds[right * 6 + axisOffset] >= pos)right--;
        if (left < right) {
            // we need to swap all of the information associated with the triangles at index
            // left and right; that's the verts in the geometry index, the bounds,
            // and perhaps the SAH planes
            let t = indirectBuffer[left];
            indirectBuffer[left] = indirectBuffer[right];
            indirectBuffer[right] = t;
            // swap bounds
            for(let i = 0; i < 6; i++){
                let tb = triangleBounds[left * 6 + i];
                triangleBounds[left * 6 + i] = triangleBounds[right * 6 + i];
                triangleBounds[right * 6 + i] = tb;
            }
            left++;
            right--;
        } else return left;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"knIht":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "countNodes", ()=>countNodes);
parcelHelpers.export(exports, "populateBuffer", ()=>populateBuffer);
var _constantsJs = require("../Constants.js");
var _nodeBufferUtilsJs = require("../utils/nodeBufferUtils.js");
let float32Array, uint32Array, uint16Array, uint8Array;
const MAX_POINTER = Math.pow(2, 32);
function countNodes(node) {
    if ('count' in node) return 1;
    else return 1 + countNodes(node.left) + countNodes(node.right);
}
function populateBuffer(byteOffset, node, buffer) {
    float32Array = new Float32Array(buffer);
    uint32Array = new Uint32Array(buffer);
    uint16Array = new Uint16Array(buffer);
    uint8Array = new Uint8Array(buffer);
    return _populateBuffer(byteOffset, node);
}
// pack structure
// boundingData  				: 6 float32
// right / offset 				: 1 uint32
// splitAxis / isLeaf + count 	: 1 uint32 / 2 uint16
function _populateBuffer(byteOffset, node) {
    const stride4Offset = byteOffset / 4;
    const stride2Offset = byteOffset / 2;
    const isLeaf = 'count' in node;
    const boundingData = node.boundingData;
    for(let i = 0; i < 6; i++)float32Array[stride4Offset + i] = boundingData[i];
    if (isLeaf) {
        if (node.buffer) {
            const buffer = node.buffer;
            uint8Array.set(new Uint8Array(buffer), byteOffset);
            for(let offset = byteOffset, l = byteOffset + buffer.byteLength; offset < l; offset += (0, _constantsJs.BYTES_PER_NODE)){
                const offset2 = offset / 2;
                if (!(0, _nodeBufferUtilsJs.IS_LEAF)(offset2, uint16Array)) uint32Array[offset / 4 + 6] += stride4Offset;
            }
            return byteOffset + buffer.byteLength;
        } else {
            const offset = node.offset;
            const count = node.count;
            uint32Array[stride4Offset + 6] = offset;
            uint16Array[stride2Offset + 14] = count;
            uint16Array[stride2Offset + 15] = (0, _constantsJs.IS_LEAFNODE_FLAG);
            return byteOffset + (0, _constantsJs.BYTES_PER_NODE);
        }
    } else {
        const left = node.left;
        const right = node.right;
        const splitAxis = node.splitAxis;
        let nextUnusedPointer;
        nextUnusedPointer = _populateBuffer(byteOffset + (0, _constantsJs.BYTES_PER_NODE), left);
        if (nextUnusedPointer / 4 > MAX_POINTER) throw new Error('MeshBVH: Cannot store child pointer greater than 32 bits.');
        uint32Array[stride4Offset + 6] = nextUnusedPointer / 4;
        nextUnusedPointer = _populateBuffer(nextUnusedPointer, right);
        uint32Array[stride4Offset + 7] = splitAxis;
        return nextUnusedPointer;
    }
}

},{"../Constants.js":"i15yM","../utils/nodeBufferUtils.js":"gJWU9","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gJWU9":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "IS_LEAF", ()=>IS_LEAF);
parcelHelpers.export(exports, "OFFSET", ()=>OFFSET);
parcelHelpers.export(exports, "COUNT", ()=>COUNT);
parcelHelpers.export(exports, "LEFT_NODE", ()=>LEFT_NODE);
parcelHelpers.export(exports, "RIGHT_NODE", ()=>RIGHT_NODE);
parcelHelpers.export(exports, "SPLIT_AXIS", ()=>SPLIT_AXIS);
parcelHelpers.export(exports, "BOUNDING_DATA_INDEX", ()=>BOUNDING_DATA_INDEX);
function IS_LEAF(n16, uint16Array) {
    return uint16Array[n16 + 15] === 0xFFFF;
}
function OFFSET(n32, uint32Array) {
    return uint32Array[n32 + 6];
}
function COUNT(n16, uint16Array) {
    return uint16Array[n16 + 14];
}
function LEFT_NODE(n32) {
    return n32 + 8;
}
function RIGHT_NODE(n32, uint32Array) {
    return uint32Array[n32 + 6];
}
function SPLIT_AXIS(n32, uint32Array) {
    return uint32Array[n32 + 7];
}
function BOUNDING_DATA_INDEX(n32) {
    return n32;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lE14k":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "OrientedBox", ()=>OrientedBox);
var _three = require("three");
var _separatingAxisBoundsJs = require("./SeparatingAxisBounds.js");
var _extendedTriangleJs = require("./ExtendedTriangle.js");
var _mathUtilitiesJs = require("./MathUtilities.js");
class OrientedBox {
    constructor(min, max, matrix){
        this.isOrientedBox = true;
        this.min = new (0, _three.Vector3)();
        this.max = new (0, _three.Vector3)();
        this.matrix = new (0, _three.Matrix4)();
        this.invMatrix = new (0, _three.Matrix4)();
        this.points = new Array(8).fill().map(()=>new (0, _three.Vector3)());
        this.satAxes = new Array(3).fill().map(()=>new (0, _three.Vector3)());
        this.satBounds = new Array(3).fill().map(()=>new (0, _separatingAxisBoundsJs.SeparatingAxisBounds)());
        this.alignedSatBounds = new Array(3).fill().map(()=>new (0, _separatingAxisBoundsJs.SeparatingAxisBounds)());
        this.needsUpdate = false;
        if (min) this.min.copy(min);
        if (max) this.max.copy(max);
        if (matrix) this.matrix.copy(matrix);
    }
    set(min, max, matrix) {
        this.min.copy(min);
        this.max.copy(max);
        this.matrix.copy(matrix);
        this.needsUpdate = true;
    }
    copy(other) {
        this.min.copy(other.min);
        this.max.copy(other.max);
        this.matrix.copy(other.matrix);
        this.needsUpdate = true;
    }
}
OrientedBox.prototype.update = function() {
    return function update() {
        const matrix = this.matrix;
        const min = this.min;
        const max = this.max;
        const points = this.points;
        for(let x = 0; x <= 1; x++){
            for(let y = 0; y <= 1; y++)for(let z = 0; z <= 1; z++){
                const i = 1 * x | 2 * y | 4 * z;
                const v = points[i];
                v.x = x ? max.x : min.x;
                v.y = y ? max.y : min.y;
                v.z = z ? max.z : min.z;
                v.applyMatrix4(matrix);
            }
        }
        const satBounds = this.satBounds;
        const satAxes = this.satAxes;
        const minVec = points[0];
        for(let i = 0; i < 3; i++){
            const axis = satAxes[i];
            const sb = satBounds[i];
            const index = 1 << i;
            const pi = points[index];
            axis.subVectors(minVec, pi);
            sb.setFromPoints(axis, points);
        }
        const alignedSatBounds = this.alignedSatBounds;
        alignedSatBounds[0].setFromPointsField(points, 'x');
        alignedSatBounds[1].setFromPointsField(points, 'y');
        alignedSatBounds[2].setFromPointsField(points, 'z');
        this.invMatrix.copy(this.matrix).invert();
        this.needsUpdate = false;
    };
}();
OrientedBox.prototype.intersectsBox = function() {
    const aabbBounds = new (0, _separatingAxisBoundsJs.SeparatingAxisBounds)();
    return function intersectsBox(box) {
        // TODO: should this be doing SAT against the AABB?
        if (this.needsUpdate) this.update();
        const min = box.min;
        const max = box.max;
        const satBounds = this.satBounds;
        const satAxes = this.satAxes;
        const alignedSatBounds = this.alignedSatBounds;
        aabbBounds.min = min.x;
        aabbBounds.max = max.x;
        if (alignedSatBounds[0].isSeparated(aabbBounds)) return false;
        aabbBounds.min = min.y;
        aabbBounds.max = max.y;
        if (alignedSatBounds[1].isSeparated(aabbBounds)) return false;
        aabbBounds.min = min.z;
        aabbBounds.max = max.z;
        if (alignedSatBounds[2].isSeparated(aabbBounds)) return false;
        for(let i = 0; i < 3; i++){
            const axis = satAxes[i];
            const sb = satBounds[i];
            aabbBounds.setFromBox(axis, box);
            if (sb.isSeparated(aabbBounds)) return false;
        }
        return true;
    };
}();
OrientedBox.prototype.intersectsTriangle = function() {
    const saTri = new (0, _extendedTriangleJs.ExtendedTriangle)();
    const pointsArr = new Array(3);
    const cachedSatBounds = new (0, _separatingAxisBoundsJs.SeparatingAxisBounds)();
    const cachedSatBounds2 = new (0, _separatingAxisBoundsJs.SeparatingAxisBounds)();
    const cachedAxis = new (0, _three.Vector3)();
    return function intersectsTriangle(triangle) {
        if (this.needsUpdate) this.update();
        if (!triangle.isExtendedTriangle) {
            saTri.copy(triangle);
            saTri.update();
            triangle = saTri;
        } else if (triangle.needsUpdate) triangle.update();
        const satBounds = this.satBounds;
        const satAxes = this.satAxes;
        pointsArr[0] = triangle.a;
        pointsArr[1] = triangle.b;
        pointsArr[2] = triangle.c;
        for(let i = 0; i < 3; i++){
            const sb = satBounds[i];
            const sa = satAxes[i];
            cachedSatBounds.setFromPoints(sa, pointsArr);
            if (sb.isSeparated(cachedSatBounds)) return false;
        }
        const triSatBounds = triangle.satBounds;
        const triSatAxes = triangle.satAxes;
        const points = this.points;
        for(let i = 0; i < 3; i++){
            const sb = triSatBounds[i];
            const sa = triSatAxes[i];
            cachedSatBounds.setFromPoints(sa, points);
            if (sb.isSeparated(cachedSatBounds)) return false;
        }
        // check crossed axes
        for(let i = 0; i < 3; i++){
            const sa1 = satAxes[i];
            for(let i2 = 0; i2 < 4; i2++){
                const sa2 = triSatAxes[i2];
                cachedAxis.crossVectors(sa1, sa2);
                cachedSatBounds.setFromPoints(cachedAxis, pointsArr);
                cachedSatBounds2.setFromPoints(cachedAxis, points);
                if (cachedSatBounds.isSeparated(cachedSatBounds2)) return false;
            }
        }
        return true;
    };
}();
OrientedBox.prototype.closestPointToPoint = function() {
    return function closestPointToPoint(point, target1) {
        if (this.needsUpdate) this.update();
        target1.copy(point).applyMatrix4(this.invMatrix).clamp(this.min, this.max).applyMatrix4(this.matrix);
        return target1;
    };
}();
OrientedBox.prototype.distanceToPoint = function() {
    const target = new (0, _three.Vector3)();
    return function distanceToPoint(point) {
        this.closestPointToPoint(point, target);
        return point.distanceTo(target);
    };
}();
OrientedBox.prototype.distanceToBox = function() {
    const xyzFields = [
        'x',
        'y',
        'z'
    ];
    const segments1 = new Array(12).fill().map(()=>new (0, _three.Line3)());
    const segments2 = new Array(12).fill().map(()=>new (0, _three.Line3)());
    const point1 = new (0, _three.Vector3)();
    const point2 = new (0, _three.Vector3)();
    // early out if we find a value below threshold
    return function distanceToBox(box, threshold = 0, target1 = null, target2 = null) {
        if (this.needsUpdate) this.update();
        if (this.intersectsBox(box)) {
            if (target1 || target2) {
                box.getCenter(point2);
                this.closestPointToPoint(point2, point1);
                box.closestPointToPoint(point1, point2);
                if (target1) target1.copy(point1);
                if (target2) target2.copy(point2);
            }
            return 0;
        }
        const threshold2 = threshold * threshold;
        const min = box.min;
        const max = box.max;
        const points = this.points;
        // iterate over every edge and compare distances
        let closestDistanceSq = Infinity;
        // check over all these points
        for(let i = 0; i < 8; i++){
            const p = points[i];
            point2.copy(p).clamp(min, max);
            const dist = p.distanceToSquared(point2);
            if (dist < closestDistanceSq) {
                closestDistanceSq = dist;
                if (target1) target1.copy(p);
                if (target2) target2.copy(point2);
                if (dist < threshold2) return Math.sqrt(dist);
            }
        }
        // generate and check all line segment distances
        let count = 0;
        for(let i = 0; i < 3; i++){
            for(let i1 = 0; i1 <= 1; i1++)for(let i2 = 0; i2 <= 1; i2++){
                const nextIndex = (i + 1) % 3;
                const nextIndex2 = (i + 2) % 3;
                // get obb line segments
                const index = i1 << nextIndex | i2 << nextIndex2;
                const index2 = 1 << i | i1 << nextIndex | i2 << nextIndex2;
                const p1 = points[index];
                const p2 = points[index2];
                const line1 = segments1[count];
                line1.set(p1, p2);
                // get aabb line segments
                const f1 = xyzFields[i];
                const f2 = xyzFields[nextIndex];
                const f3 = xyzFields[nextIndex2];
                const line2 = segments2[count];
                const start = line2.start;
                const end = line2.end;
                start[f1] = min[f1];
                start[f2] = i1 ? min[f2] : max[f2];
                start[f3] = i2 ? min[f3] : max[f2];
                end[f1] = max[f1];
                end[f2] = i1 ? min[f2] : max[f2];
                end[f3] = i2 ? min[f3] : max[f2];
                count++;
            }
        }
        // check all the other boxes point
        for(let x = 0; x <= 1; x++){
            for(let y = 0; y <= 1; y++)for(let z = 0; z <= 1; z++){
                point2.x = x ? max.x : min.x;
                point2.y = y ? max.y : min.y;
                point2.z = z ? max.z : min.z;
                this.closestPointToPoint(point2, point1);
                const dist = point2.distanceToSquared(point1);
                if (dist < closestDistanceSq) {
                    closestDistanceSq = dist;
                    if (target1) target1.copy(point1);
                    if (target2) target2.copy(point2);
                    if (dist < threshold2) return Math.sqrt(dist);
                }
            }
        }
        for(let i = 0; i < 12; i++){
            const l1 = segments1[i];
            for(let i2 = 0; i2 < 12; i2++){
                const l2 = segments2[i2];
                (0, _mathUtilitiesJs.closestPointsSegmentToSegment)(l1, l2, point1, point2);
                const dist = point1.distanceToSquared(point2);
                if (dist < closestDistanceSq) {
                    closestDistanceSq = dist;
                    if (target1) target1.copy(point1);
                    if (target2) target2.copy(point2);
                    if (dist < threshold2) return Math.sqrt(dist);
                }
            }
        }
        return Math.sqrt(closestDistanceSq);
    };
}();

},{"three":"ktPTu","./SeparatingAxisBounds.js":"kEopM","./ExtendedTriangle.js":"bw9AP","./MathUtilities.js":"DysKq","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kEopM":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "SeparatingAxisBounds", ()=>SeparatingAxisBounds);
parcelHelpers.export(exports, "areIntersecting", ()=>areIntersecting);
var _three = require("three");
class SeparatingAxisBounds {
    constructor(){
        this.min = Infinity;
        this.max = -Infinity;
    }
    setFromPointsField(points, field) {
        let min = Infinity;
        let max = -Infinity;
        for(let i = 0, l = points.length; i < l; i++){
            const p = points[i];
            const val = p[field];
            min = val < min ? val : min;
            max = val > max ? val : max;
        }
        this.min = min;
        this.max = max;
    }
    setFromPoints(axis, points) {
        let min = Infinity;
        let max = -Infinity;
        for(let i = 0, l = points.length; i < l; i++){
            const p = points[i];
            const val = axis.dot(p);
            min = val < min ? val : min;
            max = val > max ? val : max;
        }
        this.min = min;
        this.max = max;
    }
    isSeparated(other) {
        return this.min > other.max || other.min > this.max;
    }
}
SeparatingAxisBounds.prototype.setFromBox = function() {
    const p = new (0, _three.Vector3)();
    return function setFromBox(axis, box) {
        const boxMin = box.min;
        const boxMax = box.max;
        let min = Infinity;
        let max = -Infinity;
        for(let x = 0; x <= 1; x++){
            for(let y = 0; y <= 1; y++)for(let z = 0; z <= 1; z++){
                p.x = boxMin.x * x + boxMax.x * (1 - x);
                p.y = boxMin.y * y + boxMax.y * (1 - y);
                p.z = boxMin.z * z + boxMax.z * (1 - z);
                const val = axis.dot(p);
                min = Math.min(val, min);
                max = Math.max(val, max);
            }
        }
        this.min = min;
        this.max = max;
    };
}();
const areIntersecting = function() {
    const cacheSatBounds = new SeparatingAxisBounds();
    return function areIntersecting(shape1, shape2) {
        const points1 = shape1.points;
        const satAxes1 = shape1.satAxes;
        const satBounds1 = shape1.satBounds;
        const points2 = shape2.points;
        const satAxes2 = shape2.satAxes;
        const satBounds2 = shape2.satBounds;
        // check axes of the first shape
        for(let i = 0; i < 3; i++){
            const sb = satBounds1[i];
            const sa = satAxes1[i];
            cacheSatBounds.setFromPoints(sa, points2);
            if (sb.isSeparated(cacheSatBounds)) return false;
        }
        // check axes of the second shape
        for(let i = 0; i < 3; i++){
            const sb = satBounds2[i];
            const sa = satAxes2[i];
            cacheSatBounds.setFromPoints(sa, points1);
            if (sb.isSeparated(cacheSatBounds)) return false;
        }
    };
}();

},{"three":"ktPTu","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bw9AP":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ExtendedTriangle", ()=>ExtendedTriangle);
var _three = require("three");
var _separatingAxisBoundsJs = require("./SeparatingAxisBounds.js");
var _mathUtilitiesJs = require("./MathUtilities.js");
const ZERO_EPSILON = 1e-15;
function isNearZero(value) {
    return Math.abs(value) < ZERO_EPSILON;
}
class ExtendedTriangle extends (0, _three.Triangle) {
    constructor(...args){
        super(...args);
        this.isExtendedTriangle = true;
        this.satAxes = new Array(4).fill().map(()=>new (0, _three.Vector3)());
        this.satBounds = new Array(4).fill().map(()=>new (0, _separatingAxisBoundsJs.SeparatingAxisBounds)());
        this.points = [
            this.a,
            this.b,
            this.c
        ];
        this.sphere = new (0, _three.Sphere)();
        this.plane = new (0, _three.Plane)();
        this.needsUpdate = true;
    }
    intersectsSphere(sphere) {
        return (0, _mathUtilitiesJs.sphereIntersectTriangle)(sphere, this);
    }
    update() {
        const a = this.a;
        const b = this.b;
        const c = this.c;
        const points = this.points;
        const satAxes = this.satAxes;
        const satBounds = this.satBounds;
        const axis0 = satAxes[0];
        const sab0 = satBounds[0];
        this.getNormal(axis0);
        sab0.setFromPoints(axis0, points);
        const axis1 = satAxes[1];
        const sab1 = satBounds[1];
        axis1.subVectors(a, b);
        sab1.setFromPoints(axis1, points);
        const axis2 = satAxes[2];
        const sab2 = satBounds[2];
        axis2.subVectors(b, c);
        sab2.setFromPoints(axis2, points);
        const axis3 = satAxes[3];
        const sab3 = satBounds[3];
        axis3.subVectors(c, a);
        sab3.setFromPoints(axis3, points);
        this.sphere.setFromPoints(this.points);
        this.plane.setFromNormalAndCoplanarPoint(axis0, a);
        this.needsUpdate = false;
    }
}
ExtendedTriangle.prototype.closestPointToSegment = function() {
    const point1 = new (0, _three.Vector3)();
    const point2 = new (0, _three.Vector3)();
    const edge = new (0, _three.Line3)();
    return function distanceToSegment(segment, target1 = null, target2 = null) {
        const { start, end } = segment;
        const points = this.points;
        let distSq;
        let closestDistanceSq = Infinity;
        // check the triangle edges
        for(let i = 0; i < 3; i++){
            const nexti = (i + 1) % 3;
            edge.start.copy(points[i]);
            edge.end.copy(points[nexti]);
            (0, _mathUtilitiesJs.closestPointsSegmentToSegment)(edge, segment, point1, point2);
            distSq = point1.distanceToSquared(point2);
            if (distSq < closestDistanceSq) {
                closestDistanceSq = distSq;
                if (target1) target1.copy(point1);
                if (target2) target2.copy(point2);
            }
        }
        // check end points
        this.closestPointToPoint(start, point1);
        distSq = start.distanceToSquared(point1);
        if (distSq < closestDistanceSq) {
            closestDistanceSq = distSq;
            if (target1) target1.copy(point1);
            if (target2) target2.copy(start);
        }
        this.closestPointToPoint(end, point1);
        distSq = end.distanceToSquared(point1);
        if (distSq < closestDistanceSq) {
            closestDistanceSq = distSq;
            if (target1) target1.copy(point1);
            if (target2) target2.copy(end);
        }
        return Math.sqrt(closestDistanceSq);
    };
}();
ExtendedTriangle.prototype.intersectsTriangle = function() {
    const saTri2 = new ExtendedTriangle();
    const arr1 = new Array(3);
    const arr2 = new Array(3);
    const cachedSatBounds = new (0, _separatingAxisBoundsJs.SeparatingAxisBounds)();
    const cachedSatBounds2 = new (0, _separatingAxisBoundsJs.SeparatingAxisBounds)();
    const cachedAxis = new (0, _three.Vector3)();
    const dir = new (0, _three.Vector3)();
    const dir1 = new (0, _three.Vector3)();
    const dir2 = new (0, _three.Vector3)();
    const tempDir = new (0, _three.Vector3)();
    const edge = new (0, _three.Line3)();
    const edge1 = new (0, _three.Line3)();
    const edge2 = new (0, _three.Line3)();
    const tempPoint = new (0, _three.Vector3)();
    function triIntersectPlane(tri, plane, targetEdge) {
        // find the edge that intersects the other triangle plane
        const points = tri.points;
        let count = 0;
        let startPointIntersection = -1;
        for(let i = 0; i < 3; i++){
            const { start, end } = edge;
            start.copy(points[i]);
            end.copy(points[(i + 1) % 3]);
            edge.delta(dir);
            const startIntersects = isNearZero(plane.distanceToPoint(start));
            if (isNearZero(plane.normal.dot(dir)) && startIntersects) {
                // if the edge lies on the plane then take the line
                targetEdge.copy(edge);
                count = 2;
                break;
            }
            // check if the start point is near the plane because "intersectLine" is not robust to that case
            const doesIntersect = plane.intersectLine(edge, tempPoint);
            if (!doesIntersect && startIntersects) tempPoint.copy(start);
            // ignore the end point
            if ((doesIntersect || startIntersects) && !isNearZero(tempPoint.distanceTo(end))) {
                if (count <= 1) {
                    // assign to the start or end point and save which index was snapped to
                    // the start point if necessary
                    const point = count === 1 ? targetEdge.start : targetEdge.end;
                    point.copy(tempPoint);
                    if (startIntersects) startPointIntersection = count;
                } else if (count >= 2) {
                    // if we're here that means that there must have been one point that had
                    // snapped to the start point so replace it here
                    const point = startPointIntersection === 1 ? targetEdge.start : targetEdge.end;
                    point.copy(tempPoint);
                    count = 2;
                    break;
                }
                count++;
                if (count === 2 && startPointIntersection === -1) break;
            }
        }
        return count;
    }
    // TODO: If the triangles are coplanar and intersecting the target is nonsensical. It should at least
    // be a line contained by both triangles if not a different special case somehow represented in the return result.
    return function intersectsTriangle(other, target = null, suppressLog = false) {
        if (this.needsUpdate) this.update();
        if (!other.isExtendedTriangle) {
            saTri2.copy(other);
            saTri2.update();
            other = saTri2;
        } else if (other.needsUpdate) other.update();
        const plane1 = this.plane;
        const plane2 = other.plane;
        if (Math.abs(plane1.normal.dot(plane2.normal)) > 1.0 - 1e-10) {
            // perform separating axis intersection test only for coplanar triangles
            const satBounds1 = this.satBounds;
            const satAxes1 = this.satAxes;
            arr2[0] = other.a;
            arr2[1] = other.b;
            arr2[2] = other.c;
            for(let i = 0; i < 4; i++){
                const sb = satBounds1[i];
                const sa = satAxes1[i];
                cachedSatBounds.setFromPoints(sa, arr2);
                if (sb.isSeparated(cachedSatBounds)) return false;
            }
            const satBounds2 = other.satBounds;
            const satAxes2 = other.satAxes;
            arr1[0] = this.a;
            arr1[1] = this.b;
            arr1[2] = this.c;
            for(let i = 0; i < 4; i++){
                const sb = satBounds2[i];
                const sa = satAxes2[i];
                cachedSatBounds.setFromPoints(sa, arr1);
                if (sb.isSeparated(cachedSatBounds)) return false;
            }
            // check crossed axes
            for(let i = 0; i < 4; i++){
                const sa1 = satAxes1[i];
                for(let i2 = 0; i2 < 4; i2++){
                    const sa2 = satAxes2[i2];
                    cachedAxis.crossVectors(sa1, sa2);
                    cachedSatBounds.setFromPoints(cachedAxis, arr1);
                    cachedSatBounds2.setFromPoints(cachedAxis, arr2);
                    if (cachedSatBounds.isSeparated(cachedSatBounds2)) return false;
                }
            }
            if (target) {
                // TODO find two points that intersect on the edges and make that the result
                if (!suppressLog) console.warn('ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0.');
                target.start.set(0, 0, 0);
                target.end.set(0, 0, 0);
            }
            return true;
        } else {
            // find the edge that intersects the other triangle plane
            const count1 = triIntersectPlane(this, plane2, edge1);
            if (count1 === 1 && other.containsPoint(edge1.end)) {
                if (target) {
                    target.start.copy(edge1.end);
                    target.end.copy(edge1.end);
                }
                return true;
            } else if (count1 !== 2) return false;
            // find the other triangles edge that intersects this plane
            const count2 = triIntersectPlane(other, plane1, edge2);
            if (count2 === 1 && this.containsPoint(edge2.end)) {
                if (target) {
                    target.start.copy(edge2.end);
                    target.end.copy(edge2.end);
                }
                return true;
            } else if (count2 !== 2) return false;
            // find swap the second edge so both lines are running the same direction
            edge1.delta(dir1);
            edge2.delta(dir2);
            if (dir1.dot(dir2) < 0) {
                let tmp = edge2.start;
                edge2.start = edge2.end;
                edge2.end = tmp;
            }
            // check if the edges are overlapping
            const s1 = edge1.start.dot(dir1);
            const e1 = edge1.end.dot(dir1);
            const s2 = edge2.start.dot(dir1);
            const e2 = edge2.end.dot(dir1);
            const separated1 = e1 < s2;
            const separated2 = s1 < e2;
            if (s1 !== e2 && s2 !== e1 && separated1 === separated2) return false;
            // assign the target output
            if (target) {
                tempDir.subVectors(edge1.start, edge2.start);
                if (tempDir.dot(dir1) > 0) target.start.copy(edge1.start);
                else target.start.copy(edge2.start);
                tempDir.subVectors(edge1.end, edge2.end);
                if (tempDir.dot(dir1) < 0) target.end.copy(edge1.end);
                else target.end.copy(edge2.end);
            }
            return true;
        }
    };
}();
ExtendedTriangle.prototype.distanceToPoint = function() {
    const target = new (0, _three.Vector3)();
    return function distanceToPoint(point) {
        this.closestPointToPoint(point, target);
        return point.distanceTo(target);
    };
}();
ExtendedTriangle.prototype.distanceToTriangle = function() {
    const point = new (0, _three.Vector3)();
    const point2 = new (0, _three.Vector3)();
    const cornerFields = [
        'a',
        'b',
        'c'
    ];
    const line1 = new (0, _three.Line3)();
    const line2 = new (0, _three.Line3)();
    return function distanceToTriangle(other, target1 = null, target2 = null) {
        const lineTarget = target1 || target2 ? line1 : null;
        if (this.intersectsTriangle(other, lineTarget)) {
            if (target1 || target2) {
                if (target1) lineTarget.getCenter(target1);
                if (target2) lineTarget.getCenter(target2);
            }
            return 0;
        }
        let closestDistanceSq = Infinity;
        // check all point distances
        for(let i = 0; i < 3; i++){
            let dist;
            const field = cornerFields[i];
            const otherVec = other[field];
            this.closestPointToPoint(otherVec, point);
            dist = otherVec.distanceToSquared(point);
            if (dist < closestDistanceSq) {
                closestDistanceSq = dist;
                if (target1) target1.copy(point);
                if (target2) target2.copy(otherVec);
            }
            const thisVec = this[field];
            other.closestPointToPoint(thisVec, point);
            dist = thisVec.distanceToSquared(point);
            if (dist < closestDistanceSq) {
                closestDistanceSq = dist;
                if (target1) target1.copy(thisVec);
                if (target2) target2.copy(point);
            }
        }
        for(let i = 0; i < 3; i++){
            const f11 = cornerFields[i];
            const f12 = cornerFields[(i + 1) % 3];
            line1.set(this[f11], this[f12]);
            for(let i2 = 0; i2 < 3; i2++){
                const f21 = cornerFields[i2];
                const f22 = cornerFields[(i2 + 1) % 3];
                line2.set(other[f21], other[f22]);
                (0, _mathUtilitiesJs.closestPointsSegmentToSegment)(line1, line2, point, point2);
                const dist = point.distanceToSquared(point2);
                if (dist < closestDistanceSq) {
                    closestDistanceSq = dist;
                    if (target1) target1.copy(point);
                    if (target2) target2.copy(point2);
                }
            }
        }
        return Math.sqrt(closestDistanceSq);
    };
}();

},{"three":"ktPTu","./SeparatingAxisBounds.js":"kEopM","./MathUtilities.js":"DysKq","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"DysKq":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "closestPointLineToLine", ()=>closestPointLineToLine);
parcelHelpers.export(exports, "closestPointsSegmentToSegment", ()=>closestPointsSegmentToSegment);
parcelHelpers.export(exports, "sphereIntersectTriangle", ()=>sphereIntersectTriangle);
var _three = require("three");
const closestPointLineToLine = function() {
    // https://github.com/juj/MathGeoLib/blob/master/src/Geometry/Line.cpp#L56
    const dir1 = new (0, _three.Vector3)();
    const dir2 = new (0, _three.Vector3)();
    const v02 = new (0, _three.Vector3)();
    return function closestPointLineToLine(l1, l2, result) {
        const v0 = l1.start;
        const v10 = dir1;
        const v2 = l2.start;
        const v32 = dir2;
        v02.subVectors(v0, v2);
        dir1.subVectors(l1.end, l1.start);
        dir2.subVectors(l2.end, l2.start);
        // float d0232 = v02.Dot(v32);
        const d0232 = v02.dot(v32);
        // float d3210 = v32.Dot(v10);
        const d3210 = v32.dot(v10);
        // float d3232 = v32.Dot(v32);
        const d3232 = v32.dot(v32);
        // float d0210 = v02.Dot(v10);
        const d0210 = v02.dot(v10);
        // float d1010 = v10.Dot(v10);
        const d1010 = v10.dot(v10);
        // float denom = d1010*d3232 - d3210*d3210;
        const denom = d1010 * d3232 - d3210 * d3210;
        let d, d2;
        if (denom !== 0) d = (d0232 * d3210 - d0210 * d3232) / denom;
        else d = 0;
        d2 = (d0232 + d * d3210) / d3232;
        result.x = d;
        result.y = d2;
    };
}();
const closestPointsSegmentToSegment = function() {
    // https://github.com/juj/MathGeoLib/blob/master/src/Geometry/LineSegment.cpp#L187
    const paramResult = new (0, _three.Vector2)();
    const temp1 = new (0, _three.Vector3)();
    const temp2 = new (0, _three.Vector3)();
    return function closestPointsSegmentToSegment(l1, l2, target1, target2) {
        closestPointLineToLine(l1, l2, paramResult);
        let d = paramResult.x;
        let d2 = paramResult.y;
        if (d >= 0 && d <= 1 && d2 >= 0 && d2 <= 1) {
            l1.at(d, target1);
            l2.at(d2, target2);
            return;
        } else if (d >= 0 && d <= 1) {
            // Only d2 is out of bounds.
            if (d2 < 0) l2.at(0, target2);
            else l2.at(1, target2);
            l1.closestPointToPoint(target2, true, target1);
            return;
        } else if (d2 >= 0 && d2 <= 1) {
            // Only d is out of bounds.
            if (d < 0) l1.at(0, target1);
            else l1.at(1, target1);
            l2.closestPointToPoint(target1, true, target2);
            return;
        } else {
            // Both u and u2 are out of bounds.
            let p;
            if (d < 0) p = l1.start;
            else p = l1.end;
            let p2;
            if (d2 < 0) p2 = l2.start;
            else p2 = l2.end;
            const closestPoint = temp1;
            const closestPoint2 = temp2;
            l1.closestPointToPoint(p2, true, temp1);
            l2.closestPointToPoint(p, true, temp2);
            if (closestPoint.distanceToSquared(p2) <= closestPoint2.distanceToSquared(p)) {
                target1.copy(closestPoint);
                target2.copy(p2);
                return;
            } else {
                target1.copy(p);
                target2.copy(closestPoint2);
                return;
            }
        }
    };
}();
const sphereIntersectTriangle = function() {
    // https://stackoverflow.com/questions/34043955/detect-collision-between-sphere-and-triangle-in-three-js
    const closestPointTemp = new (0, _three.Vector3)();
    const projectedPointTemp = new (0, _three.Vector3)();
    const planeTemp = new (0, _three.Plane)();
    const lineTemp = new (0, _three.Line3)();
    return function sphereIntersectTriangle(sphere, triangle) {
        const { radius, center } = sphere;
        const { a, b, c } = triangle;
        // phase 1
        lineTemp.start = a;
        lineTemp.end = b;
        const closestPoint1 = lineTemp.closestPointToPoint(center, true, closestPointTemp);
        if (closestPoint1.distanceTo(center) <= radius) return true;
        lineTemp.start = a;
        lineTemp.end = c;
        const closestPoint2 = lineTemp.closestPointToPoint(center, true, closestPointTemp);
        if (closestPoint2.distanceTo(center) <= radius) return true;
        lineTemp.start = b;
        lineTemp.end = c;
        const closestPoint3 = lineTemp.closestPointToPoint(center, true, closestPointTemp);
        if (closestPoint3.distanceTo(center) <= radius) return true;
        // phase 2
        const plane = triangle.getPlane(planeTemp);
        const dp = Math.abs(plane.distanceToPoint(center));
        if (dp <= radius) {
            const pp = plane.projectPoint(center, projectedPointTemp);
            const cp = triangle.containsPoint(pp);
            if (cp) return true;
        }
        return false;
    };
}();

},{"three":"ktPTu","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9EYXZ":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ExtendedTrianglePool", ()=>ExtendedTrianglePool);
var _extendedTriangleJs = require("../math/ExtendedTriangle.js");
var _primitivePoolJs = require("./PrimitivePool.js");
class ExtendedTrianglePoolBase extends (0, _primitivePoolJs.PrimitivePool) {
    constructor(){
        super(()=>new (0, _extendedTriangleJs.ExtendedTriangle)());
    }
}
const ExtendedTrianglePool = /* @__PURE__ */ new ExtendedTrianglePoolBase();

},{"../math/ExtendedTriangle.js":"bw9AP","./PrimitivePool.js":"lvehm","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lvehm":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "PrimitivePool", ()=>PrimitivePool);
class PrimitivePool {
    constructor(getNewPrimitive){
        this._getNewPrimitive = getNewPrimitive;
        this._primitives = [];
    }
    getPrimitive() {
        const primitives = this._primitives;
        if (primitives.length === 0) return this._getNewPrimitive();
        else return primitives.pop();
    }
    releasePrimitive(primitive) {
        this._primitives.push(primitive);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9JLlH":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "shapecast", ()=>shapecast);
var _three = require("three");
var _constantsJs = require("../Constants.js");
var _arrayBoxUtilitiesJs = require("../../utils/ArrayBoxUtilities.js");
var _primitivePoolJs = require("../../utils/PrimitivePool.js");
var _nodeBufferUtilsJs = require("../utils/nodeBufferUtils.js");
var _bufferStackJs = require("../utils/BufferStack.js");
let _box1, _box2;
const boxStack = [];
const boxPool = /* @__PURE__ */ new (0, _primitivePoolJs.PrimitivePool)(()=>new (0, _three.Box3)());
function shapecast(bvh, root, intersectsBounds, intersectsRange, boundsTraverseOrder, byteOffset) {
    // setup
    _box1 = boxPool.getPrimitive();
    _box2 = boxPool.getPrimitive();
    boxStack.push(_box1, _box2);
    (0, _bufferStackJs.BufferStack).setBuffer(bvh._roots[root]);
    const result = shapecastTraverse(0, bvh.geometry, intersectsBounds, intersectsRange, boundsTraverseOrder, byteOffset);
    // cleanup
    (0, _bufferStackJs.BufferStack).clearBuffer();
    boxPool.releasePrimitive(_box1);
    boxPool.releasePrimitive(_box2);
    boxStack.pop();
    boxStack.pop();
    const length = boxStack.length;
    if (length > 0) {
        _box2 = boxStack[length - 1];
        _box1 = boxStack[length - 2];
    }
    return result;
}
function shapecastTraverse(nodeIndex32, geometry, intersectsBoundsFunc, intersectsRangeFunc, nodeScoreFunc = null, nodeIndexByteOffset = 0, depth = 0) {
    const { float32Array, uint16Array, uint32Array } = (0, _bufferStackJs.BufferStack);
    let nodeIndex16 = nodeIndex32 * 2;
    const isLeaf = (0, _nodeBufferUtilsJs.IS_LEAF)(nodeIndex16, uint16Array);
    if (isLeaf) {
        const offset = (0, _nodeBufferUtilsJs.OFFSET)(nodeIndex32, uint32Array);
        const count = (0, _nodeBufferUtilsJs.COUNT)(nodeIndex16, uint16Array);
        (0, _arrayBoxUtilitiesJs.arrayToBox)((0, _nodeBufferUtilsJs.BOUNDING_DATA_INDEX)(nodeIndex32), float32Array, _box1);
        return intersectsRangeFunc(offset, count, false, depth, nodeIndexByteOffset + nodeIndex32, _box1);
    } else {
        const left = (0, _nodeBufferUtilsJs.LEFT_NODE)(nodeIndex32);
        const right = (0, _nodeBufferUtilsJs.RIGHT_NODE)(nodeIndex32, uint32Array);
        let c1 = left;
        let c2 = right;
        let score1, score2;
        let box1, box2;
        if (nodeScoreFunc) {
            box1 = _box1;
            box2 = _box2;
            // bounding data is not offset
            (0, _arrayBoxUtilitiesJs.arrayToBox)((0, _nodeBufferUtilsJs.BOUNDING_DATA_INDEX)(c1), float32Array, box1);
            (0, _arrayBoxUtilitiesJs.arrayToBox)((0, _nodeBufferUtilsJs.BOUNDING_DATA_INDEX)(c2), float32Array, box2);
            score1 = nodeScoreFunc(box1);
            score2 = nodeScoreFunc(box2);
            if (score2 < score1) {
                c1 = right;
                c2 = left;
                const temp = score1;
                score1 = score2;
                score2 = temp;
                box1 = box2;
            // box2 is always set before use below
            }
        }
        // Check box 1 intersection
        if (!box1) {
            box1 = _box1;
            (0, _arrayBoxUtilitiesJs.arrayToBox)((0, _nodeBufferUtilsJs.BOUNDING_DATA_INDEX)(c1), float32Array, box1);
        }
        const isC1Leaf = (0, _nodeBufferUtilsJs.IS_LEAF)(c1 * 2, uint16Array);
        const c1Intersection = intersectsBoundsFunc(box1, isC1Leaf, score1, depth + 1, nodeIndexByteOffset + c1);
        let c1StopTraversal;
        if (c1Intersection === (0, _constantsJs.CONTAINED)) {
            const offset = getLeftOffset(c1);
            const end = getRightEndOffset(c1);
            const count = end - offset;
            c1StopTraversal = intersectsRangeFunc(offset, count, true, depth + 1, nodeIndexByteOffset + c1, box1);
        } else c1StopTraversal = c1Intersection && shapecastTraverse(c1, geometry, intersectsBoundsFunc, intersectsRangeFunc, nodeScoreFunc, nodeIndexByteOffset, depth + 1);
        if (c1StopTraversal) return true;
        // Check box 2 intersection
        // cached box2 will have been overwritten by previous traversal
        box2 = _box2;
        (0, _arrayBoxUtilitiesJs.arrayToBox)((0, _nodeBufferUtilsJs.BOUNDING_DATA_INDEX)(c2), float32Array, box2);
        const isC2Leaf = (0, _nodeBufferUtilsJs.IS_LEAF)(c2 * 2, uint16Array);
        const c2Intersection = intersectsBoundsFunc(box2, isC2Leaf, score2, depth + 1, nodeIndexByteOffset + c2);
        let c2StopTraversal;
        if (c2Intersection === (0, _constantsJs.CONTAINED)) {
            const offset = getLeftOffset(c2);
            const end = getRightEndOffset(c2);
            const count = end - offset;
            c2StopTraversal = intersectsRangeFunc(offset, count, true, depth + 1, nodeIndexByteOffset + c2, box2);
        } else c2StopTraversal = c2Intersection && shapecastTraverse(c2, geometry, intersectsBoundsFunc, intersectsRangeFunc, nodeScoreFunc, nodeIndexByteOffset, depth + 1);
        if (c2StopTraversal) return true;
        return false;
        // Define these inside the function so it has access to the local variables needed
        // when converting to the buffer equivalents
        function getLeftOffset(nodeIndex32) {
            const { uint16Array, uint32Array } = (0, _bufferStackJs.BufferStack);
            let nodeIndex16 = nodeIndex32 * 2;
            // traverse until we find a leaf
            while(!(0, _nodeBufferUtilsJs.IS_LEAF)(nodeIndex16, uint16Array)){
                nodeIndex32 = (0, _nodeBufferUtilsJs.LEFT_NODE)(nodeIndex32);
                nodeIndex16 = nodeIndex32 * 2;
            }
            return (0, _nodeBufferUtilsJs.OFFSET)(nodeIndex32, uint32Array);
        }
        function getRightEndOffset(nodeIndex32) {
            const { uint16Array, uint32Array } = (0, _bufferStackJs.BufferStack);
            let nodeIndex16 = nodeIndex32 * 2;
            // traverse until we find a leaf
            while(!(0, _nodeBufferUtilsJs.IS_LEAF)(nodeIndex16, uint16Array)){
                // adjust offset to point to the right node
                nodeIndex32 = (0, _nodeBufferUtilsJs.RIGHT_NODE)(nodeIndex32, uint32Array);
                nodeIndex16 = nodeIndex32 * 2;
            }
            // return the end offset of the triangle range
            return (0, _nodeBufferUtilsJs.OFFSET)(nodeIndex32, uint32Array) + (0, _nodeBufferUtilsJs.COUNT)(nodeIndex16, uint16Array);
        }
    }
}

},{"three":"ktPTu","../Constants.js":"i15yM","../../utils/ArrayBoxUtilities.js":"axERW","../../utils/PrimitivePool.js":"lvehm","../utils/nodeBufferUtils.js":"gJWU9","../utils/BufferStack.js":"bkDBK","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bkDBK":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "BufferStack", ()=>BufferStack);
class _BufferStack {
    constructor(){
        this.float32Array = null;
        this.uint16Array = null;
        this.uint32Array = null;
        const stack = [];
        let prevBuffer = null;
        this.setBuffer = (buffer)=>{
            if (prevBuffer) stack.push(prevBuffer);
            prevBuffer = buffer;
            this.float32Array = new Float32Array(buffer);
            this.uint16Array = new Uint16Array(buffer);
            this.uint32Array = new Uint32Array(buffer);
        };
        this.clearBuffer = ()=>{
            prevBuffer = null;
            this.float32Array = null;
            this.uint16Array = null;
            this.uint32Array = null;
            if (stack.length !== 0) this.setBuffer(stack.pop());
        };
    }
}
const BufferStack = new _BufferStack();

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"caGvm":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "closestPointToPoint", ()=>closestPointToPoint);
var _three = require("three");
const temp = /* @__PURE__ */ new (0, _three.Vector3)();
const temp1 = /* @__PURE__ */ new (0, _three.Vector3)();
function closestPointToPoint(bvh, point, target = {}, minThreshold = 0, maxThreshold = Infinity) {
    // early out if under minThreshold
    // skip checking if over maxThreshold
    // set minThreshold = maxThreshold to quickly check if a point is within a threshold
    // returns Infinity if no value found
    const minThresholdSq = minThreshold * minThreshold;
    const maxThresholdSq = maxThreshold * maxThreshold;
    let closestDistanceSq = Infinity;
    let closestDistanceTriIndex = null;
    bvh.shapecast({
        boundsTraverseOrder: (box)=>{
            temp.copy(point).clamp(box.min, box.max);
            return temp.distanceToSquared(point);
        },
        intersectsBounds: (box, isLeaf, score)=>{
            return score < closestDistanceSq && score < maxThresholdSq;
        },
        intersectsTriangle: (tri, triIndex)=>{
            tri.closestPointToPoint(point, temp);
            const distSq = point.distanceToSquared(temp);
            if (distSq < closestDistanceSq) {
                temp1.copy(temp);
                closestDistanceSq = distSq;
                closestDistanceTriIndex = triIndex;
            }
            if (distSq < minThresholdSq) return true;
            else return false;
        }
    });
    if (closestDistanceSq === Infinity) return null;
    const closestDistance = Math.sqrt(closestDistanceSq);
    if (!target.point) target.point = temp1.clone();
    else target.point.copy(temp1);
    target.distance = closestDistance, target.faceIndex = closestDistanceTriIndex;
    return target;
}

},{"three":"ktPTu","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"brbcV":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "intersectClosestTri", ()=>intersectClosestTri);
parcelHelpers.export(exports, "intersectTris", ()=>intersectTris);
parcelHelpers.export(exports, "iterateOverTriangles", ()=>iterateOverTriangles);
var _threeRayIntersectUtilitiesJs = require("../../utils/ThreeRayIntersectUtilities.js");
var _triangleUtilitiesJs = require("../../utils/TriangleUtilities.js");
/*************************************************************/ /* This file is generated from "iterationUtils.template.js". */ /*************************************************************/ /* eslint-disable indent */ function intersectTris(bvh, side, ray, offset, count, intersections, near, far) {
    const { geometry, _indirectBuffer } = bvh;
    for(let i = offset, end = offset + count; i < end; i++)(0, _threeRayIntersectUtilitiesJs.intersectTri)(geometry, side, ray, i, intersections, near, far);
}
function intersectClosestTri(bvh, side, ray, offset, count, near, far) {
    const { geometry, _indirectBuffer } = bvh;
    let dist = Infinity;
    let res = null;
    for(let i = offset, end = offset + count; i < end; i++){
        let intersection;
        intersection = (0, _threeRayIntersectUtilitiesJs.intersectTri)(geometry, side, ray, i, null, near, far);
        if (intersection && intersection.distance < dist) {
            res = intersection;
            dist = intersection.distance;
        }
    }
    return res;
}
function iterateOverTriangles(offset, count, bvh, intersectsTriangleFunc, contained, depth, triangle) {
    const { geometry } = bvh;
    const { index } = geometry;
    const pos = geometry.attributes.position;
    for(let i = offset, l = count + offset; i < l; i++){
        let tri;
        tri = i;
        (0, _triangleUtilitiesJs.setTriangle)(triangle, tri * 3, index, pos);
        triangle.needsUpdate = true;
        if (intersectsTriangleFunc(triangle, tri, contained, depth)) return true;
    }
    return false;
}

},{"../../utils/ThreeRayIntersectUtilities.js":"gvTSi","../../utils/TriangleUtilities.js":"6tB2U","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gvTSi":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "intersectTri", ()=>intersectTri);
var _three = require("three");
// Ripped and modified From THREE.js Mesh raycast
// https://github.com/mrdoob/three.js/blob/0aa87c999fe61e216c1133fba7a95772b503eddf/src/objects/Mesh.js#L115
const _vA = /* @__PURE__ */ new (0, _three.Vector3)();
const _vB = /* @__PURE__ */ new (0, _three.Vector3)();
const _vC = /* @__PURE__ */ new (0, _three.Vector3)();
const _uvA = /* @__PURE__ */ new (0, _three.Vector2)();
const _uvB = /* @__PURE__ */ new (0, _three.Vector2)();
const _uvC = /* @__PURE__ */ new (0, _three.Vector2)();
const _normalA = /* @__PURE__ */ new (0, _three.Vector3)();
const _normalB = /* @__PURE__ */ new (0, _three.Vector3)();
const _normalC = /* @__PURE__ */ new (0, _three.Vector3)();
const _intersectionPoint = /* @__PURE__ */ new (0, _three.Vector3)();
function checkIntersection(ray, pA, pB, pC, point, side, near, far) {
    let intersect;
    if (side === (0, _three.BackSide)) intersect = ray.intersectTriangle(pC, pB, pA, true, point);
    else intersect = ray.intersectTriangle(pA, pB, pC, side !== (0, _three.DoubleSide), point);
    if (intersect === null) return null;
    const distance = ray.origin.distanceTo(point);
    if (distance < near || distance > far) return null;
    return {
        distance: distance,
        point: point.clone()
    };
}
function checkBufferGeometryIntersection(ray, position, normal, uv, uv1, a, b, c, side, near, far) {
    _vA.fromBufferAttribute(position, a);
    _vB.fromBufferAttribute(position, b);
    _vC.fromBufferAttribute(position, c);
    const intersection = checkIntersection(ray, _vA, _vB, _vC, _intersectionPoint, side, near, far);
    if (intersection) {
        if (uv) {
            _uvA.fromBufferAttribute(uv, a);
            _uvB.fromBufferAttribute(uv, b);
            _uvC.fromBufferAttribute(uv, c);
            intersection.uv = (0, _three.Triangle).getInterpolation(_intersectionPoint, _vA, _vB, _vC, _uvA, _uvB, _uvC, new (0, _three.Vector2)());
        }
        if (uv1) {
            _uvA.fromBufferAttribute(uv1, a);
            _uvB.fromBufferAttribute(uv1, b);
            _uvC.fromBufferAttribute(uv1, c);
            intersection.uv1 = (0, _three.Triangle).getInterpolation(_intersectionPoint, _vA, _vB, _vC, _uvA, _uvB, _uvC, new (0, _three.Vector2)());
        }
        if (normal) {
            _normalA.fromBufferAttribute(normal, a);
            _normalB.fromBufferAttribute(normal, b);
            _normalC.fromBufferAttribute(normal, c);
            intersection.normal = (0, _three.Triangle).getInterpolation(_intersectionPoint, _vA, _vB, _vC, _normalA, _normalB, _normalC, new (0, _three.Vector3)());
            if (intersection.normal.dot(ray.direction) > 0) intersection.normal.multiplyScalar(-1);
        }
        const face = {
            a: a,
            b: b,
            c: c,
            normal: new (0, _three.Vector3)(),
            materialIndex: 0
        };
        (0, _three.Triangle).getNormal(_vA, _vB, _vC, face.normal);
        intersection.face = face;
        intersection.faceIndex = a;
    }
    return intersection;
}
// https://github.com/mrdoob/three.js/blob/0aa87c999fe61e216c1133fba7a95772b503eddf/src/objects/Mesh.js#L258
function intersectTri(geo, side, ray, tri, intersections, near, far) {
    const triOffset = tri * 3;
    let a = triOffset + 0;
    let b = triOffset + 1;
    let c = triOffset + 2;
    const index = geo.index;
    if (geo.index) {
        a = index.getX(a);
        b = index.getX(b);
        c = index.getX(c);
    }
    const { position, normal, uv, uv1 } = geo.attributes;
    const intersection = checkBufferGeometryIntersection(ray, position, normal, uv, uv1, a, b, c, side, near, far);
    if (intersection) {
        intersection.faceIndex = tri;
        if (intersections) intersections.push(intersection);
        return intersection;
    }
    return null;
}

},{"three":"ktPTu","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6tB2U":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// sets the vertices of triangle `tri` with the 3 vertices after i
parcelHelpers.export(exports, "setTriangle", ()=>setTriangle);
parcelHelpers.export(exports, "getTriangleHitPointInfo", ()=>getTriangleHitPointInfo);
var _three = require("three");
function setTriangle(tri, i, index, pos) {
    const ta = tri.a;
    const tb = tri.b;
    const tc = tri.c;
    let i0 = i;
    let i1 = i + 1;
    let i2 = i + 2;
    if (index) {
        i0 = index.getX(i0);
        i1 = index.getX(i1);
        i2 = index.getX(i2);
    }
    ta.x = pos.getX(i0);
    ta.y = pos.getY(i0);
    ta.z = pos.getZ(i0);
    tb.x = pos.getX(i1);
    tb.y = pos.getY(i1);
    tb.z = pos.getZ(i1);
    tc.x = pos.getX(i2);
    tc.y = pos.getY(i2);
    tc.z = pos.getZ(i2);
}
const tempV1 = /* @__PURE__ */ new (0, _three.Vector3)();
const tempV2 = /* @__PURE__ */ new (0, _three.Vector3)();
const tempV3 = /* @__PURE__ */ new (0, _three.Vector3)();
const tempUV1 = /* @__PURE__ */ new (0, _three.Vector2)();
const tempUV2 = /* @__PURE__ */ new (0, _three.Vector2)();
const tempUV3 = /* @__PURE__ */ new (0, _three.Vector2)();
function getTriangleHitPointInfo(point, geometry, triangleIndex, target) {
    const indices = geometry.getIndex().array;
    const positions = geometry.getAttribute('position');
    const uvs = geometry.getAttribute('uv');
    const a = indices[triangleIndex * 3];
    const b = indices[triangleIndex * 3 + 1];
    const c = indices[triangleIndex * 3 + 2];
    tempV1.fromBufferAttribute(positions, a);
    tempV2.fromBufferAttribute(positions, b);
    tempV3.fromBufferAttribute(positions, c);
    // find the associated material index
    let materialIndex = 0;
    const groups = geometry.groups;
    const firstVertexIndex = triangleIndex * 3;
    for(let i = 0, l = groups.length; i < l; i++){
        const group = groups[i];
        const { start, count } = group;
        if (firstVertexIndex >= start && firstVertexIndex < start + count) {
            materialIndex = group.materialIndex;
            break;
        }
    }
    // extract uvs
    let uv = null;
    if (uvs) {
        tempUV1.fromBufferAttribute(uvs, a);
        tempUV2.fromBufferAttribute(uvs, b);
        tempUV3.fromBufferAttribute(uvs, c);
        if (target && target.uv) uv = target.uv;
        else uv = new (0, _three.Vector2)();
        (0, _three.Triangle).getInterpolation(point, tempV1, tempV2, tempV3, tempUV1, tempUV2, tempUV3, uv);
    }
    // adjust the provided target or create a new one
    if (target) {
        if (!target.face) target.face = {};
        target.face.a = a;
        target.face.b = b;
        target.face.c = c;
        target.face.materialIndex = materialIndex;
        if (!target.face.normal) target.face.normal = new (0, _three.Vector3)();
        (0, _three.Triangle).getNormal(tempV1, tempV2, tempV3, target.face.normal);
        if (uv) target.uv = uv;
        return target;
    } else return {
        face: {
            a: a,
            b: b,
            c: c,
            materialIndex: materialIndex,
            normal: (0, _three.Triangle).getNormal(tempV1, tempV2, tempV3, new (0, _three.Vector3)())
        },
        uv: uv
    };
}

},{"three":"ktPTu","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iDfT5":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "refit", ()=>refit);
var _constantsJs = require("../Constants.js");
/****************************************************/ /* This file is generated from "refit.template.js". */ /****************************************************/ function refit(bvh, nodeIndices = null) {
    if (nodeIndices && Array.isArray(nodeIndices)) nodeIndices = new Set(nodeIndices);
    const geometry = bvh.geometry;
    const indexArr = geometry.index ? geometry.index.array : null;
    const posAttr = geometry.attributes.position;
    let buffer, uint32Array, uint16Array, float32Array;
    let byteOffset = 0;
    const roots = bvh._roots;
    for(let i = 0, l = roots.length; i < l; i++){
        buffer = roots[i];
        uint32Array = new Uint32Array(buffer);
        uint16Array = new Uint16Array(buffer);
        float32Array = new Float32Array(buffer);
        _traverse(0, byteOffset);
        byteOffset += buffer.byteLength;
    }
    function _traverse(node32Index, byteOffset, force = false) {
        const node16Index = node32Index * 2;
        const isLeaf = uint16Array[node16Index + 15] === (0, _constantsJs.IS_LEAFNODE_FLAG);
        if (isLeaf) {
            const offset = uint32Array[node32Index + 6];
            const count = uint16Array[node16Index + 14];
            let minx = Infinity;
            let miny = Infinity;
            let minz = Infinity;
            let maxx = -Infinity;
            let maxy = -Infinity;
            let maxz = -Infinity;
            for(let i = 3 * offset, l = 3 * (offset + count); i < l; i++){
                let index = indexArr[i];
                const x = posAttr.getX(index);
                const y = posAttr.getY(index);
                const z = posAttr.getZ(index);
                if (x < minx) minx = x;
                if (x > maxx) maxx = x;
                if (y < miny) miny = y;
                if (y > maxy) maxy = y;
                if (z < minz) minz = z;
                if (z > maxz) maxz = z;
            }
            if (float32Array[node32Index + 0] !== minx || float32Array[node32Index + 1] !== miny || float32Array[node32Index + 2] !== minz || float32Array[node32Index + 3] !== maxx || float32Array[node32Index + 4] !== maxy || float32Array[node32Index + 5] !== maxz) {
                float32Array[node32Index + 0] = minx;
                float32Array[node32Index + 1] = miny;
                float32Array[node32Index + 2] = minz;
                float32Array[node32Index + 3] = maxx;
                float32Array[node32Index + 4] = maxy;
                float32Array[node32Index + 5] = maxz;
                return true;
            } else return false;
        } else {
            const left = node32Index + 8;
            const right = uint32Array[node32Index + 6];
            // the identifying node indices provided by the shapecast function include offsets of all
            // root buffers to guarantee they're unique between roots so offset left and right indices here.
            const offsetLeft = left + byteOffset;
            const offsetRight = right + byteOffset;
            let forceChildren = force;
            let includesLeft = false;
            let includesRight = false;
            if (nodeIndices) // if we see that neither the left or right child are included in the set that need to be updated
            // then we assume that all children need to be updated.
            {
                if (!forceChildren) {
                    includesLeft = nodeIndices.has(offsetLeft);
                    includesRight = nodeIndices.has(offsetRight);
                    forceChildren = !includesLeft && !includesRight;
                }
            } else {
                includesLeft = true;
                includesRight = true;
            }
            const traverseLeft = forceChildren || includesLeft;
            const traverseRight = forceChildren || includesRight;
            let leftChange = false;
            if (traverseLeft) leftChange = _traverse(left, byteOffset, forceChildren);
            let rightChange = false;
            if (traverseRight) rightChange = _traverse(right, byteOffset, forceChildren);
            const didChange = leftChange || rightChange;
            if (didChange) for(let i = 0; i < 3; i++){
                const lefti = left + i;
                const righti = right + i;
                const minLeftValue = float32Array[lefti];
                const maxLeftValue = float32Array[lefti + 3];
                const minRightValue = float32Array[righti];
                const maxRightValue = float32Array[righti + 3];
                float32Array[node32Index + i] = minLeftValue < minRightValue ? minLeftValue : minRightValue;
                float32Array[node32Index + i + 3] = maxLeftValue > maxRightValue ? maxLeftValue : maxRightValue;
            }
            return didChange;
        }
    }
}

},{"../Constants.js":"i15yM","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jcUJj":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "raycast", ()=>raycast);
var _intersectUtilsJs = require("../utils/intersectUtils.js");
var _nodeBufferUtilsJs = require("../utils/nodeBufferUtils.js");
var _bufferStackJs = require("../utils/BufferStack.js");
var _iterationUtilsGeneratedJs = require("../utils/iterationUtils.generated.js");
var _iterationUtilsIndirectGeneratedJs = require("../utils/iterationUtils_indirect.generated.js");
/******************************************************/ /* This file is generated from "raycast.template.js". */ /******************************************************/ function raycast(bvh, root, side, ray, intersects, near, far) {
    (0, _bufferStackJs.BufferStack).setBuffer(bvh._roots[root]);
    _raycast(0, bvh, side, ray, intersects, near, far);
    (0, _bufferStackJs.BufferStack).clearBuffer();
}
function _raycast(nodeIndex32, bvh, side, ray, intersects, near, far) {
    const { float32Array, uint16Array, uint32Array } = (0, _bufferStackJs.BufferStack);
    const nodeIndex16 = nodeIndex32 * 2;
    const isLeaf = (0, _nodeBufferUtilsJs.IS_LEAF)(nodeIndex16, uint16Array);
    if (isLeaf) {
        const offset = (0, _nodeBufferUtilsJs.OFFSET)(nodeIndex32, uint32Array);
        const count = (0, _nodeBufferUtilsJs.COUNT)(nodeIndex16, uint16Array);
        (0, _iterationUtilsGeneratedJs.intersectTris)(bvh, side, ray, offset, count, intersects, near, far);
    } else {
        const leftIndex = (0, _nodeBufferUtilsJs.LEFT_NODE)(nodeIndex32);
        if ((0, _intersectUtilsJs.intersectRay)(leftIndex, float32Array, ray, near, far)) _raycast(leftIndex, bvh, side, ray, intersects, near, far);
        const rightIndex = (0, _nodeBufferUtilsJs.RIGHT_NODE)(nodeIndex32, uint32Array);
        if ((0, _intersectUtilsJs.intersectRay)(rightIndex, float32Array, ray, near, far)) _raycast(rightIndex, bvh, side, ray, intersects, near, far);
    }
}

},{"../utils/intersectUtils.js":"eN9HX","../utils/nodeBufferUtils.js":"gJWU9","../utils/BufferStack.js":"bkDBK","../utils/iterationUtils.generated.js":"brbcV","../utils/iterationUtils_indirect.generated.js":"71cmv","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"eN9HX":[function(require,module,exports,__globalThis) {
/**
 * This function performs intersection tests similar to Ray.intersectBox in three.js,
 * with the difference that the box values are read from an array to improve performance.
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "intersectRay", ()=>intersectRay);
function intersectRay(nodeIndex32, array, ray, near, far) {
    let tmin, tmax, tymin, tymax, tzmin, tzmax;
    const invdirx = 1 / ray.direction.x, invdiry = 1 / ray.direction.y, invdirz = 1 / ray.direction.z;
    const ox = ray.origin.x;
    const oy = ray.origin.y;
    const oz = ray.origin.z;
    let minx = array[nodeIndex32];
    let maxx = array[nodeIndex32 + 3];
    let miny = array[nodeIndex32 + 1];
    let maxy = array[nodeIndex32 + 3 + 1];
    let minz = array[nodeIndex32 + 2];
    let maxz = array[nodeIndex32 + 3 + 2];
    if (invdirx >= 0) {
        tmin = (minx - ox) * invdirx;
        tmax = (maxx - ox) * invdirx;
    } else {
        tmin = (maxx - ox) * invdirx;
        tmax = (minx - ox) * invdirx;
    }
    if (invdiry >= 0) {
        tymin = (miny - oy) * invdiry;
        tymax = (maxy - oy) * invdiry;
    } else {
        tymin = (maxy - oy) * invdiry;
        tymax = (miny - oy) * invdiry;
    }
    if (tmin > tymax || tymin > tmax) return false;
    if (tymin > tmin || isNaN(tmin)) tmin = tymin;
    if (tymax < tmax || isNaN(tmax)) tmax = tymax;
    if (invdirz >= 0) {
        tzmin = (minz - oz) * invdirz;
        tzmax = (maxz - oz) * invdirz;
    } else {
        tzmin = (maxz - oz) * invdirz;
        tzmax = (minz - oz) * invdirz;
    }
    if (tmin > tzmax || tzmin > tmax) return false;
    if (tzmin > tmin || tmin !== tmin) tmin = tzmin;
    if (tzmax < tmax || tmax !== tmax) tmax = tzmax;
    //return point closest to the ray (positive side)
    return tmin <= far && tmax >= near;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"71cmv":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "intersectClosestTri_indirect", ()=>intersectClosestTri_indirect);
parcelHelpers.export(exports, "intersectTris_indirect", ()=>intersectTris_indirect);
parcelHelpers.export(exports, "iterateOverTriangles_indirect", ()=>iterateOverTriangles_indirect);
var _threeRayIntersectUtilitiesJs = require("../../utils/ThreeRayIntersectUtilities.js");
var _triangleUtilitiesJs = require("../../utils/TriangleUtilities.js");
/*************************************************************/ /* This file is generated from "iterationUtils.template.js". */ /*************************************************************/ /* eslint-disable indent */ function intersectTris_indirect(bvh, side, ray, offset, count, intersections, near, far) {
    const { geometry, _indirectBuffer } = bvh;
    for(let i = offset, end = offset + count; i < end; i++){
        let vi = _indirectBuffer ? _indirectBuffer[i] : i;
        (0, _threeRayIntersectUtilitiesJs.intersectTri)(geometry, side, ray, vi, intersections, near, far);
    }
}
function intersectClosestTri_indirect(bvh, side, ray, offset, count, near, far) {
    const { geometry, _indirectBuffer } = bvh;
    let dist = Infinity;
    let res = null;
    for(let i = offset, end = offset + count; i < end; i++){
        let intersection;
        intersection = (0, _threeRayIntersectUtilitiesJs.intersectTri)(geometry, side, ray, _indirectBuffer ? _indirectBuffer[i] : i, null, near, far);
        if (intersection && intersection.distance < dist) {
            res = intersection;
            dist = intersection.distance;
        }
    }
    return res;
}
function iterateOverTriangles_indirect(offset, count, bvh, intersectsTriangleFunc, contained, depth, triangle) {
    const { geometry } = bvh;
    const { index } = geometry;
    const pos = geometry.attributes.position;
    for(let i = offset, l = count + offset; i < l; i++){
        let tri;
        tri = bvh.resolveTriangleIndex(i);
        (0, _triangleUtilitiesJs.setTriangle)(triangle, tri * 3, index, pos);
        triangle.needsUpdate = true;
        if (intersectsTriangleFunc(triangle, tri, contained, depth)) return true;
    }
    return false;
}

},{"../../utils/ThreeRayIntersectUtilities.js":"gvTSi","../../utils/TriangleUtilities.js":"6tB2U","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aphx5":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "raycastFirst", ()=>raycastFirst);
var _nodeBufferUtilsJs = require("../utils/nodeBufferUtils.js");
var _bufferStackJs = require("../utils/BufferStack.js");
var _intersectUtilsJs = require("../utils/intersectUtils.js");
var _iterationUtilsGeneratedJs = require("../utils/iterationUtils.generated.js");
var _iterationUtilsIndirectGeneratedJs = require("../utils/iterationUtils_indirect.generated.js");
/***********************************************************/ /* This file is generated from "raycastFirst.template.js". */ /***********************************************************/ const _xyzFields = [
    'x',
    'y',
    'z'
];
function raycastFirst(bvh, root, side, ray, near, far) {
    (0, _bufferStackJs.BufferStack).setBuffer(bvh._roots[root]);
    const result = _raycastFirst(0, bvh, side, ray, near, far);
    (0, _bufferStackJs.BufferStack).clearBuffer();
    return result;
}
function _raycastFirst(nodeIndex32, bvh, side, ray, near, far) {
    const { float32Array, uint16Array, uint32Array } = (0, _bufferStackJs.BufferStack);
    let nodeIndex16 = nodeIndex32 * 2;
    const isLeaf = (0, _nodeBufferUtilsJs.IS_LEAF)(nodeIndex16, uint16Array);
    if (isLeaf) {
        const offset = (0, _nodeBufferUtilsJs.OFFSET)(nodeIndex32, uint32Array);
        const count = (0, _nodeBufferUtilsJs.COUNT)(nodeIndex16, uint16Array);
        // eslint-disable-next-line no-unreachable
        return (0, _iterationUtilsGeneratedJs.intersectClosestTri)(bvh, side, ray, offset, count, near, far);
    } else {
        // consider the position of the split plane with respect to the oncoming ray; whichever direction
        // the ray is coming from, look for an intersection among that side of the tree first
        const splitAxis = (0, _nodeBufferUtilsJs.SPLIT_AXIS)(nodeIndex32, uint32Array);
        const xyzAxis = _xyzFields[splitAxis];
        const rayDir = ray.direction[xyzAxis];
        const leftToRight = rayDir >= 0;
        // c1 is the child to check first
        let c1, c2;
        if (leftToRight) {
            c1 = (0, _nodeBufferUtilsJs.LEFT_NODE)(nodeIndex32);
            c2 = (0, _nodeBufferUtilsJs.RIGHT_NODE)(nodeIndex32, uint32Array);
        } else {
            c1 = (0, _nodeBufferUtilsJs.RIGHT_NODE)(nodeIndex32, uint32Array);
            c2 = (0, _nodeBufferUtilsJs.LEFT_NODE)(nodeIndex32);
        }
        const c1Intersection = (0, _intersectUtilsJs.intersectRay)(c1, float32Array, ray, near, far);
        const c1Result = c1Intersection ? _raycastFirst(c1, bvh, side, ray, near, far) : null;
        // if we got an intersection in the first node and it's closer than the second node's bounding
        // box, we don't need to consider the second node because it couldn't possibly be a better result
        if (c1Result) {
            // check if the point is within the second bounds
            // "point" is in the local frame of the bvh
            const point = c1Result.point[xyzAxis];
            const isOutside = leftToRight ? point <= float32Array[c2 + splitAxis] : point >= float32Array[c2 + splitAxis + 3]; // max bounding data
            if (isOutside) return c1Result;
        }
        // either there was no intersection in the first node, or there could still be a closer
        // intersection in the second, so check the second node and then take the better of the two
        const c2Intersection = (0, _intersectUtilsJs.intersectRay)(c2, float32Array, ray, near, far);
        const c2Result = c2Intersection ? _raycastFirst(c2, bvh, side, ray, near, far) : null;
        if (c1Result && c2Result) return c1Result.distance <= c2Result.distance ? c1Result : c2Result;
        else return c1Result || c2Result || null;
    }
}

},{"../utils/nodeBufferUtils.js":"gJWU9","../utils/BufferStack.js":"bkDBK","../utils/intersectUtils.js":"eN9HX","../utils/iterationUtils.generated.js":"brbcV","../utils/iterationUtils_indirect.generated.js":"71cmv","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hegxz":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "intersectsGeometry", ()=>intersectsGeometry);
var _three = require("three");
var _orientedBoxJs = require("../../math/OrientedBox.js");
var _extendedTriangleJs = require("../../math/ExtendedTriangle.js");
var _triangleUtilitiesJs = require("../../utils/TriangleUtilities.js");
var _arrayBoxUtilitiesJs = require("../../utils/ArrayBoxUtilities.js");
var _nodeBufferUtilsJs = require("../utils/nodeBufferUtils.js");
var _bufferStackJs = require("../utils/BufferStack.js");
/*****************************************************************/ /* This file is generated from "intersectsGeometry.template.js". */ /*****************************************************************/ /* eslint-disable indent */ const boundingBox = /* @__PURE__ */ new (0, _three.Box3)();
const triangle = /* @__PURE__ */ new (0, _extendedTriangleJs.ExtendedTriangle)();
const triangle2 = /* @__PURE__ */ new (0, _extendedTriangleJs.ExtendedTriangle)();
const invertedMat = /* @__PURE__ */ new (0, _three.Matrix4)();
const obb = /* @__PURE__ */ new (0, _orientedBoxJs.OrientedBox)();
const obb2 = /* @__PURE__ */ new (0, _orientedBoxJs.OrientedBox)();
function intersectsGeometry(bvh, root, otherGeometry, geometryToBvh) {
    (0, _bufferStackJs.BufferStack).setBuffer(bvh._roots[root]);
    const result = _intersectsGeometry(0, bvh, otherGeometry, geometryToBvh);
    (0, _bufferStackJs.BufferStack).clearBuffer();
    return result;
}
function _intersectsGeometry(nodeIndex32, bvh, otherGeometry, geometryToBvh, cachedObb = null) {
    const { float32Array, uint16Array, uint32Array } = (0, _bufferStackJs.BufferStack);
    let nodeIndex16 = nodeIndex32 * 2;
    if (cachedObb === null) {
        if (!otherGeometry.boundingBox) otherGeometry.computeBoundingBox();
        obb.set(otherGeometry.boundingBox.min, otherGeometry.boundingBox.max, geometryToBvh);
        cachedObb = obb;
    }
    const isLeaf = (0, _nodeBufferUtilsJs.IS_LEAF)(nodeIndex16, uint16Array);
    if (isLeaf) {
        const thisGeometry = bvh.geometry;
        const thisIndex = thisGeometry.index;
        const thisPos = thisGeometry.attributes.position;
        const index = otherGeometry.index;
        const pos = otherGeometry.attributes.position;
        const offset = (0, _nodeBufferUtilsJs.OFFSET)(nodeIndex32, uint32Array);
        const count = (0, _nodeBufferUtilsJs.COUNT)(nodeIndex16, uint16Array);
        // get the inverse of the geometry matrix so we can transform our triangles into the
        // geometry space we're trying to test. We assume there are fewer triangles being checked
        // here.
        invertedMat.copy(geometryToBvh).invert();
        if (otherGeometry.boundsTree) {
            // if there's a bounds tree
            (0, _arrayBoxUtilitiesJs.arrayToBox)((0, _nodeBufferUtilsJs.BOUNDING_DATA_INDEX)(nodeIndex32), float32Array, obb2);
            obb2.matrix.copy(invertedMat);
            obb2.needsUpdate = true;
            // TODO: use a triangle iteration function here
            const res = otherGeometry.boundsTree.shapecast({
                intersectsBounds: (box)=>obb2.intersectsBox(box),
                intersectsTriangle: (tri)=>{
                    tri.a.applyMatrix4(geometryToBvh);
                    tri.b.applyMatrix4(geometryToBvh);
                    tri.c.applyMatrix4(geometryToBvh);
                    tri.needsUpdate = true;
                    for(let i = offset * 3, l = (count + offset) * 3; i < l; i += 3){
                        // this triangle needs to be transformed into the current BVH coordinate frame
                        (0, _triangleUtilitiesJs.setTriangle)(triangle2, i, thisIndex, thisPos);
                        triangle2.needsUpdate = true;
                        if (tri.intersectsTriangle(triangle2)) return true;
                    }
                    return false;
                }
            });
            return res;
        } else // if we're just dealing with raw geometry
        for(let i = offset * 3, l = (count + offset) * 3; i < l; i += 3){
            // this triangle needs to be transformed into the current BVH coordinate frame
            (0, _triangleUtilitiesJs.setTriangle)(triangle, i, thisIndex, thisPos);
            triangle.a.applyMatrix4(invertedMat);
            triangle.b.applyMatrix4(invertedMat);
            triangle.c.applyMatrix4(invertedMat);
            triangle.needsUpdate = true;
            for(let i2 = 0, l2 = index.count; i2 < l2; i2 += 3){
                (0, _triangleUtilitiesJs.setTriangle)(triangle2, i2, index, pos);
                triangle2.needsUpdate = true;
                if (triangle.intersectsTriangle(triangle2)) return true;
            }
        }
    } else {
        const left = nodeIndex32 + 8;
        const right = uint32Array[nodeIndex32 + 6];
        (0, _arrayBoxUtilitiesJs.arrayToBox)((0, _nodeBufferUtilsJs.BOUNDING_DATA_INDEX)(left), float32Array, boundingBox);
        const leftIntersection = cachedObb.intersectsBox(boundingBox) && _intersectsGeometry(left, bvh, otherGeometry, geometryToBvh, cachedObb);
        if (leftIntersection) return true;
        (0, _arrayBoxUtilitiesJs.arrayToBox)((0, _nodeBufferUtilsJs.BOUNDING_DATA_INDEX)(right), float32Array, boundingBox);
        const rightIntersection = cachedObb.intersectsBox(boundingBox) && _intersectsGeometry(right, bvh, otherGeometry, geometryToBvh, cachedObb);
        if (rightIntersection) return true;
        return false;
    }
}

},{"three":"ktPTu","../../math/OrientedBox.js":"lE14k","../../math/ExtendedTriangle.js":"bw9AP","../../utils/TriangleUtilities.js":"6tB2U","../../utils/ArrayBoxUtilities.js":"axERW","../utils/nodeBufferUtils.js":"gJWU9","../utils/BufferStack.js":"bkDBK","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kRofC":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "closestPointToGeometry", ()=>closestPointToGeometry);
var _three = require("three");
var _orientedBoxJs = require("../../math/OrientedBox.js");
var _triangleUtilitiesJs = require("../../utils/TriangleUtilities.js");
var _geometryUtilsJs = require("../build/geometryUtils.js");
var _extendedTrianglePoolJs = require("../../utils/ExtendedTrianglePool.js");
/*********************************************************************/ /* This file is generated from "closestPointToGeometry.template.js". */ /*********************************************************************/ const tempMatrix = /* @__PURE__ */ new (0, _three.Matrix4)();
const obb = /* @__PURE__ */ new (0, _orientedBoxJs.OrientedBox)();
const obb2 = /* @__PURE__ */ new (0, _orientedBoxJs.OrientedBox)();
const temp1 = /* @__PURE__ */ new (0, _three.Vector3)();
const temp2 = /* @__PURE__ */ new (0, _three.Vector3)();
const temp3 = /* @__PURE__ */ new (0, _three.Vector3)();
const temp4 = /* @__PURE__ */ new (0, _three.Vector3)();
function closestPointToGeometry(bvh, otherGeometry, geometryToBvh, target1 = {}, target2 = {}, minThreshold = 0, maxThreshold = Infinity) {
    if (!otherGeometry.boundingBox) otherGeometry.computeBoundingBox();
    obb.set(otherGeometry.boundingBox.min, otherGeometry.boundingBox.max, geometryToBvh);
    obb.needsUpdate = true;
    const geometry = bvh.geometry;
    const pos = geometry.attributes.position;
    const index = geometry.index;
    const otherPos = otherGeometry.attributes.position;
    const otherIndex = otherGeometry.index;
    const triangle = (0, _extendedTrianglePoolJs.ExtendedTrianglePool).getPrimitive();
    const triangle2 = (0, _extendedTrianglePoolJs.ExtendedTrianglePool).getPrimitive();
    let tempTarget1 = temp1;
    let tempTargetDest1 = temp2;
    let tempTarget2 = null;
    let tempTargetDest2 = null;
    if (target2) {
        tempTarget2 = temp3;
        tempTargetDest2 = temp4;
    }
    let closestDistance = Infinity;
    let closestDistanceTriIndex = null;
    let closestDistanceOtherTriIndex = null;
    tempMatrix.copy(geometryToBvh).invert();
    obb2.matrix.copy(tempMatrix);
    bvh.shapecast({
        boundsTraverseOrder: (box)=>{
            return obb.distanceToBox(box);
        },
        intersectsBounds: (box, isLeaf, score)=>{
            if (score < closestDistance && score < maxThreshold) {
                // if we know the triangles of this bounds will be intersected next then
                // save the bounds to use during triangle checks.
                if (isLeaf) {
                    obb2.min.copy(box.min);
                    obb2.max.copy(box.max);
                    obb2.needsUpdate = true;
                }
                return true;
            }
            return false;
        },
        intersectsRange: (offset, count)=>{
            if (otherGeometry.boundsTree) {
                // if the other geometry has a bvh then use the accelerated path where we use shapecast to find
                // the closest bounds in the other geometry to check.
                const otherBvh = otherGeometry.boundsTree;
                return otherBvh.shapecast({
                    boundsTraverseOrder: (box)=>{
                        return obb2.distanceToBox(box);
                    },
                    intersectsBounds: (box, isLeaf, score)=>{
                        return score < closestDistance && score < maxThreshold;
                    },
                    intersectsRange: (otherOffset, otherCount)=>{
                        for(let i2 = otherOffset, l2 = otherOffset + otherCount; i2 < l2; i2++){
                            (0, _triangleUtilitiesJs.setTriangle)(triangle2, 3 * i2, otherIndex, otherPos);
                            triangle2.a.applyMatrix4(geometryToBvh);
                            triangle2.b.applyMatrix4(geometryToBvh);
                            triangle2.c.applyMatrix4(geometryToBvh);
                            triangle2.needsUpdate = true;
                            for(let i = offset, l = offset + count; i < l; i++){
                                (0, _triangleUtilitiesJs.setTriangle)(triangle, 3 * i, index, pos);
                                triangle.needsUpdate = true;
                                const dist = triangle.distanceToTriangle(triangle2, tempTarget1, tempTarget2);
                                if (dist < closestDistance) {
                                    tempTargetDest1.copy(tempTarget1);
                                    if (tempTargetDest2) tempTargetDest2.copy(tempTarget2);
                                    closestDistance = dist;
                                    closestDistanceTriIndex = i;
                                    closestDistanceOtherTriIndex = i2;
                                }
                                // stop traversal if we find a point that's under the given threshold
                                if (dist < minThreshold) return true;
                            }
                        }
                    }
                });
            } else {
                // If no bounds tree then we'll just check every triangle.
                const triCount = (0, _geometryUtilsJs.getTriCount)(otherGeometry);
                for(let i2 = 0, l2 = triCount; i2 < l2; i2++){
                    (0, _triangleUtilitiesJs.setTriangle)(triangle2, 3 * i2, otherIndex, otherPos);
                    triangle2.a.applyMatrix4(geometryToBvh);
                    triangle2.b.applyMatrix4(geometryToBvh);
                    triangle2.c.applyMatrix4(geometryToBvh);
                    triangle2.needsUpdate = true;
                    for(let i = offset, l = offset + count; i < l; i++){
                        (0, _triangleUtilitiesJs.setTriangle)(triangle, 3 * i, index, pos);
                        triangle.needsUpdate = true;
                        const dist = triangle.distanceToTriangle(triangle2, tempTarget1, tempTarget2);
                        if (dist < closestDistance) {
                            tempTargetDest1.copy(tempTarget1);
                            if (tempTargetDest2) tempTargetDest2.copy(tempTarget2);
                            closestDistance = dist;
                            closestDistanceTriIndex = i;
                            closestDistanceOtherTriIndex = i2;
                        }
                        // stop traversal if we find a point that's under the given threshold
                        if (dist < minThreshold) return true;
                    }
                }
            }
        }
    });
    (0, _extendedTrianglePoolJs.ExtendedTrianglePool).releasePrimitive(triangle);
    (0, _extendedTrianglePoolJs.ExtendedTrianglePool).releasePrimitive(triangle2);
    if (closestDistance === Infinity) return null;
    if (!target1.point) target1.point = tempTargetDest1.clone();
    else target1.point.copy(tempTargetDest1);
    target1.distance = closestDistance, target1.faceIndex = closestDistanceTriIndex;
    if (target2) {
        if (!target2.point) target2.point = tempTargetDest2.clone();
        else target2.point.copy(tempTargetDest2);
        target2.point.applyMatrix4(tempMatrix);
        tempTargetDest1.applyMatrix4(tempMatrix);
        target2.distance = tempTargetDest1.sub(target2.point).length();
        target2.faceIndex = closestDistanceOtherTriIndex;
    }
    return target1;
}

},{"three":"ktPTu","../../math/OrientedBox.js":"lE14k","../../utils/TriangleUtilities.js":"6tB2U","../build/geometryUtils.js":"ejhro","../../utils/ExtendedTrianglePool.js":"9EYXZ","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9BNKz":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "refit_indirect", ()=>refit_indirect);
var _constantsJs = require("../Constants.js");
/****************************************************/ /* This file is generated from "refit.template.js". */ /****************************************************/ function refit_indirect(bvh, nodeIndices = null) {
    if (nodeIndices && Array.isArray(nodeIndices)) nodeIndices = new Set(nodeIndices);
    const geometry = bvh.geometry;
    const indexArr = geometry.index ? geometry.index.array : null;
    const posAttr = geometry.attributes.position;
    let buffer, uint32Array, uint16Array, float32Array;
    let byteOffset = 0;
    const roots = bvh._roots;
    for(let i = 0, l = roots.length; i < l; i++){
        buffer = roots[i];
        uint32Array = new Uint32Array(buffer);
        uint16Array = new Uint16Array(buffer);
        float32Array = new Float32Array(buffer);
        _traverse(0, byteOffset);
        byteOffset += buffer.byteLength;
    }
    function _traverse(node32Index, byteOffset, force = false) {
        const node16Index = node32Index * 2;
        const isLeaf = uint16Array[node16Index + 15] === (0, _constantsJs.IS_LEAFNODE_FLAG);
        if (isLeaf) {
            const offset = uint32Array[node32Index + 6];
            const count = uint16Array[node16Index + 14];
            let minx = Infinity;
            let miny = Infinity;
            let minz = Infinity;
            let maxx = -Infinity;
            let maxy = -Infinity;
            let maxz = -Infinity;
            for(let i = offset, l = offset + count; i < l; i++){
                const t = 3 * bvh.resolveTriangleIndex(i);
                for(let j = 0; j < 3; j++){
                    let index = t + j;
                    index = indexArr ? indexArr[index] : index;
                    const x = posAttr.getX(index);
                    const y = posAttr.getY(index);
                    const z = posAttr.getZ(index);
                    if (x < minx) minx = x;
                    if (x > maxx) maxx = x;
                    if (y < miny) miny = y;
                    if (y > maxy) maxy = y;
                    if (z < minz) minz = z;
                    if (z > maxz) maxz = z;
                }
            }
            if (float32Array[node32Index + 0] !== minx || float32Array[node32Index + 1] !== miny || float32Array[node32Index + 2] !== minz || float32Array[node32Index + 3] !== maxx || float32Array[node32Index + 4] !== maxy || float32Array[node32Index + 5] !== maxz) {
                float32Array[node32Index + 0] = minx;
                float32Array[node32Index + 1] = miny;
                float32Array[node32Index + 2] = minz;
                float32Array[node32Index + 3] = maxx;
                float32Array[node32Index + 4] = maxy;
                float32Array[node32Index + 5] = maxz;
                return true;
            } else return false;
        } else {
            const left = node32Index + 8;
            const right = uint32Array[node32Index + 6];
            // the identifying node indices provided by the shapecast function include offsets of all
            // root buffers to guarantee they're unique between roots so offset left and right indices here.
            const offsetLeft = left + byteOffset;
            const offsetRight = right + byteOffset;
            let forceChildren = force;
            let includesLeft = false;
            let includesRight = false;
            if (nodeIndices) // if we see that neither the left or right child are included in the set that need to be updated
            // then we assume that all children need to be updated.
            {
                if (!forceChildren) {
                    includesLeft = nodeIndices.has(offsetLeft);
                    includesRight = nodeIndices.has(offsetRight);
                    forceChildren = !includesLeft && !includesRight;
                }
            } else {
                includesLeft = true;
                includesRight = true;
            }
            const traverseLeft = forceChildren || includesLeft;
            const traverseRight = forceChildren || includesRight;
            let leftChange = false;
            if (traverseLeft) leftChange = _traverse(left, byteOffset, forceChildren);
            let rightChange = false;
            if (traverseRight) rightChange = _traverse(right, byteOffset, forceChildren);
            const didChange = leftChange || rightChange;
            if (didChange) for(let i = 0; i < 3; i++){
                const lefti = left + i;
                const righti = right + i;
                const minLeftValue = float32Array[lefti];
                const maxLeftValue = float32Array[lefti + 3];
                const minRightValue = float32Array[righti];
                const maxRightValue = float32Array[righti + 3];
                float32Array[node32Index + i] = minLeftValue < minRightValue ? minLeftValue : minRightValue;
                float32Array[node32Index + i + 3] = maxLeftValue > maxRightValue ? maxLeftValue : maxRightValue;
            }
            return didChange;
        }
    }
}

},{"../Constants.js":"i15yM","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"c0YIL":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "raycast_indirect", ()=>raycast_indirect);
var _intersectUtilsJs = require("../utils/intersectUtils.js");
var _nodeBufferUtilsJs = require("../utils/nodeBufferUtils.js");
var _bufferStackJs = require("../utils/BufferStack.js");
var _iterationUtilsGeneratedJs = require("../utils/iterationUtils.generated.js");
var _iterationUtilsIndirectGeneratedJs = require("../utils/iterationUtils_indirect.generated.js");
/******************************************************/ /* This file is generated from "raycast.template.js". */ /******************************************************/ function raycast_indirect(bvh, root, side, ray, intersects, near, far) {
    (0, _bufferStackJs.BufferStack).setBuffer(bvh._roots[root]);
    _raycast(0, bvh, side, ray, intersects, near, far);
    (0, _bufferStackJs.BufferStack).clearBuffer();
}
function _raycast(nodeIndex32, bvh, side, ray, intersects, near, far) {
    const { float32Array, uint16Array, uint32Array } = (0, _bufferStackJs.BufferStack);
    const nodeIndex16 = nodeIndex32 * 2;
    const isLeaf = (0, _nodeBufferUtilsJs.IS_LEAF)(nodeIndex16, uint16Array);
    if (isLeaf) {
        const offset = (0, _nodeBufferUtilsJs.OFFSET)(nodeIndex32, uint32Array);
        const count = (0, _nodeBufferUtilsJs.COUNT)(nodeIndex16, uint16Array);
        (0, _iterationUtilsIndirectGeneratedJs.intersectTris_indirect)(bvh, side, ray, offset, count, intersects, near, far);
    } else {
        const leftIndex = (0, _nodeBufferUtilsJs.LEFT_NODE)(nodeIndex32);
        if ((0, _intersectUtilsJs.intersectRay)(leftIndex, float32Array, ray, near, far)) _raycast(leftIndex, bvh, side, ray, intersects, near, far);
        const rightIndex = (0, _nodeBufferUtilsJs.RIGHT_NODE)(nodeIndex32, uint32Array);
        if ((0, _intersectUtilsJs.intersectRay)(rightIndex, float32Array, ray, near, far)) _raycast(rightIndex, bvh, side, ray, intersects, near, far);
    }
}

},{"../utils/intersectUtils.js":"eN9HX","../utils/nodeBufferUtils.js":"gJWU9","../utils/BufferStack.js":"bkDBK","../utils/iterationUtils.generated.js":"brbcV","../utils/iterationUtils_indirect.generated.js":"71cmv","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jsR9F":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "raycastFirst_indirect", ()=>raycastFirst_indirect);
var _nodeBufferUtilsJs = require("../utils/nodeBufferUtils.js");
var _bufferStackJs = require("../utils/BufferStack.js");
var _intersectUtilsJs = require("../utils/intersectUtils.js");
var _iterationUtilsGeneratedJs = require("../utils/iterationUtils.generated.js");
var _iterationUtilsIndirectGeneratedJs = require("../utils/iterationUtils_indirect.generated.js");
/***********************************************************/ /* This file is generated from "raycastFirst.template.js". */ /***********************************************************/ const _xyzFields = [
    'x',
    'y',
    'z'
];
function raycastFirst_indirect(bvh, root, side, ray, near, far) {
    (0, _bufferStackJs.BufferStack).setBuffer(bvh._roots[root]);
    const result = _raycastFirst(0, bvh, side, ray, near, far);
    (0, _bufferStackJs.BufferStack).clearBuffer();
    return result;
}
function _raycastFirst(nodeIndex32, bvh, side, ray, near, far) {
    const { float32Array, uint16Array, uint32Array } = (0, _bufferStackJs.BufferStack);
    let nodeIndex16 = nodeIndex32 * 2;
    const isLeaf = (0, _nodeBufferUtilsJs.IS_LEAF)(nodeIndex16, uint16Array);
    if (isLeaf) {
        const offset = (0, _nodeBufferUtilsJs.OFFSET)(nodeIndex32, uint32Array);
        const count = (0, _nodeBufferUtilsJs.COUNT)(nodeIndex16, uint16Array);
        return (0, _iterationUtilsIndirectGeneratedJs.intersectClosestTri_indirect)(bvh, side, ray, offset, count, near, far);
    } else {
        // consider the position of the split plane with respect to the oncoming ray; whichever direction
        // the ray is coming from, look for an intersection among that side of the tree first
        const splitAxis = (0, _nodeBufferUtilsJs.SPLIT_AXIS)(nodeIndex32, uint32Array);
        const xyzAxis = _xyzFields[splitAxis];
        const rayDir = ray.direction[xyzAxis];
        const leftToRight = rayDir >= 0;
        // c1 is the child to check first
        let c1, c2;
        if (leftToRight) {
            c1 = (0, _nodeBufferUtilsJs.LEFT_NODE)(nodeIndex32);
            c2 = (0, _nodeBufferUtilsJs.RIGHT_NODE)(nodeIndex32, uint32Array);
        } else {
            c1 = (0, _nodeBufferUtilsJs.RIGHT_NODE)(nodeIndex32, uint32Array);
            c2 = (0, _nodeBufferUtilsJs.LEFT_NODE)(nodeIndex32);
        }
        const c1Intersection = (0, _intersectUtilsJs.intersectRay)(c1, float32Array, ray, near, far);
        const c1Result = c1Intersection ? _raycastFirst(c1, bvh, side, ray, near, far) : null;
        // if we got an intersection in the first node and it's closer than the second node's bounding
        // box, we don't need to consider the second node because it couldn't possibly be a better result
        if (c1Result) {
            // check if the point is within the second bounds
            // "point" is in the local frame of the bvh
            const point = c1Result.point[xyzAxis];
            const isOutside = leftToRight ? point <= float32Array[c2 + splitAxis] : point >= float32Array[c2 + splitAxis + 3]; // max bounding data
            if (isOutside) return c1Result;
        }
        // either there was no intersection in the first node, or there could still be a closer
        // intersection in the second, so check the second node and then take the better of the two
        const c2Intersection = (0, _intersectUtilsJs.intersectRay)(c2, float32Array, ray, near, far);
        const c2Result = c2Intersection ? _raycastFirst(c2, bvh, side, ray, near, far) : null;
        if (c1Result && c2Result) return c1Result.distance <= c2Result.distance ? c1Result : c2Result;
        else return c1Result || c2Result || null;
    }
}

},{"../utils/nodeBufferUtils.js":"gJWU9","../utils/BufferStack.js":"bkDBK","../utils/intersectUtils.js":"eN9HX","../utils/iterationUtils.generated.js":"brbcV","../utils/iterationUtils_indirect.generated.js":"71cmv","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5TeWa":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "intersectsGeometry_indirect", ()=>intersectsGeometry_indirect);
var _three = require("three");
var _orientedBoxJs = require("../../math/OrientedBox.js");
var _extendedTriangleJs = require("../../math/ExtendedTriangle.js");
var _triangleUtilitiesJs = require("../../utils/TriangleUtilities.js");
var _arrayBoxUtilitiesJs = require("../../utils/ArrayBoxUtilities.js");
var _nodeBufferUtilsJs = require("../utils/nodeBufferUtils.js");
var _bufferStackJs = require("../utils/BufferStack.js");
/*****************************************************************/ /* This file is generated from "intersectsGeometry.template.js". */ /*****************************************************************/ /* eslint-disable indent */ const boundingBox = /* @__PURE__ */ new (0, _three.Box3)();
const triangle = /* @__PURE__ */ new (0, _extendedTriangleJs.ExtendedTriangle)();
const triangle2 = /* @__PURE__ */ new (0, _extendedTriangleJs.ExtendedTriangle)();
const invertedMat = /* @__PURE__ */ new (0, _three.Matrix4)();
const obb = /* @__PURE__ */ new (0, _orientedBoxJs.OrientedBox)();
const obb2 = /* @__PURE__ */ new (0, _orientedBoxJs.OrientedBox)();
function intersectsGeometry_indirect(bvh, root, otherGeometry, geometryToBvh) {
    (0, _bufferStackJs.BufferStack).setBuffer(bvh._roots[root]);
    const result = _intersectsGeometry(0, bvh, otherGeometry, geometryToBvh);
    (0, _bufferStackJs.BufferStack).clearBuffer();
    return result;
}
function _intersectsGeometry(nodeIndex32, bvh, otherGeometry, geometryToBvh, cachedObb = null) {
    const { float32Array, uint16Array, uint32Array } = (0, _bufferStackJs.BufferStack);
    let nodeIndex16 = nodeIndex32 * 2;
    if (cachedObb === null) {
        if (!otherGeometry.boundingBox) otherGeometry.computeBoundingBox();
        obb.set(otherGeometry.boundingBox.min, otherGeometry.boundingBox.max, geometryToBvh);
        cachedObb = obb;
    }
    const isLeaf = (0, _nodeBufferUtilsJs.IS_LEAF)(nodeIndex16, uint16Array);
    if (isLeaf) {
        const thisGeometry = bvh.geometry;
        const thisIndex = thisGeometry.index;
        const thisPos = thisGeometry.attributes.position;
        const index = otherGeometry.index;
        const pos = otherGeometry.attributes.position;
        const offset = (0, _nodeBufferUtilsJs.OFFSET)(nodeIndex32, uint32Array);
        const count = (0, _nodeBufferUtilsJs.COUNT)(nodeIndex16, uint16Array);
        // get the inverse of the geometry matrix so we can transform our triangles into the
        // geometry space we're trying to test. We assume there are fewer triangles being checked
        // here.
        invertedMat.copy(geometryToBvh).invert();
        if (otherGeometry.boundsTree) {
            // if there's a bounds tree
            (0, _arrayBoxUtilitiesJs.arrayToBox)((0, _nodeBufferUtilsJs.BOUNDING_DATA_INDEX)(nodeIndex32), float32Array, obb2);
            obb2.matrix.copy(invertedMat);
            obb2.needsUpdate = true;
            // TODO: use a triangle iteration function here
            const res = otherGeometry.boundsTree.shapecast({
                intersectsBounds: (box)=>obb2.intersectsBox(box),
                intersectsTriangle: (tri)=>{
                    tri.a.applyMatrix4(geometryToBvh);
                    tri.b.applyMatrix4(geometryToBvh);
                    tri.c.applyMatrix4(geometryToBvh);
                    tri.needsUpdate = true;
                    for(let i = offset, l = count + offset; i < l; i++){
                        // this triangle needs to be transformed into the current BVH coordinate frame
                        (0, _triangleUtilitiesJs.setTriangle)(triangle2, 3 * bvh.resolveTriangleIndex(i), thisIndex, thisPos);
                        triangle2.needsUpdate = true;
                        if (tri.intersectsTriangle(triangle2)) return true;
                    }
                    return false;
                }
            });
            return res;
        } else // if we're just dealing with raw geometry
        for(let i = offset, l = count + offset; i < l; i++){
            // this triangle needs to be transformed into the current BVH coordinate frame
            const ti = bvh.resolveTriangleIndex(i);
            (0, _triangleUtilitiesJs.setTriangle)(triangle, 3 * ti, thisIndex, thisPos);
            triangle.a.applyMatrix4(invertedMat);
            triangle.b.applyMatrix4(invertedMat);
            triangle.c.applyMatrix4(invertedMat);
            triangle.needsUpdate = true;
            for(let i2 = 0, l2 = index.count; i2 < l2; i2 += 3){
                (0, _triangleUtilitiesJs.setTriangle)(triangle2, i2, index, pos);
                triangle2.needsUpdate = true;
                if (triangle.intersectsTriangle(triangle2)) return true;
            }
        }
    } else {
        const left = nodeIndex32 + 8;
        const right = uint32Array[nodeIndex32 + 6];
        (0, _arrayBoxUtilitiesJs.arrayToBox)((0, _nodeBufferUtilsJs.BOUNDING_DATA_INDEX)(left), float32Array, boundingBox);
        const leftIntersection = cachedObb.intersectsBox(boundingBox) && _intersectsGeometry(left, bvh, otherGeometry, geometryToBvh, cachedObb);
        if (leftIntersection) return true;
        (0, _arrayBoxUtilitiesJs.arrayToBox)((0, _nodeBufferUtilsJs.BOUNDING_DATA_INDEX)(right), float32Array, boundingBox);
        const rightIntersection = cachedObb.intersectsBox(boundingBox) && _intersectsGeometry(right, bvh, otherGeometry, geometryToBvh, cachedObb);
        if (rightIntersection) return true;
        return false;
    }
}

},{"three":"ktPTu","../../math/OrientedBox.js":"lE14k","../../math/ExtendedTriangle.js":"bw9AP","../../utils/TriangleUtilities.js":"6tB2U","../../utils/ArrayBoxUtilities.js":"axERW","../utils/nodeBufferUtils.js":"gJWU9","../utils/BufferStack.js":"bkDBK","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"xVEUt":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "closestPointToGeometry_indirect", ()=>closestPointToGeometry_indirect);
var _three = require("three");
var _orientedBoxJs = require("../../math/OrientedBox.js");
var _triangleUtilitiesJs = require("../../utils/TriangleUtilities.js");
var _geometryUtilsJs = require("../build/geometryUtils.js");
var _extendedTrianglePoolJs = require("../../utils/ExtendedTrianglePool.js");
/*********************************************************************/ /* This file is generated from "closestPointToGeometry.template.js". */ /*********************************************************************/ const tempMatrix = /* @__PURE__ */ new (0, _three.Matrix4)();
const obb = /* @__PURE__ */ new (0, _orientedBoxJs.OrientedBox)();
const obb2 = /* @__PURE__ */ new (0, _orientedBoxJs.OrientedBox)();
const temp1 = /* @__PURE__ */ new (0, _three.Vector3)();
const temp2 = /* @__PURE__ */ new (0, _three.Vector3)();
const temp3 = /* @__PURE__ */ new (0, _three.Vector3)();
const temp4 = /* @__PURE__ */ new (0, _three.Vector3)();
function closestPointToGeometry_indirect(bvh, otherGeometry, geometryToBvh, target1 = {}, target2 = {}, minThreshold = 0, maxThreshold = Infinity) {
    if (!otherGeometry.boundingBox) otherGeometry.computeBoundingBox();
    obb.set(otherGeometry.boundingBox.min, otherGeometry.boundingBox.max, geometryToBvh);
    obb.needsUpdate = true;
    const geometry = bvh.geometry;
    const pos = geometry.attributes.position;
    const index = geometry.index;
    const otherPos = otherGeometry.attributes.position;
    const otherIndex = otherGeometry.index;
    const triangle = (0, _extendedTrianglePoolJs.ExtendedTrianglePool).getPrimitive();
    const triangle2 = (0, _extendedTrianglePoolJs.ExtendedTrianglePool).getPrimitive();
    let tempTarget1 = temp1;
    let tempTargetDest1 = temp2;
    let tempTarget2 = null;
    let tempTargetDest2 = null;
    if (target2) {
        tempTarget2 = temp3;
        tempTargetDest2 = temp4;
    }
    let closestDistance = Infinity;
    let closestDistanceTriIndex = null;
    let closestDistanceOtherTriIndex = null;
    tempMatrix.copy(geometryToBvh).invert();
    obb2.matrix.copy(tempMatrix);
    bvh.shapecast({
        boundsTraverseOrder: (box)=>{
            return obb.distanceToBox(box);
        },
        intersectsBounds: (box, isLeaf, score)=>{
            if (score < closestDistance && score < maxThreshold) {
                // if we know the triangles of this bounds will be intersected next then
                // save the bounds to use during triangle checks.
                if (isLeaf) {
                    obb2.min.copy(box.min);
                    obb2.max.copy(box.max);
                    obb2.needsUpdate = true;
                }
                return true;
            }
            return false;
        },
        intersectsRange: (offset, count)=>{
            if (otherGeometry.boundsTree) {
                // if the other geometry has a bvh then use the accelerated path where we use shapecast to find
                // the closest bounds in the other geometry to check.
                const otherBvh = otherGeometry.boundsTree;
                return otherBvh.shapecast({
                    boundsTraverseOrder: (box)=>{
                        return obb2.distanceToBox(box);
                    },
                    intersectsBounds: (box, isLeaf, score)=>{
                        return score < closestDistance && score < maxThreshold;
                    },
                    intersectsRange: (otherOffset, otherCount)=>{
                        for(let i2 = otherOffset, l2 = otherOffset + otherCount; i2 < l2; i2++){
                            const ti2 = otherBvh.resolveTriangleIndex(i2);
                            (0, _triangleUtilitiesJs.setTriangle)(triangle2, 3 * ti2, otherIndex, otherPos);
                            triangle2.a.applyMatrix4(geometryToBvh);
                            triangle2.b.applyMatrix4(geometryToBvh);
                            triangle2.c.applyMatrix4(geometryToBvh);
                            triangle2.needsUpdate = true;
                            for(let i = offset, l = offset + count; i < l; i++){
                                const ti = bvh.resolveTriangleIndex(i);
                                (0, _triangleUtilitiesJs.setTriangle)(triangle, 3 * ti, index, pos);
                                triangle.needsUpdate = true;
                                const dist = triangle.distanceToTriangle(triangle2, tempTarget1, tempTarget2);
                                if (dist < closestDistance) {
                                    tempTargetDest1.copy(tempTarget1);
                                    if (tempTargetDest2) tempTargetDest2.copy(tempTarget2);
                                    closestDistance = dist;
                                    closestDistanceTriIndex = i;
                                    closestDistanceOtherTriIndex = i2;
                                }
                                // stop traversal if we find a point that's under the given threshold
                                if (dist < minThreshold) return true;
                            }
                        }
                    }
                });
            } else {
                // If no bounds tree then we'll just check every triangle.
                const triCount = (0, _geometryUtilsJs.getTriCount)(otherGeometry);
                for(let i2 = 0, l2 = triCount; i2 < l2; i2++){
                    (0, _triangleUtilitiesJs.setTriangle)(triangle2, 3 * i2, otherIndex, otherPos);
                    triangle2.a.applyMatrix4(geometryToBvh);
                    triangle2.b.applyMatrix4(geometryToBvh);
                    triangle2.c.applyMatrix4(geometryToBvh);
                    triangle2.needsUpdate = true;
                    for(let i = offset, l = offset + count; i < l; i++){
                        const ti = bvh.resolveTriangleIndex(i);
                        (0, _triangleUtilitiesJs.setTriangle)(triangle, 3 * ti, index, pos);
                        triangle.needsUpdate = true;
                        const dist = triangle.distanceToTriangle(triangle2, tempTarget1, tempTarget2);
                        if (dist < closestDistance) {
                            tempTargetDest1.copy(tempTarget1);
                            if (tempTargetDest2) tempTargetDest2.copy(tempTarget2);
                            closestDistance = dist;
                            closestDistanceTriIndex = i;
                            closestDistanceOtherTriIndex = i2;
                        }
                        // stop traversal if we find a point that's under the given threshold
                        if (dist < minThreshold) return true;
                    }
                }
            }
        }
    });
    (0, _extendedTrianglePoolJs.ExtendedTrianglePool).releasePrimitive(triangle);
    (0, _extendedTrianglePoolJs.ExtendedTrianglePool).releasePrimitive(triangle2);
    if (closestDistance === Infinity) return null;
    if (!target1.point) target1.point = tempTargetDest1.clone();
    else target1.point.copy(tempTargetDest1);
    target1.distance = closestDistance, target1.faceIndex = closestDistanceTriIndex;
    if (target2) {
        if (!target2.point) target2.point = tempTargetDest2.clone();
        else target2.point.copy(tempTargetDest2);
        target2.point.applyMatrix4(tempMatrix);
        tempTargetDest1.applyMatrix4(tempMatrix);
        target2.distance = tempTargetDest1.sub(target2.point).length();
        target2.faceIndex = closestDistanceOtherTriIndex;
    }
    return target1;
}

},{"three":"ktPTu","../../math/OrientedBox.js":"lE14k","../../utils/TriangleUtilities.js":"6tB2U","../build/geometryUtils.js":"ejhro","../../utils/ExtendedTrianglePool.js":"9EYXZ","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gBAF9":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "isSharedArrayBufferSupported", ()=>isSharedArrayBufferSupported);
parcelHelpers.export(exports, "convertToBufferType", ()=>convertToBufferType);
function isSharedArrayBufferSupported() {
    return typeof SharedArrayBuffer !== 'undefined';
}
function convertToBufferType(array, BufferConstructor) {
    if (array === null) return array;
    else if (array.buffer) {
        const buffer = array.buffer;
        if (buffer.constructor === BufferConstructor) return array;
        const ArrayConstructor = array.constructor;
        const result = new ArrayConstructor(new BufferConstructor(buffer.byteLength));
        result.set(array);
        return result;
    } else {
        if (array.constructor === BufferConstructor) return array;
        const result = new BufferConstructor(array.byteLength);
        new Uint8Array(result).set(new Uint8Array(array));
        return result;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7URls":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "bvhcast", ()=>bvhcast);
var _three = require("three");
var _bufferStackJs = require("../utils/BufferStack.js");
var _nodeBufferUtilsJs = require("../utils/nodeBufferUtils.js");
var _arrayBoxUtilitiesJs = require("../../utils/ArrayBoxUtilities.js");
var _primitivePoolJs = require("../../utils/PrimitivePool.js");
const _bufferStack1 = new (0, _bufferStackJs.BufferStack).constructor();
const _bufferStack2 = new (0, _bufferStackJs.BufferStack).constructor();
const _boxPool = new (0, _primitivePoolJs.PrimitivePool)(()=>new (0, _three.Box3)());
const _leftBox1 = new (0, _three.Box3)();
const _rightBox1 = new (0, _three.Box3)();
const _leftBox2 = new (0, _three.Box3)();
const _rightBox2 = new (0, _three.Box3)();
let _active = false;
function bvhcast(bvh, otherBvh, matrixToLocal, intersectsRanges) {
    if (_active) throw new Error('MeshBVH: Recursive calls to bvhcast not supported.');
    _active = true;
    const roots = bvh._roots;
    const otherRoots = otherBvh._roots;
    let result;
    let offset1 = 0;
    let offset2 = 0;
    const invMat = new (0, _three.Matrix4)().copy(matrixToLocal).invert();
    // iterate over the first set of roots
    for(let i = 0, il = roots.length; i < il; i++){
        _bufferStack1.setBuffer(roots[i]);
        offset2 = 0;
        // prep the initial root box
        const localBox = _boxPool.getPrimitive();
        (0, _arrayBoxUtilitiesJs.arrayToBox)((0, _nodeBufferUtilsJs.BOUNDING_DATA_INDEX)(0), _bufferStack1.float32Array, localBox);
        localBox.applyMatrix4(invMat);
        // iterate over the second set of roots
        for(let j = 0, jl = otherRoots.length; j < jl; j++){
            _bufferStack2.setBuffer(otherRoots[i]);
            result = _traverse(0, 0, matrixToLocal, invMat, intersectsRanges, offset1, offset2, 0, 0, localBox);
            _bufferStack2.clearBuffer();
            offset2 += otherRoots[j].length;
            if (result) break;
        }
        // release stack info
        _boxPool.releasePrimitive(localBox);
        _bufferStack1.clearBuffer();
        offset1 += roots[i].length;
        if (result) break;
    }
    _active = false;
    return result;
}
function _traverse(node1Index32, node2Index32, matrix2to1, matrix1to2, intersectsRangesFunc, // offsets for ids
node1IndexByteOffset = 0, node2IndexByteOffset = 0, // tree depth
depth1 = 0, depth2 = 0, currBox = null, reversed = false) {
    // get the buffer stacks associated with the current indices
    let bufferStack1, bufferStack2;
    if (reversed) {
        bufferStack1 = _bufferStack2;
        bufferStack2 = _bufferStack1;
    } else {
        bufferStack1 = _bufferStack1;
        bufferStack2 = _bufferStack2;
    }
    // get the local instances of the typed buffers
    const float32Array1 = bufferStack1.float32Array, uint32Array1 = bufferStack1.uint32Array, uint16Array1 = bufferStack1.uint16Array, float32Array2 = bufferStack2.float32Array, uint32Array2 = bufferStack2.uint32Array, uint16Array2 = bufferStack2.uint16Array;
    const node1Index16 = node1Index32 * 2;
    const node2Index16 = node2Index32 * 2;
    const isLeaf1 = (0, _nodeBufferUtilsJs.IS_LEAF)(node1Index16, uint16Array1);
    const isLeaf2 = (0, _nodeBufferUtilsJs.IS_LEAF)(node2Index16, uint16Array2);
    let result = false;
    if (isLeaf2 && isLeaf1) {
        // if both bounds are leaf nodes then fire the callback if the boxes intersect
        if (reversed) result = intersectsRangesFunc((0, _nodeBufferUtilsJs.OFFSET)(node2Index32, uint32Array2), (0, _nodeBufferUtilsJs.COUNT)(node2Index32 * 2, uint16Array2), (0, _nodeBufferUtilsJs.OFFSET)(node1Index32, uint32Array1), (0, _nodeBufferUtilsJs.COUNT)(node1Index32 * 2, uint16Array1), depth2, node2IndexByteOffset + node2Index32, depth1, node1IndexByteOffset + node1Index32);
        else result = intersectsRangesFunc((0, _nodeBufferUtilsJs.OFFSET)(node1Index32, uint32Array1), (0, _nodeBufferUtilsJs.COUNT)(node1Index32 * 2, uint16Array1), (0, _nodeBufferUtilsJs.OFFSET)(node2Index32, uint32Array2), (0, _nodeBufferUtilsJs.COUNT)(node2Index32 * 2, uint16Array2), depth1, node1IndexByteOffset + node1Index32, depth2, node2IndexByteOffset + node2Index32);
    } else if (isLeaf2) {
        // SWAP
        // If we've traversed to the leaf node on the other bvh then we need to swap over
        // to traverse down the first one
        // get the new box to use
        const newBox = _boxPool.getPrimitive();
        (0, _arrayBoxUtilitiesJs.arrayToBox)((0, _nodeBufferUtilsJs.BOUNDING_DATA_INDEX)(node2Index32), float32Array2, newBox);
        newBox.applyMatrix4(matrix2to1);
        // get the child bounds to check before traversal
        const cl1 = (0, _nodeBufferUtilsJs.LEFT_NODE)(node1Index32);
        const cr1 = (0, _nodeBufferUtilsJs.RIGHT_NODE)(node1Index32, uint32Array1);
        (0, _arrayBoxUtilitiesJs.arrayToBox)((0, _nodeBufferUtilsJs.BOUNDING_DATA_INDEX)(cl1), float32Array1, _leftBox1);
        (0, _arrayBoxUtilitiesJs.arrayToBox)((0, _nodeBufferUtilsJs.BOUNDING_DATA_INDEX)(cr1), float32Array1, _rightBox1);
        // precompute the intersections otherwise the global boxes will be modified during traversal
        const intersectCl1 = newBox.intersectsBox(_leftBox1);
        const intersectCr1 = newBox.intersectsBox(_rightBox1);
        result = intersectCl1 && _traverse(node2Index32, cl1, matrix1to2, matrix2to1, intersectsRangesFunc, node2IndexByteOffset, node1IndexByteOffset, depth2, depth1 + 1, newBox, !reversed) || intersectCr1 && _traverse(node2Index32, cr1, matrix1to2, matrix2to1, intersectsRangesFunc, node2IndexByteOffset, node1IndexByteOffset, depth2, depth1 + 1, newBox, !reversed);
        _boxPool.releasePrimitive(newBox);
    } else {
        // if neither are leaves then we should swap if one of the children does not
        // intersect with the current bounds
        // get the child bounds to check
        const cl2 = (0, _nodeBufferUtilsJs.LEFT_NODE)(node2Index32);
        const cr2 = (0, _nodeBufferUtilsJs.RIGHT_NODE)(node2Index32, uint32Array2);
        (0, _arrayBoxUtilitiesJs.arrayToBox)((0, _nodeBufferUtilsJs.BOUNDING_DATA_INDEX)(cl2), float32Array2, _leftBox2);
        (0, _arrayBoxUtilitiesJs.arrayToBox)((0, _nodeBufferUtilsJs.BOUNDING_DATA_INDEX)(cr2), float32Array2, _rightBox2);
        const leftIntersects = currBox.intersectsBox(_leftBox2);
        const rightIntersects = currBox.intersectsBox(_rightBox2);
        if (leftIntersects && rightIntersects) // continue to traverse both children if they both intersect
        result = _traverse(node1Index32, cl2, matrix2to1, matrix1to2, intersectsRangesFunc, node1IndexByteOffset, node2IndexByteOffset, depth1, depth2 + 1, currBox, reversed) || _traverse(node1Index32, cr2, matrix2to1, matrix1to2, intersectsRangesFunc, node1IndexByteOffset, node2IndexByteOffset, depth1, depth2 + 1, currBox, reversed);
        else if (leftIntersects) {
            if (isLeaf1) // if the current box is a leaf then just continue
            result = _traverse(node1Index32, cl2, matrix2to1, matrix1to2, intersectsRangesFunc, node1IndexByteOffset, node2IndexByteOffset, depth1, depth2 + 1, currBox, reversed);
            else {
                // SWAP
                // if only one box intersects then we have to swap to the other bvh to continue
                const newBox = _boxPool.getPrimitive();
                newBox.copy(_leftBox2).applyMatrix4(matrix2to1);
                const cl1 = (0, _nodeBufferUtilsJs.LEFT_NODE)(node1Index32);
                const cr1 = (0, _nodeBufferUtilsJs.RIGHT_NODE)(node1Index32, uint32Array1);
                (0, _arrayBoxUtilitiesJs.arrayToBox)((0, _nodeBufferUtilsJs.BOUNDING_DATA_INDEX)(cl1), float32Array1, _leftBox1);
                (0, _arrayBoxUtilitiesJs.arrayToBox)((0, _nodeBufferUtilsJs.BOUNDING_DATA_INDEX)(cr1), float32Array1, _rightBox1);
                // precompute the intersections otherwise the global boxes will be modified during traversal
                const intersectCl1 = newBox.intersectsBox(_leftBox1);
                const intersectCr1 = newBox.intersectsBox(_rightBox1);
                result = intersectCl1 && _traverse(cl2, cl1, matrix1to2, matrix2to1, intersectsRangesFunc, node2IndexByteOffset, node1IndexByteOffset, depth2, depth1 + 1, newBox, !reversed) || intersectCr1 && _traverse(cl2, cr1, matrix1to2, matrix2to1, intersectsRangesFunc, node2IndexByteOffset, node1IndexByteOffset, depth2, depth1 + 1, newBox, !reversed);
                _boxPool.releasePrimitive(newBox);
            }
        } else if (rightIntersects) {
            if (isLeaf1) // if the current box is a leaf then just continue
            result = _traverse(node1Index32, cr2, matrix2to1, matrix1to2, intersectsRangesFunc, node1IndexByteOffset, node2IndexByteOffset, depth1, depth2 + 1, currBox, reversed);
            else {
                // SWAP
                // if only one box intersects then we have to swap to the other bvh to continue
                const newBox = _boxPool.getPrimitive();
                newBox.copy(_rightBox2).applyMatrix4(matrix2to1);
                const cl1 = (0, _nodeBufferUtilsJs.LEFT_NODE)(node1Index32);
                const cr1 = (0, _nodeBufferUtilsJs.RIGHT_NODE)(node1Index32, uint32Array1);
                (0, _arrayBoxUtilitiesJs.arrayToBox)((0, _nodeBufferUtilsJs.BOUNDING_DATA_INDEX)(cl1), float32Array1, _leftBox1);
                (0, _arrayBoxUtilitiesJs.arrayToBox)((0, _nodeBufferUtilsJs.BOUNDING_DATA_INDEX)(cr1), float32Array1, _rightBox1);
                // precompute the intersections otherwise the global boxes will be modified during traversal
                const intersectCl1 = newBox.intersectsBox(_leftBox1);
                const intersectCr1 = newBox.intersectsBox(_rightBox1);
                result = intersectCl1 && _traverse(cr2, cl1, matrix1to2, matrix2to1, intersectsRangesFunc, node2IndexByteOffset, node1IndexByteOffset, depth2, depth1 + 1, newBox, !reversed) || intersectCr1 && _traverse(cr2, cr1, matrix1to2, matrix2to1, intersectsRangesFunc, node2IndexByteOffset, node1IndexByteOffset, depth2, depth1 + 1, newBox, !reversed);
                _boxPool.releasePrimitive(newBox);
            }
        }
    }
    return result;
}

},{"three":"ktPTu","../utils/BufferStack.js":"bkDBK","../utils/nodeBufferUtils.js":"gJWU9","../../utils/ArrayBoxUtilities.js":"axERW","../../utils/PrimitivePool.js":"lvehm","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"16SjG":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MeshBVHUniformStruct", ()=>MeshBVHUniformStruct);
var _three = require("three");
var _vertexAttributeTextureJs = require("./VertexAttributeTexture.js");
var _constantsJs = require("../core/Constants.js");
var _nodeBufferUtilsJs = require("../core/utils/nodeBufferUtils.js");
var _geometryUtilsJs = require("../core/build/geometryUtils.js");
class MeshBVHUniformStruct {
    constructor(){
        this.index = new (0, _vertexAttributeTextureJs.UIntVertexAttributeTexture)();
        this.position = new (0, _vertexAttributeTextureJs.FloatVertexAttributeTexture)();
        this.bvhBounds = new (0, _three.DataTexture)();
        this.bvhContents = new (0, _three.DataTexture)();
        this._cachedIndexAttr = null;
        this.index.overrideItemSize = 3;
    }
    updateFrom(bvh) {
        const { geometry } = bvh;
        bvhToTextures(bvh, this.bvhBounds, this.bvhContents);
        this.position.updateFrom(geometry.attributes.position);
        // dereference a new index attribute if we're using indirect storage
        if (bvh.indirect) {
            const indirectBuffer = bvh._indirectBuffer;
            if (this._cachedIndexAttr === null || this._cachedIndexAttr.count !== indirectBuffer.length) {
                if (geometry.index) this._cachedIndexAttr = geometry.index.clone();
                else {
                    const array = (0, _geometryUtilsJs.getIndexArray)((0, _geometryUtilsJs.getVertexCount)(geometry));
                    this._cachedIndexAttr = new (0, _three.BufferAttribute)(array, 1, false);
                }
            }
            dereferenceIndex(geometry, indirectBuffer, this._cachedIndexAttr);
            this.index.updateFrom(this._cachedIndexAttr);
        } else this.index.updateFrom(geometry.index);
    }
    dispose() {
        const { index, position, bvhBounds, bvhContents } = this;
        if (index) index.dispose();
        if (position) position.dispose();
        if (bvhBounds) bvhBounds.dispose();
        if (bvhContents) bvhContents.dispose();
    }
}
function dereferenceIndex(geometry, indirectBuffer, target) {
    const unpacked = target.array;
    const indexArray = geometry.index ? geometry.index.array : null;
    for(let i = 0, l = indirectBuffer.length; i < l; i++){
        const i3 = 3 * i;
        const v3 = 3 * indirectBuffer[i];
        for(let c = 0; c < 3; c++)unpacked[i3 + c] = indexArray ? indexArray[v3 + c] : v3 + c;
    }
}
function bvhToTextures(bvh, boundsTexture, contentsTexture) {
    const roots = bvh._roots;
    if (roots.length !== 1) throw new Error('MeshBVHUniformStruct: Multi-root BVHs not supported.');
    const root = roots[0];
    const uint16Array = new Uint16Array(root);
    const uint32Array = new Uint32Array(root);
    const float32Array = new Float32Array(root);
    // Both bounds need two elements per node so compute the height so it's twice as long as
    // the width so we can expand the row by two and still have a square texture
    const nodeCount = root.byteLength / (0, _constantsJs.BYTES_PER_NODE);
    const boundsDimension = 2 * Math.ceil(Math.sqrt(nodeCount / 2));
    const boundsArray = new Float32Array(4 * boundsDimension * boundsDimension);
    const contentsDimension = Math.ceil(Math.sqrt(nodeCount));
    const contentsArray = new Uint32Array(2 * contentsDimension * contentsDimension);
    for(let i = 0; i < nodeCount; i++){
        const nodeIndex32 = i * (0, _constantsJs.BYTES_PER_NODE) / 4;
        const nodeIndex16 = nodeIndex32 * 2;
        const boundsIndex = (0, _nodeBufferUtilsJs.BOUNDING_DATA_INDEX)(nodeIndex32);
        for(let b = 0; b < 3; b++){
            boundsArray[8 * i + 0 + b] = float32Array[boundsIndex + 0 + b];
            boundsArray[8 * i + 4 + b] = float32Array[boundsIndex + 3 + b];
        }
        if ((0, _nodeBufferUtilsJs.IS_LEAF)(nodeIndex16, uint16Array)) {
            const count = (0, _nodeBufferUtilsJs.COUNT)(nodeIndex16, uint16Array);
            const offset = (0, _nodeBufferUtilsJs.OFFSET)(nodeIndex32, uint32Array);
            const mergedLeafCount = 0xffff0000 | count;
            contentsArray[i * 2 + 0] = mergedLeafCount;
            contentsArray[i * 2 + 1] = offset;
        } else {
            const rightIndex = 4 * (0, _nodeBufferUtilsJs.RIGHT_NODE)(nodeIndex32, uint32Array) / (0, _constantsJs.BYTES_PER_NODE);
            const splitAxis = (0, _nodeBufferUtilsJs.SPLIT_AXIS)(nodeIndex32, uint32Array);
            contentsArray[i * 2 + 0] = splitAxis;
            contentsArray[i * 2 + 1] = rightIndex;
        }
    }
    boundsTexture.image.data = boundsArray;
    boundsTexture.image.width = boundsDimension;
    boundsTexture.image.height = boundsDimension;
    boundsTexture.format = (0, _three.RGBAFormat);
    boundsTexture.type = (0, _three.FloatType);
    boundsTexture.internalFormat = 'RGBA32F';
    boundsTexture.minFilter = (0, _three.NearestFilter);
    boundsTexture.magFilter = (0, _three.NearestFilter);
    boundsTexture.generateMipmaps = false;
    boundsTexture.needsUpdate = true;
    boundsTexture.dispose();
    contentsTexture.image.data = contentsArray;
    contentsTexture.image.width = contentsDimension;
    contentsTexture.image.height = contentsDimension;
    contentsTexture.format = (0, _three.RGIntegerFormat);
    contentsTexture.type = (0, _three.UnsignedIntType);
    contentsTexture.internalFormat = 'RG32UI';
    contentsTexture.minFilter = (0, _three.NearestFilter);
    contentsTexture.magFilter = (0, _three.NearestFilter);
    contentsTexture.generateMipmaps = false;
    contentsTexture.needsUpdate = true;
    contentsTexture.dispose();
}

},{"three":"ktPTu","./VertexAttributeTexture.js":"gGJF6","../core/Constants.js":"i15yM","../core/utils/nodeBufferUtils.js":"gJWU9","../core/build/geometryUtils.js":"ejhro","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gGJF6":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "VertexAttributeTexture", ()=>VertexAttributeTexture);
parcelHelpers.export(exports, "UIntVertexAttributeTexture", ()=>UIntVertexAttributeTexture);
parcelHelpers.export(exports, "IntVertexAttributeTexture", ()=>IntVertexAttributeTexture);
parcelHelpers.export(exports, "FloatVertexAttributeTexture", ()=>FloatVertexAttributeTexture);
var _three = require("three");
function countToStringFormat(count) {
    switch(count){
        case 1:
            return 'R';
        case 2:
            return 'RG';
        case 3:
            return 'RGBA';
        case 4:
            return 'RGBA';
    }
    throw new Error();
}
function countToFormat(count) {
    switch(count){
        case 1:
            return 0, _three.RedFormat;
        case 2:
            return 0, _three.RGFormat;
        case 3:
            return 0, _three.RGBAFormat;
        case 4:
            return 0, _three.RGBAFormat;
    }
}
function countToIntFormat(count) {
    switch(count){
        case 1:
            return 0, _three.RedIntegerFormat;
        case 2:
            return 0, _three.RGIntegerFormat;
        case 3:
            return 0, _three.RGBAIntegerFormat;
        case 4:
            return 0, _three.RGBAIntegerFormat;
    }
}
class VertexAttributeTexture extends (0, _three.DataTexture) {
    constructor(){
        super();
        this.minFilter = (0, _three.NearestFilter);
        this.magFilter = (0, _three.NearestFilter);
        this.generateMipmaps = false;
        this.overrideItemSize = null;
        this._forcedType = null;
    }
    updateFrom(attr) {
        const overrideItemSize = this.overrideItemSize;
        const originalItemSize = attr.itemSize;
        const originalCount = attr.count;
        if (overrideItemSize !== null) {
            if (originalItemSize * originalCount % overrideItemSize !== 0.0) throw new Error('VertexAttributeTexture: overrideItemSize must divide evenly into buffer length.');
            attr.itemSize = overrideItemSize;
            attr.count = originalCount * originalItemSize / overrideItemSize;
        }
        const itemSize = attr.itemSize;
        const count = attr.count;
        const normalized = attr.normalized;
        const originalBufferCons = attr.array.constructor;
        const byteCount = originalBufferCons.BYTES_PER_ELEMENT;
        let targetType = this._forcedType;
        let finalStride = itemSize;
        // derive the type of texture this should be in the shader
        if (targetType === null) switch(originalBufferCons){
            case Float32Array:
                targetType = (0, _three.FloatType);
                break;
            case Uint8Array:
            case Uint16Array:
            case Uint32Array:
                targetType = (0, _three.UnsignedIntType);
                break;
            case Int8Array:
            case Int16Array:
            case Int32Array:
                targetType = (0, _three.IntType);
                break;
        }
        // get the target format to store the texture as
        let type, format, normalizeValue, targetBufferCons;
        let internalFormat = countToStringFormat(itemSize);
        switch(targetType){
            case 0, _three.FloatType:
                normalizeValue = 1.0;
                format = countToFormat(itemSize);
                if (normalized && byteCount === 1) {
                    targetBufferCons = originalBufferCons;
                    internalFormat += '8';
                    if (originalBufferCons === Uint8Array) type = (0, _three.UnsignedByteType);
                    else {
                        type = (0, _three.ByteType);
                        internalFormat += '_SNORM';
                    }
                } else {
                    targetBufferCons = Float32Array;
                    internalFormat += '32F';
                    type = (0, _three.FloatType);
                }
                break;
            case 0, _three.IntType:
                internalFormat += byteCount * 8 + 'I';
                normalizeValue = normalized ? Math.pow(2, originalBufferCons.BYTES_PER_ELEMENT * 8 - 1) : 1.0;
                format = countToIntFormat(itemSize);
                if (byteCount === 1) {
                    targetBufferCons = Int8Array;
                    type = (0, _three.ByteType);
                } else if (byteCount === 2) {
                    targetBufferCons = Int16Array;
                    type = (0, _three.ShortType);
                } else {
                    targetBufferCons = Int32Array;
                    type = (0, _three.IntType);
                }
                break;
            case 0, _three.UnsignedIntType:
                internalFormat += byteCount * 8 + 'UI';
                normalizeValue = normalized ? Math.pow(2, originalBufferCons.BYTES_PER_ELEMENT * 8 - 1) : 1.0;
                format = countToIntFormat(itemSize);
                if (byteCount === 1) {
                    targetBufferCons = Uint8Array;
                    type = (0, _three.UnsignedByteType);
                } else if (byteCount === 2) {
                    targetBufferCons = Uint16Array;
                    type = (0, _three.UnsignedShortType);
                } else {
                    targetBufferCons = Uint32Array;
                    type = (0, _three.UnsignedIntType);
                }
                break;
        }
        // there will be a mismatch between format length and final length because
        // RGBFormat and RGBIntegerFormat was removed
        if (finalStride === 3 && (format === (0, _three.RGBAFormat) || format === (0, _three.RGBAIntegerFormat))) finalStride = 4;
        // copy the data over to the new texture array
        const dimension = Math.ceil(Math.sqrt(count)) || 1;
        const length = finalStride * dimension * dimension;
        const dataArray = new targetBufferCons(length);
        // temporarily set the normalized state to false since we have custom normalization logic
        const originalNormalized = attr.normalized;
        attr.normalized = false;
        for(let i = 0; i < count; i++){
            const ii = finalStride * i;
            dataArray[ii] = attr.getX(i) / normalizeValue;
            if (itemSize >= 2) dataArray[ii + 1] = attr.getY(i) / normalizeValue;
            if (itemSize >= 3) {
                dataArray[ii + 2] = attr.getZ(i) / normalizeValue;
                if (finalStride === 4) dataArray[ii + 3] = 1.0;
            }
            if (itemSize >= 4) dataArray[ii + 3] = attr.getW(i) / normalizeValue;
        }
        attr.normalized = originalNormalized;
        this.internalFormat = internalFormat;
        this.format = format;
        this.type = type;
        this.image.width = dimension;
        this.image.height = dimension;
        this.image.data = dataArray;
        this.needsUpdate = true;
        this.dispose();
        attr.itemSize = originalItemSize;
        attr.count = originalCount;
    }
}
class UIntVertexAttributeTexture extends VertexAttributeTexture {
    constructor(){
        super();
        this._forcedType = (0, _three.UnsignedIntType);
    }
}
class IntVertexAttributeTexture extends VertexAttributeTexture {
    constructor(){
        super();
        this._forcedType = (0, _three.IntType);
    }
}
class FloatVertexAttributeTexture extends VertexAttributeTexture {
    constructor(){
        super();
        this._forcedType = (0, _three.FloatType);
    }
}

},{"three":"ktPTu","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gZxTc":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _commonFunctionsGlslJs = require("./glsl/common_functions.glsl.js");
parcelHelpers.exportAll(_commonFunctionsGlslJs, exports);
var _bvhDistanceFunctionsGlslJs = require("./glsl/bvh_distance_functions.glsl.js");
parcelHelpers.exportAll(_bvhDistanceFunctionsGlslJs, exports);
var _bvhRayFunctionsGlslJs = require("./glsl/bvh_ray_functions.glsl.js");
parcelHelpers.exportAll(_bvhRayFunctionsGlslJs, exports);
var _bvhStructDefinitionsGlslJs = require("./glsl/bvh_struct_definitions.glsl.js");
parcelHelpers.exportAll(_bvhStructDefinitionsGlslJs, exports);

},{"./glsl/common_functions.glsl.js":"1RueR","./glsl/bvh_distance_functions.glsl.js":"dKwHt","./glsl/bvh_ray_functions.glsl.js":"fldsd","./glsl/bvh_struct_definitions.glsl.js":"aMEr2","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1RueR":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "common_functions", ()=>common_functions);
const common_functions = /* glsl */ `

// A stack of uint32 indices can can store the indices for
// a perfectly balanced tree with a depth up to 31. Lower stack
// depth gets higher performance.
//
// However not all trees are balanced. Best value to set this to
// is the trees max depth.
#ifndef BVH_STACK_DEPTH
#define BVH_STACK_DEPTH 60
#endif

#ifndef INFINITY
#define INFINITY 1e20
#endif

// Utilities
uvec4 uTexelFetch1D( usampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

ivec4 iTexelFetch1D( isampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

vec4 texelFetch1D( sampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

vec4 textureSampleBarycoord( sampler2D tex, vec3 barycoord, uvec3 faceIndices ) {

	return
		barycoord.x * texelFetch1D( tex, faceIndices.x ) +
		barycoord.y * texelFetch1D( tex, faceIndices.y ) +
		barycoord.z * texelFetch1D( tex, faceIndices.z );

}

void ndcToCameraRay(
	vec2 coord, mat4 cameraWorld, mat4 invProjectionMatrix,
	out vec3 rayOrigin, out vec3 rayDirection
) {

	// get camera look direction and near plane for camera clipping
	vec4 lookDirection = cameraWorld * vec4( 0.0, 0.0, - 1.0, 0.0 );
	vec4 nearVector = invProjectionMatrix * vec4( 0.0, 0.0, - 1.0, 1.0 );
	float near = abs( nearVector.z / nearVector.w );

	// get the camera direction and position from camera matrices
	vec4 origin = cameraWorld * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec4 direction = invProjectionMatrix * vec4( coord, 0.5, 1.0 );
	direction /= direction.w;
	direction = cameraWorld * direction - origin;

	// slide the origin along the ray until it sits at the near clip plane position
	origin.xyz += direction.xyz * near / dot( direction, lookDirection );

	rayOrigin = origin.xyz;
	rayDirection = direction.xyz;

}
`;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dKwHt":[function(require,module,exports,__globalThis) {
// Distance to Point
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "bvh_distance_functions", ()=>bvh_distance_functions);
const bvh_distance_functions = /* glsl */ `

float dot2( vec3 v ) {

	return dot( v, v );

}

// https://www.shadertoy.com/view/ttfGWl
vec3 closestPointToTriangle( vec3 p, vec3 v0, vec3 v1, vec3 v2, out vec3 barycoord ) {

    vec3 v10 = v1 - v0;
    vec3 v21 = v2 - v1;
    vec3 v02 = v0 - v2;

	vec3 p0 = p - v0;
	vec3 p1 = p - v1;
	vec3 p2 = p - v2;

    vec3 nor = cross( v10, v02 );

    // method 2, in barycentric space
    vec3  q = cross( nor, p0 );
    float d = 1.0 / dot2( nor );
    float u = d * dot( q, v02 );
    float v = d * dot( q, v10 );
    float w = 1.0 - u - v;

	if( u < 0.0 ) {

		w = clamp( dot( p2, v02 ) / dot2( v02 ), 0.0, 1.0 );
		u = 0.0;
		v = 1.0 - w;

	} else if( v < 0.0 ) {

		u = clamp( dot( p0, v10 ) / dot2( v10 ), 0.0, 1.0 );
		v = 0.0;
		w = 1.0 - u;

	} else if( w < 0.0 ) {

		v = clamp( dot( p1, v21 ) / dot2( v21 ), 0.0, 1.0 );
		w = 0.0;
		u = 1.0-v;

	}

	barycoord = vec3( u, v, w );
    return u * v1 + v * v2 + w * v0;

}

float distanceToTriangles(
	// geometry info and triangle range
	sampler2D positionAttr, usampler2D indexAttr, uint offset, uint count,

	// point and cut off range
	vec3 point, float closestDistanceSquared,

	// outputs
	inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord, inout float side, inout vec3 outPoint
) {

	bool found = false;
	vec3 localBarycoord;
	for ( uint i = offset, l = offset + count; i < l; i ++ ) {

		uvec3 indices = uTexelFetch1D( indexAttr, i ).xyz;
		vec3 a = texelFetch1D( positionAttr, indices.x ).rgb;
		vec3 b = texelFetch1D( positionAttr, indices.y ).rgb;
		vec3 c = texelFetch1D( positionAttr, indices.z ).rgb;

		// get the closest point and barycoord
		vec3 closestPoint = closestPointToTriangle( point, a, b, c, localBarycoord );
		vec3 delta = point - closestPoint;
		float sqDist = dot2( delta );
		if ( sqDist < closestDistanceSquared ) {

			// set the output results
			closestDistanceSquared = sqDist;
			faceIndices = uvec4( indices.xyz, i );
			faceNormal = normalize( cross( a - b, b - c ) );
			barycoord = localBarycoord;
			outPoint = closestPoint;
			side = sign( dot( faceNormal, delta ) );

		}

	}

	return closestDistanceSquared;

}

float distanceSqToBounds( vec3 point, vec3 boundsMin, vec3 boundsMax ) {

	vec3 clampedPoint = clamp( point, boundsMin, boundsMax );
	vec3 delta = point - clampedPoint;
	return dot( delta, delta );

}

float distanceSqToBVHNodeBoundsPoint( vec3 point, sampler2D bvhBounds, uint currNodeIndex ) {

	uint cni2 = currNodeIndex * 2u;
	vec3 boundsMin = texelFetch1D( bvhBounds, cni2 ).xyz;
	vec3 boundsMax = texelFetch1D( bvhBounds, cni2 + 1u ).xyz;
	return distanceSqToBounds( point, boundsMin, boundsMax );

}

// use a macro to hide the fact that we need to expand the struct into separate fields
#define\
	bvhClosestPointToPoint(\
		bvh,\
		point, faceIndices, faceNormal, barycoord, side, outPoint\
	)\
	_bvhClosestPointToPoint(\
		bvh.position, bvh.index, bvh.bvhBounds, bvh.bvhContents,\
		point, faceIndices, faceNormal, barycoord, side, outPoint\
	)

float _bvhClosestPointToPoint(
	// bvh info
	sampler2D bvh_position, usampler2D bvh_index, sampler2D bvh_bvhBounds, usampler2D bvh_bvhContents,

	// point to check
	vec3 point,

	// output variables
	inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord,
	inout float side, inout vec3 outPoint
 ) {

	// stack needs to be twice as long as the deepest tree we expect because
	// we push both the left and right child onto the stack every traversal
	int ptr = 0;
	uint stack[ BVH_STACK_DEPTH ];
	stack[ 0 ] = 0u;

	float closestDistanceSquared = pow( 100000.0, 2.0 );
	bool found = false;
	while ( ptr > - 1 && ptr < BVH_STACK_DEPTH ) {

		uint currNodeIndex = stack[ ptr ];
		ptr --;

		// check if we intersect the current bounds
		float boundsHitDistance = distanceSqToBVHNodeBoundsPoint( point, bvh_bvhBounds, currNodeIndex );
		if ( boundsHitDistance > closestDistanceSquared ) {

			continue;

		}

		uvec2 boundsInfo = uTexelFetch1D( bvh_bvhContents, currNodeIndex ).xy;
		bool isLeaf = bool( boundsInfo.x & 0xffff0000u );
		if ( isLeaf ) {

			uint count = boundsInfo.x & 0x0000ffffu;
			uint offset = boundsInfo.y;
			closestDistanceSquared = distanceToTriangles(
				bvh_position, bvh_index, offset, count, point, closestDistanceSquared,

				// outputs
				faceIndices, faceNormal, barycoord, side, outPoint
			);

		} else {

			uint leftIndex = currNodeIndex + 1u;
			uint splitAxis = boundsInfo.x & 0x0000ffffu;
			uint rightIndex = boundsInfo.y;
			bool leftToRight = distanceSqToBVHNodeBoundsPoint( point, bvh_bvhBounds, leftIndex ) < distanceSqToBVHNodeBoundsPoint( point, bvh_bvhBounds, rightIndex );//rayDirection[ splitAxis ] >= 0.0;
			uint c1 = leftToRight ? leftIndex : rightIndex;
			uint c2 = leftToRight ? rightIndex : leftIndex;

			// set c2 in the stack so we traverse it later. We need to keep track of a pointer in
			// the stack while we traverse. The second pointer added is the one that will be
			// traversed first
			ptr ++;
			stack[ ptr ] = c2;
			ptr ++;
			stack[ ptr ] = c1;

		}

	}

	return sqrt( closestDistanceSquared );

}
`;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fldsd":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "bvh_ray_functions", ()=>bvh_ray_functions);
const bvh_ray_functions = /* glsl */ `

#ifndef TRI_INTERSECT_EPSILON
#define TRI_INTERSECT_EPSILON 1e-5
#endif

// Raycasting
bool intersectsBounds( vec3 rayOrigin, vec3 rayDirection, vec3 boundsMin, vec3 boundsMax, out float dist ) {

	// https://www.reddit.com/r/opengl/comments/8ntzz5/fast_glsl_ray_box_intersection/
	// https://tavianator.com/2011/ray_box.html
	vec3 invDir = 1.0 / rayDirection;

	// find intersection distances for each plane
	vec3 tMinPlane = invDir * ( boundsMin - rayOrigin );
	vec3 tMaxPlane = invDir * ( boundsMax - rayOrigin );

	// get the min and max distances from each intersection
	vec3 tMinHit = min( tMaxPlane, tMinPlane );
	vec3 tMaxHit = max( tMaxPlane, tMinPlane );

	// get the furthest hit distance
	vec2 t = max( tMinHit.xx, tMinHit.yz );
	float t0 = max( t.x, t.y );

	// get the minimum hit distance
	t = min( tMaxHit.xx, tMaxHit.yz );
	float t1 = min( t.x, t.y );

	// set distance to 0.0 if the ray starts inside the box
	dist = max( t0, 0.0 );

	return t1 >= dist;

}

bool intersectsTriangle(
	vec3 rayOrigin, vec3 rayDirection, vec3 a, vec3 b, vec3 c,
	out vec3 barycoord, out vec3 norm, out float dist, out float side
) {

	// https://stackoverflow.com/questions/42740765/intersection-between-line-and-triangle-in-3d
	vec3 edge1 = b - a;
	vec3 edge2 = c - a;
	norm = cross( edge1, edge2 );

	float det = - dot( rayDirection, norm );
	float invdet = 1.0 / det;

	vec3 AO = rayOrigin - a;
	vec3 DAO = cross( AO, rayDirection );

	vec4 uvt;
	uvt.x = dot( edge2, DAO ) * invdet;
	uvt.y = - dot( edge1, DAO ) * invdet;
	uvt.z = dot( AO, norm ) * invdet;
	uvt.w = 1.0 - uvt.x - uvt.y;

	// set the hit information
	barycoord = uvt.wxy; // arranged in A, B, C order
	dist = uvt.z;
	side = sign( det );
	norm = side * normalize( norm );

	// add an epsilon to avoid misses between triangles
	uvt += vec4( TRI_INTERSECT_EPSILON );

	return all( greaterThanEqual( uvt, vec4( 0.0 ) ) );

}

bool intersectTriangles(
	// geometry info and triangle range
	sampler2D positionAttr, usampler2D indexAttr, uint offset, uint count,

	// ray
	vec3 rayOrigin, vec3 rayDirection,

	// outputs
	inout float minDistance, inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord,
	inout float side, inout float dist
) {

	bool found = false;
	vec3 localBarycoord, localNormal;
	float localDist, localSide;
	for ( uint i = offset, l = offset + count; i < l; i ++ ) {

		uvec3 indices = uTexelFetch1D( indexAttr, i ).xyz;
		vec3 a = texelFetch1D( positionAttr, indices.x ).rgb;
		vec3 b = texelFetch1D( positionAttr, indices.y ).rgb;
		vec3 c = texelFetch1D( positionAttr, indices.z ).rgb;

		if (
			intersectsTriangle( rayOrigin, rayDirection, a, b, c, localBarycoord, localNormal, localDist, localSide )
			&& localDist < minDistance
		) {

			found = true;
			minDistance = localDist;

			faceIndices = uvec4( indices.xyz, i );
			faceNormal = localNormal;

			side = localSide;
			barycoord = localBarycoord;
			dist = localDist;

		}

	}

	return found;

}

bool intersectsBVHNodeBounds( vec3 rayOrigin, vec3 rayDirection, sampler2D bvhBounds, uint currNodeIndex, out float dist ) {

	uint cni2 = currNodeIndex * 2u;
	vec3 boundsMin = texelFetch1D( bvhBounds, cni2 ).xyz;
	vec3 boundsMax = texelFetch1D( bvhBounds, cni2 + 1u ).xyz;
	return intersectsBounds( rayOrigin, rayDirection, boundsMin, boundsMax, dist );

}

// use a macro to hide the fact that we need to expand the struct into separate fields
#define\
	bvhIntersectFirstHit(\
		bvh,\
		rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist\
	)\
	_bvhIntersectFirstHit(\
		bvh.position, bvh.index, bvh.bvhBounds, bvh.bvhContents,\
		rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist\
	)

bool _bvhIntersectFirstHit(
	// bvh info
	sampler2D bvh_position, usampler2D bvh_index, sampler2D bvh_bvhBounds, usampler2D bvh_bvhContents,

	// ray
	vec3 rayOrigin, vec3 rayDirection,

	// output variables split into separate variables due to output precision
	inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord,
	inout float side, inout float dist
) {

	// stack needs to be twice as long as the deepest tree we expect because
	// we push both the left and right child onto the stack every traversal
	int ptr = 0;
	uint stack[ BVH_STACK_DEPTH ];
	stack[ 0 ] = 0u;

	float triangleDistance = INFINITY;
	bool found = false;
	while ( ptr > - 1 && ptr < BVH_STACK_DEPTH ) {

		uint currNodeIndex = stack[ ptr ];
		ptr --;

		// check if we intersect the current bounds
		float boundsHitDistance;
		if (
			! intersectsBVHNodeBounds( rayOrigin, rayDirection, bvh_bvhBounds, currNodeIndex, boundsHitDistance )
			|| boundsHitDistance > triangleDistance
		) {

			continue;

		}

		uvec2 boundsInfo = uTexelFetch1D( bvh_bvhContents, currNodeIndex ).xy;
		bool isLeaf = bool( boundsInfo.x & 0xffff0000u );

		if ( isLeaf ) {

			uint count = boundsInfo.x & 0x0000ffffu;
			uint offset = boundsInfo.y;

			found = intersectTriangles(
				bvh_position, bvh_index, offset, count,
				rayOrigin, rayDirection, triangleDistance,
				faceIndices, faceNormal, barycoord, side, dist
			) || found;

		} else {

			uint leftIndex = currNodeIndex + 1u;
			uint splitAxis = boundsInfo.x & 0x0000ffffu;
			uint rightIndex = boundsInfo.y;

			bool leftToRight = rayDirection[ splitAxis ] >= 0.0;
			uint c1 = leftToRight ? leftIndex : rightIndex;
			uint c2 = leftToRight ? rightIndex : leftIndex;

			// set c2 in the stack so we traverse it later. We need to keep track of a pointer in
			// the stack while we traverse. The second pointer added is the one that will be
			// traversed first
			ptr ++;
			stack[ ptr ] = c2;

			ptr ++;
			stack[ ptr ] = c1;

		}

	}

	return found;

}
`;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aMEr2":[function(require,module,exports,__globalThis) {
// Note that a struct cannot be used for the hit record including faceIndices, faceNormal, barycoord,
// side, and dist because on some mobile GPUS (such as Adreno) numbers are afforded less precision specifically
// when in a struct leading to inaccurate hit results. See KhronosGroup/WebGL#3351 for more details.
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "bvh_struct_definitions", ()=>bvh_struct_definitions);
const bvh_struct_definitions = /* glsl */ `
struct BVH {

	usampler2D index;
	sampler2D position;

	sampler2D bvhBounds;
	usampler2D bvhContents;

};
`;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aQCXy":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "NO_CHANGE", ()=>NO_CHANGE);
parcelHelpers.export(exports, "GEOMETRY_ADJUSTED", ()=>GEOMETRY_ADJUSTED);
parcelHelpers.export(exports, "GEOMETRY_REBUILT", ()=>GEOMETRY_REBUILT);
parcelHelpers.export(exports, "StaticGeometryGenerator", ()=>StaticGeometryGenerator);
var _three = require("three");
var _mergeGeometriesJs = require("./mergeGeometries.js");
var _geometryPreparationUtilsJs = require("./GeometryPreparationUtils.js");
var _bakedGeometryJs = require("./BakedGeometry.js");
const NO_CHANGE = 0;
const GEOMETRY_ADJUSTED = 1;
const GEOMETRY_REBUILT = 2;
// iterate over only the meshes in the provided objects
function flatTraverseMeshes(objects, cb) {
    for(let i = 0, l = objects.length; i < l; i++){
        const object = objects[i];
        object.traverseVisible((o)=>{
            if (o.isMesh) cb(o);
        });
    }
}
// return the set of materials used by the provided meshes
function getMaterials(meshes) {
    const materials = [];
    for(let i = 0, l = meshes.length; i < l; i++){
        const mesh = meshes[i];
        if (Array.isArray(mesh.material)) materials.push(...mesh.material);
        else materials.push(mesh.material);
    }
    return materials;
}
function mergeGeometryList(geometries, target, options) {
    // If we have no geometry to merge then provide an empty geometry.
    if (geometries.length === 0) {
        // if there are no geometries then just create a fake empty geometry to provide
        target.setIndex(null);
        // remove all geometry
        const attrs = target.attributes;
        for(const key in attrs)target.deleteAttribute(key);
        // create dummy attributes
        for(const key in options.attributes)target.setAttribute(options.attributes[key], new (0, _three.BufferAttribute)(new Float32Array(0), 4, false));
    } else (0, _mergeGeometriesJs.mergeGeometries)(geometries, options, target);
    // Mark all attributes as needing an update
    for(const key in target.attributes)target.attributes[key].needsUpdate = true;
}
class StaticGeometryGenerator {
    constructor(objects){
        this.objects = null;
        this.useGroups = true;
        this.applyWorldTransforms = true;
        this.generateMissingAttributes = true;
        this.overwriteIndex = true;
        this.attributes = [
            'position',
            'normal',
            'color',
            'tangent',
            'uv',
            'uv2'
        ];
        this._intermediateGeometry = new Map();
        this._geometryMergeSets = new WeakMap();
        this._mergeOrder = [];
        this._dummyMesh = null;
        this.setObjects(objects || []);
    }
    _getDummyMesh() {
        // return a consistent dummy mesh
        if (!this._dummyMesh) {
            const dummyMaterial = new (0, _three.MeshBasicMaterial)();
            const emptyGeometry = new (0, _three.BufferGeometry)();
            emptyGeometry.setAttribute('position', new (0, _three.BufferAttribute)(new Float32Array(9), 3));
            this._dummyMesh = new (0, _three.Mesh)(emptyGeometry, dummyMaterial);
        }
        return this._dummyMesh;
    }
    _getMeshes() {
        // iterate over only the meshes in the provided objects
        const meshes = [];
        flatTraverseMeshes(this.objects, (mesh)=>{
            meshes.push(mesh);
        });
        // Sort the geometry so it's in a reliable order
        meshes.sort((a, b)=>{
            if (a.uuid > b.uuid) return 1;
            if (a.uuid < b.uuid) return -1;
            return 0;
        });
        if (meshes.length === 0) meshes.push(this._getDummyMesh());
        return meshes;
    }
    _updateIntermediateGeometries() {
        const { _intermediateGeometry } = this;
        const meshes = this._getMeshes();
        const unusedMeshKeys = new Set(_intermediateGeometry.keys());
        const convertOptions = {
            attributes: this.attributes,
            applyWorldTransforms: this.applyWorldTransforms
        };
        for(let i = 0, l = meshes.length; i < l; i++){
            const mesh = meshes[i];
            const meshKey = mesh.uuid;
            unusedMeshKeys.delete(meshKey);
            // initialize the intermediate geometry
            // if the mesh and source geometry have changed in such a way that they are no longer
            // compatible then regenerate the baked geometry from scratch
            let geom = _intermediateGeometry.get(meshKey);
            if (!geom || !geom.isCompatible(mesh, this.attributes)) {
                if (geom) geom.dispose();
                geom = new (0, _bakedGeometryJs.BakedGeometry)();
                _intermediateGeometry.set(meshKey, geom);
            }
            // transform the geometry into the intermediate buffer geometry, saving whether
            // or not it changed.
            if (geom.updateFrom(mesh, convertOptions)) // TODO: provide option for only generating the set of attributes that are present
            // and are in the attributes array
            {
                if (this.generateMissingAttributes) (0, _geometryPreparationUtilsJs.setCommonAttributes)(geom, this.attributes);
            }
        }
        unusedMeshKeys.forEach((key)=>{
            _intermediateGeometry.delete(key);
        });
    }
    setObjects(objects) {
        if (Array.isArray(objects)) this.objects = [
            ...objects
        ];
        else this.objects = [
            objects
        ];
    }
    generate(targetGeometry = new (0, _three.BufferGeometry)()) {
        // track which attributes have been updated and which to skip to avoid unnecessary attribute copies
        const { useGroups, overwriteIndex, _intermediateGeometry, _geometryMergeSets } = this;
        const meshes = this._getMeshes();
        const skipAssigningAttributes = [];
        const mergeGeometry = [];
        const previousMergeInfo = _geometryMergeSets.get(targetGeometry) || [];
        // update all the intermediate static geometry representations
        this._updateIntermediateGeometries();
        // get the list of geometries to merge
        let forceUpdate = false;
        if (meshes.length !== previousMergeInfo.length) forceUpdate = true;
        for(let i = 0, l = meshes.length; i < l; i++){
            const mesh = meshes[i];
            const geom = _intermediateGeometry.get(mesh.uuid);
            mergeGeometry.push(geom);
            const info = previousMergeInfo[i];
            if (!info || info.uuid !== geom.uuid) {
                skipAssigningAttributes.push(false);
                forceUpdate = true;
            } else if (info.version !== geom.version) skipAssigningAttributes.push(false);
            else skipAssigningAttributes.push(true);
        }
        // If we have no geometry to merge then provide an empty geometry.
        mergeGeometryList(mergeGeometry, targetGeometry, {
            useGroups,
            forceUpdate,
            skipAssigningAttributes,
            overwriteIndex
        });
        // force update means the attribute buffer lengths have changed
        if (forceUpdate) targetGeometry.dispose();
        _geometryMergeSets.set(targetGeometry, mergeGeometry.map((g)=>({
                version: g.version,
                uuid: g.uuid
            })));
        let changeType = NO_CHANGE;
        if (forceUpdate) changeType = GEOMETRY_REBUILT;
        else if (skipAssigningAttributes.includes(false)) changeType = GEOMETRY_ADJUSTED;
        return {
            changeType,
            materials: getMaterials(meshes),
            geometry: targetGeometry
        };
    }
}

},{"three":"ktPTu","./mergeGeometries.js":"j2l20","./GeometryPreparationUtils.js":"dBaXO","./BakedGeometry.js":"G3uKg","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"j2l20":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// Modified version of BufferGeometryUtils.mergeBufferGeometries that ignores morph targets and updates a attributes in place
parcelHelpers.export(exports, "mergeGeometries", ()=>mergeGeometries);
var _three = require("three");
var _bufferAttributeUtilsJs = require("./BufferAttributeUtils.js");
function validateMergeability(geometries) {
    const isIndexed = geometries[0].index !== null;
    const attributesUsed = new Set(Object.keys(geometries[0].attributes));
    if (!geometries[0].getAttribute('position')) throw new Error('StaticGeometryGenerator: position attribute is required.');
    for(let i = 0; i < geometries.length; ++i){
        const geometry = geometries[i];
        let attributesCount = 0;
        // ensure that all geometries are indexed, or none
        if (isIndexed !== (geometry.index !== null)) throw new Error('StaticGeometryGenerator: All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.');
        // gather attributes, exit early if they're different
        for(const name in geometry.attributes){
            if (!attributesUsed.has(name)) throw new Error('StaticGeometryGenerator: All geometries must have compatible attributes; make sure "' + name + '" attribute exists among all geometries, or in none of them.');
            attributesCount++;
        }
        // ensure geometries have the same number of attributes
        if (attributesCount !== attributesUsed.size) throw new Error('StaticGeometryGenerator: All geometries must have the same number of attributes.');
    }
}
function getTotalIndexCount(geometries) {
    let result = 0;
    for(let i = 0, l = geometries.length; i < l; i++)result += geometries[i].getIndex().count;
    return result;
}
function getTotalAttributeCount(geometries) {
    let result = 0;
    for(let i = 0, l = geometries.length; i < l; i++)result += geometries[i].getAttribute('position').count;
    return result;
}
function trimMismatchedAttributes(target, indexCount, attrCount) {
    if (target.index && target.index.count !== indexCount) target.setIndex(null);
    const attributes = target.attributes;
    for(const key in attributes){
        const attr = attributes[key];
        if (attr.count !== attrCount) target.deleteAttribute(key);
    }
}
function mergeGeometries(geometries, options = {}, targetGeometry = new (0, _three.BufferGeometry)()) {
    const { useGroups = false, forceUpdate = false, skipAssigningAttributes = [], overwriteIndex = true } = options;
    // check if we can merge these geometries
    validateMergeability(geometries);
    const isIndexed = geometries[0].index !== null;
    const totalIndexCount = isIndexed ? getTotalIndexCount(geometries) : -1;
    const totalAttributeCount = getTotalAttributeCount(geometries);
    trimMismatchedAttributes(targetGeometry, totalIndexCount, totalAttributeCount);
    // set up groups
    if (useGroups) {
        let offset = 0;
        for(let i = 0, l = geometries.length; i < l; i++){
            const geometry = geometries[i];
            let primitiveCount;
            if (isIndexed) primitiveCount = geometry.getIndex().count;
            else primitiveCount = geometry.getAttribute('position').count;
            targetGeometry.addGroup(offset, primitiveCount, i);
            offset += primitiveCount;
        }
    }
    // generate the final geometry
    // skip the assigning any attributes for items in the above array
    if (isIndexed) {
        // set up the index if it doesn't exist
        let forceUpdateIndex = false;
        if (!targetGeometry.index) {
            targetGeometry.setIndex(new (0, _three.BufferAttribute)(new Uint32Array(totalIndexCount), 1, false));
            forceUpdateIndex = true;
        }
        if (forceUpdateIndex || overwriteIndex) {
            // copy the index data to the target geometry
            let targetOffset = 0;
            let indexOffset = 0;
            const targetIndex = targetGeometry.getIndex();
            for(let i = 0, l = geometries.length; i < l; i++){
                const geometry = geometries[i];
                const index = geometry.getIndex();
                const skip = !forceUpdate && !forceUpdateIndex && skipAssigningAttributes[i];
                if (!skip) for(let j = 0; j < index.count; ++j)targetIndex.setX(targetOffset + j, index.getX(j) + indexOffset);
                targetOffset += index.count;
                indexOffset += geometry.getAttribute('position').count;
            }
        }
    }
    // copy all the attribute data over
    const attributes = Object.keys(geometries[0].attributes);
    for(let i = 0, l = attributes.length; i < l; i++){
        let forceUpdateAttr = false;
        const key = attributes[i];
        if (!targetGeometry.getAttribute(key)) {
            const firstAttr = geometries[0].getAttribute(key);
            targetGeometry.setAttribute(key, (0, _bufferAttributeUtilsJs.createAttributeClone)(firstAttr, totalAttributeCount));
            forceUpdateAttr = true;
        }
        let offset = 0;
        const targetAttribute = targetGeometry.getAttribute(key);
        for(let g = 0, l = geometries.length; g < l; g++){
            const geometry = geometries[g];
            const skip = !forceUpdate && !forceUpdateAttr && skipAssigningAttributes[g];
            const attr = geometry.getAttribute(key);
            if (!skip) {
                if (key === 'color' && targetAttribute.itemSize !== attr.itemSize) // make sure the color attribute is aligned with itemSize 3 to 4
                for(let index = offset, l = attr.count; index < l; index++)attr.setXYZW(index, targetAttribute.getX(index), targetAttribute.getY(index), targetAttribute.getZ(index), 1.0);
                else (0, _bufferAttributeUtilsJs.copyAttributeContents)(attr, targetAttribute, offset);
            }
            offset += attr.count;
        }
    }
}

},{"three":"ktPTu","./BufferAttributeUtils.js":"ic9g3","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ic9g3":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// target offset is the number of elements in the target buffer stride to skip before copying the
// attributes contents in to.
parcelHelpers.export(exports, "copyAttributeContents", ()=>copyAttributeContents);
// Clones the given attribute with a new compatible buffer attribute but no data
parcelHelpers.export(exports, "createAttributeClone", ()=>createAttributeClone);
// Confirms that the two provided attributes are compatible. Returns false if they are not.
parcelHelpers.export(exports, "validateAttributes", ()=>validateAttributes);
var _three = require("three");
function copyAttributeContents(attr, target, targetOffset = 0) {
    if (attr.isInterleavedBufferAttribute) {
        const itemSize = attr.itemSize;
        for(let i = 0, l = attr.count; i < l; i++){
            const io = i + targetOffset;
            target.setX(io, attr.getX(i));
            if (itemSize >= 2) target.setY(io, attr.getY(i));
            if (itemSize >= 3) target.setZ(io, attr.getZ(i));
            if (itemSize >= 4) target.setW(io, attr.getW(i));
        }
    } else {
        const array = target.array;
        const cons = array.constructor;
        const byteOffset = array.BYTES_PER_ELEMENT * attr.itemSize * targetOffset;
        const temp = new cons(array.buffer, byteOffset, attr.array.length);
        temp.set(attr.array);
    }
}
function createAttributeClone(attr, countOverride = null) {
    const cons = attr.array.constructor;
    const normalized = attr.normalized;
    const itemSize = attr.itemSize;
    const count = countOverride === null ? attr.count : countOverride;
    return new (0, _three.BufferAttribute)(new cons(itemSize * count), itemSize, normalized);
}
function validateAttributes(attr1, attr2) {
    if (!attr1 && !attr2) return true;
    if (Boolean(attr1) !== Boolean(attr2)) return false;
    const sameCount = attr1.count === attr2.count;
    const sameNormalized = attr1.normalized === attr2.normalized;
    const sameType = attr1.array.constructor === attr2.array.constructor;
    const sameItemSize = attr1.itemSize === attr2.itemSize;
    if (!sameCount || !sameNormalized || !sameType || !sameItemSize) return false;
    return true;
}

},{"three":"ktPTu","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dBaXO":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "updateMaterialIndexAttribute", ()=>updateMaterialIndexAttribute);
parcelHelpers.export(exports, "setCommonAttributes", ()=>setCommonAttributes);
var _three = require("three");
function updateMaterialIndexAttribute(geometry, materials, allMaterials) {
    const indexAttr = geometry.index;
    const posAttr = geometry.attributes.position;
    const vertCount = posAttr.count;
    const totalCount = indexAttr ? indexAttr.count : vertCount;
    let groups = geometry.groups;
    if (groups.length === 0) groups = [
        {
            count: totalCount,
            start: 0,
            materialIndex: 0
        }
    ];
    let materialIndexAttribute = geometry.getAttribute('materialIndex');
    if (!materialIndexAttribute || materialIndexAttribute.count !== vertCount) {
        // use an array with the minimum precision required to store all material id references.
        let array;
        if (allMaterials.length <= 255) array = new Uint8Array(vertCount);
        else array = new Uint16Array(vertCount);
        materialIndexAttribute = new (0, _three.BufferAttribute)(array, 1, false);
        geometry.deleteAttribute('materialIndex');
        geometry.setAttribute('materialIndex', materialIndexAttribute);
    }
    const materialArray = materialIndexAttribute.array;
    for(let i = 0; i < groups.length; i++){
        const group = groups[i];
        const start = group.start;
        const count = group.count;
        const endCount = Math.min(count, totalCount - start);
        const mat = Array.isArray(materials) ? materials[group.materialIndex] : materials;
        const materialIndex = allMaterials.indexOf(mat);
        for(let j = 0; j < endCount; j++){
            let index = start + j;
            if (indexAttr) index = indexAttr.getX(index);
            materialArray[index] = materialIndex;
        }
    }
}
function setCommonAttributes(geometry, attributes) {
    if (!geometry.index) {
        // TODO: compute a typed array
        const indexCount = geometry.attributes.position.count;
        const array = new Array(indexCount);
        for(let i = 0; i < indexCount; i++)array[i] = i;
        geometry.setIndex(array);
    }
    if (!geometry.attributes.normal && attributes && attributes.includes('normal')) geometry.computeVertexNormals();
    if (!geometry.attributes.uv && attributes && attributes.includes('uv')) {
        const vertCount = geometry.attributes.position.count;
        geometry.setAttribute('uv', new (0, _three.BufferAttribute)(new Float32Array(vertCount * 2), 2, false));
    }
    if (!geometry.attributes.uv2 && attributes && attributes.includes('uv2')) {
        const vertCount = geometry.attributes.position.count;
        geometry.setAttribute('uv2', new (0, _three.BufferAttribute)(new Float32Array(vertCount * 2), 2, false));
    }
    if (!geometry.attributes.tangent && attributes && attributes.includes('tangent')) {
        // compute tangents requires a uv and normal buffer
        if (geometry.attributes.uv && geometry.attributes.normal) geometry.computeTangents();
        else {
            const vertCount = geometry.attributes.position.count;
            geometry.setAttribute('tangent', new (0, _three.BufferAttribute)(new Float32Array(vertCount * 4), 4, false));
        }
    }
    if (!geometry.attributes.color && attributes && attributes.includes('color')) {
        const vertCount = geometry.attributes.position.count;
        const array = new Float32Array(vertCount * 4);
        array.fill(1.0);
        geometry.setAttribute('color', new (0, _three.BufferAttribute)(array, 4));
    }
}

},{"three":"ktPTu","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"G3uKg":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "BakedGeometry", ()=>BakedGeometry);
var _three = require("three");
var _meshDiffJs = require("./MeshDiff.js");
var _convertToStaticGeometryJs = require("./convertToStaticGeometry.js");
var _bufferAttributeUtilsJs = require("./BufferAttributeUtils.js");
class BakedGeometry extends (0, _three.BufferGeometry) {
    constructor(){
        super();
        this.version = 0;
        this.hash = null;
        this._diff = new (0, _meshDiffJs.MeshDiff)();
    }
    // returns whether the passed mesh is compatible with this baked geometry
    // such that it can be updated without resizing attributes
    isCompatible(mesh, attributes) {
        const geometry = mesh.geometry;
        for(let i = 0; i < attributes.length; i++){
            const key = attributes[i];
            const attr1 = geometry.attributes[key];
            const attr2 = this.attributes[key];
            if (attr1 && !(0, _bufferAttributeUtilsJs.validateAttributes)(attr1, attr2)) return false;
        }
        return true;
    }
    updateFrom(mesh, options) {
        const diff = this._diff;
        if (diff.didChange(mesh)) {
            (0, _convertToStaticGeometryJs.convertToStaticGeometry)(mesh, options, this);
            diff.updateFrom(mesh);
            this.version++;
            this.hash = `${this.uuid}_${this.version}`;
            return true;
        } else return false;
    }
}

},{"three":"ktPTu","./MeshDiff.js":"aJJFg","./convertToStaticGeometry.js":"gFMRK","./BufferAttributeUtils.js":"ic9g3","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aJJFg":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// Checks whether the geometry changed between this and last evaluation
parcelHelpers.export(exports, "MeshDiff", ()=>MeshDiff);
var _three = require("three");
var _bufferToHashJs = require("../../utils/bufferToHash.js");
function getGeometryHash(geometry) {
    let hash = geometry.uuid;
    const attributes = Object.values(geometry.attributes);
    if (geometry.index) {
        attributes.push(geometry.index);
        hash += `index|${geometry.index.version}`;
    }
    const keys = Object.keys(attributes).sort();
    for (const key of keys){
        const attr = attributes[key];
        hash += `${key}_${attr.version}|`;
    }
    return hash;
}
function getSkeletonHash(mesh) {
    const skeleton = mesh.skeleton;
    if (skeleton) {
        if (!skeleton.boneTexture) skeleton.computeBoneTexture();
        // we can't use the texture version here because it will change even
        // when the bones haven't
        const dataHash = (0, _bufferToHashJs.bufferToHash)(skeleton.boneTexture.image.data.buffer);
        return `${dataHash}_${skeleton.boneTexture.uuid}`;
    } else return null;
}
class MeshDiff {
    constructor(mesh = null){
        this.matrixWorld = new (0, _three.Matrix4)();
        this.geometryHash = null;
        this.skeletonHash = null;
        this.primitiveCount = -1;
        if (mesh !== null) this.updateFrom(mesh);
    }
    updateFrom(mesh) {
        const geometry = mesh.geometry;
        const primitiveCount = (geometry.index ? geometry.index.count : geometry.attributes.position.count) / 3;
        this.matrixWorld.copy(mesh.matrixWorld);
        this.geometryHash = getGeometryHash(geometry);
        this.primitiveCount = primitiveCount;
        this.skeletonHash = getSkeletonHash(mesh);
    }
    didChange(mesh) {
        const geometry = mesh.geometry;
        const primitiveCount = (geometry.index ? geometry.index.count : geometry.attributes.position.count) / 3;
        const identical = this.matrixWorld.equals(mesh.matrixWorld) && this.geometryHash === getGeometryHash(geometry) && this.skeletonHash === getSkeletonHash(mesh) && this.primitiveCount === primitiveCount;
        return !identical;
    }
}

},{"three":"ktPTu","../../utils/bufferToHash.js":"8v9Fx","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8v9Fx":[function(require,module,exports,__globalThis) {
// https://www.geeksforgeeks.org/how-to-create-hash-from-string-in-javascript/
// https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "bufferToHash", ()=>bufferToHash);
function bufferToHash(buffer) {
    let hash = 0;
    if (buffer.byteLength !== 0) {
        const uintArray = new Uint8Array(buffer);
        for(let i = 0; i < buffer.byteLength; i++){
            const byte = uintArray[i];
            hash = (hash << 5) - hash + byte;
            hash |= 0;
        }
    }
    return hash;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gFMRK":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "convertToStaticGeometry", ()=>convertToStaticGeometry);
var _three = require("three");
var _bufferAttributeUtilsJs = require("./BufferAttributeUtils.js");
const _positionVector = /*@__PURE__*/ new (0, _three.Vector3)();
const _normalVector = /*@__PURE__*/ new (0, _three.Vector3)();
const _tangentVector = /*@__PURE__*/ new (0, _three.Vector3)();
const _tangentVector4 = /*@__PURE__*/ new (0, _three.Vector4)();
const _morphVector = /*@__PURE__*/ new (0, _three.Vector3)();
const _temp = /*@__PURE__*/ new (0, _three.Vector3)();
const _skinIndex = /*@__PURE__*/ new (0, _three.Vector4)();
const _skinWeight = /*@__PURE__*/ new (0, _three.Vector4)();
const _matrix = /*@__PURE__*/ new (0, _three.Matrix4)();
const _boneMatrix = /*@__PURE__*/ new (0, _three.Matrix4)();
// A version of "SkinnedMesh.boneTransform" for normals
function boneNormalTransform(mesh, index, target) {
    const skeleton = mesh.skeleton;
    const geometry = mesh.geometry;
    const bones = skeleton.bones;
    const boneInverses = skeleton.boneInverses;
    _skinIndex.fromBufferAttribute(geometry.attributes.skinIndex, index);
    _skinWeight.fromBufferAttribute(geometry.attributes.skinWeight, index);
    _matrix.elements.fill(0);
    for(let i = 0; i < 4; i++){
        const weight = _skinWeight.getComponent(i);
        if (weight !== 0) {
            const boneIndex = _skinIndex.getComponent(i);
            _boneMatrix.multiplyMatrices(bones[boneIndex].matrixWorld, boneInverses[boneIndex]);
            addScaledMatrix(_matrix, _boneMatrix, weight);
        }
    }
    _matrix.multiply(mesh.bindMatrix).premultiply(mesh.bindMatrixInverse);
    target.transformDirection(_matrix);
    return target;
}
// Applies the morph target data to the target vector
function applyMorphTarget(morphData, morphInfluences, morphTargetsRelative, i, target) {
    _morphVector.set(0, 0, 0);
    for(let j = 0, jl = morphData.length; j < jl; j++){
        const influence = morphInfluences[j];
        const morphAttribute = morphData[j];
        if (influence === 0) continue;
        _temp.fromBufferAttribute(morphAttribute, i);
        if (morphTargetsRelative) _morphVector.addScaledVector(_temp, influence);
        else _morphVector.addScaledVector(_temp.sub(target), influence);
    }
    target.add(_morphVector);
}
// Adds the "matrix" multiplied by "scale" to "target"
function addScaledMatrix(target, matrix, scale) {
    const targetArray = target.elements;
    const matrixArray = matrix.elements;
    for(let i = 0, l = matrixArray.length; i < l; i++)targetArray[i] += matrixArray[i] * scale;
}
// inverts the geometry in place
function invertGeometry(geometry) {
    const { index, attributes } = geometry;
    if (index) for(let i = 0, l = index.count; i < l; i += 3){
        const v0 = index.getX(i);
        const v2 = index.getX(i + 2);
        index.setX(i, v2);
        index.setX(i + 2, v0);
    }
    else for(const key in attributes){
        const attr = attributes[key];
        const itemSize = attr.itemSize;
        for(let i = 0, l = attr.count; i < l; i += 3)for(let j = 0; j < itemSize; j++){
            const v0 = attr.getComponent(i, j);
            const v2 = attr.getComponent(i + 2, j);
            attr.setComponent(i, j, v2);
            attr.setComponent(i + 2, j, v0);
        }
    }
    return geometry;
}
function convertToStaticGeometry(mesh, options = {}, targetGeometry = new (0, _three.BufferGeometry)()) {
    options = {
        applyWorldTransforms: true,
        attributes: [],
        ...options
    };
    const geometry = mesh.geometry;
    const applyWorldTransforms = options.applyWorldTransforms;
    const includeNormal = options.attributes.includes('normal');
    const includeTangent = options.attributes.includes('tangent');
    const attributes = geometry.attributes;
    const targetAttributes = targetGeometry.attributes;
    // strip any unused and unneeded attributes
    for(const key in targetGeometry.attributes)if (!options.attributes.includes(key) || !(key in geometry.attributes)) targetGeometry.deleteAttribute(key);
    // initialize the attributes if they don't exist
    if (!targetGeometry.index && geometry.index) targetGeometry.index = geometry.index.clone();
    if (!targetAttributes.position) targetGeometry.setAttribute('position', (0, _bufferAttributeUtilsJs.createAttributeClone)(attributes.position));
    if (includeNormal && !targetAttributes.normal && attributes.normal) targetGeometry.setAttribute('normal', (0, _bufferAttributeUtilsJs.createAttributeClone)(attributes.normal));
    if (includeTangent && !targetAttributes.tangent && attributes.tangent) targetGeometry.setAttribute('tangent', (0, _bufferAttributeUtilsJs.createAttributeClone)(attributes.tangent));
    // ensure the attributes are consistent
    (0, _bufferAttributeUtilsJs.validateAttributes)(geometry.index, targetGeometry.index);
    (0, _bufferAttributeUtilsJs.validateAttributes)(attributes.position, targetAttributes.position);
    if (includeNormal) (0, _bufferAttributeUtilsJs.validateAttributes)(attributes.normal, targetAttributes.normal);
    if (includeTangent) (0, _bufferAttributeUtilsJs.validateAttributes)(attributes.tangent, targetAttributes.tangent);
    // generate transformed vertex attribute data
    const position = attributes.position;
    const normal = includeNormal ? attributes.normal : null;
    const tangent = includeTangent ? attributes.tangent : null;
    const morphPosition = geometry.morphAttributes.position;
    const morphNormal = geometry.morphAttributes.normal;
    const morphTangent = geometry.morphAttributes.tangent;
    const morphTargetsRelative = geometry.morphTargetsRelative;
    const morphInfluences = mesh.morphTargetInfluences;
    const normalMatrix = new (0, _three.Matrix3)();
    normalMatrix.getNormalMatrix(mesh.matrixWorld);
    // copy the index
    if (geometry.index) targetGeometry.index.array.set(geometry.index.array);
    // copy and apply other attributes
    for(let i = 0, l = attributes.position.count; i < l; i++){
        _positionVector.fromBufferAttribute(position, i);
        if (normal) _normalVector.fromBufferAttribute(normal, i);
        if (tangent) {
            _tangentVector4.fromBufferAttribute(tangent, i);
            _tangentVector.fromBufferAttribute(tangent, i);
        }
        // apply morph target transform
        if (morphInfluences) {
            if (morphPosition) applyMorphTarget(morphPosition, morphInfluences, morphTargetsRelative, i, _positionVector);
            if (morphNormal) applyMorphTarget(morphNormal, morphInfluences, morphTargetsRelative, i, _normalVector);
            if (morphTangent) applyMorphTarget(morphTangent, morphInfluences, morphTargetsRelative, i, _tangentVector);
        }
        // apply bone transform
        if (mesh.isSkinnedMesh) {
            mesh.applyBoneTransform(i, _positionVector);
            if (normal) boneNormalTransform(mesh, i, _normalVector);
            if (tangent) boneNormalTransform(mesh, i, _tangentVector);
        }
        // update the vectors of the attributes
        if (applyWorldTransforms) _positionVector.applyMatrix4(mesh.matrixWorld);
        targetAttributes.position.setXYZ(i, _positionVector.x, _positionVector.y, _positionVector.z);
        if (normal) {
            if (applyWorldTransforms) _normalVector.applyNormalMatrix(normalMatrix);
            targetAttributes.normal.setXYZ(i, _normalVector.x, _normalVector.y, _normalVector.z);
        }
        if (tangent) {
            if (applyWorldTransforms) _tangentVector.transformDirection(mesh.matrixWorld);
            targetAttributes.tangent.setXYZW(i, _tangentVector.x, _tangentVector.y, _tangentVector.z, _tangentVector4.w);
        }
    }
    // copy other attributes over
    for(const i in options.attributes){
        const key = options.attributes[i];
        if (key === 'position' || key === 'tangent' || key === 'normal' || !(key in attributes)) continue;
        if (!targetAttributes[key]) targetGeometry.setAttribute(key, (0, _bufferAttributeUtilsJs.createAttributeClone)(attributes[key]));
        (0, _bufferAttributeUtilsJs.validateAttributes)(attributes[key], targetAttributes[key]);
        (0, _bufferAttributeUtilsJs.copyAttributeContents)(attributes[key], targetAttributes[key]);
    }
    if (mesh.matrixWorld.determinant() < 0) invertGeometry(targetGeometry);
    return targetGeometry;
}

},{"three":"ktPTu","./BufferAttributeUtils.js":"ic9g3","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ey0rD":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _cameraStructGlslJs = require("./camera_struct.glsl.js");
parcelHelpers.exportAll(_cameraStructGlslJs, exports);
var _equirectStructGlslJs = require("./equirect_struct.glsl.js");
parcelHelpers.exportAll(_equirectStructGlslJs, exports);
var _lightsStructGlslJs = require("./lights_struct.glsl.js");
parcelHelpers.exportAll(_lightsStructGlslJs, exports);
var _materialStructGlslJs = require("./material_struct.glsl.js");
parcelHelpers.exportAll(_materialStructGlslJs, exports);
var _surfaceRecordStructGlslJs = require("./surface_record_struct.glsl.js");
parcelHelpers.exportAll(_surfaceRecordStructGlslJs, exports);

},{"./camera_struct.glsl.js":"jlfRf","./equirect_struct.glsl.js":"8K6xN","./lights_struct.glsl.js":"4yOUW","./material_struct.glsl.js":"fUPZl","./surface_record_struct.glsl.js":"aaqBo","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jlfRf":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "camera_struct", ()=>camera_struct);
const camera_struct = /* glsl */ `

	struct PhysicalCamera {

		float focusDistance;
		float anamorphicRatio;
		float bokehSize;
		int apertureBlades;
		float apertureRotation;

	};

`;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8K6xN":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "equirect_struct", ()=>equirect_struct);
const equirect_struct = /* glsl */ `

	struct EquirectHdrInfo {

		sampler2D marginalWeights;
		sampler2D conditionalWeights;
		sampler2D map;

		float totalSum;

	};

`;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4yOUW":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "lights_struct", ()=>lights_struct);
const lights_struct = /* glsl */ `

	#define RECT_AREA_LIGHT_TYPE 0
	#define CIRC_AREA_LIGHT_TYPE 1
	#define SPOT_LIGHT_TYPE 2
	#define DIR_LIGHT_TYPE 3
	#define POINT_LIGHT_TYPE 4

	struct LightsInfo {

		sampler2D tex;
		uint count;

	};

	struct Light {

		vec3 position;
		int type;

		vec3 color;
		float intensity;

		vec3 u;
		vec3 v;
		float area;

		// spot light fields
		float radius;
		float near;
		float decay;
		float distance;
		float coneCos;
		float penumbraCos;
		int iesProfile;

	};

	Light readLightInfo( sampler2D tex, uint index ) {

		uint i = index * 6u;

		vec4 s0 = texelFetch1D( tex, i + 0u );
		vec4 s1 = texelFetch1D( tex, i + 1u );
		vec4 s2 = texelFetch1D( tex, i + 2u );
		vec4 s3 = texelFetch1D( tex, i + 3u );

		Light l;
		l.position = s0.rgb;
		l.type = int( round( s0.a ) );

		l.color = s1.rgb;
		l.intensity = s1.a;

		l.u = s2.rgb;
		l.v = s3.rgb;
		l.area = s3.a;

		if ( l.type == SPOT_LIGHT_TYPE || l.type == POINT_LIGHT_TYPE ) {

			vec4 s4 = texelFetch1D( tex, i + 4u );
			vec4 s5 = texelFetch1D( tex, i + 5u );
			l.radius = s4.r;
			l.decay = s4.g;
			l.distance = s4.b;
			l.coneCos = s4.a;

			l.penumbraCos = s5.r;
			l.iesProfile = int( round( s5.g ) );

		} else {

			l.radius = 0.0;
			l.decay = 0.0;
			l.distance = 0.0;

			l.coneCos = 0.0;
			l.penumbraCos = 0.0;
			l.iesProfile = - 1;

		}

		return l;

	}

`;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fUPZl":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "material_struct", ()=>material_struct);
const material_struct = /* glsl */ `

	struct Material {

		vec3 color;
		int map;

		float metalness;
		int metalnessMap;

		float roughness;
		int roughnessMap;

		float ior;
		float transmission;
		int transmissionMap;

		float emissiveIntensity;
		vec3 emissive;
		int emissiveMap;

		int normalMap;
		vec2 normalScale;

		float clearcoat;
		int clearcoatMap;
		int clearcoatNormalMap;
		vec2 clearcoatNormalScale;
		float clearcoatRoughness;
		int clearcoatRoughnessMap;

		int iridescenceMap;
		int iridescenceThicknessMap;
		float iridescence;
		float iridescenceIor;
		float iridescenceThicknessMinimum;
		float iridescenceThicknessMaximum;

		vec3 specularColor;
		int specularColorMap;

		float specularIntensity;
		int specularIntensityMap;
		bool thinFilm;

		vec3 attenuationColor;
		float attenuationDistance;

		int alphaMap;

		bool castShadow;
		float opacity;
		float alphaTest;

		float side;
		bool matte;

		float sheen;
		vec3 sheenColor;
		int sheenColorMap;
		float sheenRoughness;
		int sheenRoughnessMap;

		bool vertexColors;
		bool flatShading;
		bool transparent;
		bool fogVolume;

		mat3 mapTransform;
		mat3 metalnessMapTransform;
		mat3 roughnessMapTransform;
		mat3 transmissionMapTransform;
		mat3 emissiveMapTransform;
		mat3 normalMapTransform;
		mat3 clearcoatMapTransform;
		mat3 clearcoatNormalMapTransform;
		mat3 clearcoatRoughnessMapTransform;
		mat3 sheenColorMapTransform;
		mat3 sheenRoughnessMapTransform;
		mat3 iridescenceMapTransform;
		mat3 iridescenceThicknessMapTransform;
		mat3 specularColorMapTransform;
		mat3 specularIntensityMapTransform;
		mat3 alphaMapTransform;

	};

	mat3 readTextureTransform( sampler2D tex, uint index ) {

		mat3 textureTransform;

		vec4 row1 = texelFetch1D( tex, index );
		vec4 row2 = texelFetch1D( tex, index + 1u );

		textureTransform[0] = vec3(row1.r, row2.r, 0.0);
		textureTransform[1] = vec3(row1.g, row2.g, 0.0);
		textureTransform[2] = vec3(row1.b, row2.b, 1.0);

		return textureTransform;

	}

	Material readMaterialInfo( sampler2D tex, uint index ) {

		uint i = index * uint( MATERIAL_PIXELS );

		vec4 s0 = texelFetch1D( tex, i + 0u );
		vec4 s1 = texelFetch1D( tex, i + 1u );
		vec4 s2 = texelFetch1D( tex, i + 2u );
		vec4 s3 = texelFetch1D( tex, i + 3u );
		vec4 s4 = texelFetch1D( tex, i + 4u );
		vec4 s5 = texelFetch1D( tex, i + 5u );
		vec4 s6 = texelFetch1D( tex, i + 6u );
		vec4 s7 = texelFetch1D( tex, i + 7u );
		vec4 s8 = texelFetch1D( tex, i + 8u );
		vec4 s9 = texelFetch1D( tex, i + 9u );
		vec4 s10 = texelFetch1D( tex, i + 10u );
		vec4 s11 = texelFetch1D( tex, i + 11u );
		vec4 s12 = texelFetch1D( tex, i + 12u );
		vec4 s13 = texelFetch1D( tex, i + 13u );
		vec4 s14 = texelFetch1D( tex, i + 14u );

		Material m;
		m.color = s0.rgb;
		m.map = int( round( s0.a ) );

		m.metalness = s1.r;
		m.metalnessMap = int( round( s1.g ) );
		m.roughness = s1.b;
		m.roughnessMap = int( round( s1.a ) );

		m.ior = s2.r;
		m.transmission = s2.g;
		m.transmissionMap = int( round( s2.b ) );
		m.emissiveIntensity = s2.a;

		m.emissive = s3.rgb;
		m.emissiveMap = int( round( s3.a ) );

		m.normalMap = int( round( s4.r ) );
		m.normalScale = s4.gb;

		m.clearcoat = s4.a;
		m.clearcoatMap = int( round( s5.r ) );
		m.clearcoatRoughness = s5.g;
		m.clearcoatRoughnessMap = int( round( s5.b ) );
		m.clearcoatNormalMap = int( round( s5.a ) );
		m.clearcoatNormalScale = s6.rg;

		m.sheen = s6.a;
		m.sheenColor = s7.rgb;
		m.sheenColorMap = int( round( s7.a ) );
		m.sheenRoughness = s8.r;
		m.sheenRoughnessMap = int( round( s8.g ) );

		m.iridescenceMap = int( round( s8.b ) );
		m.iridescenceThicknessMap = int( round( s8.a ) );
		m.iridescence = s9.r;
		m.iridescenceIor = s9.g;
		m.iridescenceThicknessMinimum = s9.b;
		m.iridescenceThicknessMaximum = s9.a;

		m.specularColor = s10.rgb;
		m.specularColorMap = int( round( s10.a ) );

		m.specularIntensity = s11.r;
		m.specularIntensityMap = int( round( s11.g ) );
		m.thinFilm = bool( s11.b );

		m.attenuationColor = s12.rgb;
		m.attenuationDistance = s12.a;

		m.alphaMap = int( round( s13.r ) );

		m.opacity = s13.g;
		m.alphaTest = s13.b;
		m.side = s13.a;

		m.matte = bool( s14.r );
		m.castShadow = bool( s14.g );
		m.vertexColors = bool( int( s14.b ) & 1 );
		m.flatShading = bool( int( s14.b ) & 2 );
		m.fogVolume = bool( int( s14.b ) & 4 );
		m.transparent = bool( s14.a );

		uint firstTextureTransformIdx = i + 15u;

		// mat3( 1.0 ) is an identity matrix
		m.mapTransform = m.map == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx );
		m.metalnessMapTransform = m.metalnessMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 2u );
		m.roughnessMapTransform = m.roughnessMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 4u );
		m.transmissionMapTransform = m.transmissionMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 6u );
		m.emissiveMapTransform = m.emissiveMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 8u );
		m.normalMapTransform = m.normalMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 10u );
		m.clearcoatMapTransform = m.clearcoatMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 12u );
		m.clearcoatNormalMapTransform = m.clearcoatNormalMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 14u );
		m.clearcoatRoughnessMapTransform = m.clearcoatRoughnessMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 16u );
		m.sheenColorMapTransform = m.sheenColorMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 18u );
		m.sheenRoughnessMapTransform = m.sheenRoughnessMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 20u );
		m.iridescenceMapTransform = m.iridescenceMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 22u );
		m.iridescenceThicknessMapTransform = m.iridescenceThicknessMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 24u );
		m.specularColorMapTransform = m.specularColorMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 26u );
		m.specularIntensityMapTransform = m.specularIntensityMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 28u );
		m.alphaMapTransform = m.alphaMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 30u );

		return m;

	}

`;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aaqBo":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "surface_record_struct", ()=>surface_record_struct);
const surface_record_struct = /* glsl */ `

	struct SurfaceRecord {

		// surface type
		bool volumeParticle;

		// geometry
		vec3 faceNormal;
		bool frontFace;
		vec3 normal;
		mat3 normalBasis;
		mat3 normalInvBasis;

		// cached properties
		float eta;
		float f0;

		// material
		float roughness;
		float filteredRoughness;
		float metalness;
		vec3 color;
		vec3 emission;

		// transmission
		float ior;
		float transmission;
		bool thinFilm;
		vec3 attenuationColor;
		float attenuationDistance;

		// clearcoat
		vec3 clearcoatNormal;
		mat3 clearcoatBasis;
		mat3 clearcoatInvBasis;
		float clearcoat;
		float clearcoatRoughness;
		float filteredClearcoatRoughness;

		// sheen
		float sheen;
		vec3 sheenColor;
		float sheenRoughness;

		// iridescence
		float iridescence;
		float iridescenceIor;
		float iridescenceThickness;

		// specular
		vec3 specularColor;
		float specularIntensity;
	};

	struct ScatterRecord {
		float specularPdf;
		float pdf;
		vec3 direction;
		vec3 color;
	};

`;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"k0HOQ":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _equirectSamplingFunctionsGlslJs = require("./equirect_sampling_functions.glsl.js");
parcelHelpers.exportAll(_equirectSamplingFunctionsGlslJs, exports);
var _lightSamplingFunctionsGlslJs = require("./light_sampling_functions.glsl.js");
parcelHelpers.exportAll(_lightSamplingFunctionsGlslJs, exports);
var _shapeSamplingFunctionsGlslJs = require("./shape_sampling_functions.glsl.js");
parcelHelpers.exportAll(_shapeSamplingFunctionsGlslJs, exports);

},{"./equirect_sampling_functions.glsl.js":"5rwrt","./light_sampling_functions.glsl.js":"8Y7OM","./shape_sampling_functions.glsl.js":"2LoQA","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5rwrt":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "equirect_functions", ()=>equirect_functions);
const equirect_functions = /* glsl */ `

	// samples the the given environment map in the given direction
	vec3 sampleEquirectColor( sampler2D envMap, vec3 direction ) {

		return texture2D( envMap, equirectDirectionToUv( direction ) ).rgb;

	}

	// gets the pdf of the given direction to sample
	float equirectDirectionPdf( vec3 direction ) {

		vec2 uv = equirectDirectionToUv( direction );
		float theta = uv.y * PI;
		float sinTheta = sin( theta );
		if ( sinTheta == 0.0 ) {

			return 0.0;

		}

		return 1.0 / ( 2.0 * PI * PI * sinTheta );

	}

	// samples the color given env map with CDF and returns the pdf of the direction
	float sampleEquirect( vec3 direction, inout vec3 color ) {

		float totalSum = envMapInfo.totalSum;
		if ( totalSum == 0.0 ) {

			color = vec3( 0.0 );
			return 1.0;

		}

		vec2 uv = equirectDirectionToUv( direction );
		color = texture2D( envMapInfo.map, uv ).rgb;

		float lum = luminance( color );
		ivec2 resolution = textureSize( envMapInfo.map, 0 );
		float pdf = lum / totalSum;

		return float( resolution.x * resolution.y ) * pdf * equirectDirectionPdf( direction );

	}

	// samples a direction of the envmap with color and retrieves pdf
	float sampleEquirectProbability( vec2 r, inout vec3 color, inout vec3 direction ) {

		// sample env map cdf
		float v = texture2D( envMapInfo.marginalWeights, vec2( r.x, 0.0 ) ).x;
		float u = texture2D( envMapInfo.conditionalWeights, vec2( r.y, v ) ).x;
		vec2 uv = vec2( u, v );

		vec3 derivedDirection = equirectUvToDirection( uv );
		direction = derivedDirection;
		color = texture2D( envMapInfo.map, uv ).rgb;

		float totalSum = envMapInfo.totalSum;
		float lum = luminance( color );
		ivec2 resolution = textureSize( envMapInfo.map, 0 );
		float pdf = lum / totalSum;

		return float( resolution.x * resolution.y ) * pdf * equirectDirectionPdf( direction );

	}
`;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8Y7OM":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "light_sampling_functions", ()=>light_sampling_functions);
const light_sampling_functions = /* glsl */ `

	float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {

		return smoothstep( coneCosine, penumbraCosine, angleCosine );

	}

	float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {

		// based upon Frostbite 3 Moving to Physically-based Rendering
		// page 32, equation 26: E[window1]
		// https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), EPSILON );

		if ( cutoffDistance > 0.0 ) {

			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );

		}

		return distanceFalloff;

	}

	float getPhotometricAttenuation( sampler2DArray iesProfiles, int iesProfile, vec3 posToLight, vec3 lightDir, vec3 u, vec3 v ) {

		float cosTheta = dot( posToLight, lightDir );
		float angle = acos( cosTheta ) / PI;

		return texture2D( iesProfiles, vec3( angle, 0.0, iesProfile ) ).r;

	}

	struct LightRecord {

		float dist;
		vec3 direction;
		float pdf;
		vec3 emission;
		int type;

	};

	bool intersectLightAtIndex( sampler2D lights, vec3 rayOrigin, vec3 rayDirection, uint l, inout LightRecord lightRec ) {

		bool didHit = false;
		Light light = readLightInfo( lights, l );

		vec3 u = light.u;
		vec3 v = light.v;

		// check for backface
		vec3 normal = normalize( cross( u, v ) );
		if ( dot( normal, rayDirection ) > 0.0 ) {

			u *= 1.0 / dot( u, u );
			v *= 1.0 / dot( v, v );

			float dist;

			// MIS / light intersection is not supported for punctual lights.
			if(
				( light.type == RECT_AREA_LIGHT_TYPE && intersectsRectangle( light.position, normal, u, v, rayOrigin, rayDirection, dist ) ) ||
				( light.type == CIRC_AREA_LIGHT_TYPE && intersectsCircle( light.position, normal, u, v, rayOrigin, rayDirection, dist ) )
			) {

				float cosTheta = dot( rayDirection, normal );
				didHit = true;
				lightRec.dist = dist;
				lightRec.pdf = ( dist * dist ) / ( light.area * cosTheta );
				lightRec.emission = light.color * light.intensity;
				lightRec.direction = rayDirection;
				lightRec.type = light.type;

			}

		}

		return didHit;

	}

	LightRecord randomAreaLightSample( Light light, vec3 rayOrigin, vec2 ruv ) {

		vec3 randomPos;
		if( light.type == RECT_AREA_LIGHT_TYPE ) {

			// rectangular area light
			randomPos = light.position + light.u * ( ruv.x - 0.5 ) + light.v * ( ruv.y - 0.5 );

		} else if( light.type == CIRC_AREA_LIGHT_TYPE ) {

			// circular area light
			float r = 0.5 * sqrt( ruv.x );
			float theta = ruv.y * 2.0 * PI;
			float x = r * cos( theta );
			float y = r * sin( theta );

			randomPos = light.position + light.u * x + light.v * y;

		}

		vec3 toLight = randomPos - rayOrigin;
		float lightDistSq = dot( toLight, toLight );
		float dist = sqrt( lightDistSq );
		vec3 direction = toLight / dist;
		vec3 lightNormal = normalize( cross( light.u, light.v ) );

		LightRecord lightRec;
		lightRec.type = light.type;
		lightRec.emission = light.color * light.intensity;
		lightRec.dist = dist;
		lightRec.direction = direction;

		// TODO: the denominator is potentially zero
		lightRec.pdf = lightDistSq / ( light.area * dot( direction, lightNormal ) );

		return lightRec;

	}

	LightRecord randomSpotLightSample( Light light, sampler2DArray iesProfiles, vec3 rayOrigin, vec2 ruv ) {

		float radius = light.radius * sqrt( ruv.x );
		float theta = ruv.y * 2.0 * PI;
		float x = radius * cos( theta );
		float y = radius * sin( theta );

		vec3 u = light.u;
		vec3 v = light.v;
		vec3 normal = normalize( cross( u, v ) );

		float angle = acos( light.coneCos );
		float angleTan = tan( angle );
		float startDistance = light.radius / max( angleTan, EPSILON );

		vec3 randomPos = light.position - normal * startDistance + u * x + v * y;
		vec3 toLight = randomPos - rayOrigin;
		float lightDistSq = dot( toLight, toLight );
		float dist = sqrt( lightDistSq );

		vec3 direction = toLight / max( dist, EPSILON );
		float cosTheta = dot( direction, normal );

		float spotAttenuation = light.iesProfile != - 1 ?
			getPhotometricAttenuation( iesProfiles, light.iesProfile, direction, normal, u, v ) :
			getSpotAttenuation( light.coneCos, light.penumbraCos, cosTheta );

		float distanceAttenuation = getDistanceAttenuation( dist, light.distance, light.decay );
		LightRecord lightRec;
		lightRec.type = light.type;
		lightRec.dist = dist;
		lightRec.direction = direction;
		lightRec.emission = light.color * light.intensity * distanceAttenuation * spotAttenuation;
		lightRec.pdf = 1.0;

		return lightRec;

	}

	LightRecord randomLightSample( sampler2D lights, sampler2DArray iesProfiles, uint lightCount, vec3 rayOrigin, vec3 ruv ) {

		LightRecord result;

		// pick a random light
		uint l = uint( ruv.x * float( lightCount ) );
		Light light = readLightInfo( lights, l );

		if ( light.type == SPOT_LIGHT_TYPE ) {

			result = randomSpotLightSample( light, iesProfiles, rayOrigin, ruv.yz );

		} else if ( light.type == POINT_LIGHT_TYPE ) {

			vec3 lightRay = light.u - rayOrigin;
			float lightDist = length( lightRay );
			float cutoffDistance = light.distance;
			float distanceFalloff = 1.0 / max( pow( lightDist, light.decay ), 0.01 );
			if ( cutoffDistance > 0.0 ) {

				distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDist / cutoffDistance ) ) );

			}

			LightRecord rec;
			rec.direction = normalize( lightRay );
			rec.dist = length( lightRay );
			rec.pdf = 1.0;
			rec.emission = light.color * light.intensity * distanceFalloff;
			rec.type = light.type;
			result = rec;

		} else if ( light.type == DIR_LIGHT_TYPE ) {

			LightRecord rec;
			rec.dist = 1e10;
			rec.direction = light.u;
			rec.pdf = 1.0;
			rec.emission = light.color * light.intensity;
			rec.type = light.type;

			result = rec;

		} else {

			// sample the light
			result = randomAreaLightSample( light, rayOrigin, ruv.yz );

		}

		return result;

	}

`;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2LoQA":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "shape_sampling_functions", ()=>shape_sampling_functions);
const shape_sampling_functions = /* glsl */ `

	vec3 sampleHemisphere( vec3 n, vec2 uv ) {

		// https://www.rorydriscoll.com/2009/01/07/better-sampling/
		// https://graphics.pixar.com/library/OrthonormalB/paper.pdf
		float sign = n.z == 0.0 ? 1.0 : sign( n.z );
		float a = - 1.0 / ( sign + n.z );
		float b = n.x * n.y * a;
		vec3 b1 = vec3( 1.0 + sign * n.x * n.x * a, sign * b, - sign * n.x );
		vec3 b2 = vec3( b, sign + n.y * n.y * a, - n.y );

		float r = sqrt( uv.x );
		float theta = 2.0 * PI * uv.y;
		float x = r * cos( theta );
		float y = r * sin( theta );
		return x * b1 + y * b2 + sqrt( 1.0 - uv.x ) * n;

	}

	vec2 sampleTriangle( vec2 a, vec2 b, vec2 c, vec2 r ) {

		// get the edges of the triangle and the diagonal across the
		// center of the parallelogram
		vec2 e1 = a - b;
		vec2 e2 = c - b;
		vec2 diag = normalize( e1 + e2 );

		// pick the point in the parallelogram
		if ( r.x + r.y > 1.0 ) {

			r = vec2( 1.0 ) - r;

		}

		return e1 * r.x + e2 * r.y;

	}

	vec2 sampleCircle( vec2 uv ) {

		float angle = 2.0 * PI * uv.x;
		float radius = sqrt( uv.y );
		return vec2( cos( angle ), sin( angle ) ) * radius;

	}

	vec3 sampleSphere( vec2 uv ) {

		float u = ( uv.x - 0.5 ) * 2.0;
		float t = uv.y * PI * 2.0;
		float f = sqrt( 1.0 - u * u );

		return vec3( f * cos( t ), f * sin( t ), u );

	}

	vec2 sampleRegularPolygon( int sides, vec3 uvw ) {

		sides = max( sides, 3 );

		vec3 r = uvw;
		float anglePerSegment = 2.0 * PI / float( sides );
		float segment = floor( float( sides ) * r.x );

		float angle1 = anglePerSegment * segment;
		float angle2 = angle1 + anglePerSegment;
		vec2 a = vec2( sin( angle1 ), cos( angle1 ) );
		vec2 b = vec2( 0.0, 0.0 );
		vec2 c = vec2( sin( angle2 ), cos( angle2 ) );

		return sampleTriangle( a, b, c, r.yz );

	}

	// samples an aperture shape with the given number of sides. 0 means circle
	vec2 sampleAperture( int blades, vec3 uvw ) {

		return blades == 0 ?
			sampleCircle( uvw.xy ) :
			sampleRegularPolygon( blades, uvw );

	}


`;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"Lo4Te":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _pcgGlslJs = require("./pcg.glsl.js");
parcelHelpers.exportAll(_pcgGlslJs, exports);
var _sobolGlslJs = require("./sobol.glsl.js");
parcelHelpers.exportAll(_sobolGlslJs, exports);
var _stratifiedGlslJs = require("./stratified.glsl.js");
parcelHelpers.exportAll(_stratifiedGlslJs, exports);

},{"./pcg.glsl.js":"2fon7","./sobol.glsl.js":"517Qi","./stratified.glsl.js":"8wbyW","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2fon7":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "pcg_functions", ()=>pcg_functions);
const pcg_functions = /* glsl */ `

	// https://www.shadertoy.com/view/wltcRS
	uvec4 WHITE_NOISE_SEED;

	void rng_initialize( vec2 p, int frame ) {

		// white noise seed
		WHITE_NOISE_SEED = uvec4( p, uint( frame ), uint( p.x ) + uint( p.y ) );

	}

	// https://www.pcg-random.org/
	void pcg4d( inout uvec4 v ) {

		v = v * 1664525u + 1013904223u;
		v.x += v.y * v.w;
		v.y += v.z * v.x;
		v.z += v.x * v.y;
		v.w += v.y * v.z;
		v = v ^ ( v >> 16u );
		v.x += v.y*v.w;
		v.y += v.z*v.x;
		v.z += v.x*v.y;
		v.w += v.y*v.z;

	}

	// returns [ 0, 1 ]
	float pcgRand() {

		pcg4d( WHITE_NOISE_SEED );
		return float( WHITE_NOISE_SEED.x ) / float( 0xffffffffu );

	}

	vec2 pcgRand2() {

		pcg4d( WHITE_NOISE_SEED );
		return vec2( WHITE_NOISE_SEED.xy ) / float(0xffffffffu);

	}

	vec3 pcgRand3() {

		pcg4d( WHITE_NOISE_SEED );
		return vec3( WHITE_NOISE_SEED.xyz ) / float( 0xffffffffu );

	}

	vec4 pcgRand4() {

		pcg4d( WHITE_NOISE_SEED );
		return vec4( WHITE_NOISE_SEED ) / float( 0xffffffffu );

	}
`;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"517Qi":[function(require,module,exports,__globalThis) {
// References
// - https://jcgt.org/published/0009/04/01/
// - Code from https://www.shadertoy.com/view/WtGyDm
// functions to generate multi-dimensions variables of the same functions
// to support 1, 2, 3, and 4 dimensional sobol sampling.
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "sobol_common", ()=>sobol_common);
parcelHelpers.export(exports, "sobol_point_generation", ()=>sobol_point_generation);
parcelHelpers.export(exports, "sobol_functions", ()=>sobol_functions);
function generateSobolFunctionVariants(dim = 1) {
    let type = 'uint';
    if (dim > 1) type = 'uvec' + dim;
    return /* glsl */ `
		${type} sobolReverseBits( ${type} x ) {

			x = ( ( ( x & 0xaaaaaaaau ) >> 1 ) | ( ( x & 0x55555555u ) << 1 ) );
			x = ( ( ( x & 0xccccccccu ) >> 2 ) | ( ( x & 0x33333333u ) << 2 ) );
			x = ( ( ( x & 0xf0f0f0f0u ) >> 4 ) | ( ( x & 0x0f0f0f0fu ) << 4 ) );
			x = ( ( ( x & 0xff00ff00u ) >> 8 ) | ( ( x & 0x00ff00ffu ) << 8 ) );
			return ( ( x >> 16 ) | ( x << 16 ) );

		}

		${type} sobolHashCombine( uint seed, ${type} v ) {

			return seed ^ ( v + ${type}( ( seed << 6 ) + ( seed >> 2 ) ) );

		}

		${type} sobolLaineKarrasPermutation( ${type} x, ${type} seed ) {

			x += seed;
			x ^= x * 0x6c50b47cu;
			x ^= x * 0xb82f1e52u;
			x ^= x * 0xc7afe638u;
			x ^= x * 0x8d22f6e6u;
			return x;

		}

		${type} nestedUniformScrambleBase2( ${type} x, ${type} seed ) {

			x = sobolLaineKarrasPermutation( x, seed );
			x = sobolReverseBits( x );
			return x;

		}
	`;
}
function generateSobolSampleFunctions(dim = 1) {
    let utype = 'uint';
    let vtype = 'float';
    let num = '';
    let components = '.r';
    let combineValues = '1u';
    if (dim > 1) {
        utype = 'uvec' + dim;
        vtype = 'vec' + dim;
        num = dim + '';
        if (dim === 2) {
            components = '.rg';
            combineValues = 'uvec2( 1u, 2u )';
        } else if (dim === 3) {
            components = '.rgb';
            combineValues = 'uvec3( 1u, 2u, 3u )';
        } else {
            components = '';
            combineValues = 'uvec4( 1u, 2u, 3u, 4u )';
        }
    }
    return /* glsl */ `

		${vtype} sobol${num}( int effect ) {

			uint seed = sobolGetSeed( sobolBounceIndex, uint( effect ) );
			uint index = sobolPathIndex;

			uint shuffle_seed = sobolHashCombine( seed, 0u );
			uint shuffled_index = nestedUniformScrambleBase2( sobolReverseBits( index ), shuffle_seed );
			${vtype} sobol_pt = sobolGetTexturePoint( shuffled_index )${components};
			${utype} result = ${utype}( sobol_pt * 16777216.0 );

			${utype} seed2 = sobolHashCombine( seed, ${combineValues} );
			result = nestedUniformScrambleBase2( result, seed2 );

			return SOBOL_FACTOR * ${vtype}( result >> 8 );

		}
	`;
}
const sobol_common = /* glsl */ `

	// Utils
	const float SOBOL_FACTOR = 1.0 / 16777216.0;
	const uint SOBOL_MAX_POINTS = 256u * 256u;

	${generateSobolFunctionVariants(1)}
	${generateSobolFunctionVariants(2)}
	${generateSobolFunctionVariants(3)}
	${generateSobolFunctionVariants(4)}

	uint sobolHash( uint x ) {

		// finalizer from murmurhash3
		x ^= x >> 16;
		x *= 0x85ebca6bu;
		x ^= x >> 13;
		x *= 0xc2b2ae35u;
		x ^= x >> 16;
		return x;

	}

`;
const sobol_point_generation = /* glsl */ `

	const uint SOBOL_DIRECTIONS_1[ 32 ] = uint[ 32 ](
		0x80000000u, 0xc0000000u, 0xa0000000u, 0xf0000000u,
		0x88000000u, 0xcc000000u, 0xaa000000u, 0xff000000u,
		0x80800000u, 0xc0c00000u, 0xa0a00000u, 0xf0f00000u,
		0x88880000u, 0xcccc0000u, 0xaaaa0000u, 0xffff0000u,
		0x80008000u, 0xc000c000u, 0xa000a000u, 0xf000f000u,
		0x88008800u, 0xcc00cc00u, 0xaa00aa00u, 0xff00ff00u,
		0x80808080u, 0xc0c0c0c0u, 0xa0a0a0a0u, 0xf0f0f0f0u,
		0x88888888u, 0xccccccccu, 0xaaaaaaaau, 0xffffffffu
	);

	const uint SOBOL_DIRECTIONS_2[ 32 ] = uint[ 32 ](
		0x80000000u, 0xc0000000u, 0x60000000u, 0x90000000u,
		0xe8000000u, 0x5c000000u, 0x8e000000u, 0xc5000000u,
		0x68800000u, 0x9cc00000u, 0xee600000u, 0x55900000u,
		0x80680000u, 0xc09c0000u, 0x60ee0000u, 0x90550000u,
		0xe8808000u, 0x5cc0c000u, 0x8e606000u, 0xc5909000u,
		0x6868e800u, 0x9c9c5c00u, 0xeeee8e00u, 0x5555c500u,
		0x8000e880u, 0xc0005cc0u, 0x60008e60u, 0x9000c590u,
		0xe8006868u, 0x5c009c9cu, 0x8e00eeeeu, 0xc5005555u
	);

	const uint SOBOL_DIRECTIONS_3[ 32 ] = uint[ 32 ](
		0x80000000u, 0xc0000000u, 0x20000000u, 0x50000000u,
		0xf8000000u, 0x74000000u, 0xa2000000u, 0x93000000u,
		0xd8800000u, 0x25400000u, 0x59e00000u, 0xe6d00000u,
		0x78080000u, 0xb40c0000u, 0x82020000u, 0xc3050000u,
		0x208f8000u, 0x51474000u, 0xfbea2000u, 0x75d93000u,
		0xa0858800u, 0x914e5400u, 0xdbe79e00u, 0x25db6d00u,
		0x58800080u, 0xe54000c0u, 0x79e00020u, 0xb6d00050u,
		0x800800f8u, 0xc00c0074u, 0x200200a2u, 0x50050093u
	);

	const uint SOBOL_DIRECTIONS_4[ 32 ] = uint[ 32 ](
		0x80000000u, 0x40000000u, 0x20000000u, 0xb0000000u,
		0xf8000000u, 0xdc000000u, 0x7a000000u, 0x9d000000u,
		0x5a800000u, 0x2fc00000u, 0xa1600000u, 0xf0b00000u,
		0xda880000u, 0x6fc40000u, 0x81620000u, 0x40bb0000u,
		0x22878000u, 0xb3c9c000u, 0xfb65a000u, 0xddb2d000u,
		0x78022800u, 0x9c0b3c00u, 0x5a0fb600u, 0x2d0ddb00u,
		0xa2878080u, 0xf3c9c040u, 0xdb65a020u, 0x6db2d0b0u,
		0x800228f8u, 0x400b3cdcu, 0x200fb67au, 0xb00ddb9du
	);

	uint getMaskedSobol( uint index, uint directions[ 32 ] ) {

		uint X = 0u;
		for ( int bit = 0; bit < 32; bit ++ ) {

			uint mask = ( index >> bit ) & 1u;
			X ^= mask * directions[ bit ];

		}
		return X;

	}

	vec4 generateSobolPoint( uint index ) {

		if ( index >= SOBOL_MAX_POINTS ) {

			return vec4( 0.0 );

		}

		// NOTE: this sobol "direction" is also available but we can't write out 5 components
		// uint x = index & 0x00ffffffu;
		uint x = sobolReverseBits( getMaskedSobol( index, SOBOL_DIRECTIONS_1 ) ) & 0x00ffffffu;
		uint y = sobolReverseBits( getMaskedSobol( index, SOBOL_DIRECTIONS_2 ) ) & 0x00ffffffu;
		uint z = sobolReverseBits( getMaskedSobol( index, SOBOL_DIRECTIONS_3 ) ) & 0x00ffffffu;
		uint w = sobolReverseBits( getMaskedSobol( index, SOBOL_DIRECTIONS_4 ) ) & 0x00ffffffu;

		return vec4( x, y, z, w ) * SOBOL_FACTOR;

	}

`;
const sobol_functions = /* glsl */ `

	// Seeds
	uniform sampler2D sobolTexture;
	uint sobolPixelIndex = 0u;
	uint sobolPathIndex = 0u;
	uint sobolBounceIndex = 0u;

	uint sobolGetSeed( uint bounce, uint effect ) {

		return sobolHash(
			sobolHashCombine(
				sobolHashCombine(
					sobolHash( bounce ),
					sobolPixelIndex
				),
				effect
			)
		);

	}

	vec4 sobolGetTexturePoint( uint index ) {

		if ( index >= SOBOL_MAX_POINTS ) {

			index = index % SOBOL_MAX_POINTS;

		}

		uvec2 dim = uvec2( textureSize( sobolTexture, 0 ).xy );
		uint y = index / dim.x;
		uint x = index - y * dim.x;
		vec2 uv = vec2( x, y ) / vec2( dim );
		return texture( sobolTexture, uv );

	}

	${generateSobolSampleFunctions(1)}
	${generateSobolSampleFunctions(2)}
	${generateSobolSampleFunctions(3)}
	${generateSobolSampleFunctions(4)}

`;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8wbyW":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "stratified_functions", ()=>stratified_functions);
const stratified_functions = /* glsl */ `

	uniform sampler2D stratifiedTexture;
	uniform sampler2D stratifiedOffsetTexture;

	uint sobolPixelIndex = 0u;
	uint sobolPathIndex = 0u;
	uint sobolBounceIndex = 0u;
	vec4 pixelSeed = vec4( 0 );

	vec4 rand4( int v ) {

		ivec2 uv = ivec2( v, sobolBounceIndex );
		vec4 stratifiedSample = texelFetch( stratifiedTexture, uv, 0 );
		return fract( stratifiedSample + pixelSeed.r ); // blue noise + stratified samples

	}

	vec3 rand3( int v ) {

		return rand4( v ).xyz;

	}

	vec2 rand2( int v ) {

		return rand4( v ).xy;

	}

	float rand( int v ) {

		return rand4( v ).x;

	}

	void rng_initialize( vec2 screenCoord, int frame ) {

		// tile the small noise texture across the entire screen
		ivec2 noiseSize = ivec2( textureSize( stratifiedOffsetTexture, 0 ) );
		ivec2 pixel = ivec2( screenCoord.xy ) % noiseSize;
		vec2 pixelWidth = 1.0 / vec2( noiseSize );
		vec2 uv = vec2( pixel ) * pixelWidth + pixelWidth * 0.5;

		// note that using "texelFetch" here seems to break Android for some reason
		pixelSeed = texture( stratifiedOffsetTexture, uv );

	}

`;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},[], null, "parcelRequire94c2")

//# sourceMappingURL=aoRender.c33e7249.js.map

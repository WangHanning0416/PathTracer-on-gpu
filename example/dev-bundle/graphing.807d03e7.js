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
})({"8SDhd":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _three = require("three");
var _lilGuiModuleMinJs = require("three/examples/jsm/libs/lil-gui.module.min.js");
var _lilGuiModuleMinJsDefault = parcelHelpers.interopDefault(_lilGuiModuleMinJs);
var _graphMaterialJs = require("../src/materials/debug/GraphMaterial.js");
var _indexJs = require("../src/shader/bsdf/index.js");
var _indexJs1 = require("../src/shader/common/index.js");
const graphFunctionSnippet = /* glsl */ `
	#include <common>
	${_indexJs1.math_functions}
	${_indexJs1.util_functions}
	${_indexJs.ggx_functions}

	vec4 graphFunction( float x ) {

		vec3 wi = normalize( vec3( 1.0, 1.0, 1.0 ) );
		vec3 halfVec = vec3( 0.0, 0.0, 1.0 );
		float theta = dot( wi, halfVec );

		return vec4(
			ggxPDF( wi, halfVec, x ),
			ggxDistribution( halfVec, x ),
			ggxShadowMaskG1( theta, x ),
			ggxLamda( theta, x )
		);

	}
`;
let camera, scene, renderer, plane;
let cameraCenter;
let zoom = 10;
let dataEl, dataContainerEl;
const params = {
    aspect: 1,
    displayX: true,
    displayY: true,
    displayZ: true,
    displayW: true,
    reset () {
        zoom = 10;
        cameraCenter.set(-zoom * 0.5 + zoom * 0.05, getAspect() * zoom * 0.5 - zoom * 0.05);
    }
};
init();
// init
async function init() {
    dataContainerEl = document.getElementById('dataContainer');
    dataEl = document.getElementById('data');
    // renderer init
    renderer = new _three.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x11161C);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setAnimationLoop(animation);
    document.body.appendChild(renderer.domElement);
    // init camera
    camera = new _three.OrthographicCamera();
    camera.position.set(0, 0, 1.5);
    scene = new _three.Scene();
    cameraCenter = new _three.Vector2();
    // image plane
    plane = new _three.Mesh(new _three.PlaneGeometry(), new (0, _graphMaterialJs.GraphMaterial)({
        side: _three.DoubleSide,
        thickness: 1,
        graphFunctionSnippet
    }));
    plane.scale.setScalar(2.0);
    scene.add(plane);
    cameraCenter.set(-zoom * 0.5 + zoom * 0.05, getAspect() * zoom * 0.5 - zoom * 0.05);
    const gui = new (0, _lilGuiModuleMinJsDefault.default)();
    gui.add(plane.material, 'dim');
    gui.add(plane.material, 'thickness', 0.5, 10.0);
    gui.add(params, 'aspect', 0.1, 2);
    gui.add(params, 'reset');
    const graphFolder = gui.addFolder('graphs');
    graphFolder.add(params, 'displayX').name('display graph 1');
    graphFolder.add(params, 'displayY').name('display graph 2');
    graphFolder.add(params, 'displayZ').name('display graph 3');
    graphFolder.add(params, 'displayW').name('display graph 4');
    let clicked = false;
    let prevX = -1;
    let prevY = -1;
    renderer.domElement.addEventListener('pointerleave', ()=>{
        dataContainerEl.style.visibility = 'hidden';
    });
    renderer.domElement.addEventListener('pointerenter', ()=>{
        dataContainerEl.style.visibility = 'visible';
    });
    renderer.domElement.addEventListener('pointerdown', (e)=>{
        clicked = true;
        prevX = e.clientX;
        prevY = e.clientY;
    });
    renderer.domElement.addEventListener('pointermove', (e)=>{
        clicked = clicked && Boolean(e.buttons & 1);
        if (clicked) {
            const deltaX = e.clientX - prevX;
            const deltaY = e.clientY - prevY;
            prevX = e.clientX;
            prevY = e.clientY;
            const xWidth = 1;
            const yWidth = getAspect();
            const graphDeltaX = zoom * xWidth * deltaX / window.innerWidth;
            const graphDeltaY = zoom * yWidth * deltaY / window.innerHeight;
            cameraCenter.x += graphDeltaX;
            cameraCenter.y += graphDeltaY;
        }
        dataContainerEl.style.left = `${e.clientX}px`;
        dataContainerEl.style.top = `${e.clientY}px`;
        const data = mouseToGraphValue(e.clientX, e.clientY);
        dataEl.innerText = `x: ${data.x.toFixed(3)}\ny: ${data.y.toFixed(3)}`;
    });
    renderer.domElement.addEventListener('wheel', (e)=>{
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const xWidth = 1;
        const yWidth = getAspect();
        const centerRelX = mouseX / window.innerWidth - 0.5;
        const centerRelY = mouseY / window.innerHeight - 0.5;
        const graphX = zoom * xWidth * centerRelX;
        const graphY = zoom * yWidth * centerRelY;
        const beforeZoom = zoom;
        const delta = Math.pow(0.95, 1.0);
        if (e.deltaY < 0) zoom *= delta;
        else zoom /= delta;
        zoom = Math.max(zoom, 0.1);
        zoom = Math.min(zoom, 100);
        const afterX = graphX * zoom / beforeZoom;
        const afterY = graphY * zoom / beforeZoom;
        cameraCenter.x -= graphX - afterX;
        cameraCenter.y -= graphY - afterY;
    });
    window.addEventListener('resize', ()=>{
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
// animation
function animation() {
    const mat = plane.material;
    const xWidth = 1;
    const yWidth = getAspect();
    mat.xRange.set(-cameraCenter.x - 0.5 * xWidth * zoom, -cameraCenter.x + 0.5 * xWidth * zoom);
    mat.yRange.set(cameraCenter.y - 0.5 * yWidth * zoom, cameraCenter.y + 0.5 * yWidth * zoom);
    mat.graphDisplay.set(Number(params.displayX), Number(params.displayY), Number(params.displayZ), Number(params.displayW));
    renderer.render(scene, camera);
}
function getAspect() {
    return params.aspect * window.innerHeight / window.innerWidth;
}
function mouseToGraphValue(x, y) {
    const xWidth = 1;
    const yWidth = getAspect();
    const centerRelX = x / window.innerWidth - 0.5;
    const centerRelY = y / window.innerHeight - 0.5;
    const graphX = zoom * xWidth * centerRelX - cameraCenter.x;
    const graphY = zoom * yWidth * centerRelY - cameraCenter.y;
    return {
        x: graphX,
        y: -graphY
    };
}

},{"three":"ktPTu","three/examples/jsm/libs/lil-gui.module.min.js":"dUXFx","../src/materials/debug/GraphMaterial.js":"kiEcx","../src/shader/bsdf/index.js":"7EauB","../src/shader/common/index.js":"i5W2a","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kiEcx":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "GraphMaterial", ()=>GraphMaterial);
var _three = require("three");
var _materialBaseJs = require("../MaterialBase.js");
class GraphMaterial extends (0, _materialBaseJs.MaterialBase) {
    get graphFunctionSnippet() {
        return this._graphFunctionSnippet;
    }
    set graphFunctionSnippet(v) {
        this._graphFunctionSnippet = v;
    }
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
                dim: {
                    value: true
                },
                thickness: {
                    value: 1
                },
                graphCount: {
                    value: 4
                },
                graphDisplay: {
                    value: new (0, _three.Vector4)(1.0, 1.0, 1.0, 1.0)
                },
                overlay: {
                    value: true
                },
                xRange: {
                    value: new (0, _three.Vector2)(-2, 2.0)
                },
                yRange: {
                    value: new (0, _three.Vector2)(-2, 2.0)
                },
                colors: {
                    value: [
                        new (0, _three.Color)(0xe91e63).convertSRGBToLinear(),
                        new (0, _three.Color)(0x4caf50).convertSRGBToLinear(),
                        new (0, _three.Color)(0x03a9f4).convertSRGBToLinear(),
                        new (0, _three.Color)(0xffc107).convertSRGBToLinear()
                    ]
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
				varying vec2 vUv;
				uniform bool overlay;
				uniform bool dim;
				uniform bvec4 graphDisplay;
				uniform float graphCount;
				uniform float thickness;
				uniform vec2 xRange;
				uniform vec2 yRange;
				uniform vec3 colors[ 4 ];

				__FUNCTION_CONTENT__

				float map( float _min, float _max, float v ) {

					float len = _max - _min;
					return _min + len * v;

				}

				vec3 getBackground( vec2 point, float steepness ) {

					vec2 pw = fwidth( point );
					vec2 halfWidth = pw * 0.5;

					// x, y axes
					vec2 distToZero = smoothstep(
						- halfWidth * 0.5,
						halfWidth * 0.5,
						abs( point.xy ) - pw
					);

					// 1 unit markers
					vec2 temp;
					vec2 modAxis = abs( modf( point + vec2( 0.5 ), temp ) ) - 0.5;
					vec2 distToAxis = smoothstep(
						- halfWidth,
						halfWidth,
						abs( modAxis.xy ) - pw * 0.5
					);

					// if we're at a chart boundary then remove the artifacts
					if ( abs( pw.y ) > steepness * 0.5 ) {

						distToZero.y = 1.0;
						distToAxis.y = 1.0;

					}

					// mix colors into a background color
					float axisIntensity = 1.0 - min( distToZero.x, distToZero.y );
					float markerIntensity = 1.0 - min( distToAxis.x, distToAxis.y );

					vec3 markerColor = mix( vec3( 0.005 ), vec3( 0.05 ), markerIntensity );
					vec3 backgroundColor = mix( markerColor, vec3( 0.2 ), axisIntensity );
					return backgroundColor;

				}

				void main() {

					// from uniforms
					float sectionCount = overlay ? 1.0 : graphCount;
					float yWidth = abs( yRange.y - yRange.x );

					// separate into sections
					float _section;
					float sectionY = modf( sectionCount * vUv.y, _section );
					int section = int( sectionCount - _section - 1.0 );

					// get the current point
					vec2 point = vec2(
						map( xRange.x, xRange.y, vUv.x ),
						map( yRange.x, yRange.y, sectionY )
					);

					// get the results
					vec4 result = graphFunction( point.x );
					vec4 delta = result - vec4( point.y );
					vec4 halfDdf = fwidth( delta ) * 0.5;
					if ( fwidth( point.y ) > yWidth * 0.5 ) {

						halfDdf = vec4( 0.0 );

					}

					// graph display intensity
					vec4 graph = smoothstep( - halfDdf, halfDdf, abs( delta ) - thickness * halfDdf );

					// initialize the background
					gl_FragColor.rgb = getBackground( point, yWidth );
					gl_FragColor.a = 1.0;

					if ( dim && ( point.x < 0.0 || point.y < 0.0 ) ) {

						graph = mix(
							vec4( 1.0 ),
							graph,
							0.05
						);

					}

					// color the charts
					if ( sectionCount > 1.0 ) {

						if ( graphDisplay[ section ] ) {

							gl_FragColor.rgb = mix(
								colors[ section ],
								gl_FragColor.rgb,
								graph[ section ]
							);

						}

					} else {

						for ( int i = 0; i < int( graphCount ); i ++ ) {

							if ( graphDisplay[ i ] ) {

								gl_FragColor.rgb = mix(
									colors[ i ],
									gl_FragColor.rgb,
									graph[ i ]
								);

							}

						}

					}

					#include <colorspace_fragment>

				}

			`
        });
        this._graphFunctionSnippet = /* glsl */ `
			vec4 graphFunctionSnippet( float x ) {

				return vec4(
					sin( x * 3.1415926535 ),
					cos( x ),
					0.0,
					0.0
				);

			}
		`;
        this.setValues(parameters);
    }
    onBeforeCompile(shader) {
        shader.fragmentShader = shader.fragmentShader.replace('__FUNCTION_CONTENT__', this._graphFunctionSnippet);
        return shader;
    }
    customProgramCacheKey() {
        return this._graphFunctionSnippet;
    }
}

},{"three":"ktPTu","../MaterialBase.js":"hgRM3","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["8SDhd"], "8SDhd", "parcelRequire94c2")

//# sourceMappingURL=graphing.807d03e7.js.map

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
})({"frXeS":[function(require,module,exports,__globalThis) {
const CONFIG_URL = 'https://raw.githubusercontent.com/google/model-viewer/master/packages/render-fidelity-tools/test/config.json';
const COMMITS_URL = 'https://api.github.com/repos/gkjohnson/three-gpu-pathtracer/commits?sha=screenshots';
(async ()=>{
    const containerEl = document.getElementById('container');
    const { scenarios } = await (await fetch(CONFIG_URL)).json();
    const commits = await (await fetch(COMMITS_URL)).json();
    const latestSha = commits[0].sha;
    let imageType = window.location.hash.replace(/^#/, '') || 'model-viewer';
    const selectionBox = document.querySelector('select');
    selectionBox.value = imageType;
    selectionBox.addEventListener('change', ()=>{
        window.location.hash = selectionBox.value;
        imageType = selectionBox.value;
        rebuildList();
    });
    document.body.style.visibility = 'visible';
    const largeImageBox = document.querySelector('input[type="checkbox"]');
    largeImageBox.addEventListener('change', ()=>{
        if (largeImageBox.checked) containerEl.classList.add('large-images');
        else containerEl.classList.remove('large-images');
    });
    rebuildList();
    function rebuildList() {
        containerEl.innerHTML = '';
        scenarios.forEach((s)=>{
            const name = s.name;
            const url1 = `https://raw.githubusercontent.com/gkjohnson/three-gpu-pathtracer/${latestSha}/screenshots/golden/${name}.png`;
            let url2;
            if (imageType === 'prior-commit') url2 = `https://raw.githubusercontent.com/gkjohnson/three-gpu-pathtracer/${commits[1].sha}/screenshots/golden/${name}.png`;
            else url2 = `https://raw.githubusercontent.com/google/model-viewer/master/packages/render-fidelity-tools/test/goldens/${name}/${imageType}-golden.png`;
            containerEl.innerHTML += `
				<div>
					<h1>${s.name}</h1>
					<div class="img-wrapper">
						<a href="${url1}" target="_blank"><img src="${url1}" /></a>
						<a href="${url2}" target="_blank"><img src="${url2}" /></a>
					</div>
				</div>
			`;
        });
    }
})();

},{}]},["frXeS"], "frXeS", "parcelRequire94c2")

//# sourceMappingURL=screenshotList.a370afcd.js.map

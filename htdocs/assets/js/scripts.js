/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/scripts/scripts.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/scripts/scripts.js":
/*!***********************************!*\
  !*** ./src/js/scripts/scripts.js ***!
  \***********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_RenderManeger3D__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/RenderManeger3D */ \"./src/js/scripts/utils/RenderManeger3D.js\");\n\n\n/*--------------------------------------------------------------------------\r\n\tparameter\r\n--------------------------------------------------------------------------*/\nvar renderManeger3D = void 0;\n\n// 数値のパーティクル座標管理リスト\nvar numberList = [];\n\n// 表示時間のパーティクルリスト（文字単位）\nvar particleSystemList = [];\n\n// パーティクル用テクスチャ\nvar texture = void 0;\n\n// font data\nvar fontData = void 0;\n\n// 現在時\nvar now = getNow();\n\n/*--------------------------------------------------------------------------\r\n\tinit\r\n--------------------------------------------------------------------------*/\nfunction init() {\n\trenderManeger3D = new _utils_RenderManeger3D__WEBPACK_IMPORTED_MODULE_0__[\"default\"]($(\"#canvas_container\"), {\n\t\tisController: true\n\t});\n\n\t// 文字単位のパーティクル量(初期値)\n\trenderManeger3D.gui.params.particles = 5000 * 6;\n\trenderManeger3D.gui.params.size = 1.0;\n\n\t// 表示する時間のパーティクルを生成\n\ttexture = new THREE.TextureLoader().load(\"./assets/img/icon.png\");\n\ttexture.minFilter = THREE.LinearFilter;\n\ttexture.magFilter = THREE.LinearFilter;\n\ttexture.format = THREE.RGBFormat;\n\n\t// 数値のパーティクル座標管理リストの生成\n\t// font loader\n\tvar loader = new THREE.FontLoader();\n\tvar typeface = \"./assets/fonts/helvetiker_bold.typeface.json?\" + performance.now();\n\n\tloader.load(typeface, function (font) {\n\t\tfontData = font;\n\n\t\t// dat.gui\n\t\trenderManeger3D.gui.add(renderManeger3D.gui.params, 'particles', 500, 100000).step(10).onChange(function (val) {\n\t\t\tcreateParticle();\n\t\t});\n\t\trenderManeger3D.gui.add(renderManeger3D.gui.params, 'size', 0.1, 2).onChange(function (val) {\n\t\t\tcreateParticle();\n\t\t});\n\n\t\t// パーティクル生成\n\t\tcreateParticle();\n\n\t\t// start\n\t\trenderManeger3D.start();\n\t});\n\n\t// camera positon\n\tif (INK.isSmartPhone()) {\n\t\trenderManeger3D.camera.position.z = 360;\n\t} else {\n\t\trenderManeger3D.camera.position.z = 120;\n\t}\n\n\t// update\n\trenderManeger3D.event.on(\"update\", function () {\n\t\tparticleSystemList.forEach(function (psList, i) {\n\t\t\tpsList.particles.verticesNeedUpdate = true;\n\t\t\tpsList.particleSystem.material.color.setHSL((Math.sin((renderManeger3D.time + i / now.length * INK.TWO_PI) * 0.2) + 1) / 2, 0.5, 0.5);\n\t\t});\n\n\t\tvar _now = getNow();\n\t\tif (now != _now) {\n\t\t\tfor (var i = 0; i < now.length; i++) {\n\t\t\t\tif (now[i] != _now[i]) {\n\t\t\t\t\tmorphTo(i, +_now[i]);\n\t\t\t\t}\n\t\t\t}\n\t\t\tnow = _now;\n\t\t}\n\t});\n}\n\n/*--------------------------------------------------------------------------\r\n\tcreateParticle\r\n--------------------------------------------------------------------------*/\nfunction createParticle() {\n\tfor (var i = 0; i < 10; ++i) {\n\t\tnumberList[i] = {};\n\n\t\t// TextGeometry\n\t\tnumberList[i].geometry = new THREE.TextGeometry(i, {\n\t\t\tfont: fontData,\n\t\t\tsize: 40,\n\t\t\theight: 8,\n\t\t\tcurveSegments: 10\n\t\t});\n\n\t\t// ジオメトリを中点の中央に配置\n\t\tnumberList[i].geometry.center();\n\n\t\t// Geometry パーティクル管理用\n\t\tnumberList[i].particles = new THREE.Geometry();\n\n\t\t// TextGeometry内にランダムな頂点を追加\n\t\tnumberList[i].particles.vertices = THREE.GeometryUtils.randomPointsInGeometry(numberList[i].geometry, renderManeger3D.gui.params.particles / 6);\n\t}\n\n\t// パーティクル削除\n\trenderManeger3D.scene.remove.apply(renderManeger3D.scene, renderManeger3D.scene.children);\n\n\t// パーティクル追加\n\tfor (var j = 0; j < now.length; ++j) {\n\t\tvar particles = new THREE.Geometry();\n\n\t\tparticles.vertices = numberList[+now[j]].particles.clone(numberList[+now[j]].particles).vertices;\n\n\t\tvar material = new THREE.PointsMaterial({\n\t\t\tsize: renderManeger3D.gui.params.size * window.devicePixelRatio,\n\t\t\tmap: texture,\n\t\t\tblending: THREE.AdditiveBlending,\n\t\t\tdepthTest: false,\n\t\t\ttransparent: true\n\t\t});\n\n\t\tvar particleSystem = new THREE.Points(particles, material);\n\t\t// particleSystem.sortParticles = true;\n\n\t\t// 文字を中央配置\n\t\tparticleSystem.position.x = 34 * j - 34 * 2.55;\n\n\t\t// 時間管理用パーティクル\n\t\tparticleSystemList[j] = {\n\t\t\tparticleSystem: particleSystem,\n\t\t\tparticles: particles\n\t\t};\n\n\t\trenderManeger3D.scene.add(particleSystem);\n\t}\n}\n\n/*--------------------------------------------------------------------------\r\n\tutils\r\n--------------------------------------------------------------------------*/\n/**\r\n * @method morphTo モーフィングアニメーション\r\n * @param {Number} index 桁数（頭から数えて）\r\n * @param {Number} num アニメーションする数字\r\n */\nfunction morphTo(index, num) {\n\tvar psList = particleSystemList[index];\n\tvar p = numberList[num].particles;\n\n\tfor (var i = 0; i < psList.particles.vertices.length; i++) {\n\t\tTweenMax.to(psList.particles.vertices[i], .7, {\n\t\t\tease: Expo.easeInOut,\n\t\t\tx: p.vertices[i].x,\n\t\t\ty: p.vertices[i].y,\n\t\t\tz: p.vertices[i].z\n\t\t});\n\t}\n}\n\n/**\r\n * @method getNow 現在の時、分、秒を文字列にして返す\r\n * @return {String}\r\n */\nfunction getNow() {\n\tvar date = new Date();\n\treturn zeroPadding(date.getHours()) + zeroPadding(date.getMinutes()) + zeroPadding(date.getSeconds());\n}\n\n/**\r\n * @method zeroPadding 1桁の場合、先頭に0を追加して2桁にする\r\n * @param {Number} num\r\n * @return {String}\r\n */\nfunction zeroPadding(num) {\n\tvar numStr = \"\" + num;\n\tif (numStr.length < 2) {\n\t\tnumStr = \"0\" + numStr;\n\t}\n\treturn numStr;\n}\n\n/*==========================================================================\r\n\tDOM READY\r\n==========================================================================*/\n$(function () {\n\tinit();\n});\n\n//# sourceURL=webpack:///./src/js/scripts/scripts.js?");

/***/ }),

/***/ "./src/js/scripts/utils/RenderManeger3D.js":
/*!*************************************************!*\
  !*** ./src/js/scripts/utils/RenderManeger3D.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar RenderManeger3D = function () {\n\t/**\r\n  * constructor\r\n  * @param  {jQuery} $container canvas container\r\n  * @param  {Object} oprions\r\n  */\n\tfunction RenderManeger3D($container, options) {\n\t\tvar _this = this;\n\n\t\t_classCallCheck(this, RenderManeger3D);\n\n\t\tthis.$container = $container;\n\n\t\tthis.options = $.extend(true, {\n\t\t\tisController: false,\n\t\t\tisAxis: false,\n\t\t\tisGui: true,\n\t\t\tisStats: true\n\t\t}, options);\n\n\t\tthis.width = this.$container.width();\n\t\tthis.height = this.$container.height();\n\n\t\tthis.startTime = null;\n\t\tthis.time = null;\n\t\tthis._animationId = null;\n\n\t\t// event: [start, stop, resize, update]\n\t\tthis.event = new INK.Events();\n\n\t\t// stats\n\t\tthis.stats = new Stats();\n\t\tthis.$container[0].appendChild(this.stats.dom);\n\t\tif (!this.options.isStats) {\n\t\t\t$(this.stats.domElement).css({ display: 'none' });\n\t\t}\n\n\t\t// gui\n\t\tif (this.options.isGui) {\n\t\t\tthis.gui = new dat.GUI();\n\n\t\t\tthis.gui.params = {};\n\t\t\tthis.gui.params.stats = this.options.isStats;\n\t\t\tthis.gui.add(this.gui.params, 'stats').name('FPS Metor').onChange(function () {\n\t\t\t\tif (_this.gui.params.stats) {\n\t\t\t\t\t$(_this.stats.domElement).css('display', 'block');\n\t\t\t\t} else {\n\t\t\t\t\t$(_this.stats.domElement).css('display', 'none');\n\t\t\t\t}\n\t\t\t});\n\t\t}\n\n\t\t// renderer\n\t\tthis.renderer = new THREE.WebGLRenderer();\n\t\tthis.renderer.setClearColor(0x000000);\n\t\tthis.renderer.setPixelRatio(window.devicePixelRatio);\n\t\tthis.renderer.setSize(this.width, this.height);\n\n\t\t// scene\n\t\tthis.scene = new THREE.Scene();\n\n\t\t// camera\n\t\tthis.camera = new THREE.PerspectiveCamera(60, this.width / this.height, 0.01, 10000);\n\t\tthis.camera.position.set(0, 0, 10);\n\t\tthis.camera.aspect = this.width / this.height;\n\n\t\tif (this.options.isController) {\n\t\t\tthis.controller = new THREE.OrbitControls(this.camera, this.renderer.domElement);\n\t\t\tthis.controller.autoRotate = false;\n\t\t\tthis.controller.autoRotateSpeed = 5.0;\n\t\t}\n\n\t\t// AxisHelper\n\t\tif (this.options.isAxis) {\n\t\t\tthis.axis = new THREE.AxisHelper(1000);\n\t\t\tthis.scene.add(this.axis);\n\t\t}\n\n\t\tthis.$container[0].appendChild(this.renderer.domElement);\n\n\t\t// resize\n\t\t$(window).resize(this.resize.bind(this));\n\t}\n\n\t/**\r\n  * start\r\n  */\n\n\n\t_createClass(RenderManeger3D, [{\n\t\tkey: 'start',\n\t\tvalue: function start() {\n\t\t\tthis.startTime = performance.now();\n\t\t\tcancelAnimationFrame(this._animationId);\n\t\t\tthis.event.trigger('start', this);\n\t\t\tthis.update();\n\t\t}\n\n\t\t/**\r\n   * stop\r\n   */\n\n\t}, {\n\t\tkey: 'stop',\n\t\tvalue: function stop() {\n\t\t\tcancelAnimationFrame(this._animationId);\n\t\t\tthis.event.trigger('stop', this);\n\t\t}\n\n\t\t/**\r\n   * update\r\n   */\n\n\t}, {\n\t\tkey: 'update',\n\t\tvalue: function update() {\n\t\t\tthis.time = (performance.now() - this.startTime) / 1000;\n\t\t\tthis._animationId = requestAnimationFrame(this.update.bind(this));\n\n\t\t\tthis.event.trigger('update', this);\n\t\t\tthis.render();\n\n\t\t\tif (this.controller) {\n\t\t\t\tthis.controller.update();\n\t\t\t}\n\t\t\tif (this.gui.params.stats) {\n\t\t\t\tthis.stats.update();\n\t\t\t}\n\t\t}\n\n\t\t/**\r\n   * render\r\n   */\n\n\t}, {\n\t\tkey: 'render',\n\t\tvalue: function render() {\n\t\t\tthis.renderer.render(this.scene, this.camera);\n\t\t}\n\n\t\t/**\r\n   * resize\r\n   */\n\n\t}, {\n\t\tkey: 'resize',\n\t\tvalue: function resize() {\n\t\t\tthis.width = this.$container.width();\n\t\t\tthis.height = this.$container.height();\n\t\t\tthis.renderer.setSize(this.width, this.height);\n\t\t\tthis.camera.aspect = this.width / this.height;\n\t\t\tthis.camera.updateProjectionMatrix();\n\t\t\tthis.event.trigger('resize', this);\n\t\t}\n\t}]);\n\n\treturn RenderManeger3D;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (RenderManeger3D);\n\n//# sourceURL=webpack:///./src/js/scripts/utils/RenderManeger3D.js?");

/***/ })

/******/ });
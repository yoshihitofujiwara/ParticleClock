import RenderManeger3D from "./utils/RenderManeger3D";

/*--------------------------------------------------------------------------
	parameter
--------------------------------------------------------------------------*/
let renderManeger3D;

// 数値のパーティクル座標管理リスト
let numberList = [];

// 表示時間のパーティクルリスト（文字単位）
let particleSystemList = [];

// パーティクル用テクスチャ
let texture;

// font data
let fontData;

// 現在時
let now = getNow();


/*--------------------------------------------------------------------------
	init
--------------------------------------------------------------------------*/
function init() {
	renderManeger3D = new RenderManeger3D($("#canvas_container"), {
		isController: true
	});


	// 文字単位のパーティクル量(初期値)
	renderManeger3D.gui.params.particles = 5000 * 6;
	renderManeger3D.gui.params.size = 1.0;


	// 表示する時間のパーティクルを生成
	texture = new THREE.TextureLoader().load("./assets/img/icon.png");
	texture.minFilter = THREE.LinearFilter;
	texture.magFilter = THREE.LinearFilter;
	texture.format = THREE.RGBFormat;

	// 数値のパーティクル座標管理リストの生成
	// font loader
	let loader = new THREE.FontLoader();
	let typeface = "./assets/fonts/helvetiker_bold.typeface.json?" + performance.now();

	loader.load(typeface, (font) => {
		fontData = font;

		// dat.gui
		renderManeger3D.gui.add(renderManeger3D.gui.params, 'particles', 500, 100000).step(10).onChange((val) => {
			createParticle();
		});
		renderManeger3D.gui.add(renderManeger3D.gui.params, 'size', 0.1, 2).onChange((val) => {
			createParticle();
		});

		// パーティクル生成
		createParticle();

		// start
		renderManeger3D.start();
	});


	// camera positon
	if (INK.isSmartPhone()) {
		renderManeger3D.camera.position.z = 360;
	} else {
		renderManeger3D.camera.position.z = 120;
	}


	// update
	renderManeger3D.event.on("update", () => {
		particleSystemList.forEach((psList, i) => {
			psList.particles.verticesNeedUpdate = true;
			psList.particleSystem.material.color.setHSL((Math.sin((renderManeger3D.time + (i / now.length * INK.TWO_PI)) * 0.2) + 1) / 2, 0.5, 0.5);
		});

		let _now = getNow();
		if (now != _now) {
			for (let i = 0; i < now.length; i++) {
				if (now[i] != _now[i]) {
					morphTo(i, +_now[i]);
				}
			}
			now = _now;
		}
	});
}


/*--------------------------------------------------------------------------
	createParticle
--------------------------------------------------------------------------*/
function createParticle(){
	for (let i = 0; i < 10; ++i) {
		numberList[i] = {};

		// TextGeometry
		numberList[i].geometry = new THREE.TextGeometry(i, {
			font: fontData,
			size: 40,
			height: 8,
			curveSegments: 10,
		});

		// ジオメトリを中点の中央に配置
		numberList[i].geometry.center();

		// Geometry パーティクル管理用
		numberList[i].particles = new THREE.Geometry();

		// TextGeometry内にランダムな頂点を追加
		numberList[i].particles.vertices = THREE.GeometryUtils.randomPointsInGeometry(numberList[i].geometry, renderManeger3D.gui.params.particles / 6);
	}

	// パーティクル削除
	renderManeger3D.scene.remove.apply(renderManeger3D.scene, renderManeger3D.scene.children);

	// パーティクル追加
	for (let j = 0; j < now.length; ++j) {
		let particles = new THREE.Geometry();

		particles.vertices = numberList[+now[j]].particles.clone(numberList[+now[j]].particles).vertices;

		let material = new THREE.PointsMaterial({
			size: renderManeger3D.gui.params.size * window.devicePixelRatio,
			map: texture,
			blending: THREE.AdditiveBlending,
			depthTest: false,
			transparent: true
		});

		let particleSystem = new THREE.Points(particles, material);
		// particleSystem.sortParticles = true;

		// 文字を中央配置
		particleSystem.position.x = 34 * j - (34 * 2.55);

		// 時間管理用パーティクル
		particleSystemList[j] = {
			particleSystem: particleSystem,
			particles: particles
		};

		renderManeger3D.scene.add(particleSystem);
	}
}


/*--------------------------------------------------------------------------
	utils
--------------------------------------------------------------------------*/
/**
 * @method morphTo モーフィングアニメーション
 * @param {Number} index 桁数（頭から数えて）
 * @param {Number} num アニメーションする数字
 */
function morphTo(index, num) {
	let psList = particleSystemList[index];
	let p = numberList[num].particles;

	for (let i = 0; i < psList.particles.vertices.length; i++) {
		TweenMax.to(psList.particles.vertices[i], .7, {
			ease: Expo.easeInOut,
			x: p.vertices[i].x,
			y: p.vertices[i].y,
			z: p.vertices[i].z
		});
	}
}


/**
 * @method getNow 現在の時、分、秒を文字列にして返す
 * @return {String}
 */
function getNow() {
	let date = new Date();
	return zeroPadding(date.getHours()) + zeroPadding(date.getMinutes()) + zeroPadding(date.getSeconds());
}


/**
 * @method zeroPadding 1桁の場合、先頭に0を追加して2桁にする
 * @param {Number} num
 * @return {String}
 */
function zeroPadding(num) {
	let numStr = "" + num;
	if (numStr.length < 2) {
		numStr = "0" + numStr;
	}
	return numStr;
}


/*==========================================================================
	DOM READY
==========================================================================*/
$(() => {
	init();
});

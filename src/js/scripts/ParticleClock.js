import RenderManeger3D from "./RenderManeger3D";


// 数値単位のパーティクル量
const particleCount = 5000;

// 数値のパーティクル座標管理用
let numberList = [];

// 時間のパーティクル管理用
let particleSystemList = [];

// 現在時
let now = getNow();



export default function () {
	let renderManeger3D = new RenderManeger3D($('#canvas_container'), {
		isController: true
	});

	// パーティクルテクスチャ
	let texture = new THREE.TextureLoader().load("../assets/img/1-10.png");
	texture.minFilter = THREE.LinearFilter;
	texture.magFilter = THREE.LinearFilter;
	texture.format = THREE.RGBFormat;

	// numberListに数字のパーティクル生成して座標をキャッシュしておく
	// font loader
	let loader = new THREE.FontLoader();
	let typeface = '../assets/fonts/helvetiker_bold.typeface.json?';

	loader.load(typeface, (font) => {
		for (let i = 0; i < 10; ++i) {
			numberList[i] = {};

			// TextGeometry
			numberList[i].geometry = new THREE.TextGeometry(i, {
				font: font,
				size: 40,
				height: 8,
				curveSegments: 10,
			});

			// ジオメトリを中点の中央に配置
			numberList[i].geometry.center();

			// Geometry パーティクル管理用
			numberList[i].particles = new THREE.Geometry();

			// TextGeometry内にランダムな頂点を生成
			numberList[i].points = THREE.GeometryUtils.randomPointsInGeometry(numberList[i].geometry, particleCount);

			// Geometryに頂点追加
			numberList[i].particles.vertices = createVertices(numberList[i].points);
		}

		// 読み込み完了後
		for (let i = 0; i < now.length; i++) {
			let psList = particleSystemList[i];
			let p = numberList[+now[i]].particles;

			for (let j = 0; j < psList.particles.vertices.length; j++) {
				psList.particles.vertices[j] = new THREE.Vector3(p.vertices[j].x, p.vertices[j].y, p.vertices[j].z);
			}
		}

		// start
		renderManeger3D.start();
	});


	// 表示する時間のパーティクルを生成
	for (let i = 0; i < 6; ++i) {
		let particles = new THREE.Geometry();

		// パーティクルの初期位置
		for (let p = 0; p < particleCount; p++) {
			let vertex = new THREE.Vector3();
			vertex.x = 0;
			vertex.y = 0;
			vertex.z = 0;

			particles.vertices.push(vertex);
		}

		// PointsMaterial
		let pMaterial = new THREE.PointsMaterial({
			size: .5 * window.devicePixelRatio,
			map: texture,
			transparent: true
		});

		let particleSystem = new THREE.Points(particles, pMaterial);
		// particleSystem.sortParticles = true;
			particleSystem.position.x = 34 * i - (34 * 2.55);

		// 時間管理用パーティクル
		particleSystemList.push({
			particleSystem: particleSystem,
			particles: particles
		});

		renderManeger3D.scene.add(particleSystem);
	}


	// camera positon
	// renderManeger3D.camera.position.z = $(window).width() / 10;
	// renderManeger3D.camera.position.z *= window.devicePixelRatio;
	// console.log(window.devicePixelRatio);
	renderManeger3D.camera.position.z = 120;

	if (INK.isSmartPhone()) {
		renderManeger3D.camera.position.z = 360;
	}


	// update
	renderManeger3D.event.on("update", () => {
		particleSystemList.forEach((psList) => {
			psList.particles.verticesNeedUpdate = true;
			psList.particleSystem.material.color = new THREE.Color("#FFFFFF");
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
	utils
--------------------------------------------------------------------------*/
/**
 * @method createVertices ジオメトリに頂点追加
 * @param {Array} points ポイントリスト
 */
function createVertices(points) {
	let vertices = [];
	for (let p = 0; p < particleCount; p++) {
		let vertex = new THREE.Vector3(points[p].x, points[p].y, points[p].z);
		vertices.push(vertex);
	}
	return vertices;
}


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

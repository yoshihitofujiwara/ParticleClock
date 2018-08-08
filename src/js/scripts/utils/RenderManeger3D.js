export default class RenderManeger3D {
	/**
	 * constructor
	 * @param  {jQuery} $container canvas container
	 * @param  {Object} oprions
	 */
	constructor($container, options) {
		this.$container = $container;

		this.options = $.extend(true, {
			isController: false,
			isAxis: false,
			isGui: true,
			isStats: true
		}, options);

		this.width = this.$container.width();
		this.height = this.$container.height();

		this.startTime = null;
		this.time = null;
		this._animationId = null;

		// event: [start, stop, resize, update]
		this.event = new INK.Events();

		// stats
		this.stats = new Stats();
		this.$container[0].appendChild(this.stats.dom);
		if (!this.options.isStats){
			$(this.stats.domElement).css({ display: 'none' });
		}

		// gui
		if (this.options.isGui) {
			this.gui = new dat.GUI();

			this.gui.params = {};
			this.gui.params.stats = this.options.isStats;
			this.gui.add(this.gui.params, 'stats').name('FPS Metor').onChange(() => {
				if (this.gui.params.stats) {
					$(this.stats.domElement).css('display', 'block');
				} else {
					$(this.stats.domElement).css('display', 'none');
				}
			});
		}

		// renderer
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setClearColor(0x000000);
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(this.width, this.height);

		// scene
		this.scene = new THREE.Scene();

		// camera
		this.camera = new THREE.PerspectiveCamera(60, this.width / this.height, 0.01, 10000);
		this.camera.position.set(0, 0, 10);
		this.camera.aspect = this.width / this.height;

		if (this.options.isController) {
			this.controller = new THREE.OrbitControls(this.camera, this.renderer.domElement);
			this.controller.autoRotate = false;
			this.controller.autoRotateSpeed = 5.0;
		}

		// AxisHelper
		if (this.options.isAxis) {
			this.axis = new THREE.AxisHelper(1000);
			this.scene.add(this.axis);
		}

		this.$container[0].appendChild(this.renderer.domElement);

		// resize
		$(window).resize(this.resize.bind(this));
	}


	/**
	 * start
	 */
	start() {
		this.startTime = performance.now();
		cancelAnimationFrame(this._animationId);
		this.event.trigger('start', this);
		this.update();
	}


	/**
	 * stop
	 */
	stop() {
		cancelAnimationFrame(this._animationId);
		this.event.trigger('stop', this);
	}


	/**
	 * update
	 */
	update() {
		this.time = (performance.now() - this.startTime) / 1000;
		this._animationId = requestAnimationFrame(this.update.bind(this));

		this.event.trigger('update', this);
		this.render();

		if (this.controller) {
			this.controller.update();
		}
		if (this.gui.params.stats) {
			this.stats.update();
		}
	}


	/**
	 * render
	 */
	render() {
		this.renderer.render(this.scene, this.camera);
	}


	/**
	 * resize
	 */
	resize() {
		this.width = this.$container.width();
		this.height = this.$container.height();
		this.renderer.setSize(this.width, this.height);
		this.camera.aspect = this.width / this.height;
		this.camera.updateProjectionMatrix();
		this.event.trigger('resize', this);
	}
}

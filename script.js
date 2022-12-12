
	import * as THREE from './build/three.module.js';

	import { OrbitControls } from './jsm/controls/OrbitControls.js';
	import { TrackballControls } from './jsm/controls/TrackballControls.js';
    import { RGBELoader } from './jsm/loaders/RGBELoader.js';
	import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';

	const textureError =  document.getElementById("texture-error");

	//Init 
	var container;
	var camera, light, scene, renderer, controls;
    light = new THREE.HemisphereLight(0xffffbb, 0x080820, light_intensity);
    var light_intensity = 1;
    let lightInput = document.getElementById("light-input");
    let lightOutput = document.getElementById("light-output");
    lightInput.addEventListener("input", function () {
        lightOutput.innerHTML = lightInput.value;
        light_intensity = lightInput.value/100;
        light.intensity = light_intensity;
    })

    //Init2
	var container2;
	var camera2, light2, scene2, renderer2, controls2;
    
    var earthMesh = new THREE.Mesh(
        new THREE.SphereBufferGeometry(3, 35, 35),
        new THREE.MeshPhongMaterial()
      );
    var rock_texture="models/textures/rock_texture.jpg";
    let rock_1Input = document.getElementById('rock_1');
    rock_1Input.addEventListener("click", function () {
        rock_texture="models/textures/rock_texture.jpg";
        updateRockTexture();
    });
    let rock_2Input = document.getElementById('rock_2');
    rock_2Input.addEventListener("click", function () {
        rock_texture="models/textures/rock_texture_2.jpg";
        updateRockTexture();
    });
    let rock_3Input = document.getElementById('rock_3');
    rock_3Input.addEventListener("click", function () {
        rock_texture="models/textures/rock_texture_3.jpg";
        updateRockTexture();    
    });
    let rock_4Input = document.getElementById('rock_4');
    rock_4Input.addEventListener("click", function () {
        rock_texture="models/textures/rock_texture_4.jpg";
        updateRockTexture();    
    });
    let rock_5Input = document.getElementById('rock_5');
    rock_5Input.addEventListener("click", function () {
        rock_texture="models/textures/rock_texture_5.jpg";
        updateRockTexture();    
    });
    
	var clock = new THREE.Clock();
	const rotationRad = -(Math.PI / 2);

	//commun event
	window.addEventListener('resize', onWindowResize, false);
	init();
	init2();
	animate();

	function init() {
		container = document.getElementById("first")

		camera = new THREE.PerspectiveCamera(45, container.offsetWidth / container.offsetHeight, 0.25, 40);
		camera.position.set(- 11.8, 2, 12.7 );

		scene = new THREE.Scene();

		light = new THREE.HemisphereLight(0xffffbb, 0x080820, light_intensity);
		scene.add(light);

		var loader = new GLTFLoader().setPath('models/');

        /*loader.load('champagne_castle_1_1k.hdr', function (texture) {
			const envMap = pmremGenerator.fromEquirectangular( texture ).texture;

            scene.background = envMap;
            scene.environment = envMap;

            texture.dispose();
            pmremGenerator.dispose();

            render();
		});*/
        
		loader.load('Xeno_Menu_Monado.glb', function (gltf) {
			gltf.scene.name = "xeno"
			scene.add(gltf.scene);
			let xeno = scene.getObjectByName("xeno");
			if (xeno) {
				xeno.rotateY(rotationRad);
			}
			render();
		});

		renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(container.offsetWidth, container.offsetHeight);
		renderer.toneMapping = THREE.ACESFilmicToneMapping;
		renderer.toneMappingExposure = 0.8;
		renderer.outputEncoding = THREE.sRGBEncoding;
		renderer.setClearColor(new THREE.Color('#87CEEB'), 1.0)
		container.appendChild(renderer.domElement);

		controls = new TrackballControls(camera, renderer.domElement);
		controls.target.set(0, 0, 0);

		window.addEventListener('resize', onWindowResize, false);

	}

    function init2() {
        container2 = document.getElementById("second")

		camera2 = new THREE.PerspectiveCamera(45, container2.offsetWidth / container2.offsetHeight, 0.25, 40);
		camera2.position.set(- 11.8, 2, 12.7 );

		scene2 = new THREE.Scene();

		light2 = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
		scene2.add(light2);

		var loader = new GLTFLoader().setPath('models/');
        
		loader.load('Mountain.gltf', function (gltf) {
			gltf.scene.name = "mountain"
			scene2.add(gltf.scene);
			let mountain = scene2.getObjectByName("mountain");
			if (mountain) {
				mountain.rotateY(rotationRad);
			}
			render();
		});

          scene2.add(earthMesh);
          updateRockTexture();

		renderer2 = new THREE.WebGLRenderer({ antialias: true });
        renderer2.setPixelRatio(window.devicePixelRatio);
        renderer2.setSize(container2.offsetWidth, container2.offsetHeight);
        renderer2.toneMapping = THREE.ACESFilmicToneMapping;
        renderer2.toneMappingExposure = 0.8;
        renderer2.outputEncoding = THREE.sRGBEncoding;
        renderer2.setClearColor(new THREE.Color('#5B5036'), 1.0)
        container2.appendChild(renderer2.domElement);

        controls2 = new TrackballControls(camera2, renderer2.domElement);
        controls2.target.set(0, 0, 0);

        window.addEventListener('resize', onWindowResize, false);

	}

	function animate() {
		requestAnimationFrame(animate);
		animateScene();
		animateScene2();
	}


	function animateScene() {
		controls.update();
		renderer.render(scene, camera);
	}
    function animateScene2() {
		controls2.update();
		renderer2.render(scene2, camera2);
	}

	function onWindowResize() {

		camera.aspect = container.offsetWidth / container.offsetHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(container.offsetWidth, container.offsetHeight);
		controls.handleResize();
		render();

        camera2.aspect = container2.offsetWidth / container2.offsetHeight;
        camera2.updateProjectionMatrix();
        renderer2.setSize(container2.offsetWidth, container2.offsetHeight);
        controls2.handleResize();
        render2();
	}

	function render() {
		renderer.render(scene, camera);
	}
    function render2() {
		renderer2.render(scene2, camera2);
	}
    
    function updateRockTexture() {
        new THREE.TextureLoader().load(
            rock_texture,
            texture => {
              //Update Texture
              earthMesh.material.map = texture;
              earthMesh.material.needsUpdate = true;
            },
            xhr => {
              //Download Progress
              console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
            },
            error => {
              //Error CallBack
              console.log("An error happened" + error);
            }
          );
	}
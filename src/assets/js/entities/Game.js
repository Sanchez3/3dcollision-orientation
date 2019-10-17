// import * as PIXI from 'pixi.js'
// import 'pixi-spine'
import TweenMax from 'gsap'
// import Orienter from './orienter.js'
import * as CANNON from 'cannon'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


class Game {
    constructor() {
        this.init();
    }
    init() {
        var that = this;

        var wWidth = window.innerWidth;
        var wHeight = window.innerHeight;


        var airplaneMesh, boatMesh;
        var app = that.app;
        var scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0x000000, 500, 10000);
        scene.add(new THREE.GridHelper(1000, 100));
        scene.add(new THREE.AxesHelper(20));
        var camera = new THREE.PerspectiveCamera(75, wWidth / wHeight, 0.5, 10000);

        var renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true })
        renderer.setSize(wWidth, wHeight);
        document.body.appendChild(renderer.domElement);

        camera.position.set(0, 30, 20);
        camera.lookAt(scene.position);
        // scene.add(camera);
        scene.add(camera);
        scene.add(new THREE.AmbientLight(0x666666));
        var light = new THREE.DirectionalLight(0xffffff, 1.75);
        light.castShadow = true;
        var d = 20;
        light.position.set(d, d, d);

        scene.add(light);


        var boatContainer = new THREE.Object3D();
        var airplaneContainer = new THREE.Object3D();
        var objCopy = new THREE.Object3D();
        scene.add(airplaneContainer, boatContainer);
        var orbitcontrols = new OrbitControls(camera, renderer.domElement)
        // controls.enableDamping = true
        // controls.dampingFactor = 0.25
        // controls.enableZoom = false

        var controls, physicsWorld;
        var sphereBodys = [];
        var cubeBodys = [];
        var spheres = [];
        var cubes = [];
        var ground;
        var groundBody;

        var light = new THREE.AmbientLight(0xffffff); // Soft white light
        scene.add(light);

        var slight = new THREE.SpotLight(0xffffff);
        slight.position.set(30, 30, 40);
        slight.target.position.set(0, 0, 0);
        slight.castShadow = true;

        var threeAssets = [];
        var manager = new THREE.LoadingManager();
        manager.onStart = function(url, itemsLoaded, itemsTotal) {
            // console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
        };

        manager.onLoad = function() {
            console.log('Loading complete!');
            threecallback && threecallback();
        };

        manager.onProgress = function(url, itemsLoaded, itemsTotal) {
            // console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
            var per = parseInt(itemsLoaded / itemsTotal * 100);
            console.log(per)
            // $("#percentage").html(per + ' %');
        };

        manager.onError = function(url) {
            console.log('There was an error loading ' + url);
        };

        function threecallback() {
            // var texture = threeAssets['color'];

            // var boatGeo = threeAssets['boat'];
            physicsWorld = new CANNON.World()
            physicsWorld.gravity.set(0, -10, 0);

            function renderTxt(x, y, z) {
                var p = document.getElementsByTagName('span');
                p[0].innerHTML = x;
                p[1].innerHTML = y;
                p[2].innerHTML = z;
            }
            window.addEventListener("devicemotion", function(event) {
                // 处理event.alpha、event.beta及event.gamma
                renderTxt(event.accelerationIncludingGravity.x, event.accelerationIncludingGravity.y, event.accelerationIncludingGravity.z)
                physicsWorld.gravity.set(event.accelerationIncludingGravity.x, event.accelerationIncludingGravity.y, event.accelerationIncludingGravity.z);
            }, true);

            function onClick() {
                alert(1)
                if (typeof DeviceMotionEvent.requestPermission === 'function') {
                    DeviceMotionEvent.requestPermission()
                        .then(permissionState => {
                            if (permissionState === 'granted') {
                                window.addEventListener("devicemotion", function(event) {
                                    // 处理event.alpha、event.beta及event.gamma
                                    renderTxt(event.accelerationIncludingGravity.x, event.accelerationIncludingGravity.y, event.accelerationIncludingGravity.z)
                                    physicsWorld.gravity.set(event.accelerationIncludingGravity.x, event.accelerationIncludingGravity.y, event.accelerationIncludingGravity.z);
                                }, true);
                            }
                        })
                        .catch(console.error);
                } else {
                    // handle regular non iOS 13+ devices
                }
            }

            document.getElementById('text').addEventListener('click', onClick.bind(this));




            var sphereShape = new CANNON.Sphere(1)
            for (var i = 9; i >= 0; i--) {
                var sphereBody = new CANNON.Body({
                    mass: 5,
                    position: new CANNON.Vec3(0, 10, 0),
                    shape: sphereShape
                })
                sphereBody.position.set(Math.random() - 0.5, 2.5 * i + 0.5, Math.random() - 0.5);
                physicsWorld.add(sphereBody)
                sphereBodys.push(sphereBody);
            }

            var cubeShape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5));
            for (var i = 9; i >= 0; i--) {
                var cubeBody = new CANNON.Body({
                    mass: 5,
                    position: new CANNON.Vec3(0, 10, 0),
                    shape: cubeShape
                })
                cubeBody.position.set(Math.random() - 0.5, 2.5 * i + 5.5, Math.random() - 0.5);
                physicsWorld.add(cubeBody)
                cubeBodys.push(cubeBody);
            }


            var groundShape = new CANNON.Plane()
            groundBody = new CANNON.Body({
                mass: 0,
                shape: groundShape
            })
            // setFromAxisAngle 旋转 X 轴 -90 度
            groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2)
            physicsWorld.add(groundBody)

            // 平面网格
            var groundGeometry = new THREE.PlaneGeometry(100, 100, 1, 1);
            var groundMaterial = new THREE.MeshLambertMaterial({ color: 0x777777 });
            ground = new THREE.Mesh(groundGeometry, groundMaterial)
            // ground.rotation.set(-Math.PI / 2, 0, 0)
            ground.castShadow = true;
            ground.receiveShadow = true;
            scene.add(ground)
            // 球网格
            var sphereGeometry = new THREE.SphereGeometry(1, 32, 32)
            var sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 })
            for (var i = 10 - 1; i >= 0; i--) {
                var sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
                sphereMesh.castShadow = true;
                spheres.push(sphereMesh);
                scene.add(sphereMesh);
            }


            var cubeGeometry = new THREE.BoxGeometry(1, 1, 1, 10, 10);
            var cubeMaterial = new THREE.MeshPhongMaterial({ color: 0x888888 });
            for (var i = 10 - 1; i >= 0; i--) {
                var cubeMesh = new THREE.Mesh(cubeGeometry, sphereMaterial);
                cubeMesh.castShadow = true;
                cubes.push(cubeMesh);
                scene.add(cubeMesh);
            }
        }

        var textureLoader = new THREE.TextureLoader(manager);
        textureLoader.load('/assets/favicon.ico', function(rs) {
            threeAssets['color'] = rs;
        });






        window.addEventListener('resize', onWindowResize, false);

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
        var lasetE;

        var animate = function() {
            requestAnimationFrame(animate);
            if (orbitcontrols) {
                orbitcontrols.update();
            }
            if (physicsWorld) {
                physicsWorld.step(1 / 60)
            }
            if (spheres.length) {
                ground.position.copy(groundBody.position);
                ground.quaternion.copy(groundBody.quaternion);
                for (var i = 9; i >= 0; i--) {
                    (function(k) {
                        spheres[k].position.copy(sphereBodys[k].position)
                        spheres[k].quaternion.copy(sphereBodys[k].quaternion)
                        cubes[k].position.copy(cubeBodys[k].position)
                        cubes[k].quaternion.copy(cubeBodys[k].quaternion)
                    })(i)
                }
            }
            renderer.render(scene, camera);
        };
        animate();

        //Web Work
        // // Parameters
        // var dt = 1/60, N=40;

        // // Data arrays. Contains all our kinematic data we need for rendering.
        // var positions = new Float32Array(N*3);
        // var quaternions = new Float32Array(N*4);

        // // Create a blob for the inline worker code
        // var blob = new Blob([document.querySelector('#worker1').textContent],{type:'text/javascript'});

        // // Create worker
        // var worker = new Worker(window.URL.createObjectURL(blob));
        // worker.postMessage = worker.webkitPostMessage || worker.postMessage;

        // var sendTime; // Time when we sent last message
        // worker.onmessage = function(e) {

        //     // Get fresh data from the worker
        //     positions = e.data.positions;
        //     quaternions = e.data.quaternions;

        //     // Update rendering spheres
        //     for(var i=0; i!==spheres.length; i++){
        //         spheres[i].position.set( positions[3*i+0],
        //                                 positions[3*i+1],
        //                                 positions[3*i+2] );
        //         spheres[i].quaternion.set(quaternions[4*i+0],
        //                                  quaternions[4*i+1],
        //                                  quaternions[4*i+2],
        //                                  quaternions[4*i+3]);
        //     }

        //     // If the worker was faster than the time step (dt seconds), we want to delay the next timestep
        //     var delay = dt * 1000 - (Date.now()-sendTime);
        //     if(delay < 0){
        //         delay = 0;
        //     }
        //     setTimeout(sendDataToWorker,delay);
        // }

        // function sendDataToWorker(){
        //     sendTime = Date.now();
        //     worker.postMessage({
        //         N : N,
        //         dt : dt,
        //         cannonUrl : document.location.href.replace(/\/[^/]*$/,"/") + "../build/cannon.js",
        //         positions : positions,
        //         quaternions : quaternions
        //     },[positions.buffer, quaternions.buffer]);
        // }
        // sendDataToWorker();

    }
    create() {
        var that = this;
    }
}


export default Game;
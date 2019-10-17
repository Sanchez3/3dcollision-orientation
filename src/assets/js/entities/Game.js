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
        // scene.fog = new THREE.Fog(0x000000, 500, 10000);
        scene.add(new THREE.GridHelper(1000, 100));
        scene.add(new THREE.AxesHelper(20));
        var camera = new THREE.PerspectiveCamera(75, wWidth / wHeight, 0.5, 10000);

        var renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true })
        renderer.setSize(wWidth, wHeight);
        document.body.appendChild(renderer.domElement);

        camera.position.set(0, 1, 10);
        camera.lookAt(scene.position);
        // scene.add(camera);
        scene.add(camera);

        scene.add(new THREE.AmbientLight(0xffffff, 0.5));
        var light = new THREE.DirectionalLight(0xffffff, 0.35);
        light.position.set(1, 1, 1).normalize();

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
        var cubeBody;
        var cube;
        var grounds = [];
        var groundBodys = [];

        // var light = new THREE.AmbientLight(0xffffff); // Soft white light
        // scene.add(light);

        // var slight = new THREE.SpotLight(0xffffff);
        // slight.position.set(30, 30, 40);
        // slight.target.position.set(0, 0, 0);
        // slight.castShadow = true;

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
            // window.addEventListener("devicemotion", function(event) {
            //     // 处理event.alpha、event.beta及event.gamma
            //     renderTxt(event.accelerationIncludingGravity.x, event.accelerationIncludingGravity.y, event.accelerationIncludingGravity.z)
            //     physicsWorld.gravity.set(event.accelerationIncludingGravity.x, event.accelerationIncludingGravity.y, event.accelerationIncludingGravity.z);
            // }, true);

            // function onClick() {
            //     alert(1)
            //     if (typeof DeviceMotionEvent.requestPermission === 'function') {
            //         DeviceMotionEvent.requestPermission()
            //             .then(permissionState => {
            //                 if (permissionState === 'granted') {
            //                     window.addEventListener("devicemotion", function(event) {
            //                         // 处理event.alpha、event.beta及event.gamma
            //                         renderTxt(event.accelerationIncludingGravity.x, event.accelerationIncludingGravity.y, event.accelerationIncludingGravity.z)
            //                         physicsWorld.gravity.set(event.accelerationIncludingGravity.x, event.accelerationIncludingGravity.y, event.accelerationIncludingGravity.z);
            //                     }, true);
            //                 }
            //             })
            //             .catch(console.error);
            //     } else {
            //         // handle regular non iOS 13+ devices
            //     }
            // }

            // document.getElementById('text').addEventListener('click', onClick.bind(this));



            var groundShape = new CANNON.Plane()
            // var groundBody0 = new CANNON.Body({
            //     mass: 0,
            //     shape: groundShape
            // })
            // groundBody0.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2)
            // groundBody0.position.set(0, -25, 0)
            // groundBodys.push(groundBody0)
            // physicsWorld.add(groundBody0)

            // var groundBody1 = new CANNON.Body({
            //     mass: 0,
            //     shape: groundShape
            // })
            // groundBody1.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2)
            // groundBody1.position.set(0, 0, 0)
            // groundBodys.push(groundBody1)
            // physicsWorld.add(groundBody1)

            var groundBody2 = new CANNON.Body({
                mass: 0,
                shape: groundShape
            })
            groundBody2.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI / 2)
            groundBody2.position.set(25, 0, 0)
            groundBodys.push(groundBody2)
            physicsWorld.add(groundBody2)

            var groundBody3 = new CANNON.Body({
                mass: 0,
                shape: groundShape
            })
            groundBody3.position.set(-25, 0, 0)
            groundBody3.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI / 2)
            groundBodys.push(groundBody3)
            physicsWorld.add(groundBody3)

            // var groundBody4 = new CANNON.Body({
            //     mass: 0,
            //     shape: groundShape
            // })
            // // groundBody4.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 0, 1), -Math.PI / 2)
            // groundBody4.position.set(0, 0, -25)
            // groundBodys.push(groundBody4)
            // physicsWorld.add(groundBody4)

            // var groundBody5 = new CANNON.Body({
            //     mass: 0,
            //     shape: groundShape
            // })
            // groundBody5.position.set(0, 0, 25)
            // groundBodys.push(groundBody5)
            // physicsWorld.add(groundBody5)

            var cubeShape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5));
            cubeBody = new CANNON.Body({
                mass: 5,
                position: new CANNON.Vec3(0, 5, 0),
                shape: cubeShape
            })
            cubeBody.position.set(Math.random() - 0.5, 2.5 * 1 + 5.5, Math.random() - 0.5);
            var quaternion0 = new THREE.Quaternion();
            // quaternion0.setFromAxisAngle(new THREE.Vector3(1, 1, 0), Math.PI / 2);
            cubeBody.quaternion.copy(quaternion0)
            physicsWorld.add(cubeBody)

            var ctime = 0;
            cubeBody.addEventListener("collide", function(e) {
                console.log("The sphere just collided with the ground!");
                console.log("Collided with body:", e.body);
                console.log("Contact between bodies:", e.contact);
                ctime++;
                document.getElementById('ctimes').innerHTML = ctime;
            });

            // 平面网格
            var groundGeometry = new THREE.PlaneGeometry(50, 50, 1, 1);
            // var groundMaterial = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });

            for (let i = 0; i < 2; i++) {
                var groundMaterial = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });
                var ground = new THREE.Mesh(groundGeometry, groundMaterial)
                ground.castShadow = true;
                ground.receiveShadow = true;
                grounds.push(ground)
                scene.add(ground)
            }

            var cubeGeometry = new THREE.BoxGeometry(1, 1, 1, 10, 10);
            var cubeMaterial = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });
            cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
            cube.castShadow = true;
            scene.add(cube);
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
            if (grounds.length) {
                cube.position.copy(cubeBody.position)
                cube.quaternion.copy(cubeBody.quaternion)
                for (let i = 0; i < groundBodys.length; i++) {
                    // console.log(i)
                    grounds[i].position.copy(groundBodys[i].position);
                    grounds[i].quaternion.copy(groundBodys[i].quaternion);
                }

            }
            renderer.render(scene, camera);
        };
        animate();

    }
    create() {
        var that = this;
    }
}


export default Game;
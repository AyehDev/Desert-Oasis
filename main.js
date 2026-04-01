


import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';


// ***************Scene setup*****************
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.set(0, 2, 10); // Start slightly above the ground and back from the origin


// ***************PointerLockControls setup*****************
const controls = new PointerLockControls(camera, document.body);
// scene.add(controls.getObject());


document.addEventListener('click', () => {
    controls.lock();
});

// camera movement - WASD keys
const keys = {
    w: false,
    a: false,
    s: false,
    d: false
}
const moveDirection = new THREE.Vector3();
const moveSpeed = 0.1;


document.addEventListener('keyup', (event) => {
    if (event.key.toLowerCase() === 'w') keys.w = false;
    if (event.key.toLowerCase() === 'a') keys.a = false;
    if (event.key.toLowerCase() === 's') keys.s = false;
    if (event.key.toLowerCase() === 'd') keys.d = false;
});

document.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() === 'w') keys.w = true;
    if (event.key.toLowerCase() === 'a') keys.a = true;
    if (event.key.toLowerCase() === 's') keys.s = true;
    if (event.key.toLowerCase() === 'd') keys.d = true;
});


const right = new THREE.Vector3();
const movement = new THREE.Vector3();

const cameraDirection = new THREE.Vector3();
function movementHandler(){
    moveDirection.set(0, 0, 0);

    if(keys.w) moveDirection.z -= moveSpeed;
    if(keys.s) moveDirection.z += moveSpeed;
    if(keys.a) moveDirection.x -= moveSpeed;
    if(keys.d) moveDirection.x += moveSpeed;

    camera.getWorldDirection(cameraDirection);
    cameraDirection.y = 0;
    cameraDirection.normalize();

    
    right.crossVectors(cameraDirection, new THREE.Vector3(0, 1, 0)).normalize();

    movement.set(0, 0, 0);
    movement.addScaledVector(cameraDirection, moveDirection.z);
    movement.addScaledVector(right, moveDirection.x);

    if (movement.lengthSq() > 0) movement.normalize();
    movement.multiplyScalar(moveSpeed);

    controls.getObject().position.add(movement);

}


// *************** environment setup*****************
// Sand terrain

const terrainGeometry = new THREE.PlaneGeometry(200, 200);
const sandCanvas = document.createElement('canvas');
sandCanvas.width = 512;
sandCanvas.height = 512;
const sndCtx = sandCanvas.getContext('2d');

// for loop to create sand texture
for(let i = 0; i < sandCanvas.width; i++){
    for (let j = 0; j < sandCanvas.height; j++) {
       const noise = Math.random() * 30 + 220; // Light yellowish color
       sndCtx.fillStyle = `rgb(${noise}, ${noise - 20}, ${noise - 40})`;
         sndCtx.fillRect(i, j, 1, 1);
    }
}



const sandTexture = new THREE.CanvasTexture(sandCanvas);
sandTexture.magFilter = THREE.NearestFilter;
sandTexture.minFilter = THREE.NearestFilter;

const sandMaterial = new THREE.MeshStandardMaterial({
    map: sandTexture,
    roughness: 0.6,
    metalness: 0.0
});

const terrain = new THREE.Mesh(terrainGeometry, sandMaterial);
terrain.rotation.x = -Math.PI / 2;
terrain.receiveShadow = true;
scene.add(terrain);


// **************Skybox setup*****************
const skyCanvas = document.createElement('canvas');
skyCanvas.width = 512;
skyCanvas.height = 512;
const skyCtx = skyCanvas.getContext('2d');

// create gradient atmosphere
const gradient = skyCtx.createLinearGradient(0, 0, 0, skyCanvas.height);
gradient.addColorStop(0, '#87CEEB'); // Light blue sky
gradient.addColorStop(0.7, 'rgb(206, 49, 183)');// Pinkish hue near the horizon - For a sunset effect.
gradient.addColorStop(1, '#D4A574'); // Light sandy color near the horizon
skyCtx.fillStyle = gradient;
skyCtx.fillRect(0, 0, skyCanvas.width, skyCanvas.height);

const skyTexture = new THREE.CanvasTexture(skyCanvas);

const materialArray = [];
for(let i = 0; i < 6; i++){
    materialArray.push(new THREE.MeshBasicMaterial({
        map: skyTexture,
        side: THREE.BackSide
    }))

};

const skyGeometry = new THREE.BoxGeometry(500, 500, 500);
const skybox = new THREE.Mesh(skyGeometry, materialArray);
scene.add(skybox);


// ***************Lighting setup*****************
// point lighting
const pointLight = new THREE.PointLight(0xffa500, 0.3); // Orange light to mimic the sun
pointLight.position.set(0, 20, 0);
pointLight.castShadow = true;
scene.add(pointLight);

// Dirctional lighting based of the sun position
const directionalLight = new THREE.DirectionalLight(0xffa500, 0.8);
directionalLight.position.set(50, 100, 50);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.far = 500;
directionalLight.shadow.camera.left = -200;
directionalLight.shadow.camera.right = 200;
directionalLight.shadow.camera.top = 200;
directionalLight.shadow.camera.bottom = -200;
scene.add(directionalLight);

// Amibiant lighting 
const ambientLight = new THREE.AmbientLight(0x404040, 0.5); // Soft ambient light
scene.add(ambientLight);



// ***********Animation func.************
function animate(){
    requestAnimationFrame(animate);

    if (controls.isLocked) {
        movementHandler();
    }

    renderer.render(scene, camera);
}

animate();

// ***********CSS***********
const instructions = document.getElementById('instructions');


if (instructions) {
    controls.addEventListener('lock', () => {
        instructions.style.display = 'none';
    });
    
    controls.addEventListener('unlock', () => {
        instructions.style.display = 'block';
    });
}



// *********window resize*********

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

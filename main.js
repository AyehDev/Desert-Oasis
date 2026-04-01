


import * as THREE from 'three';
import{PointerLockControls} from 'three/examples/jsm/controls/PointerLockControls.js';


// ***************Scene setup*****************
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.set(0, 1.6, 5); // Start slightly above the ground


// ***************PointerLockControls setup*****************
const controls = new PointerLockControls(camera, document.body);
scene.add(controls);


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

    const right = new THREE.Vector3();
    right.crossVectors(cameraDirection, new THREE.Vector3(0, 1, 0)).normalize();

    const movement = new THREE.Vector3();
    movement.addScaledVector(cameraDirection, moveDirection.z);
    movement.addScaledVector(right, moveDirection.x);

    controls.getobject().position.add(movement);

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









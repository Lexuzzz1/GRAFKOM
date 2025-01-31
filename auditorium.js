import * as THREE from "three";
import { OrbitControls } from "./node_modules/three/examples/jsm/controls/OrbitControls.js";
import { createStage } from "./lib/stage.js";
import { addWalls } from "./lib/walls.js";
import { addFloor } from "./lib/floor.js";
import { addPillars } from "./lib/pillars.js";
import { addTribunes } from "./lib/tribun.js";
import { createRoof } from "./lib/roofs.js";
import { createTribunWalls } from "./lib/tribunWalls.js";
import { loadRailings } from "./lib/railing.js";
import { addLedVideotron } from "./lib/led.js";
import { loadTiang, duplicateTiang } from "./lib/tiang.js";
import { loadStagelight, duplicateStagelight } from "./lib/stagelight.js";
import { addCarpet } from "./lib/carpet.js";
import { loadLightSwitch } from "./lib/lightswitch.js";
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { loadChair } from "./lib/chair.js";
import { loadGaruda } from "./lib/garuda.js";
import { loadPresiden } from "./lib/presiden.js";
import { PointerLockControls } from './node_modules/three/examples/jsm/controls/PointerLockControls.js';
import { createTV, duplicateTV } from "./lib/tv.js";

// import { loadDoors } from "./lib/doors.js";

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x808080); 
const cam = new THREE.PerspectiveCamera(
    45, // angle
    window.innerWidth / window.innerHeight, // ratio
    1, // near
    20000 // far
);

// cam.position.set(1000, 1000, 1000);  
cam.position.set(-810.62, 281, 197);
const initialTarget = new THREE.Vector3(-0.77, -0.12, 0.55); // Target posisi
cam.lookAt(initialTarget); // Arahkan kamera ke target

const renderer = new THREE.WebGLRenderer();
{ antialias: true }
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// const controls = new OrbitControls(cam, renderer.domElement);

// Load textures
const textureLoader = new THREE.TextureLoader();
const woodTexture = textureLoader.load("./assets/textures/wood.jpg");
const floorTexture = textureLoader.load("./assets/textures/floor.jpg");
const wallTexture2 = textureLoader.load("./assets/textures/wall2.jpg");
const wallTexture3 = textureLoader.load("./assets/textures/wall3.jpg");
const pillarTexture = textureLoader.load("./assets/textures/pilar.jpg");


// semua lampu pakai putih
// Ambient
const ambientLight = new THREE.AmbientLight(0xFFFFFF, 3); 
scene.add(ambientLight);

// Point Light
const pointLight = new THREE.PointLight(0xFFFFFF, 3); 
pointLight.position.set(800, 800, 800);
scene.add(pointLight);

// Directional Light
const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 2);
directionalLight.position.set(800, 800, 800).normalize();
scene.add(directionalLight);

// Add floor and walls
addFloor(scene, floorTexture);
addWalls(scene, {
  frontWallTexture: wallTexture3,
  backWallTexture: wallTexture3,
  leftWallTexture: wallTexture3,
  rightWallTexture: wallTexture3,
});

const stage = createStage(textureLoader);
scene.add(stage);

addPillars(scene, pillarTexture);
addTribunes(scene, woodTexture);
createRoof(scene, woodTexture);
createTribunWalls(scene, wallTexture3);
loadRailings(scene);
addLedVideotron(scene);
// loadDoors(scene, woodTexture);
loadTiang(scene, textureLoader, (tiang) => {
    // Duplikasi tiang
    duplicateTiang(scene, tiang, 10);

    loadStagelight(scene, textureLoader, tiang, (stagelight) => {
        // Duplikasi stagelight
        duplicateStagelight(scene, stagelight, 5);
        console.log('Both Tiang and Stagelight Loaded and Duplicated');
    });
});
addCarpet(scene, textureLoader);


loadGaruda(scene);
loadPresiden(scene);
loadChair(scene);

// light swiotch
loadLightSwitch(scene, (lightSwitch) => {
    console.log("LightSwitch loaded successfully:", lightSwitch);
});

let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
let duplicatedLightSwitch = null; // Variabel global untuk referensi
let isBlue = false; 

const tv = createTV(scene, { x: -970, y: 400, z: 1095 });
duplicateTV(scene, tv, [
    { x: -970, y: 400, z: -1100 },
    { x: 230, y: 400, z: -1100 },
    { x: 230, y: 400, z: 1100 },
]);

loadLightSwitch(scene, (lightSwitch) => {
  duplicatedLightSwitch = lightSwitch;
  console.log("Duplicated LightSwitch loaded successfully:", duplicatedLightSwitch);
});

function onMouseClick(event) {
  console.log("Clicked...");

  // Update koordinat mouse untuk raycasting
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, cam);

  // Periksa apakah klik mengenai duplicatedLightSwitch
  if (duplicatedLightSwitch) {
      const intersects = raycaster.intersectObject(duplicatedLightSwitch, true); // Periksa klik pada objek
      if (intersects.length > 0) {
          // Toggle warna lampu antara biru dan putih
          if (isBlue) {
              ambientLight.color.set(0xFFFFFF); // Warna putih
              console.log("Ambient light turned white.");
          } else {
              ambientLight.color.set(0x0000FF); // Warna biru
              console.log("Ambient light turned blue.");
          }
          isBlue = !isBlue; // Ubah status warna
      }
  }
}

window.addEventListener("mousedown", onMouseClick);

// PointerLockControls
let controls = new PointerLockControls(cam, renderer.domElement);
let clock = new THREE.Clock();

// Button for pointer lock
let btn1 = document.querySelector("#button1");
btn1.addEventListener('click', () => {
    controls.lock();
});

controls.addEventListener('lock', () => {
    btn1.innerHTML = 'Locked';
});
controls.addEventListener('unlock', () => {
    btn1.innerHTML = 'Unlocked';
});

// Keyboard input handling
let keyboard = [];
addEventListener('keydown', (e) => {
    keyboard[e.key] = true;
});
addEventListener('keyup', (e) => {
    keyboard[e.key] = false;
});

function process_keyboard(delta) {
  let speed = 800;
  let actualSpeed = speed * delta;

  // Dapatkan arah pandangan kamera
  const direction = new THREE.Vector3();
  cam.getWorldDirection(direction);

  // Vektor gerakan horizontal (tanpa komponen y)
  const forward = new THREE.Vector3(direction.x, 0, direction.z).normalize();
  const right = new THREE.Vector3().crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize();

  if (keyboard['w']) {
      const nextPosition = cam.position.clone().add(forward.clone().multiplyScalar(actualSpeed));
      const collision = checkCollision(nextPosition, scene);
      if (!collision) {
          cam.position.add(forward.clone().multiplyScalar(actualSpeed));
      }
  }

  if (keyboard['s']) {
      const nextPosition = cam.position.clone().add(forward.clone().multiplyScalar(-actualSpeed));
      const collision = checkCollision(nextPosition, scene);
      if (!collision) {
          cam.position.add(forward.clone().multiplyScalar(-actualSpeed));
      }
  }

  if (keyboard['a']) {
      const nextPosition = cam.position.clone().add(right.clone().multiplyScalar(-actualSpeed));
      const collision = checkCollision(nextPosition, scene);
      if (!collision) {
          cam.position.add(right.clone().multiplyScalar(-actualSpeed));
      }
  }

  if (keyboard['d']) {
      const nextPosition = cam.position.clone().add(right.clone().multiplyScalar(actualSpeed));
      const collision = checkCollision(nextPosition, scene);
      if (!collision) {
          cam.position.add(right.clone().multiplyScalar(actualSpeed));
      }
  }

  if (keyboard['q']) {
    const nextPosition = cam.position.clone();
    nextPosition.y += actualSpeed;
    const collision = checkCollision(nextPosition, scene);
    if (!collision) {
        cam.position.y += actualSpeed;
    }
  }

  if (keyboard['e']) {
    const nextPosition = cam.position.clone();
    nextPosition.y -= actualSpeed;
    const collision = checkCollision(nextPosition, scene);
    if (!collision) {
        cam.position.y -= actualSpeed;
    }
  }
}

  const checkCollision = (cameraPosition, scene) => {
    const cameraBoundingBox = new THREE.Box3().setFromCenterAndSize(
        cameraPosition,
        new THREE.Vector3(30, 50, 30) // Ukuran bounding box kamera
    );

    // Periksa tabrakan dengan objek lain di scene
    for (const object of scene.children) {
        if (object.userData.boundingBox) {
            if (cameraBoundingBox.intersectsBox(object.userData.boundingBox)) {
                return object.name; // Kembalikan nama objek yang bertabrakan
            }
        }
    }

    // Periksa tabrakan dengan tribun
    if (scene.userData.tribunBoundingBoxes) {
        for (const { name, boundingBox } of scene.userData.tribunBoundingBoxes) {
            if (cameraBoundingBox.intersectsBox(boundingBox)) {
                return name; // Kembalikan nama tribun yang bertabrakan
            }
        }
    }

    // collision atap
    if (scene.userData.roofBoundingBoxes) {
      for (const { name, boundingBox } of scene.userData.roofBoundingBoxes) {
          if (cameraBoundingBox.intersectsBox(boundingBox)) {
              console.log(`Collision detected with roof: ${name}`); // Debug log
              return name; // Kembalikan nama atap yang bertabrakan
          }
      }
    }

    if (scene.userData.pillarBoundingBoxes) {
      for (const { name, boundingBox } of scene.userData.pillarBoundingBoxes) {
          if (cameraBoundingBox.intersectsBox(boundingBox)) {
              console.log(`Collision detected with pillar: ${name}`);
              return name; // Kembalikan nama pilar yang bertabrakan
          }
      }
  }

  const stage = scene.getObjectByName("Stage");
  if (stage && stage.userData.boundingBox) {
      if (cameraBoundingBox.intersectsBox(stage.userData.boundingBox)) {
          console.log(`Collision detected with stage: ${stage.name}`);
          return stage.name; // Kembalikan nama stage
      }
  }

  if (scene.userData.railingBoundingBoxes) {
    for (const { name, boundingBox } of scene.userData.railingBoundingBoxes) {
        if (cameraBoundingBox.intersectsBox(boundingBox)) {
            console.log(`Collision detected with railing: ${name}`);
            return name; // Kembalikan nama railing yang bertabrakan
        }
    }
  }
  return null; // Tidak ada tabrakan
};

function updateCameraDebug() {
  const cameraPosition = cam.position;
  const direction = new THREE.Vector3();
  cam.getWorldDirection(direction); // Dapatkan arah kamera

  const positionElement = document.getElementById('camera-position');
  const directionElement = document.getElementById('camera-direction');

  if (positionElement) {
      positionElement.textContent = `x: ${cameraPosition.x.toFixed(2)}, y: ${cameraPosition.y.toFixed(2)}, z: ${cameraPosition.z.toFixed(2)}`;
  }

  if (directionElement) {
      directionElement.textContent = `x: ${direction.x.toFixed(2)}, y: ${direction.y.toFixed(2)}, z: ${direction.z.toFixed(2)}`;
  }
}


function animate() {
  let delta = clock.getDelta(); // Waktu antar frame

  // WASD movement
  process_keyboard(delta);

  updateCameraDebug();

  // Render scene
  renderer.render(scene, cam);

  // Panggil animasi berikutnya
  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
    cam.aspect = window.innerWidth / window.innerHeight;
    cam.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
import * as THREE from "three";
import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';

export function loadGaruda(scene) {
    const loader = new GLTFLoader();
    loader.load(
        './assets/model/garuda.glb',
        (gltf) => {
            const garuda = gltf.scene;
            scene.add(garuda);
            console.log("Garuda model loaded successfully!");

            // You can add additional transformations or settings for the Garuda model here
            garuda.position.set(-3000, 1400, -10);
            garuda.scale.set(100, 100, 100);
            garuda.rotation.y = Math.PI / 2; // Rotate 180 degrees around the Y-axis

            // Add lighting
            const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Bright white light
            directionalLight.position.set(0, 1, 0); // Position the light above the model
            scene.add(directionalLight);
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        (error) => {
            console.error('An error happened while loading the Garuda model:', error);
        }
    );
}

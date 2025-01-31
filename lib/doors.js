import * as THREE from 'three';
import { OBJLoader } from "https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/loaders/OBJLoader.js";

export function loadDoors(scene, woodTexture) {
    const objLoader = new OBJLoader();

    // Door positions and configurations
    const doorConfigs = [
        // Floor Level 1 (lt. 1)
        { position: [-650, 270, -2000], rotationX: Math.PI / 2 },
        { position: [-430, 270, -2000], rotationX: Math.PI / 2 },
        { position: [-700, 270, 2000], rotationX: Math.PI / 2 },
        { position: [700, 270, 2000], rotationX: Math.PI / 2 },

        // Floor Level 2 (lt. 2)
        { position: [-650, 1000, -2000], rotationX: Math.PI / 2 },
        { position: [-430, 1000, -2000], rotationX: Math.PI / 2 },
        { position: [-700, 1000, 2000], rotationX: Math.PI / 2 },
        { position: [700, 1000, 2000], rotationX: Math.PI / 2 },

        // Operator Level (lt. 3)
        { position: [2925, 1500, -500], rotationX: Math.PI / 2, rotationZ: Math.PI / 2 },
        { position: [2925, 1500, -745], rotationX: Math.PI / 2, rotationZ: Math.PI / 2 },
    ];

    // Loop through the door configurations and load each door
    doorConfigs.forEach((config, index) => {
        const doorMaterial = new THREE.MeshStandardMaterial({
            emissive: woodTexture,
            map: woodTexture
        });

        objLoader.load(
            './assets/model/door.obj',
            (object) => {
                object.traverse((child) => {
                    if (child.isMesh) {
                        child.material = doorMaterial;
                    }
                });
                object.position.set(...config.position); // Set position from config
                object.scale.set(40, 40, 40); // Adjust the scale
                object.rotation.x = config.rotationX; // Set X rotation
                if (config.rotationZ) object.rotation.z = config.rotationZ; // Set Z rotation if exists
                scene.add(object);
            },
            (xhr) => {
                console.log(`Loading ${(xhr.loaded / xhr.total) * 100}% complete`);
            },
            (error) => {
                console.error('An error happened while loading the door model:', error);
            }
        );
    });

    console.log('All doors loaded');
}

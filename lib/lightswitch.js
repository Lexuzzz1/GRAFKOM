import * as THREE from "three";
import { OBJLoader } from "https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/loaders/OBJLoader.js";

export function loadLightSwitch(scene, onLoadCallback) {
    // Path to the model
    const modelPath = "assets/model/light switch.obj";

    // Load the 3D model using OBJLoader
    const objLoader = new OBJLoader();
    objLoader.load(
        modelPath,
        (object) => {
            // Scale and position the light switch if necessary
            object.scale.set(0.2, 0.2, 0.2); // Adjust scale if needed (smaller size)
            object.position.set(-2170, 100, 4100); // Adjust position if needed
            object.rotation.y = Math.PI / 2; // Rotasi agar menghadap ke panggung

            // Add the light switch to the scene
            scene.add(object);

            // Duplicate the light switch and position it on the wall
            const duplicatedLightSwitch = object.clone();
            duplicatedLightSwitch.position.set(100, 200, 970); // Adjust position for the wall
            duplicatedLightSwitch.rotation.y = Math.PI; // Adjust rotation for the wall
            scene.add(duplicatedLightSwitch);

            // Callback after successful load
            if (onLoadCallback) onLoadCallback(duplicatedLightSwitch);
        },
        (xhr) => {
            console.log(`LightSwitch ${Math.round((xhr.loaded / xhr.total) * 100)}% loaded`);
        },
        (error) => {
            console.error("Error loading LightSwitch model:", error);
        }
    );
}

import * as THREE from "three";
import { OBJLoader } from "https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/loaders/OBJLoader.js";

export function loadTiang(scene, textureLoader, onLoadComplete) {
    const objLoader = new OBJLoader();
    const metalTexture = textureLoader.load('./assets/textures/metal.jpg');

    objLoader.load(
        './assets/model/tiang.obj',
        (tiang) => {
            console.log('Tiang Loaded:', tiang);

            // Terapkan tekstur
            tiang.traverse((child) => {
                if (child.isMesh) {
                    child.material = new THREE.MeshStandardMaterial({
                        map: metalTexture,
                        roughness: 0.7,
                        metalness: 0.3,
                    });
                }
            });

            // Atur properti tiang
            tiang.position.set(-2300, 1300, 0);
            tiang.scale.set(1, 1, 1);
            tiang.rotation.x = Math.PI / 2;
            tiang.rotation.z = Math.PI / 2;

            scene.add(tiang); // Tambahkan tiang ke scene

            onLoadComplete(tiang); // Panggil callback dengan objek tiang
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded (Tiang)');
        },
        (error) => {
            console.error('Error loading Tiang:', error);
        }
    );
}

export function duplicateTiang(scene, tiang, count, spacing = 100) {
    for (let i = 1; i <= count; i++) {
        // Clone ke kanan (positif Z)
        const tiangCloneRight = tiang.clone();
        tiangCloneRight.position.z += i * spacing;
        scene.add(tiangCloneRight);

        // Clone ke kiri (negatif Z)
        const tiangCloneLeft = tiang.clone();
        tiangCloneLeft.position.z -= i * spacing;
        scene.add(tiangCloneLeft);
    }
}

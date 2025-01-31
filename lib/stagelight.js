import * as THREE from "three";
import { OBJLoader } from "https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/loaders/OBJLoader.js";

export function loadStagelight(scene, textureLoader, tiang, onLoadComplete) {
    const objLoader = new OBJLoader();
    const glassTexture = textureLoader.load('./assets/textures/glass_01_displace.jpg');
    const clothTexture = textureLoader.load('./assets/textures/cloth_11.jpg');
    const defaultTexture = textureLoader.load('./assets/textures/01.jpg');

    objLoader.load(
        './assets/model/stagelight.obj',
        (stagelight) => {
            console.log('Stagelight Loaded:', stagelight);

            // Terapkan tekstur
            stagelight.traverse((child) => {
                if (child.isMesh) {
                    if (child.name.includes('glass')) {
                        child.material = new THREE.MeshStandardMaterial({
                            map: glassTexture,
                            roughness: 0.3,
                            metalness: 0.9,
                        });
                    } else if (child.name.includes('cloth')) {
                        child.material = new THREE.MeshStandardMaterial({
                            map: clothTexture,
                            roughness: 0.7,
                            metalness: 0.2,
                        });
                    } else {
                        child.material = new THREE.MeshStandardMaterial({
                            map: defaultTexture,
                            roughness: 0.5,
                            metalness: 0.5,
                        });
                    }
                }
            });

            // Atur posisi stagelight di bawah tiang
            stagelight.position.set(tiang.position.x, tiang.position.y - 20, tiang.position.z);
            stagelight.scale.set(4, 4, 4);
            stagelight.rotation.x = -Math.PI;
            stagelight.rotation.y = Math.PI / 2;

            scene.add(stagelight); // Tambahkan stagelight ke scene

            onLoadComplete(stagelight); // Panggil callback dengan objek stagelight
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded (Stagelight)');
        },
        (error) => {
            console.error('Error loading Stagelight:', error);
        }
    );
}

export function duplicateStagelight(scene, stagelight, count, spacing = 200) {
    for (let i = 1; i <= count; i++) {
        // Clone ke kanan (positif Z)
        const stagelightCloneRight = stagelight.clone();
        stagelightCloneRight.position.z += i * spacing;
        scene.add(stagelightCloneRight);

        // Clone ke kiri (negatif Z)
        const stagelightCloneLeft = stagelight.clone();
        stagelightCloneLeft.position.z -= i * spacing;
        scene.add(stagelightCloneLeft);
    }
}

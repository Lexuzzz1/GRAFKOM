import * as THREE from 'three';
import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';

export function loadRailings(scene) {
    const railingLoader = new GLTFLoader();

    railingLoader.load(
        './assets/model/railing.glb',
        (gltf) => {
            const railingParts = [];

            gltf.scene.traverse((child) => {
                if (child.isMesh) {
                    railingParts.push({
                        geometry: child.geometry,
                        material: new THREE.MeshStandardMaterial({
                            color: 0xaaaaaa,
                            metalness: 0.8,
                            roughness: 0.2,
                        }),
                        matrix: child.matrixWorld.clone(),
                    });
                }
            });

            if (railingParts.length === 0) {
                console.error('No mesh found in the loaded model!');
                return;
            }

            const instancedMeshes = [];
            const spacing = 66;

            const railingConfigs = [
                { rows: 1, cols: 35, x: 1022, z: -974, rotationY: -Math.PI / 2, scale: 75 },
                { rows: 31, cols: 1, x: -2825, z: 1220, rotationY: 0, scale: 75 },
                { rows: 31, cols: 1, x: -2825, z: -1160, rotationY: 0, scale: 75 },
            ];

            const boundingBoxes = [];

            railingConfigs.forEach((config, idx) => {
                railingParts.slice(0, 3).forEach((part) => {
                    const instancedMesh = new THREE.InstancedMesh(part.geometry, part.material, config.rows * config.cols);
                    const dummy = new THREE.Object3D();

                    for (let i = 0; i < config.rows; i++) {
                        for (let j = 0; j < config.cols; j++) {
                            dummy.position.set(config.x + i * spacing * 2, 850, config.z + j * spacing);
                            dummy.rotation.y = config.rotationY;
                            dummy.scale.set(config.scale, config.scale, config.scale);
                            dummy.updateMatrix();

                            const instanceMatrix = new THREE.Matrix4();
                            instanceMatrix.multiplyMatrices(dummy.matrix, part.matrix);
                            instancedMesh.setMatrixAt(i * config.cols + j, instanceMatrix);

                            // Tambahkan bounding box untuk railing
                            const boundingBox = new THREE.Box3().setFromCenterAndSize(
                                dummy.position.clone(),
                                new THREE.Vector3(config.scale * 2, config.scale * 5, config.scale * 2) // Approximate size
                            );

                            boundingBoxes.push({ name: `Railing_${idx}_${i}_${j}`, boundingBox });
                        }
                    }

                    instancedMeshes.push(instancedMesh);
                    scene.add(instancedMesh);
                });
            });

            scene.userData.railingBoundingBoxes = boundingBoxes; // Simpan bounding boxes di userData scene
            console.log('Instanced meshes created and properly aligned');
        },
        (xhr) => {
            console.log(`Loading ${(xhr.loaded / xhr.total) * 100}% complete`);
        },
        (error) => {
            console.error('An error happened while loading the model:', error);
        }
    );
}

import * as THREE from "three";
import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';

export function loadChair(scene) {
    const loader = new GLTFLoader();
    loader.load(
        './assets/model/chair.glb',
        (gltf) => {
            // Set seat material to black
            gltf.scene.traverse((child) => {
                if (child.isMesh && child.name.includes("Seat")) { // Adjust the condition based on the seat's actual name
                    child.material = new THREE.MeshStandardMaterial({ color: 0x000000 });
                }
            });

            // First set of rows (8 rows and 7 columns)
            for (let row = 0; row < 8; row++) {
                for (let col = 0; col < 7; col++) {
                    const chair = gltf.scene.clone();
                    scene.add(chair);
                    console.log("Chair model loaded successfully!");

                    chair.position.set(-1500 + (col * 200), 0, -350 + (row * 100));
                    chair.rotation.y = THREE.MathUtils.degToRad(-90);
                    chair.scale.set(100, 100, 100);
                }
            }

            for (let row = 0; row < 8; row++) {
                for (let col = 0; col < 14; col++) {
                    const chair = gltf.scene.clone();
                    scene.add(chair);
                    console.log("Chair model loaded successfully!");

                    // Move the second set of chairs by adding the row offset (500 units)
                    chair.position.set(250 + (col * 200), 0, -350 + (row * 100));
                    chair.rotation.y = THREE.MathUtils.degToRad(-90);
                    chair.scale.set(100, 100, 100);
                }
            }

            for (let row = 0; row < 6; row++) {
                for (let col = 0; col < 12; col++) {
                    const chair = gltf.scene.clone();
                    scene.add(chair);
                    console.log("Chair model loaded successfully!");
            
                    chair.position.set(
                        350 + (col * 200) + (row * 50), 0, -1800 + (row * 100)
                    );
                    chair.rotation.y = THREE.MathUtils.degToRad(-70);
                    chair.scale.set(100, 100, 100);
                }
            }
            for (let row = 0; row < 6; row++) {
                for (let col = 0; col < 12; col++) {
                    const chair = gltf.scene.clone();
                    scene.add(chair);
                    console.log("Chair model loaded successfully!");
            
                    // Adjust positions to create a diagonal to the right
                    chair.position.set(500 + (col * 200) - (row * 50), 0, 1200 + (row * 100));
                    chair.rotation.y = THREE.MathUtils.degToRad(-110);
                    chair.scale.set(100, 100, 100);
                }
            }
            

            for (let row = 0; row < 13; row++) {
                for (let col = 0; col < 2; col++) {
                    const chair = gltf.scene.clone();
                    scene.add(chair);
                    console.log("Chair model loaded successfully!");

                    // Move the second set of chairs by adding the row offset (500 units)
                    chair.position.set(1400 + (col * 200), 750, -600 + (row * 100));
                    chair.rotation.y = THREE.MathUtils.degToRad(-90);
                    chair.scale.set(100, 100, 100);
                }
            }

            for (let row = 0; row < 6; row++) {
                for (let col = 0; col < 2; col++) {
                    const chair = gltf.scene.clone();
                    scene.add(chair);
                    console.log("Chair model loaded successfully!");

                    // Move the second set of chairs by adding the row offset (500 units)
                    chair.position.set(1400 + (col * 200), 750, -1800 + (row * 100));
                    chair.rotation.y = THREE.MathUtils.degToRad(-90);
                    chair.scale.set(100, 100, 100);
                }
            }

            for (let row = 0; row < 6; row++) {
                for (let col = 0; col < 2; col++) {
                    const chair = gltf.scene.clone();
                    scene.add(chair);
                    console.log("Chair model loaded successfully!");

                    // Move the second set of chairs by adding the row offset (500 units)
                    chair.position.set(1400 + (col * 200), 750, 1300 + (row * 100));
                    chair.rotation.y = THREE.MathUtils.degToRad(-90);
                    chair.scale.set(100, 100, 100);
                }
            }

            for (let row = 0; row < 2; row++) {
                for (let col = 0; col < 40; col++) {
                    const chair = gltf.scene.clone();
                    scene.add(chair);
                    console.log("Chair model loaded successfully!");

                    // Move the second set of chairs by adding the row offset (500 units)
                    chair.position.set(-2800 + (col * 100), 750, 1400 + (row * 200));
                    chair.rotation.y = THREE.MathUtils.degToRad(-180);
                    chair.scale.set(100, 100, 100);
                }
            }

            for (let row = 0; row < 2; row++) {
                for (let col = 0; col < 40; col++) {
                    const chair = gltf.scene.clone();
                    scene.add(chair);
                    console.log("Chair model loaded successfully!");

                    // Move the second set of chairs by adding the row offset (500 units)
                    chair.position.set(-2800 + (col * 100), 750, -1600 + (row * 200));
                    chair.scale.set(100, 100, 100);
                }
            }

            let yOffset = 850;

            for (let col = 0; col < 3; col++) {
                for (let row = 0; row < 13; row++) {
                    const chair = gltf.scene.clone();
                    scene.add(chair);
                    console.log("Chair model loaded successfully!");

                    chair.position.set(1850 + (col * 200), yOffset, -600 + (row * 100));
                    chair.rotation.y = THREE.MathUtils.degToRad(-90);
                    chair.scale.set(100, 100, 100);
                }
                yOffset += 100;
            }

            yOffset = 850;

            for (let col = 0; col < 3; col++) {
                for (let row = 0; row < 10; row++) {
                    const chair = gltf.scene.clone();
                    scene.add(chair);
                    console.log("Chair model loaded successfully!");

                    chair.position.set(1850 + (col * 200), yOffset, -1800 + (row * 100));
                    chair.rotation.y = THREE.MathUtils.degToRad(-90);
                    chair.scale.set(100, 100, 100);
                }
                yOffset += 100;
            }

            yOffset = 850;

            for (let col = 0; col < 3; col++) {
                for (let row = 0; row < 10; row++) {
                    const chair = gltf.scene.clone();
                    scene.add(chair);
                    console.log("Chair model loaded successfully!");

                    chair.position.set(1850 + (col * 200), yOffset, 900 + (row * 100));
                    chair.rotation.y = THREE.MathUtils.degToRad(-90);
                    chair.scale.set(100, 100, 100);
                }
                yOffset += 100;
            }

        },
        // Optionally, you can include loading and error handlers
        (xhr) => {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        (error) => {
            console.error('An error happened while loading the chair model:', error);
        }
    );
}

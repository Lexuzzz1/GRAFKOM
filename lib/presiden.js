import * as THREE from "three";
import { OBJLoader } from "https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/loaders/OBJLoader.js";

export function loadPresiden(scene) {
    const loader = new OBJLoader();
    const textureLoader = new THREE.TextureLoader();
    const prabowo_texture = textureLoader.load('./assets/textures/prabowo.jpg');
    
    loader.load(
        '/model/SM_frame_01.obj',
        function (object) {
            object.traverse(function (child) {
                if (child.isMesh) {
                    child.material = new THREE.MeshStandardMaterial({
                        map: prabowo_texture,
                                          
                    }); // Apply texture to the mesh
                }
            });
            object.position.set(-2800, 1400, -50);
            object.scale.set(500,500,500);
            scene.add(object);
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.error('An error happened', error);
        }
    );
}
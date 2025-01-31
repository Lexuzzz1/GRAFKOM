import * as THREE from "three";

// Fungsi untuk membuat dan mengembalikan stage
export function createStage(textureLoader) {
    const floorTexture = textureLoader.load('../assets/textures/floor.jpg');

    // Stage material and geometry
    const stageMaterial = new THREE.MeshStandardMaterial({
        color: 0x3E2723,
        map: floorTexture, // Texture for the stage
    });

    const stageGeometry = new THREE.CylinderGeometry(1000, 1000, 200, 32, 1, false, 0, Math.PI); // Semi-circle

    const stage = new THREE.Mesh(stageGeometry, stageMaterial);
    stage.scale.x = 1; // Ensure geometry is flipped properly
    stage.position.set(-3000, 100, 0); // Position the stage

    // Tambahkan bounding box untuk stage
    const stageBoundingBox = new THREE.Box3().setFromCenterAndSize(
        new THREE.Vector3(stage.position.x, stage.position.y, stage.position.z),
        new THREE.Vector3(2000, 570, 1000) // Ukuran bounding box (approximation of the semi-circle shape)
    );

    stage.userData.boundingBox = stageBoundingBox;
    stage.name = "Stage";

    return stage;
}

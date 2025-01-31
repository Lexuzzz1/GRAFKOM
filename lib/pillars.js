import * as THREE from "three";

export function addPillars(scene, texture) {
    const pillarPositions = [
        // Right Pillars
        { x: 1400, y: 1000, z: 1000 },
        { x: 100, y: 1000, z: 1100 },
        { x: -1100, y: 1000, z: 1100 },
        { x: -2300, y: 1000, z: 1100 },
        // Left Pillars
        { x: 1400, y: 1000, z: -1000 },
        { x: 100, y: 1000, z: -1100 },
        { x: -1100, y: 1000, z: -1100 },
        { x: -2300, y: 1000, z: -1100 },
    ];

    const pillarGeometry = new THREE.BoxGeometry(250, 2000, 250);
    const pillarMaterial = new THREE.MeshStandardMaterial({
        color: 0xF5F5DC,
        map: texture,
        emissiveMap: texture,
    });

    const instancedMesh = new THREE.InstancedMesh(
        pillarGeometry,
        pillarMaterial,
        pillarPositions.length
    );

    const pillarBoundingBoxes = [];

    pillarPositions.forEach((position, index) => {
        const matrix = new THREE.Matrix4();
        matrix.setPosition(position.x, position.y, position.z);
        instancedMesh.setMatrixAt(index, matrix);

        // Buat bounding box untuk pilar dengan offset posisi
        const boundingBox = new THREE.Box3().setFromCenterAndSize(
            new THREE.Vector3(position.x, position.y, position.z),
            new THREE.Vector3(250, 2000, 250) // Ukuran pilar
        );

        pillarBoundingBoxes.push({ name: `Pillar${index + 1}`, boundingBox });
        console.log(`Bounding box created for Pillar${index + 1}:`, boundingBox);
    });

    scene.userData.pillarBoundingBoxes = pillarBoundingBoxes; // Simpan bounding boxes di userData
    scene.add(instancedMesh);
}

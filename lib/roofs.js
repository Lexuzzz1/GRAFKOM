import * as THREE from 'three';

export function createRoof(scene, wood_texture2) {
    const roofGeometry = new THREE.BoxGeometry(1300, 50, 2400);
    const roofMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x8B4513, // wood color
        map: wood_texture2,
        emissiveMap: wood_texture2,
    });
    const roofCount = 54; 
    const roofInstancedMesh = new THREE.InstancedMesh(roofGeometry, roofMaterial, roofCount);
    const dummy = new THREE.Object3D();

    // Array untuk menyimpan bounding box atap
    const roofBoundingBoxes = [];

    // Position and rotation for the left roofs
    for (let i = 0; i < 27; i++) {
        dummy.position.set(2450 + i * -215, 2000, 800); 
        dummy.rotation.z = THREE.MathUtils.degToRad(10);
        dummy.updateMatrix();
        roofInstancedMesh.setMatrixAt(i, dummy.matrix);

        // Buat bounding box untuk instansi atap ini
        const boundingBox = new THREE.Box3().setFromCenterAndSize(
            new THREE.Vector3(dummy.position.x, dummy.position.y-100, dummy.position.z),
            new THREE.Vector3(1300, 50, 2400) // Ukuran bounding box
        );

        roofBoundingBoxes.push({ name: `Roof${i + 1}`, boundingBox });
    }

    // Position and rotation for the right roofs
    for (let i = 0; i < 27; i++) {
        dummy.position.set(2450 + i * -215, 2000, -800); // Adjust the spacing as needed
        dummy.rotation.z = THREE.MathUtils.degToRad(10);
        dummy.updateMatrix();
        roofInstancedMesh.setMatrixAt(27 + i, dummy.matrix);

        // Buat bounding box untuk instansi atap ini
        const boundingBox = new THREE.Box3().setFromCenterAndSize(
            new THREE.Vector3(dummy.position.x, dummy.position.y, dummy.position.z),
            new THREE.Vector3(1300, 50, 2400) // Ukuran bounding box
        );

        roofBoundingBoxes.push({ name: `Roof${27 + i + 1}`, boundingBox });
    }

    // Simpan bounding box atap di scene.userData
    scene.userData.roofBoundingBoxes = roofBoundingBoxes;

    scene.add(roofInstancedMesh);

    // Debug log untuk memastikan bounding box dibuat dengan benar
    console.log("Roof bounding boxes:", roofBoundingBoxes);
}

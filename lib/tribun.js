import * as THREE from "three";

export function addTribunes(scene, woodTexture) {
    const tribunGeometry = new THREE.BoxGeometry(1, 1, 1);
    const tribunMaterial = new THREE.MeshStandardMaterial({
        color: 0x8B4513,
        map: woodTexture,
        emissiveMap: woodTexture,
    });

    const tribunes = new THREE.InstancedMesh(tribunGeometry, tribunMaterial, 8);

    const sizes = [
        { width: 900, height: 100, depth: 4000, position: [1500, 700, 0], name: "Tribun1" },
        { width: 700, height: 100, depth: 4000, position: [2100, 800, 0], name: "Tribun2" },
        { width: 700, height: 100, depth: 4000, position: [2300, 900, 0], name: "Tribun3" },
        { width: 700, height: 100, depth: 4000, position: [2500, 1000, 0], name: "Tribun4" },
        { width: 600, height: 200, depth: 4000, position: [2700, 1100, 0], name: "Tribun5" },
        { width: 6000, height: 100, depth: 800, position: [0, 700, -1600], name: "Tribun6" },
        { width: 50, height: 800, depth: 4000, position: [2950, 1600, 0], name: "Tribun7" },
        { width: 6000, height: 100, depth: 800, position: [0, 700, 1600], name: "Tribun8" },
    ];

    const boundingBoxes = [];

    sizes.forEach((size, i) => {
        const matrix = new THREE.Matrix4();
        matrix.makeScale(size.width, size.height, size.depth);
        matrix.setPosition(...size.position);
        tribunes.setMatrixAt(i, matrix);

        // Tambahkan offset ke tinggi bounding box
        const boundingBox = new THREE.Box3().setFromCenterAndSize(
            new THREE.Vector3(size.position[0], size.position[1] + 170, size.position[2]), // Tinggi ditambah offset 270
            new THREE.Vector3(size.width, size.height + 170, size.depth) // Tinggi bounding box diperbesar dengan offset 270
        );

        boundingBoxes.push({ name: size.name, boundingBox });
        console.log(`Bounding box created for ${size.name}:`, boundingBox); // Debug log
    });

    tribunes.instanceMatrix.needsUpdate = true;
    scene.userData.tribunBoundingBoxes = boundingBoxes; // Simpan bounding box
    scene.add(tribunes);
}

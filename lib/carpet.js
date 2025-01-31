import * as THREE from "three";

export function addCarpet(scene, textureLoader) {
    // Muat tekstur karpet merah
    const carpetTexture = textureLoader.load('./assets/textures/carpet.png');
    carpetTexture.wrapS = THREE.RepeatWrapping;
    carpetTexture.wrapT = THREE.RepeatWrapping;

    const carpetMaterial = new THREE.MeshStandardMaterial({
        color: 0x800000,
        map: carpetTexture,
        roughness: 0.8,
        side: THREE.DoubleSide,
    });

    // Fungsi untuk membuat bagian karpet
    function createCarpetSection(width, height, position) {
        const carpetGeometry = new THREE.PlaneGeometry(width, height);

        // Set jumlah pengulangan tekstur berdasarkan ukuran geometri
        carpetTexture.repeat.set(width / 200, height / 200);

        const carpet = new THREE.Mesh(carpetGeometry, carpetMaterial);
        carpet.rotation.x = -Math.PI / 2; // Letakkan horizontal
        carpet.position.set(position.x, position.y, position.z);
        return carpet;
    }

    // Bagian sisi kanan dan kiri
    const sideCarpetWidth = 400; // Lebar karpet sisi
    const sideCarpetHeight = 3000; // Tinggi karpet sisi

    // Sisi kiri
    const middleCarpet = createCarpetSection(900, 300, { x: 0, y: 1, z: 0 });
    middleCarpet.rotation.z = Math.PI / 2;
    scene.add(middleCarpet);

    // Bagian bawah (horizontal di depan panggung)
    const rightCarpet = createCarpetSection(6400, 300, { x: -200, y: 1, z: -600 });
    scene.add(rightCarpet);
    
    const rightDiagonalCarpet = createCarpetSection(2000, 300, { x: -500, y: 1, z: -1400 });
    rightDiagonalCarpet.rotation.z = THREE.MathUtils.degToRad(-60);
    scene.add(rightDiagonalCarpet);

    // Bagian atas (horizontal di belakang panggung)
    const leftCarpet = createCarpetSection(6400, 300, { x: -200, y: 1, z: 600 });
    scene.add(leftCarpet);

    const leftDiagonalCarpet = createCarpetSection(2000, 300, { x: -500, y: 1, z: 1400 });
    leftDiagonalCarpet.rotation.z = THREE.MathUtils.degToRad(60);
    scene.add(leftDiagonalCarpet);

    const carpetCylinderGeo = new THREE.CylinderGeometry(1100, 1100, 1, 32, 1, false, 0, Math.PI); // Semi-circle
    
    const carpetCylinder = new THREE.Mesh(carpetCylinderGeo, carpetMaterial);
    carpetCylinder.scale.x = 1; // Ensure geometry is flipped properly
    carpetCylinder.position.set(-3000, 0, 0); // Position the stage
    scene.add(carpetCylinder);
}

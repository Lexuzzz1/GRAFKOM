import * as THREE from "three";

export function createTV(scene, position = { x: 0, y: 10, z: 0 }) {
    // Tubuh TV (kotak tipis untuk LED TV)
    const tvBodyGeometry = new THREE.BoxGeometry(12, 7, 0.5);
    const tvBodyMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
    const tvBody = new THREE.Mesh(tvBodyGeometry, tvBodyMaterial);

    // Layar TV (plane)
    const screenGeometry = new THREE.PlaneGeometry(11, 6);
    const screenMaterial = new THREE.MeshStandardMaterial({
        color: 0x000000,
        emissive: 0x000000,
        emissiveIntensity: 0.5,
    });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);

    // Posisi layar TV
    screen.position.set(0, 0, 0.26);
    
    tvBody.add(screen);

    // Atur posisi dan skala TV
    tvBody.position.set(position.x, position.y, position.z);
    tvBody.rotation.y = Math.PI / 2;
    tvBody.scale.set(15, 15, 15);

    scene.add(tvBody);
    return tvBody;
}

export function duplicateTV(scene, originalTV, positions) {
    positions.forEach((pos) => {
        const tvClone = originalTV.clone();
        tvClone.position.set(pos.x, pos.y, pos.z);
        scene.add(tvClone);
    });
}

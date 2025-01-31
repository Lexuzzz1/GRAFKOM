import * as THREE from 'three';

export function createTribunWalls(scene, wall_texture) {
    // Tembok tribun kiri
    const tembokTribunGeometry = new THREE.BoxGeometry(4100, 150, 50);
    const tembokTribunMaterial = new THREE.MeshStandardMaterial({ 
        // color: 0xffffff, // wood color
        map: wall_texture,
        emissiveMap: wall_texture,
    });
    const tembokTribun = new THREE.Mesh(tembokTribunGeometry, tembokTribunMaterial);
    tembokTribun.position.set(-975, 750, -1190);
    scene.add(tembokTribun);

    // Tembok tribun kanan
    const tembokTribunGeometry2 = new THREE.BoxGeometry(4100, 150, 50);
    const tembokTribunMaterial2 = new THREE.MeshStandardMaterial({ 
        // color: 0xffffff, // wood color
        map: wall_texture,
        emissiveMap: wall_texture,
    });
    const tembokTribun2 = new THREE.Mesh(tembokTribunGeometry2, tembokTribunMaterial2);
    tembokTribun2.position.set(-975, 750, 1190);
    scene.add(tembokTribun2);

    // Tembok tribun tengah
    const tembokTribunGeometry3 = new THREE.BoxGeometry(50, 150, 2400);
    const tembokTribunMaterial3 = new THREE.MeshStandardMaterial({ 
        // color: 0xffffff, // wood color
        map: wall_texture,
        emissiveMap: wall_texture,
    });
    const tembokTribun3 = new THREE.Mesh(tembokTribunGeometry3, tembokTribunMaterial3);
    tembokTribun3.position.set(1050, 750, 15);
    scene.add(tembokTribun3);
}

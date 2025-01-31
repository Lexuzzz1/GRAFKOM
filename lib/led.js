import * as THREE from "three";

// Fungsi untuk menambahkan LED Videotron dengan video ke scene
export function addLedVideotron(scene) {
    // Buat elemen video HTML
    const video = document.createElement("video");
    video.src = "./assets/videos/sample.mp4"; // Path ke file video lokal (atau streaming)
    video.loop = true; // Loop video
    video.muted = true; // Pastikan video tidak bersuara untuk autoplay
    video.playsInline = true; // Untuk kompatibilitas di perangkat mobile
    video.autoplay = true; // Autoplay diaktifkan
    video.play();

    // Buat video texture dari elemen video
    const videoTexture = new THREE.VideoTexture(video);

    // Geometry dan Material untuk LED Videotron
    const ledGeometry = new THREE.PlaneGeometry(1800, 1000); // Ukuran LED
    const ledMaterial = new THREE.MeshStandardMaterial({
        map: videoTexture,
        side: THREE.DoubleSide, // Menampilkan kedua sisi
        roughness: 0.8,
        emissive: 0x101010, // Sedikit bercahaya
        emissiveMap: videoTexture,
    });

    // Buat Mesh untuk LED
    const ledScreen = new THREE.Mesh(ledGeometry, ledMaterial);

    // Atur posisi LED di belakang panggung
    ledScreen.position.set(-2992, 700, 0); // Tinggi dan posisi
    ledScreen.rotation.y = Math.PI / 2; // Rotasi agar menghadap ke panggung

    // Tambahkan LED ke scene
    scene.add(ledScreen);
}

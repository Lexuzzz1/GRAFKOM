import * as THREE from "three";

export function addFloor(scene, floorTexture) {
  const floorGeometry = new THREE.PlaneGeometry(6000, 4000);
  const floorMaterial = new THREE.MeshStandardMaterial({
    color: 0x3e2723,
    side: THREE.DoubleSide,
    map: floorTexture,
    emissiveMap: floorTexture,
  });

  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;

  // collision body
  const boundingBox = new THREE.Box3().setFromCenterAndSize(
    new THREE.Vector3(0, 170, 0), 
    new THREE.Vector3(6000, 170, 4000) 
  );

  floor.userData.boundingBox = boundingBox; 
  floor.name = "floor";

  scene.add(floor);
}

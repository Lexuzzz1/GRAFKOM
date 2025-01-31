import * as THREE from "three";

export function addWalls(scene, textures) {
  const { frontWallTexture, backWallTexture, leftWallTexture, rightWallTexture } = textures;

  // Front Wall
  const frontWallGeometry = new THREE.BoxGeometry(6000, 2100, 10);
  const frontWallMaterial = new THREE.MeshStandardMaterial({
    color: 0x808080,
    map: frontWallTexture,
    emissiveMap: frontWallTexture,
  });
  const frontWall = new THREE.Mesh(frontWallGeometry, frontWallMaterial);
  frontWall.position.set(0, 1050, 2000);
  frontWall.name = "frontWall";
  scene.add(frontWall);

  // Perbarui bounding box
  frontWall.userData.boundingBox = new THREE.Box3().setFromObject(frontWall);

  // Back Wall
  const backWallGeometry = new THREE.BoxGeometry(6000, 2100, 10);
  const backWallMaterial = new THREE.MeshStandardMaterial({
    color: 0x808080,
    map: backWallTexture,
    emissiveMap: backWallTexture,
  });
  const backWall = new THREE.Mesh(backWallGeometry, backWallMaterial);
  backWall.position.set(0, 1050, -2000);
  backWall.name = "backWall";
  scene.add(backWall);

  // Perbarui bounding box
  backWall.userData.boundingBox = new THREE.Box3().setFromObject(backWall);

  // Left Wall
  const leftWallGeometry = new THREE.BoxGeometry(10, 2100, 4000);
  const leftWallMaterial = new THREE.MeshStandardMaterial({
    color: 0x808080,
    map: leftWallTexture,
    emissiveMap: leftWallTexture,
  });
  const leftWall = new THREE.Mesh(leftWallGeometry, leftWallMaterial);
  leftWall.position.set(-3000, 1050, 0);
  leftWall.name = "leftWall";
  scene.add(leftWall);

  // Perbarui bounding box
  leftWall.userData.boundingBox = new THREE.Box3().setFromObject(leftWall);

  // Right Wall
  const rightWallGeometry = new THREE.BoxGeometry(10, 2100, 4000);
  const rightWallMaterial = new THREE.MeshStandardMaterial({
    color: 0x808080,
    map: rightWallTexture,
    emissiveMap: rightWallTexture,
  });
  const rightWall = new THREE.Mesh(rightWallGeometry, rightWallMaterial);
  rightWall.position.set(3000, 1050, 0);
  rightWall.name = "rightWall";
  scene.add(rightWall);

  // Perbarui bounding box
  rightWall.userData.boundingBox = new THREE.Box3().setFromObject(rightWall);
}

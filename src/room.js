import * as THREE from "three"
import { createFloorTexture } from "./textures.js"

export function buildProceduralRoom(scene, roomSize) {
  const { width, height, depth } = roomSize

  const floorGeo = new THREE.PlaneGeometry(width, depth)
  const floorMat = new THREE.MeshStandardMaterial({
    map: createFloorTexture(),
    roughness: 0.4,
    metalness: 0.1,
  })
  const floor = new THREE.Mesh(floorGeo, floorMat)
  floor.rotation.x = -Math.PI / 2
  floor.position.y = -height / 2
  floor.receiveShadow = true
  scene.add(floor)

  const ceilingGeo = new THREE.PlaneGeometry(width, depth)
  const ceilingMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    roughness: 0.9,
  })
  const ceiling = new THREE.Mesh(ceilingGeo, ceilingMat)
  ceiling.rotation.x = Math.PI / 2
  ceiling.position.y = height / 2
  scene.add(ceiling)

  const wallMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.8,
  })

  const wallN = new THREE.Mesh(new THREE.PlaneGeometry(width, height), wallMat)
  wallN.position.set(0, 0, -depth / 2)
  scene.add(wallN)

  const wallS = new THREE.Mesh(new THREE.PlaneGeometry(width, height), wallMat)
  wallS.position.set(0, 0, depth / 2)
  wallS.rotation.y = Math.PI
  scene.add(wallS)

  const wallE = new THREE.Mesh(new THREE.PlaneGeometry(depth, height), wallMat)
  wallE.position.set(width / 2, 0, 0)
  wallE.rotation.y = -Math.PI / 2
  scene.add(wallE)

  const wallW = new THREE.Mesh(new THREE.PlaneGeometry(depth, height), wallMat)
  wallW.position.set(-width / 2, 0, 0)
  wallW.rotation.y = Math.PI / 2
  scene.add(wallW)

  const trimMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    roughness: 0.5,
  })
  const trimNorth = new THREE.Mesh(
    new THREE.BoxGeometry(width, 0.3, 0.1),
    trimMat,
  )
  trimNorth.position.set(0, -height / 2 + 0.15, -depth / 2 + 0.05)
  scene.add(trimNorth)
}

export function buildRoomFurniture(scene, roomSize) {
  const rugGeo = new THREE.PlaneGeometry(8, 6)
  const rugMat = new THREE.MeshStandardMaterial({
    color: 0x1e1b4b,
    roughness: 0.9,
  })
  const rug = new THREE.Mesh(rugGeo, rugMat)
  rug.rotation.x = -Math.PI / 2
  rug.position.set(0, -roomSize.height / 2 + 0.01, 0)
  rug.receiveShadow = true
  scene.add(rug)

  const deskGroup = new THREE.Group()

  const deskTopGeo = new THREE.BoxGeometry(3.5, 0.1, 1.6)
  const deskMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    roughness: 0.3,
    metalness: 0.2,
  })
  const deskTop = new THREE.Mesh(deskTopGeo, deskMat)
  deskTop.position.set(0, -2.5, 0)
  deskTop.castShadow = true
  deskTop.receiveShadow = true
  deskGroup.add(deskTop)

  const legGeo = new THREE.CylinderGeometry(0.04, 0.04, 2)
  const legMat = new THREE.MeshStandardMaterial({
    color: 0x475569,
    metalness: 0.8,
    roughness: 0.2,
  })
  const legPositions = [
    [-1.6, -3.5, -0.7],
    [1.6, -3.5, -0.7],
    [-1.6, -3.5, 0.7],
    [1.6, -3.5, 0.7],
  ]
  legPositions.forEach((pos) => {
    const leg = new THREE.Mesh(legGeo, legMat)
    leg.position.set(...pos)
    leg.castShadow = true
    deskGroup.add(leg)
  })

  const laptopBase = new THREE.Mesh(
    new THREE.BoxGeometry(0.6, 0.02, 0.45),
    new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.8,
      roughness: 0.2,
    }),
  )
  laptopBase.position.set(0, -2.44, 0)
  deskGroup.add(laptopBase)

  const laptopScreen = new THREE.Mesh(
    new THREE.BoxGeometry(0.6, 0.4, 0.02),
    new THREE.MeshStandardMaterial({
      color: 0x020617,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.3,
    }),
  )
  laptopScreen.position.set(0, -2.2, -0.2)
  laptopScreen.rotation.x = -0.2
  deskGroup.add(laptopScreen)

  scene.add(deskGroup)
}

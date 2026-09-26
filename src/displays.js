import * as THREE from "three"
import { PROJECTS_DATA } from "./config.js"
import { createProjectCanvasTexture } from "./textures.js"

export function buildWallDisplays(scene, interactiveMeshes) {
  buildTVDisplay(scene, interactiveMeshes)
  buildWhiteboardDisplay(scene, interactiveMeshes)
  buildPictureDisplay(scene, interactiveMeshes)
  buildHologramDisplay(scene, interactiveMeshes)
}

function buildTVDisplay(scene, interactiveMeshes) {
  const tvGroup = new THREE.Group()
  tvGroup.position.set(0, 0.8, -8.8)

  const tvFrameGeo = new THREE.BoxGeometry(5.2, 3.2, 0.15)
  const tvFrameMat = new THREE.MeshStandardMaterial({
    color: 0x090d16,
    roughness: 0.2,
    metalness: 0.8,
  })
  const tvFrame = new THREE.Mesh(tvFrameGeo, tvFrameMat)
  tvFrame.castShadow = true
  tvGroup.add(tvFrame)

  const tvTextureObj = createProjectCanvasTexture(PROJECTS_DATA.north)
  PROJECTS_DATA.north.canvas = tvTextureObj.canvas

  const tvScreenGeo = new THREE.PlaneGeometry(5.0, 3.0)
  const tvScreenMat = new THREE.MeshStandardMaterial({
    map: tvTextureObj.texture,
    roughness: 0.3,
    emissiveMap: tvTextureObj.texture,
    emissive: 0xffffff,
    emissiveIntensity: 0.15,
  })
  const tvScreen = new THREE.Mesh(tvScreenGeo, tvScreenMat)
  tvScreen.position.z = 0.08
  tvScreen.userData = { project: PROJECTS_DATA.north }
  tvGroup.add(tvScreen)
  interactiveMeshes.push(tvScreen)

  const tvGlowGeo = new THREE.PlaneGeometry(5.4, 3.4)
  const tvGlowMat = new THREE.MeshBasicMaterial({
    color: 0x6366f1,
    opacity: 0.25,
    transparent: true,
  })
  const tvGlow = new THREE.Mesh(tvGlowGeo, tvGlowMat)
  tvGlow.position.z = -0.01
  tvGroup.add(tvGlow)

  scene.add(tvGroup)
}

function buildWhiteboardDisplay(scene, interactiveMeshes) {
  const wbGroup = new THREE.Group()
  wbGroup.position.set(8.8, 0.8, 0)
  wbGroup.rotation.y = -Math.PI / 2

  const wbFrameGeo = new THREE.BoxGeometry(5.2, 3.2, 0.1)
  const wbFrameMat = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    metalness: 0.9,
    roughness: 0.2,
  })
  const wbFrame = new THREE.Mesh(wbFrameGeo, wbFrameMat)
  wbGroup.add(wbFrame)

  const trayGeo = new THREE.BoxGeometry(4.8, 0.08, 0.2)
  const tray = new THREE.Mesh(trayGeo, wbFrameMat)
  tray.position.set(0, -1.6, 0.1)
  wbGroup.add(tray)

  ;["#ef4444", "#3b82f6", "#10b981"].forEach((col, idx) => {
    const markerGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.25)
    const markerMat = new THREE.MeshStandardMaterial({ color: col })
    const marker = new THREE.Mesh(markerGeo, markerMat)
    marker.rotation.z = Math.PI / 2
    marker.position.set(-1 + idx * 0.3, -1.54, 0.15)
    wbGroup.add(marker)
  })

  const wbTextureObj = createProjectCanvasTexture(PROJECTS_DATA.east)
  PROJECTS_DATA.east.canvas = wbTextureObj.canvas

  const wbScreenGeo = new THREE.PlaneGeometry(5.0, 3.0)
  const wbScreenMat = new THREE.MeshStandardMaterial({
    map: wbTextureObj.texture,
    roughness: 0.2,
    metalness: 0.05,
  })
  const wbScreen = new THREE.Mesh(wbScreenGeo, wbScreenMat)
  wbScreen.position.z = 0.06
  wbScreen.userData = { project: PROJECTS_DATA.east }
  wbGroup.add(wbScreen)
  interactiveMeshes.push(wbScreen)

  scene.add(wbGroup)
}

function buildPictureDisplay(scene, interactiveMeshes) {
  const picGroup = new THREE.Group()
  picGroup.position.set(0, 0.8, 8.8)
  picGroup.rotation.y = Math.PI

  const picFrameGeo = new THREE.BoxGeometry(5.2, 3.2, 0.12)
  const picFrameMat = new THREE.MeshStandardMaterial({
    color: 0x451a03,
    roughness: 0.6,
  })
  const picFrame = new THREE.Mesh(picFrameGeo, picFrameMat)
  picGroup.add(picFrame)

  const picMattingGeo = new THREE.PlaneGeometry(5.0, 3.0)
  const picMattingMat = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    roughness: 0.9,
  })
  const picMatting = new THREE.Mesh(picMattingGeo, picMattingMat)
  picMatting.position.z = 0.07
  picGroup.add(picMatting)

  const picTextureObj = createProjectCanvasTexture(PROJECTS_DATA.south)
  PROJECTS_DATA.south.canvas = picTextureObj.canvas

  const picScreenGeo = new THREE.PlaneGeometry(4.6, 2.6)
  const picScreenMat = new THREE.MeshStandardMaterial({
    map: picTextureObj.texture,
    roughness: 0.5,
  })
  const picScreen = new THREE.Mesh(picScreenGeo, picScreenMat)
  picScreen.position.z = 0.08
  picScreen.userData = { project: PROJECTS_DATA.south }
  picGroup.add(picScreen)
  interactiveMeshes.push(picScreen)

  scene.add(picGroup)
}

function buildHologramDisplay(scene, interactiveMeshes) {
  const holoGroup = new THREE.Group()
  holoGroup.position.set(-8.8, 0.8, 0)
  holoGroup.rotation.y = Math.PI / 2

  const bracketGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.5)
  const bracketMat = new THREE.MeshStandardMaterial({
    color: 0x475569,
    metalness: 0.9,
  })
  const b1 = new THREE.Mesh(bracketGeo, bracketMat)
  b1.rotation.x = Math.PI / 2
  b1.position.set(-2.2, 0, 0.25)
  const b2 = new THREE.Mesh(bracketGeo, bracketMat)
  b2.rotation.x = Math.PI / 2
  b2.position.set(2.2, 0, 0.25)
  holoGroup.add(b1)
  holoGroup.add(b2)

  const cornerGeo = new THREE.BoxGeometry(0.2, 0.2, 0.1)
  const cornerMat = new THREE.MeshStandardMaterial({
    color: 0xd946ef,
    emissive: 0xd946ef,
    emissiveIntensity: 0.8,
  })
  ;[
    [-2.5, 1.5],
    [2.5, 1.5],
    [-2.5, -1.5],
    [2.5, -1.5],
  ].forEach((pos) => {
    const corner = new THREE.Mesh(cornerGeo, cornerMat)
    corner.position.set(pos[0], pos[1], 0.5)
    holoGroup.add(corner)
  })

  const holoTextureObj = createProjectCanvasTexture(PROJECTS_DATA.west)
  PROJECTS_DATA.west.canvas = holoTextureObj.canvas

  const holoScreenGeo = new THREE.PlaneGeometry(5.0, 3.0)
  const holoScreenMat = new THREE.MeshStandardMaterial({
    map: holoTextureObj.texture,
    transparent: true,
    opacity: 0.9,
    emissiveMap: holoTextureObj.texture,
    emissive: 0xd946ef,
    emissiveIntensity: 0.3,
    roughness: 0.1,
  })
  const holoScreen = new THREE.Mesh(holoScreenGeo, holoScreenMat)
  holoScreen.position.z = 0.5
  holoScreen.userData = { project: PROJECTS_DATA.west }
  holoGroup.add(holoScreen)
  interactiveMeshes.push(holoScreen)

  scene.add(holoGroup)
}

import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "@fontsource/inter/300.css"
import "@fontsource/inter/400.css"
import "@fontsource/inter/500.css"
import "@fontsource/inter/600.css"
import "@fontsource/inter/700.css"
import "@fontsource/inter/800.css"
import "@fontsource/fira-code/400.css"
import "@fontsource/fira-code/500.css"
import "./style.css"

import { CAMERA_PRESETS, ROOM_SIZE } from "./config.js"
import { state } from "./state.js"
import { setupLighting } from "./lighting.js"
import { buildProceduralRoom, buildRoomFurniture } from "./room.js"
import { buildWallDisplays } from "./displays.js"
import { focusWall, onClick, onMouseMove } from "./interaction.js"
import { closeModal } from "./modal.js"

function init() {
  const container = document.getElementById("canvas-container")

  state.scene = new THREE.Scene()
  state.scene.background = new THREE.Color(0x0a0f1d)
  state.scene.fog = new THREE.FogExp2(0x0a0f1d, 0.03)

  state.camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    100,
  )
  state.camera.position.set(
    CAMERA_PRESETS.overview.pos.x,
    CAMERA_PRESETS.overview.pos.y,
    CAMERA_PRESETS.overview.pos.z,
  )

  state.renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: "high-performance",
  })
  state.renderer.setSize(window.innerWidth, window.innerHeight)
  state.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  state.renderer.shadowMap.enabled = true
  state.renderer.shadowMap.type = THREE.PCFSoftShadowMap
  state.renderer.toneMapping = THREE.ACESFilmicToneMapping
  state.renderer.toneMappingExposure = 1.1
  container.appendChild(state.renderer.domElement)

  state.controls = new OrbitControls(state.camera, state.renderer.domElement)
  state.controls.enableDamping = true
  state.controls.dampingFactor = 0.05
  state.controls.maxPolarAngle = Math.PI / 2 - 0.02
  state.controls.minDistance = 1
  state.controls.maxDistance = 8.5
  state.controls.target.set(
    CAMERA_PRESETS.overview.target.x,
    CAMERA_PRESETS.overview.target.y,
    CAMERA_PRESETS.overview.target.z,
  )

  state.raycaster = new THREE.Raycaster()
  state.mouse = new THREE.Vector2()

  setupLighting(state.scene)
  buildProceduralRoom(state.scene, ROOM_SIZE)
  buildRoomFurniture(state.scene, ROOM_SIZE)
  buildWallDisplays(state.scene, state.interactiveMeshes)

  window.addEventListener("resize", onWindowResize)
  window.addEventListener("mousemove", onMouseMove)
  window.addEventListener("click", onClick)

  bindUI()

  animate()
}

function bindUI() {
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.addEventListener("click", () => focusWall(btn.dataset.wall))
  })

  document
    .getElementById("modal-close-btn")
    .addEventListener("click", closeModal)
}

function onWindowResize() {
  if (!state.camera || !state.renderer) return
  state.camera.aspect = window.innerWidth / window.innerHeight
  state.camera.updateProjectionMatrix()
  state.renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate() {
  requestAnimationFrame(animate)
  state.controls.update()
  state.renderer.render(state.scene, state.camera)
}

window.addEventListener("DOMContentLoaded", init)

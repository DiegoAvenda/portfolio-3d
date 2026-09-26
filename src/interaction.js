import { gsap } from "gsap"
import { CAMERA_PRESETS } from "./config.js"
import { state } from "./state.js"
import { openModal } from "./modal.js"

function resetHoverState() {
  if (state.hoveredMesh) {
    document.body.style.cursor = "default"
    if (state.hoveredMesh.material.emissive) {
      state.hoveredMesh.material.emissiveIntensity = 0.15
    }
    state.hoveredMesh = null
  }
}

export function onMouseMove(event) {
  const { camera, raycaster, mouse, interactiveMeshes } = state
  if (!camera || !raycaster || !mouse) return

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

  raycaster.setFromCamera(mouse, camera)
  const intersects = raycaster.intersectObjects(interactiveMeshes)

  const tooltip = document.getElementById("hover-tooltip")
  const tooltipTitle = document.getElementById("tooltip-title")

  if (intersects.length > 0) {
    const hitMesh = intersects[0].object

    if (state.hoveredMesh !== hitMesh) {
      resetHoverState()
      state.hoveredMesh = hitMesh

      document.body.style.cursor = "pointer"
      if (state.hoveredMesh.material.emissive) {
        state.hoveredMesh.material.emissiveIntensity = 0.5
      }

      const project = state.hoveredMesh.userData.project
      if (project) {
        tooltipTitle.textContent = project.title
        tooltip.classList.remove("opacity-0", "scale-90")
        tooltip.classList.add("opacity-100", "scale-100")
      }
    }
  } else {
    if (state.hoveredMesh) resetHoverState()
    tooltip.classList.remove("opacity-100", "scale-100")
    tooltip.classList.add("opacity-0", "scale-90")
  }
}

export function onClick() {
  if (state.isTransitioning) return
  const { camera, raycaster, mouse, interactiveMeshes } = state
  if (!camera || !raycaster || !mouse) return

  raycaster.setFromCamera(mouse, camera)
  const intersects = raycaster.intersectObjects(interactiveMeshes)

  if (intersects.length > 0) {
    const project = intersects[0].object.userData.project
    if (project) {
      focusWall(project.id, () => openModal(project))
    }
  }
}

export function focusWall(wallKey, onCompleteCallback) {
  const preset = CAMERA_PRESETS[wallKey]
  if (!preset) return
  const { camera, controls } = state
  if (!camera || !controls) return

  state.isTransitioning = true
  controls.enabled = false

  document.querySelectorAll(".nav-btn").forEach((btn) => {
    if (btn.dataset.wall === wallKey) {
      btn.classList.add(
        "bg-slate-800",
        "text-white",
        "border",
        "border-cyan-500/40",
      )
    } else {
      btn.classList.remove(
        "bg-slate-800",
        "text-white",
        "border",
        "border-cyan-500/40",
      )
    }
  })

  gsap.to(camera.position, {
    x: preset.pos.x,
    y: preset.pos.y,
    z: preset.pos.z,
    duration: 1.4,
    ease: "power2.inOut",
  })

  gsap.to(controls.target, {
    x: preset.target.x,
    y: preset.target.y,
    z: preset.target.z,
    duration: 1.4,
    ease: "power2.inOut",
    onUpdate: () => controls.update(),
    onComplete: () => {
      controls.enabled = true
      state.isTransitioning = false
      if (onCompleteCallback) onCompleteCallback()
    },
  })
}

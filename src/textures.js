import * as THREE from "three"

export function createFloorTexture() {
  const canvas = document.createElement("canvas")
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext("2d")

  ctx.fillStyle = "#111827"
  ctx.fillRect(0, 0, 512, 512)

  ctx.strokeStyle = "#1f2937"
  ctx.lineWidth = 4
  const tileSize = 64
  for (let i = 0; i <= 512; i += tileSize) {
    ctx.beginPath()
    ctx.moveTo(i, 0)
    ctx.lineTo(i, 512)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(0, i)
    ctx.lineTo(512, i)
    ctx.stroke()
  }

  ctx.fillStyle = "rgba(255, 255, 255, 0.02)"
  for (let i = 0; i < 400; i++) {
    ctx.fillRect(Math.random() * 512, Math.random() * 512, 2, 2)
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(6, 6)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

export function createProjectCanvasTexture(project) {
  const canvas = document.createElement("canvas")
  canvas.width = 1024
  canvas.height = 640
  const ctx = canvas.getContext("2d")

  const grad = ctx.createLinearGradient(0, 0, 1024, 640)
  grad.addColorStop(0, "#0f172a")
  grad.addColorStop(1, "#020617")
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 1024, 640)

  ctx.strokeStyle = "rgba(255, 255, 255, 0.05)"
  ctx.lineWidth = 1
  for (let x = 0; x < 1024; x += 40) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, 640)
    ctx.stroke()
  }
  for (let y = 0; y < 640; y += 40) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(1024, y)
    ctx.stroke()
  }

  ctx.fillStyle = "rgba(30, 41, 59, 0.7)"
  if (ctx.roundRect) {
    ctx.beginPath()
    ctx.roundRect(40, 40, 944, 560, 24)
    ctx.fill()
  } else {
    ctx.fillRect(40, 40, 944, 560)
  }
  ctx.strokeStyle = project.accentColor
  ctx.lineWidth = 3
  ctx.stroke()

  ctx.fillStyle = project.accentColor
  ctx.font = "bold 22px Inter, sans-serif"
  ctx.fillText(project.category.toUpperCase(), 80, 100)

  ctx.fillStyle = "#ffffff"
  ctx.font = "bold 46px Inter, sans-serif"
  ctx.fillText(project.title, 80, 160)

  if (project.type === "tv") {
    ctx.strokeStyle = "#818cf8"
    ctx.lineWidth = 2
    ctx.strokeRect(80, 220, 400, 260)
    ctx.strokeRect(120, 250, 400, 260)
  } else if (project.type === "whiteboard") {
    ctx.strokeStyle = "#34d399"
    ctx.lineWidth = 3
    ctx.strokeRect(80, 240, 180, 100)
    ctx.strokeRect(340, 240, 180, 100)
    ctx.beginPath()
    ctx.moveTo(260, 290)
    ctx.lineTo(340, 290)
    ctx.stroke()
  } else if (project.type === "picture") {
    for (let i = 0; i < 5; i++) {
      ctx.beginPath()
      ctx.arc(280 + i * 40, 350, 60 - i * 8, 0, Math.PI * 2)
      ctx.fillStyle = project.accentColor
      ctx.globalAlpha = 0.3
      ctx.fill()
      ctx.globalAlpha = 1.0
    }
  } else {
    ctx.strokeStyle = "#f0abfc"
    for (let i = 0; i < 6; i++) {
      ctx.beginPath()
      ctx.arc(300, 350, 40 + i * 25, 0, Math.PI * 1.5)
      ctx.stroke()
    }
  }

  ctx.fillStyle = "rgba(15, 23, 42, 0.9)"
  ctx.fillRect(520, 220, 420, 280)

  ctx.fillStyle = "#cbd5e1"
  ctx.font = "18px Inter, sans-serif"
  project.tech.forEach((techItem, idx) => {
    ctx.fillText(`• ${techItem}`, 550, 270 + idx * 40)
  })

  ctx.fillStyle = project.accentColor
  ctx.fillRect(80, 520, 240, 50)
  ctx.fillStyle = "#ffffff"
  ctx.font = "bold 18px Inter, sans-serif"
  ctx.fillText("HAZ CLIC PARA MÁS", 100, 552)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.needsUpdate = true
  return { texture, canvas }
}

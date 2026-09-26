const STATUS_TONES = {
  live: {
    badge: "bg-emerald-950/80 text-emerald-400 border-emerald-800/50",
    text: "text-emerald-400",
  },
  demo: {
    badge: "bg-cyan-950/80 text-cyan-400 border-cyan-800/50",
    text: "text-cyan-400",
  },
  prototype: {
    badge: "bg-fuchsia-950/80 text-fuchsia-400 border-fuchsia-800/50",
    text: "text-fuchsia-400",
  },
}

const DEFAULT_PREVIEW = "Vista previa del proyecto"

const DEFAULT_STATUS = {
  label: "Completado",
  detail: "Proyecto finalizado",
  tone: "live",
}

export function openModal(project) {
  const modal = document.getElementById("project-modal")
  const modalTitle = document.getElementById("modal-title")
  const modalWallTag = document.getElementById("modal-wall-tag")
  const modalDescription = document.getElementById("modal-description")
  const modalTechStack = document.getElementById("modal-tech-stack")
  const modalIconBadge = document.getElementById("modal-icon-badge")
  const modalGithub = document.getElementById("modal-github-link")
  const modalDemo = document.getElementById("modal-demo-link")
  const modalFeatures = document.getElementById("modal-features")

  const modalStatus = document.getElementById("modal-status")
  const modalStatusDetail = document.getElementById("modal-status-detail")

  const status = project.status || DEFAULT_STATUS
  const tone = STATUS_TONES[status.tone] || STATUS_TONES.live

  modalStatus.textContent = status.label
  modalStatus.className = `text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border ${tone.badge}`
  modalStatusDetail.textContent = status.detail
  modalStatusDetail.className = `font-semibold ${tone.text}`

  const modalPreviewIcon = document.getElementById("modal-preview-icon")
  const modalPreviewLabel = document.getElementById("modal-preview-label")

  modalPreviewIcon.className = `fa-solid ${project.icon}`
  modalPreviewIcon.style.color = project.accentColor
  modalPreviewLabel.textContent = project.preview || DEFAULT_PREVIEW

  modalTitle.textContent = project.title
  modalWallTag.textContent = project.wallName
  modalDescription.textContent = project.description
  modalIconBadge.innerHTML = `<i class="fa-solid ${project.icon}"></i>`
  modalIconBadge.style.borderColor = project.accentColor
  modalIconBadge.style.color = project.accentColor

  modalGithub.href = project.github
  modalDemo.href = project.demo

  modalFeatures.innerHTML = project.features
    .map(
      (f) => `
        <li class="flex items-start gap-2 text-slate-300">
          <span class="font-mono font-bold" style="color: ${project.accentColor}">▸</span>
          <span>${f}</span>
        </li>
      `,
    )
    .join("")

  modalTechStack.innerHTML = project.tech
    .map(
      (t) => `
        <span class="px-3 py-1 rounded-xl bg-slate-800/90 border border-slate-700 text-xs font-mono text-cyan-300">
          ${t}
        </span>
      `,
    )
    .join("")

  const previewCanvas = document.getElementById("modal-preview-canvas")
  const ctx = previewCanvas.getContext("2d")
  previewCanvas.width = project.canvas.width
  previewCanvas.height = project.canvas.height
  ctx.drawImage(project.canvas, 0, 0)

  modal.classList.remove("opacity-0", "pointer-events-none", "scale-95")
  modal.classList.add("opacity-100", "pointer-events-auto", "scale-100")
}

export function closeModal() {
  const modal = document.getElementById("project-modal")
  modal.classList.remove("opacity-100", "pointer-events-auto", "scale-100")
  modal.classList.add("opacity-0", "pointer-events-none", "scale-95")
}

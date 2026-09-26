export function openModal(project) {
  const modal = document.getElementById("project-modal")
  const modalTitle = document.getElementById("modal-title")
  const modalWallTag = document.getElementById("modal-wall-tag")
  const modalDescription = document.getElementById("modal-description")
  const modalTechStack = document.getElementById("modal-tech-stack")
  const modalIconBadge = document.getElementById("modal-icon-badge")
  const modalGithub = document.getElementById("modal-github-link")
  const modalDemo = document.getElementById("modal-demo-link")

  modalTitle.textContent = project.title
  modalWallTag.textContent = project.wallName
  modalDescription.textContent = project.description
  modalIconBadge.innerHTML = `<i class="fa-solid ${project.icon}"></i>`
  modalIconBadge.style.borderColor = project.accentColor
  modalIconBadge.style.color = project.accentColor

  modalGithub.href = project.github
  modalDemo.href = project.demo

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

export const PROJECTS_DATA = {
  north: {
    id: "north",
    wallName: "Pared 1 (Norte) • TV Display",
    title: "Aether 3D E-Commerce",
    category: "Web3 & Spatial Web",
    icon: "fa-tv",
    accentColor: "#6366f1",
    description:
      "Plataforma web 3D interactiva para comercio electrónico con renderizado de productos en tiempo real, personalización de colores y shaders interactivos.",
    tech: ["Three.js", "React", "Tailwind CSS", "Node.js", "WebGL"],
    github: "https://github.com",
    demo: "https://example.com",
    type: "tv",
  },
  east: {
    id: "east",
    wallName: "Pared 2 (Este) • Pizarrón de Trabajo",
    title: "DevFlow Analytics Dashboard",
    category: "SaaS & System Architecture",
    icon: "fa-chalkboard",
    accentColor: "#10b981",
    description:
      "Panel de control analítico para arquitectura de microservicios con métricas en vivo, grafos interactivos en 2D Canvas y monitoreo de servidor en tiempo real.",
    tech: ["TypeScript", "D3.js", "WebSockets", "Go", "Tailwind"],
    github: "https://github.com",
    demo: "https://example.com",
    type: "whiteboard",
  },
  south: {
    id: "south",
    wallName: "Pared 3 (Sur) • Cuadro Galería Artística",
    title: "Chroma Generative Art Engine",
    category: "Generative Canvas & Shaders",
    icon: "fa-image",
    accentColor: "#f59e0b",
    description:
      "Motor de arte generativo que crea patrones orgánicos fluidos mediante algoritmos de ruido simplex y shaders GLSL programables exportables en alta resolución.",
    tech: ["WebGL", "GLSL", "Canvas 2D API", "Vue.js", "Math.js"],
    github: "https://github.com",
    demo: "https://example.com",
    type: "picture",
  },
  west: {
    id: "west",
    wallName: "Pared 4 (Oeste) • Monitor Holográfico",
    title: "Cyberpunk WebGL Game Engine",
    category: "Interactive Game Dev",
    icon: "fa-desktop",
    accentColor: "#d946ef",
    description:
      "Demostración de motor de juegos espacial para navegador con simulación física ligera, mapas de sombras y controles de cámara cibernéticos.",
    tech: ["Three.js", "Cannon.js", "Web Audio API", "HTML5", "GSAP"],
    github: "https://github.com",
    demo: "https://example.com",
    type: "holo",
  },
}

export const ROOM_SIZE = { width: 18, height: 9, depth: 18 }

export const CAMERA_PRESETS = {
  overview: { pos: { x: 0, y: 1, z: 6 }, target: { x: 0, y: 0, z: 0 } },
  north: { pos: { x: 0, y: 0.5, z: -2.5 }, target: { x: 0, y: 0.8, z: -8.9 } },
  east: { pos: { x: 2.5, y: 0.5, z: 0 }, target: { x: 8.9, y: 0.8, z: 0 } },
  south: { pos: { x: 0, y: 0.5, z: 2.5 }, target: { x: 0, y: 0.8, z: 8.9 } },
  west: { pos: { x: -2.5, y: 0.5, z: 0 }, target: { x: -8.9, y: 0.8, z: 0 } },
}

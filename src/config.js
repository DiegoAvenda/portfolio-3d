export const PROJECTS_DATA = {
  north: {
    id: "north",
    wallName: "Pared 1 (Norte) • TV Display",
    title: "Contaco",
    category: "Web3 & Spatial Web",
    icon: "fa-tv",
    accentColor: "#6366f1",
    description:
      "Plataforma para restaurantes en México que une WhatsApp nativo + POS + contabilidad invisible lista para el SAT. El pedido se convierte automáticamente en venta y en los números exactos que el dueño necesita para declarar.",
    tech: ["Sveltekit", "MongoDB", "Tailwind CSS", "Better auth"],
    github: "https://github.com/DiegoAvenda/conta",
    demo: "https://contaco.store",
    type: "tv",
  },
  east: {
    id: "east",
    wallName: "Pared 2 (Este) • Pizarrón de Trabajo",
    title: "Ray casting game",
    category: "SaaS & System Architecture",
    icon: "fa-chalkboard",
    accentColor: "#10b981",
    description: "Pseudo 3d game estilo wolfenstain 3d",
    tech: ["Canvas 2D API", "Ray casting", "Javascript"],
    github: "https://github.com/DiegoAvenda/el-7",
    demo: "https://neo-diego-2d.vercel.app/",
    type: "whiteboard",
  },
  south: {
    id: "south",
    wallName: "Pared 3 (Sur) • Cuadro Galería Artística",
    title: "3D game",
    category: "Generative Canvas & Shaders",
    icon: "fa-image",
    accentColor: "#f59e0b",
    description: "Third person shotter game with three.js",
    tech: ["WebGL", "GLSL", "Three.js"],
    github: "https://github.com/DiegoAvenda/neo-diego-3d-game",
    demo: "https://neo-diego-3d-game.vercel.app/",
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

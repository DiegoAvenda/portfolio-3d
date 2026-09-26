import * as THREE from "three"

export function setupLighting(scene) {
  const ambientLight = new THREE.AmbientLight(0x2d3748, 1.2)
  scene.add(ambientLight)

  const ceilingLight = new THREE.PointLight(0xfff5ea, 30, 20, 2)
  ceilingLight.position.set(0, 3.8, 0)
  ceilingLight.castShadow = true
  ceilingLight.shadow.mapSize.width = 1024
  ceilingLight.shadow.mapSize.height = 1024
  scene.add(ceilingLight)

  const fixtureGeo = new THREE.SphereGeometry(0.35, 16, 16)
  const fixtureMat = new THREE.MeshBasicMaterial({ color: 0xfff0dd })
  const fixture = new THREE.Mesh(fixtureGeo, fixtureMat)
  fixture.position.set(0, 4.2, 0)
  scene.add(fixture)

  const createSpotlight = (
    x,
    y,
    z,
    targetX,
    targetY,
    targetZ,
    color = 0xffffff,
    intensity = 2,
  ) => {
    const spot = new THREE.SpotLight(color, intensity, 12, Math.PI / 5, 0.4, 1)
    spot.position.set(x, y, z)
    spot.target.position.set(targetX, targetY, targetZ)
    spot.castShadow = false
    scene.add(spot)
    scene.add(spot.target)
  }

  createSpotlight(0, 3.5, -4, 0, 0.8, -8.9, 0xa5b4fc, 50)
  createSpotlight(4, 3.5, 0, 8.9, 0.8, 0, 0x6ee7b7, 44)
  createSpotlight(0, 3.5, 4, 0, 0.8, 8.9, 0xfcd34d, 44)
  createSpotlight(-4, 3.5, 0, -8.9, 0.8, 0, 0xf0abfc, 56)
}

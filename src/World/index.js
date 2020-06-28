const materials = require('../materials')
const { Vec3, Color } = require('../Vec3')
const { Sphere } = require('../Hittable')

function buildWorld() {
  return [
    new Sphere(
      new Vec3(0, 0, -1),
      0.5,
      new materials.DiffuseMaterial(new Color(0.5, 0, 0.8))
    ),
    new Sphere(
      new Vec3(0, -100.5, -0.5),
      100,
      new materials.DiffuseMaterial(new Color(0.5, 0.5, 0.5))
    ),
    new Sphere(
      new Vec3(1, 0, -1),
      0.5,
      new materials.MetalMaterial(new Color(0.8, 0.6, 0.2), 0.3)
    ),
    new Sphere(
      new Vec3(-1, 0, -1),
      0.5,
      new materials.MetalMaterial(new Color(0.8, 0.8, 0.8), 1)
    ),
  ]
}

module.exports = {
  buildWorld,
}

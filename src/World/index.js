const { Vec3, Color } = require('../Vec3')
const { Sphere } = require('../Hittable')
const {
  DiffuseMaterial,
  MetalMaterial,
  NormalShadedMaterial,
} = require('../materials')

function buildWorld() {
  return [
    new Sphere(
      new Vec3(0, 0, -1),
      0.5,
      new DiffuseMaterial(new Color(0.5, 0, 0.8))
    ),
    new Sphere(
      new Vec3(0, -100.5, -0.5),
      100,
      new DiffuseMaterial(new Color(0.5, 0.5, 0.5))
    ),
    new Sphere(
      new Vec3(1, 0, -1),
      0.5,
      new MetalMaterial(new Color(0.8, 0.6, 0.2), 0.1)
    ),
    new Sphere(
      new Vec3(-1, 0, -1),
      0.5,
      new NormalShadedMaterial()
    ),
  ]
}

module.exports = {
  buildWorld,
}

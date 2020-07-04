const { Vec3, Color } = require('../Vec3')
const { Sphere } = require('../Hittable')
const {
  DielectricMaterial,
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
      new MetalMaterial(new Color(0.7, 0.7, 0.7), 0.01)
    ),
    new Sphere(
      new Vec3(-1, 0, -1),
      -0.45,
      new DielectricMaterial(1.5)
    ),
    new Sphere(
      new Vec3(-1, 0, -1),
      0.5,
      new DielectricMaterial(1.5)
    ),
  ]
}

module.exports = {
  buildWorld,
}

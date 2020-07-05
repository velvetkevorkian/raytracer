const { Vec3, Color } = require('../Vec3')
const { Sphere } = require('../Hittable')
const { random } = require('../utils')
const {
  DielectricMaterial,
  DiffuseMaterial,
  MetalMaterial,
  NormalShadedMaterial,
} = require('../materials')

function buildWorld() {
  const x = 11
  let smallSpheres = []
  for(let a = -x; a < x; a++) {
    for(let b = -x; b < x; b++) {
      const chooseMat = random()
      const center = new Vec3(a + random() * 0.9, 0.2, b + random() * 0.9)

      if (center.minus(new Vec3(4, 0.2, 0)).length() > 0.9) {
        if (chooseMat < 0.8) {
          // diffuse
          const color = Color.randomColor().times(Color.randomColor())
          const material = new DiffuseMaterial(color)
          smallSpheres.push(new Sphere(center, 0.2, material))
        } else if (chooseMat < 0.95) {
          // metal
          const color = Color.randomColor(0.5, 1)
          const fuzz = random(0, 0.5)
          const material = new MetalMaterial(color, fuzz)
          smallSpheres.push(new Sphere(center, 0.2, material))
        } else {
          // glass
          const material = new DielectricMaterial(1.5)
          smallSpheres.push(new Sphere(center, 0.2, material))
        }
      }
    }
  }

  return [
    // ground
    new Sphere(
      new Vec3(0, -1000, 0), 1000, new DiffuseMaterial(new Color(0.5, 0.5, 0.5))
    ),
    // glass sphere
    new Sphere(
      new Vec3(0, 1, 0), 1, new DielectricMaterial(1.5)
    ),
    // diffuse sphere
    new Sphere(
      new Vec3(-4, 1, 0), 1, new DiffuseMaterial(new Color(0.4, 0.2, 0.1))
    ),
    new Sphere(
      new Vec3(4, 1, 0), 1, new MetalMaterial(new Color(0.7, 0.6, 0.5), 0)
    ),
    ...smallSpheres,
  ]
}

module.exports = {
  buildWorld,
}

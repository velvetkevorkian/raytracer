const { Vec3, Color } = require('../src/Vec3')
const { random } = require('../src/utils')

function buildGeometry() {
  const x = 2
  let smallSpheres = []
  for(let a = -x; a < x; a++) {
    for(let b = -x; b < x; b++) {
      const chooseMat = random()
      const radius = random(0.15, 0.25)
      const center = new Vec3(a + random() * 0.9, radius, b + random() * 0.9)
      const type = 'Sphere'
      const { x, y, z } = center
      const geometry = {
        type,
        radius,
        position: { x, y, z}
      }

      if (center.minus(new Vec3(4, 0.2, 0)).length() > 0.9) {
        if (chooseMat < 0.8) {
          // diffuse
          const color = Color.randomColor().times(Color.randomColor())
          const { r, g, b } = color
          smallSpheres.push({
            geometry,
            material: {
              type: 'DiffuseMaterial',
              color: {r, g, b }
            }
          })
        } else if (chooseMat < 0.95) {
          // metal
          const color = Color.randomColor(0.5, 1)
          const fuzz = random(0, 0.5)
          const { r, g, b } = color
          smallSpheres.push({
            geometry,
            material: {
              type: 'MetalMaterial',
              color: { r, g, b },
              fuzz,
            }
          })
        } else {
          // glass
          smallSpheres.push({
            geometry,
            material: {
              type: 'DielectricMaterial',
              refractiveIndex: 1.5
            }
          })
        }
      }
    }
  }

  return [
    // {
    //   geometry: {
    //     type: 'Plane',
    //     position: { x: 0, y: 0, z: 0 },
    //     normal: { x: 0, y: 1, z: 0 }
    //   },
    //   material: {
    //     type: 'DiffuseMaterial',
    //     color: { r: 0.5, g: 0.5, b: 0.5 }
    //   }
    // },
    // {
    //   geometry: {
    //     type: 'Sphere',
    //     position: { x: 0, y: 1, z: 0 },
    //     radius: 1
    //   },
    //   material: {
    //     type: 'DielectricMaterial',
    //     refractiveIndex: 1.5
    //   }
    // },
    {
      geometry: {
        type: 'Sphere',
        position: { x: -4, y: 1, z: 0 },
        radius: 1
      },
      material: {
        type: 'DiffuseMaterial',
        color: { r: 0.4, g: 0.2, b: 0.1 }
      }
    },
    // {
    //   geometry: {
    //     type: 'Sphere',
    //     position: { x: 4, y: 1, z: 0 },
    //     radius: 1
    //   },
    //   material: {
    //     type: 'MetalMaterial',
    //     color: { r: 0.7, g: 0.6, b: 0.5 },
    //     fuzz: 0
    //   }
    // },
    // ...smallSpheres,
  ]
}

function buildWorld() {
  return {
    config: {
      imageWidth: 160,
      aspectRatio: 16/9,
      samplesPerPixel: 50,
      maxDepth: 5,
      verticalFov: 20,
      aperture: 0.1,
      lookFrom: [13, 2, 3],
      lookAt: [0, 0, 0]
    },
    world: buildGeometry()
  }
}

module.exports = buildWorld()

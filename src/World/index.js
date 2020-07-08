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
    {
      geometry: {
        type: 'Sphere',
        position: { x: 0, y: -1000, z: 0 },
        radius: 1000,
      },
      material: {
        type: 'DiffuseMaterial',
        color: { r: 0.5, g: 0.5, b: 0.5 }
      }
    },
    {
      geometry: {
        type: 'Sphere',
        position: { x: 0, y: 1, z: 0 },
        radius: 1
      },
      material: {
        type: 'DielectricMaterial',
        refractiveIndex: 1.5
      }
    },
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
    {
      geometry: {
        type: 'Sphere',
        position: { x: 4, y: 1, z: 0 },
        radius: 1
      },
      material: {
        type: 'MetalMaterial',
        color: { r: 0.7, g: 0.6, b: 0.5 },
        fuzz: 0
      }
    },
    ...smallSpheres,
  ]
}

const worldAsJson = buildWorld()

function buildGeometry(geometry) {
  switch (geometry.type) {
    case 'Sphere': {
      const { position, radius } = geometry
      const { x, y, z } = position
      return new Sphere({
        position: new Vec3(x, y, z),
        radius,
      })
    }

    default: {
      throw `Unrecognised geometry: ${geometry.type}`
    }
  }
}

function buildMaterial(material) {
  switch(material.type) {
    case 'DielectricMaterial': {
      const { refractiveIndex, color } = material
      const col = color && new Color(color.r, color.g, color.b)
      return new DielectricMaterial(refractiveIndex, col)
    }

    case 'DiffuseMaterial': {
      const { color } = material
      const col = color && new Color(color.r, color.g, color.b)
      return new DiffuseMaterial(col)
    }

    case 'MetalMaterial': {
      const { color, fuzz } = material
      const col = color ? new Color(color.r, color.g, color.b) : new Color(1, 1, 1)
      return new MetalMaterial(col, fuzz || 0)
    }

    case 'NormalShadedMaterial': {
      return new NormalShadedMaterial()
    }

    default: {
      console.warn(`Unrecognised material: ${material.type}. Falling back to default.`)
      return new DiffuseMaterial(new Color(0.5, 0.5, 0.5))
    }
  }
}

function buildItem(input) {
  const { geometry, material } = input
  let materialInstance
  if (material) {
    materialInstance = buildMaterial(material)
  } else {
    console.warn('No material specified. Falling back to default.')
    materialInstance = new DiffuseMaterial(new Color(0.5, 0.5, 0.5))
  }

  const hittableInstance = buildGeometry(geometry)
  hittableInstance.material = materialInstance
  return hittableInstance
}

function worldFromJson(input) {
  if (input instanceof Array) {
    return input.map(buildItem)
  }

  // handle single item? or bail?
  return [buildItem(input)]
}

module.exports = {
  worldFromJson,
  worldAsJson,
}

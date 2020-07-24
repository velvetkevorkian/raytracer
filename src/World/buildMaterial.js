const { Color } = require('../Vec3')
const {
  DielectricMaterial,
  DiffuseMaterial,
  MetalMaterial,
  NormalShadedMaterial,
} = require('../materials')

function buildMaterial(material = {}) {
  if (!material.type) {
    console.warn('No material specified. Falling back to default.')
    return new DiffuseMaterial(new Color(0.5, 0.5, 0.5))
  }

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
    const col = color && new Color(color.r, color.g, color.b)
    return new MetalMaterial(col, fuzz)
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

module.exports = buildMaterial

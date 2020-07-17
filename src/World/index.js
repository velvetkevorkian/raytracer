const { Vec3, Color } = require('../Vec3')
const { Sphere, Plane } = require('../Hittable')
const {
  DielectricMaterial,
  DiffuseMaterial,
  MetalMaterial,
  NormalShadedMaterial,
} = require('../materials')

function buildConfig(config) {
  const {
    aperture,
    aspectRatio,
    imageWidth,
    lookAt,
    lookFrom,
    maxDepth,
    samplesPerPixel,
    verticalFov,
  } = config

  return {
    aperture,
    aspectRatio,
    imageHeight: parseInt(imageWidth / aspectRatio, 10),
    imageWidth,
    lookAt,
    lookFrom,
    maxDepth,
    samplesPerPixel,
    verticalFov,
  }
}

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

  case 'Plane': {
    const { position, normal } = geometry
    const { x: px, y: py, z: pz } = position
    const { x: nx, y: ny, z: nz } = normal
    return new Plane({
      point: new Vec3(px, py, pz),
      vector: new Vec3(nx, ny, nz),
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

  // TODO: handle errors
}

module.exports = {
  buildConfig,
  worldFromJson,
}

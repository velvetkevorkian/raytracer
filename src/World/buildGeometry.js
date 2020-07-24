const { Vec3 } = require('../Vec3')
const { Sphere, Plane } = require('../Hittable')

function buildGeometry(geometry = {}) {
  switch (geometry.type) {
  case 'Sphere': {
    const {
      position = { x: 0, y: 0, z: 0 },
      radius = 1,
    } = geometry
    const { x, y, z } = position
    return new Sphere({
      position: new Vec3(x, y, z),
      radius,
    })
  }

  case 'Plane': {
    const {
      position = {x: 0, y: 0, z: 0},
      normal = {x: 0, y: 1, z: 0},
    } = geometry
    const { x: px, y: py, z: pz } = position
    const { x: nx, y: ny, z: nz } = normal
    return new Plane({
      position: new Vec3(px, py, pz),
      vector: new Vec3(nx, ny, nz),
    })
  }

  default: {
    throw new Error(`Unrecognised geometry: ${geometry.type}`)
  }
  }
}

module.exports = buildGeometry

const { Color } = require('../Vec3')

class Material {
  constructor() {}

  scatter(hit) {
    return {
      attenuation: new Color(0.5, 0.5, 0.5),
      scatteredRay: hit.normal,
    }
  }
}

module.exports = Material

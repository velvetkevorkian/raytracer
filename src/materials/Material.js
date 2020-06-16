const { Color } = require('../Vec3')

class Material {
  constructor() {

  }

  scatter() {
    return new Color(0.5, 0.5, 0.5)
  }
}

module.exports = Material

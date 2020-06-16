const Material = require('./Material.js')
const { Vec3 } = require('../Vec3')

class NormalShadedMaterial extends Material {
  scatter(hit) {
    const { normal } = hit
    return normal
      .plus(new Vec3(1, 1, 1))
      .times(0.5) // TODO: compensate for gamma?
      .asColor()
  }
}

module.exports = NormalShadedMaterial

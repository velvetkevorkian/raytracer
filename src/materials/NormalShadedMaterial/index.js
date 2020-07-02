const Material = require('../Material.js')
const { Vec3 } = require('../../Vec3')
const { Ray } = require('../../Ray')

class NormalShadedMaterial extends Material {
  scatter(hit) {
    const { normal, point } = hit
    const attenuation = normal
      .plus(new Vec3(1, 1, 1))
      .times(0.5) // TODO: compensate for gamma?
      .asColor()
    const scatterDirection = normal.plus(Vec3.randomUnitVector())
    const scatteredRay = new Ray(point, scatterDirection)
    return { attenuation, scatteredRay }
  }
}

module.exports = NormalShadedMaterial

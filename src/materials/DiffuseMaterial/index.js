const Material = require('../Material.js')
const { Vec3, Color } = require('../../Vec3')
const { Ray } = require('../../Ray')

class DiffuseMaterial extends Material {
  constructor(color = new Color(0.5, 0.5, 0.5)) {
    super()
    this.color = color
  }

  scatter(hit) {
    const { normal, point } = hit
    const attenuation = this.color
    const scatterDirection = normal.plus(Vec3.randomUnitVector())
    const scatteredRay = new Ray(point, scatterDirection)
    return { attenuation, scatteredRay }
  }
}

module.exports = DiffuseMaterial

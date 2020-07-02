const Material = require('../Material.js')
const { Vec3 } = require('../../Vec3')
const { Ray } = require('../../Ray')
const { clamp } = require('../../utils')

class MetalMaterial extends Material {
  constructor(color, fuzz = 0) {
    super()
    this.color = color
    this.fuzz = clamp(fuzz, 0, 1)
  }

  scatter(hit, ray) {
    const { normal, point } = hit
    const reflected = this.reflect(ray.direction.unitVector(), normal)
    const fuzzed = Vec3.randomInUnitSphere()
      .times(this.fuzz)
      .plus(reflected)
    const scatteredRay = new Ray(point, fuzzed)
    return Vec3.dot(scatteredRay.direction, normal) > 0
      ? { attenuation: this.color, scatteredRay }
      : {}
  }

  reflect(v, n) {
    return v.minus(n
      .times(Vec3.dot(v, n))
      .times(2)
    )
  }
}

module.exports = MetalMaterial

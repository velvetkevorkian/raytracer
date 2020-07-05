const Material = require('../Material.js')
const { Vec3, Color } = require('../../Vec3')
const { Ray } = require('../../Ray')
const { random } = require('../../utils')

class DielectricMaterial extends Material {
  constructor(refractiveIndex, color) {
    super()
    this.color = color || new Color(1, 1, 1)
    this.refractiveIndex = refractiveIndex || 1
  }

  scatter(hit, ray) {
    const etaiOverEtat = hit.frontFace
      ? 1 / this.refractiveIndex
      : this.refractiveIndex

    const unitDirection = ray.direction.unitVector()
    const cosTheta = Math.min(Vec3.dot(unitDirection.negative(), hit.normal), 1)
    const sinTheta = Math.sqrt(1 - (cosTheta * cosTheta))
    if (etaiOverEtat * sinTheta > 1) {
      return {
        attenuation: this.color,
        scatteredRay: new Ray(hit.point, reflect(unitDirection, hit.normal))
      }
    }

    const reflectProb = schlick(cosTheta, etaiOverEtat)
    if (random() < reflectProb) {
      return {
        attenuation: this.color,
        scatteredRay: new Ray(hit.point, reflect(unitDirection, hit.normal))
      }
    }

    return {
      attenuation: this.color,
      scatteredRay: new Ray(hit.point, refract(unitDirection, hit.normal, etaiOverEtat))
    }
  }
}

// TODO: move these to Vec3
function refract(uv, normal, etaiOverEtat) {
  const cosTheta = Vec3.dot(uv.negative(), normal)
  const rOutParallel = normal
    .times(cosTheta)
    .plus(uv)
    .times(etaiOverEtat)
  const rOutPerp = normal
    .times(-1 * Math.sqrt(1 - rOutParallel.lengthSquared()))

   return rOutParallel.plus(rOutPerp)
}

function reflect(v, n) {
  return v.minus(n
    .times(Vec3.dot(v, n))
    .times(2)
  )
}

function schlick(cosine, refractiveIndex) {
  let r0 = (1 - refractiveIndex) / (1 + refractiveIndex)
  r0 = r0 * r0
  return r0 + (1 - r0) * Math.pow((1 - cosine), 5)
}

module.exports = DielectricMaterial

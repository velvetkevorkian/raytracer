const Material = require('../Material.js')
const { Vec3, Color } = require('../../Vec3')
const { Ray } = require('../../Ray')
const { random } = require('../../utils')

class DielectricMaterial extends Material {
  /**
   * Create a dielectric (glass) material
   *
   * @param {number} [refractiveIndex = 1] - a higher refractive index means more rays refract and less reflect
   * @param {Vec3} [color = new Color(1, 1, 1)] - the material's color
   */
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
        scatteredRay: new Ray(hit.point, Vec3.reflect(unitDirection, hit.normal))
      }
    }

    const reflectProb = schlick(cosTheta, etaiOverEtat)
    if (random() < reflectProb) {
      return {
        attenuation: this.color,
        scatteredRay: new Ray(hit.point, Vec3.reflect(unitDirection, hit.normal))
      }
    }

    return {
      attenuation: this.color,
      scatteredRay: new Ray(hit.point, refract(unitDirection, hit.normal, etaiOverEtat))
    }
  }
}

/**
 * Simulate the refraction of a vector as it enters/exits a refractive material
 *
 * @param {Vec3} uv - unit vector of the inbound ray's direction
 * @param {Vec3} normal - the surface normal
 * @param {number} etaiOverEtat - derived from the material's refractive index
 * @returns {Vec3} the refracted vector
 */
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

/**
 * Approximates the probability of reflection depending on the ray's angle
 *
 * @param {number} cosine - cosine of the ray's angle relative to the surface normal
 * @param {number} refractiveIndex - refractive index of the material
 * @returns {number} the chance of reflection (0-1?)
 */
function schlick(cosine, refractiveIndex) {
  let r0 = (1 - refractiveIndex) / (1 + refractiveIndex)
  r0 = r0 * r0
  return r0 + (1 - r0) * Math.pow((1 - cosine), 5)
}

module.exports = DielectricMaterial

const { Color } = require('../Vec3')
const { Hittable } = require('../Hittable')

function rayColor(ray, world, depth) {
  if(depth <= 0) return new Color(0, 0, 0)

  const hit = Hittable.hitArray({ arr: world, ray, tMin: 0.0001, tMax: Infinity })
  if (hit) {
    const {
      attenuation,
      scatteredRay,
    } = hit.material.scatter(hit, ray) || {}

    if (!attenuation || !scatteredRay) return new Color(0, 0, 0)
    return attenuation.times(rayColor(scatteredRay, world, depth-1))
  }
  const unitDirection = ray.direction.unitVector()
  const bg = 0.5 * (unitDirection.y + 1)
  return new Color(1, 1, 1)
    .times(1-bg)
    .plus(new Color(0.5, 0.7, 1).times(bg))
}

module.exports = {
  rayColor,
}

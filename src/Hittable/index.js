const { Vec3 } = require('../Vec3')

class Hittable {
  constructor() {}

  static hitArray(arr, ray) {
    let hitAnything = null

    for(const item of arr) {
      const hitRecord = item.hit(ray)
      if (hitRecord) {
        hitAnything = hitRecord
      }
    }

    return hitAnything
  }
}

class Sphere extends Hittable {
  constructor(center, radius) {
    super()
    this.center = center
    this.radius = radius
  }

  hit(ray) {
    const oc = ray.origin.minus(this.center)
    const a = ray.direction.lengthSquared()
    const halfB = Vec3.dot(oc, ray.direction)
    const c = oc.lengthSquared() - (this.radius * this.radius)
    const discriminant = (halfB * halfB) - (a * c)
    if(discriminant < 0) {
      return -1
    }
    return (-halfB - Math.sqrt(discriminant)) / a
  }
}

module.exports = {
  Hittable,
  Sphere,
}

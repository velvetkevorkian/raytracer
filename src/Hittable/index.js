const { Vec3 } = require('../Vec3')

class Hittable {
  constructor() {}

  static hitArray({ arr = [], ray, tMin, tMax }) {
    let hitAnything = null
    if (!arr || !arr.length) return hitAnything
    let closestSoFar = tMax

    for(const item of arr) {
      const hitRecord = item.hit(ray, tMin, closestSoFar)
      if (hitRecord) {
        hitAnything = hitRecord
        closestSoFar = hitRecord.t
      }
    }

    return hitAnything
  }
}

class Sphere extends Hittable {
  constructor({ position, radius, material }) {
    super()
    this.position = position
    this.radius = radius
    this.material = material
  }

  hit(ray, tMin, tMax) {
    const oc = ray.origin.minus(this.position)
    const a = ray.direction.lengthSquared()
    const halfB = Vec3.dot(oc, ray.direction)
    const c = oc.lengthSquared() - (this.radius * this.radius)
    const discriminant = (halfB * halfB) - (a * c)

    if(discriminant <= 0) return null

    const root = Math.sqrt(discriminant)
    let t = (-halfB - root) / a
    if (t < tMax && t > tMin) {
      const point = ray.at(t)
      const normal = point.minus(this.position).dividedBy(this.radius)
      const frontFace = Vec3.dot(ray.direction, normal) < 0
      return {
        t,
        point,
        normal: frontFace ? normal : normal.negative(),
        frontFace,
        material: this.material,
      }
    }

    t = (-halfB + root) / a
    if (t < tMax && t > tMin) {
      const point = ray.at(t)
      const normal = point.minus(this.position).dividedBy(this.radius)
      const frontFace = Vec3.dot(ray.direction, normal) < 0
      return {
        t,
        point,
        normal: frontFace ? normal : normal.negative(),
        frontFace,
        material: this.material,
      }
    }

    return null
  }
}

module.exports = {
  Hittable,
  Sphere,
}

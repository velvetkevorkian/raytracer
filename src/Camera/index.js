const { Vec3 } = require('../Vec3')
const { Ray } = require('../Ray')
const { degreesToRadians } = require('../utils')

const defaultOpts = {
  aspectRatio: 16/9,
  lookFrom: new Vec3(0, 0, 0),
  lookAt: new Vec3(0, 0, -2),
  up: new Vec3(0, 1, 0),
  verticalFov: 90,
}

class Camera {
  constructor({
    aspectRatio = 16/9,
    lookFrom = new Vec3(0, 0, 0),
    lookAt = new Vec3(0, 0, -2),
    up = new Vec3(0, 1, 0),
    verticalFov = 90,
   } = defaultOpts) {
    this.lookFrom = lookFrom
    const theta = degreesToRadians(verticalFov)
    const h = Math.tan(theta/2)
    const viewportHeight = h * 2
    const viewportWidth = viewportHeight * aspectRatio
    const w = lookFrom.minus(lookAt).unitVector()
    const u = Vec3.cross(up, w).unitVector()
    const v = Vec3.cross(w, u)
    this.horizontal = u.times(viewportWidth)
    this.vertical = v.times(viewportHeight)
    this.lowerLeftCorner = this.lookFrom
      .minus(this.horizontal.dividedBy(2))
      .minus(this.vertical.dividedBy(2))
      .minus(w)
  }

  getRay(u, v) {
    const direction = this.lowerLeftCorner
      .plus(this.horizontal.times(u))
      .plus(this.vertical.times(v))
      .minus(this.lookFrom)
    return new Ray(this.lookFrom, direction)
  }
}

module.exports = Camera

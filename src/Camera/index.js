const { Vec3 } = require('../Vec3')
const { Ray } = require('../Ray')
const { degreesToRadians } = require('../utils')

const defaultOpts = {
  aspectRatio: 16/9,
  lookFrom: new Vec3(0, 0, 0),
  lookAt: new Vec3(0, 0, -2),
  up: new Vec3(0, 1, 0),
  verticalFov: 90,
  aperture: 0,
}

class Camera {
  constructor({
    aspectRatio = 16/9,
    lookFrom = new Vec3(0, 0, 0),
    lookAt = new Vec3(0, 0, -2),
    up = new Vec3(0, 1, 0),
    verticalFov = 90,
    aperture = 0,
  } = defaultOpts) {
    this.lookFrom = lookFrom
    this.lensRadius = aperture / 2
    const focusDist = lookFrom.minus(lookAt).length()
    const theta = degreesToRadians(verticalFov)
    const h = Math.tan(theta/2)
    const viewportHeight = h * 2
    const viewportWidth = viewportHeight * aspectRatio
    const w = lookFrom.minus(lookAt).unitVector()
    this.u = Vec3.cross(up, w).unitVector()
    this.v = Vec3.cross(w, this.u)
    this.horizontal = this.u.times(viewportWidth).times(focusDist)
    this.vertical = this.v.times(viewportHeight).times(focusDist)
    this.lowerLeftCorner = this.lookFrom
      .minus(this.horizontal.dividedBy(2))
      .minus(this.vertical.dividedBy(2))
      .minus(w.times(focusDist))
  }

  getRay(s, t) {
    const {
      lensRadius,
      u,
      v,
      lookFrom,
      lowerLeftCorner,
      horizontal,
      vertical,
    } = this
    const rd = Vec3.randomInUnitDisc().times(lensRadius)
    const offset = u.times(rd.x).plus(v.times(rd.y))
    const point = lookFrom.plus(offset)
    const direction = lowerLeftCorner
      .plus(horizontal.times(s))
      .plus(vertical.times(t))
      .minus(lookFrom)
      .minus(offset)
    return new Ray(point, direction)
  }
}

module.exports = Camera

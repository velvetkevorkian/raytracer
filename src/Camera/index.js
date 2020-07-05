const { Vec3 } = require('../Vec3')
const { Ray } = require('../Ray')
const { degreesToRadians } = require('../utils')

const defaultOpts = {
  aspectRatio: 16/9,
  focalLength: 1,
  imageWidth: 384,
  origin: new Vec3(0, 0, 0),
  verticalFov: 90,
}

class Camera {
  constructor({
    aspectRatio = 16/9,
    focalLength = 1,
    imageWidth = 384,
    origin = new Vec3(0, 0, 0),
    verticalFov = 90,
   } = defaultOpts) {
    // TODO: do all of these need to be class fields?
    const theta = degreesToRadians(verticalFov)
    const h = Math.tan(theta/2)
    this.aspectRatio = aspectRatio
    this.imageWidth = imageWidth
    this.viewportHeight = h * 2
    this.viewportWidth = this.viewportHeight * this.aspectRatio
    this.imageHeight = parseInt(this.imageWidth / this.aspectRatio, 10)
    this.focalLength = focalLength
    this.origin = origin
    this.horizontal = new Vec3(this.viewportWidth, 0, 0)
    this.vertical = new Vec3(0, this.viewportHeight, 0)
    this.lowerLeftCorner = this.origin
      .minus(this.horizontal.dividedBy(2))
      .minus(this.vertical.dividedBy(2))
      .minus(new Vec3(0, 0, this.focalLength))
  }

  getRay(u, v) {
    const direction = this.lowerLeftCorner
      .plus(this.horizontal.times(u))
      .plus(this.vertical.times(v))
      .minus(this.origin)
    return new Ray(this.origin, direction)
  }
}

module.exports = Camera

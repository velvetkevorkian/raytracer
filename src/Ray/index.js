const { Vec3 } = require('../Vec3')

class Ray {
  constructor(origin, direction) {
    this.origin = origin
    this.direction = direction
  }

  at(t) {
    return Vec3.add(
      this.origin,
      this.direction.times(t)
    )
  }
}

module.exports = {
  Ray
}

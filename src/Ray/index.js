class Ray {
  constructor(origin, direction) {
    this.origin = origin
    this.direction = direction
  }

  at(t) {
    return this.origin.plus(this.direction.times(t))
  }
}

module.exports = {
  Ray,
}

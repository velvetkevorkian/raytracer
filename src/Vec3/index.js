class Vec3 {
  constructor(x, y, z) {
    this.x = x
    this.y = y
    this.z = z
  }

  asArray() {
    return [this.x, this.y, this.z]
  }

  negative() {
    return new Vec3(this.x * -1, this.y * -1, this.z * -1)
  }

  plusEquals(vec) {
    this.x += vec.x
    this.y += vec.y
    this.z += vec.z
    return this
  }

  timesEquals(x) {
    this.x *= x
    this.y *= x
    this.z *= x
    return this
  }

  divideEquals(x) {
    this.timesEquals(1/x)
    return this
  }

  lengthSquared() {
    return (this.x * this.x) + (this.y * this.y) + (this.z * this.z)
  }

  length() {
    return Math.sqrt(this.lengthSquared())
  }

  static add(vec1, vec2) {
    return new Vec3(vec1.x + vec2.x, vec1.y + vec2.y, vec1.z + vec2.z)
  }

  static subtract(vec1, vec2) {
    return new Vec3(vec1.x - vec2.x, vec1.y - vec2.y, vec1.z - vec2.z)
  }

  static multiply(vec, factor) {
    if (isNaN(factor)) {
      return new Vec3(vec.x * factor.x, vec.y * factor.y, vec.z * factor.z)
    }
    return new Vec3(vec.x * factor, vec.y * factor, vec.z * factor)
  }

  static divide(vec, factor) {
    return Vec3.multiply(vec, 1/factor)
  }

  static dot(vec1, vec2) {
    return (vec1.x * vec2.x) + (vec1.y * vec2.y) + (vec1.z * vec2.z)
  }

  static cross(vec1, vec2) {
    const x = vec1.y * vec2.z - vec1.z * vec2.y
    const y = vec1.z * vec2.x - vec1.x * vec2.z
    const z = vec1.x * vec2.y - vec1.y * vec2.x
    return new Vec3(x, y, z)
  }

  static unitVector(vec) {
    return Vec3.divide(vec, vec.length())
  }


}

class Point3 extends Vec3 {}

class Color extends Vec3 {
  get r() {
    return this.x
  }

  get g() {
    return this.y
  }

  get b() {
    return this.z
  }

  outputFormat() {
    return `${this.r} ${this.g} ${this.b}`
  }
}

module.exports = {
  Vec3,
  Point3,
  Color,
}

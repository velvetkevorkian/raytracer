const { clamp, random } = require('../utils')

class Vec3 {
  constructor(x, y, z) {
    this.x = x
    this.y = y
    this.z = z
  }

  asArray() {
    return [this.x, this.y, this.z]
  }

  asColor() {
    return new Color(this.x, this.y, this.z)
  }

  negative() {
    return new Vec3(this.x * -1, this.y * -1, this.z * -1)
  }

  plus(vec) {
    return new Vec3(this.x + vec.x, this.y + vec.y, this.z + vec.z)
  }

  minus(vec) {
    return new Vec3(this.x - vec.x, this.y - vec.y, this.z - vec.z)
  }

  times(factor) {
    if (isNaN(factor)) {
      return new Vec3(this.x * factor.x, this.y * factor.y, this.z * factor.z)
    }
    return new Vec3(this.x * factor, this.y * factor, this.z * factor)
  }

  dividedBy(factor) {
    return this.times(1/factor)
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

  unitVector() {
    return this.dividedBy(this.length())
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

  static random(min, max) {
    if (!min || !max) return new Vec3(random(), random(), random())
    return new Vec3(random(min, max), random(min, max), random(min, max))
  }

  static randomInUnitSphere() {
    let v = Vec3.random(-1, 1)
    if (v.lengthSquared() >= 1) {
      return Vec3.randomInUnitSphere()
    } else {
      return v
    }
  }

  static randomUnitVector() {
    const a = random(0, Math.PI * 2)
    const z = random(-1, 1)
    const r = Math.sqrt(1 - (z * z))
    return new Vec3(r * Math.cos(a), r * Math.sin(a), z)
  }
}

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

  times(factor) {
    if (isNaN(factor)) {
      return new Color(this.x * factor.x, this.y * factor.y, this.z * factor.z)
    }
    return new Color(this.x * factor, this.y * factor, this.z * factor)
  }

  plus(vec) {
    return new Color(this.x + vec.x, this.y + vec.y, this.z + vec.z)
  }

  outputPpmFormat({ gamma = 2 } = { gamma: 2 }) {
    return this
      .asArray()
      .map(i => Math.pow(i, 1/gamma))
      .map(i => clamp(parseInt(i * 255, 10), 0, 255))
      .join(' ')
  }
}

module.exports = {
  Vec3,
  Color,
}

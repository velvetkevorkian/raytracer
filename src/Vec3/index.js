const { clamp, random } = require('../utils')

class Vec3 {
  /**
   * Create a vec3 instance from x,y,z params or an array [x, y, z]
   *
   * @param {number|Array} x - vector's x coordinate or an array of numbers
   * @param {number} y - vector's y coordinate
   * @param {number} z - vector's z coordinate
   */
  constructor(x, y, z) {
    if (x instanceof Array && x.length === 3) {
      [this.x, this.y, this.z] = x
    } else {
      this.x = x
      this.y = y
      this.z = z
    }
  }

  /**
   * Returns the vector's x, y, and z components as an array [x, y, z]
   *
   * @returns {Array}
   */
  asArray() {
    return [this.x, this.y, this.z]
  }

  /**
   * Returns the vector cast to a Color instance
   *
   * @returns {Color}
   */
  asColor() {
    return new Color(this.x, this.y, this.z)
  }

  /**
   * Returns the vector * -1
   *
   * @returns {Vec3} a new Vec3 instance
   */
  negative() {
    return new Vec3(this.x * -1, this.y * -1, this.z * -1)
  }

  /**
   * Add a vector to another vector
   *
   * @param {Vec3} vec - the vector to add
   * @returns {Vec3} a new Vec3 instance
   */
  plus(vec) {
    return new Vec3(this.x + vec.x, this.y + vec.y, this.z + vec.z)
  }

  /**
   * Subtract a vector from another vector
   *
   * @param {Vec3} vec - the vector to subtract
   * @returns {Vec3} a new Vec3 instance
   */
  minus(vec) {
    return new Vec3(this.x - vec.x, this.y - vec.y, this.z - vec.z)
  }

  /**
   * Multiply a vector by a number or another vector
   *
   * @param {Vec3|number} factor - the number or vector to multiply by
   * @returns { Vec3} a new Vec3 instance
   */
  times(factor) {
    if (isNaN(factor)) {
      return new Vec3(this.x * factor.x, this.y * factor.y, this.z * factor.z)
    }
    return new Vec3(this.x * factor, this.y * factor, this.z * factor)
  }

  /**
   * Divide a vector by a number
   *
   * @param {number} factor - the number to divide by
   * @returns {Vec3} a new Vec3 instance
   */
  dividedBy(factor) {
    return this.times(1/factor)
  }

  /**
   * Multiply the current vector by a number. Mutates `this`
   *
   * @param {number} x - the number to multiply by
   * @returns {Vec3} the current Vec3 instance
   */
  timesEquals(x) {
    this.x *= x
    this.y *= x
    this.z *= x
    return this
  }

  /**
   * Divide the current vector by a number. Mutates `this`
   *
   * @param {number} x - the number to divide by
   * @returns {Vec3} the current Vec3 instance
   */
  divideEquals(x) {
    this.timesEquals(1/x)
    return this
  }

  /**
   * @returns {number}
   */
  lengthSquared() {
    return (this.x * this.x) + (this.y * this.y) + (this.z * this.z)
  }

  /**
   * @returns {number}
   */
  length() {
    return Math.sqrt(this.lengthSquared())
  }

  /**
   * Get the current vector normalised so length === 1
   *
   * @returns {Vec3} a new Vec3 instance
   */
  unitVector() {
    return this.dividedBy(this.length())
  }

  /**
   * Get the dot product of two vectors
   *
   * @param {Vec3} vec1 - the first vector
   * @param {Vec3} vec2 - the second vector
   * @returns {number}
   */
  static dot(vec1, vec2) {
    return (vec1.x * vec2.x) + (vec1.y * vec2.y) + (vec1.z * vec2.z)
  }

  /**
   * Get the cross product of two vectors
   *
   * @param {Vec3} vec1 - the first vector
   * @param {Vec3} vec2 - the second vector
   * @returns {Vec3}
   */
  static cross(vec1, vec2) {
    const x = vec1.y * vec2.z - vec1.z * vec2.y
    const y = vec1.z * vec2.x - vec1.x * vec2.z
    const z = vec1.x * vec2.y - vec1.y * vec2.x
    return new Vec3(x, y, z)
  }

  /**
   * Get a Vec3 with random x, y and z.
   * 0 > xyz < 1 unless both min and max are specified
   *
   * @param {number} min - minimum value for xyz
   * @param {number} max - maximum value for xyz
   * @returns {Vec3} a Vec3 with random values
   */
  static random(min, max) {
    if (!min || !max) return new Vec3(random(), random(), random())
    return new Vec3(random(min, max), random(min, max), random(min, max))
  }

  static randomInUnitDisc() {
    const vec = new Vec3(random(-1, 1), random(-1, 1), 0)
    if (vec.lengthSquared() < 1) return vec
    return Vec3.randomInUnitDisc()
  }

  static randomInUnitSphere() {
    const vec = Vec3.random(-1, 1)
    if (vec.lengthSquared() < 1) return vec
    return Vec3.randomInUnitSphere()
  }

  static randomUnitVector() {
    const a = random(0, Math.PI * 2)
    const z = random(-1, 1)
    const r = Math.sqrt(1 - (z * z))
    return new Vec3(r * Math.cos(a), r * Math.sin(a), z)
  }

  /**
   * Simulate the reflection of a vector against a surface normal
   *
   * @param {Vec3} v - the inbound vector
   * @param {Vec3} n - the surface normal
   * @returns {Vec3} the reflected vector
   */
  static reflect(v, n) {
    return v.minus(n
      .times(Vec3.dot(v, n))
      .times(2))
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

  static randomColor() {
    return new Color(random(), random(), random())
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

/* eslint-env mocha */
const { expect } = require('chai')
const { Vec3, Color } = require('.')

describe('Vec3', () => {
  it('x, y and z fields', () => {
    const vec = new Vec3(1, 2, 3)
    expect([vec.x, vec.y, vec.z]).to.deep.equal([1, 2, 3])
  })

  it('asArray() returns the x, y, z fields', () => {
    const vec = new Vec3(1, 2, 3)
    expect(vec.asArray()).to.deep.equal([1, 2, 3])
  })

  describe('plusEquals()', () => {
    const vec = new Vec3(1, 2, 3)
    const result = vec.plusEquals(new Vec3(1, 1, 1))
    it('adds the input vector', () => {
      expect(vec.asArray()).to.deep.equal([2, 3, 4])
    })

    it('mutates and returns itself', () => {
      expect(result).to.equal(vec)
    })
  })

  describe('plus()', () => {
    const vec = new Vec3(1, 2, 3)
    const result = vec.plus(new Vec3(1, 1, 1))
    it('adds the fields', () => {
      expect(result.asArray()).to.deep.equal([2, 3, 4])
    })

    it("doesn't mutate the original", () => {
      expect(result).to.not.equal(vec)
    })

    it('can be chained', () => {
      const vec2 = new Vec3(1, 2, 3)
      const vec3 = new Vec3(0.5, 0.5, 0.5)
      const chained = vec.plus(vec2).plus(vec3)
      expect(chained.asArray()).to.deep.equal([2.5, 4.5, 6.5])
    })
  })

  describe('minus()', () => {
    const vec = new Vec3(1, 2, 3)
    const result = vec.minus(new Vec3(3, 2, 1))

    it('subtracts the fields', () => {
      expect(result.asArray()).to.deep.equal([-2, 0, 2])
    })

    it("doesn't mutate the original", () => {
      expect(result).to.not.equal(vec)
    })

    it('can be chained', () => {
      const vec2 = new Vec3(1, 2, 3)
      const vec3 = new Vec3(0.5, 0.5, 0.5)
      const chained = vec.minus(vec2).minus(vec3)
      expect(chained.asArray()).to.deep.equal([-0.5, -0.5, -0.5])
    })
  })

  describe('times()', () => {
    const vec = new Vec3(1, 2, 3)

    it('works with vectors', () => {
      const result = vec.times(new Vec3(2, 2, 1))
      expect(result.asArray()).to.deep.equal([2, 4, 3])
    })

    it('works with numbers', () => {
      const result = vec.times(2)
      expect(result.asArray()).to.deep.equal([2, 4, 6])
    })

    it("doesn't mutate the original", () => {
      const result = vec.times(2)
      expect(vec.asArray()).to.deep.equal([1, 2, 3])
      expect(vec).to.not.equal(result)
    })

    it('can be chained', () => {
      const result = vec.times(2).times(new Vec3(2, 2, 2))
      expect(result.asArray()).to.deep.equal([4, 8, 12])
    })
  })

  describe('dividedBy()', () => {
    const vec = new Vec3(1, 2, 3)
    const result = vec.dividedBy(2)

    it('divides the fields', () => {
      expect(result.asArray()).to.deep.equal([0.5, 1, 1.5])
    })

    it("doesn't mutate the original", () => {
      expect(vec.asArray()).to.deep.equal([1, 2, 3])
      expect(vec).to.not.equal(result)
    })

    it('can be chained', () => {
      const chained = vec.dividedBy(2).dividedBy(2)
      expect(chained.asArray()).to.deep.equal([0.25, 0.5, 0.75])
    })
  })

  describe('negative()', () => {
    const vec = new Vec3(1, 2, 3)
    const result = vec.negative()
    it('negates each field', () => {
      expect(result.asArray()).to.deep.equal([-1, -2, -3])
    })

    it("doesn't mutate the original vector", () => {
      expect(result).to.not.equal(vec)
    })
  })

  describe('timesEquals()', () => {
    const vec = new Vec3(1, 2, 3)
    const result = vec.timesEquals(2)
    it('multiplies each field', () => {
      expect(result.asArray()).to.deep.equal([2, 4, 6])
    })

    it('mutates and returns itself', () => {
      expect(result).to.equal(vec)
    })
  })

  describe('divideEquals()', () => {
    const vec = new Vec3(2, 4, 6)
    const result = vec.divideEquals(2)

    it('divides each field', () => {
      expect(result.asArray()).to.deep.equal([1, 2, 3])
    })

    it('mutates and returns itself', () => {
      expect(result).to.equal(vec)
    })
  })

  describe('length methods', () => {
    const vec = new Vec3(1, 2, 3)
    it('lengthSquared()', () => {
      expect(vec.lengthSquared()).to.equal(14)
    })

    it('length()', () => {
      expect(vec.length()).to.equal(3.7416573867739413)
    })
  })

  describe('static methods', () => {
    it('add()', () => {
      const result = Vec3.add(new Vec3(1, 2, 3), new Vec3(2, 4, 6))
      expect(result.asArray()).to.deep.equal([3, 6, 9])
    })

    it('subtract()', () => {
      const result = Vec3.subtract(new Vec3(2, 4, 6), new Vec3(1, 2, 3))
      expect(result.asArray()).to.deep.equal([1, 2, 3])
    })

    describe('multiply()', () => {
      it('by a number', () => {
        const result = Vec3.multiply(new Vec3(1, 2, 3), 3)
        expect(result.asArray()).to.deep.equal([3, 6, 9])
      })

      it('by a vector', () => {
        const result = Vec3.multiply(new Vec3(1, 2, 3), new Vec3(2, 4, 6))
        expect(result.asArray()).to.deep.equal([2, 8, 18])
      })
    })

    it('divide()', () => {
      const result = Vec3.divide(new Vec3(2, 4, 6), 2)
      expect(result.asArray()).to.deep.equal([1, 2, 3])
    })

    it('dot()', () => {
      const result = Vec3.dot(new Vec3(1, 2, 3), new Vec3(2, 4, 6))
      expect(result).to.equal(28)
    })

    it('cross()', () => {
      const result = Vec3.cross(new Vec3(1, 2, 3), new Vec3(2, 4, 6))
      expect(result.asArray()).to.deep.equal([0, 0, 0])
    })

    it('unitVector()', () => {
      const result = Vec3.unitVector(new Vec3(1, 2, 3))
      expect(result.asArray()).to.deep.equal([
        0.2672612419124244,
        0.5345224838248488,
        0.8017837257372732
      ])
      expect(result.length()).to.equal(1)
    })
  })
})

describe('Color', () => {
  it('maps xyz to rgb', () => {
    const col = new Color(1, 2, 3)
    expect([col.r, col.g, col.b]).to.deep.equal([1, 2, 3])
  })

  it('outputPpmFormat', () => {
    const result = new Color(1.1, 2.5, 3.7).outputPpmFormat()
    expect(result).to.equal('1 2 3')
  })
})

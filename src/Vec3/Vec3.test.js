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

  it('asColor() returns a color version', () => {
    const vec = new Vec3(1, 2, 3)
    const result = vec.asColor()
    expect(result instanceof Color).to.be.true
    expect([result.r, result.g, result.b]).to.deep.equal(vec.asArray())
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

  it('unitVector()', () => {
    const result = new Vec3(1, 2, 3).unitVector()
    expect(result.asArray()).to.deep.equal([
      0.2672612419124244,
      0.5345224838248488,
      0.8017837257372732
    ])
    expect(result.length()).to.equal(1)
  })

  describe('static methods', () => {
    it('dot()', () => {
      const result = Vec3.dot(new Vec3(1, 2, 3), new Vec3(2, 4, 6))
      expect(result).to.equal(28)
    })

    it('cross()', () => {
      const result = Vec3.cross(new Vec3(1, 2, 3), new Vec3(2, 4, 6))
      expect(result.asArray()).to.deep.equal([0, 0, 0])
    })

    describe('random()', () => {
      it('with no args returns a vector with 0 >= xyz < 1', () => {
        const result = Vec3.random()
        expect(result.x >= 0 && result.x < 1).to.be.true
        expect(result.y >= 0 && result.y < 1).to.be.true
        expect(result.z >= 0 && result.z < 1).to.be.true
      })

      it('with min and max args returns a vector with min >= xyz < max', () => {
        const result = Vec3.random(10, 10.5)
        expect(result.x >= 10 && result.x < 10.5).to.be.true
        expect(result.y >= 10 && result.y < 10.5).to.be.true
        expect(result.z >= 10 && result.z < 10.5).to.be.true
      })
    })

    it('randomInUnitSphere()', () => {
      const result = Vec3.randomInUnitSphere()
      expect(result.length() < 1).to.be.true
    })

    it('randomUnitVector()', () => {
      const result = Vec3.randomUnitVector()
      expect(result.length()).to.equal(1)
    })
  })
})

describe('Color', () => {
  it('maps xyz to rgb', () => {
    const col = new Color(1, 2, 3)
    expect([col.r, col.g, col.b]).to.deep.equal([1, 2, 3])
  })

  describe('outputPpmFormat()', () => {
    it('returns the value as an rgb triplet if samplesPerPixel == 1', () => {
      const result = new Color(0.1, 0.5, 0.7).outputPpmFormat({ gamma: 1 })
      expect(result).to.equal('25 127 178')
    })

    it('corrects for gamma', () => {
      const result = new Color(0.1, 0.5, 0.7).outputPpmFormat({ gamma: 2 })
      expect(result).to.equal('80 180 213')
    })

    it('returns the average value based on samplesPerPixel', () => {
      const result = new Color(2, 2, 2).outputPpmFormat({ samplesPerPixel: 2})
      expect(result).to.equal('255 255 255')
    })

    it('clamps the value to 0-255', () => {
      const result = new Color(2, 1, 0.5).outputPpmFormat()
      expect(result).to.equal('255 255 180')
    })
  })

  it('has its own times() method that returns a Color', () => {
    const col = new Color(1, 0, 0)
    const vec = new Vec3(0.5, 0.5, 0.5)
    const result = col.times(vec)
    expect(result instanceof Color).to.equal(true)
    expect(result.asArray()).to.deep.equal([0.5, 0, 0])
  })

  it('has its own plus() method that returns a Color', () => {
    const col = new Color(1, 0, 0)
    const vec = new Vec3(0.5, 0.5, 0.5)
    const result = col.plus(vec)
    expect(result instanceof Color).to.equal(true)
    expect(result.asArray()).to.deep.equal([1.5, 0.5, 0.5])
  })
})

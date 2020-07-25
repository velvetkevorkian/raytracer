/* eslint-env mocha */
const { expect } = require('chai')
const {
  buildPixelArray,
  clamp,
  degreesToRadians,
  map,
  progressBar,
  radiansToDegrees,
  random,
} = require('.')

describe('utils', () => {
  describe('buildPixelArray()', () => {
    it('returns an array of arrays', () => {
      const result = buildPixelArray(2, 3)
      expect(result.length).to.equal(3)
    })

    it('each array has the right length', () => {
      const result = buildPixelArray(2, 3)
      expect(result[2].length).to.equal(2)
    })
  })

  describe('clamp()', () => {
    it('returns min if x < min', () => {
      expect(clamp(1, 2, 5)).to.equal(2)
    })

    it('returns max if x > max', () => {
      expect(clamp(10, 2, 5)).to.equal(5)
    })

    it('returns x if min < x < max', () => {
      expect(clamp(3, 2, 5)).to.equal(3)
    })
  })

  it('progressBar()', () => {
    const result = progressBar({progress: 2, total: 4, backgroundCharacter: '-', foregroundCharacter: '='})
    expect(result).to.equal('==--')
  })

  describe('random()', () => {
    it('returns a number 0>= x <1 if no arguments', () => {
      const result = random()
      expect(result >= 0).to.be.true
      expect(result < 1).to.be.true
    })

    it('returns a number between the min and max params', () => {
      const result = random(0.01, 0.015)
      expect(result >= 0.01).to.be.true
      expect(result < 0.015).to.be.true
    })
  })

  it('radiansToDegrees', () => {
    expect(radiansToDegrees(Math.PI)).to.equal(180)
  })

  it('degreesToRadians', () => {
    expect(degreesToRadians(180)).to.equal(Math.PI)
  })

  describe('map', () => {
    it('remaps values', () => {
      const result = map(10, 0, 20, 0, 2)
      expect(result).to.equal(1)
    })
  })
})

/* eslint-env mocha */
const { expect } = require('chai')
const {
  progressBar,
  ppm,
  random,
} = require('.')

const ppmExample =
`P3
100
100
255
foo`

describe('utils', () => {
  it('progressBar', () => {
    const result = progressBar({progress: 2, total: 4, backgroundCharacter: '-', foregroundCharacter: '='})
    expect(result).to.equal('==--')
  })

  it('ppm', () => {
    const result = ppm('foo', 100, 100)
    expect(result).to.equal(ppmExample)
  })

  describe('random', () => {
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
})

/* eslint-env mocha */
const { expect } = require('chai')
const { ppm } = require('.')

const ppmExample =
`P3
100
100
255
foo`

describe('ouput', () => {
  it('ppm()', () => {
    const result = ppm('foo', 100, 100)
    expect(result).to.equal(ppmExample)
  })
})

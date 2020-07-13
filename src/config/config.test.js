/* eslint-env mocha */
const { expect } = require('chai')
const config = require('.')

describe('buildConfig', () => {
  it('returns an object with the right defaults', () => {
    const result = config()
    expect(result.aspectRatio).to.equal(1.7777777777777777)
  })
})

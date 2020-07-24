/* eslint-env mocha */
const { expect } = require('chai')
const buildConfig = require('./buildConfig.js')

describe('buildConfig()', () => {
  it('sets defaults', () => {
    const result = buildConfig()
    expect(result).to.eql({
      aperture: 0,
      aspectRatio: 1.7777777777777777,
      imageHeight: 360,
      imageWidth: 640,
      lookAt: [0, 0, 0],
      lookFrom: [0, 1, -2],
      maxDepth: 5,
      samplesPerPixel: 25,
      verticalFov: 90,
    })
  })

  it('merges defaults and supplied values', () => {
    const result = buildConfig({ aperture: 1, imageWidth: 160 })
    expect(result).to.eql({
      aperture: 1,
      aspectRatio: 1.7777777777777777,
      imageHeight: 90,
      imageWidth: 160,
      lookAt: [0, 0, 0],
      lookFrom: [0, 1, -2],
      maxDepth: 5,
      samplesPerPixel: 25,
      verticalFov: 90,
    })
  })
})

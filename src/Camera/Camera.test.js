/* eslint-env mocha */
const { expect } = require('chai')
const { Camera } = require('.')

describe('Camera', () => {
  it('sets the default values correctly', () => {
    const camera = new Camera()
    expect(camera.aspectRatio).to.equal(1.7777777777777777)
    expect(camera.imageWidth).to.equal(384)
    expect(camera.imageHeight).to.equal(216)
    expect(camera.viewportWidth).to.equal(3.5555555555555554)
    expect(camera.lowerLeftCorner.asArray()).to.deep.equal([-1.7777777777777777, -1, -1])
    expect(camera.horizontal.asArray()).to.deep.equal([3.5555555555555554, 0, 0])
    expect(camera.vertical.asArray()).to.deep.equal([0, 2, 0])
  })

  it('getRay()', () => {
    const camera = new Camera()
    const { origin, direction } = camera.getRay(2, 2)
    expect(origin.asArray()).to.deep.equal([0, 0, 0])
    expect(direction.asArray()).to.deep.equal([5.333333333333333, 3, -1])
  })
})
/* eslint-env mocha */
const { expect } = require('chai')
const Camera = require('.')

describe('Camera', () => {
  it('sets the default values correctly', () => {
    const camera = new Camera()
    expect(camera.lowerLeftCorner.asArray()).to.deep.equal([
      -3.555555555555555,
      -1.9999999999999998,
      -2
    ])

    expect(camera.horizontal.asArray()).to.deep.equal([
      7.11111111111111,
      0,
      0
    ])

    expect(camera.vertical.asArray()).to.deep.equal([
      0,
      3.9999999999999996,
      0
    ])
  })

  it('getRay()', () => {
    const camera = new Camera()
    const { origin, direction } = camera.getRay(2, 2)
    expect(origin.asArray()).to.deep.equal([0, 0, 0])
    expect(direction.asArray()).to.deep.equal([
      10.666666666666664,
      5.999999999999999,
      -2
    ])
  })
})

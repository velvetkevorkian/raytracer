/* eslint-env mocha */
const { expect } = require('chai')
const Camera = require('.')

describe('Camera', () => {
  it('sets the default values correctly', () => {
    const camera = new Camera()
    expect(camera.lowerLeftCorner.asArray()).to.deep.equal([
      -1.7777777777777775,
      -0.9999999999999999,
      -1
    ])

    expect(camera.horizontal.asArray()).to.deep.equal([
      3.555555555555555,
      0,
      0
    ])

    expect(camera.vertical.asArray()).to.deep.equal([
      0,
      1.9999999999999998,
      0
    ])
  })

  it('getRay()', () => {
    const camera = new Camera()
    const { origin, direction } = camera.getRay(2, 2)
    expect(origin.asArray()).to.deep.equal([0, 0, 0])
    expect(direction.asArray()).to.deep.equal([
      5.333333333333332,
      2.9999999999999996,
      -1
    ])
  })
})

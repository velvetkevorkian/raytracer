/* eslint-env mocha */
const { expect } = require('chai')
const { Ray } = require('.')
const { Vec3 } = require('../Vec3')

describe('Ray', () => {
  it('at()', () => {
    const origin = new Vec3(0, 0, 0)
    const direction = new Vec3(0, 1, 0)
    const r = new Ray(origin, direction)
    expect(r.at(0.5).asArray()).to.deep.equal([0, 0.5, 0])
  })
})

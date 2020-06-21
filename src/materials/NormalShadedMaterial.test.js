/* eslint-env mocha */
const { expect } = require('chai')
const sinon = require('sinon')
const NormalShadedMaterial = require('./NormalShadedMaterial.js')
const { Vec3 } = require('../Vec3')

describe('NormalShadedMaterial', () => {
  let result, hit

  before(() => {
    sinon.stub(Vec3, 'randomUnitVector').returns(new Vec3(0, 0, 0))
    const material = new NormalShadedMaterial()
    hit = {
      t: 0.5,
      point: new Vec3(0, 1, 1),
      normal: new Vec3(0, 0, 1),
      frontFace: true,
      material,
    }
    result = material.scatter(hit)
  })

  after(() => {
    sinon.restore()
  })

  it('returns attenuation based on the normal direction', () => {
    expect(result.attenuation.asArray()).to.deep.equal([0.5, 0.5, 1])
  })

  it('returns a scattered ray based on the hit normal', () => {
    const { origin, direction } = result.scatteredRay
    expect(origin.asArray()).to.deep.equal(hit.point.asArray())
    expect(direction.asArray()).to.deep.equal(hit.normal.asArray())
  })
})

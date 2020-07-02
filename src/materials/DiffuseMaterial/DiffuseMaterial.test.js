/* eslint-env mocha */
const { expect } = require('chai')
const sinon = require('sinon')
const DiffuseMaterial = require('.')
const { Vec3, Color } = require('../../Vec3')

describe('DiffuseMaterial', () => {
  let result, hit

  before(() => {
    sinon.stub(Vec3, 'randomUnitVector').returns(new Vec3(0, 0, 0))
    const material = new DiffuseMaterial(new Color(1, 0, 0))
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


  it('returns attenuation based on the material color', () => {
    expect(result.attenuation.asArray()).to.deep.equal(hit.material.color.asArray())
  })

  it('returns a scattered ray based on the hit normal', () => {
    const { origin, direction } = result.scatteredRay
    expect(origin.asArray()).to.deep.equal(hit.point.asArray())
    expect(direction.asArray()).to.deep.equal(hit.normal.asArray())
  })
})

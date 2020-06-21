/* eslint-env mocha */
const { expect } = require('chai')
const sinon = require('sinon')
const MetalMaterial = require('./MetalMaterial.js')
const { Vec3, Color } = require('../Vec3')
const { Ray } = require('../Ray')

describe('MetalMaterial', () => {
  it('clamps fuzz to between 0 and 1', () => {
    const col = new Color(1, 0, 0)
    const fuzzy = new MetalMaterial(col, 100)
    const unfuzzy = new MetalMaterial(col, -100)
    expect(fuzzy.fuzz).to.equal(1)
    expect(unfuzzy.fuzz).to.equal(0)
  })

  describe('scatter()', () => {
    // TODO: tests
    describe('a ray that reflects', () => {
      it('returns attenuation based on the material color')
      it('returns a scattered ray based on the hit normal and fuzz')
    })

    describe("a ray that doesn't reflect", () => {
      it('returns an empty object')
    })
  })
})

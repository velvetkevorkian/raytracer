/* eslint-env mocha */
const { expect } = require('chai')
const buildMaterial = require('./buildMaterial.js')
const {
  DielectricMaterial,
  DiffuseMaterial,
  MetalMaterial,
  NormalShadedMaterial,
} = require('../materials')

let realConsole

describe('buildMaterial()', () => {
  before(() => {
    realConsole = console.warn
    console.warn = () => {}
  })

  after(() => {
    console.warn = realConsole
  })

  describe('returns a default', () => {
    it('if no material specified', () => {
      const result = buildMaterial()
      expect(result instanceof DiffuseMaterial).to.be.true
      expect(result.color.asArray()).to.eql([0.5, 0.5, 0.5])
    })

    it('if an invalid material is specified', () => {
      const result = buildMaterial({ type: 'Foo' })
      expect(result instanceof DiffuseMaterial).to.be.true
      expect(result.color.asArray()).to.eql([0.5, 0.5, 0.5])
    })
  })

  describe('Dielectric Material', () => {
    it('sets default values', () => {
      const result = buildMaterial({ type: 'DielectricMaterial' })
      expect(result instanceof DielectricMaterial).to.be.true
      expect(result.refractiveIndex).to.equal(1)
      expect(result.color.asArray()).to.eql([1, 1, 1])
    })

    it('uses values if supplied', () => {
      const result = buildMaterial({
        type: 'DielectricMaterial',
        refractiveIndex: 1.5,
        color: { r: 1, g: 0, b: 0 },
      })
      expect(result instanceof DielectricMaterial).to.be.true
      expect(result.refractiveIndex).to.equal(1.5)
      expect(result.color.asArray()).to.eql([1, 0, 0])
    })
  })

  describe('Diffuse Material', () => {
    it('sets default values', () => {
      const result = buildMaterial({ type: 'DiffuseMaterial' })
      expect(result instanceof DiffuseMaterial).to.be.true
      expect(result.color.asArray()).to.eql([0.5, 0.5, 0.5])
    })

    it('uses values if supplied', () => {
      const result = buildMaterial({
        type: 'DiffuseMaterial',
        color: { r: 1, g: 0, b: 0 },
      })
      expect(result instanceof DiffuseMaterial).to.be.true
      expect(result.color.asArray()).to.eql([1, 0, 0])
    })
  })

  describe('Metal Material', () => {
    it('sets default values', () => {
      const result = buildMaterial({ type: 'MetalMaterial' })
      expect(result instanceof MetalMaterial).to.be.true
      expect(result.color.asArray()).to.eql([1, 1, 1])
      expect(result.fuzz).to.equal(0)
    })

    it('uses values if supplied', () => {
      const result = buildMaterial({
        type: 'MetalMaterial',
        color: { r: 1, g: 0, b: 0 },
        fuzz: 1,
      })
      expect(result instanceof MetalMaterial).to.be.true
      expect(result.color.asArray()).to.eql([1, 0, 0])
      expect(result.fuzz).to.equal(1)
    })
  })

  describe('Normal Shaded Material', () => {
    it('creates the material', () => {
      const result = buildMaterial({ type: 'NormalShadedMaterial' })
      expect(result instanceof NormalShadedMaterial).to.be.true
    })
  })
})

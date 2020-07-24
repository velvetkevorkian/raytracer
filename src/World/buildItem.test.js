/* eslint-env mocha */
const { expect } = require('chai')
const buildItem = require('./buildItem.js')
const { Sphere } = require('../Hittable')
const { DiffuseMaterial } = require('../materials')

describe('buildItem', () => {
  describe('builds the geometry and material', () => {
    const result = buildItem({
      geometry: {
        type: 'Sphere',
        radius: 1,
        position: { x: 0, y: 0, z: 0 },
      },
      material: {
        type: 'DiffuseMaterial',
        color: { r: 1, g: 0, b: 0 },
      },
    })

    it('builds the geometry', () => {
      expect(result instanceof Sphere).to.be.true
      expect(result.radius).to.equal(1)
      expect(result.position.asArray()).to.eql([0, 0, 0])
    })

    it('builds the material', () => {
      const { material } = result
      expect(material instanceof DiffuseMaterial).to.be.true
      expect(material.color.asArray()).to.eql([1, 0, 0])
    })
  })
})

/* eslint-env mocha */
const { expect } = require('chai')
const buildGeometry = require('./buildGeometry.js')
const { Plane, Sphere } = require('../Hittable')

describe('buildGeometry()', () => {
  it("throws an error if passed a type it doesn't recognise", () => {
    const func = () => buildGeometry({ type: 'Foo'})
    expect(func).to.throw(Error, 'Unrecognised geometry: Foo')
  })

  describe('Plane', () => {
    describe('builds a Plane with defaults', () => {
      const result = buildGeometry({ type: 'Plane' })

      it('is a Plane', () => {
        expect(result instanceof Plane).to.be.true
      })

      it('position', () => {
        expect(result.position.asArray()).to.eql([0, 0, 0])
      })

      it('vector', () => {
        expect(result.vector.asArray()).to.eql([0, 1, 0])
      })
    })

    describe('builds a Plane with supplied values', () => {
      const result = buildGeometry({
        type: 'Plane',
        position: {x: 1, y: 1, z: 1},
        normal: {x: 0, y: -1, z: 0 },
      })

      it('is a Plane', () => {
        expect(result instanceof Plane).to.be.true
      })

      it('position', () => {
        expect(result.position.asArray()).to.eql([1, 1, 1])
      })

      it('vector', () => {
        expect(result.vector.asArray()).to.eql([0, -1, 0])
      })
    })
  })

  describe('Sphere', () => {
    describe('builds a Sphere with defaults', () => {
      const result = buildGeometry({ type: 'Sphere' })

      it('is a Sphere', () => {
        expect(result instanceof Sphere).to.be.true
      })

      it('position', () => {
        expect(result.position.asArray()).to.eql([0, 0, 0])
      })

      it('radius', () => {
        expect(result.radius).to.equal(1)
      })
    })

    describe('builds a Sphere with supplied values', () => {
      const result = buildGeometry({
        type: 'Sphere',
        position: { x: 1, y: 2, z: 3 },
        radius: 2,
      })

      it('is a Sphere', () => {
        expect(result instanceof Sphere).to.be.true
      })

      it('position', () => {
        expect(result.position.asArray()).to.eql([1, 2, 3])
      })

      it('radius', () => {
        expect(result.radius).to.equal(2)
      })
    })
  })
})

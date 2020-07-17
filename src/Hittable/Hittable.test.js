/* eslint-env mocha */
const { expect } = require('chai')
const { Hittable, Sphere, Plane } = require('.')
const { Vec3 } = require('../Vec3')
const { Ray } = require('../Ray')

const tMin = 0
const tMax = Infinity

describe('Hittable', () => {
  const ray = new Ray(new Vec3(0, 0, 0), new Vec3(0, 1, 0))

  describe('hitArray()', () => {
    it('handles an empty world array', () => {
      const result = Hittable.hitArray({ arr: [], ray, tMin, tMax })
      expect(result).to.be.null
    })

    it('handles a null world array', () => {
      const result = Hittable.hitArray({ arr: null, ray, tMin, tMax })
      expect(result).to.be.null
    })

    it('returns null if nothing hits', () => {
      const world = [
        new Sphere({ position: new Vec3(-1, 0, 0), radius: 0.25 }),
      ]
      const result = Hittable.hitArray({ arr: world, ray, tMin, tMax })
      expect(result).to.be.null
    })

    it('returns a hitrecord object if it hits something', () => {
      const world = [
        new Sphere({ position: new Vec3(0, 2, 0), radius: 1 }),
      ]
      const result = Hittable.hitArray({ arr: world, ray, tMin, tMax })
      expect(result.t).to.equal(1)
      expect(result.point.asArray()).to.deep.equal([0, 1, 0])
      expect(result.normal.asArray()).to.deep.equal([0, -1, 0])
      expect(result.frontFace).to.be.true
    })

    it('returns the hitrecord of the closest object', () => {
      const world = [
        new Sphere({ position: new Vec3(0, 2, 0), radius: 1 }),
        new Sphere({ position: new Vec3(0, 1, 0), radius: 0.5 }),
      ]
      const result = Hittable.hitArray({ arr: world, ray, tMin, tMax })
      expect(result.t).to.equal(0.5)
      expect(result.point.asArray()).to.deep.equal([0, 0.5, 0])
      expect(result.normal.asArray()).to.deep.equal([0, -1, 0])
      expect(result.frontFace).to.be.true
    })
  })
})

describe('Sphere', () => {
  describe('hit()', () => {
    it("returns null if the ray doesn't hit", () => {
      const sphere = new Sphere({ position: new Vec3(0, 0, 0) , radius: 0.5 })
      const ray = new Ray(new Vec3(0, 1, 0), new Vec3(0, 1, 0))
      const result = sphere.hit(ray, tMin, tMax)
      expect(result).to.be.null
    })

    it('returns a hitRecord object', () => {
      const sphere = new Sphere({ position: new Vec3(0, 1, 0), radius: 0.5 })
      const ray = new Ray(new Vec3(0, 0, 0), new Vec3(0, 1, 0))
      const result = sphere.hit(ray, tMin, tMax)
      expect(result.t).to.equal(0.5)
      expect(result.point.asArray()).to.deep.equal([0, 0.5, 0])
      expect(result.normal.asArray()).to.deep.equal([0, -1, 0])
      expect(result.frontFace).to.be.true
    })

    it('returns with `frontFace: true` if the ray hits from outside', () => {
      const sphere = new Sphere({ position: new Vec3(0, 1, 0), radius: 0.5 })
      const ray = new Ray(new Vec3(0, 0, 0), new Vec3(0, 1, 0))
      const result = sphere.hit(ray, tMin, tMax)
      expect(result.frontFace).to.be.true
    })

    it('returns with `frontFace: false` if the ray hits from inside', () => {
      const sphere = new Sphere({ position: new Vec3(0, 0, 0), radius: 10 })
      const ray = new Ray(new Vec3(0, 0, 0), new Vec3(0, 1, 0))
      const result = sphere.hit(ray, tMin, tMax)
      expect(result.frontFace).to.be.false
    })

    it('calculates the normal', () => {
      const sphere = new Sphere({ position: new Vec3(0, 0, 0), radius: 1 })
      const ray = new Ray(new Vec3(0, 0.999, 0), new Vec3(0, 1, 0))
      const result = sphere.hit(ray, tMin, tMax)
      expect(result.normal.asArray()).to.deep.equal([-0, -1, -0])
    })
  })
})

describe('Plane', () => {
  describe('hit()', () => {
    it('returns null if the ray and the plane are parallel', () => {
      const plane = new Plane({ point: new Vec3(0, 0, 0), vector: new Vec3(0, 1, 0) })
      const ray = new Ray(new Vec3(0, 0, 0), new Vec3(1, 0, 0))
      const result = plane.hit(ray, tMin, tMax)
      expect(result).to.be.null
    })

    it("returns a hit record with the plane's normal if hit from the front", () => {
      const plane = new Plane({ point: new Vec3(0, 0, 0), vector: new Vec3(0, 1, 0) })
      const ray = new Ray(new Vec3(0, 1, 0), new Vec3(0, -1, 0))
      const result = plane.hit(ray, tMin, tMax)
      expect(result.frontFace).to.be.true
      expect(result.normal.asArray()).to.deep.equal([0, 1, 0])
    })

    it("returns the plane's negative normal if hit from the back", () => {
      const plane = new Plane({ point: new Vec3(0, 0, 0), vector: new Vec3(0, 1, 0) })
      const ray = new Ray(new Vec3(0, -1, 0), new Vec3(0, 1, 0))
      const result = plane.hit(ray, tMin, tMax)
      expect(result.frontFace).to.be.true
      expect(result.normal.asArray()).to.deep.equal([-0, -1, -0])
    })
  })
})

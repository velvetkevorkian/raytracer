const fs = require('fs')
const { Vec3, Color } = require('./src/Vec3')
const { Ray } = require('./src/Ray')
const { Hittable, Sphere } = require('./src/Hittable')

const ppm = (data, width, height) => (
`P3
${width}
${height}
255
${data}
`)

function rayColor(ray, world) {
  const hit = Hittable.hitArray({ arr: world, ray, tMin: 0, tMax: Infinity })
  if (hit) {
    return hit.normal
      .plus(new Color(1, 1, 1))
      .times(0.5)
      .asColor()
  }
  const unitDirection = ray.direction.unitVector()
  const bg = 0.5 * (unitDirection.y + 1)
  return new Color(1, 1, 1)
    .times(1-bg)
    .plus(new Color(0.5, 0.7, 1).times(bg))
}

function setupCamera({ aspectRatio = 16/9, imageWidth = 384 }) {
  const imageHeight = parseInt(imageWidth / aspectRatio, 10)

  const viewportHeight = 2
  const viewportWidth = viewportHeight * aspectRatio
  const focalLength = 1
  const origin = new Vec3(0, 0, 0)
  const horizontal = new Vec3(viewportWidth, 0, 0)
  const vertical = new Vec3(0, viewportHeight, 0)
  const lowerLeftCorner = origin
    .minus(horizontal.dividedBy(2))
    .minus(vertical.dividedBy(2))
    .minus(new Vec3(0, 0, focalLength))

  return {
    imageHeight,
    imageWidth,
    horizontal,
    vertical,
    lowerLeftCorner,
    origin,
  }
}

function main() {
  const {
    imageHeight,
    imageWidth,
    horizontal,
    vertical,
    lowerLeftCorner,
    origin,
  } = setupCamera({ aspectRatio: 16/9, imageWidth: 384 })

  const world = [
    new Sphere(new Vec3(0, 0, -1), 0.5),
    new Sphere(new Vec3(0, -100.5, -1), 100),
  ]

  const output = []
  for (let j = imageHeight-1; j >= 0; j-- ) {
    const processed = parseInt(((imageHeight - j) / imageHeight) * 100, 10)
    console.log(`${processed}%`)

    for (let i = 0; i < imageWidth; i++) {
      const u = i / (imageWidth - 1)
      const v = j / (imageHeight - 1)
      const direction = lowerLeftCorner
        .plus(horizontal.times(u))
        .plus(vertical.times(v))
        .minus(origin)

      const ray = new Ray(origin, direction)
      const col = rayColor(ray, world)
      output.push(col.outputPpmFormat())
    }
  }

  console.log('Writing file...')

  fs.writeFile('./output.ppm', ppm(output.join('\n'), imageWidth, imageHeight), (err) => {
    if(err) {
      console.error('error writing file:')
      throw err
    }
    console.log('Finished writing file.')
  })
}

main()

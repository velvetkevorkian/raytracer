const fs = require('fs')
const process = require('process')
const readline = require('readline')
const { Vec3, Color } = require('./src/Vec3')
const { Ray } = require('./src/Ray')

const ppm = (data, width, height) => (
`P3
${width}
${height}
255
${data}
`)

function rayColor(r) {
  if(hitSphere(new Vec3(0, 0, -1), 0.5, r)) {
    return new Color(1, 0, 0)
  }
  const unitDirection = Vec3.unitVector(r.direction)
  const t = 0.5 * (unitDirection.y + 1)
  return new Color(1, 1, 1)
    .times(1-t)
    .plus(new Color(0.5, 0.7, 1)
    .times(t))
    .asColor()
}

function hitSphere(center, radius, ray) {
  const oc = ray.origin.minus(center)
  const a = Vec3.dot(ray.direction, ray.direction)
  const b = Vec3.dot(oc, ray.direction) * 2
  const c = Vec3.dot(oc, oc) - (radius * radius)
  const discriminant = (b * b) - (4 * a * c)
  return discriminant > 0
}

function main() {
  const aspectRatio = 16/9
  const imageWidth = 384
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

      const r = new Ray(origin, direction)
      const col = rayColor(r)
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

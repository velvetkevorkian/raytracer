const fs = require('fs')
const { Vec3, Color } = require('./Vec3')
const { Hittable, Sphere } = require('./Hittable')
const { Camera } = require('./Camera')
const materials = require('./materials')
const { progressBar, ppm, random } = require('./utils')

function rayColor(ray, world, depth) {
  if(depth <= 0) return new Color(0, 0, 0)

  const hit = Hittable.hitArray({ arr: world, ray, tMin: 0.0001, tMax: Infinity })
  if (hit) {
    const {
      attenuation,
      scatteredRay,
     } = hit.material.scatter(hit, ray) || {}

    if (!attenuation || !scatteredRay) return new Color(0, 0, 0)
    return attenuation.times(rayColor(scatteredRay, world, depth-1))
  }
  const unitDirection = ray.direction.unitVector()
  const bg = 0.5 * (unitDirection.y + 1)
  return new Color(1, 1, 1)
    .times(1-bg)
    .plus(new Color(0.5, 0.7, 1).times(bg))
}

function buildWorld() {
  const purple = new materials.DiffuseMaterial(new Color(0.5, 0, 0.8))
  const grey = new materials.DiffuseMaterial(new Color(0.5, 0.5, 0.5))
  return [
    new Sphere(new Vec3(0, 0, -1), 0.5, purple),
    new Sphere(new Vec3(0, -100.5, -0.5), 100, grey),
  ]
}

function main() {
  const imageWidth = 384
  const aspectRatio = 16/9
  const camera = new Camera({ imageWidth, aspectRatio })
  const { imageHeight } = camera
  const samplesPerPixel = 100
  const maxDepth = 50
  const world = buildWorld()
  const output = []
  const started = Date.now()
  let totalProgress = 0

  for (let j = imageHeight-1; j >= 0; j-- ) {
    const currentProgress = parseInt(((imageHeight - j) / imageHeight) * 100, 10)
    if (currentProgress > totalProgress) {
      totalProgress = currentProgress
      process.stdout.write(`\r${progressBar({ progress: totalProgress })}`)
    }

    for (let i = 0; i < imageWidth; i++) {
      let pixelColor = new Color(0, 0, 0)
      for (let s = 0; s < samplesPerPixel; s ++) {
        const u = (i + random()) / (imageWidth - 1)
        const v = (j + random()) / (imageHeight - 1)
        const ray = camera.getRay(u, v)
        pixelColor = pixelColor.plus(rayColor(ray, world, maxDepth))
      }
      output.push(pixelColor.outputPpmFormat({ samplesPerPixel }))
    }
  }
  process.stdout.write(`\r\n`)

  const totalTime = (Date.now() - started) / 1000
  const totalPixels = (imageHeight * imageWidth).toLocaleString('en-GB')
  console.log(`Rendered ${totalPixels} pixels in ${totalTime} seconds`)

  console.log('Writing file...')

  fs.writeFile('./output.ppm', ppm(output.join('\n'), imageWidth, imageHeight), (err) => {
    if(err) {
      console.error('Error writing file:')
      throw err
    }
    console.log('Finished writing file.')
  })
}

main()

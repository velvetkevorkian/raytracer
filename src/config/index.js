const { cpus } = require('os')
const { Vec3 } = require('../Vec3')

function config() {
  // todo: some of this should live in the world definition
  const imageWidth = 640
  const aspectRatio = 16/9
  const lookFrom = new Vec3(13, 2, 3)
  const lookAt = new Vec3(0, 0, 0)

  return {
    imageWidth,
    aspectRatio,
    imageHeight: parseInt(imageWidth / aspectRatio, 10),
    samplesPerPixel: 50,
    maxDepth: 5,
    verticalFov: 20,
    aperture: 0.1,
    threads: cpus().length - 1,
    showProgress: true,
    progressUpdateFrequency: 1000,
    lookFrom: lookFrom.asArray(),
    lookAt: lookAt.asArray(),
  }
}

module.exports = config

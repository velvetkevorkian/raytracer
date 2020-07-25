function buildConfig(config = {}) {
  const {
    aperture = 0,
    aspectRatio = 16/9,
    depthPass = false,
    imageWidth = 640,
    lookAt = [0, 0, 0],
    lookFrom = [0, 1, -2],
    maxDepth = 5,
    samplesPerPixel = 25,
    verticalFov = 90,
  } = config

  return {
    aperture,
    aspectRatio,
    depthPass,
    imageHeight: parseInt(imageWidth / aspectRatio, 10),
    imageWidth,
    lookAt,
    lookFrom,
    maxDepth,
    samplesPerPixel,
    verticalFov,
  }
}

module.exports = buildConfig

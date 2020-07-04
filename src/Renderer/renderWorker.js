const { workerData, parentPort } = require('worker_threads')
const { Color } = require('../Vec3')
const { rayColor } = require('./index.js')
const { random } = require('../utils')
const Camera = require('../Camera')
const { buildWorld } = require('../World')

const {
  samplesPerPixel,
  imageWidth,
  imageHeight,
  maxDepth,
  aspectRatio,
  verticalFov,
} = workerData

const camera = new Camera({
  imageWidth,
  aspectRatio,
  verticalFov,
})
const world = buildWorld()

parentPort.on('message', data => {
  const { x, y } = data
  renderPixel(x, y)
})

function renderPixel(x, y) {
  let pixelColor = new Color(0, 0, 0)
  for (let s = 0; s < samplesPerPixel; s ++) {
    const u = (x + random()) / (imageWidth - 1)
    const v = (y + random()) / (imageHeight - 1)
    const ray = camera.getRay(u, v)
    pixelColor = pixelColor.plus(rayColor(ray, world, maxDepth))
  }

  const [ r, g, b] = pixelColor.divideEquals(samplesPerPixel).asArray()

  parentPort.postMessage({
    r, g, b,
    x, y,
  })
}

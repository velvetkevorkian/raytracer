const { workerData, parentPort } = require('worker_threads')
const { Vec3, Color } = require('../Vec3')
const { rayColor, depth } = require('./index.js')
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
  aperture,
  lookFrom,
  lookAt,
  worldData,
  depthPass,
} = workerData

const camera = new Camera({
  aspectRatio,
  verticalFov,
  lookFrom: new Vec3(lookFrom),
  lookAt: new Vec3(lookAt),
  aperture,
})

const world = buildWorld(worldData)

parentPort.on('message', data => {
  const { x, y } = data
  depthPass ? renderDepth(x, y) : renderPixel(x, y)
})

function renderPixel(x, y) {
  let pixelColor = new Color(0, 0, 0)
  // TODO: refactor this worker to do one sample at a time
  // so we don't have to recreate the world+camera in each worker
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

function renderDepth(x, y) {
  let t = 0
  for(let s = 0; s < samplesPerPixel; s ++) {
    const u = (x + random()) / (imageWidth - 1)
    const v = (y + random()) / (imageHeight - 1)
    const ray = camera.getRay(u, v)
    t = t + depth(ray, world)
  }

  parentPort.postMessage({
    t: t / samplesPerPixel,
    x, y,
  })
}

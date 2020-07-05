const { Worker } = require('worker_threads')
const { cpus } = require('os')
const { Color } = require('./Vec3')
const {
  buildPixelArray,
  progressBar,
} = require('./utils')
const { writePpmFile } = require('./output')

function main() {
  const imageWidth = 384
  const aspectRatio = 16/9
  const imageHeight = parseInt(imageWidth / aspectRatio, 10)
  const samplesPerPixel = 50
  const maxDepth = 25
  const verticalFov = 90
  const aperture = 0
  const threads = cpus().length - 1
  const started = Date.now()
  let progressPercent = 0
  const pixelArray = buildPixelArray(imageWidth, imageHeight)
  const showProgress = true
  const totalPixels = (imageHeight * imageWidth)
  let currentPixel = 0
  const progressUpdateFrequency = 1000
  let progressUpdateInterval = null

  const workerData = {
    samplesPerPixel,
    imageWidth,
    imageHeight,
    aspectRatio,
    maxDepth,
    verticalFov,
    aperture,
  }

  function handleMessage(data) {
    pixelArray[data.y][data.x] = new Color(data.r, data.g, data.b)

    currentPixel ++

    if (currentPixel === totalPixels) {
      workers.forEach(w => w.terminate())
      clearInterval(progressUpdateInterval)
      if (showProgress) process.stdout.write(`\r\n`)
      const totalTime = (Date.now() - started) / 1000
      console.log(`Rendered ${totalPixels.toLocaleString('en-GB')} pixels in ${totalTime} seconds`)
      writePpmFile(pixelArray, imageWidth, imageHeight)
    }
  }

  console.log(`Initialising ${threads} workers`)
  // TODO: use a proper worker pool instead of dumping everything in upfront

  const workers = Array.from({ length: threads }, () => new Worker('./src/Renderer/renderWorker.js', { workerData }))

  if (showProgress) {
    progressUpdateInterval = setInterval(() => {
      const currentProgressPercent = parseInt((currentPixel / totalPixels) * 100, 10)
      if (currentProgressPercent > progressPercent) {
        progressPercent = currentProgressPercent
        process.stdout.write(`\r${progressBar({ progress: progressPercent })}`)
      }
    }, progressUpdateFrequency)
  }

  let workersOnline = 0

  workers.forEach(w => {
    const id = workers.indexOf(w) + 1

    w.once('online', () => {
      console.log(`worker ${id} online`)
      workersOnline ++
      if(workersOnline === threads) render()
    })

    w.on('message', handleMessage)

    w.on('error', err => { console.log(`worker ${id} encountered an error: ${err}`)})

    w.once('exit', exitcode => { console.log(`worker ${id} exited with exit code ${exitcode}`)})
  })

  function render() {
    console.log('beginning render...')
    for (let j = 0; j < imageHeight; j++ ) {
      for (let i = 0; i < imageWidth; i++) {
        workers[i % threads].postMessage({
          x: i,
          y: j
        })
      }
    }
  }
}

main()

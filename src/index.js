const { Worker } = require('worker_threads')
const os = require('os')
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
  const samplesPerPixel = 100
  const maxDepth = 50
  const threads = os.cpus().length - 2
  const started = Date.now()
  let progressPercent = 0
  const pixelArray = buildPixelArray(imageWidth, imageHeight)
  const showProgress = true
  const totalPixels = (imageHeight * imageWidth)
  let currentPixel = 0

  const workerData = {
    samplesPerPixel,
    imageWidth,
    imageHeight,
    aspectRatio,
    maxDepth,
  }

  function handleMessage(data) {
    pixelArray[data.y][data.x] = new Color(data.r, data.g, data.b)

    currentPixel ++
    if (showProgress) {
      const currentProgressPercent = parseInt((currentPixel / totalPixels) * 100, 10)
      if (currentProgressPercent > progressPercent) {
        progressPercent = currentProgressPercent
        process.stdout.write(`\r${progressBar({ progress: progressPercent })}`)
      }
    }

    if (currentPixel === totalPixels) {
      workers.forEach(w => w.terminate())
      if (showProgress) process.stdout.write(`\r\n`)
      const totalTime = (Date.now() - started) / 1000
      console.log(`Rendered ${totalPixels.toLocaleString('en-GB')} pixels in ${totalTime} seconds`)
      writePpmFile(pixelArray, imageWidth, imageHeight)
    }
  }

  console.log(`Initialising ${threads} workers`)
  const workers = Array.from({ length: threads }, () => new Worker('./src/Renderer/renderWorker.js', { workerData }))

  workers.forEach(w => {
    const id = workers.indexOf(w) + 1
    w.once('online', () => { console.log(`worker ${id} online`)})

    w.on('message', handleMessage)

    w.once('exit', exitcode => { console.log(`worker ${id} exited with exit code ${exitcode}`)})
  })

  for (let j = 0; j < imageHeight; j++ ) {
    for (let i = 0; i < imageWidth; i++) {
      workers[i % threads].postMessage({
        x: i,
        y: j
      })
    }
  }
}

main()

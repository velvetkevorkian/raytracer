const fs = require('fs')
const { Worker } = require('worker_threads')
const { Color } = require('./Vec3')
const {
  buildPixelArray,
  ppm,
  progressBar,
} = require('./utils')

function writeFile(pixelArray, imageWidth, imageHeight) {
  console.log(`Writing output.ppm at ${imageWidth}x${imageHeight}px`)
  const result = pixelArray
  .map(i => i
    .map(j => {
      try {
        return j.outputPpmFormat()
      } catch (err) {
        console.log()
        return '0 0 0'
      }
    })
    .join(' '))
  .reverse()
  .join('\n')

  fs.writeFile('./output.ppm', ppm(result, imageWidth, imageHeight), (err) => {
    if(err) {
      console.error('Error writing file:')
      throw err
    }
    console.log('Finished writing file.')
  })
}

function main() {
  const imageWidth = 384
  const aspectRatio = 16/9
  const imageHeight = parseInt(imageWidth / aspectRatio, 10)
  const samplesPerPixel = 100
  const maxDepth = 50
  const started = Date.now()
  let progressPercent = 0
  const pixelArray = buildPixelArray(imageWidth, imageHeight)
  const showProgress = true
  const totalPixels = (imageHeight * imageWidth)
  let currentPixel = 0

  const worker = new Worker('./src/Renderer/renderWorker.js', {
    workerData:  {
      samplesPerPixel,
      imageWidth,
      imageHeight,
      aspectRatio,
      maxDepth,
    }
  })

  worker.on('message', data => {
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
      worker.terminate()
      if (showProgress) process.stdout.write(`\r\n`)
      const totalTime = (Date.now() - started) / 1000
      console.log(`Rendered ${totalPixels.toLocaleString('en-GB')} pixels in ${totalTime} seconds`)
      writeFile(pixelArray, imageWidth, imageHeight)
    }
  })

  for (let j = 0; j < imageHeight; j++ ) {
    for (let i = 0; i < imageWidth; i++) {
      worker.postMessage({
        x: i,
        y: j
      })
    }
  }
}

main()

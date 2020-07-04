const fs = require('fs')

function ppm (data, width, height) {
  return [
    'P3',
    width,
    height,
    255,
    data,
  ].join('\n')
}

function writePpmFile(pixelArray, imageWidth, imageHeight) {
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

module.exports = {
  writePpmFile,
  ppm, // for testing
}

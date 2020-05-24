const fs = require('fs')
const imageWidth = 256
const imageHeight = 256
const { Color } = require('./src/Vec3')

const ppm = (data) => (
`P3
${imageWidth}
${imageHeight}
255
${data}
`)

const output = []

for (let j = imageHeight-1; j >= 0; j-- ) {
  console.log(`Scanlines remaining: ${j}`)
  for (let i = 0; i < imageWidth; i++) {
    const col = new Color(
      parseInt(255.99 * (i / (imageWidth - 1))),
      parseInt(255.99 * (j / (imageHeight - 1))),
      parseInt(255.99 * 0.25)
    )

    output.push(col.outputFormat())
  }
}

console.log('Done. Writing file:')

fs.writeFile('./output.ppm', ppm(output.join('\n')), (err) => {
  if(err) {
    console.error('error writing file:')
    throw err
  }
  console.log('finished writing file')
})

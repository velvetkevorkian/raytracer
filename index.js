const fs = require('fs')
const imageWidth = 256
const imageHeight = 256

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
    const r = parseInt(255.99 * (i / (imageWidth - 1)))
    const g = parseInt(255.99 * (j / (imageHeight - 1)))
    const b = parseInt(255.99 * 0.25)

    output.push(`${r} ${g} ${b}`)
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

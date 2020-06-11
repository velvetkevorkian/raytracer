function progressBar ({progress, total = 100, backgroundCharacter = '\u2591', foregroundCharacter = '\u2588' }) {
  const foreground = Array(progress).fill(foregroundCharacter).join('')
  const background = Array(total - progress).fill(backgroundCharacter).join('')
  return(`${foreground}${background}`)
}

function ppm (data, width, height) {
  return [
    'P3',
    width,
    height,
    255,
    data,
  ].join('\n')
}

module.exports = {
  progressBar,
  ppm,
}

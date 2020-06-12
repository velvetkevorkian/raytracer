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

function random(min, max) {
  if (!min || !max) return Math.random()

  return min + (max - min) * Math.random()
}

function clamp(x, min, max) {
  if (x < min) return min
  if (x > max) return max
  return x
}

module.exports = {
  clamp,
  ppm,
  progressBar,
  random,
}

const buildItem = require('./buildItem')
const buildConfig = require('./buildConfig')

function buildWorld(input) {
  if (input instanceof Array) {
    return input.map(buildItem)
  }

  // TODO: handle errors
}

module.exports = {
  buildConfig,
  buildWorld,
}

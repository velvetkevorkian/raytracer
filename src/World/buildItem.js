const buildGeometry = require('./buildGeometry.js')
const buildMaterial = require('./buildMaterial.js')

function buildItem(input) {
  const { geometry, material } = input
  const hittableInstance = buildGeometry(geometry)
  hittableInstance.material = buildMaterial(material)
  return hittableInstance
}

module.exports = buildItem

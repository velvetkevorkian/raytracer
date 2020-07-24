module.exports = {
  config: {
    imageWidth: 160,
    aspectRatio: 16/9,
    samplesPerPixel: 50,
    maxDepth: 5,
    verticalFov: 90,
    aperture: 0,
    lookFrom: [0, 0, -2],
    lookAt: [0, 0, 0],
  },
  world: [
    {
      geometry: {
        type: 'Sphere',
        position: { x: 0, y: 0, z: 0 },
        radius: 1,
      },
      material: {
        type: 'DiffuseMaterial',
        color: { r: 0.5, g: 0.5, b: 0.5 },
      },
    },
  ],
}

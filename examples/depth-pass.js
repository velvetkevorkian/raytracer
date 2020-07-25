module.exports = {
  config: {
    imageWidth: 1280,
    aspectRatio: 16/9,
    samplesPerPixel: 75,
    maxDepth: 5,
    verticalFov: 90,
    aperture: 0,
    lookFrom: [0, 3, -2],
    lookAt: [0, 1, 0],
    depthPass: true,
  },
  world: [
    {
      geometry: {
        type: 'Sphere',
        position: { x: 0, y: 1, z: 0 },
        radius: 1,
      },
      material: {
        type: 'DiffuseMaterial',
        color: { r: 0.5, g: 0.5, b: 0.5 },
      },
    },
    {
      geometry: {
        type: 'Plane',
        position: { x: 0, y: 0, z: 0 },
        normal: { x: 0, y: 1, z: 0 },
      },
      material: {
        type: 'DiffuseMaterial',
        color: { r: 0.5, g: 0.5, b: 0.5 },
      },
    },
  ],
}

/* eslint-env mocha */
const { expect } = require('chai')
const { progressBar, ppm } = require('.')

describe('utils', () => {
  it('progressBar', () => {
    const result = progressBar({progress: 2, total: 4, backgroundCharacter: '-', foregroundCharacter: '='})
    expect(result).to.equal('==--')
  })

  it('ppm', () => {
    const result = ppm('foo', 100, 100)
    expect(result).to.equal(`P3
100
100
255
foo
`
    )
  })
})

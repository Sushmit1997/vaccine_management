const getExtension = require('../getExtension')

test('Give file extension', () => {

    expect(getExtension('picture.img')).toBe('img')
})
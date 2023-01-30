const isImage = require('../isImage')

describe('isImage', () => {
    it('returns true for jpg, gif, bmp, png, and jpeg extensions', () => {
      expect(isImage('test.jpg')).toBe(true)
      expect(isImage('test.gif')).toBe(true)
      expect(isImage('test.bmp')).toBe(true)
      expect(isImage('test.png')).toBe(true)
      expect(isImage('test.jpeg')).toBe(true)
    })
  
    it('eturns false for extensions other than jpg, gif, bmp, png, and jpeg', () => {  
      expect(isImage('test.pdf')).toBe(false)
    })
  })
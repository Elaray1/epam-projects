const rgbToHex = require('./script');

test('transform RGB format in HEX format', () => {
  expect(rgbToHex(255, 255, 255)).toBe('#ffffff');
})

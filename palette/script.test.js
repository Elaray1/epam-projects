const convertRgbToHex = require('./script');

test('transform RGB format in HEX format', () => {
  expect(convertRgbToHex(255, 255, 255)).toBe('#ffffff');
})

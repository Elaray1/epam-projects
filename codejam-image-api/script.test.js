const convertRgbToHex = require('./script');

describe('convertRgbToHex', () => {
test('transform RGB format in HEX format (white)', () => {
  expect(convertRgbToHex(255, 255, 255)).toBe('#ffffff');
})

test('transform RGB format in HEX format (black)', () => {
  expect(convertRgbToHex(0, 0, 0)).toBe('#000000');
})
});

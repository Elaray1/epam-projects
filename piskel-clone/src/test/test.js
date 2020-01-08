const functionsArr = require('./functionsToTest');

const convertRgbToHex = functionsArr.convertRgbToHex;

describe('Color Change Check (from RGB to HEX)', () => {
  test('transform RGB format in HEX format (white)', () => {
    expect(convertRgbToHex(255, 255, 255)).toBe('#ffffff');
    expect(convertRgbToHex(255, 255, 255)).toMatchSnapshot();
  });

  test('transform RGB format in HEX format (black)', () => {
    expect(convertRgbToHex(0, 0, 0)).toBe('#000000');
    expect(convertRgbToHex(0, 0, 0)).toMatchSnapshot();
  });

  test('transform RGB format in HEX format (brown)', () => {
    expect(convertRgbToHex(127, 64, 15)).toBe('#7f400f');
    expect(convertRgbToHex(127, 64, 15)).toMatchSnapshot();
  })

  test('transform RGB format in HEX format (dark grey)', () => {
    expect(convertRgbToHex(47, 47, 47)).toBe('#2f2f2f');
    expect(convertRgbToHex(47, 47, 47)).toMatchSnapshot();
  })

  test('transform RGB format in HEX format (grey)', () => {
    expect(convertRgbToHex(77, 77, 77)).toBe('#4d4d4d');
    expect(convertRgbToHex(77, 77, 77)).toMatchSnapshot();
  })
});

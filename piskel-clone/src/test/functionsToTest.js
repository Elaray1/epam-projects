const convertComponentToHex = (c) => {
  const hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

const convertRgbToHex = (red, green, blue) => {
  return "#" + convertComponentToHex(red) + convertComponentToHex(green) + convertComponentToHex(blue);
}

module.exports = {
  convertRgbToHex,
};

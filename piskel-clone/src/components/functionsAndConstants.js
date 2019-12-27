function convertComponentToHex(c) {
  const hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

function convertRgbToHex(red, green, blue) {
  return "#" + convertComponentToHex(red) + convertComponentToHex(green) + convertComponentToHex(blue);
}

const colorsArray = [
  ["00BCD4", "FFEB3B","FFEB3B","00BCD4"],
  ["FFEB3B", "FFC107","FFC107","FFEB3B"],
  ["FFEB3B", "FFC107","FFC107","FFEB3B"],
  ["00BCD4", "FFEB3B","FFEB3B","00BCD4"]
];

const getPixel = (pixelData, coordinateX, coordinateY) => {
    if (coordinateX < 0 || coordinateY < 0 || coordinateX >= pixelData.width || coordinateY >= pixelData.height) {
        return NaN;
    }
    const pixels = pixelData.data;
    const i = (coordinateY * pixelData.width + coordinateX) * 4;
    return ((pixels[i + 0] & 0xFF) << 24) |
           ((pixels[i + 1] & 0xFF) << 16) |
           ((pixels[i + 2] & 0xFF) <<  8) |
           ((pixels[i + 3] & 0xFF) <<  0);
}

const getPixelColor = (pixelData, coordinateX, coordinateY) => {
  if (coordinateX < 0 || coordinateY < 0 || coordinateX >= pixelData.width || coordinateY >= pixelData.height) {
      return NaN;
  }
  const pixels = pixelData.data;
  const i = (coordinateY * pixelData.width + coordinateX) * 4;
  return ('0x' + convertRgbToHex(pixels[i], pixels[i + 1], pixels[i + 2]).substr(1) + 'FF');
}

const setPixel = (pixelData, coordinateX, coordinateY, currentColor) => {
    const i = (coordinateY * pixelData.width + coordinateX) * 4;
    const pixels = pixelData.data;
    pixels[i + 0] = (currentColor >>> 24) & 0xFF;
    pixels[i + 1] = (currentColor >>> 16) & 0xFF;
    pixels[i + 2] = (currentColor >>>  8) & 0xFF;
    pixels[i + 3] = (currentColor >>>  0) & 0xFF;
}

const diff = (c1, c2) => {
    if (isNaN(c1) || isNaN(c2)) {
        return Infinity;
    }
    const dr = ((c1 >>> 24) & 0xFF) - ((c2 >>> 24) & 0xFF);
    const dg = ((c1 >>> 16) & 0xFF) - ((c2 >>> 16) & 0xFF);
    const db = ((c1 >>>  8) & 0xFF) - ((c2 >>>  8) & 0xFF);
    const da = ((c1 >>>  0) & 0xFF) - ((c2 >>>  0) & 0xFF);
    return dr*dr + dg*dg + db*db + da*da;
}

function floodFill(canvas, x, y, replacementColor, delta) {
    let current, coordinateX1, coordinateX2, stack, color, currentX, currentY;
    const context = canvas.getContext("2d");
    const pixelData = context.getImageData(0, 0, canvas.width, canvas.height);
    if (getPixelColor(pixelData, x, y) === replacementColor) {
      return;
    }
    const done = [];
    for (let i = 0; i < canvas.width; i++) {
        done[i] = [];
    }
    const targetColor = getPixel(pixelData, x, y);
    delta *= delta;
    stack = [ [x, y] ];
    done[x][y] = true;
    while ((current = stack.pop())) {
        currentX = current[0];
        currentY = current[1];
        if (diff(getPixel(pixelData, currentX, currentY), targetColor) <= delta) {
            setPixel(pixelData, currentX, currentY, replacementColor);
            coordinateX1 = coordinateX2 = currentX;
            while (coordinateX1 > 0 && diff(getPixel(pixelData, coordinateX1 - 1, currentY), targetColor) <= delta) {
                --coordinateX1;
                if (done[coordinateX1][currentY]) break;
                setPixel(pixelData, coordinateX1, currentY, replacementColor);
            }
            while (coordinateX2 < pixelData.width - 1 && diff(getPixel(pixelData, coordinateX2 + 1, currentY), targetColor) <= delta) {
                ++coordinateX2;
                if (done[coordinateX2][currentY]) break;
                setPixel(pixelData, coordinateX2, currentY, replacementColor);
            }
            for (currentX = coordinateX1; currentX <= coordinateX2; currentX++) { // currentX can be = w = e if prev two conditions are not met, so this `for` won't work
                if (currentY > 0) {
                    color = getPixel(pixelData, currentX, currentY - 1);
                    if (diff(color, targetColor) <= delta) {
                        if (!done[currentX][currentY - 1]) {
                            stack.push([currentX, currentY - 1]);
                            done[currentX][currentY - 1] = true;
                        }
                    }
                }
                if (currentY < canvas.height - 1) {
                    color = getPixel(pixelData, currentX, currentY + 1);
                    if (diff(color, targetColor) <= delta) {
                        if (!done[currentX][currentY + 1]) {
                            stack.push([currentX, currentY + 1]);
                            done[currentX][currentY + 1] = true;
                        }
                    }
                }
            }
        }
    }
    context.putImageData(pixelData, 0, 0, 0, 0, canvas.width, canvas.height);
}

function addOrRemoveClassName(action, className, querySelector) {
  if (action === 'remove') {
    document.querySelector(querySelector).classList.remove(className);
  } else if (action === 'add') {
    document.querySelector(querySelector).classList.add(className);
  }
}

export {
  convertRgbToHex,
  colorsArray,
  floodFill,
  addOrRemoveClassName,
};

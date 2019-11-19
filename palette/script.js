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
window.onload = () => {
  const currentCanvas = localStorage.getItem("currentCanvas");
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext("2d");
  const scale = 128;
  const red = '0xFF0000FF';
  const blue = '0x0000FFFF';
  const grey = '0x808080FF';
  const redColor = document.getElementById('red_color');
  const blueColor = document.getElementById('blue_color');
  const previousColor = document.getElementById('prev_color');
  function initialCanvas() {
    for (let row = 0; row < colorsArray.length; row++) {
      for (let col = 0; col < colorsArray[0].length; col++) {
        context.fillStyle = '#' + colorsArray[row][col];
        context.fillRect(col * scale, row * scale, scale, scale);
      }
    }
  }
  if (currentCanvas === null) {
    initialCanvas();
  } else {
    const dataURL = currentCanvas;
    const img = new Image;
    img.src = dataURL;
    img.onload = function () {
        context.drawImage(img, 0, 0);
    };
  }
  const pencil = document.getElementById('pencil');
  const chooseColor = document.getElementById('choose_color');
  const paintBucket = document.getElementById('paint_bucket');
  let currentTool = pencil;
  currentTool.classList.add('selected-tool');
  const tools = [pencil, chooseColor, paintBucket];
  tools.forEach((el) => {
    el.addEventListener('click', () => {
      document.querySelector('.selected-tool').classList.remove('selected-tool');
      el.classList.add('selected-tool');
      currentTool = el.getAttribute('id');
    })
  });
  function getPixel(pixelData, x, y) {
      if (x < 0 || y < 0 || x >= pixelData.width || y >= pixelData.height) {
          return NaN;
      }
      const pixels = pixelData.data;
      const i = (y * pixelData.width + x) * 4;
      return ((pixels[i + 0] & 0xFF) << 24) |
             ((pixels[i + 1] & 0xFF) << 16) |
             ((pixels[i + 2] & 0xFF) <<  8) |
             ((pixels[i + 3] & 0xFF) <<  0);
  }
  function setPixel(pixelData, x, y, color) {
      const i = (y * pixelData.width + x) * 4;
      const pixels = pixelData.data;
      pixels[i + 0] = (color >>> 24) & 0xFF;
      pixels[i + 1] = (color >>> 16) & 0xFF;
      pixels[i + 2] = (color >>>  8) & 0xFF;
      pixels[i + 3] = (color >>>  0) & 0xFF;
  }
  function diff(c1, c2) {
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
  let currentColor = red;
  document.querySelector('.current-color').style.background = '#FF0000';
  let prevColor = grey;
  document.querySelector('.prev-color').style.background = '#808080';
  const theInputColor = document.getElementById("select_color");
  theInputColor.addEventListener("input", function() {
    document.querySelector('.prev-color').style.background = document.querySelector('.current-color').style.background;
    document.querySelector('.current-color').style.background = theInputColor.value;
    prevColor = currentColor;
    currentColor = '0x' + theInputColor.value.substr(1) + 'FF';
  }, false);
  redColor.addEventListener('click', () => {
    prevColor = currentColor;
    currentColor = red;
    document.querySelector('.prev-color').style.background = document.querySelector('.current-color').style.background;
    document.querySelector('.current-color').style.background = '#' + currentColor.substr(2, String(currentColor).length-4);
  });
  blueColor.addEventListener('click', () => {
    prevColor = currentColor;
    currentColor = blue;
    document.querySelector('.prev-color').style.background = document.querySelector('.current-color').style.background;
    document.querySelector('.current-color').style.background = '#' + currentColor.substr(2, String(currentColor).length-4);
  });
  previousColor.addEventListener('click', () => {
    let t = currentColor;
    currentColor = prevColor;
    prevColor = t;
    t = document.querySelector('.prev-color').style.background;
    document.querySelector('.prev-color').style.background = document.querySelector('.current-color').style.background;
    document.querySelector('.current-color').style.background = t;
  });
  function selectColor(x, y) {
    const pixelData = context.getImageData(x, y, 1, 1);
    const pixels = pixelData.data;
    prevColor = currentColor;
    currentColor = '0x' + convertRgbToHex(pixels[0], pixels[1], pixels[2]).substr(1) + 'FF';
    document.querySelector('.prev-color').style.background = document.querySelector('.current-color').style.background;
    document.querySelector('.current-color').style.background = convertRgbToHex(pixels[0], pixels[1], pixels[2]);
  }
  function drow(x, y, color) {
    if (!isDrawing) return;
    x = Math.floor(x / scale) * scale;
    y = Math.floor(y / scale) * scale;
    const pixelData = context.getImageData(x, y, scale, scale);
    for (let i = 0; i < scale * 4 * scale; i += 4) {
      pixelData.data[i] = (color >>> 24) & 0xFF;
      pixelData.data[i + 1] = (color >>> 16) & 0xFF;
      pixelData.data[i + 2] = (color >>>  8) & 0xFF;
      pixelData.data[i+ 3] = (color >>>  0) & 0xFF;
    }
    context.putImageData(pixelData, x, y);
  }
  let isDrawing = false;
  canvas.addEventListener('mousemove', (e) => {
    if (currentTool != 'pencil' || currentTool != pencil) {
      [x, y] = [e.offsetX, e.offsetY];
      drow(x, y, currentColor);
    }
  });
  canvas.addEventListener('mousedown', (e) => {
    if (currentTool === 'pencil' || currentTool === pencil) {
      isDrawing = true;
      [x, y] = [e.offsetX, e.offsetY];
      drow(x, y, currentColor);
    }
  });
  canvas.addEventListener('mouseup', () => isDrawing = false);
  canvas.addEventListener('mouseout', () => isDrawing = false);
  let x = 0, y = 0;
  canvas.addEventListener('click', (event) => {
    x = event.layerX;
    y = event.layerY;
    if (currentTool === 'paint_bucket') {
      floodFill(canvas, x, y, currentColor, 1);
    } else if (currentTool === 'choose_color') {
      selectColor(x, y);
    }
  })
  document.addEventListener('keydown', function(event) {
    if (event.keyCode === 66) { //key b
      currentTool = 'paint_bucket';
      document.querySelector('.selected-tool').classList.remove('selected-tool');
      paintBucket.classList.add('selected-tool');
    } else if (event.keyCode === 80) { //key p
      currentTool = 'pencil';
      document.querySelector('.selected-tool').classList.remove('selected-tool');
      pencil.classList.add('selected-tool');
    } else if (event.keyCode === 67) { //key c
      currentTool = 'choose_color';
      document.querySelector('.selected-tool').classList.remove('selected-tool');
      chooseColor.classList.add('selected-tool');
    }
  });
  window.addEventListener('beforeunload', () => {
    localStorage.setItem('currentCanvas', canvas.toDataURL());
  });
}
module.exports = convertRgbToHex;

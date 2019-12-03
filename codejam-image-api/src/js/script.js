const colorsArray = [
  ['00BCD4', 'FFEB3B','FFEB3B','00BCD4'],
  ['FFEB3B', 'FFC107','FFC107','FFEB3B'],
  ['FFEB3B', 'FFC107','FFC107','FFEB3B'],
  ['00BCD4', 'FFEB3B','FFEB3B','00BCD4']
];
function convertComponentToHex(c) {
  const hex = c.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}
function convertRgbToHex(red, green, blue) { //transform RGB format in HEX
  return '#' + convertComponentToHex(red) + convertComponentToHex(green) + convertComponentToHex(blue);
}
window.onload = () => {
  const currentCanvas = localStorage.getItem('currentCanvas');
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  let scale = 1;
  const pencil = document.getElementById('pencil');
  const chooseColor = document.getElementById('choose_color');
  const paintBucket = document.getElementById('paint_bucket');
  const red = '0xFF0000FF';
  const blue = '0x0000FFFF';
  const grey = '0x808080FF';
  const redColor = document.getElementById('red_color');
  const blueColor = document.getElementById('blue_color');
  const previousColor = document.getElementById('prev_color');
  const maxSize = 512;
  const selectedToolClassName = 'selected-tool';
  const accessKey = 'c29222b3f06bea411227ea9ea7b7878aed59e164737b3c4408060aca8a1c585f';
  const loadButton = document.getElementById('load-btn');
  const blackAndWhite = document.getElementById('black-and-white-btn');
  async function getLinkToImage(city) { //function that creates random image on canvas
    const url = `https://api.unsplash.com/photos/random?query=town,${city}&client_id=${accessKey}`;
    const data = await fetch(url).then(res => res.json());
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = data.urls.small;
    img.onload = function () {
      const wRatio = canvas.width / img.width;
      const hRatio = canvas.height / img.height;
      const ratio = Math.min(wRatio, hRatio);
      const center_x = (canvas.width - img.width * ratio) / 2;
      const center_y = (canvas.height - img.height * ratio) / 2;
      context.fillStyle = 'rgb(192, 192, 192)';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0, img.width, img.height,
        center_x, center_y, img.width * ratio, img.height * ratio);
    };
  }
  const grayScale = () => { // gray filter
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i]     = avg; // red
      data[i + 1] = avg; // green
      data[i + 2] = avg; // blue
    }
    context.putImageData(imageData, 0, 0);
};
  function addOrRemoveClassName(action, className, querySelector) {
   if (action === 'remove') {
     document.querySelector(querySelector).classList.remove(className);
   } else if (action === 'add') {
     document.querySelector(querySelector).classList.add(className);
   }
 }
 function setCanvasSize(size) {
   const img = new Image();
   img.onload = () => {
     canvas.width = size;
     canvas.height = size;
     scale = 512 / size;
     context.drawImage(img, 0, 0, img.width, img.height, 0, 0, size, size);
   };
   img.src = canvas.toDataURL();
 }
   $(function() { //canvas size slider
   $('#slider-range-pencil' ).slider({
     range: 'min',
     value: 512,
     min: 128,
     max: 512,
     step: 128,
     slide: function( event, ui ) {
       $('#pencil-size').val(ui.value);
       setCanvasSize(ui.value);
     }
   });
   $('#pencil-size').val($('#slider-range-pencil').slider('value'));
 });
  function drawDefaultCanvas() { //drawing default canvas
    for (let row = 0; row < colorsArray.length; row++) {
      for (let col = 0; col < colorsArray[0].length; col++) {
        context.fillStyle = '#' + colorsArray[row][col];
        context.fillRect(col * scale, row * scale, scale, scale);
      }
    }
  }
  if (currentCanvas === null) {
    scale = 128;
    drawDefaultCanvas();
  } else {
    const dataURL = currentCanvas;
    const img = new Image;
    img.src = dataURL;
    img.onload = function () {
        context.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
    };
  }
  let currentTool = pencil;
  currentTool.classList.add('selected-tool');
  const tools = [pencil, chooseColor, paintBucket];
  tools.forEach((el) => {
    el.addEventListener('click', () => {
      document.querySelector('.selected-tool').classList.remove('selected-tool');
      el.classList.add('selected-tool');
      currentTool = el.getAttribute('id');
    });
  });
  function getPixel(pixelData, coordinateX, coordinateY) { //secondary function for filling that takes pixel info
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
  function setPixel(pixelData, coordinateX, coordinateY, currentColor) { //secondary function for filling that transform pixels
      const i = (coordinateY * pixelData.width + coordinateX) * 4;
      const pixels = pixelData.data;
      pixels[i + 0] = (currentColor >>> 24) & 0xFF;
      pixels[i + 1] = (currentColor >>> 16) & 0xFF;
      pixels[i + 2] = (currentColor >>>  8) & 0xFF;
      pixels[i + 3] = (currentColor >>>  0) & 0xFF;
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
  function floodFill(canvas, coordinateX, coordinateY, replacementColor, delta) { //fill function
      const xAxis = Math.floor(coordinateX * canvas.width / maxSize);
      const yAxis = Math.floor(coordinateY * canvas.width / maxSize);
      let current, w, e, stack, color, currentX, currentY;
      const context = canvas.getContext('2d');
      const pixels = context.getImageData(xAxis, yAxis, 1, 1).data;
      if ('0x' + convertRgbToHex(pixels[0], pixels[1], pixels[2]).substr(1) + 'FF' === currentColor) {
        return;
      }
      const pixelData = context.getImageData(0, 0, canvas.width, canvas.height);
      const done = [];
      for (let i = 0; i < canvas.width; i++) {
          done[i] = [];
      }
      const targetColor = getPixel(pixelData, xAxis, yAxis);
      delta *= delta;
      stack = [ [xAxis, yAxis] ];
      done[xAxis][yAxis] = true;
      while ((current = stack.pop())) {
          currentX = current[0];
          currentY = current[1];
          if (diff(getPixel(pixelData, currentX, currentY), targetColor) <= delta) {
              setPixel(pixelData, currentX, currentY, replacementColor);
              w = e = currentX;
              while (w > 0 && diff(getPixel(pixelData, w - 1, currentY), targetColor) <= delta) {
                  --w;
                  if (done[w][currentY]) break;
                  setPixel(pixelData, w, currentY, replacementColor);
              }
              while (e < pixelData.width - 1 && diff(getPixel(pixelData, e + 1, currentY), targetColor) <= delta) {
                  ++e;
                  if (done[e][currentY]) break;
                  setPixel(pixelData, e, currentY, replacementColor);
              }
              for (currentX = w; currentX <= e; currentX++) {
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
  const theInputColor = document.getElementById('select_color');
  theInputColor.addEventListener('input', function() {
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
  function selectColor(coordinateX, coordinateY) { //fucntion for color picker tool that select the color
    const xAxis = Math.floor(coordinateX * canvas.width / maxSize);
    const yAxis = Math.floor(coordinateY * canvas.width / maxSize);
    const pixelData = context.getImageData(xAxis, yAxis, 1, 1);
    const pixels = pixelData.data;
    prevColor = currentColor;
    currentColor = '0x' + convertRgbToHex(pixels[0], pixels[1], pixels[2]).substr(1) + 'FF';
    document.querySelector('.prev-color').style.background = document.querySelector('.current-color').style.background;
    document.querySelector('.current-color').style.background = convertRgbToHex(pixels[0], pixels[1], pixels[2]);
  }
  function pencilDraw(coordinateX, coordinateY, currentColor) { //function for pencil tool that draw on canvas
    if (!isDrawing) return;
    const xAxis = Math.floor(coordinateX * canvas.width / maxSize);
    const yAxis = Math.floor(coordinateY * canvas.width / maxSize);
    const pixelData = context.getImageData(xAxis, yAxis, 1, 1);
    for (let i = 0; i < 1 * 4 * 1; i += 4) {
      pixelData.data[i] = (currentColor >>> 24) & 0xFF;
      pixelData.data[i + 1] = (currentColor >>> 16) & 0xFF;
      pixelData.data[i + 2] = (currentColor >>>  8) & 0xFF;
      pixelData.data[i+ 3] = (currentColor >>>  0) & 0xFF;
    }
    context.putImageData(pixelData, xAxis, yAxis);
  }
  let isDrawing = false;
  canvas.addEventListener('mousemove', (e) => {
    if (currentTool != 'pencil' || currentTool != pencil) {
      [coordinateX, coordinateY] = [e.offsetX, e.offsetY];
      pencilDraw(coordinateX, coordinateY, currentColor);
    }
  });
  canvas.addEventListener('mousedown', (e) => {
    if (currentTool === 'pencil' || currentTool === pencil) {
      isDrawing = true;
      [coordinateX, coordinateY] = [e.offsetX, e.offsetY];
      pencilDraw(coordinateX, coordinateY, currentColor);
    }
  });
  canvas.addEventListener('mouseup', () => isDrawing = false);
  canvas.addEventListener('mouseout', () => isDrawing = false);
  let coordinateX = 0, coordinateY = 0;
  canvas.addEventListener('click', (event) => {
    coordinateX = event.layerX;
    coordinateY = event.layerY;
    if (currentTool === 'paint_bucket') {
      floodFill(canvas, coordinateX, coordinateY, currentColor, 1);
    } else if (currentTool === 'choose_color') {
      selectColor(coordinateX, coordinateY);
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.keyCode === 66) { //keyCode of b
      currentTool = 'paint_bucket';
      addOrRemoveClassName('remove', selectedToolClassName, `.${selectedToolClassName}`);
      addOrRemoveClassName('add', selectedToolClassName, '#paint_bucket');
    } else if (event.keyCode === 80) { //keyCode of p
      currentTool = 'pencil';
      addOrRemoveClassName('remove', selectedToolClassName, `.${selectedToolClassName}`);
      addOrRemoveClassName('add', selectedToolClassName, '#pencil');
    } else if (event.keyCode === 67) { //keyCode of c
      currentTool = 'choose_color';
      addOrRemoveClassName('remove', selectedToolClassName, `.${selectedToolClassName}`);
      addOrRemoveClassName('add', selectedToolClassName, '#choose_color');
    }
  });
  loadButton.addEventListener('click', () => {
    const keyWord = document.getElementById('search-input').value;
    getLinkToImage(keyWord);
  });
  blackAndWhite.addEventListener('click', () => {
    grayScale();
  });
  window.addEventListener('beforeunload', () => {
    localStorage.setItem('currentCanvas', canvas.toDataURL());
  });
};
module.exports = convertRgbToHex;

import {   convertRgbToHex, colorsArray, floodFill, addOrRemoveClassName } from './functionsAndConstants'

window.onload = () => {
  const currentCanvas = localStorage.getItem("currentCanvas");
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext("2d");
  const scale = 128;
  const KEYCODE_B = 66;
  const KEYCODE_P = 80;
  const KEYCODE_C = 67;
  const KEYCODE_E = 69;
  const KEYCODE_S = 83;
  const red = '0xff0000FF';
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
  const eraser = document.getElementById('eraser');
  const straightLine = document.getElementById('straight_line');
  const tools = [pencil, chooseColor, paintBucket, eraser, straightLine];
  let currentTool = pencil;
  currentTool.classList.add('selected-tool');
  tools.forEach((el) => {
    el.addEventListener('click', () => {
      document.querySelector('.selected-tool').classList.remove('selected-tool');
      el.classList.add('selected-tool');
      currentTool = el.getAttribute('id');
    })
  });
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
  function selectColor(xAxis, yAxis) {
    const pixelData = context.getImageData(xAxis, yAxis, 1, 1);
    const pixels = pixelData.data;
    prevColor = currentColor;
    currentColor = '0x' + convertRgbToHex(pixels[0], pixels[1], pixels[2]).substr(1) + 'FF';
    document.querySelector('.prev-color').style.background = document.querySelector('.current-color').style.background;
    document.querySelector('.current-color').style.background = convertRgbToHex(pixels[0], pixels[1], pixels[2]);
  }
  function pencilDraw(coordinateX, coordinateY, currentColor) {
    if (!isDrawing) return;
    const xAxis = Math.floor(coordinateX / scale) * scale;
    const yAxis = Math.floor(coordinateY / scale) * scale;
    const pixelData = context.getImageData(xAxis, yAxis, scale, scale);
    for (let i = 0; i < scale * 4 * scale; i += 4) {
      pixelData.data[i] = (currentColor >>> 24) & 0xFF;
      pixelData.data[i + 1] = (currentColor >>> 16) & 0xFF;
      pixelData.data[i + 2] = (currentColor >>>  8) & 0xFF;
      pixelData.data[i+ 3] = (currentColor >>>  0) & 0xFF;
    }
    context.putImageData(pixelData, xAxis, yAxis);
  }
  let isDrawing = false;
  let isErasing = false;
  let isStraightLine = false;
  let isMouseDown = false;
  canvas.addEventListener('mousemove', (e) => {
      [xCoordinate, yCoordinate] = [e.offsetX, e.offsetY];
      switch (currentTool) {
        case 'pencil':
        case pencil:
          pencilDraw(xCoordinate, yCoordinate, currentColor);
          break;
        case 'eraser':
          erase(xCoordinate, yCoordinate);
          break;
        case 'straight_line':
          drawStraightLine(xCoordinate, yCoordinate);
          break;
        default:
          return;
      }
  });
  canvas.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    [xCoordinate, yCoordinate] = [e.offsetX, e.offsetY];
    switch (currentTool) {
      case 'pencil':
      case pencil:
        isDrawing = true;
        pencilDraw(xCoordinate, yCoordinate, currentColor);
        break;
      case 'eraser':
        isErasing = true;
        erase(xCoordinate, yCoordinate);
        break;
      default:
        return;
    }
  });

  const erase = (coordinateX, coordinateY) => {
    if (!isErasing) return;
    context.fillStyle="rgba(255,255,255,1)";
    context.fillRect(Math.floor(coordinateX / scale) * scale, Math.floor(coordinateY / scale) * scale, scale, scale);
  }

  const drawStraightLine = (coordinateX, coordinateY) => {
    const prevCanvas = context.getImageData(0, 0, canvas.width, canvas.height);
  }


  canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    isErasing = false;
    isMouseDown = false;
  });
  canvas.addEventListener('mouseout', () => {
    isDrawing = false;
    isErasing = false;
  });
  let xCoordinate = 0, yCoordinate = 0;
  canvas.addEventListener('click', (event) => {
    xCoordinate = event.layerX;
    yCoordinate = event.layerY;
    if (currentTool === 'paint_bucket') {
      floodFill(canvas, xCoordinate, yCoordinate, currentColor, 1);
    } else if (currentTool === 'choose_color') {
      selectColor(xCoordinate, yCoordinate);
    }
  })
  document.addEventListener('keydown', function(event) {
    switch (event.keyCode) {
      case KEYCODE_B:
        currentTool = 'paint_bucket';
        addOrRemoveClassName('remove', 'selected-tool', '.selected-tool');
        addOrRemoveClassName('add', 'selected-tool', '#paint_bucket');
        break;
      case KEYCODE_P:
        currentTool = 'pencil';
        addOrRemoveClassName('remove', 'selected-tool', '.selected-tool');
        addOrRemoveClassName('add', 'selected-tool', '#pencil');
        break;
      case KEYCODE_C:
        currentTool = 'choose_color';
        addOrRemoveClassName('remove', 'selected-tool', '.selected-tool');
        addOrRemoveClassName('add', 'selected-tool', '#choose_color');
        break;
      case KEYCODE_E:
        currentTool = 'eraser';
        addOrRemoveClassName('remove', 'selected-tool', '.selected-tool');
        addOrRemoveClassName('add', 'selected-tool', '#eraser');
        break;
      case KEYCODE_S:
        currentTool = 'straight_line';
        addOrRemoveClassName('remove', 'selected-tool', '.selected-tool');
        addOrRemoveClassName('add', 'selected-tool', '#straight_line');
        break;
      default:
        break;
    }
  });
  context.clearRect(0, 0, canvas.width, canvas.height);
  window.addEventListener('beforeunload', () => {
    localStorage.setItem('currentCanvas', canvas.toDataURL());
  });
}

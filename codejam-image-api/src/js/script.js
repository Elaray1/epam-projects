function componentToHex(c) {
  let hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
window.onload = function() {
  let currentCanvas = localStorage.getItem("currentCanvas");
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext("2d");
  let scale = 1;
  const colorsArray = [
    ["00BCD4", "FFEB3B","FFEB3B","00BCD4"],
    ["FFEB3B", "FFC107","FFC107","FFEB3B"],
    ["FFEB3B", "FFC107","FFC107","FFEB3B"],
    ["00BCD4", "FFEB3B","FFEB3B","00BCD4"]
  ];
  function drawDefaultCanvas() {
    for (let row = 0; row < colorsArray.length; row++) {
      for (let col = 0; col < colorsArray[0].length; col++) {
        context.fillStyle = '#' + colorsArray[row][col];
        context.fillRect(col * scale, row * scale, scale, scale);
      }
    }
  }
  if (currentCanvas == null) {
    drawDefaultCanvas();
  } else {
    let dataURL = currentCanvas;
    let img = new Image;
    img.src = dataURL;
    img.onload = function () {
        context.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
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
      let pixels = pixelData.data;
      let i = (y * pixelData.width + x) * 4;
      return ((pixels[i + 0] & 0xFF) << 24) |
             ((pixels[i + 1] & 0xFF) << 16) |
             ((pixels[i + 2] & 0xFF) <<  8) |
             ((pixels[i + 3] & 0xFF) <<  0);
  }
  function setPixel(pixelData, x, y, color) {
      let i = (y * pixelData.width + x) * 4;
      let pixels = pixelData.data;
      pixels[i + 0] = (color >>> 24) & 0xFF;
      pixels[i + 1] = (color >>> 16) & 0xFF;
      pixels[i + 2] = (color >>>  8) & 0xFF;
      pixels[i + 3] = (color >>>  0) & 0xFF;
  }
  function diff(c1, c2) {
      if (isNaN(c1) || isNaN(c2)) {
          return Infinity;
      }
      let dr = ((c1 >>> 24) & 0xFF) - ((c2 >>> 24) & 0xFF);
      let dg = ((c1 >>> 16) & 0xFF) - ((c2 >>> 16) & 0xFF);
      let db = ((c1 >>>  8) & 0xFF) - ((c2 >>>  8) & 0xFF);
      let da = ((c1 >>>  0) & 0xFF) - ((c2 >>>  0) & 0xFF);
      return dr*dr + dg*dg + db*db + da*da;
  }
  function floodFill(canvas, x, y, replacementColor, delta) {
      let current, w, e, stack, color, cx, cy;
      let context = canvas.getContext("2d");
      let pixels = context.getImageData(x, y, 1, 1).data;
      if ('0x' + rgbToHex(pixels[0], pixels[1], pixels[2]).substr(1) + 'FF' === currentColor) {
        return;
      }
      let pixelData = context.getImageData(0, 0, canvas.width, canvas.height);
      let done = [];
      for (let i = 0; i < canvas.width; i++) {
          done[i] = [];
      }
      let targetColor = getPixel(pixelData, x, y);
      delta *= delta;
      stack = [ [x, y] ];
      done[x][y] = true;
      while ((current = stack.pop())) {
          cx = current[0];
          cy = current[1];
          if (diff(getPixel(pixelData, cx, cy), targetColor) <= delta) {
              setPixel(pixelData, cx, cy, replacementColor);
              w = e = cx;
              while (w > 0 && diff(getPixel(pixelData, w - 1, cy), targetColor) <= delta) {
                  --w;
                  if (done[w][cy]) break;
                  setPixel(pixelData, w, cy, replacementColor);
              }
              while (e < pixelData.width - 1 && diff(getPixel(pixelData, e + 1, cy), targetColor) <= delta) {
                  ++e;
                  if (done[e][cy]) break;
                  setPixel(pixelData, e, cy, replacementColor);
              }
              for (cx = w; cx <= e; cx++) {
                  if (cy > 0) {
                      color = getPixel(pixelData, cx, cy - 1);
                      if (diff(color, targetColor) <= delta) {
                          if (!done[cx][cy - 1]) {
                              stack.push([cx, cy - 1]);
                              done[cx][cy - 1] = true;
                          }
                      }
                  }
                  if (cy < canvas.height - 1) {
                      color = getPixel(pixelData, cx, cy + 1);
                      if (diff(color, targetColor) <= delta) {
                          if (!done[cx][cy + 1]) {
                              stack.push([cx, cy + 1]);
                              done[cx][cy + 1] = true;
                          }
                      }
                  }
              }
          }
      }
      context.putImageData(pixelData, 0, 0, 0, 0, canvas.width, canvas.height);
  }
  const red = '0xFF0000FF';
  const blue = '0x0000FFFF';
  const grey = '0x808080FF';
  let currentColor = red;
  document.querySelector('.current-color').style.background = '#FF0000';
  let prevColor = grey;
  document.querySelector('.prev-color').style.background = '#808080';
  let theInputColor = document.getElementById("select_color");
  theInputColor.addEventListener("input", function() {
    document.querySelector('.prev-color').style.background = document.querySelector('.current-color').style.background;
    document.querySelector('.current-color').style.background = theInputColor.value;
    prevColor = currentColor;
    currentColor = '0x' + theInputColor.value.substr(1) + 'FF';
  }, false);
  const redColor = document.getElementById('red_color');
  const blueColor = document.getElementById('blue_color');
  const previousColor = document.getElementById('prev_color');
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
    let pixelData = context.getImageData(x, y, 1, 1);
    let pixels = pixelData.data;
    prevColor = currentColor;
    currentColor = '0x' + rgbToHex(pixels[0], pixels[1], pixels[2]).substr(1) + 'FF';
    document.querySelector('.prev-color').style.background = document.querySelector('.current-color').style.background;
    document.querySelector('.current-color').style.background = rgbToHex(pixels[0], pixels[1], pixels[2]);
  }
  function drow(x, y, color) {
    if (!isDrawing) return;
    x = Math.floor(x * canvas.width / maxSize);
    y = Math.floor(y * canvas.width / maxSize);
    let pixelData = context.getImageData(x, y, 1, 1);
    for (let i = 0; i < 1 * 4 * 1; i += 4) {
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
    if (currentTool == 'pencil' || currentTool == pencil) {
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
    if (currentTool == 'paint_bucket') {
      floodFill(canvas, x, y, currentColor, 1);
    } else if (currentTool == 'choose_color') {
      selectColor(x, y);
    }
  })
  document.addEventListener('keydown', function(event) {
    if (event.keyCode == 66) { // key b
      currentTool = 'paint_bucket';
      document.querySelector('.selected-tool').classList.remove('selected-tool');
      paintBucket.classList.add('selected-tool');
    } else if (event.keyCode == 80) { //key p
      currentTool = 'pencil';
      document.querySelector('.selected-tool').classList.remove('selected-tool');
      pencil.classList.add('selected-tool');
    } else if (event.keyCode == 67) { //key c
      currentTool = 'choose_color';
      document.querySelector('.selected-tool').classList.remove('selected-tool');
      chooseColor.classList.add('selected-tool');
    }
  });
  const maxSize = 512;
  function setCanvasSize(size) {
    let img = new Image();
    img.onload = () => {
      canvas.width = size;
      canvas.height = size;
      scale = 512 / size;
      context.drawImage(img, 0, 0, img.width, img.height, 0, 0, size, size);
    }
    img.src = canvas.toDataURL();
  }
    $(function() {
    $("#slider-range-pencil" ).slider({
      range: "min",
      value: 512,
      min: 128,
      max: 512,
      step: 128,
      slide: function( event, ui ) {
        $("#pencil-size").val(ui.value);
        setCanvasSize(ui.value);
      }
    });
    $("#pencil-size").val($("#slider-range-pencil").slider("value"));
  });
  const accessKey = 'c29222b3f06bea411227ea9ea7b7878aed59e164737b3c4408060aca8a1c585f';
  async function getLinkToImage(city) {
    const url = `https://api.unsplash.com/photos/random?query=town,${city}&client_id=${accessKey}`;
    const data = await fetch(url).then(res => res.json());
    let img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = data.urls.small;
    img.onload = function () {
      const wRatio = canvas.width / img.width;
      const hRatio = canvas.height / img.height;
      const ratio = Math.min(wRatio, hRatio);
      const center_x = (canvas.width - img.width * ratio) / 2;
      const center_y = (canvas.height - img.height * ratio) / 2;
      context.fillStyle = "rgb(192, 192, 192)";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0, img.width, img.height,
        center_x, center_y, img.width * ratio, img.height * ratio);
    }
  }
  const grayscale = () => {
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i]     = avg; // red
      data[i + 1] = avg; // green
      data[i + 2] = avg; // blue
    }
    context.putImageData(imageData, 0, 0);
};

  const loadButton = document.getElementById('load-btn');
  const blackAndWhite = document.getElementById('black-and-white-btn');
  loadButton.addEventListener('click', () => {
    const keyWord = document.getElementById('search-input').value;
    getLinkToImage(keyWord);
  });
  blackAndWhite.addEventListener('click', () => {
    grayscale();
  });


  window.addEventListener('beforeunload', () => {
    localStorage.setItem('currentCanvas', canvas.toDataURL());
  });
}
module.exports = rgbToHex;

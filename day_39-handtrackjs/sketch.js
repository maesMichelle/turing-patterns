// grid houdt het aantal a en b Chemicaliën bij in de pixels
var grid;
var next;

// de waarde die het patroon bepalen
var dA = 1;
var dB = 0.6;
var feed = 0.015;
var kill = 0.05;

var centerX;
var centerY;

const modelParams = {
  flipHorizontal: true, // flip e.g for video
  imageScaleFactor: 0.7, // reduce input image size for gains in speed.
  maxNumBoxes: 5, // maximum number of boxes to detect
  iouThreshold: 0.5, // ioU threshold for non-max suppression
  scoreThreshold: 0.79, // confidence threshold for predictions.
};

handTrack.load(modelParams).then((model) => {});

const video = document.getElementById("video");
const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;
let model;

handTrack.startVideo(video).then((status) => {
  if (status) {
    navigator.getUserMedia(
      { video: {} },
      (stream) => {
        video.srcObject = stream;
      },
      (err) => consome.lig(err)
    );
  }
});

let handPositions = [];

function runDetection() {
  model.detect(video).then((predictions) => {
    handPositions = predictions;
  });
}

handTrack.load(modelParams).then((lmodel) => {
  model = lmodel;
});

function constrain(v, min, max) {
  if (v < min) {
    return min;
  } else if (v > max) {
    return max;
  } else {
    return v;
  }
}

// 2 dimensonaale arry's(lijstjes), een current(grid?) en de next
// wisseling tussen grid en next
// we starten door elk plekje te vullen met a Chemicaliën, geen b
function setup() {
  // createCanvas(200, 200);
  // pixelDensity(1);
  grid = [];
  next = [];
  for (var x = 0; x < width; x++) {
    grid[x] = [];
    next[x] = [];
    for (var y = 0; y < height; y++) {
      if (Math.random() > 0.99) {
        grid[x][y] = { a: 0, b: 1 };
        next[x][y] = { a: 0, b: 1 };
      } else {
        grid[x][y] = { a: 1, b: 0 };
        next[x][y] = { a: 1, b: 0 };
      }
    }
  }

  // hier starten we met de Chemicaliën b toe te voegen
  //in een klein plekje van 10 op 10
  // je kan hier met spelen, vorm veranderen, evnt met silhouetten werken
  //
  //for (var i = 100; i < 300; i++) {
  //   for (var j = 100; j < 300; j++) {
  //     grid[i][j].b = 1;
  //     //console.log();
  //   }
  // }
}

// het implementeren van de 'reaction diffusion formula'.
//(we moeten de volgende hoeveelhijd 'a' en 'b' berekenen gebaseerd op de vorige hoeveelheid a, Diffusion rate, feed, kill rate.
//maar ook gebaseerd op de som van al de naaste pixels)--> dit gebuird in laplaceA en laplaceB
function draw() {
  //background(51);
  //ctx.rect(200, 200, 10, 10);
  //ctx.fillStyle = (255, 0, 0);
  for (var i = 0; i < 2; i++) {
    for (var x = 1; x < width - 1; x++) {
      for (var y = 1; y < height - 1; y++) {
        var a = grid[x][y].a;
        var b = grid[x][y].b;
        next[x][y].a = a + dA * laplaceA(x, y) - a * b * b + feed * (1 - a);
        next[x][y].b = b + dB * laplaceB(x, y) + a * b * b - (kill + feed) * b;
        next[x][y].a = constrain(next[x][y].a, 0, 1);
        next[x][y].b = constrain(next[x][y].b, 0, 1);
      }
    }
  }

  // elke pixel op het veld krijgt een kleur toegewezen
  //gebaseerd op de hoeveelheid 'a' en 'b'.
  const imageData = ctx.getImageData(0, 0, width, height);
  // console.log(imageData);
  const pixels = imageData.data;
  // loadPixels();
  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
      var pix = (x + y * width) * 4;
      var a = grid[x][y].a;
      var b = grid[x][y].b;
      var c = (a - b) * 255;
      c = constrain(c, 0, 255);
      pixels[pix + 0] = 0;
      pixels[pix + 1] = 0;
      pixels[pix + 2] = c;
      pixels[pix + 3] = 220;
    }
  }

  // updatePixels();
  ctx.putImageData(imageData, 0, 0);

  swap();

  if (handPositions.length > 0) {
    for (const hand of handPositions) {
      // console.log(hand);
      const [x, y, w, h] = hand.bbox;
      let centerX = x + w / 2;
      let centerY = y + h / 2;
      centerX /= 640;
      centerY /= 480;
      centerX *= 1200;
      centerY *= 1200;
      centerX -= 200;
      centerY -= 200;

      ctx.fillRect(centerX - 5, centerY - 5, 10, 10);
      drawRectOnGrid(Math.round(centerX), Math.round(centerY), true);
    }
  }

  if (model) {
    runDetection();
  }

  window.requestAnimationFrame(draw);
}

//som van al de naaste pixels
function laplaceA(x, y) {
  var sumA = 0;
  sumA += grid[x][y].a * -1;
  sumA += grid[x - 1][y].a * 0.2;
  sumA += grid[x + 1][y].a * 0.2;
  sumA += grid[x][y + 1].a * 0.2;
  sumA += grid[x][y - 1].a * 0.2;
  sumA += grid[x - 1][y - 1].a * 0.05;
  sumA += grid[x + 1][y - 1].a * 0.05;
  sumA += grid[x + 1][y + 1].a * 0.05;
  sumA += grid[x - 1][y + 1].a * 0.05;
  return sumA;
}

function laplaceB(x, y) {
  var sumB = 0;
  sumB += grid[x][y].b * -1;
  sumB += grid[x - 1][y].b * 0.2;
  sumB += grid[x + 1][y].b * 0.2;
  sumB += grid[x][y + 1].b * 0.2;
  sumB += grid[x][y - 1].b * 0.2;
  sumB += grid[x - 1][y - 1].b * 0.05;
  sumB += grid[x + 1][y - 1].b * 0.05;
  sumB += grid[x + 1][y + 1].b * 0.05;
  sumB += grid[x - 1][y + 1].b * 0.05;
  return sumB;
}

function swap() {
  var temp = grid;
  grid = next;
  next = temp;
}

let isMouseDouwn = false;

function onMouseDown(e) {
  e.preventDefault();
  isMouseDouwn = true;
}

function onMouseUp() {
  isMouseDouwn = false;
}

function onMouseMove(event) {
  // console.log(event.shiftKey);
  if (!isMouseDouwn) return;

  const mouseX = centerX; //event.offsetX;
  const mouseY = centerY; //event.offsetY;

  drawRectOnGrid(mouseX, mouseY, event.shiftKey);
}

function drawRectOnGrid(x, y, addPixels) {
  for (var i = x - 20; i < x + 20; i++) {
    for (var j = y - 20; j < y + 20; j++) {
      if (i < 0 || i >= width || j < 0 || j >= height) continue;
      if (addPixels) {
        grid[i][j].a = 1;
        grid[i][j].b = 1;
      } else {
        grid[i][j].b = 0;
      }
    }
  }
}

setup();
draw();

canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", onMouseUp);
canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("contextmenu", (e) => e.preventDefault());

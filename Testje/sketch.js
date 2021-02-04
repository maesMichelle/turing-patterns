// grid houdt het aantal a en b Chemicaliën bij in de pixels
var grid;
var next;
//de waarde die het patroon bepalen
var dA;
var dB;
var feed;
var kill;

const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

var slider = document.getElementById("slider");

slider.oninput = function () {
  sliderPatroon = this.value;
  console.log(feed);
};

function sliderPatroon() {
  if ((this.value = 0)) {
    dA = 0.9;
    dB = 0.23;
    feed = 0.065;
    kill = 0.07;
  } else {
    dA = 0.8;
    dB = 0.3;
    feed = 0.04;
    kill = 0.06;
  }
}

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
      grid[x][y] = { a: 1, b: 0 };
      next[x][y] = { a: 1, b: 0 };
    }
  }

  // hier starten we met de Chemicaliën b toe te voegen
  //in een klein plekje van 10 op 10
  // je kan hier met spelen, vorm veranderen, evnt met silhouetten werken

  for (var i = 140; i < 260; i++) {
    for (var j = 180; j < 220; j++) {
      grid[i][j].b = 1;
      //console.log();
    }
  }
  for (var i = 180; i < 220; i++) {
    for (var j = 140; j < 260; j++) {
      grid[i][j].b = 1;
      //console.log();
    }
  }
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
      pixels[pix + 0] = 100;
      pixels[pix + 1] = 200;
      pixels[pix + 2] = c;
      pixels[pix + 3] = c;
    }
  }

  // updatePixels();
  ctx.putImageData(imageData, 0, 0);

  swap();
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

setup();
draw();
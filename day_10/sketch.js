var grid;
var next;
let aSlider; //bSlider;
var r = 255;

function setup() {
  createCanvas(400, 400);
  aSlider = createSlider(0, r);
  aSlider.position(10, 10);
  aSlider.style("width", "100px");
  //bSlider = createSlider(-1, 2, 1.2);
  //bSlider.position(10, 30);
  //bSlider.style("width", "100px");

  pixelDensity(1);

  //grid = [];
  //next = [];
  //for (var x = 0; x < width; x++) {
  //  grid[x] = [];
  //  next[x] = [];
  //  for (var y = 0; y < height; y++) {
  //    grid[x][y] = { a: random(1), b: random(1) };
  //    next[x][y] = { a: 0, b: 0 };
  //  }
  //}
}

function draw() {
  background(255);
  //const bSl = bSlider.value();
  let r = aSlider.value();

  grid = [];
  next = [];
  for (var x = 0; x < width; x++) {
    grid[x] = [];
    next[x] = [];
    for (var y = 0; y < height; y++) {
      grid[x][y] = { a: random(1), b: random(1) };
      next[x][y] = { a: 0, b: 0 };
    }
  }

  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
      next[x][y].a = grid[x][y].a * 0.95;
      next[x][y].b = grid[x][y].b * 1.2;
    }
  }

  //if ([y] > height) {
  //  y = 0;
  //}

  loadPixels();
  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
      var pix = (x + y * width) * 4;
      pixels[pix + 0] = floor(next[x][y].a * r);
      pixels[pix + 1] = 0;
      pixels[pix + 2] = floor(next[x][y].b * 255);
      pixels[pix + 3] = 255;
    }
  }
  updatePixels();
  swap();
  console.log(r);
}

function swap() {
  var temp = grid;
  grid = next;
  next = temp;
}

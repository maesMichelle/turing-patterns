function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

let grid;
let cols;
let rows;
let resolution = 20;

function setup() {
  createCanvas(400, 400);
  resetSketch();

  var button = createButton("Reload");
  button.mousePressed(resetSketch);
  button.style("width", "100px");
  button.style("height", "30px");
  button.style("font-family", "Titillium Web");
  button.style("font-weight", "bold");
  button.style("font-size", "16px");
  button.style("color", "blue");
  button.style("background-color", "white");
  button.style("margin-left", "20px");
  button.style("outline", "2px");
  button.style("outline-style", "solid");
  button.style("outline-color", "blue");
  button.style("border", "none");
}

function resetSketch() {
  cols = width / resolution;
  rows = height / resolution;

  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(2));
    }
  }
}

function draw() {
  background(255);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let w = width;
      let x = i * resolution;
      let y = j * resolution;
      if (grid[i][j] == 1) {
        fill(0, 0, 255);
        stroke(255);
        rect(x, y, resolution, resolution);
      }
    }
  }
}

function mousePressed() {
  redraw();
}

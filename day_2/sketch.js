function setup() {
  createCanvas(500, 500);
  angleMode(DEGREES);
}

function draw() {
  background(255);
  translate(width / 2, height);
  rotate(-90);
  scale(0.3);

  drawShape(6);
}

function drawShape(depth) {
  if (depth <= 0) return;
  line(0, 0, 100, 0);
  translate(100, 0);

  push();
  rotate(20);
  line(0, 0, 50, 0);
  translate(50, 0);
  drawShape(depth - 1);
  rotate(30);
  line(0, 0, 100, 0);
  translate(100, 0);
  rotate(-20);
  line(0, 0, 40, 0);
  translate(40, 0);
  pop();

  push();
  rotate(-20);
  line(0, 0, 50, 0);
  translate(50, 0);
  drawShape(depth - 1);
  rotate(-30);
  line(0, 0, 100, 0);
  translate(100, 0);
  rotate(20);
  line(0, 0, 40, 0);
  translate(40, 0);
  pop();

  push();

  line(0, 0, 150, 0);
  translate(150, 0);
  drawShape(depth - 1);
  pop();
}

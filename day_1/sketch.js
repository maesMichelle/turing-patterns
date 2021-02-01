function setup() {
  createCanvas(500, 500);
}

function drawNoiseLine(y, noiseY, noiseZ) {
  beginShape();
  for (let x = 0; x <= 500; x += 5) {
    // vertex(x, y + noise(x / 40, noiseY, noiseZ) * 100);
    vertex(x, y + noise(x / 100, noiseY) * 100);
  }
  endShape();
}

function draw() {
  background(255);

  noFill();
  for (let y = 0; y <= 500; y += 8) {
    drawNoiseLine(y, y / 80 + frameCount / 500, 20);
  }

  // noise(x, y)
}

const flock = [];

function setup() {
  createCanvas(800, 600);
  colorMode(HSB);
  for (let i = 0; i < 700; i++) {
    flock.push(new Vogel());
  }
}

function draw() {
  background(240, 100, 20);

  for (let vogel of flock) {
    vogel.edges();
    vogel.flock(flock);
    vogel.update();
    vogel.show();
  }
}

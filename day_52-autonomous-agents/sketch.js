const flock = [];

let alignSlider, cohesionSlider, separationSlider;

function setup() {
  createCanvas(800, 600);
  alignSlider = createSlider(0, 5, 1, 0.1);
  alignSlider.position(10, 10);
  cohesionSlider = createSlider(0, 5, 1, 0.1);
  cohesionSlider.position(10, 30);
  separationSlider = createSlider(0, 5, 1, 0.1);
  separationSlider.position(10, 50);

  colorMode(HSB);
  for (let i = 0; i < 700; i++) {
    flock.push(new Vogel());
  }
}

function draw() {
  background(280, 100, 15);
  noStroke();
  fill(255);
  text("alignment", alignSlider.x * 2 + alignSlider.width, 15);
  text("cohesion", cohesionSlider.x * 2 + cohesionSlider.width, 35);
  text("separation", separationSlider.x * 2 + separationSlider.width, 55);

  for (let vogel of flock) {
    vogel.edges();
    vogel.flock(flock);
    vogel.update();
    vogel.show();
  }
}

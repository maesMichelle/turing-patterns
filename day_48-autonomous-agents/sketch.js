var font;
var vehicles = [];

function preload() {
  font = loadFont("Arial Black.ttf");
}

function setup() {
  createCanvas(1920, 1080);
  //background(50);

  var points = font.textToPoints("Michelle", 250, height / 2, 300);

  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
    //stroke(0, 255, 0);
    //strokeWeight(4);
    //point(pt.x, pt.y);
  }
}

function draw() {
  background(20);
  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    v.behaviors();
    v.update();
    v.show();
  }
}

//function setup() {
//  createCanvas(600, 600);
//}
//
//function draw() {
//  background(255);
//  stroke(0);
//  noFill();
//  //drawCircle(300, 300, 300);
//  drawRect(150, 150, 300, 300);
//  //noLoop();
//}
//
//function drawCircle(x, y, d) {
//  ellipse(x, y, d);
//  if (d > 2) {
//    //let newD = d * random(0.2, 0.85);
//    //drawCircle(x + newD / 2, y, newD);
//    //drawCircle(x - d * 0.5, y, newD);
//    drawCircle(x + d * 0.8, y, d * 0.5);
//    drawCircle(x - d * 0.8, y, d * 0.5);
//  }
//}
//
//function drawRect(x, y, w, h) {
//  rect(x, y, w, h);
//  if (w > 2) {
//    drawRect(x + w * 0.25, y, w * 0.5, h - y * 0.25);
//    //drawRect(x - h * 0., y, w * 0.5, h + y * 0.5);
//
//    //drawRect(x - w * 0.25, y, w * 0.5, h - y * 0.5);
//  }
//}

var v;

function setup() {
  createCanvas(640, 360);
  v = new Vehicle(width / 2, height / 2);
}

function draw() {
  background(51);

  var mouse = createVector(mouseX, mouseY);

  // Draw an ellipse at the mouse position
  fill(127);
  stroke(200);
  strokeWeight(2);
  ellipse(mouse.x, mouse.y, 48, 48);

  // Call the appropriate steering behaviors for our agents
  v.arrive(mouse);
  v.update();
  v.display();
}

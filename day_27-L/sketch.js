//let bigRule = "FF[+FF]-FF";
let premis = "A";
let rules = {
  B: "D+B-C+B",
  A: "B-C+B-D",
};
let bigRule;

// start :F[+F!][-F!]BF*A
// end : F[+F!][-F!]F*AF*F[+F!][-F!]B

let lenght = 100;
let lang = 250;
let angle = 90;

function setup() {
  createCanvas(700, 700);
  angleMode(DEGREES);
  bigRule = resolveRules(premis, rules, 7);
  print(bigRule);
  groteA = random(30, 100);
  groteB = random(100, 200);
}

function draw() {
  background(255);
  translate(170, 270);
  rotate(0);
  scale(0.11);

  drawShape(bigRule);
  //angle += 0.1;
  //lenght -= 0.2;
}

function resolveRules(startRule, rules, depth) {
  let endRule = "";
  for (let c of startRule) {
    if (c in rules) {
      endRule += rules[c];
    } else {
      endRule += c;
    }
  }
  if (depth >= 1) {
    endRule = resolveRules(endRule, rules, depth - 1);
  }
  return endRule;
}

function drawShape(rule) {
  for (c of rule) {
    if (c === "A") {
      //stroke(200, 0, 0);
      strokeWeight(10);
      stroke(0, 0, 200);
      line(0, 0, lenght, 0);
      translate(lenght, 0);
    } else if (c === "+") {
      rotate(angle);
    } else if (c === "-") {
      rotate(-angle);
    } else if (c === "B") {
      fill(0, 0, 255);
      ellipse(0, 0, 90);
      translate(lenght, 0);
    } else if (c === "C") {
      fill(0, 0, 255);
      ellipse(0, 0, 20);
      translate(lenght, 0);
    } else if (c === "D") {
      fill(255, 255, 255);
      ellipse(0, 0, 50);
      translate(lenght, 0);
    }
  }
}

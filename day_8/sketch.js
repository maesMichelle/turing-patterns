//let bigRule = "FF[+FF]-FF";
let premis = "A";
let rules = {
  B: "A+B+A",
  A: "B-A-B",
};
let bigRule;

// start :F[+F!][-F!]BF*A
// end : F[+F!][-F!]F*AF*F[+F!][-F!]B

let lenght = 100;
let lang = 250;
let angle = 60;

function setup() {
  createCanvas(700, 700);
  angleMode(DEGREES);
  bigRule = resolveRules(premis, rules, 5);
  print(bigRule);
  groteA = random(30, 100);
  groteB = random(100, 200);
}

function draw() {
  background(255);
  translate(670, 680);
  rotate(-180);
  scale(0.1);

  drawShape(bigRule);
  //angle += 0.1;
  //lenght += 0.2;
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
      strokeWeight(20);
      stroke(0, 0, 255);
      line(0, 0, lenght, 0);
      translate(lenght, 0);
    } else if (c === "+") {
      rotate(angle);
    } else if (c === "-") {
      rotate(-angle);
    } else if (c === "B") {
      strokeWeight(20);
      stroke(255, 0, 0);
      line(0, 0, lenght, 0);
      translate(lenght, 0);
    }
  }
}

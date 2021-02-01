//let bigRule = "FF[+FF]-FF";
let premis = "G--A";
let rules = {
  G: "+A+A--A+A",
  A: "+A+A--G+A ",
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
  bigRule = resolveRules(premis, rules, 4);
  print(bigRule);
  groteA = random(30, 100);
  groteB = random(100, 200);
}

function draw() {
  background(255);
  translate(width / 2, height / 2);
  rotate(-180);
  scale(0.1);

  drawShape(bigRule);
  //angle += 0.1;
  lenght += 0.1;
  if (lenght > 300) {
    lenght = 100;
  }
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
  translate(80, 170);
  for (c of rule) {
    //push();

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
    } else if (c === "G") {
      strokeWeight(20);
      stroke(255, 0, 0);
      line(0, 0, lenght, 0);
      translate(lenght, 0);
    }
    //pop();
  }
}

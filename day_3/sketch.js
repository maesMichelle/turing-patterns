//let bigRule = "FF[+FF]-FF";
let premis = "A";
let rules = {
  B: "[F*]A",
  A: "FB[+F!S][-F!S]B",
  S: "FA[+F!][-F!]",
};
let bigRule;

// start :F[+F!][-F!]BF*A
// end : F[+F!][-F!]F*AF*F[+F!][-F!]B

let lenght = 100;
let angle = 40;

function setup() {
  createCanvas(700, 700);
  angleMode(DEGREES);
  bigRule = resolveRules(premis, rules, 9);
  print(bigRule);
}

function draw() {
  background(255);
  translate(width / 2, height);
  rotate(-90);
  scale(0.2);

  drawShape(bigRule);
  //angle += 1;
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
    if (c === "F") {
      //stroke(200, 0, 0);
      line(0, 0, lenght, 0);
      translate(lenght, 0);
    } else if (c === "+") {
      rotate(angle);
    } else if (c === "-") {
      rotate(-angle);
    } else if (c === "[") {
      push();
    } else if (c === "]") {
      pop();
    } else if (c === "*") {
      fill(200, 0, 100);
      rect(0, 0, 50, 50);
    } else if (c === "!") {
      fill(100, 0, 200);
      ellipse(0, 0, 50);
    }
  }
}

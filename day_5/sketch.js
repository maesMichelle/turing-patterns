//let bigRule = "FF[+FF]-FF";
let premis = "B";
let rules = {
  B: "[*+*][-*]A",
  A: "*B[+++A*][-*S]B",
  //S: "A[+*][---**]",
};
let bigRule;

// start :F[+F!][-F!]BF*A
// end : F[+F!][-F!]F*AF*F[+F!][-F!]B

let lenght = 100;
let angle = 45;

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
  translate(width / 2, height / 2);
  rotate(-90);
  scale(2);

  drawShape(bigRule);
  angle += 0.2;
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
      strokeWeight(8);

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
      //noStroke();
      fill(200, 0, 100);
      rect(0, 0, 100, 50);
    } else if (c === "!") {
      fill(100, 0, 200);
      ellipse(0, 0, groteA);
    } else if (c === "@") {
      fill(100, 0, 200);
      ellipse(0, 0, groteB);
    }
  }
}

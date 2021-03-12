class Vogel {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(random(2, 4));
    this.accelenation = createVector();
    this.maxForce = 1;
    this.maxSpeed = 4;
  }

  edges() {
    if (this.position.x > width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = width;
    }
    if (this.position.y > height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = height;
    }
  }

  align(vogels) {
    let perceptionRadius = 50;
    let steering = createVector();
    let total = 0;
    for (let other of vogels) {
      let d = dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );
      if (other != this && d < perceptionRadius) {
        steering.add(other.velocity);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  separation(vogels) {
    let perceptionRadius = 50;
    let steering = createVector();
    let total = 0;
    for (let other of vogels) {
      let d = dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );
      if (other != this && d < perceptionRadius) {
        let diff = p5.Vector.sub(this.position, other.position);
        diff.div(d);
        steering.add(diff);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  cohesion(vogels) {
    let perceptionRadius = 100;
    let steering = createVector();
    let total = 0;
    for (let other of vogels) {
      let d = dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );
      if (other != this && d < perceptionRadius) {
        steering.add(other.position);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.sub(this.position);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  flock(vogels) {
    this.accelenation.mult(0);
    let alignment = this.align(vogels);
    let cohesion = this.cohesion(vogels);
    let separation = this.separation(vogels);
    this.accelenation.add(separation);
    this.accelenation.add(alignment);
    this.accelenation.add(cohesion);
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.accelenation);
    this.velocity.limit(this.maxSpeed);
  }

  show() {
    strokeWeight(3);
    stroke(300, 100, 100);
    point(this.position.x, this.position.y);
  }
}

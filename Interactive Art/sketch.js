let particles = [];
let numParticles = 200;
let noiseScale = 800;
let showText = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
}

function draw() {
  background(255, 10);

  for (let particle of particles) {
    particle.move();
    particle.display();
    particle.checkEdges();
  }

  if (showText) {
    drawText();
  }
}

function mousePressed() {
  showText = !showText;
}

function drawText() {
  fill(0);
  strokeWeight(2);
  textFont("Georgia");
  textSize(72);
  textAlign(CENTER, CENTER);
  text("Bath Spa University", width / 2, height / 2);
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 2;
  }

  move() {
    let angle =
      noise(this.pos.x / noiseScale, this.pos.y / noiseScale) *
      TWO_PI *
      noiseScale;
    this.acc = p5.Vector.fromAngle(angle);
    this.acc.setMag(0.1);

    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
  }

  display() {
    fill(100, 150, 255, 150);
    noStroke();
    ellipse(this.pos.x, this.pos.y, 4, 4);
  }

  checkEdges() {
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

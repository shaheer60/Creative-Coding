let mic, fft;
let numCircles = 64;
let particles = [];
let numParticles = 150;

function setup() {
  createCanvas(windowWidth, windowHeight);
  mic = new p5.AudioIn();
  mic.start();

  fft = new p5.FFT();
  fft.setInput(mic);

  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
}

function draw() {
  background(30, 30, 50);

  for (let particle of particles) {
    particle.update();
    particle.show();
  }

  let spectrum = fft.analyze();
  translate(width / 2, height / 2);

  for (let i = 0; i < numCircles; i++) {
    let radius = map(spectrum[i], 0, 255, 10, width / 3);
    let angle = map(i, 0, numCircles, 0, TWO_PI);
    let x = radius * cos(angle);
    let y = radius * sin(angle);
    let circleColor = color(map(i, 0, numCircles, 100, 255), 50, 150);
    fill(circleColor);
    noStroke();
    ellipse(x, y, 20, 20);
  }
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-1, 1), random(-1, 1));
    this.acc = createVector(0, 0);
    this.size = random(5, 15);
    this.color = color(
      random(200, 255),
      random(150, 200),
      random(150, 200),
      random(100, 150)
    );
  }

  update() {
    this.acc = p5.Vector.random2D().mult(0.5);
    this.vel.add(this.acc);
    this.vel.limit(2);
    this.pos.add(this.vel);
    this.edges();
  }

  show() {
    noStroke();
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.size);
  }

  edges() {
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

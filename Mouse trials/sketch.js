let circles = [];

function setup() {
  createCanvas(500, 500);
  background(255, 182, 193);
}

function draw() {
  background(255, 182, 193, 20);

  let newCircle = {
    x: mouseX,
    y: mouseY,
    radius: random(50, 150),
    color: color(random(200, 255), 0, random(150, 255), 50),
  };
  circles.push(newCircle);

  for (let i = circles.length - 1; i >= 0; i--) {
    let circle = circles[i];
    noFill();
    stroke(circle.color);
    ellipse(circle.x, circle.y, circle.radius);

    circle.radius *= 0.95;
    circle.color.setAlpha(circle.color._getAlpha() * 0.95);

    if (circle.radius < 1 || circle.color._getAlpha() < 1) {
      circles.splice(i, 1);
    }
  }
}

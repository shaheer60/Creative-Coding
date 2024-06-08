let target;
let targetSize = 50;
let score = 0;
let timeLeft = 30;
let gameStarted = false;

function setup() {
  createCanvas(600, 600);
  textAlign(CENTER, CENTER);
  target = new Target();
  setInterval(decreaseTime, 1000);
}

function draw() {
  background(200);

  if (gameStarted) {
    target.show();
    if (timeLeft <= 0) {
      gameStarted = false;
      textSize(32);
      fill(0);
      text("Game Over! Final Score: " + score, width / 2, height / 2);
    }
  } else {
    textSize(32);
    fill(0);
    text("Click to Start", width / 2, height / 2);
  }

  document.getElementById("score").textContent = score;
  document.getElementById("time").textContent = timeLeft;
}

function mousePressed() {
  if (!gameStarted) {
    gameStarted = true;
    score = 0;
    timeLeft = 30;
  } else if (target.clicked(mouseX, mouseY)) {
    score++;
    target = new Target();
  }
}

function decreaseTime() {
  if (gameStarted && timeLeft > 0) {
    timeLeft--;
  }
}

class Target {
  constructor() {
    this.x = random(targetSize, width - targetSize);
    this.y = random(targetSize, height - targetSize);
  }

  show() {
    fill(255, 0, 0);
    ellipse(this.x, this.y, targetSize, targetSize);
  }

  clicked(px, py) {
    let d = dist(px, py, this.x, this.y);
    return d < targetSize / 2;
  }
}

let snake;
let food;
let gridSize = 20;
let gameOver = false;
let gameStarted = false;

function setup() {
  createCanvas(400, 400);
  frameRate(10);
  snake = new Snake();
  food = createFood();
}

function draw() {
  if (!gameStarted) {
    displayTitleScreen();
  } else if (gameOver) {
    displayGameOverScreen();
  } else {
    background(220);

    stroke(0);
    strokeWeight(4);
    noFill();
    rect(0, 0, width, height);

    snake.update();
    snake.show();

    if (snake.eat(food)) {
      food = createFood();
    }

    fill(255, 0, 0);
    rect(food.x, food.y, gridSize, gridSize);
  }
}

function displayTitleScreen() {
  background(50);
  textAlign(CENTER);
  textSize(32);
  fill(255);
  text("Snake Game", width / 2, height / 2 - 20);
  textSize(16);
  text("Press ENTER to start", width / 2, height / 2 + 20);
}

function displayGameOverScreen() {
  background(50);
  textAlign(CENTER);
  textSize(32);
  fill(255, 0, 0);
  text("Game Over", width / 2, height / 2 - 20);
  textSize(16);
  text("Press ENTER to restart", width / 2, height / 2 + 20);
}

function keyPressed() {
  if (keyCode === ENTER) {
    if (gameOver) {
      gameOver = false;
      snake = new Snake();
      food = createFood();
    }
    gameStarted = true;
    loop();
  } else if (keyCode === UP_ARROW && snake.yspeed === 0) {
    snake.setDirection(0, -1);
  } else if (keyCode === DOWN_ARROW && snake.yspeed === 0) {
    snake.setDirection(0, 1);
  } else if (keyCode === LEFT_ARROW && snake.xspeed === 0) {
    snake.setDirection(-1, 0);
  } else if (keyCode === RIGHT_ARROW && snake.xspeed === 0) {
    snake.setDirection(1, 0);
  }
}

function createFood() {
  let cols = floor(width / gridSize);
  let rows = floor(height / gridSize);
  let food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(gridSize);
  return food;
}

class Snake {
  constructor() {
    this.body = [];
    this.body[0] = createVector(floor(width / 2), floor(height / 2));
    this.xspeed = 0;
    this.yspeed = 0;
    this.len = 0;
  }

  setDirection(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }

  eat(pos) {
    let head = this.body[this.body.length - 1];
    if (head.x === pos.x && head.y === pos.y) {
      this.len++;
      this.body.push(createVector(pos.x, pos.y));
      return true;
    }
    return false;
  }

  update() {
    let head = this.body[this.body.length - 1].copy();
    this.body.shift();
    head.x += this.xspeed * gridSize;
    head.y += this.yspeed * gridSize;
    this.body.push(head);

    if (
      head.x < gridSize / 2 ||
      head.x >= width - gridSize / 2 ||
      head.y < gridSize / 2 ||
      head.y >= height - gridSize / 2 ||
      this.collide(head)
    ) {
      this.endGame();
    }
  }

  show() {
    for (let i = 0; i < this.body.length; i++) {
      fill(0);
      rect(this.body[i].x, this.body[i].y, gridSize, gridSize);
    }
  }

  collide(pos) {
    for (let i = 0; i < this.body.length - 1; i++) {
      if (this.body[i].x === pos.x && this.body[i].y === pos.y) {
        return true;
      }
    }
    return false;
  }

  endGame() {
    gameOver = true;
    gameStarted = false;
    noLoop();
  }
}

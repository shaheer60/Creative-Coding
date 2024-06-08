let table;
let numBars;
let barWidth = 40;
let barSpacing = 80;
let maxBarHeight;

function preload() {
  table = loadTable("songs.csv", "csv", "header");
}

function setup() {
  createCanvas(800, 400);
  background(255);
  noStroke();
  numBars = table.getRowCount();
  maxBarHeight = height * 0.75;
}

function draw() {
  background(255);
  push();
  textSize(18);
  textStyle(BOLD);
  text("Number of Plays per Song", 50, 50);
  textSize(14);
  textStyle(NORMAL);
  translate(0, 350);

  for (let i = 0; i < numBars; i++) {
    let data = table.getRow(i);
    let playCount = int(data.getString("Plays"));
    let colorValue = data.getString("color");

    let rectHeight = map(
      playCount,
      0,
      max(table.getColumn("Plays")),
      0,
      maxBarHeight
    );
    let x = i * barSpacing + 50;
    let y = 0;

    fill(color(colorValue));
    rect(x, y, barWidth, -rectHeight);

    fill(0);
    textAlign(CENTER);
    text(playCount, x + barWidth / 2, -rectHeight - 10);
    text(colorValue, x + barWidth / 2, 20);
  }
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  maxBarHeight = height * 0.75;
}

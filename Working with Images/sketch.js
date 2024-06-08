let img;

function preload() {
  img = loadImage("rose.jpg");
}

function setup() {
  createCanvas(800, 600);
  background(255);

  let cnv1 = createGraphics(200, 200);
  cnv1.circle(100, 100, 100);
  cnv1.canvas.getContext("2d").clip();
  cnv1.image(img, 0, 0, 200, 200);
  image(cnv1, 50, 50);

  let cnv2 = createGraphics(200, 200);
  cnv2.rect(0, 0, 200, 200);
  cnv2.circle(100, 100, 100);
  img.mask(cnv2);
  image(img, 300, 50, 200, 200);

  let cnv3 = createGraphics(400, 200);
  cnv3.rect(0, 0, 400, 200);
  cnv3.fill(255);
  cnv3.textAlign(CENTER, CENTER);
  cnv3.textSize(48);
  cnv3.fill(255, 0, 0);
  cnv3.text("Hello World", 200, 100);
  applyWatercolorEffect(cnv3);
  image(cnv3, 50, 300);
}

function applyWatercolorEffect(buffer) {
  buffer.loadPixels();
  let numPixels = buffer.pixels.length / 4;
  for (let i = 0; i < numPixels; i++) {
    let index = i * 4;
    let r = buffer.pixels[index];
    let g = buffer.pixels[index + 1];
    let b = buffer.pixels[index + 2];

    let gray = (r + g + b) / 3;
    let offset = random(-50, 50);

    buffer.pixels[index] = constrain(r + offset, 0, 255);
    buffer.pixels[index + 1] = constrain(g + offset, 0, 255);
    buffer.pixels[index + 2] = constrain(b + offset, 0, 255);
  }
  buffer.updatePixels();
}

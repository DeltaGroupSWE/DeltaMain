function setup() {
  createCanvas(300, 300);
}

function drawMenuScreen() {
  textSize(40);
  fill(102, 0, 0);
  text('CUBE', 90, 80);
  textSize(32);
  fill(102, 54, 54, 51);
  text('CUBE', 100, 100);
  textSize(24);
  fill(102, 0, 0, 24);
  text('CUBE', 110, 115);
}

function draw() {
  background(200);
  drawMenuScreen();
}

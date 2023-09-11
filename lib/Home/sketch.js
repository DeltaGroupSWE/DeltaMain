let buttonSound;

function preload(){
  
}

function setup() {
  createCanvas(300, 300);

  /*styling button*/
  startButton = createButton("Start Game");
  startButton.position(75, 150);
  startButton.style('background-color: #1A71E6');
  startButton.style('padding: 15px 32px');
  startButton.style('display: inline-block');
  startButton.style('font-family: Verdana');
  startButton.style('margin: 4px 2px');
  startButton.style('border-radius: 12px');
  startButton.style('border: 2 px solid #000000'); 
  // end styling button 

  /*mousePressed Event*/
  startButton.mousePressed(startGame);
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

function startGame() {
  window.location.href = '../cube/index.html';
}
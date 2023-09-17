let buttonSound;

function preload() {}

function setup() {
  createCanvas(winWidth, winHeight);
  ///console.log(winWidth, winHeight);

  /*styling button*/
  startButton = createButton("Start Game");

  // CSS styles relative to canvas size
  const buttonWidth = winWidth * 0.4; // Adjust the button width
  const buttonHeight = winHeight * 0.1; // Adjust the button height
  const buttonFontSize = winWidth * 0.03; // Adjust the font size

  startButton.style("background-color: #1A71E6");
  startButton.style(`padding: ${winHeight * 0.04}px ${winWidth * 0.1}px`);
  startButton.style("display: inline-block");
  startButton.style("font-family: Verdana");
  startButton.style(`margin: ${winHeight * 0.02}px ${winWidth * 0.02}px`);
  startButton.style(`border-radius: ${winWidth * 0.04}px`);
  startButton.style(`border: ${winWidth * 0.001}px solid #000000`);
  startButton.style(`font-size: ${buttonFontSize}px`);

  // Center the button within the canvas
  startButton.position(
    winWidth / 2 - buttonWidth / 2,
    3 * (winHeight / 4) - buttonHeight / 2
  );

  /*mousePressed Event*/
  startButton.mousePressed(startGame);
}

function drawMenuScreen() {
  const topTextSize = winWidth * 0.15;
  const topTextX = winWidth / 2;
  const topTextY = winHeight * (3 / 14);

  const midTextSize = winWidth * 0.075;
  const midTextX = winWidth / 2;
  const midTextY = winHeight * (4 / 14);

  const bottomTextSize = winWidth * 0.065;
  const bottomTextX = winWidth / 2;
  const bottomTextY = winHeight * (5 / 14);

  textAlign(CENTER, CENTER);
  textSize(topTextSize);
  fill(102, 0, 0);
  text("CUBE", topTextX, topTextY);

  textSize(midTextSize);
  fill(102, 54, 54, 51);
  text("CUBE", midTextX, midTextY);

  textSize(bottomTextSize);
  fill(102, 0, 0, 24);
  text("CUBE", bottomTextX, bottomTextY);
}

function draw() {
  background(200);
  drawMenuScreen();
}

function startGame() {
  window.location.href = "../cube/index.html";
}

let buttonSound;
let timer;

function preload() {}

function setup() {
  createCanvas(winWidth, winHeight * 0.9);
  ///console.log(winWidth, winHeight);

  // intitalizing timer
  timer = new Timer();
  timer.setupTimer();
  timer.startTimer();

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

  leaderButton = createButton("Leaderboard")

  leaderButton.style("background-color: #1A71E6");
  leaderButton.style(`padding: ${winHeight * 0.04}px ${winWidth * 0.1}px`);
  leaderButton.style("display: inline-block");
  leaderButton.style("font-family: Verdana");
  leaderButton.style(`margin: ${winHeight * 0.02}px ${winWidth * 0.02}px`);
  leaderButton.style(`border-radius: ${winWidth * 0.04}px`);
  leaderButton.style(`border: ${winWidth * 0.001}px solid #000000`);
  leaderButton.style(`font-size: ${buttonFontSize}px`);

 // Center the button within the canvas
  leaderButton.position(
   winWidth / 2 - buttonWidth / 2,
   3 * (winHeight / 6) - buttonHeight / 2
  );

  /*mousePressed Event*/
  leaderButton.mousePressed(toLeaderboard);

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

  // updating timer
  timer.updateTimer();

  // calculate x and y position relative to canvas size
  const timerTextX = width - width * 0.1;
  const timerTextY = height * 0.1;
  
  // displaying timer on canvas
  push(); // saves current drawing style
  textSize(50);
  fill(255);
  stroke(0);
  strokeWeight(3);
  text(timer.formatTime(timer.elapsedTime), width - 250, height - 750);
  pop(); // restores original state of drawing style
}

function startGame() {
  window.location.href = "../cube/index.html";
}

function toLeaderboard(){
  window.location.href = "../leaderboard/index.html";
}

/////////////////////////////////////////////////////////////////////////
// Timer related 
class Timer {
  constructor() {
    this.startTime = 0;
    this.elapsedTime = 0;
    this.isRunning = false;
  }

  // function for setting up timer
  setupTimer() {
    this.startTime = millis();
  }

  // function for updating timer
  updateTimer() {
    if (this.isRunning) {
      this.elapsedTime = millis() - this.startTime;
    }
  }

  // function for starting timer
  startTimer() {
    if (!this.isRunning) {
      this.startTime = millis() - this.elapsedTime;
      this.isRunning = true;
    }
  }

  // function for stopping timer
  stopTimer() {
    if (this.isRunning) {
      this.isRunning = false;
    }
  }

  // function for resetting timer
  resetTimer() {
    this.isRunning = false;
    this.elapsedTime = 0;
    this.startTime = millis();
  }

  // function for formating time from int to string
  formatTime(time) {
    let seconds = Math.floor(time / 1000);
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    return nf(minutes, 2) + ':' + nf(seconds, 2); // Formatting int to strings
  }
}

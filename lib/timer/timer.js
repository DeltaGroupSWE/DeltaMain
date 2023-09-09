let startTime;
let elapsedTime = 0;
let isRunning = false;


function setup() {
  createCanvas(400, 400);
  
  // function for timer
  startTime = millis();
  
  // Buttons for starting, stopping, and resetting the timer
  let startButton = createButton('Start');
  startButton.mousePressed(startTimer);
  
  let stopButton = createButton('Stop');
  stopButton.mousePressed(stopTimer);
  
  let resetButton = createButton('Reset');
  resetButton.mousePressed(resetTimer);
  
}

function draw() {
    background(220);
  
    if (isRunning) {
    // Calculate elapsed time
    elapsedTime = millis() - startTime;
    }
  
    // Display the timer on the canvas
    textSize(32);
    text(formatTime(elapsedTime), width - 250, height - 200);

}

// functions for buttons
function startTimer() {
  if (!isRunning) {
    startTime = millis() - elapsedTime;
    isRunning = true;
  }
}

function stopTimer() {
  if (isRunning) {
    isRunning = false;
  }
}

function resetTimer() {
  isRunning = false;
  elapsedTime = 0;
  startTime = millis();
}
// function used in displaying time
function formatTime(time) {
  let seconds = Math.floor(time / 1000);
  let minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  return nf(minutes, 2) + ':' + nf(seconds, 2);
}

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

/*
////////////////
// Universal text formating for timer
  // displaying timer on canvas
  push(); // saves current drawing style
  textSize(32);
  fill(255);
  stroke(0);
  strokeWeight(3);
  text(timer.formatTime(timer.elapsedTime), width - 250, height - 750);
  pop(); // restores original state of drawing style
*/
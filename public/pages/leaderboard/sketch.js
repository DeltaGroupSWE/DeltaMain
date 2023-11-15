
let quitButton;
let leaderboard;
let database;
let playerScores = {};

let endGameButton;

function setup() {
  createCanvas(winWidth, winHeight * 0.9);


  // Styling button
  quitButton = createButton("Return to Menu");
  styleButton(quitButton, winWidth * 0.02, winHeight * 0.02, winWidth * 0.01);
  positionButton(quitButton, winHeight * 0.04, winWidth * -0.04, 3 * (winHeight / 4));

  quitButton.mousePressed(returnToMenu);

  leaderboard = new Leaderboard(database);

  endGameButton = createButton("End Game");
  styleButton(endGameButton, winWidth * 0.02, winHeight * 0.02, winWidth * 0.01);
  positionButton(endGameButton, winHeight * 0.04, winWidth * -0.04, (winHeight / 2));
  endGameButton.mousePressed(endGame);

}

function draw() {
  background(200);
  leaderboard.draw(playerScores);
  leaderboard.draw();
}

class Leaderboard {
  constructor() {
    this.topTextSize = winWidth * 0.13;
    this.topTextX = winWidth / 2;
    this.topTextY = winHeight * (2 / 14);

    this.midTextSize = winWidth * 0.025;
    this.midTextXRank = winWidth / 8;
    this.midTextXName = winWidth / 3;
    this.midTextXTime = winWidth / 1.25;
    this.midTextY = winHeight * (5 / 14);
  }

  draw() {
    textAlign(CENTER, CENTER);
    textSize(this.topTextSize);
    fill(102, 0, 0);
    text("Leaderboard", this.topTextX, this.topTextY);

    textSize(this.midTextSize);
    text("Rank", this.midTextXRank, this.midTextY);
    text("Name", this.midTextXName, this.midTextY);
    text("Time", this.midTextXTime, this.midTextY);

    let posY = this.midTextY + this.midTextSize; // Start position for scores
    for (const playerName in playerScores) {
      const score = playerScores[playerName];
      posY += this.midTextSize;
      text(`${playerName}: ${score}`, this.midTextXRank, posY);
    }
  }
}

function returnToMenu() {
  window.location.href = '../home/index.html';
}

// Helper functions for styling and positioning the button
function styleButton(button, width, height, fontSize) {
  button.style("background-color: #1A71E6");
  button.style(`padding: ${height}px ${width}px`);
  button.style("display: inline-block");
  button.style("font-family: Verdana");
  button.style(`margin: ${height * 0.2}px ${width * 0.2}px`);
  button.style(`border-radius: ${width * 0.04}px`);
  button.style(`border: ${width * 0.001}px solid #000000`);
  button.style(`font-size: ${fontSize}px`);
}

function positionButton(button, topMargin, leftMargin, yPos) {
  button.position(winWidth / 2 - button.width / 2 + leftMargin, yPos - topMargin);
}
/*
function endGame() {
  const playerName = "Player1";
  const playerScore = 1500;

  // Update playerScores with the new score
  playerScores[playerName] = playerScore;

  // Add the player score to the database
  addPlayerScore(playerName, playerScore, database);
}

// Helper function for styling and positioning the button
function addPlayerScore(playerName, score, database) {
  // Get a reference to the "scores" node in your database
  const scoresRef = ref(database, 'leaderboard/scores');

  // Generate a unique ID for the new score entry
  const newScoreRef = push(scoresRef);

  // Set the data for the new score entry
  set(newScoreRef, {
    playerName: playerName,
    score: score
  });

  console.log(`Score added for ${playerName}: ${score}`);
}
*/
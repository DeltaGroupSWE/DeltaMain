let buttonSound;
/*Number keeps track of last user input*/
let number = 0;
/*Counter counts the number of attempts at the puzzle*/
let counter = 1;

function preload() {
  buttonSound = loadSound("../../../assets/sounds/button-beep.wav");
}

function setup() {
  /*Creating background canvas*/
  gameCanvas = createCanvas(windowWidth, windowHeight * 0.9);
  gameCanvas.background('yellow');

  /*Creating button/input constants*/
  const buttonWidth = windowWidth * 0.4; // Adjust the button width
  const buttonHeight = windowHeight * 0.1; // Adjust the button height
  const buttonFontSize = windowWidth * 0.03; // Adjust the font size

  /*Creating input box*/
  input = createInput();
  input.style("background-color: #FFFFFF");
  input.style(`padding: ${windowHeight * 0.02}px ${windowWidth * 0.001}px`);
  input.style("display: inline-block");
  input.style("font-family: Verdana");
  input.style(`margin: ${windowHeight * 0.08}px ${windowWidth * 0.02}px`);
  input.style(`border-radius: ${windowWidth * 0.04}px`);
  input.style(`border: ${windowWidth * 0.001}px solid #000000`);
  input.style(`font-size: ${buttonFontSize}px`);
  
  /*Creating input position*/
  input.position(
    windowWidth / 2 - buttonWidth / 2,
    3 * (windowHeight / 10) - buttonHeight / 2
  );

  /*Creating submit button*/
  submitButton = createButton("Submit");
  submitButton.style("background-color: #1A71E6");
  submitButton.style(`padding: ${windowHeight * 0.02}px ${windowWidth * 0.001}px`);
  submitButton.style("display: inline-block");
  submitButton.style("font-family: Verdana");
  submitButton.style(`margin: ${windowHeight * 0.08}px ${windowWidth * 0.73}px`);
  submitButton.style(`border-radius: ${windowWidth * 0.04}px`);
  submitButton.style(`border: ${windowWidth * 0.001}px solid #000000`);
  submitButton.style(`font-size: ${buttonFontSize}px`);
  submitButton.mousePressed(guess);

  /*Creating Submit button position*/
  submitButton.position(
    windowWidth / 5 - buttonWidth / 2,
    3 * (windowHeight / 10) - buttonHeight / 2
  );

  /*Creating home button*/
  homeButton = createButton("Home");
  homeButton.style("background-color: #1A71E6");
  homeButton.style(`padding: ${windowHeight * 0.02}px ${windowWidth * 0.01}px`);
  homeButton.style("display: inline-block");
  homeButton.style("font-family: Verdana");
  homeButton.style(`margin: ${windowHeight * 0.01}px ${windowWidth * 0.35}px`);
  homeButton.style("border-radius: 12px");
  homeButton.style("border: 2 px solid #000000");
  homeButton.mousePressed(toHome);

   /*Creating Home button position*/
   homeButton.position(
    windowWidth / 1.01 - buttonWidth,
    3 * (windowHeight / 55) - buttonHeight / 2
  );

  /*Random number generator*/
  num = Math.floor(Math.random() * 100) + 1;

  /*Creating hint output e.g., too high, too low*/
  range = createElement("h2");
  range.style("color: black");
  
  /*Creating range position*/
  range.position(
    windowWidth / 3 , 3 * (windowHeight / 12)
  );

  /*User's previous entry display*/
  userDisplay = createElement("h2");
  userDisplay.html("You entered: ");
  userDisplay.style("color: black");
 
  /*Creating userDisplay position*/
  userDisplay.position(
    windowWidth / 3, 3 * (windowHeight / 7)
  );

  /*User input display*/
  userInput = createElement("h2");
  userInput.style("color: black");
  
  /*Creating userInput position*/
  userInput.position(
    windowWidth / 2.1, 3 * (windowHeight / 7)
  );

  /*Guess Number Title Text*/
  guessNumber = createElement("h1", "Guess a number between 1-100");
  guessNumber.style("color: black");
 
   /*Creating guessNumber puzzle title text position*/
   guessNumber.position(
    windowWidth / 3 , windowHeight / 5
  );

  /*Counter display for number of guesses */
  counterDisplay = createElement("h2", "Number of guesses:");
  counterDisplay.style("color: black");
  
  /*Creating counterDisplay text position*/
  counterDisplay.position(
    windowWidth / 3, 3 * (windowHeight / 6)
  );
}

/*Function that is called to check user input versus random number*/
function guess() {
  range.html("");
  let userGuess = input.value();
  if (userGuess <= 0) {
    range.html("");
    range.html("Not a valid input, please try again.");
    input.value(" ");
    number = userGuess;
    counterDisplay.html(`Number of guesses: ${counter}`);
  } else {
    if (userGuess > num) {
      range.html("");
      range.html("Your guess was too high, guess again!");
      input.value(" ");
      number = userGuess;
      counterDisplay.html(`Number of guesses: ${counter}`);
    } else if (userGuess < num) {
      range.html("");
      range.html("Your guess was too low, guess again!");
      input.value(" ");
      number = userGuess;
      counterDisplay.html(`Number of guesses: ${counter}`);
    } else if (userGuess == num) {
      range.html("");
      guessNumber.html("You got it!");
      counterDisplay.html(`Number of guesses: ${counter}`);
    } else {
      range.html("");
      range.html("Not a valid input, please try again.");
      input.value(" ");
      number = userGuess;
      counterDisplay.html(`Number of guesses: ${counter}`);
    }
  }
  counter++;
  displayUserInput();
}

/*If enter is pressed, result is the same as pressing submit button*/
function keyPressed() {
  if (keyCode === 13) {
    guess();
  }
}

/*Displays last number entered*/
function displayUserInput() {
  userInput.html(number);
}

function toHome() {
  window.location.href = "../../../pages/cube/index.html";
}

function windowResized(){
  resizeCanvas(windowWidth , windowHeight * 0.9, true);
  background('yellow');
}

function draw() {
}

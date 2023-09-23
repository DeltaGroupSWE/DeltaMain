let buttonSound;
/*Number keeps track of last user input*/
let number = 0;
/*Counter counts the number of attempts at the puzzle*/
let counter = 1;

function preload() {
  buttonSound = loadSound("../sounds/button-beep.wav");
}

function setup() {
  /*Creating background canvas*/
  createCanvas(800, 800);
  background('yellow');

  /*Creating input box*/
  input = createInput();
  input.position(200, 300);
  input.style("padding: 15px 42px");

  /*Creating submit button*/
  button = createButton("Submit");
  button.position(input.x + input.width + 80, 295);
  button.style("background-color: #1A71E6");
  button.style("padding: 15px 32px");
  button.style("display: inline-block");
  button.style("font-family: Verdana");
  button.style("margin: 4px 2px");
  button.style("border-radius: 12px");
  button.style("border: 2 px solid #000000");
  button.mousePressed(guess);

  /*Creating home button*/
  button = createButton("Home");
  button.position(690, 0);
  button.style("background-color: #1A71E6");
  button.style("padding: 15px 32px");
  button.style("display: inline-block");
  button.style("font-family: Verdana");
  button.style("margin: 4px 2px");
  button.style("border-radius: 12px");
  button.style("border: 2 px solid #000000");
  button.mousePressed(toHome);

  /*Random number generator*/
  num = Math.floor(Math.random() * 100) + 1;

  /*Creating hint output e.g., too high, too low*/
  range = createElement("h2");
  range.style("color: black");
  range.position(205, 400);

  /*User's previous entry display*/
  userDisplay = createElement("h2");
  userDisplay.html("You entered: ");
  userDisplay.style("color: black");
  userDisplay.position(205, 350);

  /*User input display*/
  userInput = createElement("h2");
  userInput.style("color: black");
  userInput.position(350, 350);

  /*Guess Number Title Text*/
  guessNumber = createElement("h1", "Guess a number between 1-100");
  guessNumber.style("color: black");
  guessNumber.position(165, 220);

  /*Counter display for number of guesses */
  counterDisplay = createElement("h2", "Number of guesses:");
  counterDisplay.style("color: black");
  counterDisplay.position(205, 450);
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
  window.location.href = "../cube/index.html";
}
function draw() { }

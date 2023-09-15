let buttonSound;
let displayMessage = false;
let numbers = [];

function preload(){
  buttonSound = loadSound("../sounds/button-beep.wav");
}

function setup(){
  createCanvas(710, 400);

  input = createInput();
  input.position(200, 300);
  input.style('padding: 15px 42px');


  button = createButton('submit');
  button.position(input.x + input.width + 80, 300);
  button.style('padding: 15px 32px');
  button.mousePressed(guess);

  guessNumber = createElement('h1', 'Guess a number between 1-100');
  guessNumber.style('color: white');
  guessNumber.position(165,50);

  num = Math.floor(Math.random() * 100) + 1;

  range = createElement();
  range.style('color: white');
  range.position(255,450);

}

function guess(){
  let firstGuess = input.value();
  numbers[width + 1] = firstGuess;
  if (firstGuess > num){
    range.html('Your guess was too high, guess again!');
    input.value(' ');
    numbers.push(firstGuess);
    //displayOutputList();
  }
  if (firstGuess < num){
    range.html('Your guess was too low, guess again!');
    input.value(' ');
    numbers.push(firstGuess);
    //displayOutputList();
  }
  
  if (firstGuess == num){
    guessNumber.html('You got it!');
  }
}

function keyPressed(){
  if (keyCode === 13) {
    guess();
  }
}
/*
function displayOutputList() {
  //background(220);
  textSize(16);
  textAlign(LEFT);
  let yPos = 100;

  for (let i = 0; i < numbers.length; i++) {
    text(numbers[i], -10, yPos);
    yPos += 20;
  }
}
*/
function draw() {
  textSize(30);
  textAlign(LEFT);
  let yPos = 70;
  for (let i = 0; i < numbers.length; i++) {
    text(numbers[i], 10, yPos);
    yPos += 20;
  }
}

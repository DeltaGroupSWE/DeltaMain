let flag = 0;
let switchflipping;
let switchgamelose;
let switchgamewin;
let imgOn;
let imgOff;
let sOn;
let sOff;

function hintToggle(){
  console.log('in foo');
  if(flag === 0) {flag = 1;}
  else{flag = 0;}
}

function preload(){
  switchflipping = loadSound("../sounds/switchflip.wav");
  switchgamelose = loadSound('../sounds/switchgamelose.wav');
  switchgamewin = loadSound("../sounds/switchgamewin.mp3")
  imgOn = loadImage('../sprites/lighton.png');
  imgOff = loadImage('../sprites/lightoff.png');
  sOn = loadImage('../sprites/switchOn.png');
  sOff = loadImage('../sprites/switchOff.png');

}

function printHint(flag){
  if(flag === 1){
    textSize(16);
    fill('black');
    text('Try to get 3 in a row and click the middle!', 175, 590);
  }
}

function hint(){
  hintButton = createButton('Hint');
  hintButton.position(300,550);
  hintButton.mousePressed(hintToggle);
}

/* class based hint implementation WIP
class hintGiver{
  constructor(flag, puzzleID){
    this.flag = flag; //always init to false
    puzzleID = puzzleID;
  }

  createHintButton(){
    hintButton = rect(200, 10, 20,40);
    hintButton.mousePressed(this.hintToggle);
  }

  printHint(){
    if(flag === true){
      textSize(32);
      fill('black');
      text('Pls', 100, 130);
    }
  }

  hintToggle(){
    if(this.flag === false){flag = true;}
    else{flag = false;}
  }
}

let hintThing = new hintGiver(false, -1); //implement puzzle id later

function hintConatiner(){
  hintThing.createHintButton();
  hintThing.printHint();
}

*/
class flipSwitch{
  constructor(onOff, x, y){
    this.onOff = onOff;
    this.x = x;
    this.y = y;
  }

  flip(){
    if(this.onOff == false){this.onOff = true;}
    else{this.onOff = false;}
    switchflipping.play();
  }

  drawSwitch(){
    if(this.onOff == false){
      //fill('black');
      image(sOff, this.x, this.y, 20, 30);

      image(imgOff, this.x, this.y + 50, 20, 30);
    }
    else{
      image(sOn, this.x, this.y, 20, 30);

      image(imgOn, this.x, this.y + 50, 20, 30);
      fill('white') ;
    }
  }
}
class flipSwitchGame{
  constructor(){
    this.sw1 = new flipSwitch(false, 250, 50);
    this.sw2 = new flipSwitch(true, 280, 50);
    this.sw3 = new flipSwitch(false, 310, 50);
    this.sw4 = new flipSwitch(true, 340, 50);
    this.sw5 = new flipSwitch(false, 370, 50);
    this.gameOver = false;
    this.puzzleID = 1;
  }
  
  drawBoard(){  
    this.sw1.drawSwitch();
    this.sw2.drawSwitch();
    this.sw3.drawSwitch();
    this.sw4.drawSwitch();
    this.sw5.drawSwitch();
  }

  flipBoard(){
    if(this.gameOver != true){
      if(mouseX > this.sw1.x && mouseX < this.sw1.x + 20 && mouseY > this.sw1.y && mouseY < this.sw1.y + 20){this.sw1.flip(); this.sw2.flip(); this.sw5.flip();}
      else if(mouseX > this.sw2.x && mouseX < this.sw2.x + 20 && mouseY > this.sw2.y && mouseY < this.sw2.y + 20){this.sw1.flip(); this.sw2.flip(); this.sw3.flip();}
      else if(mouseX > this.sw3.x && mouseX < this.sw3.x + 20 && mouseY > this.sw3.y && mouseY < this.sw3.y + 20){this.sw2.flip(); this.sw3.flip(); this.sw4.flip();}
      else if(mouseX > this.sw4.x && mouseX < this.sw4.x + 20 && mouseY > this.sw4.y && mouseY < this.sw4.y + 20){this.sw3.flip(); this.sw4.flip(); this.sw5.flip();}
      else if(mouseX > this.sw5.x && mouseX < this.sw5.x + 20 && mouseY > this.sw5.y && mouseY < this.sw5.y + 20){this.sw4.flip(); this.sw5.flip(); this.sw1.flip();}
    }
  }

  gameState(){
    if(this.sw1.onOff === false && this.sw2.onOff === false && this.sw3.onOff === false && this.sw4.onOff === false && this.sw5.onOff === false){
      this.gameOver = true;
      textSize(60);
      fill('black');
      text('You lose', 220, 200);
    }
    else if(this.sw1.onOff === true && this.sw2.onOff === true && this.sw3.onOff === true && this.sw4.onOff === true && this.sw5.onOff === true){
      this.gameOver = true;
      textSize(60);
      fill('black');
      text('You win', 220, 200);
    }
    else{
      this.gameOver = false;
    }
  }

  resetGameState(){
    //may be needed later good to have
    this.gameOver = false;
  }
}

function setup() {
  createCanvas(650, 650);
}

let flipGame = new flipSwitchGame();

function switchPuzzle(){
  flipGame.drawBoard();
  flipGame.gameState();
}


function draw() {
  // createCanvas(800, 800);
  background('red');
  switchPuzzle();
  hint();
  printHint(flag);

  textSize(12);
  fill('black');
  text('Click a button to switch it, but it may switch a different button as well. \n\t\t\t\t\t\t\t\t\t\tTry to get all the buttons yellow to win!', 140, 300);
  
  
}


function mousePressed(){
  flipGame.flipBoard();
}
let flag = 0;
let switchflipping;
let switchgamelose;
let switchgamewin;
let imgOn;
let imgOff;
let sOn;
let sOff;

function preload(){
  switchflipping = loadSound("/public/assets/sounds/switchflip.wav");
  switchgamelose = loadSound('/public/assets/sounds/switchgamelose.wav');
  switchgamewin = loadSound("/public/assets/sounds/switchgamewin.mp3")
  imgOn = loadImage('/public/assets/sprites/lighton.png');
  imgOff = loadImage('/public/assets/sprites/lightoff.png');
  sOn = loadImage('/public/assets/sprites/switchOn.png');
  sOff = loadImage('/public/assets/sprites/switchOff.png');
}

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
      image(sOff, this.x, this.y, 80, 120);
      image(imgOff, this.x, this.y + 120, 80, 120);
    }
    else{
      image(sOn, this.x, this.y, 80, 120);
      image(imgOn, this.x, this.y + 120, 80, 120);
    }
  }
}
class flipSwitchGame{
  constructor(){
    this.sw1 = new flipSwitch(false, (winWidth / 2) - 330, 100);
    this.sw2 = new flipSwitch(true, (winWidth / 2) - 207.5, 100);
    this.sw3 = new flipSwitch(false, (winWidth / 2) - 85, 100);
    this.sw4 = new flipSwitch(true, (winWidth / 2) + 37.5, 100);
    this.sw5 = new flipSwitch(false, (winWidth / 2) + 160, 100);
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
      if(mouseX > this.sw1.x && mouseX < this.sw1.x + 80 && mouseY > this.sw1.y && mouseY < this.sw1.y + 120){this.sw1.flip(); this.sw2.flip(); this.sw5.flip();}
      else if(mouseX > this.sw2.x && mouseX < this.sw2.x + 80 && mouseY > this.sw2.y && mouseY < this.sw2.y + 120){this.sw1.flip(); this.sw2.flip(); this.sw3.flip();}
      else if(mouseX > this.sw3.x && mouseX < this.sw3.x + 80 && mouseY > this.sw3.y && mouseY < this.sw3.y + 120){this.sw2.flip(); this.sw3.flip(); this.sw4.flip();}
      else if(mouseX > this.sw4.x && mouseX < this.sw4.x + 80 && mouseY > this.sw4.y && mouseY < this.sw4.y + 120){this.sw3.flip(); this.sw4.flip(); this.sw5.flip();}
      else if(mouseX > this.sw5.x && mouseX < this.sw5.x + 80 && mouseY > this.sw5.y && mouseY < this.sw5.y + 120){this.sw4.flip(); this.sw5.flip(); this.sw1.flip();}
    }
  }

  gameState(){
    if(this.sw1.onOff === false && this.sw2.onOff === false && this.sw3.onOff === false && this.sw4.onOff === false && this.sw5.onOff === false){
      this.gameOver = true;
      stroke('white');
      strokeWeight(4);
      textSize(48);
      fill('black');
      text('You lose', winWidth/2, winHeight/2);
    }
    else if(this.sw1.onOff === true && this.sw2.onOff === true && this.sw3.onOff === true && this.sw4.onOff === true && this.sw5.onOff === true){
      this.gameOver = true;
      stroke('white');
      strokeWeight(4);
      textSize(48);
      fill('black');
      text('You win', (winWidth/2) - 50, (winHeight/2) + 200);
    }
    else{
      this.gameOver = false;
    }
  }

  resetGameState(){
    //may be needed later good to have
    this.gameOver = false;
  }

  gameInstructions(){
    stroke('white');
    strokeWeight(1);
    textSize(36);
    textAlign(CENTER);
    fill('black');
    text("Flipping a switch flips itself and the ones next to it, flip all 5 to yellow to win!", (winWidth / 2) - 50, 50);
  }
}

function setup() {
  createCanvas(winWidth *0.95, winHeight * 0.95);
}

let flipGame = new flipSwitchGame();

function switchPuzzle(){
  flipGame.drawBoard();
  flipGame.gameState();
  flipGame.gameInstructions();
}


function draw() {
  // createCanvas(800, 800);
  background('red');
  switchPuzzle();
  /*
  textAlign(CENTER);
  fill('black');
  text("Flipping a switch flips itself and the ones next to it, flip all 5 to yellow to win!", (winWidth / 2) + 100, 50);
  */
}


function mousePressed(){
  flipGame.flipBoard();
}
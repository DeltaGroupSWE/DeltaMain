let flag = 0;

function preload(){
  
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
  }

  drawSwitch(){
    if(this.onOff == false){
      fill('black');
      rect(this.x, this.y, 20, 20);
    }
    else{
      fill('yellow');
      rect(this.x, this.y, 20, 20);
    }
  }
}

class flipSwitchGame{
  constructor(){
    this.sw1 = new flipSwitch(false, 30, 10);
    this.sw2 = new flipSwitch(true, 60, 10);
    this.sw3 = new flipSwitch(false, 90, 10);
    this.sw4 = new flipSwitch(true, 120, 10);
    this.sw5 = new flipSwitch(false, 150, 10);
    this.gameOver = false;
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
      if(mouseX > this.sw1.x && mouseX < this.sw1.x + 20){this.sw1.flip(); this.sw2.flip(); this.sw5.flip();}
      else if(mouseX > this.sw2.x && mouseX < this.sw2.x + 20){this.sw1.flip(); this.sw2.flip(); this.sw3.flip();}
      else if(mouseX > this.sw3.x && mouseX < this.sw3.x + 20){this.sw2.flip(); this.sw3.flip(); this.sw4.flip();}
      else if(mouseX > this.sw4.x && mouseX < this.sw4.x + 20){this.sw3.flip(); this.sw4.flip(); this.sw5.flip();}
      else if(mouseX > this.sw5.x && mouseX < this.sw5.x + 20){this.sw4.flip(); this.sw5.flip(); this.sw1.flip();}
    }
  }

  gameState(){
    if(this.sw1.onOff === false && this.sw2.onOff === false && this.sw3.onOff === false && this.sw4.onOff === false && this.sw5.onOff === false){
      console.log('all false');
      this.gameOver = true;
      textSize(32);
      text('You lose', 100, 130);
      fill('black');
    }
    else if(this.sw1.onOff === true && this.sw2.onOff === true && this.sw3.onOff === true && this.sw4.onOff === true && this.sw5.onOff === true){
      console.log('all true');
      this.gameOver = true;
      textSize(32);
      text('You win', 100, 130);
      fill('black');
    }
    else{
      console.log('in progress');
    }
  }

  resetGameState(){
    //may be needed later good to have
    this.gameOver = false;
  }

}

function setup() {
  createCanvas(300, 300);
  
}

let flipGame = new flipSwitchGame();

function draw() {
  background('red');
  flipGame.drawBoard();
  flipGame.gameState();
}

function mousePressed(){
  console.log(mouseX);
  flipGame.flipBoard();
}
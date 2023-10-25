let flag = 0;
//let timer;

/*
let switchflipping;
let switchgamelose;
let switchgamewin;
let imgOn;
let imgOff;
let sOn;
let sOff;
function preload(){
  switchflipping = loadSound("../../assets/sounds/switchflip.wav");
  switchgamelose = loadSound('../../assets/sounds/switchgamelose.wav');
  switchgamewin = loadSound("../../assets/sounds/switchgamewin.mp3")
  imgOn = loadImage('../../assets/sprites/lighton.png');
  imgOff = loadImage('../../assets/sprites/lightoff.png');
  sOn = loadImage('../../assets/sprites/switchOn.png');
  sOff = loadImage('../../assets/sprites/switchOff.png');
}
*/
class flipSwitch{
  constructor(onOff, x, y, w){
    this.onOff = onOff;
    this.x = x;
    this.y = y;
    this.w = w/10;
    this.h = w/5;
  }

  flip(){
    if(this.onOff == false){this.onOff = true;}
    else{this.onOff = false;}
    switchflipping.play();
  }

  drawSwitch(renderer){
    if(this.onOff == false){
      renderer.image(sOff,   this.x, this.y         , this.w, this.h);
      renderer.image(imgOff, this.x, this.y + this.h, this.w, this.h);
    }
    else{
      renderer.image(sOn,   this.x, this.y         , this.w, this.h);
      renderer.image(imgOn, this.x, this.y + this.h, this.w, this.h);
    }
  }
}
class flipSwitchGame extends Puzzle{
  constructor(renderer,difficulty=0){
    super(renderer, difficulty)
    this.sw1 = new flipSwitch(false, (this.renderer.width *0.05), this.renderer.height*0.2, this.renderer.width);
    this.sw2 = new flipSwitch(true,  (this.renderer.width *0.25), this.renderer.height*0.2, this.renderer.width);
    this.sw3 = new flipSwitch(false, (this.renderer.width *0.45), this.renderer.height*0.2, this.renderer.width);
    this.sw4 = new flipSwitch(true,  (this.renderer.width *0.65), this.renderer.height*0.2, this.renderer.width);
    this.sw5 = new flipSwitch(false, (this.renderer.width *0.85), this.renderer.height*0.2, this.renderer.width);
    this.gameOver = false;
    this.puzzleID = 1;
  }

  setupGame(){

  }

  drawGame() {  
    this.drawBoard();
    this.gameState();
    this.gameInstructions();
  }

  isSolved() {
    //console.log('Checking if the puzzle is solved')
  }

  handleMousePressed(mx, my) {
    //console.log('Handling puzzle\'s mouse event')
    this.flipBoard(mx,my);
  }

  
  drawBoard(){  
    this.sw1.drawSwitch(this.renderer);
    this.sw2.drawSwitch(this.renderer);
    this.sw3.drawSwitch(this.renderer);
    this.sw4.drawSwitch(this.renderer);
    this.sw5.drawSwitch(this.renderer);
  }

  flipBoard(mx,my){
    if(this.gameOver != true){
      if(mx > this.sw1.x && mx < this.sw1.x + this.sw1.w && my > this.sw1.y && my < this.sw1.y + this.sw1.h){this.sw1.flip(); this.sw2.flip(); this.sw5.flip();}
      else if(mx > this.sw2.x && mx < this.sw2.x + this.sw2.w && my > this.sw2.y && my < this.sw2.y + this.sw2.h){this.sw1.flip(); this.sw2.flip(); this.sw3.flip();}
      else if(mx > this.sw3.x && mx < this.sw3.x + this.sw3.w && my > this.sw3.y && my < this.sw3.y + this.sw2.h){this.sw2.flip(); this.sw3.flip(); this.sw4.flip();}
      else if(mx > this.sw4.x && mx < this.sw4.x + this.sw4.w && my > this.sw4.y && my < this.sw4.y + this.sw2.h){this.sw3.flip(); this.sw4.flip(); this.sw5.flip();}
      else if(mx > this.sw5.x && mx < this.sw5.x + this.sw5.w && my > this.sw5.y && my < this.sw5.y + this.sw2.h){this.sw4.flip(); this.sw5.flip(); this.sw1.flip();}
    }
  }

  gameState(){
    if(this.sw1.onOff === false && this.sw2.onOff === false && this.sw3.onOff === false && this.sw4.onOff === false && this.sw5.onOff === false){
      this.gameOver = true;
      this.renderer.stroke('white');
      this.renderer.strokeWeight(4);
      this.renderer.textSize(this.renderer.width * 0.1);
      this.renderer.fill('black');
      this.renderer.text('You lose', this.renderer.width/2, this.renderer.height/1.25);
    }
    else if(this.sw1.onOff === true && this.sw2.onOff === true && this.sw3.onOff === true && this.sw4.onOff === true && this.sw5.onOff === true){
      this.gameOver = true;
      this.renderer.stroke('white');
      this.renderer.strokeWeight(4);
      this.renderer.textSize(this.renderer.width *0.1);
      this.renderer.fill('black');
      this.renderer.text('You win', this.renderer.width/2, this.renderer.height/1.25);
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
    this.renderer.stroke('white');
    this.renderer.strokeWeight(1);
    this.renderer.textSize(this.renderer.width*0.025);
    this.renderer.textAlign(CENTER);
    this.renderer.fill('black');
    this.renderer.text("Flipping a switch flips itself and the ones next to it, flip all 5 to yellow to win!", this.renderer.width/2, 50);
  }
}




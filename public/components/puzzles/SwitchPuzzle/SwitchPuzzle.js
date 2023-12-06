let flag = 0;
//let timer;

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

class resetSwitch{
  constructor(flipped, x, y, w){
    this.flipped = flipped; //always init to false
    this.x = x;
    this.y = y;
    this.w = w/10;
    this.h = w/5;
  }

  drawResetSwitch(renderer){
    renderer.fill("black");
    renderer.text("Reset Game", (this.x + (this.x + this.w)) / 2, this.y)
    renderer.image(sOff, this.x, this.y, this.w, this.h);
  }
}

class flipSwitchGame extends Puzzle{
  constructor(renderer,difficulty=0){
    super(renderer, difficulty)
    let randomOnOff = [true, false];
    let setupDone = false;
    let onOffArray = [];
    let randomChange;
    this.randomCounter = 0;

    //determines random switch states with at least 1 as on or off
    while(setupDone == false){
      for(let i = 0; i < 5; ++i){
        onOffArray[i] = random(randomOnOff);
      }
      //ugly but simple implementation. Made to make sure the game cannot be won in one move
      if(onOffArray[0] == true && onOffArray[1] == true && onOffArray[2] == true && onOffArray[3] == true && onOffArray[4] == true){
        randomChange = random([0,1,2,3,4]); //temp
        onOffArray[randomChange] = false;
        //console.log("Changed on-on-on-on-on");
      }
      else if(onOffArray[0] == false && onOffArray[1] == false && onOffArray[2] == false && onOffArray[3] == false && onOffArray[4] == false){
        randomChange = random([0,1,2,3,4]); //temp
        onOffArray[randomChange] = true;
        //console.log("Changed off-off-off-off-off");
      }
      else if(onOffArray[0] == true && onOffArray[1] == true && onOffArray[2] == false && onOffArray[3] == false && onOffArray[4] == false){
        randomChange = random([2,3,4]); //temp
        onOffArray[randomChange] = true;
        //console.log("Changed on-on-off-off-off");
      }
      else if(onOffArray[0] == true && onOffArray[1] == false && onOffArray[2] == false && onOffArray[3] == false && onOffArray[4] == true){
        randomChange = random([1,2,3]); //temp
        onOffArray[randomChange] = true;
        //console.log("Changed om-off-off-off-on");
      }
      else if(onOffArray[0] == false && onOffArray[1] == false && onOffArray[2] == false && onOffArray[3] == true && onOffArray[4] == true){
        randomChange = random([0,1,2]); //temp
        onOffArray[randomChange] = true;
        //console.log("Changed off-off-off-on-on");
      }
      else if(onOffArray[0] == false && onOffArray[1] == false && onOffArray[2] == true && onOffArray[3] == true && onOffArray[4] == false){
        randomChange = random([0,1,4]); //temp
        onOffArray[randomChange] = true;
        //console.log("Changed off-off-off-on-on");
      }
      else if(onOffArray[0] == false && onOffArray[1] == true && onOffArray[2] == true && onOffArray[3] == false && onOffArray[4] == false){
        randomChange = random([0,3,4]); //temp
        onOffArray[randomChange] = true;
        //console.log("Changed off-off-off-on-on");
      }
      else{
        //console.log("Changed Nothing");
        setupDone = true;
      }
    }
    this.sw1 = new flipSwitch(onOffArray[0], (this.renderer.width *0.05), this.renderer.height*0.2, this.renderer.width);
    this.sw2 = new flipSwitch(onOffArray[1], (this.renderer.width *0.25), this.renderer.height*0.2, this.renderer.width);
    this.sw3 = new flipSwitch(onOffArray[2], (this.renderer.width *0.45), this.renderer.height*0.2, this.renderer.width);
    this.sw4 = new flipSwitch(onOffArray[3], (this.renderer.width *0.65), this.renderer.height*0.2, this.renderer.width);
    this.sw5 = new flipSwitch(onOffArray[4], (this.renderer.width *0.85), this.renderer.height*0.2, this.renderer.width);
    this.resetSwitchGame = new resetSwitch(false, (this.renderer.width *0.85), this.renderer.height*0.75, this.renderer.width);
    this.winLoss = 0; //-1 -> You lose : 0 -> Ongoing : 1 -> You win
    this.puzzleID = 1;
  }

  setupGame(){}

  drawGame() {  
    this.drawBoard();
    this.gameState();
    this.gameInstructions();
  }
  

  isSolved() {
    //console.log('Checking if the puzzle is solved')
    if(this.sw1.onOff === false && this.sw2.onOff === false && this.sw3.onOff === false && this.sw4.onOff === false && this.sw5.onOff === false){
      this.winLoss = -1;
      return true;
    }
    else if(this.sw1.onOff === true && this.sw2.onOff === true && this.sw3.onOff === true && this.sw4.onOff === true && this.sw5.onOff === true){
      this.winLoss = 1;
      return true;
    }
    else {return false;}
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
    this.resetSwitchGame.drawResetSwitch(this.renderer);
  }

  flipBoard(mx,my){
    if(this.winLoss == 0){
      if(mx > this.sw1.x && mx < this.sw1.x + this.sw1.w && my > this.sw1.y && my < this.sw1.y + this.sw1.h){this.sw1.flip(); this.sw2.flip(); this.sw5.flip();}
      else if(mx > this.sw2.x && mx < this.sw2.x + this.sw2.w && my > this.sw2.y && my < this.sw2.y + this.sw2.h){this.sw1.flip(); this.sw2.flip(); this.sw3.flip();}
      else if(mx > this.sw3.x && mx < this.sw3.x + this.sw3.w && my > this.sw3.y && my < this.sw3.y + this.sw2.h){this.sw2.flip(); this.sw3.flip(); this.sw4.flip();}
      else if(mx > this.sw4.x && mx < this.sw4.x + this.sw4.w && my > this.sw4.y && my < this.sw4.y + this.sw2.h){this.sw3.flip(); this.sw4.flip(); this.sw5.flip();}
      else if(mx > this.sw5.x && mx < this.sw5.x + this.sw5.w && my > this.sw5.y && my < this.sw5.y + this.sw2.h){this.sw4.flip(); this.sw5.flip(); this.sw1.flip();}
      else if(mx > this.resetSwitchGame.x && mx < this.resetSwitchGame.x + this.resetSwitchGame.w && my > this.resetSwitchGame.y && my < this.resetSwitchGame.y + this.resetSwitchGame.h){
        this.resetGameState();
        //console.log("reseting game state");
      }
    }
  }

  gameState(){
    //this.isSolved();
    if(this.isSolved() == true && this.winLoss == -1){
      this.renderer.stroke('white');
      this.renderer.strokeWeight(4);
      this.renderer.textSize(this.renderer.width * 0.1);
      this.renderer.fill('black');
      this.renderer.text('You lose', this.renderer.width/2, this.renderer.height/1.25);
    }
    else if(this.isSolved() == true && this.winLoss == 1){
      this.renderer.stroke('white');
      this.renderer.strokeWeight(4);
      this.renderer.textSize(this.renderer.width *0.1);
      this.renderer.fill('black');
      this.renderer.text('You win', this.renderer.width/2, this.renderer.height/1.25);
    }
    else{
      this.winLoss = 0;
    }
  }

  resetGameState(){
    console.log("entering reset game state");
    let randomOnOff = [true, false];
    let setupDone = false;
    let onOffArray = [];
    let randomChange;

    if(setupDone == false){
      randomSeed(this.randomCounter);
      ++this.randomCounter;
      for(let i = 0; i < 5; ++i){
        onOffArray[i] = random(randomOnOff);
      }
      //ugly but simple implementation. Made to make sure the game cannot be won in one move
      if(this.isSolved() == true && this.winLoss == 1){
        randomChange = random([0,1,2,3,4]); //temp
        onOffArray[randomChange] = false;
      }
      else if(this.isSolved() == true && this.winLoss == -1){
        randomChange = random([0,1,2,3,4]); //temp
        onOffArray[randomChange] = true;
      }
      else if(onOffArray[0] == true && onOffArray[1] == true && onOffArray[2] == false && onOffArray[3] == false && onOffArray[4] == false){
        randomChange = random([2,3,4]); //temp
        onOffArray[randomChange] = true;
      }
      else if(onOffArray[0] == true && onOffArray[1] == false && onOffArray[2] == false && onOffArray[3] == false && onOffArray[4] == true){
        randomChange = random([1,2,3]); //temp
        onOffArray[randomChange] = true;
      }
      else if(onOffArray[0] == false && onOffArray[1] == false && onOffArray[2] == false && onOffArray[3] == true && onOffArray[4] == true){
        randomChange = random([0,1,2]); //temp
        onOffArray[randomChange] = true;
      }
      else if(onOffArray[0] == false && onOffArray[1] == false && onOffArray[2] == true && onOffArray[3] == true && onOffArray[4] == false){
        randomChange = random([0,1,4]); //temp
        onOffArray[randomChange] = true;
      }
      else if(onOffArray[0] == false && onOffArray[1] == true && onOffArray[2] == true && onOffArray[3] == false && onOffArray[4] == false){
        randomChange = random([0,3,4]); //temp
        onOffArray[randomChange] = true;
      }
      else{setupDone = true;}
    }

    //console.log(this.randomCounter);
    this.sw1.onOff = onOffArray[0];
    this.sw2.onOff = onOffArray[1];
    this.sw3.onOff = onOffArray[2];
    this.sw4.onOff = onOffArray[3];
    this.sw5.onOff = onOffArray[4];
    this.winLoss = 0;

  }

  gameInstructions(){
    this.renderer.textSize(this.renderer.width*0.025);
    this.renderer.textAlign(CENTER);
    this.renderer.fill('black');
    this.renderer.text("Flipping a switch flips itself and the ones next to it, flip all 5 to one color to win!", this.renderer.width/2, 50);
  }
}

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
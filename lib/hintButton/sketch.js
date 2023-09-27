class hintGiver{
  constructor(x, y, puzzleID){
    this.flag = false; //always init to false
    this.puzzleID = puzzleID;
    console.log('init');
    this.x = x;
    this.y = y;
  }

  //this refuses to work with an actual button
  //could do a function based implementation with actual button
  makeButton(){
    fill('black');
    rect(this.x, this.y, 20, 20);
  }

  hintPrint(){
    if(this.flag == true){
      textSize(32);
      fill('white');
      text('Pls', 100, 130);
      console.log('its jover');
    }
  }

  hintToggle(){
    console.log('in thing');
    if(this.flag != false){this.flag = false;}
    else{this.flag = true;}
  }

  flagTrack(){
    console.log(this.flag);
  }
}

/* 

let hintThing = new hintGiver(10,10,-1); //implement puzzle id later

function mousePressed(){
  hintThing.hintToggle();
}

function hintConatiner(){
  hintThing.makeButton();
  hintThing.hintPrint();
}

//testing below

function preload(){
  
}
  
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background('white');
  hintConatiner();
}

*/

/*

Function based implementation of hintGiver

let flag = 0;


function hintToggle(){
  console.log('in foo');
  if(flag === 0) {flag = 1;}
  else{flag = 0;}
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

//in draw()
hint();
printHint(flag);

*/
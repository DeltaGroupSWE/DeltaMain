let buttonSound;
let timer;

function preload() {}

function setup() {
  createCanvas(winWidth, winHeight * 0.9);
  ///console.log(winWidth, winHeight);

  // intitalizing timer
  timer = new Timer();
  timer.setupTimer();
  timer.startTimer();

  //images from 'greggy theme'
}

class navButton{
  constructor(x,y,l,h, flag){
    this.x = x;//x position
    this.y = y;//y position
    this.l = l;//length of button
    this.h = h;//height of button
    this.flag = flag;//Whether it is leaderboard/ start
  }

  createNavButton(){
    rect(this.x,this.y,this.l,this.h);
    if(this.flag == 1){
      textSize(48);
      text("Start Game", (this.x), (this.y + (this.h / 2)));
    }
    else{
      textSize(48);
      text("Leaderboard", (this.x), (this.y + (this.h / 2)));
    }
    //console.log("rect");
  }

  clickButton(){
    if((mouseX > this.x) && (mouseX < this.x + this.l) && (mouseY > this.y) && (mouseY < this.y + this.h)){
      if(this.flag == 1){window.location.href = "../cube/index.html";}
      else{window.location.href = "../leaderboard/index.html";}
    }
  }
}

let bWidth = winWidth / 4;
let bHeight = winHeight / 10;
let yPos = winHeight / 2;//no idea why winHeight is so wierd so this for convience
let xPos = (winWidth / 2) - (bWidth / 2);

console.log(winHeight);

const leaderboardNavButton = new navButton(xPos, yPos, bWidth, bHeight, 0);
const startNavButton = new navButton(xPos, yPos + bHeight + 20, bWidth, bHeight, 1)

function draw() {
  background(200);
  leaderboardNavButton.createNavButton();
  startNavButton.createNavButton();
  // updating timer
  timer.updateTimer();

  // calculate x and y position relative to canvas size
  const timerTextX = width - width * 0.1;
  const timerTextY = height * 0.1;
  
  // displaying timer on canvas
  push(); // saves current drawing style
  textSize(50);
  fill(255);
  stroke(0);
  strokeWeight(3);
  text(timer.formatTime(timer.elapsedTime), width - 250, height - 750);
  pop(); // restores original state of drawing style
}

function mousePressed(){
  leaderboardNavButton.clickButton();
  startNavButton.clickButton();
}

function startGame() {
  window.location.href = "../cube/index.html";
}

function toLeaderboard(){
  window.location.href = "../leaderboard/index.html";
}

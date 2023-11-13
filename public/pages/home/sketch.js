let buttonSound;
let timer;

function preload() {}

function setup() {
  createCanvas(winWidth, winHeight * 0.9);
  ///console.log(winWidth, winHeight);
  gregHappy = loadImage('../../assets/sprites/bloodsugar-monitor-images/gregHappy.png');
  gregSad = loadImage("../../assets/sprites/bloodsugar-monitor-images/gregSad.png");
  greg = loadImage("../../assets/sprites/bloodsugar-monitor-images/greg.png")
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
    fill("white")
    rect(this.x, this.y, this.l, this.h, 20);
    if(this.flag == 1){
      textSize(48);
      fill("black");
      text("Start Game", (this.x + this.l / 5.5), (this.y + (this.h / (7/5))));
    }
    else{
      textSize(48);
      fill("black");
      text("Leaderboard", (this.x + this.l / 7), (this.y + (this.h / (7/5))));
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
let yPos = winHeight / 1.75;//no idea why winHeight is so wierd so this for convience
let xPos = (winWidth / 2) - (bWidth / 2);

console.log(winHeight);

const leaderboardNavButton = new navButton(xPos, yPos, bWidth, bHeight, 0);
const startNavButton = new navButton(xPos, yPos + bHeight + 20, bWidth, bHeight, 1)

function title(){
  stroke("white")
  strokeWeight(4);
  textSize(96);
  fill("black");
  text("Greg^3", xPos + (xPos/15), 100);
}

let normalXPos = winWidth/2 - 100;
let normalYPos = winHeight/5;
let sadXPos = winWidth/10;
let sadYPos = winHeight/10;
let happyXPos = winWidth/1.27;
let happyYPos = winHeight/10;

function gregPics(){
  image(greg, normalXPos, normalYPos, 200, 200);
  image(gregSad, sadXPos, sadYPos, 200, 200);
  image(gregHappy, happyXPos, happyYPos, 200, 200);
}

function draw() {
  background(200);
  title();
  gregPics();
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
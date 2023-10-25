//let buttonSound;

// cube globals
let cubeScale;
let sideLength;
let cubeRotX;
let cubeRotY;
let colorCodes = [];
let faceColors = [];
let cubeSides = [];

// timer globals
let timer;
let timerGraphic;

//HUD and mouse scaling
let eyeZ;

//auto rotation
let TargetRotX;
let TargetRotY;
let autoRotate;
let cubeLocked; 
let gameSelected;

///////////////////////////////////////////////////////////////////////////////
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
/*
function preload() {
  //buttonSound = loadSound('../../assets/sounds/button-beep.wav');
}
*/
///////////////////////////////////////////////////////////////////////////////
function setup() {
  mCreateCanvas(windowWidth*0.8, windowHeight * 0.9, WEBGL);
  cnv.mouseClicked(selectFace);
  cnv.doubleClicked(selectGame);
  normalMaterial();

  eyeZ = ((height/2) / tan(PI/6));
  mCamera(0,0,eyeZ);

	//mPage.show();
	//mPage.style("display", "inline");

///////////////////////////////////////////////////////////////////////////////
//Cube setup
  cubeScale = 1;
  sideLength = (height < width ? height/cubeScale : width/cubeScale)/2;
  cubeRotX = -QUARTER_PI;
  cubeRotY = -QUARTER_PI;
  const l = 1;//sideLength/2;
  colorCodes = [color(255, 45, 0),color(246, 255, 0),color(0, 255, 239),color(255, 0, 208),color(0, 255, 38),color(0, 19, 255)];
  faceColors = ['SwitchPuzzle','NumberPuzzle','wordPuzzle','SliderPuzzle','faceGreen','faceBlue'];
  let id = 101;
  cubeSides.push(new cubeFace( 0, 0, l, 0, 0,      colorCodes[0],faceColors[0],id));    //front
  cubeSides.push(new cubeFace( 0, 0,-l, 0,-PI,     colorCodes[1],faceColors[1],id+10));  //back
  cubeSides.push(new cubeFace( l, 0, 0, 0, HALF_PI,colorCodes[2],faceColors[2],id+20));  //right
  cubeSides.push(new cubeFace(-l, 0, 0, 0,-HALF_PI,colorCodes[3],faceColors[3],id+30));  //left
  cubeSides.push(new cubeFace( 0,-l, 0, HALF_PI, 0,colorCodes[4],faceColors[4],id+40));  //top
  cubeSides.push(new cubeFace( 0, l, 0,-HALF_PI, 0,colorCodes[5],faceColors[5],id+50));  //bottom

///////////////////////////////////////////////////////////////////////////////
//Cube autorotation vars
TargetRotX = 0;
TargetRotY = 0;
autoRotate = false;
cubeLocked = false; 
gameSelected = -1;

///////////////////////////////////////////////////////////////////////////////
//Game setup
//
cubeSides[0].setupFaceGame(new SliderPuzzle(cubeSides[0].gameBuffer,0));
cubeSides[3].setupFaceGame(new flipSwitchGame(cubeSides[3].gameBuffer,0));

///////////////////////////////////////////////////////////////////////////////
//Timer
  timer = new Timer();
  timer.setupTimer();
  timer.startTimer();
  timerGraphic = createGraphics(200,100);

///////////////////////////////////////////////////////////////////////////////
// Quit Game button
  quitButton = createButton("Quit");
  quitButton.style("background-color: #1A71E6");
  quitButton.style("display: inline-block");
  quitButton.style("font-family: Verdana");
  quitButton.style(`margin: 0px ${winWidth * 0.02}px`);
  quitButton.style(`border: 1px solid #000000`);
  // end styling button  //mousePressed Event
  quitButton.mousePressed(() => {
    window.location.href = "../home/index.html";
  });

}

///////////////////////////////////////////////////////////////////////////////
function draw() {
  mBackground(200);

  //use mouse movement when pressed to drive rotation
  if(mouseIsPressed && !cubeLocked){
    cubeRotY += (mouseX - pmouseX)*0.005;
    cubeRotX += -(mouseY - pmouseY)*0.005;
  }
  if(autoRotate){
    let easing = 0.05;
    let drx = TargetRotX - cubeRotX;
    let dry = TargetRotY - cubeRotY;
    cubeRotX += drx * easing;
    cubeRotY += dry * easing;
    if(drx < 0.01 && dry < 0.01) {
      autoRotate = false;
      cubeRotX = TargetRotX;
      cubeRotY = TargetRotY;
    }
  }

  drawHUD();
  mResetMatrix();
  mRotateX(cubeRotX);
  mRotateY(cubeRotY);
  for(let x = 0; x < cubeSides.length; x+=1)
  {
    mPush();
    cubeSides[x].drawFace();
    mPop();
  }
}

///////////////////////////////////////////////////////////////////////////////
//HUD and HUD components
function drawHUD(){
  let screenPlane = eyeZ*9/10-1; 
  /*
  //near plane reference 
  let cubeProjSize = (z*sideLength)/(10*(z-sideLength/2)); // same equation for figuring out mouse inputs to a game rendered on a cube face?
  push();
  translate(0,0,screenPlane+.9);
  noFill();
  stroke('white');
  strokeWeight(.2);
  plane(cubeProjSize);
  pop();
  */
 drawTimerHUD(screenPlane);

}

function drawTimerHUD(p){
  //upper right HUD
  //position = 1/10 of position of canvas
  timer.updateTimer();
  //scale her for canvase
  let urw = timerGraphic.width;   //2*height/10;
  let urh = timerGraphic.height; //height/10;
  let urx = (width/2) - urw/2;
  let ury = (-height/2 ) + urh/2;
  timerGraphic.fill(255);
  //timerGraphic.background(0);
  timerGraphic.textSize(50);
  timerGraphic.textAlign(CENTER,CENTER);
  timerGraphic.stroke(0)
  timerGraphic.strokeWeight(3);
  timerGraphic.text(timer.formatTime(timer.elapsedTime), urw/2,urh/2);
  push();
  //scale here for view plane
  translate(urx/10,ury/10,p);
  texture(timerGraphic);
  plane(urw/10,urh/10);
  pop();
  timerGraphic.clear();
}

///////////////////////////////////////////////////////////////////////////////
//Events
function windowResized(){
  //mResizeCanvans(windowWidth*0.8, windowHeight * 0.9);
  //mCamera(0,0, (height/2) / tan(PI/6));
  sideLength = (height < width ? height/cubeScale : width/cubeScale)/2;
  for(let x = 0; x < cubeSides.length; x+=1){
    //cubeSides[x].gameBuffer.resize(sideLength,sideLength);
  }
}

function mouseClicked(){
  if(!cubeLocked) return;
  cubeSides[gameSelected].game.handleMouseClicked(scaleMouseX(),scaleMouseY());
}

function doubleClicked(){
  if(!cubeLocked) return;
  cubeSides[gameSelected].game.handleMouseClicked(scaleMouseX(),scaleMouseY());
}

function mousePressed(){
  if(!cubeLocked) return;
  cubeSides[gameSelected].game.handleMousePressed(scaleMouseX(),scaleMouseY());
}

function keyPressed(){
  if(!cubeLocked) return;
  cubeSides[gameSelected].game.handleKeyPressed(keyCode);
}

function scaleMouseX(){
  let scaling = eyeZ/(eyeZ-sideLength/2)
  mx  = (mouseX - width/2)/scaling + sideLength/2;
  return mx;
}

function scaleMouseY(){
  let scaling = eyeZ/(eyeZ-sideLength/2)
  my = (mouseY - height/2)/scaling + sideLength/2;
  return my;
}

///////////////////////////////////////////////////////////////////////////////
//Event listener Functions
function selectFace(){ // listener for mouseClicked
  if(cubeLocked) return;
  id = objectAtMouse();
  //console.log(id);
  for(let x = 0; x < cubeSides.length; x+=1){
    //console.log(cubeSides[x].id)
    if(cubeSides[x].id === id) cubeSides[x].goToFace();
  }
}

function selectGame(){ // listener for mouseDoubleClicked
  id = objectAtMouse();
  //console.log(id);
  for(let x = 0; x < cubeSides.length; x+=1){
    //console.log(cubeSides[x].id)
    if(cubeSides[x].id === id) {
      cubeLocked = true;
      gameSelected = x;
      return;
    }
  }
  cubeLocked = false;
  gameSelected = -1;
}

///////////////////////////////////////////////////////////////////////////////
//CubeFace class
//Contains Graphics object and Puzzle Object as members
class cubeFace{
  constructor(tx,ty,tz,rx,ry,col,name,id){
    this.tx = tx;
    this.ty = ty;
    this.tz = tz;
    this.rx = rx;
    this.ry = ry;
    this.col = col;
    this.name = name;
    this.id = id;
    this.gameBuffer = createGraphics(sideLength,sideLength);
    this.game = null;
    //this.game = new SliderPuzzle(this.gameBuffer,0);
    //this.game.setupGame();

  }

  //accepts new Puzzle() as argument
  setupFaceGame(game){
    this.game = game;
    this.game.setupGame();
  }
    
  drawFace(){
    this.gameBuffer.clear();
    this.gameBuffer.background(this.col);
    if(this.game != null) this.game.drawGame();
    //this.gameBuffer.circle(scaleMouseX(),scaleMouseY(),10);

    mTranslate(this.tx*sideLength/2,this.ty*sideLength/2,this.tz*sideLength/2);
    mRotate(this.rx,createVector(1,0,0));
    mRotate(this.ry,createVector(0,1,0));
    mTexture(this.gameBuffer);
    mPlane(this.id,sideLength);
  }

  goToFace = () => {
    //buttonSound.play();
    TargetRotX = -this.rx;
    TargetRotY = -this.ry;
    autoRotate = true;
  }
  
}


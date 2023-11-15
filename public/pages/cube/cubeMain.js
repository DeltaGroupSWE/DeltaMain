//let buttonSound;
let winDebug;
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
let displayInstructions;

//auto rotation
let TargetRotX;
let TargetRotY;
let autoRotate;
let cubeLocked;
let gameSelected;
let rotationDisplay;

///////////////////////////////////////////////////////////////////////////////
let switchflipping;
let switchgamelose;
let switchgamewin;
let imgOn;
let imgOff;
let sOn;
let sOff;
let greg;
let gregHappy;
let gregSad;

const sliderGame = {};
function preload() {
  switchflipping = loadSound("../../assets/sounds/switchflip.wav");
  switchgamelose = loadSound('../../assets/sounds/switchgamelose.wav');
  switchgamewin = loadSound("../../assets/sounds/switchgamewin.mp3")
  imgOn = loadImage('../../assets/sprites/lighton.png');
  imgOff = loadImage('../../assets/sprites/lightoff.png');
  sOn = loadImage('../../assets/sprites/switchOn.png');
  sOff = loadImage('../../assets/sprites/switchOff.png');

  greg = loadImage('../../assets/sprites/bloodsugar-monitor-images/greg.png');
  gregHappy = loadImage('../../assets/sprites/bloodsugar-monitor-images/greghappy.png');
  gregSad = loadImage('../../assets/sprites/bloodsugar-monitor-images/gregsad.png');

  sliderGame.a1 = loadImage('../../assets/sprites/slider-images/a1.jpg');
  sliderGame.a2 = loadImage('../../assets/sprites/slider-images/a2.jpg');
  sliderGame.a3 = loadImage('../../assets/sprites/slider-images/a3.jpg');
  sliderGame.b1 = loadImage('../../assets/sprites/slider-images/b1.jpg');
  sliderGame.b2 = loadImage('../../assets/sprites/slider-images/b2.jpg');
  sliderGame.b3 = loadImage('../../assets/sprites/slider-images/b3.jpg');
  sliderGame.c1 = loadImage('../../assets/sprites/slider-images/c1.jpg');
  sliderGame.c2 = loadImage('../../assets/sprites/slider-images/c2.jpg');
  sliderGame.c3 = loadImage('../../assets/sprites/slider-images/c3.png'); //c3 is a png

  sprite_blueOn = loadImage('../../assets/sprites/simon/Blue_Button_On.png');
  sprite_blueOff = loadImage('../../assets/sprites/simon/Blue_Button.png');
  sprite_greenOn = loadImage('../../assets/sprites/simon/Green_Button_On.png');
  sprite_greenOff = loadImage('../../assets/sprites/simon/Green_Button.png');
  sprite_redOn = loadImage('../../assets/sprites/simon/Red_Button_On.png');
  sprite_redOff = loadImage('../../assets/sprites/simon/Red_Button.png');
  sprite_yellowOn = loadImage('../../assets/sprites/simon/Yellow_Button_On.png');
  sprite_yellowOff = loadImage('../../assets/sprites/simon/Yellow_Button.png');
  sprite_startButton = loadImage('../../assets/sprites/simon/Start_Button.png');

  //buttonSound = loadSound('../../assets/sounds/button-beep.wav');
}
///////////////////////////////////////////////////////////////////////////////
function setup() {
  mCreateCanvas(windowWidth * 0.8, windowHeight * 0.9, WEBGL);
  //cnv.mouseClicked(selectFace);
  cnv.doubleClicked(selectGame);
  normalMaterial();
  eyeZ = ((height / 2) / tan(PI / 6));
  mCamera(0, 0, eyeZ);
  //mPage.show();
  //mPage.style("display", "inline");
  ///////////////////////////////////////////////////////////////////////////////
  //Cube setup
  cubeScale = 1;
  sideLength = (height < width ? height / cubeScale : width / cubeScale) / 2;
  cubeRotX = -QUARTER_PI;
  cubeRotY = -QUARTER_PI;
  const l = 1;//sideLength/2;
  colorCodes = [color(255, 45, 0), color(255, 130, 0), color(0, 255, 239), color(255, 0, 208), color(0, 255, 38), color(0, 19, 255)];
  faceColors = ['SwitchPuzzle', 'NumberPuzzle', 'wordPuzzle', 'SliderPuzzle', 'faceGreen', 'faceBlue'];
  let id = 101;
  cubeSides.push(new cubeFace(0, 0, l, 0, 0, colorCodes[0], faceColors[0], id));    //front
  cubeSides.push(new cubeFace(0, 0, -l, 0, -PI, colorCodes[1], faceColors[1], id + 10));  //back
  cubeSides.push(new cubeFace(l, 0, 0, 0, HALF_PI, colorCodes[2], faceColors[2], id + 20));  //right
  cubeSides.push(new cubeFace(-l, 0, 0, 0, -HALF_PI, colorCodes[3], faceColors[3], id + 30));  //left
  cubeSides.push(new cubeFace(0, -l, 0, HALF_PI, 0, colorCodes[4], faceColors[4], id + 40));  //top
  cubeSides.push(new cubeFace(0, l, 0, -HALF_PI, 0, colorCodes[5], faceColors[5], id + 50));  //bottom
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
  //TODO: randomize game order 
  //let gameList = [new SliderPuzzle(createGraphics(sideLength,sideLength),0)
  //               ,new WordPuzzle(createGraphics(sideLength,sideLength),0)
  //               ,new flipSwitchGame(createGraphics(sideLength,sideLength),0)
  //               ,new NumberPuzzle(createGraphics(sideLength,sideLength),0)]
  //for(let x in cubeSides){
  //  let i = random number from 0 - gameList.length;
  //  x.setupFaceGame(gamelist[i]);
  //  gameList.slice(i,1);
  //}
  cubeSides[0].setupFaceGame(new SliderPuzzle(cubeSides[0].gameBuffer, 0));
  cubeSides[1].setupFaceGame(new WordPuzzle(cubeSides[1].gameBuffer, 0));
  cubeSides[2].setupFaceGame(new flipSwitchGame(cubeSides[2].gameBuffer, 0));
  cubeSides[3].setupFaceGame(new BloodSugarGame(cubeSides[3].gameBuffer, 0));
  cubeSides[4].setupFaceGame(new NumberPuzzle(cubeSides[4].gameBuffer, 0));
  cubeSides[5].setupFaceGame(new SimonPuzzle(cubeSides[5].gameBuffer, 0));
  ///////////////////////////////////////////////////////////////////////////////
  //Timer
  timer = new Timer();
  timer.setupTimer();
  //timer.startTimer();
  timerGraphic = createGraphics(200, 100);

  displayInstructions = true;
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
  //////////////////////////////////////////////////////////
  //rotationDisplay = createGraphics(200,200);
  winDebug = false;
}

///////////////////////////////////////////////////////////////////////////////
function draw() {
  mBackground(200);

  if (cubeComplete()) {
    rotateToWin();
  }

  calcRotation();
  drawHUD();
  mResetMatrix();
  mRotateX(cubeRotX);
  mRotateY(cubeRotY);
  for (let x = 0; x < cubeSides.length; x += 1) {
    mPush();
    cubeSides[x].drawFace();
    mPop();
  }
  drawHUD();
}

function calcRotation() {
  if (cubeRotY > PI) cubeRotY -= TWO_PI;
  if (cubeRotY < -PI) cubeRotY += TWO_PI;
  if (cubeRotX > PI) cubeRotX -= TWO_PI;
  if (cubeRotX < -PI) cubeRotX += TWO_PI;
  if (autoRotate) {
    //if(sign(TargetRotX)!= sign(cubeRotX)) 
    let easing = .25;
    let drx = TargetRotX - cubeRotX;
    let dry = TargetRotY - cubeRotY;
    cubeRotX += drx * easing;
    cubeRotY += dry * easing;
    if (abs(drx) < 0.01 && abs(dry) < 0.01) {
      autoRotate = false;
      cubeRotX = TargetRotX;
      cubeRotY = TargetRotY;
      if (cubeComplete()) cubeLocked = true;
    }
  }
}

//TODO: game win animation
function rotateToWin() {
  autoRotate = true;
  TargetRotX = -QUARTER_PI;
  TargetRotY = -QUARTER_PI;
}

///////////////////////////////////////////////////////////////////////////////
//HUD and HUD components
function drawHUD() {
  let screenPlane = eyeZ * 9 / 10 - 1;
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
  //drawRotationDisplay(screenPlane);
  if (displayInstructions) instructionWindow(screenPlane);
}

function drawTimerHUD(p) {
  //upper right HUD
  //position = 1/10 of position of canvas
  timer.updateTimer();
  //scale her for canvase
  let urw = timerGraphic.width;   //2*height/10;
  let urh = timerGraphic.height; //height/10;
  let urx = (width / 2) - urw / 2;
  let ury = (-height / 2) + urh / 2;
  timerGraphic.fill(255);
  //timerGraphic.background(0);
  timerGraphic.textSize(50);
  timerGraphic.textAlign(CENTER, CENTER);
  timerGraphic.stroke(0)
  timerGraphic.strokeWeight(3);
  timerGraphic.text(timer.formatTime(timer.elapsedTime), urw / 2, urh / 2);
  push();
  //scale here for view plane
  translate(urx / 10, ury / 10, p);
  texture(timerGraphic);
  plane(urw / 10, urh / 10);
  pop();
  timerGraphic.clear();
}

function drawRotationDisplay(p) {
  let urw = rotationDisplay.width;   //2*height/10;
  let urh = rotationDisplay.height; //height/10;
  let urx = (width / 2) - urw / 2;
  let ury = (height / 2) - urh / 2;
  rotationDisplay.fill(255);
  //timerGraphic.background(0);
  rotationDisplay.textSize(50);
  rotationDisplay.textAlign(CENTER, CENTER);
  rotationDisplay.stroke(0)
  rotationDisplay.strokeWeight(3);
  rotationDisplay.text(cubeRotX.toFixed(2), urw / 2, urh / 3);
  rotationDisplay.text(cubeRotY.toFixed(2), urw / 2, urh * 2 / 3);
  push();
  translate(urx / 10, ury / 10, p);
  texture(rotationDisplay);
  plane(urw / 10, urh / 10);
  pop();
  rotationDisplay.clear();
}

function instructionWindow(p) {
  noLoop();
  let instructionWindow = createGraphics(width / 2, height / 2)
  let urw = instructionWindow.width;   //2*height/10;
  let urh = instructionWindow.height; //height/10;
  let urx = (width / 2) - urw;
  let ury = (height / 2) - urh;
  instructionWindow.background(255);
  //timerGraphic.background(0);
  instructionWindow.textSize(instructionWindow.height / 20);
  instructionWindow.textAlign(CENTER, CENTER);
  instructionWindow.stroke(0)
  instructionWindow.strokeWeight(1);
  let introText1 = "Instructions\n";
  let introText2 = "Use the mouse to rotate around the cube\n" +
    "Click on a face to jump to it\n" +
    "Double Click on the face to play the game\n" +
    "Double Click off the cube to stop playing\n" +
    "When the boarder is green you can't move the cube but you can play the game\n" +
    "\nPress any key to continue...";
  instructionWindow.rectMode(CENTER, CENTER);
  instructionWindow.textSize(instructionWindow.height / 10);
  instructionWindow.text(introText1, urw / 2, urh * 0.2, urw * 0.8, urh * 0.8);
  instructionWindow.textSize(instructionWindow.height / 20);
  instructionWindow.text(introText2, urw / 2, urh * 0.5, urw * 0.8, urh * 0.8);
  instructionWindow.strokeWeight(10);
  instructionWindow.noFill();
  instructionWindow.rect(urw / 2, urh / 2, urw, urh);

  push();
  translate(urx / 10, ury / 10, p);
  texture(instructionWindow);
  plane(urw / 10, urh / 10);
  pop();
  instructionWindow.clear();
}

///////////////////////////////////////////////////////////////////////////////
//Events
function windowResized() {
  //mResizeCanvans(windowWidth*0.8, windowHeight * 0.9);
  //mCamera(0,0, (height/2) / tan(PI/6));
  //sideLength = (height < width ? height/cubeScale : width/cubeScale)/2;
  for (let x = 0; x < cubeSides.length; x += 1) {
    //cubeSides[x].gameBuffer.resize(sideLength,sideLength);
  }
}

function mouseClicked() {
  if (!cubeLocked) return;
  cubeSides[gameSelected].game.handleMouseClicked(scaleMouseX(), scaleMouseY());
}

function doubleClicked() {
  if (!cubeLocked) return;
  cubeSides[gameSelected].game.handleDoubleClicked(scaleMouseX(), scaleMouseY());
}

function mousePressed() {
  if (!cubeLocked) {
    pressed_id = objectAtMouse();
    pressed_rotX = cubeRotX;
    pressed_rotY = cubeRotY;
    return;
  }
  cubeSides[gameSelected].game.handleMousePressed(scaleMouseX(), scaleMouseY());
}

function mouseReleased() {
  if (!cubeLocked) {
    released_id = objectAtMouse();
    released_rotX = cubeRotX;
    released_rotY = cubeRotY;
    if (released_id === pressed_id && released_rotX === pressed_rotX && released_rotY === pressed_rotY) {
      for (let x = 0; x < cubeSides.length; x += 1) {
        //console.log(cubeSides[x].id)
        if (cubeSides[x].id === released_id) cubeSides[x].goToFace();
      }
    }
    return;
  }
  cubeSides[gameSelected].game.handleMouseReleased(scaleMouseX(), scaleMouseY());
}

function mouseDragged() {
  if (!cubeLocked && !autoRotate) {
    cubeRotY += (mouseX - pmouseX) * 0.0025;
    cubeRotX += -(mouseY - pmouseY) * 0.0025;
    return;
  }
  cubeSides[gameSelected].game.handleMouseDragged(scaleMouseX(), scaleMouseY());
}

function keyPressed() {
  if (key === 'w') winDebug = true;
  if (displayInstructions) {
    displayInstructions = false;
    loop();
    timer.startTimer();
  }
  if (!cubeLocked) return;
  cubeSides[gameSelected].game.handleKeyPressed(keyCode);
}

function scaleMouseX() {
  let scaling = eyeZ / (eyeZ - sideLength / 2)
  mx = (mouseX - width / 2) / scaling + sideLength / 2;
  return mx;
}

function scaleMouseY() {
  let scaling = eyeZ / (eyeZ - sideLength / 2)
  my = (mouseY - height / 2) / scaling + sideLength / 2;
  return my;
}

///////////////////////////////////////////////////////////////////////////////
//Event listener Functions
/*
function selectFace(){ // listener for mouseClicked
  if(cubeLocked) return;
  id = objectAtMouse();
  //console.log(id);
  for(let x = 0; x < cubeSides.length; x+=1){
    //console.log(cubeSides[x].id)
    if(cubeSides[x].id === id) cubeSides[x].goToFace();
  }
}
*/
function selectGame() { // listener for doubleClicked
  id = objectAtMouse();
  //console.log(id);
  for (let x = 0; x < cubeSides.length; x += 1) {
    //console.log(cubeSides[x].id)
    if (cubeSides[x].id === id) {
      cubeLocked = true;
      gameSelected = x;
      return;
    }
  }
  cubeLocked = false;
  gameSelected = -1;
}


function cubeComplete() {
  if (winDebug) return true;
  for (let x of cubeSides) {
    if (x.game != null) {
      if (!x.game.isSolved()) return false;
    }
  }
  return true;
}


///////////////////////////////////////////////////////////////////////////////
//CubeFace class
//Contains Graphics object and Puzzle Object as members
class cubeFace {
  constructor(tx, ty, tz, rx, ry, col, name, id) {
    this.tx = tx;
    this.ty = ty;
    this.tz = tz;
    this.rx = rx;
    this.ry = ry;
    this.col = col;
    this.name = name;
    this.id = id;
    this.gameBuffer = createGraphics(sideLength, sideLength);
    this.game = null;
    //this.game = new SliderPuzzle(this.gameBuffer,0);
    //this.game.setupGame();

  }

  //accepts new Puzzle() as argument
  setupFaceGame(game) {
    this.game = game;
    this.game.setupGame();
  }

  drawFace() {
    this.gameBuffer.clear();
    this.gameBuffer.background(this.col);
    /*
    if(this.game != null)
      if(!this.game.isSolved()) this.gameBuffer.image(gregSad,0,0,this.gameBuffer.width,this.gameBuffer.height);
      else this.gameBuffer.image(gregHappy,0,0,this.gameBuffer.width,this.gameBuffer.height);
    else this.gameBuffer.image(greg,0,0,this.gameBuffer.width,this.gameBuffer.height);
    */
    if (this.game != null) {
      if (this.game.isSolved()) this.gameBuffer.image(gregHappy, 0, 0, this.gameBuffer.width, this.gameBuffer.height);
      else this.game.drawGame();
    }
    //this.gameBuffer.circle(scaleMouseX(),scaleMouseY(),10);

    mTranslate(this.tx * sideLength / 2, this.ty * sideLength / 2, this.tz * sideLength / 2);
    mRotate(this.rx, createVector(1, 0, 0));
    mRotate(this.ry, createVector(0, 1, 0));
    this.gameBuffer.push();
    this.gameBuffer.stroke(255);
    if (cubeLocked) this.gameBuffer.stroke("green");
    this.gameBuffer.strokeWeight(8);
    this.gameBuffer.noFill();
    this.gameBuffer.rectMode(CORNER);
    this.gameBuffer.rect(0, 0, this.gameBuffer.width, this.gameBuffer.height);
    this.gameBuffer.pop();
    mTexture(this.gameBuffer);
    mPlane(this.id, sideLength);
  }

  goToFace() {
    //buttonSound.play();
    TargetRotX = -this.rx;
    TargetRotY = -this.ry;
    //for back face default targetY = PI, but if cubeY is negative we don't want to go long way round
    if (TargetRotY === PI && cubeRotY < 0) { TargetRotY = -PI; }
    autoRotate = true;
  }

}


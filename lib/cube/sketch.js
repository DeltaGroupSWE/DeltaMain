let buttonSound;
let cam1;
//let camDist;
let cubeSides = [];
let cubeRotX;
let cubeRotY;
let cubeScale;
let cubeCV;
let sideLength;
let colorCodes = [];
let faceColors = [];


function preload() {
  buttonSound = loadSound("../sounds/button-beep.wav");
}

function setup() {
  // using windowHeight/windowWidth instead of winHeight/winWidth seems to fix resizing problem
  mCreateCanvas(windowWidth*0.8, windowHeight * 0.9, WEBGL); 
  cnv.mouseClicked(selectFace);
  cnv.doubleClicked(selectGame);
  normalMaterial();
	//mPage.show();
	//mPage.style("display", "inline");
  cubeScale = 2;
  sideLength = height < width ? height/cubeScale : width/cubeScale;
  cubeRotX = -QUARTER_PI;
  cubeRotY = -QUARTER_PI;
  const l = sideLength/2;
  colorCodes = [color(255, 45, 0),color(246, 255, 0),color(0, 255, 239),color(255, 0, 208),color(0, 255, 38),color(0, 19, 255)];
  faceColors = ['Red','Yellow','Turquoise','Pink','Green','Blue'];
  let id = 101;
  cubeSides.push(new cubeFace( 0, 0, l, 0, 0,      colorCodes[0],faceColors[0],id));    //front
  cubeSides.push(new cubeFace( 0, 0,-l, 0,-PI,     colorCodes[1],faceColors[1],id+10));  //back
  cubeSides.push(new cubeFace( l, 0, 0, 0, HALF_PI,colorCodes[2],faceColors[2],id+20));  //right
  cubeSides.push(new cubeFace(-l, 0, 0, 0,-HALF_PI,colorCodes[3],faceColors[3],id+30));  //left
  cubeSides.push(new cubeFace( 0,-l, 0, HALF_PI, 0,colorCodes[4],faceColors[4],id+40));  //top
  cubeSides.push(new cubeFace( 0, l, 0,-HALF_PI, 0,colorCodes[5],faceColors[5],id+50));  //bottom
  /*
  for(let x = 0; x < faceColors.length; x += 1){
    buttonFace = createButton(faceColors[x]+" Face");
    buttonFace.class("button");
    buttonFace.style("background-color: " + colorCodes[x].toString('#rrggbb'));
    buttonFace.style("display: inline-block");
    buttonFace.style("font-family: Verdana");
    buttonFace.style(`border: 1px solid #000000`);
    buttonFace.style('width : 120px');
    buttonFace.position(0,40*x,'absolute');
    //buttonFace.mouseOver(cubeSides[x].goToFace);
    buttonFace.mousePressed(
    () =>{
      window.location.href = "../face"+faceColors[x]+"/index.html";
    }
    );
  }
  */
  const fontSize = winWidth * 0.03;

  // Quit Game button
  //styling button
  quitButton = createButton("Quit");
  quitButton.style("background-color: #1A71E6");
  quitButton.style("display: inline-block");
  quitButton.style("font-family: Verdana");
  quitButton.style(`margin: 0px ${winWidth * 0.02}px`);
  quitButton.style(`border: 1px solid #000000`);
  // end styling button


  //mousePressed Event
  quitButton.mousePressed(quitGame);

  /*
  NumberPuzzleButton = createButton("Puzzle 1");
  NumberPuzzleButton.style("background-color: red");
  NumberPuzzleButton.style("display: inline-block");
  NumberPuzzleButton.style("font-family: Verdana");
  NumberPuzzleButton.style(`margin: 0px ${winWidth * 0.02}px`);
  NumberPuzzleButton.style(`border: 1px solid #000000`);

  NumberPuzzleButton.mousePressed(Puzzle1);

  // Puzzle 2 Button
  WordPuzzleButton = createButton("Puzzle 2");
  WordPuzzleButton.style("background-color: red");
  WordPuzzleButton.style("display: inline-block");
  WordPuzzleButton.style("font-family: Verdana");
  WordPuzzleButton.style(`margin: 0px ${winWidth * 0.02}px`);
  WordPuzzleButton.style(`border: 1px solid #000000`);

  WordPuzzleButton.mousePressed(Puzzle2);
  */
}


function draw() {
  mBackground(0);
  mCamera();

  //use mouse movement when press to drive rotation
  if(mouseIsPressed){
    cubeRotY += (mouseX - pmouseX)*0.005;
    cubeRotX += -(mouseY - pmouseY)*0.005;
  }
  
  mResetMatrix();
  mRotateX(cubeRotX);
  mRotateY(cubeRotY);
  let newSideLen = (height < width ? height/cubeScale : width/cubeScale)/2;
  mScale(newSideLen/sideLength);
  for(let x = 0; x < cubeSides.length; x+=1)
  {
    mPush();
    cubeSides[x].drawFace();
    mPop();
  }

  
}


function windowResized(){
  mResizeCanvans(windowWidth*0.8, windowHeight * 0.9);
}

function quitGame() {
  window.location.href = "../Home/index.html";
}

function Puzzle1() {
  window.location.href = "../NumberPuzzle/index.html";
}

function Puzzle2() {
  window.location.href = "../wordPuzzle/index.html";
}


function mouseClicked(){

}

function doubleClicked(){

}

function selectFace(){
  id = objectAtMouse();
  //console.log(id);
  for(let x = 0; x < cubeSides.length; x+=1){
    //console.log(cubeSides[x].id)
    if(cubeSides[x].id === id) cubeSides[x].goToFace();
  }
}

function selectGame(){
  id = objectAtMouse();
  //console.log(id);
  for(let x = 0; x < cubeSides.length; x+=1){
    //console.log(cubeSides[x].id)
    if(cubeSides[x].id === id) cubeSides[x].goToFace();
  }
}

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
  }
    
  drawFace(){
    fill(this.col);
    mTranslate(this.tx,this.ty,this.tz);
    mRotate(this.rx,createVector(1,0,0));
    mRotate(this.ry,createVector(0,1,0));
    mPlane(this.id,sideLength);
  }
  
  goToGame = () => {
    window.location.href = "../face"+ this.name + "/index.html";
  }

  goToFace = () => {
    //buttonSound.play();
    cubeRotX = -this.rx;
    cubeRotY = -this.ry;
  }
  
}


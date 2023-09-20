let buttonSound;
let cam1;
//let camDist;
let cubeSides = [];
let cubeRotX;
let cubeRotY;
let cubeScale;
let cubeCV;

function preload() {
  buttonSound = loadSound("../sounds/button-beep.wav");
}

function setup() {
  // using windowHeight/windowWidth instead of winHeight/winWidth seems to fix resizing problem
  createCanvas(windowWidth*0.8, windowHeight * 0.9, WEBGL); 
  normalMaterial();
  cam1 = createCamera();
  cubeScale = 2;
  SIDE_LENGTH = height < width ? height/cubeScale : width/cubeScale;
  //camDist = 1000;
  //cam1.camera(camDist,-camDist,camDist);
  //start cube at nice perspective
  cubeRotX = -QUARTER_PI;
  cubeRotY = -QUARTER_PI;
/*
//debug thing
  pg = createGraphics(300,300);
*/
  const l = SIDE_LENGTH/2;
  const p1 = createVector(l,l,l);   
  const p2 = createVector(l,-l,l); 
  const p3 = createVector(-l,-l,l);
  const p4 = createVector(-l,l,l);  
  const p5 = createVector(l,l,-l);
  const p6 = createVector(l,-l,-l);
  const p7 = createVector(-l,-l,-l);
  const p8 = createVector(-l,l,-l);  

  const colorCodes = [color(255, 45, 0),color(246, 255, 0),color(0, 255, 239),color(255, 0, 208),color(0, 255, 38),color(0, 19, 255)];
  const faceColors = ['Red','Yellow','Turquoise','Pink','Green','Blue'];

  cubeSides.push(new cubeFace(0,0, 1,p1,p2,p3,p4,colorCodes[0],faceColors[0]));
  cubeSides.push(new cubeFace(0,0,-1,p8,p7,p6,p5,colorCodes[1],faceColors[1]));
  cubeSides.push(new cubeFace( 1,0,0,p5,p6,p2,p1,colorCodes[2],faceColors[2]));
  cubeSides.push(new cubeFace(-1,0,0,p4,p3,p7,p8,colorCodes[3],faceColors[3]));
  cubeSides.push(new cubeFace(0,-1,0,p2,p6,p7,p3,colorCodes[4],faceColors[4]));
  cubeSides.push(new cubeFace(0, 1,0,p5,p1,p4,p8,colorCodes[5],faceColors[5]));
  
  for(let x = 0; x < faceColors.length; x += 1){
    buttonFace = createButton(faceColors[x]+" Face");
    buttonFace.class("button");
    buttonFace.style("background-color: " + colorCodes[x].toString('#rrggbb'));
    buttonFace.style("display: inline-block");
    buttonFace.style("font-family: Verdana");
    buttonFace.style(`margin: 0px ${windowWidth * 0.01}px`);
    buttonFace.style(`border: 1px solid #000000`);
    buttonFace.mouseOver(cubeSides[x].goToFace);
    buttonFace.mousePressed(
    () =>{
      window.location.href = "../face"+faceColors[x]+"/index.html";
    }
    );
  }

/*
  //buttons for zooming on faces
  function faceYellow() {
    //switch game
    window.location.href = "../faceYellow/index.html";
  }
  function faceRed() {
    //switch game
    window.location.href = "../faceRed/index.html";
  }
  function faceBlue() {
    //switch game
    window.location.href = "../faceBlue/index.html";
  }
  function faceGreen() {
    //switch game
    window.location.href = "../faceGreen/index.html";
  }
  function facePink() {
    //switch game
    window.location.href = "../facePink/index.html";
  }
  function faceTuruoise() {
    //switch game
    window.location.href = "../faceTurquoise/index.html";
  }

  buttonFront = createButton("Red Face");
  buttonFront.class("button");
  buttonFront.mouseOver(cubeSides[0].goToFace);
  buttonFront.mousePressed(faceRed);

  buttonFront = createButton("Yellow Face") ;
  buttonFront.class('button');
  buttonFront.mouseOver(cubeSides[1].goToFace);
  buttonFront.mousePressed(faceYellow);

  buttonFront = createButton("Turquoise Face");
  buttonFront.class("button");
  buttonFront.mouseOver(cubeSides[2].goToFace);
  buttonFront.mousePressed(faceTuruoise);

  buttonFront = createButton("Pink Face");
  buttonFront.class("button");
  buttonFront.mouseOver(cubeSides[3].goToFace);
  buttonFront.mousePressed(facePink);

  buttonFront = createButton("Green Face");
  buttonFront.class("button");
  buttonFront.mouseOver(cubeSides[4].goToFace);
  buttonFront.mousePressed(faceGreen);

  buttonFront = createButton("Blue Face");
  buttonFront.class("button");
  buttonFront.mouseOver(cubeSides[5].goToFace);
  buttonFront.mousePressed(faceBlue);
  describe("show cube face");
*/
  const fontSize = winWidth * 0.03;

  // Quit Game button
  /*styling button*/
  quitButton = createButton("Quit");
  quitButton.style("background-color: #1A71E6");
  quitButton.style("display: inline-block");
  quitButton.style("font-family: Verdana");
  quitButton.style(`margin: 0px ${winWidth * 0.02}px`);
  quitButton.style(`border: 1px solid #000000`);
  // end styling button


  /*mousePressed Event*/
  quitButton.mousePressed(quitGame);

  NumberPuzzleButton = createButton("Puzzle 1");
  NumberPuzzleButton.style("background-color: red");
  NumberPuzzleButton.style("display: inline-block");
  NumberPuzzleButton.style("font-family: Verdana");
  NumberPuzzleButton.style(`margin: 0px ${winWidth * 0.02}px`);
  NumberPuzzleButton.style(`border: 1px solid #000000`);

  NumberPuzzleButton.mousePressed(Puzzle1);
}


function draw() {
  background(200);
  //orbitControl();
  /*
  ///////////////////////////////////////////////////////////
  //Debug stuff
  debugMode();
  push();
  pg.background(255);
  pg.text('X rot:' + cubeRotX + '\nY rot:' + cubeRotY, 50, 50);
  texture(pg);
  translate( -300, -100, cam1.eyeZ/2 );
  plane(100);
  pop();

  /////////////////////////////////////////////////////////
  */

  //use mouse movement when press to drive rotation
  if(mouseIsPressed){
    cubeRotY += (mouseX - pmouseX)*0.005;
    cubeRotX += -(mouseY - pmouseY)*0.005;
  }
  push();

  rotateX(cubeRotX);
  rotateY(cubeRotY);
  let newSideLen = (height < width ? height/cubeScale : width/cubeScale)/2;
  scale(newSideLen/SIDE_LENGTH);
  for(let x = 0; x < cubeSides.length; x+=1)
  {
    let object = cubeSides[x];
    object.drawFace();
  }

  pop();
  
}

function windowResized(){
  resizeCanvas(windowWidth*0.8, windowHeight * 0.9);
}

function quitGame() {
  window.location.href = "../Home/index.html";
}

function Puzzle1() {
  window.location.href = "../NumberPuzzle/index.html";
}

/*
//work in progress - attempting to determing which face of cube is closest to camera
//then create click even to go to the appropriate page
function doubleClicked(){
  if(mouseX > width/2 + width*0.1 || mouseX < width/2 - width*0.1 ) return;
  if(mouseY > heigh/2 + height*0.1 || mouseYU < height/2 - height*0.1) return;
  //if(cubeRotX > )
}
*/


class cubeFace{
  constructor(n1,n2,n3,p1,p2,p3,p4,col,name){
    this.normal = createVector(n1,n2,n3);
    this.p1 = p1.copy();
    this.p2 = p2.copy();
    this.p3 = p3.copy();
    this.p4 = p4.copy();
    this.d = this.normal.dot(this.normal);
    this.col = col;
    this.name = name;
  }

  getNorm(){
    return this.normal;
  }

  drawFace(){
    fill(this.col);
    quad(this.p1.x, this.p1.y, this.p1.z, 
         this.p2.x, this.p2.y, this.p2.z, 
         this.p3.x, this.p3.y, this.p3.z, 
         this.p4.x, this.p4.y, this.p4.z);
  }

  goToFace = () => {
    buttonSound.play();
    const xAxis = createVector(1,0,0);
    const yAxis = createVector(0,1,0);

    let NewRotY = -xAxis.angleBetween(p5.Vector.sub(this.p1, this.p4));
    let NewRotX = -yAxis.angleBetween(p5.Vector.sub(this.p1, this.p2));
    
    //hack im not proud of
    if(this.name === 'Pink') NewRotY = PI/2;
    if(this.name === 'Blue') NewRotX = PI/2;
    
 /*
    //trying to make a transition animation
    while(cubeRotY != NewRotY || cubeRotX != NewRotX){
      cubeRotX += 0.1 *(cubeRotX-NewRotX);
      cubeRotY += 0.1 *(cubeRotY-NewRotY);
    }
*/
    cubeRotY = NewRotY;
    cubeRotX = NewRotX;

    /*
    //cam1.camera(this.normal.x*camDist, this.normal.y*camDist, this.normal.z*camDist);
    if(this.normal.y != 0){
      //cam1.setPosition(0,this.normal.y*camDist,0, 0,0,0, 0,0,1)
      //can't get the camera figured out to view the top and bottom correctly
    } else{
      cam1.setPosition(this.normal.x*camDist, 0, this.normal.z*camDist);
      cam1.lookAt(0,0,0);
    }*/
  }
  
}


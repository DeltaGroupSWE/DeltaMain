let buttonSound;
let cam1;
//let camDist;
let cubeSides = [];
let cubeRotX;
let cubeRotY;
let cubeScale;
let cubeCV;

let colorCodes = [];
let faceColors = [];


function preload() {
  buttonSound = loadSound("../sounds/button-beep.wav");
}

function setup() {
  // using windowHeight/windowWidth instead of winHeight/winWidth seems to fix resizing problem
  mCreateCanvas(windowWidth*0.8, windowHeight * 0.9, WEBGL); 
  normalMaterial();
  //cam1 = createCamera();
  cubeScale = 2;
  SIDE_LENGTH = height < width ? height/cubeScale : width/cubeScale;
  //camDist = 1000;
  //cam1.camera(camDist,-camDist,camDist);
  //start cube at nice perspective
  cubeRotX = -QUARTER_PI;
  cubeRotY = -QUARTER_PI;
/*
//debug thing
  debug = createGraphics(300,300);
*/
  const l = SIDE_LENGTH/2;
  /*
  const p1 = createVector(l,l,l);   
  const p2 = createVector(l,-l,l); 
  const p3 = createVector(-l,-l,l);
  const p4 = createVector(-l,l,l);  
  const p5 = createVector(l,l,-l);
  const p6 = createVector(l,-l,-l);
  const p7 = createVector(-l,-l,-l);
  const p8 = createVector(-l,l,-l);  
  */
  colorCodes = [color(255, 45, 0),color(246, 255, 0),color(0, 255, 239),color(255, 0, 208),color(0, 255, 38),color(0, 19, 255)];
  faceColors = ['Red','Yellow','Turquoise','Pink','Green','Blue'];
  let id = 101;

  cubeSides.push(new cubeFace( 0, 0, l, 0, 0,      colorCodes[0],faceColors[0],  id));    //front
  cubeSides.push(new cubeFace( 0, 0,-l, 0, 0,      colorCodes[1],faceColors[1],++id));  //back
  cubeSides.push(new cubeFace(-l, 0, 0, 0, HALF_PI,colorCodes[2],faceColors[2],++id));  //left
  cubeSides.push(new cubeFace( l, 0, 0, 0, HALF_PI,colorCodes[3],faceColors[3],++id));  //right
  cubeSides.push(new cubeFace( 0,-l, 0, HALF_PI, 0,colorCodes[4],faceColors[4],++id));  //top
  cubeSides.push(new cubeFace( 0, l, 0, HALF_PI, 0,colorCodes[5],faceColors[5],++id));  //bottom
  
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

  // Puzzle 2 Button
  WordPuzzleButton = createButton("Puzzle 2");
  WordPuzzleButton.style("background-color: red");
  WordPuzzleButton.style("display: inline-block");
  WordPuzzleButton.style("font-family: Verdana");
  WordPuzzleButton.style(`margin: 0px ${winWidth * 0.02}px`);
  WordPuzzleButton.style(`border: 1px solid #000000`);

  WordPuzzleButton.mousePressed(Puzzle2);
}


function draw() {
  mBackground(0);
  //orbitControl();
  mCamera(0,0,800);
  //debugMode();
  /*
  ///////////////////////////////////////////////////////////
  //Debug stuff
  
  push();
  debug.background(255);
  debug.text('X rot:' + cubeRotX + '\nY rot:' + cubeRotY, 50, 50);
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
  
  
  mResetMatrix();
  mRotateX(cubeRotX);
  mRotateY(cubeRotY);
  let newSideLen = (height < width ? height/cubeScale : width/cubeScale)/2;
  mScale(newSideLen/SIDE_LENGTH);
  for(let x = 0; x < cubeSides.length; x+=1)
  {
    mPush();
    cubeSides[x].drawFace();
    mPop();
  }

  
}

/*
function windowResized(){
  resizeCanvas(windowWidth*0.8, windowHeight * 0.9);
}
*/
function quitGame() {
  window.location.href = "../Home/index.html";
}

function Puzzle1() {
  window.location.href = "../NumberPuzzle/index.html";
}

function Puzzle2() {
  window.location.href = "../wordPuzzle/index.html";
}


//work in progress - attempting to determing which face of cube is closest to camera
//then create click even to go to the appropriate page
/*
function doubleClicked(){
  loadPixels();
  let index = 4 * ((height/2 + mouseY) * width + mouseX + width/2);
  let r = pixels[index];
  let g = pixels[index+1];
  let b = pixels[index+2];
  //let a = pixels[index+3];
  pointerColor = color(r,g,b);
  console.log(r);
  let target = -1;
  for(let x =0; x < colorCodes.length; x +=1){
    if(pointerColor === colorCodes[x])
      target = x;
  }
  if(target !== -1) 
    window.location.href = "../face"+faceColors[x]+"/index.html";
 }
*/
function mousePressed(){
  id = objectAtMouse();
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
    mPlane(this.id,SIDE_LENGTH,SIDE_LENGTH);
  }
  
  goToFace = () => {
    //buttonSound.play();
    const xAxis = createVector(1,0,0);
    const yAxis = createVector(0,1,0);

    let NewRotY = -xAxis.angleBetween(p5.Vector.sub(this.p1, this.p4));
    let NewRotX = -yAxis.angleBetween(p5.Vector.sub(this.p1, this.p2));
    
    //hack im not proud of
    if(this.name === 'Pink') NewRotY = PI/2;
    if(this.name === 'Blue') NewRotX = PI/2;
    
    /*
    //trying to make a transition animation
    let stepX = (NewRotX-cubeRotX)/60;
    let stepY = (NewRotY-cubeRotY)/60;
    while(cubeRotY !== NewRotY || cubeRotX !== NewRotX){
      cubeRotX += stepX;
      cubeRotY += stepY;
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


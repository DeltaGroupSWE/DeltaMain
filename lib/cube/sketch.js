let buttonSound;
let cam1;
let camDist;
//let p1, p2, p3, p4, p5, p6, p7, p8;
let cubeSides = [];

function preload() {
  buttonSound = loadSound("../sounds/button-beep.wav");
  SIDE_LENGTH = 100;
}

function setup() {
  createCanvas(winWidth, winHeight * 0.9, WEBGL);
  normalMaterial();
  cam1 = createCamera();
  camDist = 1000;
  cam1.camera(camDist,-camDist,camDist);

  const l = SIDE_LENGTH/2;
  const p1 = createVector(l,l,l);   
  const p2 = createVector(l,-l,l); 
  const p3 = createVector(-l,-l,l);
  const p4 = createVector(-l,l,l);  
  const p5 = createVector(l,l,-l);
  const p6 = createVector(l,-l,-l);
  const p7 = createVector(-l,-l,-l);
  const p8 = createVector(-l,l,-l);  
  
  const front = color(255, 45, 0); //red
  const back = color(246, 255, 0); //yellow
  const right = color(0, 255, 239); //turqoise
  const left = color(255, 0, 208); //pink 
  const top = color(0, 255, 38);  //green
  const bottom = color(0, 19, 255); //blue

  cubeSides.push(new cubeFace(0,0, 1,p1,p2,p3,p4,front));
  cubeSides.push(new cubeFace(0,0,-1,p8,p7,p6,p5,back));
  cubeSides.push(new cubeFace( 1,0,0,p5,p6,p2,p1,right));
  cubeSides.push(new cubeFace(-1,0,0,p4,p3,p7,p8,left));
  cubeSides.push(new cubeFace(0,-1,0,p2,p6,p7,p3,top));
  cubeSides.push(new cubeFace(0, 1,0,p5,p1,p4,p8,bottom));

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
  orbitControl();

  for(let x = 0; x < cubeSides.length; x+=1)
  {
    push();
    let object = cubeSides[x];
    object.drawFace();
    pop();
  }

}



function quitGame() {
  window.location.href = "../Home/index.html";
}

function Puzzle1() {
  window.location.href = "../NumberPuzzle/index.html";
}


class cubeFace{
  constructor(n1,n2,n3,p1,p2,p3,p4,col){
    this.normal = createVector(n1,n2,n3);
    this.p1 = p1.copy();
    this.p2 = p2.copy();
    this.p3 = p3.copy();
    this.p4 = p4.copy();
    this.d = this.normal.dot(this.normal);
    this.col = col;
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
    console.log(this.normal.y);
    //cam1.camera(this.normal.x*camDist, this.normal.y*camDist, this.normal.z*camDist);
    if(this.normal.y != 0){
      //cam1.setPosition(0,this.normal.y*camDist,0, 0,0,0, 0,0,1)
      //can't get the camera figured out to view the top and bottom correctly
    } else{
      cam1.setPosition(this.normal.x*camDist, 0, this.normal.z*camDist);
      cam1.lookAt(0,0,0);
    }
  }
}


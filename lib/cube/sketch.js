function preload(){
  BOX_WIDTH = 100;
  BOX_HEIGHT = 100;
  BOX_DEPTH = 100;
}

function setup() {
  createCanvas(300, 300, WEBGL);
  normalMaterial();
 
  buttonFront = createButton("Front") ;
  buttonFront.class('button');
  buttonFront.mousePressed(viewFront);

  describe(
    'show front face'
  );
}


function drawDifFaces(width, height, depth, front, top, right, bottom, left, back){
  
  angleMode(DEGREES);
  let w = width;
  let h = height;
  let d = depth;
  
  translate(-w / 2, -h / 2, d/2);

  
  fill(front);
  quad(0, 0, w, 0, w, h, 0, h);

  push();
  fill(left);
  translate(0, 0, -d);
  rotateY(-90);
  quad(0, 0, d, 0, d, h, 0, h);

  pop();
  push();
  fill(top);
  translate(0, 0, -d);
  rotateX(90);
  quad(0, 0, w, 0, w, d, 0, d);

  pop();
  push();
  fill(right);
  translate(w, 0, 0);
  rotateY(90);
  quad(0, 0, d, 0, d, h, 0, h);

  pop();
  push();
  fill(bottom);
  translate(0, h, 0);
  rotateX(-90);
  quad(0, 0, w, 0, w, d, 0, d);

  pop();
  push();
  fill(back);
  rotateY(180);
  translate(-w, 0, d);
  quad(0, 0, w, 0, w, h, 0, h);
}

function draw() {
  background(200);

  orbitControl();

  rotateY(0.5);
  rotateX(0.5);

   drawDifFaces(BOX_WIDTH, BOX_HEIGHT, BOX_DEPTH,
      color(255,45, 0), color(0,255,38), color(0,255,239), color(0,19,255), color(255,0,208), color(246,255,0));
}

function viewFront(){
    camera(0,0,260);
}

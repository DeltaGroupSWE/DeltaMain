let puzzle;
let renderer;
let sideLength;
let z;


function setup() {
    let side = windowHeight*.9;
    createCanvas(side,side, WEBGL);
    z = (height/2) / tan(PI/6);
    createCamera(0,0, z);
    sideLength = side/2;
    renderer = createGraphics(sideLength,sideLength);
    puzzle = new flipSwitchGame(renderer, 0);
    puzzle.setupGame();
}

function draw() {

    background(220);

    //let screenPlane = z*9/10;
    //let cubeProjSize = (z*sideLength)/(10*(z-sideLength/2)); // same equation for figuring out mouse inputs to a game rendered on a cube face?

    push();
    renderer.clear();
    renderer.background(150);
    renderer.circle(scaleMouseX(),scaleMouseY(),10);
    puzzle.drawGame();
    noStroke();
    texture(renderer);
    plane(sideLength, sideLength);
    pop();
}

function mouseClicked() {
    puzzle.handleMousePressed(scaleMouseX(), scaleMouseY());
    //console.log(mouseX);
    //console.log(mouseY);
}

function mouseDragged() {
    puzzle.handleMouseDragged(scaleMouseX(), scaleMouseY());
}

function mouseReleased() {
    puzzle.handleMouseReleased(scaleMouseX(), scaleMouseY());
}

function keyPressed(){
    puzzle.handleKeyPressed(keyCode);
}

function scaleMouseX(){
    let cubeProjSize = (z*sideLength)/(10*(z));
    //console.log(sideLength/2);
    mx  = (mouseX - width/2) + sideLength/2;
    //console.log(mx);
    return mx;
}

function scaleMouseY(){
    let cubeProjSize = (z*sideLength)/(10*(z));
    my =  (mouseY - height/2) + sideLength/2;
    //console.log(cubeProjSize/2);
    //console.log(my);
    return my;
}
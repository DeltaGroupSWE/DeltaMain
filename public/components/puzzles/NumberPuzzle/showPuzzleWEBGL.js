let puzzle;
let renderer;
let sideLength;
let z;

function setup() {
    let side = windowHeight*.9;
    createCanvas(1000,1000, WEBGL);
    z = (height/2) / tan(PI/6);
    createCamera(0,0, z);
    sideLength = 1000;
    renderer = createGraphics(sideLength,sideLength);
    
    puzzle = new NumberPuzzle(renderer, 0);
    puzzle.setupGame();
}

function draw() {

    background(220);

    let screenPlane = z*9/10;
    let cubeProjSize = (z*sideLength)/(10*(z-sideLength/2)); // same equation for figuring out mouse inputs to a game rendered on a cube face?
    
    push();
    translate(0,0,screenPlane);
    noFill();
    stroke('white');
    strokeWeight(.2);
    plane(cubeProjSize);
    pop();


    push();
    puzzle.renderer.clear();
    
    puzzle.renderer.background(150);
    
    puzzle.drawGame();
    
    noStroke();
    texture(renderer);
    plane(sideLength);
    pop();
    
}

function mouseClicked() {
    puzzle.handleMousePressed(scaleMouseX(), scaleMouseY());
}

function mouseDragged() {
    puzzle.handleMouseDragged(scaleMouseX(), scaleMouseY());
}

function mouseReleased() {
    puzzle.handleMouseReleased(scaleMouseX(), scaleMouseY());
}

function scaleMouseX(){
    let cubeProjSize = (z*sideLength)/(10*(z-sideLength/2));
    mx  = mouseX;
    //console.log(mx);
    return mx;
}

function scaleMouseY(){
    let cubeProjSize = (z*sideLength)/(10*(z-sideLength/2));
    my = mouseY;
    //console.log(my);
    return my;

}
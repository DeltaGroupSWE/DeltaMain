let game;
let renderer;
let sideLength;
let z;

function preload(){
    sprite_blueOn = loadImage('../../assets/sprites/simon/Blue_Button_On.png');
    sprite_blueOff = loadImage('../../assets/sprites/simon/Blue_Button.png');
    sprite_greenOn = loadImage('../../assets/sprites/simon/Green_Button_On.png');
    sprite_greenOff = loadImage('../../assets/sprites/simon/Green_Button.png');
    sprite_redOn = loadImage('../../assets/sprites/simon/Red_Button_On.png');
    sprite_redOff = loadImage('../../assets/sprites/simon/Red_Button.png');
    sprite_yellowOn = loadImage('../../assets/sprites/simon/Yellow_Button_On.png');
    sprite_yellowOff = loadImage('../../assets/sprites/simon/Yellow_Button.png');
    sprite_startButton = loadImage('../../assets/sprites/simon/Start_Button.png');
}

function setup() {
    let side = windowHeight*.9;
    createCanvas(side,side, WEBGL);
    z = (height/2) / tan(PI/6);
    createCamera(0,0, z);
    sideLength = side/2;
    renderer = createGraphics(sideLength,sideLength);
    game = new SimonPuzzle(renderer, 0);
    game.setupGame();
}

function draw() {

    background(220);

    //let screenPlane = z*9/10;
    //let cubeProjSize = (z*sideLength)/(10*(z-sideLength/2)); // same equation for figuring out mouse inputs to a game rendered on a cube face?

    push();
    renderer.clear();
    renderer.background(150);
    renderer.circle(scaleMouseX(),scaleMouseY(),10);
    game.drawGame();
    noStroke();
    texture(renderer);
    plane(sideLength, sideLength);
    pop();
}

function mouseClicked() {
    game.handleMousePressed(scaleMouseX(), scaleMouseY());
    //console.log(mouseX);
    //console.log(mouseY);
}

function mousePressed(){
    game.handleMousePressed(scaleMouseX(),scaleMouseY());
}

function mouseReleased() {
    game.handleMouseReleased(scaleMouseX(), scaleMouseY());
}

function mouseDragged() {
    game.handleMouseDragged(scaleMouseX(), scaleMouseY());
}

function keyPressed(){
    game.handleKeyPressed(keyCode);
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
let puzzle;
let renderer;


function setup() {
    renderer = createCanvas(1000, 1000);
    puzzle = new SliderPuzzle(renderer, 0);
    puzzle.setupGame();
    rectMode(CENTER);
}

function draw() {
    background('pink');
    puzzle.drawGame();
}

function mousePressed() {
    puzzle.handleMousePressed(mouseX, mouseY);
}

function mouseDragged() {
    puzzle.handleMouseDragged(mouseX, mouseY);
}

function mouseReleased() {
    puzzle.handleMouseReleased(mouseX, mouseY);
}

function keyPressed() {
    puzzle.handleKeyPressed(key);
}
let puzzle;
let renderer;
let timer;


function setup() {
    renderer = createCanvas(1000, 1000);
    puzzle = new SliderPuzzle(renderer, 0);
    puzzle.setupGame();
    rectMode(CENTER);

    // intitalizing timer
    timer = new Timer();
    timer.setupTimer();
    timer.startTimer();

}

function draw() {
    background('pink');
    puzzle.drawGame();

    // updating timer
    timer.updateTimer();

    // calculate x and y position relative to canvas size
    const timerTextX = width - width * 0.1;
    const timerTextY = height * 0.1;
    
    // displaying timer on canvas
    push(); // saves current drawing style
    textSize(50);
    fill(255);
    stroke(0);
    strokeWeight(3);
    text(timer.formatTime(timer.elapsedTime), width - 150, height - 800);
    pop(); // restores original state of drawing style
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
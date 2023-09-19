let canvasWidth = 300, canvasHeight = 300;

function preload(){

}

function setup(){
createCanvas(canvasWidth,canvasHeight);

/*styling  quit button*/
quitButton = createButton("Quit to Menu");
quitButton.position(canvasWidth/4, canvasHeight / 1.5);
quitButton.style('background-color: #1A71E6');
quitButton.style('padding: 15px 32px');
quitButton.style('display: inline-block');
quitButton.style('font-family: Verdana');
quitButton.style('margin: 4px 2px');
quitButton.style('border-radius: 12px');
quitButton.style('border: 2 px solid #000000'); 
// end styling quit button

quitButton.mousePressed(returnToMenu);

}

function drawLeaderBoard(){
    textSize(40);
    fill(102, 0, 0);
    text("Leaderboard",canvasWidth/8,canvasHeight / 4);
    textSize(20);
    text("Rank",canvasWidth/10,canvasHeight/3);
    text("Name",canvasWidth/10 + 75,canvasHeight/3);
    text("Time",canvasWidth/10 + 200,canvasHeight/3);
    
}

function draw(){
background(200);
drawLeaderBoard();
}

function returnToMenu(){
    window.location.href = '../Home/index.html';
}
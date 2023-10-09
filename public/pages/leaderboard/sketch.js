function preload(){}

function setup(){
    
createCanvas(winWidth,winHeight *.9);

 /*styling button*/
 quitButton = createButton("Return to Menu");

 // CSS styles relative to canvas size
 const buttonWidth = winWidth * 0.4; // Adjust the button width
 const buttonHeight = winHeight * 0.1; // Adjust the button height
 const buttonFontSize = winWidth * 0.03; // Adjust the font size

 quitButton.style("background-color: #1A71E6");
 quitButton.style(`padding: ${winHeight * 0.04}px ${winWidth * 0.1}px`);
 quitButton.style("display: inline-block");
 quitButton.style("font-family: Verdana");
 quitButton.style(`margin: ${winHeight * 0.02}px ${winWidth * 0.02}px`);
 quitButton.style(`border-radius: ${winWidth * 0.04}px`);
 quitButton.style(`border: ${winWidth * 0.001}px solid #000000`);
 quitButton.style(`font-size: ${buttonFontSize}px`);

 // Center the button within the canvas
 quitButton.position(
   winWidth / 2 - buttonWidth / 2,
   3 * (winHeight / 4) - buttonHeight / 2
 );

 /*mousePressed Event*/
 quitButton.mousePressed(returnToMenu);

}
function drawLeaderBoard(){

  const topTextSize = winWidth * 0.13;
  const topTextX = winWidth / 2;
  const topTextY = winHeight * (2 / 14);

  const midTextSize = winWidth * 0.025;
  const midTextXRank = winWidth / 8;
  const midTextXName = winWidth / 3;
  const midTextXTime = winWidth / 1.25;
  const midTextY = winHeight * (5 / 14);

  textAlign(CENTER,CENTER);
  textSize(topTextSize);
  fill(102, 0, 0);
  text("Leaderboard",topTextX,topTextY);
  
  textSize(midTextSize);
  text("Rank",midTextXRank,midTextY);
  text("Name",midTextXName,midTextY);
  text("Time",midTextXTime,midTextY);
    
}

function draw(){
background(200);
drawLeaderBoard();
}

function returnToMenu(){
    window.location.href = '../home/index.html';
}
let numOfIcons=0;
const links = ['../faceRed/index.html', 
             '../faceYellow/index.html',
             '../faceTurquoise/index.html',
             '../facePink/index.html',
             '../faceGreen/index.html',
             '../faceBlue/index.html',];
//          'Red','Yellow','Turquoise','Pink','Green','Blue'
const colors = [[255, 45, 0],[246, 255, 0],[0, 255, 239],[255, 0, 208],[0, 255, 38],[0, 19, 255]];

function setup(){
    createCanvas(winWidth, winHeight * 0.9);
    background(153);
}




function drawIcon(x, y, link,num){
    let r = colors[num][0];
    let g = colors[num][1];
    let b = colors[num][2];
    fill(r, g, b);
    
    //x value, y value, width, height, roundness property
    rect(x, y ,200,200, 20);

    //adds a link over the icons
    let anchor = createA(link, " ");
    anchor.position(x, y);
    anchor.size(200,200);
}

function drawGallery(){
    const rowOneWidth = winWidth * .22;

    for(let r = 0; r < 2; ++r){
        
        for(let c = 0; c < 3; ++c){
            
            if (r == 0) { drawIcon(rowOneWidth*(c+1), winHeight * .27,links[numOfIcons],numOfIcons); }
             else{drawIcon(rowOneWidth*(c+1), winHeight * .56,links[numOfIcons], numOfIcons);  }
             ++numOfIcons;
        }
    }
}


function drawTitle(){
    
  const topTextSize = winWidth * 0.11;
  const topTextX = winWidth / 2;
  const topTextY = winHeight * (2 / 14);


  textAlign(CENTER,CENTER);
  textSize(topTextSize);
  fill(102, 0, 0);
  text("Gallery", topTextX, topTextY);
  
}

function returnHome(){
    window.location.href = '../Home/index.html';
}

function createReturnHomeButton(){
    button = createButton('Return Home');
    button.position(0, winHeight*.87);
    button.mousePressed(returnHome);
}

function draw(){
    drawGallery();
    drawTitle();  
    createReturnHomeButton();
  
    noLoop();
}
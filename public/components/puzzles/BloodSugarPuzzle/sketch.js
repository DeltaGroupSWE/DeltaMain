let gamestate = false;
//-----------------------------------------------------------------------------------------------------
class NumberIcon{
    constructor(x,y,num){
        this.x = x;
        this.y = y;
        this.radius = 100;
        this.iconValue=num;
        this.originX = x;
        this.originY = y;
        this.isDragging = false;
    }

    drawNumIcon() {
        
        fill(1,200,100);
        strokeWeight(5);
        circle(this.x,this.y, this.radius);
        
        //placed the icon value in the center of the icon
        fill(255); 
        textSize(24); 
        textAlign(CENTER, CENTER);
        text(this.iconValue, this.x, this.y);
    };

    iconPressed(){
        if (this.isInIcon() && !this.isDragging) {
        this.isDragging = true;
        }
    }
    iconDragged(){
        if (this.isDragging) {
            this.x = mouseX;
            this.y = mouseY;
        }
    }

    iconReleased(){
        this.isDragging = false;
    }
    
    isInIcon(){
        return dist(mouseX, mouseY, this.x,this.y) < this.radius / 2;
    };


    
}


class Equation{
    constructor(answer, total = 0, x = 0, y =0, z=0){
        this.currentTotal = total;
        this.x = x;
        this.y = y;
        this.z = z;
    }
    setX(num){
        this.x = num;
        this.setTotal();
    }
    setY(num){
        this.y = num;
        this.setTotal();
    }
    setZ(num){
        this.z = num;
        this.setTotal();
    }
    setTotal(){
        this.currentTotal = this.x + this.y + this.z;
        console.log("the total is " + this.currentTotal); 
    }

    
}
class Container{
    constructor(ID, height, width, x, y){
        this.ContainerID = ID;
        this.height = height;
        this.width = width;
        this.xPos = x;
        this.yPos = y;
        this.containerValue = ' ';


    }
    drawContainer(){
            fill(1,200,100);
            strokeWeight(5);
            circle(this.xPos,this.yPos, this.height);
            fill(255); 
            textSize(24);
            textAlign(CENTER, CENTER);
            let txt = this.containerValue;
            text(txt, this.xPos, this.yPos);
        
    }
}

//-----------------------------------------------------------------------------------------------------

class Puzzle {
    constructor(renderer, difficulty = 0) {
        this.renderer = renderer; // this is a p5.graphics object
        gamestate = false;
        
        this.difficulty = difficulty;
        console.log('Constructing the puzzle');
        this.icons = []; //places NumberIcon objects into a array
        this.iconValuealueArray=[12,14,16,10]; //the values for each NumberIcon Object
        this.containers = []; 
        this.solution1 = 36; 
        this.equationObj = new Equation(this.solution1); //creates an equation obj where the bloodsugar goal is the solution1 value
    }

    setupGame(){
        createCanvas(winWidth, winHeight * 0.9);
        this.createSidePanel();
        this.createContainers();
    }
    
    drawGame() {
        console.log('Displaying the puzzle')
        background("blue");
        if (gamestate){
            background("blue");
            textSize(64);
            textAlign(CENTER, CENTER);
            text("Congratulations! You Win!", winWidth * .5, winHeight * .45);
        }
        else{
            this.drawQuestion();
            this.drawEquation();
            this.drawContainers();
            this.drawSidePanel();
        }
        

    }
    setVariable(ID, num){
        if(ID == 1)
            this.equationObj.setX(num);
        else if(ID == 2)
            this.equationObj.setY(num);
        else if(ID == 3)
            this.equationObj.setZ(num);

        this.isSolved();
        
    }



  createSidePanel(){
    for(let i = 1; i < 5;++i){
        let numObj = new NumberIcon(winWidth * .08, winHeight * (.17*i), this.iconValuealueArray[i-1]);
        this.icons.push(numObj);
    }
  }

  
  drawSidePanel(){
    for (let icon of this.icons) 
        icon.drawNumIcon();
}

    drawQuestion(){
        textSize(48);
            let question= "Get a blood sugar level of " + this.solution1;
            text(question, winHeight*1, winWidth*.06);
    }
    drawEquation(){
        textSize(58);
        text("+", winWidth*.40, winHeight * .41);
        text("+", winWidth*.595, winHeight * .41);
        text("=  ? ", winWidth*.8, winHeight * .41);
    }

    createContainers(){
        let initalPos = winWidth * .3;;
        
        for(let i = 0; i< 3; ++i){
            let containerObj = new Container(i+1, winHeight*0.20, 200,initalPos+(i*300), 300);
            this.containers.push(containerObj);
        }
    }
    drawContainers(){
        for (let container of this.containers) 
            container.drawContainer();
    }


    iconContainerCollision(num, container){
        const distance = dist(num.x, num.y, container.xPos, container.yPos);
        return distance < (num.radius / 2);
    }

    isSolved() {
        console.log('Checking if the puzzle is solved');
        if(this.equationObj.currentTotal == this.solution1)
        gamestate = true;

        console.log(gamestate);
    }

    handleMouseClick(mx, my) {
        console.log('Handling puzzle\'s mouse event')
    }

    handleMousePressed(mx, my){
        for(let icon of this.icons){
            icon.iconPressed();
        }
    }
    handleMouseDragged(mx, my){
        for (let icon of this.icons) {
            icon.iconDragged();
        }
    }
    handleMouseReleased(mx, my){
        for (let num of this.icons) {
            let flag = false; //this flag is needed so each icon after the first works properly
            for (let container of this.containers) {
                
                if (this.iconContainerCollision(num, container)) {
                    num.x = container.xPos;
                    num.y = container.yPos;
                    container.containerValue = num.iconValue;
                    flag = true;

                    this.setVariable(container.ContainerID, num.iconValue);
                    break;
                }
            }
            if (!flag){ //if the icon does not land within a container, theyre moved to their inital position
                num.x = num.originX;
                num.y = num.originY;
            }

            num.isDragging = false;

        }    
    }

    handleKeyPressed(key){}
    handleKeyReleased(key){}
    
}






let puzzle;
 function setup(){

    puzzle = new Puzzle();
    puzzle.setupGame();

   
 }

 function draw(){
    puzzle.drawGame();
 }

  function mousePressed() {
    puzzle.handleMousePressed();
}

function mouseDragged() {
    puzzle.handleMouseDragged();
}

function mouseReleased() {
   puzzle.handleMouseReleased();
}

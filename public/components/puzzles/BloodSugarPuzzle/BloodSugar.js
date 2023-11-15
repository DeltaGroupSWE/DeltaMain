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
        this.numID = null;
    }

    

    drawNumIcon(rndr) {
        
        rndr.fill(1,200,100);
        rndr.strokeWeight(5);
        rndr.circle(this.x,this.y, this.radius);
        
        //placed the icon value in the center of the icon
        rndr.fill(255); 
        rndr.textSize(rndr.height * .035); 
        rndr.textAlign(CENTER, CENTER);
        rndr.text(this.iconValue, this.x, this.y);
    };

    iconPressed(){
        if (this.isInIcon(mx,my) && !this.isDragging) {
        this.isDragging = true;
        }
    }
    iconDragged(mx,my){
        if (this.isDragging) {
            this.x = mx;
            this.y = my;
        }
    }

    iconReleased(){
        this.isDragging = false;
    }
    
    isInIcon(mx,my){
        return dist(mx, my, this.x,this.y) < this.radius / 2;
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
        this.containsIcon = false;

    }
    drawContainer(rndr){
            rndr.fill(1,200,100);
            rndr.strokeWeight(5);
            rndr.circle(this.xPos,this.yPos, this.height);
            rndr.fill(255); 
            rndr.textSize(rndr.height * .035);
            rndr.textAlign(CENTER, CENTER);
            let txt = this.containerValue;
            rndr.text(txt, this.xPos, this.yPos);
        
    }
}

//-----------------------------------------------------------------------------------------------------

class BloodSugarGame extends Puzzle {
    constructor(renderer, difficulty = 0) {
        super(renderer, difficulty);
        this.gamestate = false;
        this.w = this.renderer.width;
        this.h = this.renderer.height;
        
        this.icons = []; //places NumberIcon objects into a array
        this.iconValuealueArray=[12,14,16,10]; //the values for each NumberIcon Object
        this.containers = []; 
        this.solution1 = 36; 
        this.equationObj = new Equation(this.solution1); //creates an equation obj where the bloodsugar goal is the solution1 value
    }

    setupGame(){
        //createCanvas(winWidth, winHeight * 0.9);
        this.createSidePanel();
        this.createContainers();

       
    }
    
    drawGame() {
        //console.log('Displaying the puzzle')
        if (this.gamestate){
            this.renderer.textSize(this.w*0.08);
            this.renderer.textAlign(CENTER, CENTER);
            this.renderer.text("Congratulations! You Win!", this.w * .5, this.w * .45);
        }
        else{
            this.drawQuestion();
            this.drawEquation();
            this.drawContainers();
            this.drawSidePanel();
        }
    }

    isSolved() {
        //console.log('Checking if the puzzle is solved');
        if(this.equationObj.currentTotal == this.solution1)
        this.gamestate = true;
        return this.gamestate;
        //console.log(gamestate);
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
            
            let numObj = new NumberIcon(this.w * .09, this.h * (.17*i), this.iconValuealueArray[i-1]);
            this.icons.push(numObj);
        }
    }

  
    drawSidePanel(){
        for (let icon of this.icons) 
            icon.drawNumIcon(this.renderer);
    }

    drawQuestion(){
        this.renderer.textSize(this.h * .045);
        let question= "Get a blood sugar level of " + this.solution1;
        this.renderer.text(question, this.h*.5, this.w*.06);
    }

    
    
    drawEquation(){
        this.renderer.textSize(this.h * .058);
        this.renderer.text("+", this.w*.415, this.h * .45);
        this.renderer.text("+", this.w*.645, this.h * .45);
        this.renderer.text("=  ? ", this.w*.855, this.h * .45);
    }

    createContainers(){
        let initalPos = this.w * .3;;
        
        for(let i = 0; i< 3; ++i){
            //constructor(ID, height, width, x, y)
            let containerObj = new Container(i+1, this.h*0.15, 350,initalPos+(i*150), 300);
            this.containers.push(containerObj);
        }
    }
    drawContainers(){
        for (let container of this.containers) 
            container.drawContainer(this.renderer);
    }


    iconContainerCollision(num, container){
        const distance = dist(num.x, num.y, container.xPos, container.yPos);
        return distance < (num.radius / 2);
    }
    removeIcon(icon){ // after failing for a few hoursto fix the icon-icon collision glitch, it somehow works better to just remove the icons
        let usedIcon = this.icons.indexOf(icon);
        if (usedIcon != -1)
            this.icons.splice(usedIcon,1);
    }


    restartGame() {
        //reset containers
        for (let container of this.containers) {
            container.containerValue = ' ';
            container.containsIcon = false;
        }
        //reset icons
        this.icons = [];
        this.createSidePanel();

    }
    handleMouseClick(mx, my) {
        console.log('Handling puzzle\'s mouse event')
    }

    handleMousePressed(mx, my){
        for(let icon of this.icons){
            icon.iconPressed(mx,my);
        }
    }
    handleMouseDragged(mx, my){
        for (let icon of this.icons) {
            icon.iconDragged(mx,my);
        }
    }
    handleMouseReleased(mx, my){
        for (let num of this.icons) {
            let flag = false; //this flag is needed so each icon after the first works properly
            for (let container of this.containers) {
                if (this.iconContainerCollision(num, container)) {
                     if (!container.containsIcon || (container.containsIcon && container.containerValue === num.iconValue)){
                        num.x = container.xPos;
                        num.y = container.yPos;
                        container.containerValue = num.iconValue;
                        flag = true;
                        this.setVariable(container.ContainerID, num.iconValue);
                        num.numID = container.ContainerID;
                        container.containsIcon = true;
                        this.removeIcon(num);
                        break;
                    } 
                }
            }

            if (this.icons.length == 1 && !this.gamestate)//simple restart if all containers are filled and the game isnt over
                this.restartGame();

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




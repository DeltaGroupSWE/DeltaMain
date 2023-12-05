let gamestate = false;
//-----------------------------------------------------------------------------------------------------
class NumberIcon{
    constructor(x,y,num, rad){
        this.x = x;
        this.y = y;
        this.radius = 100;
        this.radius = rad;
        this.iconValue=num;
        this.originX = x;
        this.originY = y;
        this.isDragging = false;
        this.numID = null;
    }

    

    drawNumIcon(rndr) {
        
        rndr.fill(1,200,100);
        rndr.strokeWeight(3);
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
    setX(num, level){
        this.x = num;
        this.setTotal(level);
    }
    setY(num, level){
        this.y = num;
        this.setTotal(level);
    }
    setZ(num, level){
        this.z = num;
        this.setTotal(level);
    }
    setTotal(level){
        //console.log("level:  " + this.currentLevel)
        switch(level){
            case 1:
                this.currentTotal = this.x + this.y + this.z;
                break;
            case 2:
                this.currentTotal = this.x * this.y + this.z;
                break;
            case 3:
                this.currentTotal = this.x * this.y * this.z;
                break;
        }


        // if (this.currentLevel == 1) 
        //     this.currentTotal = this.x + this.y + this.z;
        // else if (this.currentLevel == 2)
        //     this.currentTotal = this.x * this.y + this.z;
        // else if (this.currentLevel == 3)
        //     this.currentTotal = this.x * this.y * this.z;

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
            rndr.strokeWeight(3);
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
        //this.iconValuealueArray=[12,14,16,10]; //the values for each NumberIcon Object
        this.IconArray = [[34,33,42,30,37], [21,25,24,23,27], [34,33,37,35,31], //++ 42 29 34 or 30 33 42 | (27 + 25 + 24)| (34 31 33)
                          [13,10,11,9,14],  [9,11,12,14,15],  [8,11, 9, 7, 6],//+* (10 * 11 + 14)  | (9 * 12 + 11) | ((9 * 7 + 8))
                          [6,9,5,4,7],      [3,9,5,4,6],      [7,2,5,4,8]]; //** (5 * 4 * 7) | ( 3 * 6 * 5) ( 2 * 8 * 7)
        this.currentLevel = 1;
        this.containers = []; 
        this.solution = [105,76,98,124,119, 71, 140, 90, 112]; 
        this.randStart = 0;
        this.randEnd = this.currentLevel * 3;

        this.randSet = Math.floor(Math.random() * 3) ;
        console.log("random " + this.randSet);
        this.equationObj = new Equation(this.solution[this.randSet]); 
        
    }

    setupGame(){
        //createCanvas(winWidth, winHeight * 0.9);
        this.createSidePanel(this.IconArray[this.randSet]);
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
        if(this.equationObj.currentTotal == this.solution[this.randSet] && this.currentLevel < 3){
            //console.log("solved" + this.currentLevel);
            this.levelUp();
            
        }
            
        else if (this.equationObj.currentTotal == this.solution[this.randSet] && this.currentLevel == 3)
            this.gamestate = true;
        return this.gamestate;
        //console.log(gamestate);
    }
    levelUp(){
        //var item = items[Math.floor(Math.random()*items.length)];
        //let it = Math.floor(Math.random() * this.IconArray.length) + (this.currentLevel * 3);
        //console.log("rand num " + it);
        //this.randSet = Math.floor(Math.random() * this.IconArray.length) + ((this.currentLevel-1) * 3);

        this.randStart = this.randEnd;
        this.randEnd = this.currentLevel * 3;
        ++this.currentLevel;

        if (this.currentLevel == 2)
            this.randSet = Math.floor(Math.random() * 3) + (3);
            if (this.currentLevel == 3)
            this.randSet = Math.floor(Math.random() * 3) + (6);
        console.log("randy" + this.randSet);

       
        //this.restartGame();
        //console.log(this.currentLevel);
        this.drawQuestion();
        this.drawEquation();
        
    }

    setVariable(ID, num, level){
        if(ID == 1)
            this.equationObj.setX(num, level);
        else if(ID == 2)
            this.equationObj.setY(num, level);
        else if(ID == 3)
            this.equationObj.setZ(num, level);

        this.isSolved();
        
    }


    createSidePanel(arr){
        for(let i = 1; i < arr.length+1;++i){
            
            let numObj = new NumberIcon(this.w * .12, this.h * (.17 *i), arr[i-1], this.w*.15);//9,17,15
            this.icons.push(numObj);
        }
    }

  
    drawSidePanel(){
        for (let icon of this.icons) 
            icon.drawNumIcon(this.renderer);
    }

    drawQuestion(){
        this.renderer.textSize(this.h * .055);//45
        let question= "Get a blood sugar level of " + this.solution[this.randSet];
        this.renderer.text(question, this.h*.5, this.w*.06);
    }

    
    
    drawEquation(){
        let symbol1, symbol2;
        switch(this.currentLevel){
            case 1:
                symbol1= "+",symbol2 = "+";
                break;
            case 2:
                symbol1 = "x",symbol2 = "+";
                break;
            case 3:
                symbol1 = "x",symbol2 = "x";
                break;
        }

        this.renderer.textSize(this.h * .058);
        this.renderer.text(symbol1, this.w*.415, this.h * .45);
        this.renderer.text(symbol2, this.w*.645, this.h * .45);
        this.renderer.text("=  ? ", this.w*.855, this.h * .45);
    }

    createContainers(){
        let initalPos = this.w * .3;;
        
        for(let i = 0; i< 3; ++i){
            //constructor(ID, height, width, x, y)
            let containerObj = new Container(i+1, this.h*0.15, 350,initalPos+(i*(this.w*.23)), (this.h*.45)); //1,.15,350,.23,.45
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
        // for (let container of this.containers) {
        //     container.containerValue = ' ';
        //     container.containsIcon = false;
        //     //console.log("value: " + container.containerValue + " has icon? " + container.containsIcon);
        // }
        this.containers = [];
        this.createContainers();
        //this.drawContainers();
        
   
        //reset icons
        this.icons = [];
        this.createSidePanel(this.IconArray[this.randSet]);
        this.equationObj.currentTotal = 0;
        console.log("the total is " + this.equationObj.currentTotal); 
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
                    //if the container isnt holding an iron OR if the container isnt holding an icon and
                     if (!container.containsIcon || (container.containsIcon && container.containerValue === num.iconValue)){
                        num.x = container.xPos;
                        num.y = container.yPos;
                        container.containerValue = num.iconValue;
                        flag = true;
                        this.setVariable(container.ContainerID, num.iconValue,this.currentLevel);
                        num.numID = container.ContainerID;
                        container.containsIcon = true;
                        this.removeIcon(num);
                        break;
                    } 
                }
            }

            
            if (!flag){ //if the icon does not land within a container, theyre moved to their inital position
                num.x = num.originX;
                num.y = num.originY;
            }
            if (this.icons.length == 2 && !this.gamestate)//simple restart if all containers are filled and the game isnt over
            this.restartGame();

            num.isDragging = false;
            
        }    
    }
    handleKeyPressed(key){}
    handleKeyReleased(key){}
}




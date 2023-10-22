// This is a base class for all puzzles
// All methods in this class MUST be implemented by all puzzles
// Each puzzle should exist as a class with at least the following methods
class NumberPuzzle extends Puzzle {
    // This is the constructor. Each puzzle should use a difficulty variable,
    // even if the puzzle does not change with different difficulties
    constructor(renderer, difficulty = 0) {
        //this.renderer = renderer; // this is a p5.graphics object
        //optional: could only use one of these as it will be a square graphics object
        //this.w = renderer.width;
        //this.h = renderer.height;
        
        //this.difficulty = difficulty;

        super(renderer,difficulty);
        this.boxWidth = renderer.width;

        this.inputValue = '';

        console.log('Constructing the puzzle');
        //...//game specific stuff
        //setting contents for the numPad
        this.numPadContents = {
            0: "0", //         ---  ---  ---
            1: "1", //        | 0 || 1 || 2 |
            2: "2", //         ---  ---  ---
            3: "3", //        | 3 || 4 || 5 |
            4: "4", //         ---  ---  ---
            5: "5", //        | 6 || 7 || 8 |
            6: "6", //         ---  ---  ---
            7: "7", //        | 9 ||
            8: "8", //         ---
            9: "9"
        };

        this.enterButton = "enter";
    }

    setupGame(){
        //probably whatever is in you setup function now
        //this will be called on each game from the main setup function
        //when adding something to the renderer do it like this
        //this.renderer.textSize(10);
        this.randomNum = Math.floor(Math.random() * 100) + 1;
        this.boxSize = this.boxWidth / 15; //size of each number box
        this.spacing = this.boxWidth / 100; // spacing between number boxes
        this.startX = this.boxWidth / 6; //starting x position
        this.startY = this.boxWidth / 5; //starting y position
    }
    
    // This is the draw function for the puzzle.
    // Everything that the puzzle needs to do to display on the screen should happen here.
    drawGame() {
        console.log('Displaying the puzzle')
        //just like you original setup()
        //this will be called on each game object in the main game's draw funtion
        //when adding something to the renderer do it like this
        //this.renderer.circle(0,0,10);
        //you can even call this.renderer.push() and this.renderer.pop();
        //pretyy much anything that can go in setup and draw that affects the canvas and be used this way

        let x = this.startX;
        
        let y = this.startY;
        
        for(const key in this.numPadContents){
            const content = this.numPadContents[key];
            this.renderer.fill(200);
            this.renderer.rect(x,y, this.boxSize, this.boxSize)
            this.renderer.fill(0);
            this.renderer.textSize(32);
            this.renderer.textAlign(CENTER, CENTER);
            this.renderer.text(content, x + this.boxSize / 2, y + this.boxSize / 2);
            x += this.boxSize + this.spacing;
            if(x >= this.startX + 3 * (this.boxSize + this.spacing)) {
                x = this.startX;
                y += this.boxSize + this.spacing;
            }
        }

        const content = this.enterButton;
        this.renderer.fill(200);
        this.renderer.rect(x,y, this.boxSize * 2 + this.spacing, this.boxSize)
        this.renderer.fill(0);
        this.renderer.textSize(32);
        this.renderer.textAlign(CENTER, CENTER);
        this.renderer.text(content, x + this.boxSize, y + this.boxSize / 2);

        this.renderer.push();
        this.renderer.fill(200);
        this.renderer.stroke(0);
        this.renderer.rect(this.startX, this.startY + 4 * (this.boxSize + this.spacing), this.boxSize * 3, this.boxSize);
        this.renderer.pop();

        this.renderer.textSize(24);
        this.renderer.textAlign(LEFT, TOP);
        this.renderer.fill(0);
        this.renderer.text(this.inputValue, this.startX + 5, this.startY + 4 * (this.boxSize + this.spacing) + 5);    
<<<<<<< HEA    
=======
>>>>>>> 4d21a155e51988da75991a584139eabf6d00b3c8
    }

    // This is an accessor to check if the puzzle is solved
    // Should return true if the puzzle is solved, or false if it isn't

    isSolved() {
        console.log('Checking if the puzzle is solved')
    }


    mouseOverWhichRectangle(mx, my) {
        let x = this.startX;
        let y = this.startY;

        for (const key in this.numPadContents) {
            // Check if the mouse coordinates (mx, my) are within the bounds of the current rectangle
            if (mx >= x && mx <= x + this.boxSize && my >= y && my <= y + this.boxSize) {
                return key; // Return the key (0 to 9) associated with the clicked/hovered rectangle.
            }
    
            // Move to the next rectangle's position
            x += this.boxSize + this.spacing;
    
            if (x >= this.startX + 3 * (this.boxSize + this.spacing)) {
                x = this.startX;
                y += this.boxSize + this.spacing;
            }
        }

        if (mx >= x && mx <= x + this.boxSize * 2 + this.spacing && my >= y && my <= y + this.boxSize) {
            return 'enter'; // Return 'enter' when the mouse is over the Enter button.
        }
    
        return -1; // Return -1 if no rectangle was clicked/hovered.
    }
    

    setMouseTarget(target) {
        this.mouseTarget = target;
    }

    handleMousePressed(mx, my){
        const key = this.mouseOverWhichRectangle(mx, my);
        if (key == 'enter') this.isSolved();
        if (key >= '0' && key <= '9') {
            this.inputValue += key; // Append the typed key to the input value
        }
        
    }


    //for all input functions need to change event functions ie "mousePresssed()" functions to 
    //handler functions that recieve input parameters from the main game
    //all events needed to be handled by the main game
    //you shouldn't use mouseX or mouseY because the mouse position needs to be scaled because of the 
    //3d perspective. That will be done by the main game
    
    // This is an event handler for mouse events
    // The main game should call this on a left click press without release and pass the mouse's x/y
    //If we need to add more of the events we can, these are just the ones I've seen used so far in the games
    
    /*
    handleMouseClick(mx, my) {
        console.log('Handling puzzle\'s mouse event')
    }

    handleMousePressed(mx, my){
        
    }
    handleMouseDragged(mx, my){}
    handleMouseReleased(mx, my){}

    handleKeyPressed(key){}
    handleKeyReleased(key){}
    */
}
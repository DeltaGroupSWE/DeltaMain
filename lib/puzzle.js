// This is a base class for all puzzles
// All methods in this class MUST be implemented by all puzzles
// Each puzzle should exist as a class with at least the following methods
class Puzzle {
    // This is the constructor. Each puzzle should use a difficulty variable,
    // even if the puzzle does not change with different difficulties
    constructor(renderer, difficulty = 0) {
        this.renderer = renderer; // this is a p5.graphics object
        //optional: could only use one of these as it will be a square graphics object
        //this.w = renderer.width;
        //this.h = renderer.height;
        
        this.difficulty = difficulty;
        console.log('Constructing the puzzle');
        //...//game specific stuff
    }

    setupGame(){
        //probably whatever is in you setup function now
        //this will be called on each game from the main setup function
        //when adding something to the renderer do it like this
        //this.renderer.textSize(10);
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
    }

    // This is an accessor to check if the puzzle is solved
    // Should return true if the puzzle is solved, or false if it isn't
    isSolved() {
        console.log('Checking if the puzzle is solved')
    }

    //for all input functions need to change event functions ie "mousePresssed()" functions to 
    //handler functions that recieve input parameters from the main game
    //all events needed to be handled by the main game
    //you shouldn't use mouseX or mouseY because the mouse position needs to be scaled because of the 
    //3d perspective. That will be done by the main game
    
    // This is an event handler for mouse events
    // The main game should call this on a click and pass the mouse's x/y
    //If we need to add more of the events we can, these are just the ones I've seen used so far in the games
    handleMouseClick(mx, my) {
        console.log('Handling puzzle\'s mouse event')
    }

    handleMousePressed(mx, my){}
    handleMouseDragged(mx, my){}
    handleMouseReleased(mx, my){}

    handleKeyPressed(key){}
    handleKeyReleased(key){}
    
}

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

        super(renderer, difficulty);
        this.boxWidth = renderer.width;
        //let ranNumber = Math.floor(Math.random() * 100) + 1;

        this.inputValue = '';
        this.titleText = 'Pick a number between 1-100';
        this.guessCount = 0;
        this.previousGuess = '';
        this.inputValueLength = 0;
        this.maxInputValue = 100;
        this.gameSolved = false;

        //'Traffic light' setup

        this.greenLight
        this.yellowLight
        this.redLight

        console.log('Constructing the puzzle');
        //...//game specific stuff
        //setting contents for the numPad
        this.numPadContents = {
            0: '0', //         ---  ---  ---
            1: '1', //        | 0 || 1 || 2 |
            2: '2', //         ---  ---  ---
            3: '3', //        | 3 || 4 || 5 |
            4: '4', //         ---  ---  ---
            5: '5', //        | 6 || 7 || 8 |
            6: '6', //         ---  ---  ---   ---
            7: '7', //        | 9 ||  enter | delete |
            8: '8', //         ---  --- ---    ---
            9: '9'
        };

        this.enterButton = 'enter';
        this.deleteButton = 'delete';

    }

    setupGame() {
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

        //console.log('Displaying the puzzle')
        //just like you original setup()
        //this will be called on each game object in the main game's draw funtion
        //when adding something to the renderer do it like this
        //this.renderer.circle(0,0,10);
        //you can even call this.renderer.push() and this.renderer.pop();
        //pretyy much anything that can go in setup and draw that affects the canvas and be used this way

        let x = this.startX;

        let y = this.startY;

        for (const key in this.numPadContents) {
            const content = this.numPadContents[key];
            this.renderer.fill(200);
            this.renderer.rect(x, y, this.boxSize, this.boxSize)
            this.renderer.fill(0);
            this.renderer.textSize(this.renderer.width * 0.05);
            this.renderer.textAlign(CENTER, CENTER);
            this.renderer.text(content, x + this.boxSize / 2, y + this.boxSize / 2);
            x += this.boxSize + this.spacing;
            if (x >= this.startX + 3 * (this.boxSize + this.spacing)) {
                x = this.startX;
                y += this.boxSize + this.spacing;
            }
        }


        //enter button setup
        const content = this.enterButton;
        this.renderer.fill(200);
        this.renderer.rect(x, y, this.boxSize * 2 + this.spacing, this.boxSize)
        this.renderer.fill(0);
        this.renderer.textSize(this.renderer.width * 0.05);
        this.renderer.textAlign(CENTER, CENTER);
        this.renderer.text(content, x + this.boxSize, y + this.boxSize / 2);

        //delete button setup
        const deleteButtonContent = this.deleteButton
        this.renderer.fill(200);
        this.renderer.rect(x + this.boxSize * 2.3, y, this.boxSize * 2 + this.spacing, this.boxSize)
        this.renderer.fill(0);
        this.renderer.textSize(this.renderer.width * 0.05);
        this.renderer.textAlign(CENTER, CENTER);
        this.renderer.text(deleteButtonContent, x + this.boxSize * 3.4, y + this.boxSize / 2);

        //user entry box setup
        this.renderer.push();
        this.renderer.fill(200);
        this.renderer.stroke(0);
        this.renderer.rect(this.startX, this.startY + 4 * (this.boxSize + this.spacing), this.boxSize * 3, this.boxSize);
        this.renderer.pop();

        this.renderer.textSize(this.renderer.width * 0.04);
        this.renderer.textAlign(LEFT, TOP);
        this.renderer.fill(0);
        this.renderer.text(this.inputValue, this.startX + 5, this.startY + 4 * (this.boxSize + this.spacing) + 5);

        // Draw the title text
        this.renderer.textSize(this.renderer.width * 0.04);
        this.renderer.textAlign(CENTER, TOP);
        this.renderer.fill(0);
        this.renderer.text(this.titleText, this.renderer.width / 2, this.startY + 5 * (this.boxSize + this.spacing) + 5);

        // Draw the number of guesses text
        this.renderer.textSize(this.renderer.width * 0.04);
        this.renderer.textAlign(CENTER, TOP);
        this.renderer.fill(0);
        this.renderer.text('Number of guesses: ' + this.guessCount, this.renderer.width / 2, this.startY + 6 * (this.boxSize + this.spacing) + 5);

        //draw previous guesses text
        this.renderer.textSize(this.renderer.width * 0.04);
        this.renderer.textAlign(CENTER, TOP);
        this.renderer.fill(0);
        this.renderer.text('Previous guess: ' + this.previousGuess, this.renderer.width / 2, this.startY + 7 * (this.boxSize + this.spacing) + 5); // Draw the title text at the top

        //drawing 'lights'
        this.greenLight = this.renderer.ellipse(this.startX * 5, this.startY, this.boxSize, this.boxSize)
        this.greenLight.fill(255, 255, 255)
        this.yellowLight = this.renderer.ellipse(this.startX * 5, this.startY * 1.5, this.boxSize, this.boxSize)
        this.yellowLight.fill(255, 255, 255)
        this.redLight = this.renderer.ellipse(this.startX * 5, this.startY * 2, this.boxSize, this.boxSize)
        this.redLight.fill(255, 255, 255)
    }

    // This is an accessor to check if the puzzle is solved
    // Should return true if the puzzle is solved, or false if it isn't

    isSolved() {
        return this.gameSolved;
    }

    checkNum() {
        //checking that the parsed integer value is less than the maxInputValue before dropping into the isSolved logic
        if (parseInt(this.inputValue) <= this.maxInputValue) {
            if (parseInt(this.inputValue) == this.randomNum) {
                this.inputValue = '';
                this.titleText = 'You got it!';
                console.log('solved');
                this.gameSolved = true;
            }
            else if (parseInt(this.inputValue) > this.randomNum) {
                this.inputValue = '';
                this.titleText = 'Guess is too high, guess again';
                console.log('Guess is too high');
            }
            else {
                this.inputValue = '';
                this.titleText = 'Guess is too low, guess again';
                console.log('Guess is too low')
            }
            //if the parsed integer value of inputValue is greater than 100, display error message
        } else {
            this.inputValue = '';
            this.titleText = 'Not a valid input. Numbers are between 0-100';
            console.log('Over 100 error');
        }
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

        // Return 'enter' when the mouse is over the Enter button.
        if (mx >= x && mx <= x + this.boxSize * 2 + this.spacing && my >= y && my <= y + this.boxSize) {
            return 'enter';
        }

        //Return 'delete' when mouse is over delete button
        if (mx >= x && mx <= x + this.boxSize * 4 + this.spacing && my >= y && my <= y + this.boxSize) {
            return 'delete';
        }

        // Return -1 if no rectangle was clicked/hovered.
        return -1;
    }


    setMouseTarget(target) {
        this.mouseTarget = target;
    }

    handleMousePressed(mx, my) {
        console.log(this.randomNum);
        const key = this.mouseOverWhichRectangle(mx, my);

        if (key == 'enter') {
            this.guessCount += 1;
            this.previousGuess = this.inputValue;
            this.checkNum();
            this.inputValueLength = 0;
        } else if (key == 'delete') {
            this.inputValue = ''
            this.inputValueLength = 0;
            console.log('pressed delete');
        }
        //checking that the input value length is only 3 integers
        if (this.inputValueLength < 3) {
            if (key >= '0' && key <= '9') {
                this.inputValue += key; // Append the typed key to the input value
                this.inputValueLength += 1;
            }
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

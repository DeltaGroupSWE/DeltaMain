class SimonButton {
    constructor(x, y, sprite_on, sprite_off) {
        this.x = x;
        this.y = y;
        this.sprite_on = sprite_on;
        this.sprite_off = sprite_off;
        this.on = false;
        this.w = 240;
    }

    getX () {
        return this.x;
    }

    getY () {
        return this.y;
    }

    getSize () {
        return this.w;
    }

    flash () {
        this.on = true;
        this.timeOn = millis();
    }

    drawButton(renderer) {
        if(this.on) {
            renderer.image(this.sprite_on, this.x, this.y, this.w, this.w);
        }else {
            renderer.image(this.sprite_off, this.x, this.y, this.w, this.w);
        }
    }
}

const GameStates = {
    Idle: 0,
    Display: 1,
    Playing: 2,
    Win: 3
}

function generateRandomArray(length) {
    let randomArray = [];
    for (let i = 0; i < length; i++) {
        // Generate a random number between 0 and 3 (inclusive)
        let randomNumber = Math.floor(Math.random() * 4); // 0, 1, 2, or 3
        randomArray.push(randomNumber);
    }
    console.log(randomArray)
    return randomArray;
}

// This is a base class for all puzzles
// All methods in this class MUST be implemented by all puzzles
// Each puzzle should exist as a class with at least the following methods
class SimonPuzzle extends Puzzle {
    // This is the constructor. Each puzzle should use a difficulty variable,
    // even if the puzzle does not change with different difficulties
    constructor(renderer, difficulty = 0) {
        //this.renderer = renderer; // this is a p5.graphics object
        //optional: could only use one of these as it will be a square graphics object
        //this.w = renderer.width;
        //this.h = renderer.height;

        super(renderer, difficulty);
        this.boxWidth = renderer.width;
        this.gameSolved = false;

        console.log('Constructing the puzzle');

        this.startButtonX = Math.floor(this.boxWidth * 0.415);
        this.startButtonY = Math.floor(this.boxWidth * 0.415);
        this.startButtonSize = 160;

        this.state = GameStates.Idle;

        this.sprite_blueOn = sprite_blueOn
        this.sprite_blueOff = sprite_blueOff
        this.sprite_greenOn = sprite_greenOn
        this.sprite_greenOff = sprite_greenOff
        this.sprite_redOn = sprite_redOn
        this.sprite_redOff = sprite_redOff
        this.sprite_yellowOn = sprite_yellowOn
        this.sprite_yellowOff = sprite_yellowOff
        this.sprite_startButton = sprite_startButton
    }

    setupGame() {
        //probably whatever is in you setup function now
        //this will be called on each game from the main setup function
        //when adding something to the renderer do it like this
        //this.renderer.textSize(10);

        this.buttonOrder = generateRandomArray(100);
        this.currentTurn = 0;
        this.currentLight = 0;

        this.lastDisplayPhase = millis();
        
        this.buttonList = [
            new SimonButton(Math.floor(this.boxWidth * 0.5), Math.floor(this.boxWidth * 0.5), this.sprite_blueOn, this.sprite_blueOff),
            new SimonButton(Math.floor(this.boxWidth * 0.5), Math.floor(this.boxWidth * 0.25), this.sprite_redOn, this.sprite_redOff),
            new SimonButton(Math.floor(this.boxWidth * 0.25), Math.floor(this.boxWidth * 0.25), this.sprite_greenOn, this.sprite_greenOff),
            new SimonButton(Math.floor(this.boxWidth * 0.25), Math.floor(this.boxWidth * 0.5), this.sprite_yellowOn, this.sprite_yellowOff)
        ]
    }

    // This is the draw function for the puzzle.
    // Everything that the puzzle needs to do to display on the screen should happen here.
    drawGame() {
        // this.renderer.image(this.sprite_blueOn, Math.floor(this.boxWidth * 3 / 5), Math.floor(this.boxWidth * 3 / 5) , Math.floor(this.boxWidth / 4), Math.floor(this.boxWidth / 4))
        this.buttonList.map((button) => {button.drawButton(this.renderer)});
        if(this.state == GameStates.Idle)
             this.renderer.image(this.sprite_startButton, this.startButtonX, this.startButtonY, this.startButtonSize, this.startButtonSize);

        // console.log(this.state)

        let currentTime = millis();
        this.buttonList.map((button) => {
            if(currentTime - button.timeOn >= 300)
                button.on = false;
        })

        // Manages game state
        if(this.state == GameStates.Display) {
            this.displayPhase();
        }
    }

    // This is an accessor to check if the puzzle is solved
    // Should return true if the puzzle is solved, or false if it isn't

    isSolved() {
        return this.gameSolved;
    }

    mouseOverWhichRectangle(mx, my) {
        // Check for start button
        if (mx >= this.startButtonX && mx <= this.startButtonX + this.startButtonSize && my >= this.startButtonY && my <= this.startButtonY + this.startButtonSize) {
            return 4;
        }

        for (const [index, button] of this.buttonList.entries()) {
            let x = button.getX();
            let y = button.getY();
            let size = button.getSize();

            if (mx >= x && mx <= x + size && my >= y && my <= y + size) {
                return index;
            }
        }

        return -1;
    }

    displayPhase() {
        let currentTime = millis()
        if (currentTime - this.lastDisplayPhase >= 500) {
            console.log(this.currentLight);
            this.lastDisplayPhase = currentTime;
            if (this.currentLight <= this.currentTurn) {
                this.buttonList[this.buttonOrder[this.currentLight]].flash();
            }else {
                this.state = GameStates.Playing;
                this.currentLight = -1;
            }
            this.currentLight += 1;
        }
    }


    setMouseTarget(target) {
        this.mouseTarget = target;
    }

    handleMousePressed(mx, my) {
        const button = this.mouseOverWhichRectangle(mx, my);

        if (button == -1) return;

        if (button < 4) {
            if(this.state == GameStates.Playing) {
                this.buttonList[button].flash();
                if(this.buttonOrder[this.currentLight] == button) {
                    this.currentLight += 1;
                    if(this.currentLight > this.currentTurn) {
                        this.currentLight = 0;
                        this.currentTurn += 1;
                        this.lastDisplayPhase = millis();
                        if(this.currentTurn > 10) {
                            this.state = GameStates.Win;
                            this.gameSolved = true;
                        }else {
                            this.state = GameStates.Display;
                        }
                    }
                } else {
                    this.state = GameStates.Idle;
                    this.buttonList.map((b) => b.flash());
                }
            }
        }

        if (button == 4) {
            // Start button
            if(this.state == GameStates.Idle){
                this.setupGame()
                this.state = GameStates.Display;
            }
        }
    }
}

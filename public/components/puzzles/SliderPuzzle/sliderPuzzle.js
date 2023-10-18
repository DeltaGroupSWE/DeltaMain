class SliderPuzzle extends Puzzle {
    constructor(renderer, difficulty = 0) {// this is a p5.graphics object
        //optional: could only use one of these as it will be a square graphics object
        super(renderer, difficulty)
        this.w = renderer.width;

        console.log('Constructing the puzzle');
        this.puzzleState = {
            A1: "A1",//             ----  ----  ----
            B1: "B1",//            | A1 || B1 || C1 |
            C1: "C1",//             ----  ----  ----
            A2: "A2",//            | A2 || B2 || C2 |
            B2: "B2",//             ----  ----  ----
            C2: "C2",//            | A3 || B3 || C3 |
            A3: "A3",//             ----  ----  ----
            B3: "B3",//
            C3: "  " //     C3 is empty in final puzzle state
        };
        this.emptyCell = "C3";
    }

    setupGame() {
        this.boxSize = this.w / 15; // Size of each box
        this.spacing = this.w / 100; // Spacing between boxes
        this.startX = this.w / 6; // Starting X position
        this.startY = this.w / 5; // Starting Y position
        this.debug();
        this.shufflePuzzleState();
    }

    // This is the draw function for the puzzle.
    // Everything that the puzzle needs to do to display on the screen should happen here.
    drawGame() {
        let emptyCell = this.getEmptyCell();
        //console.log('Displaying the puzzle')
        //this.debug();
        let x = this.startX;
        let y = this.startY;

        for (const key in this.puzzleState) {
            const content = this.puzzleState[key];
            this.renderer.fill(200);
            this.renderer.rect(x, y, this.boxSize, this.boxSize);
            this.renderer.fill(0);
            this.renderer.textSize(32);
            this.renderer.textAlign(CENTER, CENTER);
            this.renderer.text(content, x + this.boxSize / 2, y + this.boxSize / 2);
            x += this.boxSize + this.spacing;
            if (x >= this.startX + 3 * (this.boxSize + this.spacing)) {
                x = this.startX;
                y += this.boxSize + this.spacing;
            }
        }

        if (this.isSolved()) {
            this.renderer.background(0, 255, 0);
            this.renderer.textSize(64);
            this.renderer.textAlign(CENTER, CENTER);
            this.renderer.fill(0);
            this.renderer.text("You win!", width / 2, height / 2);
        }
        //this.handleKeyPressed();
    }

    isSolved() {
        if (this.puzzleState.A1 === "A1" &&
            this.puzzleState.B1 === "B1" &&
            this.puzzleState.C1 === "C1" &&
            this.puzzleState.A2 === "A2" &&
            this.puzzleState.B2 === "B2" &&
            this.puzzleState.C2 === "C2" &&
            this.puzzleState.A3 === "A3" &&
            this.puzzleState.B3 === "B3" &&
            this.puzzleState.C3 === "  ") {
            console.log("Solved");
            return true;
        }

        return false;
    }

    handleKeyPressed(key) {
        console.log(key);
        if (key === "a" || key === LEFT_ARROW) {
            this.move("left");
        }
        if (key === "d" || key === RIGHT_ARROW) {
            this.move("right");
        }
        if (key === "w" || key === UP_ARROW) {
            this.move("up");
        }
        if (key === "s" || key === DOWN_ARROW) {
            this.move("down");
        }
    }
    //unused
    handleKeyReleased(key) { }

    // TODO: implement mouse controls
    handleMouseClick(mx, my) { }
    handleMousePressed(mx, my) { }
    handleMouseDragged(mx, my) { }
    handleMouseReleased(mx, my) { }

    getEmptyCell() {
        for (const key in this.puzzleState) {
            if (this.puzzleState[key] === "  ") {
                return key;
            }
        }
        return null;
    }

    shufflePuzzleState() {
        const moves = ["left", "right", "up", "down"];
        for (let i = 0; i < 100; i++) {
            const randomMove = moves[Math.floor(Math.random() * moves.length)];
            this.move(randomMove);
        }
    }

    debug() {
        console.log(this.puzzleState.A1 + ", " + this.puzzleState.B1 + ", " + this.puzzleState.C1);
        console.log(this.puzzleState.A2 + ", " + this.puzzleState.B2 + ", " + this.puzzleState.C2);
        console.log(this.puzzleState.A3 + ", " + this.puzzleState.B3 + ", " + this.puzzleState.C3);
        console.log(Date.now())
    }

    invalidMove() {
        console.log("Invalid move")
    }

    move(direction) {
        let emptyCell = this.getEmptyCell();
        console.log(direction + emptyCell)
        let col = emptyCell[0];
        let row = emptyCell[1];

        switch (direction) {
            case "left":
                if (col === "C")
                    this.invalidMove();
                else {
                    this.moveLeft();
                }
                break;
            case "right":
                if (col === "A")
                    this.invalidMove();
                else {
                    this.moveRight();
                }
                break;
            case "up":
                if (row === "3")
                    this.invalidMove();
                else {
                    this.moveUp();
                }
                break;
            case "down":
                if (row === "1")
                    this.invalidMove();
                else {
                    this.moveDown();
                }
                break;
            default:
                break;
        }
    }

    // --------------------------
    //  Move functions
    // --------------------------
    moveLeft() {
        this.getEmptyCell();
        switch (this.emptyCell) {
            case "A1":
                this.puzzleState.A1 = this.puzzleState.B1;
                this.puzzleState.B1 = "  ";
                break;
            case "B1":
                this.puzzleState.B1 = this.puzzleState.C1;
                this.puzzleState.C1 = "  ";
                break;
            case "A2":
                this.puzzleState.A2 = this.puzzleState.B2;
                this.puzzleState.B2 = "  ";
                break;
            case "B2":
                this.puzzleState.B2 = this.puzzleState.C2;
                this.puzzleState.C2 = "  ";
                break;
            case "A3":
                this.puzzleState.A3 = this.puzzleState.B3;
                this.puzzleState.B3 = "  ";
                break;
            case "B3":
                this.puzzleState.B3 = this.puzzleState.C3;
                this.puzzleState.C3 = "  ";
                break;
            default:
                break;
        }
        this.emptyCell = this.getEmptyCell();
    }

    moveRight() {
        this.getEmptyCell();
        switch (this.emptyCell) {
            case "B1":
                this.puzzleState.B1 = this.puzzleState.A1;
                this.puzzleState.A1 = "  ";
                break;
            case "C1":
                this.puzzleState.C1 = this.puzzleState.B1;
                this.puzzleState.B1 = "  ";
                break;
            case "B2":
                this.puzzleState.B2 = this.puzzleState.A2;
                this.puzzleState.A2 = "  ";
                break;
            case "C2":
                this.puzzleState.C2 = this.puzzleState.B2;
                this.puzzleState.B2 = "  ";
                break;
            case "B3":
                this.puzzleState.B3 = this.puzzleState.A3;
                this.puzzleState.A3 = "  ";
                break;
            case "C3":
                this.puzzleState.C3 = this.puzzleState.B3;
                this.puzzleState.B3 = "  ";
                break;
            default:
                break;
        }
        this.emptyCell = this.getEmptyCell();
    }

    moveUp() {
        this.getEmptyCell();
        switch (this.emptyCell) {
            case "A1":
                this.puzzleState.A1 = this.puzzleState.A2;
                this.puzzleState.A2 = "  ";
                break;
            case "B1":
                this.puzzleState.B1 = this.puzzleState.B2;
                this.puzzleState.B2 = "  ";
                break;
            case "C1":
                this.puzzleState.C1 = this.puzzleState.C2;
                this.puzzleState.C2 = "  ";
                break;
            case "A2":
                this.puzzleState.A2 = this.puzzleState.A3;
                this.puzzleState.A3 = "  ";
                break;
            case "B2":
                this.puzzleState.B2 = this.puzzleState.B3;
                this.puzzleState.B3 = "  ";
                break;
            case "C2":
                this.puzzleState.C2 = this.puzzleState.C3;
                this.puzzleState.C3 = "  ";
                break;
            default:
                break;
        }
        this.emptyCell = this.getEmptyCell();
    }
    moveDown() {
        this.getEmptyCell();
        switch (this.emptyCell) {
            case "A2":
                this.puzzleState.A2 = this.puzzleState.A1;
                this.puzzleState.A1 = "  ";
                break;
            case "B2":
                this.puzzleState.B2 = this.puzzleState.B1;
                this.puzzleState.B1 = "  ";
                break;
            case "C2":
                this.puzzleState.C2 = this.puzzleState.C1;
                this.puzzleState.C1 = "  ";
                break;
            case "A3":
                this.puzzleState.A3 = this.puzzleState.A2;
                this.puzzleState.A2 = "  ";
                break;
            case "B3":
                this.puzzleState.B3 = this.puzzleState.B2;
                this.puzzleState.B2 = "  ";
                break;
            case "C3":
                this.puzzleState.C3 = this.puzzleState.C2;
                this.puzzleState.C2 = "  ";
                break;
            default:
                break;
        }
        this.emptyCell = this.getEmptyCell();
    }
}

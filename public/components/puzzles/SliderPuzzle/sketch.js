// ---------------------------------------------------
// THIS FILE IS NO LONGER USED, KEEPING FOR REFERENCE
// ---------------------------------------------------

let buttonSound;

function preload() {
}

function setup() {
    createCanvas(winWidth, winHeight * 0.9);
    background('pink');
    shufflePuzzleState();
    debug();
}

const boxSize = winWidth / 15; // Size of each box
const spacing = winWidth / 100; // Spacing between boxes
const startX = winWidth / 6; // Starting X position
const startY = winHeight / 5; // Starting Y position

function draw() {
    let x = startX;
    let y = startY;

    for (const key in puzzleState) {
        const content = puzzleState[key];
        fill(200);
        rect(x, y, boxSize, boxSize);
        fill(0);
        textSize(32);
        textAlign(CENTER, CENTER);
        text(content, x + boxSize / 2, y + boxSize / 2);
        x += boxSize + spacing;
        if (x >= startX + 3 * (boxSize + spacing)) {
            x = startX;
            y += boxSize + spacing;
        }
    }
    if (checkIfComplete()) {
        background(0, 255, 0);
        textSize(64);
        textAlign(CENTER, CENTER);
        fill(0);
        text("You win!", width / 2, height / 2);
    }
}

// --------------------
// Puzzle logic
// --------------------

const puzzleState = {
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

function move(direction) {
    if (!isMoving) {
        //console.log(direction);
        emptyCell = getEmptyCell();

        col = emptyCell[0];
        row = emptyCell[1];

        console.log(emptyCell);
        switch (direction) {
            case "left":
                if (col === "C")
                    invalidMove();
                else {
                    isMoving = true;
                    moveLeft();
                }
                break;
            case "right":
                if (col === "A")
                    invalidMove();
                else {
                    isMoving = true;
                    moveRight();
                }
                break;
            case "up":
                if (row === "3")
                    invalidMove();
                else {
                    isMoving = true;
                    moveUp();
                }
                break;
            case "down":
                if (row === "1")
                    invalidMove();
                else {
                    isMoving = true;
                    moveDown();
                }
                break;
            default:
                break;
        }
        if (isMoving)
            debug();
    }
    isMoving = false;
}

function invalidMove() {
    console.log("Invalid move")
}

// moveLeft, right, up, down functions at bottom of file

function getEmptyCell() {
    for (const key in puzzleState) {
        if (puzzleState[key] === "  ") {
            return key;
        }
    }
    return null;
}

function checkIfComplete() {
    return (
        puzzleState.A1 === "A1" &&
        puzzleState.B1 === "B1" &&
        puzzleState.C1 === "C1" &&
        puzzleState.A2 === "A2" &&
        puzzleState.B2 === "B2" &&
        puzzleState.C2 === "C2" &&
        puzzleState.A3 === "A3" &&
        puzzleState.B3 === "B3" &&
        puzzleState.C3 === "  "
    );
}

function shufflePuzzleState() {
    const moves = ["left", "right", "up", "down"];

    for (let i = 0; i < 500; i++) {
        const randomMove = moves[Math.floor(Math.random() * moves.length)];
        move(randomMove);
    }
}


// --------------------------
// Keypress trigger functions
// --------------------------
let isMoving = false;
let keyPressedFlag = false;

function keyReleased() {
    keyPressedFlag = false;
}

function keyPressed() {
    if (!keyPressedFlag) {
        keyPressedFlag = true;
        if (key === "a" || key === "ArrowLeft") {
            move("left");
        }
        if (key === "d" || key === "ArrowRight") {
            move("right");
        }
        if (key === "w" || key === "ArrowUp") {
            move("up");
        }
        if (key === "s" || key === "ArrowDown") {
            move("down");
        }
    }
}

function debug() {
    console.log(puzzleState.A1 + ", " + puzzleState.B1 + ", " + puzzleState.C1);
    console.log(puzzleState.A2 + ", " + puzzleState.B2 + ", " + puzzleState.C2);
    console.log(puzzleState.A3 + ", " + puzzleState.B3 + ", " + puzzleState.C3);
    console.log(Date.now())
}

// --------------------------
//  Move functions
// --------------------------
function moveLeft() {
    getEmptyCell();
    switch (emptyCell) {
        case "A1":
            puzzleState.A1 = puzzleState.B1;
            puzzleState.B1 = "  ";
            break;
        case "B1":
            puzzleState.B1 = puzzleState.C1;
            puzzleState.C1 = "  ";
            break;
        case "A2":
            puzzleState.A2 = puzzleState.B2;
            puzzleState.B2 = "  ";
            break;
        case "B2":
            puzzleState.B2 = puzzleState.C2;
            puzzleState.C2 = "  ";
            break;
        case "A3":
            puzzleState.A3 = puzzleState.B3;
            puzzleState.B3 = "  ";
            break;
        case "B3":
            puzzleState.B3 = puzzleState.C3;
            puzzleState.C3 = "  ";
            break;
        default:
            break;
    }
}

function moveRight() {
    getEmptyCell();
    switch (emptyCell) {
        case "B1":
            puzzleState.B1 = puzzleState.A1;
            puzzleState.A1 = "  ";
            break;
        case "C1":
            puzzleState.C1 = puzzleState.B1;
            puzzleState.B1 = "  ";
            break;
        case "B2":
            puzzleState.B2 = puzzleState.A2;
            puzzleState.A2 = "  ";
            break;
        case "C2":
            puzzleState.C2 = puzzleState.B2;
            puzzleState.B2 = "  ";
            break;
        case "B3":
            puzzleState.B3 = puzzleState.A3;
            puzzleState.A3 = "  ";
            break;
        case "C3":
            puzzleState.C3 = puzzleState.B3;
            puzzleState.B3 = "  ";
            break;
        default:
            break;
    }
}

function moveUp() {
    getEmptyCell();
    switch (emptyCell) {
        case "A1":
            puzzleState.A1 = puzzleState.A2;
            puzzleState.A2 = "  ";
            break;
        case "B1":
            puzzleState.B1 = puzzleState.B2;
            puzzleState.B2 = "  ";
            break;
        case "C1":
            puzzleState.C1 = puzzleState.C2;
            puzzleState.C2 = "  ";
            break;
        case "A2":
            puzzleState.A2 = puzzleState.A3;
            puzzleState.A3 = "  ";
            break;
        case "B2":
            puzzleState.B2 = puzzleState.B3;
            puzzleState.B3 = "  ";
            break;
        case "C2":
            puzzleState.C2 = puzzleState.C3;
            puzzleState.C3 = "  ";
            break;
        default:
            break;
    }
}
function moveDown() {
    getEmptyCell();
    switch (emptyCell) {
        case "A2":
            puzzleState.A2 = puzzleState.A1;
            puzzleState.A1 = "  ";
            break;
        case "B2":
            puzzleState.B2 = puzzleState.B1;
            puzzleState.B1 = "  ";
            break;
        case "C2":
            puzzleState.C2 = puzzleState.C1;
            puzzleState.C1 = "  ";
            break;
        case "A3":
            puzzleState.A3 = puzzleState.A2;
            puzzleState.A2 = "  ";
            break;
        case "B3":
            puzzleState.B3 = puzzleState.B2;
            puzzleState.B2 = "  ";
            break;
        case "C3":
            puzzleState.C3 = puzzleState.C2;
            puzzleState.C2 = "  ";
            break;
        default:
            break;
    }
}


// This is a base class for all puzzles
// All methods in this class MUST be implemented by all puzzles
// Each puzzle should exist as a class with at least the following methods
export default class puzzle {
    // This is the constructor. Each puzzle should use a difficulty variable,
    // even if the puzzle does not change with different difficulties
    constructor(difficulty = 0) {
        this.difficulty = difficulty;
        console.log('Constructing the puzzle');
    }

    // This is the draw function for the puzzle.
    // Everything that the puzzle needs to do to display on the screen should happen here.
    display() {
        console.log('Displaying the puzzle')
    }

    // This is an accessor to check if the puzzle is solved
    // Should return true if the puzzle is solved, or false if it isn't
    isSolved() {
        console.log('Checking if the puzzle is solved')
    }

    // This is an event handler for mouse events
    // The main game should call this on a click and pass the mouse's x/y
    handleMouseClickEvent(x, y) {
        console.log('Handling puzzle\'s mouse event')
    }
}
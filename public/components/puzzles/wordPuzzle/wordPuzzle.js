let words;
let hintsObject;

fetch('../../assets/csvs/words.csv')  // Adjust the path accordingly
    .then(response => response.text())
    .then(data => {
        words = parseWordsCSV(data);
    })
    .catch(error => console.error('Error fetching the CSV:', error));

fetch('../../assets/csvs/hints.csv')  // Adjust the path accordingly
    .then(response => response.text())
    .then(data => {
        hintsObject = parseHintsCSV(data);
    })
    .catch(error => console.error('Error fetching the CSV:', error));

class WordPuzzle extends Puzzle {
    constructor(renderer, difficulty = 0) {
        super(renderer, difficulty)
        this.wordsComplete = 0;
    }

    setupGame() {
        this.difficulty = Math.min(this.difficulty, words.length - 1)
        this.lCaseWord = words[this.difficulty][(Math.floor(Math.random() * words[this.difficulty].length))]
        this.hint = hintsObject[this.lCaseWord]
        this.displayHint = false
        this.word = this.lCaseWord.toLocaleUpperCase()
        this.wordMap = new Map()
        this.positionMap = new Map()
        this.squareSize = Math.floor(0.7 * this.renderer.width / this.word.length)
        this.padding = Math.floor(0.1 * this.renderer.width / this.word.length)
        this.originalPos = [Math.floor(0.1 * this.renderer.width) + this.squareSize / 2, Math.floor(0.5 * this.renderer.height)]
        this.mouseTarget = -1
        var remaining = new Set()


        for (var i = 0; i < this.word.length; i++) {
            remaining.add(i)
        }
        for (var i = 0; i < this.word.length; i++) {
            var ind = getRandomElementFromSet(remaining)
            this.wordMap.set(i, this.word[ind])
            this.positionMap.set(i, this.originalPos[0] + i * (this.squareSize + this.padding))

            remaining.delete(ind)
        }

        //set up game again if word is solved
        if (this.wordComplete()) {
            console.log(this.word + ": Already solved. Rescrambling...")
            this.setupGame();
        }
    }

    drawGame() {
        if(this.wordsComplete >= 5){
            this.renderer.textAlign(CENTER);
            this.renderer.textSize(25);
            this.renderer.text("complete", this.renderer.width / 2, this.renderer.height/2)
            return;
        }
        this.renderer.rectMode(CENTER);
        for (var i = 0; i < this.word.length; i++) {
            // fill(244, 122, 158);
            //drawingContext = this.renderer.drawingContext;
            this.renderer.rect(this.positionMap.get(i), this.originalPos[1], this.squareSize, this.squareSize, 10)
            this.renderer.textAlign(CENTER);
            this.renderer.textSize(25);
            this.renderer.text(this.wordMap.get(i), this.positionMap.get(i), this.originalPos[1])
        }

        //diplay hint at the bottom center if displayHint, else clickable button to toggle
        if (this.displayHint) {
            this.renderer.textAlign(CENTER);
            this.renderer.textSize(25);
            this.renderer.text(this.hint, this.renderer.width / 2, this.renderer.height - 50)
        }
        else {
            //drawingContext = this.renderer.drawingContext;
            this.renderer.rect(this.renderer.width / 2, this.renderer.height - 50, 150, 50, 10)
            this.renderer.textAlign(CENTER);
            this.renderer.textSize(25);
            this.renderer.text('Hint?', this.renderer.width / 2, this.renderer.height - 50)
        }
    }

    isSolved(){
        if(this.wordsComplete < 5) return false;
        return true;
    }
    //Looping inversely because people will tend to solve the puzzle from the left to the right. so error checking will be faster
    wordComplete() {
        for (var i = this.word.length - 1; i > -1; i--) {
            if (this.wordMap.get(i) != this.word[i]) {
                return false
            }
        }
        this.wordsComplete++;
        console.log(this.wordsComplete);
        return true;
    }

    //TODO: use modular arithmetic to make the mouse position finding an O(1) operation instead of O(n)
    mouseOverWhichRectangle(mx, my) {
        for (var i = 0; i < this.word.length; i++) {
            if (mx > this.positionMap.get(i) - this.squareSize / 2 && mx < this.positionMap.get(i) + this.squareSize / 2 && my > this.originalPos[1] - this.squareSize / 2 && my < this.originalPos[1] + this.squareSize / 2) {
                return i;
            }
        }
        return -1;
    }

    setMouseTarget(target) {
        this.mouseTarget = target;
    }

    handleMousePressed(mx, my) {
        if(this.wordsComplete >= 5) return;
        this.setMouseTarget(this.mouseOverWhichRectangle(mx, my));
        if (!this.displayHint && mx > this.renderer.width / 2 - 75 && mx < this.renderer.width / 2 + 75 && my > this.renderer.height - 75 && my < this.renderer.height - 25) {
            this.displayHint = true
        }
    }

    handleMouseReleased(mx, my) {
        if(this.wordsComplete >= 5) return;
        this.positionMap.set(this.mouseTarget, this.originalPos[0] + (this.mouseTarget) * (this.squareSize + this.padding))
        this.mouseTarget = -1
        if (this.wordComplete() && this.wordsComplete < 5) {
            this.difficulty++;
            this.setupGame();
        }
    }

    handleMouseDragged(mx, my) {
        if(this.wordsComplete >= 5) return;
        if (this.mouseTarget != -1) {
            if (this.mouseTarget > 0 && mx < this.positionMap.get(this.mouseTarget - 1)) {
                // shuffleSound.play();
                this.tmp = this.wordMap.get(this.mouseTarget - 1)
                this.wordMap.set(this.mouseTarget - 1, this.wordMap.get(this.mouseTarget))
                this.wordMap.set(this.mouseTarget, this.tmp)
                this.positionMap.set(this.mouseTarget, this.originalPos[0] + (this.mouseTarget) * (this.squareSize + this.padding))
                this.mouseTarget = this.mouseTarget - 1
            }
            else if (this.mouseTarget < this.word.length - 1 && mx > this.positionMap.get(this.mouseTarget + 1)) {
                // shuffleSound.play();
                this.tmp = this.wordMap.get(this.mouseTarget + 1)
                this.wordMap.set(this.mouseTarget + 1, this.wordMap.get(this.mouseTarget))
                this.wordMap.set(this.mouseTarget, this.tmp)
                this.positionMap.set(this.mouseTarget, this.originalPos[0] + (this.mouseTarget) * (this.squareSize + this.padding))
                this.mouseTarget = this.mouseTarget + 1
            }

            if (mx > this.originalPos[0] && mx < this.originalPos[0] + this.word.length * (this.squareSize + this.padding)) {
                this.positionMap.set(this.mouseTarget, mx)
            }
        }
    }

}

//TODO: use an iterator to make this more efficient. i.e. don't need to convert to array
function getRandomElementFromSet(set) {
    return [...set][Math.floor(Math.random() * set.size)];
}

function parseWordsCSV(data) {
    const rows = data.trim().split("\n");
    return rows.map(row => row.trim().split(","));
}

function parseHintsCSV(data) {
    const rows = data.trim().split("\n");
    const hints = {};
    for (let i = 1; i < rows.length; i++) {
        const [word, hint] = rows[i].split(",");
        hints[word] = hint;
    }

    return hints;
}
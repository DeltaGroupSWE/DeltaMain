var words = [
    ["fan", "you", "bat", "cab", "zoo", "gap", "gag", "ham", "all", "mad", "jet", "war", "van", "jaw", "gas", "lab", "had", "bar", "egg", "day"],
    ["hand", "date", "vast", "wake", "want", "rack", "east", "baby", "able", "make", "cake", "face", "name", "base", "gain", "unit", "yolk", "wack", "back", "fall"],
    ["yield", "until", "unite", "raise", "quest", "dance", "value", "radar", "radio", "jewel", "carry", "zebra", "above", "quack", "quick", "vapor", "ideal", "yacht", "ocean", "again"],
    ["impact", "tactic", "nature", "narrow", "import", "unless", "object", "garage", "native", "wander", "nation", "factor", "unlike", "handle", "family", "yogurt", "happen", "almost", "gather", "jacket"],
    ["unknown", "vehicle", "imagine", "natural", "package", "machine", "uniform", "quantum", "quarter", "october", "quality", "variety", "reflect", "success"],
    ["domestic", "dominant", "profound", "magnetic", "military", "platform", "negative", "positive", "critical", "standard", "constant", "religion", "absolute", "relative", "savoury", "society"],
    ["abandoned", "abilities", "chocolate", "education", "household", "objective", "practical", "reinforce", "strategic", "vegetable", "wonderful", "wonderful"],
    ["absorption", "accelerate", "acceptable", "background", "bankruptcy", "basketball", "biological", "collection", "commercial", "distribute", "efficiency", "electronic", "employment", "generation", "government", "guidelines", "historical", "importance", "impressive", "industrial", "inevitable", "leadership", "literature", "mainstream", "obligation", "operations", "opposition", "percentage", "perception", "productive", "profession", "regardless", "regulation", "resistance", "resolution", "structured", "submission", "technology", "television", "themselves", "tournament"],
    ["achievement", "comprehensive", "institution", "imagination", "legislation", "measurement", "negotiation", "observation", "perspective", "recognition", "satisfaction", "understanding"],
];
    
var canvWidth = 1000
var canvHeight = 1000
function setup() {
    createCanvas(canvWidth, canvHeight);
    puzzle = new WordPuzzle();
    rectMode(CENTER);
    solvedPuzzles = 0
    soundFormats('wav', 'mp3');
    shuffleSound = loadSound('./sounds/shuffle_quick.wav');
    successSound = loadSound('./sounds/success_collect.mp3');
}

function draw() {
    background(220);
    puzzle.display()
}

class WordPuzzle{
    constructor(level = 0){
        this.level = level
        this.word = words[this.level][(Math.floor(Math.random() * words[this.level].length))].toLocaleUpperCase()
        var remaining = new Set()
        this.wordMap = new Map()
        this.positionMap = new Map()
        this.squareSize = Math.floor(0.7*canvWidth/this.word.length)
        this.padding = Math.floor(0.1*canvWidth/this.word.length)
        this.originalPos = [Math.floor(0.1*canvWidth) + this.squareSize/2, Math.floor(0.5*canvHeight)]
        this.mouseTarget = -1

        for(var i = 0; i< this.word.length; i++){
            remaining.add(i)
        }

        for(var i = 0; i< this.word.length; i++){
            var ind = getRandomElementFromSet(remaining)
            this.wordMap.set(i, this.word[ind])
            this.positionMap.set(i, this.originalPos[0] + i*(this.squareSize + this.padding))

            remaining.delete(ind)
        }
    }

    display(){
        for(var i = 0; i< this.word.length; i++){
            // fill(244, 122, 158);
            rect(this.positionMap.get(i), this.originalPos[1], this.squareSize, this.squareSize, 10)
            textAlign(CENTER);
            textSize(25);
            text(this.wordMap.get(i), this.positionMap.get(i) , this.originalPos[1])
        }
    }
    
    //Looping inversely because people will tend to solve the puzzle from the left to the right. so error checking will be faster
    isSolved(){
        for(var i = this.word.length - 1; i > -1 ; i--){
            if(this.wordMap.get(i) != this.word[i]){
                return false
            }
        }
        return true
    }
}

//TODO: use an iterator to make this more efficient. i.e. don't need to convert to array
function getRandomElementFromSet(set) {
    return [...set][Math.floor(Math.random() * set.size)];
}

//TODO: use modular arithmetic to make the mouse position finding an O(1) operation instead of O(n)
function mouseOverWhichRectangle(){
    for(var i = 0; i< puzzle.word.length; i++){
        if(mouseX > puzzle.positionMap.get(i) - puzzle.squareSize/2 && mouseX < puzzle.positionMap.get(i) + puzzle.squareSize/2  && mouseY > puzzle.originalPos[1] - puzzle.squareSize/2 && mouseY < puzzle.originalPos[1] + puzzle.squareSize/2){
            return i
        }
    }
    return -1
}

// move target rectangle along with mouse as long as it is pressed
function mousePressed(){
    puzzle.mouseTarget = mouseOverWhichRectangle()
}

function mouseReleased(){
    puzzle.positionMap.set(puzzle.mouseTarget, puzzle.originalPos[0] + (puzzle.mouseTarget)*(puzzle.squareSize + puzzle.padding))
    puzzle.mouseTarget = -1
    if(puzzle.isSolved()){
        solvedPuzzles++
        successSound.play();
        puzzle = new WordPuzzle(Math.min(Math.floor(solvedPuzzles/5), words.length - 1))
    }
}

function mouseDragged(){
    if(puzzle.mouseTarget != -1){

        if ( puzzle.mouseTarget > 0 && mouseX < puzzle.positionMap.get(puzzle.mouseTarget - 1)){
            shuffleSound.play();
            tmp = puzzle.wordMap.get(puzzle.mouseTarget - 1)
            puzzle.wordMap.set(puzzle.mouseTarget - 1, puzzle.wordMap.get(puzzle.mouseTarget))
            puzzle.wordMap.set(puzzle.mouseTarget, tmp)
            puzzle.positionMap.set(puzzle.mouseTarget, puzzle.originalPos[0] + (puzzle.mouseTarget)*(puzzle.squareSize + puzzle.padding))
            puzzle.mouseTarget = puzzle.mouseTarget - 1
        }
        else if ( puzzle.mouseTarget < puzzle.word.length - 1 && mouseX > puzzle.positionMap.get(puzzle.mouseTarget + 1)){
            shuffleSound.play();
            tmp = puzzle.wordMap.get(puzzle.mouseTarget + 1)
            puzzle.wordMap.set(puzzle.mouseTarget + 1, puzzle.wordMap.get(puzzle.mouseTarget))
            puzzle.wordMap.set(puzzle.mouseTarget, tmp)
            puzzle.positionMap.set(puzzle.mouseTarget, puzzle.originalPos[0] + (puzzle.mouseTarget)*(puzzle.squareSize + puzzle.padding))
            puzzle.mouseTarget = puzzle.mouseTarget + 1
        }

        if (mouseX > puzzle.originalPos[0] && mouseX < puzzle.originalPos[0] + puzzle.word.length*(puzzle.squareSize + puzzle.padding)){
            puzzle.positionMap.set(puzzle.mouseTarget, mouseX)
        }
    }
}
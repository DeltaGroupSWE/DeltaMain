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

class WordPuzzle extends Puzzle {
    constructor(renderer, difficulty = 0) {
        super(renderer, difficulty)
    }

    setupGame() {
        console.log('Setting up the puzzle');
        this.word = words[this.difficulty][(Math.floor(Math.random() * words[this.difficulty].length))].toLocaleUpperCase()
        var remaining = new Set()
        this.wordMap = new Map()
        this.positionMap = new Map()
        this.squareSize = Math.floor(0.7*this.renderer.width/this.word.length)
        this.padding = Math.floor(0.1*this.renderer.width/this.word.length)
        this.originalPos = [Math.floor(0.1*this.renderer.width) + this.squareSize/2, Math.floor(0.5*this.renderer.height)]
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

    drawGame() {
        console.log('drawing...');
        for(var i = 0; i< this.word.length; i++){
            // fill(244, 122, 158);
            this.renderer.rect(this.positionMap.get(i), this.originalPos[1], this.squareSize, this.squareSize, 10)
            this.renderer.textAlign(CENTER);
            this.renderer.textSize(25);
            this.renderer.text(this.wordMap.get(i), this.positionMap.get(i) , this.originalPos[1])
        }
    }

    //Looping inversely because people will tend to solve the puzzle from the left to the right. so error checking will be faster
    isSolved() {
        for(var i = this.word.length - 1; i > -1 ; i--){
            if(this.wordMap.get(i) != this.word[i]){
                return false
            }
        }
        return true
    }

    //TODO: use modular arithmetic to make the mouse position finding an O(1) operation instead of O(n)
    mouseOverWhichRectangle(mx, my){
        for(var i = 0; i< puzzle.word.length; i++){
            if(mx > this.positionMap.get(i) - this.squareSize/2 && mx < this.positionMap.get(i) + this.squareSize/2  && my > this.originalPos[1] - this.squareSize/2 && my < this.originalPos[1] + this.squareSize/2){
                return i;
            }
        }
        return -1;
    }

    setMouseTarget(target) {
        console.log(target);
        this.mouseTarget = target;
    }

    handleMousePressed(mx, my){
        this.setMouseTarget(this.mouseOverWhichRectangle(mx, my));
    }

    handleMouseReleased(mx, my){
        this.positionMap.set(this.mouseTarget, this.originalPos[0] + (this.mouseTarget)*(this.squareSize + this.padding))
        this.mouseTarget = -1
        if(this.isSolved()){
            console.log('WINNER!');
            this.difficulty++;
            this.setupGame();
        }
    }

    handleMouseDragged(mx, my){
        if(this.mouseTarget != -1){
    
            if ( this.mouseTarget > 0 && mx < this.positionMap.get(this.mouseTarget - 1)){
                // shuffleSound.play();
                this.tmp = this.wordMap.get(this.mouseTarget - 1)
                this.wordMap.set(this.mouseTarget - 1, this.wordMap.get(this.mouseTarget))
                this.wordMap.set(this.mouseTarget, this.tmp)
                this.positionMap.set(this.mouseTarget, this.originalPos[0] + (this.mouseTarget)*(this.squareSize + this.padding))
                this.mouseTarget = this.mouseTarget - 1
            }
            else if ( this.mouseTarget < this.word.length - 1 && mx > this.positionMap.get(this.mouseTarget + 1)){
                // shuffleSound.play();
                this.tmp = this.wordMap.get(this.mouseTarget + 1)
                this.wordMap.set(this.mouseTarget + 1, this.wordMap.get(this.mouseTarget))
                this.wordMap.set(this.mouseTarget, this.tmp)
                this.positionMap.set(this.mouseTarget, this.originalPos[0] + (this.mouseTarget)*(this.squareSize + this.padding))
                this.mouseTarget = this.mouseTarget + 1
            }
    
            if (mx > this.originalPos[0] && mx < this.originalPos[0] + this.word.length*(this.squareSize + this.padding)){
                this.positionMap.set(this.mouseTarget, mx)
            }
        }
    }

}

//TODO: use an iterator to make this more efficient. i.e. don't need to convert to array
function getRandomElementFromSet(set) {
    return [...set][Math.floor(Math.random() * set.size)];
}
// Custom class for buttons
// NOTE:
// This class does not have a method for onMousePressed() or any
// other related functions.  Use contains(pointerX,pointerY) in
// conjunction with those two functions.
class CustomButton{

    // Constructor
    // REQUIRES: Integer, Integer, Integer, Integer
    constructor(PositionX,PositionY,Width,Height){
        
        
        // Shape
        this.PositionX = PositionX;
        this.PositionY = PositionY;
        this.Width = Width;
        this.Height = Height;

        // Shape Color
        this.BackgroundColor = color("White");
        this.Outline = color("Black");
        this.HoverColor = color("Light Gray");

        // Text
        this.ContentText = "";
        this.ContentFont = "Verdania";
        this.ContentSize = 8;

        // Text Color
        this.ContentColor = color("Black");
        this.ContentHoverColor = color("White");

    }

    // Draws the button when called in draw()
    display(){

        // Shape
        stroke(this.Outline);
        fill(this.BackgroundColor);

        // Check if the mouse is inside the button
        if(this.contains(mouseX,mouseY)) fill(this.HoverColor);
        // Then draw the shape of the button
        ellipse(this.PositionX,this.PositionY,this.Width,this.Height);

        // Text

        textFont(this.ContentFont);
        textSize(this.ContentSize);
        fill(this.ContentColor);

        if(this.contains(mouseX,mouseY)) fill(this.ContentHoverColor);
        // Draw the text
        text(this.PositionX,this.PositionY);

    }

    // Changes the background color
    // REQUIRES: String
    setBackgroundColor(newColor){

        this.BackgroundColor = color(newColor);

    }

    // Changes the outline color
    // REQUIRES: String
    setOutlineColor(newColor){

        this.Outline = color(newColor);

    }

    // Changes the color of the button when the mouse is hovering over it
    // REQUIRES: String
    setHoverColor(newColor){

        this.HoverColor = color(newColor);

    }

    // Checks if the mouse is contained within the shape
    // REQUIRES: mouseX, mouseY
    contains(pointerX,pointerY){

        if(dist(pointerX,this.Y,this.X,this.Y) < Width && dist(pointerX,pointerY,this.X,this.Y) < Height){

            return true;

        }
        else return false;

    }

    // NOTE:
    // This function is required for using onMousePressed().

    // Set the text within the button
    // REQUIRES: String
    setText(newText){

        this.ContentText = newText;

    }

    // Change the font of the text
    // REQUIRES: String
    setFont(newFont){

        this.ContentFont = newFont;

    }

    // Change the size of the text
    // REQUIRES: Integer
    setSize(newSize){

        this.ContentSize = newSize;

    }

    // Set the color of the text
    // REQUIRES: String
    setTextColor(newColor){

        this.ContentColor = color(newColor);

    }

    // Set the color of the text when the mouse is hovering over the button
    // REQUIRES: String
    setTextHoverColor(newColor){

        this.ContentHoverColor = color(newColor);

    }

}
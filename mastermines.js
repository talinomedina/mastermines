//Making canvas variables
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//Setting current mode to empty (as opposed to easy or hard)
var mode = "empty";

//Setting the x/y value for the buttons clicked
var currentY = canvas.height - 210;
var currentX = 25;

//Setting x/y value for the pickable buttons and the "clicked" booleans for each button
var startY = canvas.height - 90;
var redX = 25;
var redNotClicked = true;
var blueX = 175;
var blueNotClicked = true;
var greenX = 325;
var greenNotClicked = true;
var orangeX = 475;
var orangeNotClicked = true;
var purpleX = 625;
var purpleNotClicked = true;
var pinkX = 775;
var pinkNotClicked = true;

//Declaring the max number of guesses, how many guesses the user used and an array for their current guess pick
var maxGuesses;
var userGuesses;
var currGuess = [];

//Making the start menu for the first round
startMenu();


//Function to color background
function background() {
    ctx.beginPath();
    ctx.rect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "#C0C2D3";
    ctx.fill();
    ctx.stroke();
}

//Function to draw start menu
function startMenu() {

    //Clearing menu and adding background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background();

    //Main part of menu
    ctx.beginPath();
    ctx.rect(300,500,300,200);
    ctx.fillStyle = "#8A8B93";
    ctx.fill();
    ctx.stroke();
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Please Pick A Difficulty",450,550);

    //Easy Button
    ctx.beginPath();
    ctx.rect(350,625,75,50);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Easy",387,650);

    //Hard Button
    ctx.beginPath();
    ctx.rect(475,625,75,50);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Hard",512,650);
}

function guessMenu() {

    //Background of button menu
    ctx.beginPath();
    ctx.rect(0,canvas.height-100,canvas.width,100);
    ctx.fillStyle = "#8A8B93";
    ctx.fill();
    ctx.stroke();

    //Drawing buttons
    red(redX,startY);
    blue(blueX,startY);
    green(greenX,startY);
    orange(orangeX,startY);
    purple(purpleX,startY);
    pink(pinkX,startY);

}

//Function to draw new guess
function newGuess() {

    //Incrementing userGuesses
    userGuesses++;

    //If user has not used all of their guesses, redraws menu and buttons and changes the y position of the next guess
    if(userGuesses < maxGuesses) {

        //Background of menu
        ctx.beginPath();
        ctx.rect(0,canvas.height-100,canvas.width,100);
        ctx.fillStyle = "#8A8B93";
        ctx.fill();
        ctx.stroke();

        //Clickable buttons
        red(redX,startY);
        blue(blueX,startY);
        green(greenX,startY);
        orange(orangeX,startY);
        purple(purpleX,startY);
        pink(pinkX,startY);

        //Changing y
        currentY -= 120;

    }

    //If user has used all of their guesses, resets mode, alerts loser it has lost and resets the y value for the next guess
    else {
        mode = "empty";
        alert("You lose..for now!");
        startMenu();
        currentY = canvas.height - 210;
    }

    //Changing buttons back to being unclicked (they are now all clickable again)
    redNotClicked = true;
    blueNotClicked = true;
    greenNotClicked = true;
    orangeNotClicked = true;
    purpleNotClicked = true;
    pinkNotClicked = true;

    //Resetting x value for next guess
    currentX = 25;

    currGuess.splice(0,currGuess.length);

}

//Function to draw normal red button
function red(x,y) {

    ctx.beginPath();
    ctx.rect(x,y,100,80);
    ctx.fillStyle = "#C0392B";
    ctx.fill();
    ctx.stroke();

}

//Function to draw clicked red button
function offRed(x,y) {

    ctx.beginPath();
    ctx.rect(x,y,100,80);
    ctx.fillStyle = "#273746";
    ctx.fill();
    ctx.stroke();

}

//Function to draw normal blue button
function blue(x,y) {

    ctx.beginPath();
    ctx.rect(x,y,100,80);
    ctx.fillStyle = "#2980B9";
    ctx.fill();
    ctx.stroke();

}

//Function to draw clicked blue button
function offBlue(x,y) {

    ctx.beginPath();
    ctx.rect(x,y,100,80);
    ctx.fillStyle = "#273746";
    ctx.fill();
    ctx.stroke();

}

//Function to draw normal green button
function green(x,y) {

    ctx.beginPath();
    ctx.rect(x,y,100,80);
    ctx.fillStyle = "#27AE60";
    ctx.fill();
    ctx.stroke();

}

//Function to draw clicked green button
function offGreen(x,y) {

    ctx.beginPath();
    ctx.rect(x,y,100,80);
    ctx.fillStyle = "#273746";
    ctx.fill();
    ctx.stroke();

}

//Function to draw normal orange button
function orange(x,y) {

    ctx.beginPath();
    ctx.rect(x,y,100,80);
    ctx.fillStyle = "#E67E22";
    ctx.fill();
    ctx.stroke();

}

//Function to draw clicked orange button
function offOrange(x,y) {

    ctx.beginPath();
    ctx.rect(x,y,100,80);
    ctx.fillStyle = "#273746";
    ctx.fill();
    ctx.stroke();

}

//Function to draw normal purple button
function purple(x,y) {

    ctx.beginPath();
    ctx.rect(x,y,100,80);
    ctx.fillStyle = "#8E44AD";
    ctx.fill();
    ctx.stroke();

}

//Function to draw clicked purple button
function offPurple(x,y) {

    ctx.beginPath();
    ctx.rect(x,y,100,80);
    ctx.fillStyle = "#273746";
    ctx.fill();
    ctx.stroke();

}

//Function to draw normal pink button
function pink(x,y) {

    ctx.beginPath();
    ctx.rect(x,y,100,80);
    ctx.fillStyle = "#E6B0AA";
    ctx.fill();
    ctx.stroke();

}

//Function to draw clicked pink button
function offPink(x,y) {

    ctx.beginPath();
    ctx.rect(x,y,100,80);
    ctx.fillStyle = "#273746";
    ctx.fill();
    ctx.stroke();

}

//Function to find if a click has intersected with the easy button
function intersectsEasy(x,y) {

    return (x < 425) && (x > 350) && (y < 675) && (y > 625);

}

//Function to find if a click has intersected with the hard button
function intersectsHard(x,y) {

    return (x < 550) && (x > 475) && (y < 675) && (y > 625);

}

//Function to find if a click has intersected with the red button
function intersectsRed(x,y) {

    return (x < 125) && (x > 25) && (y < 1490) && (y > 1410);

}

//Function to find if a click has intersected with the blue button
function intersectsBlue(x,y) {

    return (x < 275) && (x > 175) && (y < 1490) && (y > 1410);

}

//Function to find if a click has intersected with the green button
function intersectsGreen(x,y) {

    return (x < 425) && (x > 325) && (y < 1490) && (y > 1410);

}

//Function to find if a click has intersected with the orange button
function intersectsOrange(x,y) {

    return (x < 575) && (x > 475) && (y < 1490) && (y > 1410);

}

//Function to find if a click has intersected with the purple button
function intersectsPurple(x,y) {

    return (x < 725) && (x > 625) && (y < 1490) && (y > 1410);

}

//Function to find if a click has intersected with the pink button
function intersectsPink(x,y) {

    return (x < 885) && (x > 775) && (y < 1490) && (y > 1410);

}

//Listening for mouse clicks
canvas.addEventListener("mousedown", change, false);

//Function to work with the mouse clicks
function change(event) {
    var x = event.offsetX;
    var y = event.offsetY;

    //Allows the easy/hard buttons to work if mode has not been picked
    if(mode == "empty") {

        //If easy button is clicked, sets mode and max number of guesses and draws background and guess menu
        if( intersectsEasy(x,y) ) {
            mode = "easy";
            maxGuesses = 10;
            userGuesses = 0;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            background();
            guessMenu();
        }

        //If easy button is clicked, sets mode and max number of guesses and draws background and guess menu
        else if( intersectsHard(x,y) ) {
            mode = "hard";
            maxGuesses = 8;
            userGuesses = 0;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            background();
            guessMenu();
        }
    }

    //If a button is clicked for first time, adds color to array and draws the button in current guess area
    //Also changes x position for next color guessed and makes a new guess if they have picked their fourth color
    else if(redNotClicked && intersectsRed(x,y)) {
        offRed(redX,startY);
        redNotClicked = false;
        currGuess.push("red");
        red(currentX,currentY);
        currentX += 150;
        if(currGuess.length >= 4) {
            newGuess();
        }
    }
    else if(blueNotClicked && intersectsBlue(x,y)) {
        offBlue(blueX,startY);
        blueNotClicked = false;
        currGuess.push("blue");
        blue(currentX,currentY);
        currentX += 150;
        if(currGuess.length >= 4) {
            newGuess();
        }
    }
    else if(orangeNotClicked && intersectsOrange(x,y)) {
        offOrange(orangeX,startY);
        orangeNotClicked = false;
        currGuess.push("orange");
        orange(currentX,currentY);
        currentX += 150;
        if(currGuess.length >= 4) {
            newGuess();
        }
    }
    else if(greenNotClicked && intersectsGreen(x,y)) {
        offGreen(greenX,startY);
        greenNotClicked = false;
        currGuess.push("green");
        green(currentX,currentY);
        currentX += 150;
        if(currGuess.length >= 4) {
            newGuess();
        }
    }
    else if(purpleNotClicked && intersectsPurple(x,y)) {
        offPurple(purpleX,startY);
        purpleNotClicked = false;
        currGuess.push("purple");
        purple(currentX,currentY);
        currentX += 150;
        if(currGuess.length >= 4) {
            newGuess();
        }
    }
    else if(pinkNotClicked && intersectsPink(x,y)) {
        offPink(pinkX,startY);
        pinkNotClicked = false;
        currGuess.push("pink");
        pink(currentX,currentY);
        currentX += 150;
        if(currGuess.length >= 4) {
            newGuess();
        }
    }

}

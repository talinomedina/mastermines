//Making canvas variables
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//Setting current mode to empty (as opposed to easy or hard)
var mode = "empty";
var newGame = "on";
var end = "lose";

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
var imageX = 700;
var lineY = canvas.height - 120;

var minutes = 12;

//Declaring the max number of guesses, how many guesses the user used and an array for their current guess pick
var maxGuesses;
var userGuesses;
var currGuess = [];

//Declaring variables to hold the number of correct colors in both right and wrong positions
var correctPosition = 0;
var wrongPosition = 0;

//Declaring variables for the solution and the reference array for colors
var solution = [];
var colors = ["red","blue","orange","green","purple","pink"];
var tempColors = [];

//Declaring variable to hold current picture representing how correct the guess is
var guessImage = new Image();

//Declaring variable to check whether the guess=solution
var solved = false;

//Declaring variables for timer and scoring
var startTime = 0, endTime = 0, score = 0;
var totalSecondsElapsed = 0, minutesElapsed = 0, secondsRemainder = 0;

//Defining timing and scoring functions
function startTimer() {
    startTime = new Date();
};

function endTimer() {
    endTime = new Date();
    var timeDiff = endTime - startTime; //in ms
    // strip the ms
    timeDiff /= 1000;
    
    // get seconds and minutes
    totalSecondsElapsed = Math.round(timeDiff);
    minutesElapsed = Math.round(totalSecondsElapsed/60);
    secondsRemainder = (totalSecondsElapsed % 60);
}

function calcScore(unusedGuess, timeElapsed, totalGuess){
    var modeMultiplier = 1;
    if(totalGuess == 8){ modeMultiplier = 5;}
    //alert("score fn called, mode: " + totalGuess + " GR: " + unusedGuess + " tE: " + timeElapsed);
    return Math.round((unusedGuess * (1/timeElapsed) * modeMultiplier * 10000));
}

function getScore(){
    alert("score is " + score)
    return score;
}
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
    ctx.font = "bold 20px monospace";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Please Pick A Difficulty",450,550);

    //Easy Button
    ctx.beginPath();
    ctx.rect(350,625,75,50);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();
    ctx.font = "20px monospace";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Easy",387,650);

    //Hard Button
    ctx.beginPath();
    ctx.rect(475,625,75,50);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();
    ctx.font = "20px monospace";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Hard",512,650);

    //Unclicking buttons
    redNotClicked = true;
    blueNotClicked = true;
    greenNotClicked = true;
    orangeNotClicked = true;
    purpleNotClicked = true;
    pinkNotClicked = true;
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

    //Box to print current guess number
    ctx.beginPath();
    ctx.rect(350,0,150,100);
    ctx.fillStyle = "#8A8B93";
    ctx.fill();
    ctx.stroke();
    
    
    //Printing current number of guesses
    ctx.font = "20px monospace";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(userGuesses + " out of " + maxGuesses,425,40);
    

    //Prints guesses used
    ctx.font = "20px monospace";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Guesses Used",425,70);

    //If user has not used all of their guesses, redraws menu and buttons and changes the y position of the next guess
    if(userGuesses < maxGuesses) {

        //Check guess/assign picture
        checkGuess();

        //Prints image of right/wrong next to guess
        ctx.drawImage(guessImage,imageX,currentY);           


        //Change to if not right variable
        if(!solved) {

            //Drawing new red lines around current guess
            clearLine(lineY + 100);
            //blackLine(lineY + 100);
            lineY -= 100;
            redLine(lineY);

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
            currentY -= 100;

            //Changing buttons back to being clickable
            redNotClicked = true;
            blueNotClicked = true;
            greenNotClicked = true;
            orangeNotClicked = true;
            purpleNotClicked = true;
            pinkNotClicked = true;



        }

        else {

            mode = "empty";
            newGame = "off";
            end = "win";

            //ENDTIMER() FUNCTION CALLED HERE
            endTimer();
            winLose();
            currentY = canvas.height - 210;

            //Changing buttons back to being unclickable
            redNotClicked = false;
            blueNotClicked = false;
            greenNotClicked = false;
            orangeNotClicked = false;
            purpleNotClicked = false;
            pinkNotClicked = false;

        }

    }

    //If user has used all of their guesses, resets mode, alerts loser it has lost and resets the y value for the next guess
    else {
        mode = "empty";
        newGame = "off";
        //ENDTIMER() FUNCTION CALLED HERE
        endTimer();
        winLose();
        currentY = canvas.height - 210;

        //Changing buttons back to being unclickable
        redNotClicked = false;
        blueNotClicked = false;
        greenNotClicked = false;
        orangeNotClicked = false;
        purpleNotClicked = false;
        pinkNotClicked = false;
    }

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

//Function to draw red line (doubled so its not transparent)
function redLine(y) {

    ctx.beginPath();
    ctx.moveTo(0,y);
    ctx.lineTo(canvas.width,y);
    ctx.strokeStyle = "#FF0000";
    ctx.stroke();
    ctx.strokeStyle = "#000000";

    ctx.beginPath();
    ctx.moveTo(0,y);
    ctx.lineTo(canvas.width,y);
    ctx.strokeStyle = "#FF0000";
    ctx.stroke();
    ctx.strokeStyle = "#000000";

}

//Function to draw black line (doubled so its not transparent)
function blackLine(y) {

    ctx.beginPath();
    ctx.moveTo(0,y);
    ctx.lineTo(canvas.width,y);
    ctx.strokeStyle = "#000000";
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0,y);
    ctx.lineTo(canvas.width,y);
    ctx.strokeStyle = "#000000";
    ctx.stroke();

}

//Function to clear red line
function clearLine(y) {

    for(i = 0; i < 3; ++i) {

        ctx.beginPath();
        ctx.moveTo(0,y);
        ctx.lineTo(canvas.width,y-1);
        ctx.strokeStyle = "#C0C2D3";
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0,y);
        ctx.lineTo(canvas.width,y);
        ctx.strokeStyle = "#C0C2D3";
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0,y);
        ctx.lineTo(canvas.width,y+1);
        ctx.strokeStyle = "#C0C2D3";
        ctx.stroke();

    }

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

//Function to find if a click has intersected the new game button
function intersectsNewGame(x,y) {
    return (x < 500) && (x > 400) && (y < 685) && (y > 635);
}

//Listening for mouse clicks
canvas.addEventListener("mousedown", change, false);

//Function to work with the mouse clicks
function change(event) {
    var x = event.offsetX;
    var y = event.offsetY;

    //Allows the easy/hard buttons to work if mode has not been picked
    if(mode == "empty" && newGame == "on") {
        

        //If easy button is clicked, sets mode and max number of guesses and draws background and guess menu
        if( intersectsEasy(x,y) ) {
            mode = "easy";
            maxGuesses = 10;
            userGuesses = 0;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            background();
            guessMenu();
            lineY = canvas.height - 120;
            redLine(lineY);
            lineY -= 100;
            redLine(lineY);
            startTimer();         //STARTTIMER() FUNCTION CALLED HERE
            makeSolution();
            update_scores();
        }

        //If hard button is clicked, sets mode and max number of guesses and draws background and guess menu
        else if( intersectsHard(x,y) ) {
            mode = "hard";
            maxGuesses = 8;
            userGuesses = 0;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            background();
            guessMenu();
            lineY = canvas.height - 120;
            redLine(lineY);
            lineY -= 100;
            redLine(lineY);
            startTimer();        //STARTTIMER() CALLED HERE
            makeSolution();
            update_scores();
        }
    }

    //If new game button is clicked, starts new game (with new start menu)
    else if(mode == "empty" && newGame == "off" && intersectsNewGame(x,y)) {
        newGame = "on";
        startMenu();
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

//Function to annouce win/loss
function winLose() {   

    //Setting up x and y to print solution
    currentX = 25;
    currentY = 120;

    //Writing "Solution" text
    ctx.font = "20px monospace";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Solution",currentX+50,currentY-25); 

    //Print out solution here with currentX and currentY
    //Use color() functions (ie red(currentX, currentY), pink(currentX, currentY), etc)
    //Increment x by 150 after each print but keep y the same

    for (var i = 0; i < solution.length; i++) {
        if (solution[i] == "red") {
            red(currentX, currentY);
        }
        else if (solution[i] == "orange") {
            orange(currentX, currentY);
        }
        else if (solution[i] == "green") {
            green(currentX, currentY);
        }
        else if (solution[i] == "blue") {
            blue(currentX, currentY);
        }
        else if (solution[i] == "pink") {
            pink(currentX, currentY);
        }
        else if (solution[i] == "purple") {
            purple(currentX, currentY);
        }

        currentX += 150;

    }

    //Printing last guess
    currentX = 25;
    currentY = 260;

    //Writing "Last Guess" text
    ctx.font = "20px monospace";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Last Guess",currentX+50,currentY-25); 

    //Print out solution here with currentX and currentY
    //Use color() functions (ie red(currentX, currentY), pink(currentX, currentY), etc)
    //Increment x by 150 after each print but keep y the same

    for (var i = 0; i < currGuess.length; i++) {
        if (currGuess[i] == "red") {
            red(currentX, currentY);
        }
        else if (currGuess[i] == "orange") {
            orange(currentX, currentY);
        }
        else if (currGuess[i] == "green") {
            green(currentX, currentY);
        }
        else if (currGuess[i] == "blue") {
            blue(currentX, currentY);
        }
        else if (currGuess[i] == "pink") {
            pink(currentX, currentY);
        }
        else if (currGuess[i] == "purple") {
            purple(currentX, currentY);
        }

        currentX += 150;

    }

    //background
    ctx.beginPath();
    ctx.rect(300,500,300,250);
    ctx.fillStyle = "#8A8B93";
    ctx.fill();
    ctx.stroke();

    //text
    ctx.font = "20px monospace";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    if(end == "lose") {
        ctx.fillText("You lose!",450,550);
    }
    else {
        ctx.fillText("You win!",450,550);
        //printing score
        score = calcScore((maxGuesses - userGuesses),totalSecondsElapsed, maxGuesses);
        ctx.fillText("Your score is " + score + "!",450,720); //FINDME
        highscore(score);
        
    }

    //Printing out time
    ctx.font = "15px monospace";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("You finished in " + minutesElapsed + " minutes",450,575);
    ctx.fillText("and " + secondsRemainder + " seconds",450,600);

    //Printing out number of guesses
    ctx.font = "15px monospace";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("with " + userGuesses + " guesses",450,625);

    //New game button
    ctx.beginPath();
    ctx.rect(400,638,100,50);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();
    ctx.font = "15px monospace";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("New Game",450,668);
    end = "lose";

}

//Function to make randomized solution
function makeSolution() {
    solution = [];
    if (mode=="easy") {
        randomGenerator(4);
    }
    else {
        randomGenerator(4);
    }
}

//Random color generator function
function randomGenerator(values) {
    
    var colors = ["red","blue","orange","green","purple","pink"];
    var remainingNumbers = values;
    tempColors = [];
    tempColors = colors;
    var num;
    
    while(remainingNumbers > 0) {
        num = (Math.floor(Math.random() * tempColors.length));
        solution.push(tempColors[num]);
        tempColors.splice(num,1);
        remainingNumbers--;
    }
}

//Function to check what is right/wrong with guess
function checkGuess() {
    correctPosition = 0;
    wrongPosition = 0;

    for (var index=0; index<solution.length; index++) {
        if (correctP(index)) {
            correctPosition++;
        }

        else if (wrongP(index)) {
            wrongPosition++;
        }
    }

    pictureChoice();
}

//Function to check if the index is the right color in the right position
function correctP(index) {
    return (currGuess[index]==solution[index]);
}

//Function to check if the index is the right color but at the wrong location
function wrongP(index) {
    var found = false;

    for(var i = 0; i < solution.length; i++) {
        if (currGuess[index]==solution[i]) {
            found = true;
        }
    }

    return found;
}

//Function to set correct picture
function pictureChoice() {
    solved = false;
    if (correctPosition==0) {
        if (wrongPosition==0) {
            guessImage = document.getElementById("zero_zero");
        }
        else if (wrongPosition==1) {
            guessImage = document.getElementById("zero_one");
        }
        else if (wrongPosition==2) {
            guessImage = document.getElementById("zero_two");
        }
        else if (wrongPosition==3) {
            guessImage = document.getElementById("zero_three");
        }
        else {
            guessImage = document.getElementById("zero_four");
        }

    }

    else if (correctPosition==1) {
        if (wrongPosition==0) {
            guessImage = document.getElementById("one_zero");
        }
        else if (wrongPosition==1) {
            guessImage = document.getElementById("one_one");
        }
        else if (wrongPosition==2) {
            guessImage = document.getElementById("one_two");
        }
        else if (wrongPosition==3) {
            guessImage = document.getElementById("one_three");
        }
     
    }

    else if (correctPosition==2) {
        if (wrongPosition==0) {
            guessImage = document.getElementById("two_zero");
        }
        else if (wrongPosition==1) {
            guessImage = document.getElementById("two_one");
        }
        else if (wrongPosition==2) {
            guessImage = document.getElementById("two_two");
        }
     
    }    

    else if (correctPosition==3) {
        if (wrongPosition==0) {
            guessImage = document.getElementById("three_zero");
        }
        else if (wrongPosition==1) {
            guessImage = document.getElementById("three_one");
        }
    }  

    else if (correctPosition==4) {
        guessImage = document.getElementById("four_zero");
        solved=true;
    }

}


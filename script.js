var gamePattern = [];
var userClickedPattern = [];

// new variable called level and start at level 0.
var level = 0;
var win = true;

//Colors of buttons
var buttonColours = ["red", "blue", "green", "yellow"];

async function nextSequence() {
    level++;
    document.querySelector("#level-title").innerHTML = "Level " + level;
    await sleep(1000);
    //Chooses a random number from 0 to 3
    var randomNumber = Math.floor(Math.random() * 4);
    //Chooses a random color
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    // console.log('GamePattern : ',gamePattern);
    DisplayPattern(gamePattern);
    checkAnswer(userClickedPattern.length-1);
};

//jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
document.body.addEventListener("keydown", function () {
    if(gamePattern.length == 0){
        nextSequence();
    }
});

$(".btn").click(handler);
async function handler() {
  var userChosenColour = this.id; //userChosenColour stores the id of the button that got clicked
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
//   console.log('userChosenColour : ',userChosenColour);
}

//a new function called animatePress()
function animatePress(currentColour) {
    playsound(currentColour);
    document.querySelector("." + currentColour).classList.add("pressed");  
    setTimeout(function () {
      document.querySelector("." + currentColour).classList.remove("pressed");
    }, 100);
}

//Giving audio to button
function playsound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//Display Level gamePattern
async function DisplayPattern(gamePattern) {
    for (let i = 0; i < gamePattern.length; i++) {
        animatePress(gamePattern[i]);
        await sleep(1000);
    }
}

//Sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
async function checkAnswer(currentLevel) {
    // console.log('i am here');
    if(gamePattern.length == userClickedPattern.length){
        for (let i = 0; i < gamePattern.length; i++) {
            if(gamePattern[i]!=userClickedPattern[i])
            {
                win = false;
                break;
            }
        }
        userClickedPattern = [];
        if(win==true)
        {
            nextSequence();
        }
        else{
            playsound('wrong');
            await sleep(1000);
            DisplayPattern(gamePattern);
            // console.log('userClickedPattern : ',userClickedPattern);
            win = true;
        }
    }
}

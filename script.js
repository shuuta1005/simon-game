var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;

//Start the game
$(document).keypress(function () {
  if (!started) {
    $("#level").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//Next Sequence function
function nextSequence() {
  userClickedPattern = [];

  //Handle Levels
  level = level + 1;

  //Update currentLevel
  $("#level").text("Level " + level);

  //Generate a random Color
  var randomNum = Math.floor(Math.random() * 4);
  var randomColor = buttonColors[randomNum];
  gamePattern.push(randomColor);

  //Add a flash effect
  animateButton(randomColor, "selected-color");
  //Add a sound effect
  playSound(randomColor);
}

//Click handler
$(".simon-button").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);

  playSound(userChosenColour);

  animateButton(userChosenColour, "pressed");

  checkAnswer(userClickedPattern.length - 1);
});

//Play Sound function
function playSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

//Animate button function
function animateButton(currentColor, animation) {
  //Add an animation effect
  $("#" + currentColor).addClass(animation);

  //Remove the animation
  setTimeout(function () {
    $("#" + currentColor).removeClass(animation);
  }, 100);
}

//Check Answer function
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    animateButton("body", "game-over");
    console.log("wrong");
    $("#level").text("Game Over, Press Any Key to Restart");

    restart();
  }
}

function restart() {
  level = 0;
  gamePattern = [];
  started = false;
}

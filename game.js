var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

function startGame() {
  if (!started) {
    $("#start-instruction").hide();
    level = 0; 
    $("#level-title").text("Level 1");
    nextSequence();
    started = true;
  }
}

$(document).on("keydown", function(event) {
  if (event.key.toLowerCase() === "s") {
    startGame();
  }
});

$(".btn").click(function() {
  if (!started) return; 

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title")
      .text("Game Over!")
      .addClass("game-over-animate");

    setTimeout(function () {
      $("body").removeClass("game-over");
      $("#level-title").removeClass("game-over-animate");
      startOver();
    }, 1200);
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
  $("#level-title").fadeOut(300, function() {
    $("#level-title").text("Simon Game").fadeIn(300);
    $("#start-instruction").fadeIn(300);
  });
}

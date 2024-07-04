
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    started = true;
    nextSequence();

    
  }
});

$(".btn").click(function(event) {
 
  var userChosenColour = event.target.id //, red  ,blue
  userClickedPattern.push(userChosenColour); // ,red ,red,blue

  playSound(userChosenColour);
  animatePress(userChosenColour);
   
  checkAnswer(userClickedPattern.length-1); //,0  ,1
});

function checkAnswer(currentLevel) {
//gamepattern =[red , blue , green]
//userclickedpattern = [red]
//userclickedpattern = [red ,blue]
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) { // ,red = red  , gamepattern[1]=userclickedpatter[1] i.e blue=blue
      if (userClickedPattern.length === gamePattern.length){ // ,1 not equal 3  ,2 not equal 2 , 3 =3  
        setTimeout(function () {
          nextSequence(); // <--- code excuted when both if true and after 1 sec delay
        }, 1000);
        //nextSequence(); //when gamepattern.lenth = userclciked pattern.lenth then only nextsequence will be called
      }
      else{
        console.log("waiting for another key to be pressed so again whole currentlvel checking will be done for the key that is pressed....")
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);  // red  , red blue green

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
  started = false;
}

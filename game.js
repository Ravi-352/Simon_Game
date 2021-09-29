var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

var started = false;

$(document).keydown(function(){
    if(!started){
               
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});


function nextSequence(){
    var randomNumber = Math.floor(Math.random()*3) + 1;
    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    var buttonId = "#" + randomChosenColor;
    
    $(buttonId).fadeIn(100).fadeOut(100).fadeIn(100);
    
    var audioFile = "sounds/" + randomChosenColor + ".mp3";

    playSound(audioFile);
    
    level++;
    $("#level-title").text("Level " + level);

    
}



$(".btn").on("click", function(){
    var userClickedButton = $(this).attr("id");
    
    userClickedPattern.push(userClickedButton);
    var audioFile = "sounds/" + userClickedButton + ".mp3";

    playSound(audioFile);
    animatePress(userClickedButton);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    
    var audio = new Audio(name);
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
    


}


function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        console.log("wrong");
        playSound("sounds/wrong.mp3");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");

        },200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }


}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;

}





var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;


$(document).keypress(function (event) {
    if (!started) {
        nextSequence();
        $("#level-title").text("Level " + level);
        started = true;
    }
});

$(".btn").on("click", function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
   

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
    

    if (userClickedPattern.length === gamePattern.length) {
        setTimeout(function () {
            nextSequence();
        }, 3000);
    }
}


    else {
        console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout (function() {
        $("body").removeClass("game-over"); } ,200 );
   
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
} 
}



function nextSequence() {
    userClickedPattern = [];
    $("#level-title").text("Level " + level);
    level++;
    
    var RandomNumber = Math.floor(Math.random() * 4);

    // console.log("RandomNumber is"+ RandomNumber)
    var randomChosenColour = buttonColours[RandomNumber];

    // console.log("the colour chosed first " + randomChosenColour);
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    const audio = new Audio("./sounds/" + randomChosenColour + ".mp3");
    console.log("audio played" + audio);
    audio.play();

}


function playSound(name) {
    const audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed")
    }, 100);
    // $("#"+currentColour).addClass("pressed").delay( 100 ).removeClass("pressed"); this one doesnt work

    // console.log("current colour shadow box is " + currentColour);
}


function startOver(){
    level = 0 ;
    gamePattern = [];
    started = false;

}











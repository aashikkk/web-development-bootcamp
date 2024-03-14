var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];
var gamePattern = [];

var started = false;

var level = 0;

$(document).keydown(function () {
    if (!started) {
        $("#level-title").text(`Level ${level}`);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    // console.log(userClickedPattern);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text(`Level ${level}`);
    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour)
        .fadeOut(100)
        .fadeIn(100);

    playSound(randomChosenColour);
    console.log("next sequence is running");
}

function playSound(name) {
    var sound = new Audio(`sounds/${name}.mp3`);
    sound.play();
}

function animatePress(currentColour) {
    $(`#${currentColour}`).addClass("pressed");
    setTimeout(() => {
        $(`#${currentColour}`).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

// $(document).one("keydown", function () {
//     $("#level-title").text(`Level ${level}`);
//     nextSequence();
// });

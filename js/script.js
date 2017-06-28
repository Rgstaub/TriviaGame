"use strict";

/* Psuedo code

Questions will be presented as the theme songs of various 90s TV shows and movies.
Music starts the question and a player is given several options for a sitcom or movie
timer begins
check clicks on button to see if the answer is correct
display result to player. must show correct answer.
start a new game. Increment score if correct.

each question is an object, consisting of
	song url
	answer 1-x {
		text: ""
		correct: false
	}

*/

//global game-state variables
var gameOver = true;
var gameOn = false;
var currQuestion = {};

var questions = {
	"q1": {
		solution: "Family Matters",
		options: ["Growing Pains",
				"Family Matters",
				"Full House",
				"Home Improvement"],
		audio: "audio/music.mp3"
	},
}

//make the start button
var startButton = $("<button/>").attr("id", "startButton").addClass("uiButton");
startButton.text("START");
$("#interface").append(startButton);

//begin the game if the game is over
startButton.on("click", function() {
	if (gameOver === true) {
		console.log("started new game");
		gameOver = false;
		gameOn = true;
		newQuestion();
	}
})

//Set the current question. Start the music and display the options
function newQuestion () {
	currQuestion = questions.q1;
	// var music = $("audio");  consider creating a music div with autoplay on the fly using the audio obj attr

	//make a button for each option
	for (var i = 0; i < 4; i++) {
		var opt = currQuestion.options[i];
		console.log(opt);
		var choice = $("button.choice").eq(i);
		choice.attr("data-text", opt);
		console.log($(".choice").eq(i));
		choice.text(opt);
		
		
		
		
	}
}

$(".choice").on("click", function() {
	
	var picked = $(this).attr("data-text");
	console.log(picked);

})
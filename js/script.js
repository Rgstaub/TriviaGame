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

var gameOver = true;

var questions = {
	"1": {
		solution: "Family Matters",
		option1: "Growing Pains",
		option2: "Family Matters",
		option3: "Full House",
		option4: "Home Improvement"
	},
}

var startButton = $("<button/>").attr("id", "startButton").addClass("btn btn-lg");
startButton.text("START");
$("#interface").append(startButton);

startButton.on("click", function() {
	if (gameOver === true) {
		console.log("started new game");
		gameOver = false;
	}
})
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
var questionList = ["q1", "q2", "q3", "q4"];
var questions = {
	"q0": {
		solution: "Full House",
		options: ["Growing Pains",
				"Family Matters",
				"Full House",
				"Home Improvement"],
		audio: "audio/fullHouse.mp3",
		tag: "fullHouse"
	},
	"q1": {
		solution: "Family Matters",
		options: ["Growing Pains",
				"Family Matters",
				"Full House",
				"Home Improvement"],
		audio: "audio/familyMatters.mp3",
		tag: "familyMatters"
	},
	"q2": {
		solution: "Growing Pains",
		options: ["Family Matters",
				"Growing Pains",
				"Full House",
				"Home Improvement"],
		audio: "audio/growingPains.mp3",
		tag: "growingPains"
	},
	"q3": {
		solution: "homeImprovement",
		options: ["Growing Pains",
				"homeImprovement",
				"Full House",
				"Home Improvement"],
		audio: "audio/homeImprovement.mp3",
		tag: "homeImprovement"
	},

}

//make the start button
var startButton = $("<button/>").attr("id", "startButton").addClass("uiButton");
startButton.text("START");
$("#interface").append(startButton);

//Set the current question. Start the music and display the options
function newQuestion () {
	var random = Math.floor(Math.random() * questionList.length);
	console.log(random);
	currQuestion = questions["q" + random];
	console.log(currQuestion);;
	console.log("Solution: " + currQuestion.solution);
	//create a new audio element with a source passed from the new question
		// var music = $("<audio>").attr("src", currQuestion.audio).attr("id", currQuestion.tag);
		// $("#title").append(music);
	//start playing the music
	document.getElementById(currQuestion.tag).play();
	//make a button for each option
	for (var i = 0; i < 4; i++) {
		var opt = currQuestion.options[i];
		var choice = $("button.choice").eq(i);
		choice.attr("data-text", opt);
		choice.text(opt);
	}
}		
		
	


//begin the game if the game is over
startButton.on("click", function() {
	if (gameOver === true) {
		console.log("started new game");
		gameOver = false;
		gameOn = true;
		startButton.css("display", "none");
		newQuestion();
	}
})

	
		


$(".choice").on("click", function() {
	
	var picked = $(this).attr("data-text");
	console.log(picked);
	if (picked === currQuestion.solution) {
		alert("correct!");
	}
	else if (picked !== currQuestion.solution) {
		alert("incorrect");
	}
	else {
		alert("ERROR");
	}

})
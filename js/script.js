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
var correct = 0;
var incorrect = 0;
var gameTimer;
var solutionTimer;
var time = 30;

var currQuestion = {};
var questionList = ["q0", "q1", "q2", "q3"];
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
		solution: "Home Improvement",
		options: ["Growing Pains",
				"Family Matters",
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


function countDown() {
	$("#timer").text(time);
	time--;
	if (time === 0) {
		$("#messageBoard").text("Time Expired. The correct answer was " + currQuestion.solution)
		clearInterval(gameTimer);
		solutionTimer = setInterval(function() {clearAnswer()}, 4000);
		incorrect++;
		var song = document.getElementById(currQuestion.tag);
		song.pause();
		song.currentTime = 0;

	}
}

function clearAnswer() {
	$("#messageBoard").text("");
	clearInterval(solutionTimer);
	newQuestion();
}


//display results and reset game variables
function endGame() {
	alert("Game Over\nCorrect: " + correct + "\nIncorrect: " + incorrect);
	startButton.css("display", "inline-block");
	gameOver = true;
	gameOn = false;
	correct = 0;
	incorrect = 0;
	questionList = ["q0", "q1", "q2", "q3"];
	$(".choice").each(function() {
		$(this).text("");
		$(this).css("display", "none");
	})
	$("#timer").text("");
}	

//Set the current question. Start the music and display the options
function newQuestion() {
	if (questionList.length < 1) {
		endGame();
	}
	else {
		//randomly select a question and remove that question from the pool of possible questions
		time = 30;
		var random = Math.floor(Math.random() * questionList.length);
		currQuestion = questions[questionList[random]]; 
		//start playing the music
		document.getElementById(currQuestion.tag).play();
		//make a button for each option
		for (var i = 0; i < 4; i++) {
			var opt = currQuestion.options[i];
			var choice = $("button.choice").eq(i);
			choice.attr("data-text", opt);
			choice.text(opt);
			choice.css("display", "inline-block");
		}
		questionList.splice(random, 1);
		gameTimer = setInterval(function() {countDown()}, 1000);
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
		//stop and reset the current audio
		correct++;
		clearInterval(gameTimer);
		console.log("score: " + correct)
		var song = document.getElementById(currQuestion.tag);
		song.pause();
		song.currentTime = 0;
		$("#messageBoard").text("Correct!");
		solutionTimer = setInterval(function() {clearAnswer()}, 4000);
	}
	else if (picked !== currQuestion.solution) {
		incorrect++;
		clearInterval(gameTimer);
		console.log("incorrect: " + incorrect)
		var song = document.getElementById(currQuestion.tag);
		song.pause();
		song.currentTime = 0;
		$("#messageBoard").html("Incorrect\nThe correct answer was " + currQuestion.solution);
		solutionTimer = setInterval(function() {clearAnswer()}, 4000);
	}
	else {
		alert("ERROR");
	}

})
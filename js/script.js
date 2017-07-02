"use strict";

/* Psuedo code

Questions will be presented as the theme songs of various 90s TV shows and movies.
Music starts the question and a player is given several options for a sitcom or movie
timer begins
check clicks on button to see if the answer is correct
display result to player. must show correct answer.
start a new game. Increment score if correct.

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
// This variable will be used to remove the already-answered questions from the pool of possible questions
// and end the game when no more questions remain
var questionList = ["q0", "q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10", "q11", 
					"q12", "q13", "q14", "q15", "q16", "q17", "q18", "q19"];
var questions = {
	"q0": {
		solution: "Full House",
		options: ["7th Heaven",
				"Family Matters",
				"Full House",
				"Step By Step"],
		audio: "audio/fullHouse.mp3",
		tag: "fullHouse"
	},
	"q1": {
		solution: "Family Matters",
		options: ["Full House",
				"Family Matters",
				"The King of Queens",
				"the Nanny"],
		audio: "audio/familyMatters.mp3",
		tag: "familyMatters"
	},
	"q2": {
		solution: "Growing Pains",
		options: ["Daria",
				"Growing Pains",
				"That 70's Show",
				"Doogie Howser"],
		audio: "audio/growingPains.mp3",
		tag: "growingPains"
	},
	"q3": {
		solution: "Home Improvement",
		options: ["Seinfeld",
				"Sabrina",
				"Spin City",
				"Home Improvement"],
		audio: "audio/homeImprovement.mp3",
		tag: "homeImprovement"
	},
	"q4": {
		solution: "Blossom",
		options: ["Daria",
				"The Cosby Show",
				"The Drew Carey Show",
				"Blossom"],
		audio: "audio/blossom.mp3",
		tag: "blossom"
	},
	"q5": {
		solution: "Boy Meets World",
		options: ["Boy Meets World",
				"Freaks and Geeks",
				"Sabrina",
				"Becker"],
		audio: "audio/boyMeetsWorld.mp3",
		tag: "boyMeetsWorld"
	},
	"q6": {
		solution: "Coach",
		options: ["the West Wing",
				"Wings",
				"Coach",
				"Salute your Shorts"],
		audio: "audio/coach.mp3",
		tag: "coach"
	},
	"q7": {
		solution: "Everybody Loves Raymond",
		options: ["The Golden Girls",
				"Daria",
				"The King of Queens",
				"Everybody Loves Raymond"],
		audio: "audio/everybodyLovesRaymond.mp3",
		tag: "everybodyLovesRaymond"
	},
	"q8": {
		solution: "Frasier",
		options: ["Frasier",
				"The Drew Carey Show",
				"The Nanny",
				"The King of Queens"],
		audio: "audio/frasier.mp3",
		tag: "frasier"
	},
	"q9": {
		solution: "Friends",
		options: ["Will and Grace",
				"Friends",
				"Becker",
				"My So Called Life"],
		audio: "audio/friends.mp3",
		tag: "friends"
	},
	"q10": {
		solution: "Mad About You",
		options: ["Sex and the City",
				"Mad About You",
				"Dharma and Greg",
				"Grace Under Fire"],
		audio: "audio/madAboutYou.mp3",
		tag: "madAboutYou"
	},
	"q11": {
		solution: "Married With Children",
		options: ["Everybody Loves Raymond",
				"Will and Grace",
				"7th Heaven",
				"Married With Children"],
		audio: "audio/marriedWithChildren.mp3",
		tag: "marriedWithChildren"
	},
	"q12": {
		solution: "Northern Exposure",
		options: ["Northern Exposure",
				"Beverly Hills 90210",
				"Ellen",
				"Parker Lewis Can't Lose"],
		audio: "audio/northernExposure.mp3",
		tag: "northernExposure"
	},
	"q13": {
		solution: "Roseanne",
		options: ["Ellen",
				"My So Called Life",
				"7th Heaven",
				"Roseanne"],
		audio: "audio/roseanne.mp3",
		tag: "roseanne"
	},
	"q14": {
		solution: "Seinfeld",
		options: ["Curb Your Enthusiasm",
				"Seinfeld",
				"Ally McBeal",
				"Dinosaurs"],
		audio: "audio/seinfeld.mp3",
		tag: "seinfeld"
	},
	"q15": {
		solution: "Spin City",
		options: ["Dharma and Greg",
				"Just Shoot Me",
				"Suddenly Susan",
				"Spin City"],
		audio: "audio/spinCity.mp3",
		tag: "spinCity"
	},
	"q16": {
		solution: "The Cosby Show",
		options: ["Everybody Loves Raymond",
				"Frasier",
				"The Cosby Show",
				"Ally McBeal"],
		audio: "audio/theCosbyShow.mp3",
		tag: "theCosbyShow"
	},
	"q17": {
		solution: "The Wonder Years",
		options: ["The Wonder Years",
				"That 70's Show",
				"Buffy the Vampire Slayer",
				"The Fresh Prince of Bel-Air"],
		audio: "audio/theWonderYears.mp3",
		tag: "theWonderYears"
	},
	"q18": {
		solution: "Third Rock From the Sun",
		options: ["That 70's Show",
				"Futurama",
				"Ren and Stimpy",
				"Third Rock From the Sun"],
		audio: "audio/thirdRockFromTheSun.mp3",
		tag: "thirdRockFromTheSun"
	},
	"q19": {
		solution: "News Radio",
		options: ["King of the Hill",
				"News Radio",
				"Dharma and Greg",
				"Ellen"],
		audio: "audio/newsRadio.mp3",
		tag: "newsRadio"
	},

}

//create an audio HTML element for each song to be used
for (var i = 0; i < questionList.length; i++) {
	var song = $("<audio/>");
	song.attr("id", questions["q"+i].tag).attr("src", "audio/" + questions["q"+i].tag + ".mp3")
		.attr("type", "audio/mpeg");
	$('body').append(song);
}


$(document).ready(function() {

	// play the menu music
	document.getElementById("menu").play();
	// make the start button
	var startButton = $("<button/>").attr("id", "startButton").addClass("uiButton");
	startButton.text("START");
	$("#interface").append(startButton);

	// increment the time down while the game is in progress. check each time if the timer has reached
	// zero and process as an incorrect anser if so
	function countDown() {
		time--;
		$("#timer").text(time);
		if (time === 0) {
			$("#messageBoard").text("Time Expired. The correct answer was " + currQuestion.solution)
			clearInterval(gameTimer);
			solutionTimer = setInterval(function() {clearAnswer()}, 4000);
			incorrect++;
			// pause and reset the current song
			var song = document.getElementById(currQuestion.tag);
			song.pause();
			song.currentTime = 0;
			document.getElementById("buzzer").play();
			document.getElementById("aww").play();
		}
		else if (time < 11) {
			$("#timer").addClass("lowTime");
			if (time < 6) {
				document.getElementById("tick").play();
			}
		}
	}

	// the interval function to display the answer and begin the new question
	function clearAnswer() {
		gameOn = false;
		$("#timer").text("30")
		$("#messageBoard").text("");
		clearInterval(solutionTimer);
		newQuestion();
	}

	//display results and reset game variables
	function endGame() {
		$("#messageBoard").html("Game Over<br>Correct: " + correct + "<br>Incorrect: " + incorrect);
		startButton.css("display", "block");
		gameOver = true;
		gameOn = false;
		correct = 0;
		incorrect = 0;
		questionList = ["q0", "q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10", "q11", 
					"q12", "q13", "q14", "q15", "q16", "q17", "q18", "q19"];;
		$(".choice").each(function() {
			$(this).text("");
			$(this).css("display", "none");
		})
		$("#timer").text("");
		document.getElementById("menu").play();
	}	

	//Set the current question. Start the music and display the options
	function newQuestion() {
		console.log(questionList.length);
		gameOn = true;
		// End the game once all questions have been removed from the pool
		if (questionList.length < 1) {
			endGame();
		}
		else {
			
			$("#timer").removeClass("lowTime");
			time = 30;
			//randomly select a question and remove that question from the pool of possible questions
			var random = Math.floor(Math.random() * questionList.length);
			currQuestion = questions[questionList[random]]; 
			questionList.splice(random, 1);
			//start playing the music
			document.getElementById(currQuestion.tag).play();
			//make a button for each option
			for (var i = 0; i < 4; i++) {
				var opt = currQuestion.options[i];
				var choice = $("button.choice").eq(i);
				choice.attr("data-text", opt);
				choice.text(opt);
				choice.css("display", "block");
			}
			// begin the countdown timer function
			gameTimer = setInterval(function() {countDown()}, 1000);
		}
	}		

	//begin the game if the game is over
	startButton.on("click", function() {
		if (gameOver === true) {
			//pause and reset the menu music
			var menuSong = document.getElementById("menu");
			console.log(menuSong);
			menuSong.pause();
			menuSong.currentTime = 0;
			//begin the new game
			console.log("started new game");
			gameOver = false;
			gameOn = true;
			$("#timer").html("30");
			$("#instructions").html("");
			$("#messageBoard").html("")
			startButton.css("display", "none");
			newQuestion();
		}
	})

	// When one of the solution choices is clicked..
	$(".choice").on("click", function() {
		var picked = $(this).attr("data-text");
		console.log(picked);
		//only accept clicks while the timer is running
		if (gameOn === true) {
			// when the correct anser is chosen
			if (picked === currQuestion.solution) {
				gameOn = false;
				correct++;
				clearInterval(gameTimer);
				console.log("score: " + correct)
				//stop and reset the current audio
				var song = document.getElementById(currQuestion.tag);
				song.pause();
				song.currentTime = 0;
				document.getElementById("ding").play();
				document.getElementById("laugh").play();
				//Display massage and begin the display interval timer
				$("#messageBoard").text("Correct!");
				solutionTimer = setInterval(function() {clearAnswer()}, 3000);
			}
			// for incorrect answers
			else if (picked !== currQuestion.solution) {
				gameOn = false;
				incorrect++;
				clearInterval(gameTimer);
				console.log("incorrect: " + incorrect)
				//stop and reset the current audio
				var song = document.getElementById(currQuestion.tag);
				song.pause();
				song.currentTime = 0;
				document.getElementById("buzzer").play();
				document.getElementById("aww").play();
				//Display massage and begin the display interval timer
				$("#messageBoard").html("Incorrect" + "<br />" + "The correct answer was " + currQuestion.solution);
				solutionTimer = setInterval(function() {clearAnswer()}, 3000);
			}
			else {
				alert("ERROR");
			}
		}
	})

})
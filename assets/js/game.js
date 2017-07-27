//VARIABLES //////////////////////////////////////////////////////////////////
var mysteryWordsArray = ["kittens", "dandelions", "puppies", "sunshine", "birthdays", 
						"rainbows", "friendship", "laughter", "cupcakes", "butterflies"];

var mysteryWord = [];

var guessedLettersArray = [];

var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

var	letterBank = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

var wins = 0;

var losses = 0;

var guessesLeft = 10;

var gameIndex = 0;

/////////////////////////////////////////////////////////////////////////////


//FUNCTION: Stores mystery word into "mysteryWord" array //////
function writeMysteryWord(arrayIndex){
	mysteryWord = [];

	for(var i = 0; i < mysteryWordsArray[arrayIndex].length; i++){
		
		var activeWord = mysteryWordsArray[arrayIndex];
		var activeLetter = activeWord[i];

		if(guessedLettersArray.indexOf(activeLetter) == -1){
			mysteryWord.push("_");
		}
		else{
			mysteryWord.push(activeLetter);
		}
		
	}

}
////////////////////////////////////////////////////////////////////////////

//FUNCTION: Letter Bank/////////////////////////////////////////////////////
function letterBankFunction(){
	
	for(var i = 0; i < guessedLettersArray.length; i++){
		var activeLetter = guessedLettersArray[i];
		if(letterBank.indexOf(activeLetter) == -1){
			//Do Nothing
		}
		else{
			letterBank[letterBank.indexOf(activeLetter)] = "-"
		}
	}
}

//FUNCTION: Updates the Game Screen for Letter Guess/////////////////////////////////

function updateGameScreen(){
	writeMysteryWord(gameIndex);
	document.getElementById("mysteryWordId").innerHTML = mysteryWord.join(" ");

	document.getElementById("wins").innerHTML = wins;

	document.getElementById("losses").innerHTML = losses;

	document.getElementById("guessesLeft").innerHTML = guessesLeft;

	document.getElementById("guessedLetters").innerHTML = guessedLettersArray.join(" ");

	letterBankFunction();
	document.getElementById("letterBank").innerHTML = letterBank.join(" ");
}

//Start of Process//////////////////////////////////////////////////////////
updateGameScreen();

//Reads letter guess and stores to guessedLettersArray/////////////////////////////////
document.onkeyup = function(event) { 

	var letter = String.fromCharCode(event.keyCode).toLowerCase();

	while(guessedLettersArray.indexOf(letter) != -1){
		letter = String.fromCharCode(event.keyCode).toLowerCase();
		return letter;
	}

	while(alphabet.indexOf(letter) == -1){
		letter = String.fromCharCode(event.keyCode).toLowerCase();
		return letter;
	}

	guessedLettersArray.push(letter);
////////////////////////////////////////////////////////////////////////////////////////

//Update Variables and Game Screen for letter guess////////////////////////////////////
	updateGameScreen();

	if(mysteryWord.indexOf("_") == -1){
		wins++;
		letterBank = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
		guessedLettersArray = [];
		guessesLeft = 10;
		gameIndex++;
	}
	else if(mysteryWord.indexOf(letter) != -1){
		//Nothing
	}
	else{
		guessesLeft--;
	}

	if(guessesLeft == 0){
			losses++;
			letterBank = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
			guessedLettersArray = [];
			guessesLeft = 10;
			gameIndex++;
	}
	else{
		//Nothing
	}
	
	if(wins == 5){
		alert("Congratulations! You've won 5 games!!!")
		window.open("prize.html", "_self");
	}

	updateGameScreen();
}
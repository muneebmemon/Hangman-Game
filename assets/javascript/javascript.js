var gameStarted = false;
var wins = 0;
var letterGuessed = [];
var numberofGuesses = 0;
var wordGuessed = [];
var currentWord = [];

var words = ["AEROPLANE", "BROCCOLI", "CAMEL", "CELLPHONE", "CEMETERY", "CHICAGO", "CHICKEN", "HOSPITAL",
			 "HOUSE", "ISLAND", "MINECRAFT", "OCTUPUS", "PINEAPPLE", "POKEMON", "SNOWY", "SCHOOL", "SPONGEBOB",
			 "STADIUM", "SUSHI", "TELEVISION", "COMPUTER", "SOCCER", "PHARMACY", "RESTAURANT", "SEAFOOD"
];

// function to start new game
function startGame(){
	numberofGuesses = 12;
	letterGuessed = [];
	wordGuessed = [];

	// checking to see if previous span elements for current word present and removing if they are so
	// that it can have new elements for new game
	if(document.getElementById("letter0")!=null){
		var elemWord = document.getElementById("currentWord");

		for(var i=0 ; i<currentWord.length ; i++){
			var elemLetter = document.getElementById("letter" + i)
			elemWord.removeChild(elemLetter);
		}
	}

	// Clearing Image before start of new game
	if(document.getElementById("wordImg")!=null){
		var elemPicture = document.getElementById("wordPicture");
		elemPicture.removeChild(document.getElementById("wordImg"));
	}	

	currentWord = words[Math.floor(Math.random() * words.length)].split("");
	var elemCurrentWord = document.getElementById("currentWord");

	// creating span elements for current word and adding it to parent div element
	for(var i=0 ; i<currentWord.length ; i++) {
		var elemLetter = document.createElement("span");
		elemLetter.setAttribute("id","letter" + i);
		elemLetter.textContent = "_";
		elemCurrentWord.appendChild(elemLetter);
		wordGuessed[i] = "_";
	}

	document.getElementById("guessRemaining").textContent = numberofGuesses;
	document.getElementById("guessedLetters").textContent = letterGuessed;
	document.getElementById("gameStatus").textContent = "GUESS THE WORD BY PRESSING LETTER. GOODLUCK !";
}

// function to update Letter Guessed display on the main page
function updateLetterGuessedDisplay(){
	document.getElementById("guessedLetters").textContent = letterGuessed;
}

// function to update total number of guesses remains
function updateNumberOfGuesses(){
	numberofGuesses--;
	document.getElementById("guessRemaining").textContent = numberofGuesses;
	if (numberofGuesses==0){
		endGame();
		document.getElementById("gameStatus").textContent = "SORRY! YOU WERE NOT ABLE TO GUESS WORD. PRESS ANY KEY TO PLAY AGAIN.";		
	}
}

// function to update word guessed on the main page
function updateWordGuessed() {
	for (var i=0; i<currentWord.length; i++){
		var elemLetter = document.getElementById("letter" + i);
		elemLetter.textContent = wordGuessed[i];
	}
}

// function to check if the whole word was guessed correctly
function checkIfWin(){
	var wholeWordGuessed = true;

	for(var i=0 ; i<wordGuessed.length ; i++){
		if (wordGuessed[i] == "_"){
			wholeWordGuessed = false;
			break;
		}
	}

	if (wholeWordGuessed) {
		wins ++;
		endGame();
		document.getElementById("gameStatus").textContent = "GREAT ! YOU GUESSED THE WORD CORRECTLY. PRESS ANY KEY TO PLAY AGAIN.";
	}
}

// function to convert current word to string so that it can be used to display image
function convertCurrentWordToString(){
	var currentWordStr="";
	for (var i=0; i<currentWord.length; i++){
		currentWordStr = currentWordStr + currentWord[i];
	}
	return currentWordStr;
}

// function to control End game. Either word was guessed correctly or ran out of remaining guesses.
function endGame() {
	gameStarted = false;
	document.getElementById("wins").textContent = wins;
	for (var i=0; i<currentWord.length; i++){
		var elemLetter = document.getElementById("letter" + i);
		elemLetter.textContent = currentWord[i];
	}

	var elemImg = document.createElement("img");
	elemImg.setAttribute("src", "assets/images/" + convertCurrentWordToString() + ".jpg");
	elemImg.setAttribute("class", "img-responsive img-thumbnail center-block");
	elemImg.setAttribute("id", "wordImg");
	document.getElementById("wordPicture").appendChild(elemImg);
}

// Function to check typed letter and display on the page if correct or call letter guessed function
function checkLetter(keyPressed){
	var isCorrectGuess = false;
	for(var i=0; i<currentWord.length ; i++){
		if(currentWord[i]===keyPressed.toUpperCase()) {
			wordGuessed[i] = keyPressed.toUpperCase();
			isCorrectGuess = true;
		}
	}

	if(!isCorrectGuess){
		handleLetterGuessed(keyPressed);
	} else {
		updateWordGuessed();
		checkIfWin();
	}
}

// Function to handle Letter guessed if not a matching guess
function handleLetterGuessed(keyPressed) {
	// Checking to see if there is atleast one letter which is guessed
	if (letterGuessed.length!=0){
		var letterFound = false;
		for (var i=0 ; i<letterGuessed.length ; i++) {
			if (keyPressed.toUpperCase()===letterGuessed[i]) {
				letterFound=true;
				break;
			}
		}

		// Adding letter to list of guessed letter array if the letter is not previously guessed
		if (!letterFound) {
			letterGuessed[letterGuessed.length] = keyPressed.toUpperCase();
			updateLetterGuessedDisplay();
			updateNumberOfGuesses();
		}
	}
	else {
		letterGuessed[0] = keyPressed.toUpperCase();
		updateLetterGuessedDisplay();
		updateNumberOfGuesses();
	}
}

document.onkeyup = function(event){
	// checking to see if the first game after page load is started or not. Then calling startGame function if not.
	if(gameStarted!=true) {
		startGame();
		gameStarted=true;
	} else {
		checkLetter(event.key);
	}
};
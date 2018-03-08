var inquirer = require("inquirer");

var wordList = ["pineapple", "apple", "orange", "tomato", "broccoli", "lettuce", "clementines", "asparugus", "blueberry", "raspberry","avocado", "potatoe", "celery", "onion", "watermellon","thime", "pepper", "beans", "garlic"];
var userGuesses = [];
var placeholder = [];

var totalGuesses = 0;
var guessCounter = 10;

var randomWord = wordList[Math.floor(Math.random() * wordList.length)];
var wordLength = randomWord.length;
var answer = [randomWord];

// split word to array
var answerCharArray = randomWord.split("");



for (var i = 0; i < wordLength; i++) {
    placeholder[i] = "_ ";
}

wordToGuess = placeholder.join("");
console.log("NBA Team: " + wordToGuess);

var askQuestion = function () {
    
    if (guessCounter > 0) {
        console.log("\n=================");
    
        inquirer.prompt([
                {
                    type: "input",
                    message: "Guess a letter...",
                    name: "letter",
                    validate: function (value) {
                        if (isNaN(value) === true) {
                            return true;
                        }
                        console.log(" \nBE SURE TO INPUT A LETTER");
                        return false;
                        
                        }
                }
        ]).then(function (answer) {

            var guess = new Guess(
                answer.letter
            )
            function Guess(letter) {
                this.letter = letter;
               
                checkAnswer(letter);

                this.printGuesses = function () {
                    console.log("Letter you guessed: " + this.letter);
                };
            }
            totalGuesses++;

            askQuestion();
        })
    }
    var check = placeholder.indexOf("_ ");
    if (guessCounter == 0 && check === -1) {

    }
    else if (guessCounter == 0) {
        console.log("\nGame Over!!! \nThe answer was: " + randomWord);
        askQuestion();
    }
}

askQuestion();

var checkAnswer = function(letter) {
    
    var wordIndex = answerCharArray.indexOf(letter);
    if (wordIndex === -1) {
        userGuesses.push(letter);
        guessCounter--;
        console.log("Incorrect...  You have " + guessCounter + " guesses left!");
        console.log("You've guessed: " + userGuesses);
        console.log(placeholder.join(""));
        
    }
    else {
        for (var j = 0; j < wordLength; j++) {
            if (answerCharArray[j] === letter) {
                placeholder[j] = letter;
                console.log(placeholder.join(""));
            }
        }
        var check = placeholder.indexOf("_ ");

        if (check === -1) {
            console.log("Congrats guy!!!, you won!");
            guessCounter = 0;  
        }
        else {console.log("CORRECT!  You have " + guessCounter + " guesses remaining!")};
    }
}
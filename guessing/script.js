const randomNum = Math.floor(Math.random() * 100) + 1;
const body = document.querySelector("body");
const button = document.querySelector(".guess-button");
const reset = document.querySelector(".reset-button")
const feedback = document.querySelector(".feedback");
const guessList = document.querySelector(".guess-list");
const count = document.querySelector(".count");
const youLose = document.querySelector(".you-lose");
let guessInput = document.querySelector(".guess-input");
const allListElements = document.querySelectorAll("li");

let guessCount = 0;
let resetButton;
let previousGuesses = [];

function checkGuess() {
    const guess = guessInput.value;

    previousGuesses.push(guess);

    // console.log("previousGuesses = ", previousGuesses)

    // console.log("allListElements = ", allListElements)
   
    for(let i = 0; i < allListElements.length; i++){
        allListElements[i].textContent = previousGuesses[i];
    }

    //for (guessBox in listElement)
    /*for (var i = 0, len = listElements.length; i < len; i++){
        return listElements.nextElementSibling;
    }
    */
    // console.log(submit);
    // console.log("random number =", randomNum);
    // console.log("guess =", guess)
    // console.log("feedback =", feedback)

    //Compare guess with randomNum

    // If guess === randomNum return "You Win!"

    // Else return "Guess Again :("

    if (guessCount < 5) {
        if (guess == randomNum) {
            feedback.textContent = "You got it right!";
            document.body.style.backgroundImage = "url('happydog.jpg')";
        }
        else if (guess < randomNum) {
            feedback.textContent = "Too Low! Guess Again";
            guessList.textContent += guess + " ";
        }
        else if (guess > randomNum) {
            feedback.textContent = "Too High!";
            guessList.textContent += guess + " ";
        }
        guessCount++;
        count.textContent = guessCount;
    } else {
        feedback.textContent = "You Lose!";
        document.body.style.backgroundImage = "url('baldman.png')";
    }
}
// The player clicks a button to submit their guess.
button.addEventListener("click", checkGuess);
reset.addEventListener("click", function () { location.reload() })


// The game should give a hint after each guess, letting them know whether to guess higher or lower as well as how close they are.

// After five unsuccessful guesses, the game 



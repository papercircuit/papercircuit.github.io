const randomNum = Math.floor(Math.random() * 100) + 1;
const body = document.querySelector("body");
const button = document.querySelector(".start-button");
const countdown = document.getElementById("countdown");
const scoreBoard = document.querySelector(".score-board");

let timeUp = false;
let lastMole;
let score = 0;
let timeleft = 10;


// Get an array of all mole elements
let moles = document.querySelectorAll(".mole")

// Get an arry of all hole elements
const holes = document.querySelectorAll(".hole")

// Set initial states for scoreboard and countdown
scoreBoard.textContent = score;
countdown.textContent = timeleft + " seconds remaining";

// Create a random amount of time that the mole will peep. (in milliseconds)
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}


// Choose the random mole that will popUp. Returns a random hole element.

function randomMole(moles) {
    // Pick a random number beween 0 and length of the holes array. Assign that number to hole.
    const i = Math.floor(Math.random() * moles.length);
    const mole = moles[i]
    // If the returned hole is the same as the last hole, perform the function again.
    if (mole === lastMole) {
        return randomMole(moles);
    }
    // Keep index of last hole in a letiable to check in the if statement above.
    lastMole = mole;
    return mole;
}

// Make the mole pop from the random hole using the two above functions randomTime and randomHole.

function popUp() {
    // Assign a random time between to values in milliseconds.
    const time = randomTime(700, 1500);
    // Pass the array of holes into the randomHole function and assign that value to hole.
    const mole = randomMole(moles);
    // Add class mole-up which uses transform: translate to move the mole element into view.
    mole.classList.add("mole-up");
    // Remove mole once time runs out.
    setTimeout(() => {
        mole.classList.remove("mole-up");
        // Continue running popUp function as long as time is not up. (If timeUp is not truthy, run popUp())
        if (!timeUp)
            popUp()
                ;
    }, time)
}

// Start the game. Triggered by Let's Whack button.

function startGame() {

    countDown();
    // Set scoreboard to 0.
    scoreBoard.textContent = 0;
    // Set timeUp to false.
    timeUp = false;
    // Set score to 0.
    score = 0;
    popUp();
    // Set timeUp to true when time === 10000 (10seconds)
    setTimeout(() => timeUp = true, 10000)
    scoreBoard.textContent = score;

}

// whack() runs when class .mole is clicked.

function whack() {
    //Increase score by 1 per whack 
    score = score + .5; // <-- NOT AN IDEAL FIX. whack() is running twice per click. (.5 twice equals one point.)

    // Play sound. NOT WORKING
    playSound();
    // Remove class mole-up to hide mole element
    lastMole.classList.remove('mole-up');
    // Update scoreboard
    scoreBoard.textContent = score;
}

// Function to play sounds when whack() is called. Not sure how to get this to work :(

function playSound() {
    let sound = new Audio('sounds/mole.mp3');
    sound.play();
}

// Function to display 10 second countdown on game start

function countDown() {

    let timer = setInterval(function () {

        // Set game over state
        if (timeleft <= 0) {

            // If moles whacked is less than 5, you lose
            if (score < 5) {
                clearInterval(timer);
                countdown.textContent = "Moles win this round.";
            }
            // If moles whackd is greater than 5, you win
            else {
                clearInterval(timer);
                countdown.textContent = "You win! Take that moles.";
            }
            // Set game in progress state
        } else {
            countdown.textContent = timeleft + " seconds remaining";
        }

        timeleft -= 1;
    }, 1000);
}

// Add eventListener for every available mole element
moles.forEach(mole => mole.addEventListener('click', whack));
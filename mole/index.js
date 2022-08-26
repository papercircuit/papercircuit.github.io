const randomNum = Math.floor(Math.random() * 100) + 1;
const body = document.querySelector("body");
const button = document.querySelector(".start-button");
let countdown = document.getElementById("countdown");
let scoreBoard = document.querySelector(".score-board");
let timeUp = false;
let lastMole;
let score = 0;
let timeleft = 10;


// Get an array of mole elements
let moles = document.querySelectorAll(".mole")
// Get an arry of hole elements
const holes = document.querySelectorAll(".hole")

// Set initial states for scoreboard and countdown
scoreBoard.textContent = score;
countdown.textContent = timeleft + " seconds remaining";


// A function to create a random amount of time that the mole will peep. (in milliseconds)
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}


// A function to choose the random mole that will popUp. Returns a random hole element.

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

// A function to make the mole pop from the random hole using the two above functions randomTime and randomHole.

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



function getTimeLeft(timeout) {
    return Math.ceil((timeout._idleStart + timeout._idleTimeout - Date.now()) / 1000);
}

// A function to start the game. Triggered by Let's Whack button.

function startGame() {
    if (scoreBoard != null) {
        //Start countdown
        countDown();
        scoreBoard.textContent = 0;
        // Reset timeUp to false.
        timeUp = false;
        // Reset score to 0.
        score = 0;
        popUp();
        // Set timeUp to true when time === 10000 (10seconds)
        setTimeout(() => timeUp = true, 10000)
        scoreBoard.textContent = score;

    }
}

// Function to increase score by 1 when mole image is clicked. Then remove the mole-up class to hide mole again.

function whack() {
    //Increase score by 1 per whack 
    score = score + .5; // <-- NOT AN IDEAL FIX. whack() is running twice per click. .5 twice equals one point.
    lastMole.classList.remove('mole-up');
    scoreBoard.textContent = score;
}

// Function to display 10 second countdown on game start

function countDown() {

    let timer = setInterval(function () {
        // Set game over state
        if (timeleft <= 0) {
            clearInterval(timer);
            countdown.textContent = "Game Over";
            moleExplosion();
            // Set game in progress state
        } else {
            countdown.textContent = timeleft + " seconds remaining";
        }
        timeleft -= 1;
    }, 1000);
}



moles.forEach(mole => mole.addEventListener('click', whack));
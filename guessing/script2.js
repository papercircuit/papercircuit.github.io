

      function checkGuess() {
        var userGuess = Number(guessField.value);
        if(guessCount === 1) {
          guesses.textContent = 'Previous guesses: ';
        }
        guesses.textContent += userGuess + ' ';
        if(userGuess === randomNumber) {
          lastResult.textContent = "Good job! You win!";
     
          lowOrHi.textContent = '';
          setGameOver();
          
        } else if(guessCount === 10) {
          lastResult.textContent = 'Hahaha You suck!';
          lowOrHi.textContent = '';
          setGameOver();
          
        } else {
          lastResult.textContent = "Oops! You're Wrong!";
          lastResult.style.backgroundColor = 'red';
          
          if(userGuess < randomNumber) {
            lowOrHi.textContent = 'Last guess was too low!';
            
          } else if(userGuess > randomNumber) {
            lowOrHi.textContent = 'Last guess was too high!';
          }
        }
        guessCount++;
        guessField.value = '';

      }

      guessSubmit.addEventListener('click', checkGuess);


/**************
 *   SLICE 1
 **************/
let coffeeCount = 0;
let totalCPS = 0;
const feedback = document.querySelector('#feedback');


function updateCoffeeView(coffeeCount) {
  // your code here
  const coffeeCounter = document.querySelector('#coffee_counter');
  coffeeCounter.innerText = coffeeCount;
}

function clickCoffee(data) {
  // your code here
  const coffeeCounter = document.querySelector('#coffee_counter');
  data.coffee += 1;
  coffeeCounter.innerText = data.coffee;
  //Update the totalCPS
  calculateCPS(data);
  renderProducers(data);
  renderBeans(data);
}

/**************
 *   SLICE 2
 **************/

//  Slice 2: Unlocking & Rendering Producers
//     The unlockProducers function
//       1) changes `unlocked` to `true` when the player's coffee count is equal to or larger than half the initial price of the producer
//       2) does not set `unlocked` to `false` once a producer has been unlocked, even if the coffee count drops again
//     The getUnlockedProducers function
//       3) returns an array of producer objects
//       - filters out producer objects that are not unlocked
//       ✓ does not mutate the data

function unlockProducers(producers, coffeeCount) {
  // your code here
  const unlockedProducers = producers.map((producer) => {
    if (coffeeCount >= producer.price / 2) {
      producer.unlocked = true;
    }
  });
}

function getUnlockedProducers(data) {
  // your code here
  let unlockedProducers = data.producers.filter((producer) => {
    return producer.unlocked === true;
  });
  return unlockedProducers;
}

function makeDisplayNameFromId(id) {
  // your code here
  //Split the id into an array of words
  let titleCasedID = id.split('_');
  //Capitalize the first letter of each word
  titleCasedID = titleCasedID.map((word) => {
    return word[0].toUpperCase() + word.slice(1);
  });
  //Join the words back together
  return titleCasedID.join(' ');
}


// You shouldn't need to edit this function-- its tests should pass once you've written makeDisplayNameFromId
function makeProducerDiv(producer) {
  const containerDiv = document.createElement('div');
  containerDiv.className = 'producer';
  const displayName = makeDisplayNameFromId(producer.id);
  const currentCost = producer.price;
  const html = `
  <div class="producer-column">
    <div class="producer-title">${displayName}</div>
    <button type="button" id="buy" class="buy--${producer.id}">Buy</button>
    <button type="button" id="sell" class="sell--${producer.id}">Sell</button>
  </div>
  <div class="producer-column">
    <div>Quantity: ${producer.qty}</div>
    <div>Coffee/second: ${producer.cps}</div>
    <div>Cost: ${currentCost} coffee</div>
  </div>
  `;
  containerDiv.innerHTML = html;
  return containerDiv;
}

// The deleteAllChildNodes function
// 1) calls the `.removeChild()` method on the DOM node passed in at least once
// 2) gets rid of all of the children of the DOM node passed in

function deleteAllChildNodes(parent) {
  // your code here
  if (parent.hasChildNodes()) {
    //While the parent has children, remove the first child
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }
}


// The renderProducers function
// ✓ calls document.getElementById() or document.querySelector()
// 1) appends some producer div elements to the producer container
// 2) unlocks any locked producers that need to be unlocked
// 3) only appends unlocked producers
// 4) deletes the producer container's children before appending new producers
// 5) is not in some way hardcoded to pass the tests

function renderProducers(data) {
  // your code here
  const producerContainer = document.querySelector('#producer_container');
  deleteAllChildNodes(producerContainer);
  //Unlock any producers that need to be unlocked
  unlockProducers(data.producers, data.coffee);
  //Get the unlocked producers
  const unlockedProducers = getUnlockedProducers(data);
  //Append the unlocked producers to the producer container
  unlockedProducers.forEach((producer) => {
    producerContainer.appendChild(makeProducerDiv(producer));
  }
  );
}

/**************
 *   SLICE 3
 **************/

//  The getProducerById function
//  1) returns an object
//  2) returns the correct producer object
//  3) is not hardcoded to pass the tests

function getProducerById(data, producerId) {
  // your code here
  //Get the producer object with the matching id
  let producer = data.producers.filter((producer) => {
    return producer.id === producerId;
  }
  );
  //Return the producer object 
  return producer[0];
}

// The canAffordProducer function
//       - returns a boolean
//       - returns true if the player can afford the producer
//       - returns false if the player cannot afford the producer

function canAffordProducer(data, producerId) {
  // your code here
  //Get the producer object with the matching id
  if (data.coffee >= getProducerById(data, producerId).price) {
    return true;
  } else {
    return false;
  }
}

function updateCPSView(cps) {
  // your code here
  document.getElementById('cps').innerText = cps;
}

// The updatePrice function
// 1) returns an integer, not a float
// 2) returns 125% of the input price, rounded down

function updatePrice(oldPrice) {
  // your code here
  //Return the price rounded down to the nearest integer
  // Set game pace here by changing multiplier
  const multiplier = 1.5;
  return Math.floor(oldPrice * multiplier);
}

// The attemptToBuyProducer function
// ✓ returns a boolean
// ✓ returns false if the player cannot afford the producer
// ✓ returns true if the player can afford the producer
// ✓ increments the quantity of the producer in question only if the player can afford it
// ✓ decrements the player's coffee by the *current* price of the producer, but only if the player can afford it
// ✓ updates the price of the producer to 125% of the previous price, rounded down, but only if the player can afford the producer
// 1) updates the total CPS, but only if the player can afford the producer
// ✓ does not modify data in any way if the player tries to buy something they can't afford


function attemptToBuyProducer(data, producerId) {
  // your code here
  if (canAffordProducer(data, producerId)) {
    //Decrement the player's coffee by the current price of the producer
    data.coffee -= getProducerById(data, producerId).price;
    //Increment the quantity of the producer in question
    getProducerById(data, producerId).qty += 1;
    //Update the price of the producer to 125% of the previous price, rounded down
    getProducerById(data, producerId).price = updatePrice(getProducerById(data, producerId).price);
    data.totalCPS += getProducerById(data, producerId).cps;
    feedback.innerText = `You bought a ${makeDisplayNameFromId(producerId)}!`;
    return true;
  } else {
    return false;
  }

}

// The buyButtonClick function
// 1) mutates the data only if the player can afford the producer
// 2) shows an alert box with the message "Not enough coffee!" only if the player cannot afford the producer
// 3) does not modify data or show an alert box if the event passed in doesn't represent a click on a button element
// 4) renders the updated producers when a purchase succeeds
// 5) updates the coffee count on the DOM, reflecting that coffee has been spent, when a purchase succeeds
// 6) updates the total CPS on the DOM, reflecting that the new producer's CPS has been added


function buyButtonClick(event, data) {
  // your code here
  // Producer id is the last part of the class name
  const producerId = event.target.className.split('--')[1];
  console.log('producerId', producerId);
  //If the player can afford the producer, attempt to buy the producer
  if (canAffordProducer(data, producerId)) {
    attemptToBuyProducer(data, producerId);
    //Update the coffee count on the DOM
    updateCoffeeView(data.coffee);
    //Update the total CPS on the DOM
    updateCPSView(data.totalCPS);
    //Render the updated producers
    renderProducers(data);
  } else {
    feedback.innerText = "Not enough coffee";
  }
}


// The sellButtonClick function
// Removes a producer from the player's inventory if the player has at least one of that producer
// Does not modify data in any way if the player tries to sell something they don't have
// Renders the updated producers when a sale succeeds
// Updates the coffee count on the DOM, reflecting that coffee has been earned, when a sale succeeds
// Updates the total CPS on the DOM, reflecting that the sold producer's CPS has been removed

function sellButtonClick(event, data) {
  // your code here
  const producerId = event.target.className.split('--')[1];
  console.log('producerId', producerId);
  //If the player has at least one of the producer, attempt to sell the producer
  if (getProducerById(data, producerId).qty > 0) {
    //Increment the player's coffee by the current price of the producer
    data.coffee += getProducerById(data, producerId).price;
    //Decrement the quantity of the producer in question
    getProducerById(data, producerId).qty -= 1;
    //Update the total CPS
    data.totalCPS -= getProducerById(data, producerId).cps;
    //Update the coffee count on the DOM
    updateCoffeeView(data.coffee);
    //Update the total CPS on the DOM
    updateCPSView(data.totalCPS);
    //Render the updated producers
    renderProducers(data);
    feedback.innerText = `You sold a ${makeDisplayNameFromId(producerId)}`;
  }
}







// The tick function
// ✓ increases coffee count by the total CPS
// ✓ updates the DOM to reflect this new coffee count
// 4) updates the DOM to reflect any newly unlocked producers

function tick(data) {
  // your code here
  //Increase the coffee count by the total CPS
  data.coffee += data.totalCPS;
  //Update the DOM to reflect the new coffee count
  updateCoffeeView(data.coffee);
  //Update the DOM to reflect any newly unlocked producers
  renderProducers(data);
}

function calculateCPS(data) {
  // your code here
  totalCPS = 0;
  //Loop through the producers and add the CPS of each producer to the total CPS
  for (let i = 0; i < data.producers.length; i++) {
    totalCPS += data.producers[i].cps * data.producers[i].qty;
  }//Assign totalCPS to data.totalCPS
  data.totalCPS = totalCPS;
  return data.totalCPS;
}



// - Add a "reset" button that resets the game state to the initial state and updates the DOM to reflect this.
function resetGame() {
  //Clear the local storage
  localStorage.clear();
  //Reload the page
  location.reload();
}
document.getElementById('reset').addEventListener('click', resetGame);


function saveGame() {
  //Save the game state to localStorage
  localStorage.setItem('data', JSON.stringify(data));
  feedback.innerText = 'Game saved!';
}
document.getElementById('save').addEventListener('click', saveGame);


function loadGame() {
  //Load the game state from window.localStorage
  data = JSON.parse(localStorage.getItem('data'));
  //Update the DOM to reflect the new game state
  updateCoffeeView(data.coffee);
  updateCPSView(data.totalCPS);
  renderProducers(data);
  feedback.innerText = 'Game loaded';
}
document.getElementById('load').addEventListener('click', loadGame);


// Render one bean png for each "coffee" in the data object
function renderBeans(data) {
  const beanContainer = document.getElementById('current-beans');
  const bean = document.createElement('img');
  bean.src = './bean.png';
  bean.className = 'bean';
  // Clear the beans
  beanContainer.innerHTML = '';
  //Loop through the number of coffee and add a bean to the bean container
  for (let i = 0; i < data.coffee; i++) {
    beanContainer.appendChild(bean.cloneNode());
  }
}

// Listen for click on buy beans button and add 100 coffee to the data object
document.getElementById('buy-beans').addEventListener('click', function () {
  data.coffee += 100;
  renderBeans(data);
  updateCoffeeView(data.coffee);
  feedback.innerText = 'SO MANY BEANS';
});



/*************************
 *  Start your engines!
 *************************/

// You don't need to edit any of the code below
// But it is worth reading so you know what it does!

// So far we've just defined some functions; we haven't actually
// called any of them. Now it's time to get things moving.

// We'll begin with a check to see if we're in a web browser; if we're just running this code in node for purposes of testing, we don't want to 'start the engines'.

// How does this check work? Node gives us access to a global variable /// called `process`, but this variable is undefined in the browser. So,
// we can see if we're in node by checking to see if `process` exists.
if (typeof process === 'undefined') {
  // Get starting data from the window object
  // (This comes from data.js)
  const data = window.data;

  // Add an event listener to the giant coffee emoji
  const bigCoffee = document.getElementById('big_coffee');
  bigCoffee.addEventListener('click', () => clickCoffee(data));

  // Add an event listener to the container that holds all of the producers
  // Pass in the browser event and our data object to the event listener
  const producerContainer = document.getElementById('producer_container');
  producerContainer.addEventListener('click', event => {
    if(event.target.id === 'buy') {
    buyButtonClick(event, data);
  } else if (event.target.id === 'sell') {
    sellButtonClick(event, data);
  }
  });

  // Call the tick function passing in the data object once per second
  setInterval(() => tick(data), 1000);
}

// Meanwhile, if we aren't in a browser and are instead in node
// we'll need to exports the code written here so we can import and
// Don't worry if it's not clear exactly what's going on here;
// We just need this to run the tests in Mocha.
else if (process) {
  module.exports = {
    updateCoffeeView,
    clickCoffee,
    unlockProducers,
    getUnlockedProducers,
    makeDisplayNameFromId,
    makeProducerDiv,
    deleteAllChildNodes,
    renderProducers,
    updateCPSView,
    getProducerById,
    canAffordProducer,
    updatePrice,
    attemptToBuyProducer,
    buyButtonClick,
    tick
  };
}

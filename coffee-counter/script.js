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

function makeProducerDiv(producer) {
  const containerDiv = document.createElement('div');
  containerDiv.className = 'producer';
  const displayName = makeDisplayNameFromId(producer.id);
  const currentCost = producer.price;
  const html = `
  <div class="producer-column">
    <div class="producer-title">${displayName}⇢</div>
    <button type="button" id="buy" class="buy--${producer.id}">Buy</button>
    <button type="button" id="sell" class="sell--${producer.id}">Sell</button>
  </div>
  <div class="producer-column">
    <div class="price">Price: ${currentCost} beans</div>
    <div class="you-have">You have: ${producer.qty}</div>
    <div class="cps">Coffee/second: ${producer.cps}</div>
    
  </div>
  `;
  containerDiv.innerHTML = html;
  return containerDiv;
}

function deleteAllChildNodes(parent) {
  // your code here
  if (parent.hasChildNodes()) {
    //While the parent has children, remove the first child
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }
}

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

function updatePrice(oldPrice) {
  // your code here
  //Return the price rounded down to the nearest integer
  // Set game pace here by changing multiplier
  const multiplier = 1.5;
  return Math.floor(oldPrice * multiplier);
}

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
  renderBeans(data);
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
    if (event.target.id === 'buy') {
      buyButtonClick(event, data);
    } else if (event.target.id === 'sell') {
      sellButtonClick(event, data);
    }
  });

  // Call the tick function passing in the data object once per second
  setInterval(() => tick(data), 1000);

  //Update rendered beans every 100ms
  setInterval(() => renderBeans(data), 100);
}

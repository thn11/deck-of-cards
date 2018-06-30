let deck;
let hand;
let CARDHEIGHT = 200; //set the card height to 200 (arbitrary),
let CARDWIDTH = CARDHEIGHT * 0.7142857; //and set the card width according to
//the actual difference between width
//and height of a normal playing card
let CARDGAP = 0;
let piles = [];
let aces;
let carrier;
let win = false;
let deal = 29;

/**
 * Called as soon as the window loads. This function creates the required
 * objects and sets up the card variables.
 */
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  reset();
  if (width > height) {
    CARDHEIGHT = height / 4;
    CARDWIDTH = CARDHEIGHT * 0.7142857;
  }
  CARDGAP = (width - (100 + CARDWIDTH * 7)) / 6;
}

function reset() {
  deck = new Deck(50, 50);
  hand = new Hand();
  piles = Array(7).fill().map(p => new Pile());
  aces = new Aces();
  carrier = new Carrier();
  win = false;
}

function checkAutoComplete() {
  if (win) {
    return false;
  }
  if (deck.cards.length > 24) {
    return false;
  }
  for (let i = 1; i < 7; i++) {
    if (piles[i].cards.length && piles[i].cards[0].hide == true) {
      return false;
    }
  }
  return true;
}

/**
 * p5.js function. This function gets called about 30 times a second, and
 * will usually be responsible for displaying objects on screen.
 */
function draw() {
  //frameRate(2);
  if (deal <= 28) {
    if (frameCount % 5 == 0) {
      dealCards(deal);
      deal++;
    }
  }
  if (checkAutoComplete() && frameCount % 10 == 0) {
    autoComplete();
  }
  checkWin();
  //set the background to a game table green
  if (!win) {
    background(0, 67, 0);
  } else {
    aces.drawWinSequence();
    if (aces.count() < 1) {
      reset();
    }
    return;
  }
  //show the deck
  deck.display(50, 50, width - 250); //magic number
  //show the hand
  hand.display(50 + CARDWIDTH + CARDGAP, 50);

  //display the piles
  for (let i = 0; i < piles.length; i++) {
    piles[i].display(50 + (CARDWIDTH + CARDGAP) * i, 50 + CARDHEIGHT + CARDGAP, !carrier.isCarrying && deal > 28);
  }
  //display the aces
  aces.display(50 + 3 * (CARDWIDTH + CARDGAP), 50);
  //display the carrier
  carrier.display(mouseX, mouseY);

  //if the carrier is carrying a card
  if (carrier.isCarrying) {
    let tempPos = aces.getCoords();
    //if the carrier is over the aces, show a green border around it
    if (carrier.checkOver(tempPos, mouseX, mouseY)) {
      if (aces.canTake(carrier.cards)) {
        stroke(0, 255, 0);
      } else {
        stroke(255, 0, 0);
      }
      noFill();
      rect(tempPos.x, tempPos.y, tempPos.w, tempPos.h);
    }
    //do the same for each pile
    for (let i = 0; i < 7; i++) {
      let tempPos = piles[i].getCoords();
      if (carrier.checkOver(tempPos, mouseX, mouseY)) {
        if (piles[i].canTake(carrier.cards)) {
          stroke(0, 255, 0);
        } else {
          stroke(255, 0, 0);
        }
        noFill();
        rect(tempPos.x, tempPos.y, tempPos.w, tempPos.h);
        break;
      }
    }

  }
}


//TODO
// fix autocomplete -
// it has an issue where it always draws a new card and
// never transfers any cards to the aces.
function autoComplete() {
  let goal = aces.getLowestMissing();
  let searchVal = goal.value + 1;
  let searchSuit = goal.suit;
  if (hand.cards.length) {
    if (hand.cards[hand.cards.length - 1].suit == searchSuit &&
      hand.cards[hand.cards.length - 1].value == searchVal) {
      aces.draw(hand);
      return;
    }
  }
  for (let i = 0; i < 7; i++) {
    console.log("Doing the loop");
    if (piles[i].cards.length) {
      console.log("piles[" + i + "] value: " + piles[i].cards[piles[i].cards.length - 1].value + "==" + searchVal);
      console.log("piles[" + i + "] suit: " + piles[i].cards[piles[i].cards.length - 1].suit + "==" + searchSuit);
      if (piles[i].cards[piles[i].cards.length - 1].value == searchVal &&
        piles[i].cards[piles[i].cards.length - 1].suit == searchSuit) {
        console.log("!!!!!!!!!!!!!!Found a card in pile " + (i + 1));
        aces.draw(piles[i]);
        return;
      }
    }
  }
  drawCard();
}


function checkWin() {
  if (aces.count() == 52) {
    win = true;
  }
}

/**
 * deals out cards to each pile, 1 to the first, 2 to the second, and so on
 */
function dealCards(t) {
  let counter = 0;
  for (let i = 0; i < 7; i++) {
    for (let j = i; j < 7; j++) {
      counter += 1;
      if (t == counter) {
        if (i == j) {
          deck.cards[0].hide = false;
        }
        piles[j].draw(deck);
        return;
      }
    }
  }
}

/**
 * Finds the card under the cursor and returns it, or as in the case of
 * the piles, returns a list of the cards to be dragged.
 */
function findCard() {
  let x = mouseX;
  let y = mouseY;
  //check the hand to see if any of the cards there are under the cursor
  let result = hand.checkCards(x, y);
  if (result) {
    return result;
  }
  //check the aces
  result = aces.checkCards(x, y);
  if (result) {
    return result;
  }
  //check the piles last because they have the most available cards
  for (let i = 0; i < 7; i++) {
    result = piles[i].checkCards(x, y);
    if (result) {
      return result;
    }
  }
}

/**
 * p5.js function. This function is called every time the mouse is pressed
 */
function mousePressed() {
  //check if the deck is under the mouse
  if (deck.checkWithin(createVector(mouseX, mouseY))) {
    if (deck.cards.length === 52) {
      //at the start of the game, deal the cards
      deal = 0;
    } else {
      //give the hand a card
      drawCard();
    }
  } else {
    //check the other objects
    let tempCardsObj = findCard();
    if (tempCardsObj) {
      let tempCards = tempCardsObj.cards;
      let tempCardsOrigin = tempCardsObj.origin;
      //give the carrier the card
      carrier.addCards(tempCards, tempCardsOrigin);
      //update the lock position for the mouse
      carrier.setOffset(mouseX, mouseY);
    }
  }
}

function drawCard() {
  if (deck.cards.length === 0) {
    deck.transfer(hand.cards);
    hand.reset();
  } else {
    hand.draw(deck);
  }
}

/**
 * p5.js function. Gets called when the mouse is released.
 */
function mouseReleased() {
  //if the carrier is over the aces, and if it is drop the cards there
  if (carrier.checkOver(aces.getCoords(), mouseX, mouseY)) {
    if (aces.canTake(carrier.cards)) {
      carrier.drop(aces);
    } else {
      carrier.dropBack();
    }
  } else {
    //otherwise, check if it is over a pile, and drop the cards there
    for (let i = 0; i < 7; i++) {
      if (carrier.checkOver(piles[i].getCoords(), mouseX, mouseY)) {
        if (piles[i].canTake(carrier.cards)) {
          carrier.drop(piles[i]);
        } else {
          carrier.dropBack();
        }
        carrier.empty();
        return;
      }
    }
    // if the carrier isn't over any object, drop them back to where
    // they came from
    carrier.dropBack();
  }
  carrier.empty();
}
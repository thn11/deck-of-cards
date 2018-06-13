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


/**
 * Called as soon as the window loads. This function creates the required
 * objects and sets up the card variables.
 */
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  deck = new Deck(50, 50);
  hand = new Hand();
  piles = Array(7).fill().map(p => new Pile());
  aces = new Aces();
  carrier = new Carrier();
  if (width > height) {
    CARDHEIGHT = height / 4;
    CARDWIDTH = CARDHEIGHT * 0.7142857;
  }
  CARDGAP = (width - (100 + CARDWIDTH * 7)) / 6;
}


/**
 * p5.js function. This function gets called about 30 times a second, and
 * will usually be responsible for displaying objects on screen.
 */
function draw() {
  //set the background to a game table green
  background(0, 67, 0);
  //show the deck
  deck.display(50, 50, width - 250); //magic number
  //show the hand
  hand.display(50 + CARDWIDTH + CARDGAP, 50);

  //display the piles
  for (let i = 0; i < piles.length; i++) {
    piles[i].display(50 + (CARDWIDTH + CARDGAP) * i, 50 + CARDHEIGHT + CARDGAP, !carrier.isCarrying);
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
      stroke(0, 255, 0);
      noFill();
      rect(tempPos.x, tempPos.y, tempPos.w, tempPos.h);
    }
    //do the same for each pile
    for (let i = 0; i < 7; i++) {
      let tempPos = piles[i].getCoords();
      if (carrier.checkOver(tempPos, mouseX, mouseY)) {
        stroke(0, 255, 0);
        noFill();
        rect(tempPos.x, tempPos.y, tempPos.w, tempPos.h);
        break;
      }
    }

  }
}

/**
 * deals out cards to each pile, 1 to the first, 2 to the second, and so on
 */
function deal() {
  for (let i = 0; i < 7; i++) {
    for (let j = i; j < 7; j++) {
      piles[j].draw(deck);
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
    console.log(result);
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
      deal();
    } else {
      //give the hand a card
      if (deck.cards.length === 0) {
        deck.transfer(hand.cards);
        hand.reset();
      } else {
        hand.draw(deck);
      }
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

/**
 * p5.js function. Gets called when the mouse is released.
 */
function mouseReleased() {
  //if the carrier is over the aces, and if it is drop the cards there
  if (carrier.checkOver(aces.getCoords(), mouseX, mouseY)) {
    carrier.drop(aces);
  } else {
    //otherwise, check if it is over a pile, and drop the cards there
    for (let i = 0; i < 7; i++) {
      if (carrier.checkOver(piles[i].getCoords(), mouseX, mouseY)) {
        carrier.drop(piles[i]);
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
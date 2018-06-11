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

//As soon as the window loads, create the deck and the hand objects
//setup is a p5.js function that gets called after the window loads
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

//p5.js function. Gets called about 30 times a second, and usually displays
//objects on screen.
function draw() {
  //set the background to a game table green
  background(0, 67, 0);
  //show the deck
  deck.display(50, 50, width - 250); //magic number
  //show the hand
  hand.display(50 + CARDWIDTH + CARDGAP, 50);

  for (let i = 0; i < piles.length; i++) {
    piles[i].display(50 + (CARDWIDTH + CARDGAP) * i, 50 + CARDHEIGHT + CARDGAP, !carrier.isCarrying);
  }

  aces.display(50 + 3 * (CARDWIDTH + CARDGAP), 50);

  carrier.display(mouseX, mouseY);


  if (carrier.isCarrying) {
    let tempPos = aces.getCoords();
    if (carrier.checkOver(tempPos, mouseX, mouseY)) {
      stroke(0, 255, 0);
      noFill();
      rect(tempPos.x, tempPos.y, tempPos.w, tempPos.h);
    }

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

function deal() {
  for (let i = 0; i < 7; i++) {
    for (let j = i; j < 7; j++) {
      piles[j].draw(deck);
    }
  }
}

//Allows the user to draw more than one card at a time
//if there are not enough cards in the deck, the hand
//draws however many cards are available
function drawMany(num) {
  //draw cards until the value is reached
  for (let i = 0; i < num; i++) {
    hand.draw(deck);
  }
}


/* Finds the card under the cursor and returns it, or as in the case of
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


function mousePressed() {
  if (deck.checkWithin(createVector(mouseX, mouseY))) {
    if (deck.cards.length === 52) {
      deal();
    } else {
      if (deck.cards.length === 0) {
        deck.transfer(hand.cards);
        hand.reset();
      } else {
        drawMany(3);
      }
    }
  } else {
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

function mouseReleased() {
  if (carrier.checkOver(aces.getCoords(), mouseX, mouseY)) {
    carrier.drop(aces);
  } else {
    for (let i = 0; i < 7; i++) {
      if (carrier.checkOver(piles[i].getCoords(), mouseX, mouseY)) {
        carrier.drop(piles[i]);
        carrier.empty();
        return;
      }
    }
    carrier.dropBack();
  }
  carrier.empty();
}

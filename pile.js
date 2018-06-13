class Pile {
  /**
   * A Pile represents the bottom row of cards that can be manipulated
   * @constructor
   */
  constructor() {
    //reset creates the cards array, so might as well use it here
    this.reset();
  }

  /**
   * Resets the pile
   */
  reset() {
    this.pos = createVector(0, 0);
    this.cards = [];
    console.log("Hand reset");
  }

  /**
   * Uses the internal addCard function to add a card from a given deck
   * @param deck - the deck to draw from
   */
  draw(deck) {
    this.addCard(deck.popCard());
  }

  /**
   * adds a card to the cards array
   * @param card - the card to be added
   */
  addCard(card) {
    //if card is not null
    if (card) {
      //add the card and let the user know
      this.cards[this.cards.length] = card;
      console.log("Added " + card.toString() + " to hand");
    } else {
      //the card is null, let the user know
      console.log("No cards found!");
    }
  }

  /**
   * draws the empty slot when there are no cards in the pile
   * @param x - the x position to draw the slot at
   * @param y - the y position to draw the slot at
   */
  drawSlot(x, y) {
    stroke(0);
    fill(255, 255, 255, 100);
    strokeWeight(3);
    rect(x, y, CARDWIDTH, CARDHEIGHT);
  }

  /**
   * Gives the coordinates of the pile
   * @return coords - custom object containing an x, a y, a width and a height
   */
  getCoords() {
    //create the object
    let coords = {
      x: 0,
      y: 0,
      w: 0,
      h: 0
    };
    //fill the object
    coords.x = this.pos.x;
    coords.y = this.pos.y;
    coords.w = CARDWIDTH;
    coords.h = CARDHEIGHT + 40 * max(this.cards.length - 1, 0);
    return coords;
  }

  /**
   * Used by the carrier to give cards to the pile.
   * @param cards - cards to be added to the cards array
   */
  giveCards(cards) {
    cards.forEach(c => this.addCard(c));
  }

  /**
   * checks if the passed coordinates are within each card, and returns the
   * card and this object if it is.
   * @param x - the x position to check
   * @param y - the y position to check
   * @returns a custom object that contains the cards and a reference to
   * this object
   */
  checkCards(x, y) {
    for (let i = this.cards.length - 1; i >= 0; i--) {
      if (this.cards[i].checkWithin(createVector(x, y))) {
        return {
          cards: this.cards.splice(i, this.cards.length - i),
          origin: this
        };
      }
    }
  }

  /**
   * Reveals the last card in the cards array if it is still face down.
   * @param {boolean} showLast - if true, show the last card, otherwise don't
   */
  showLast(showLast) {
    if (showLast && this.cards.length && this.cards[this.cards.length - 1].hide) {
      this.cards[this.cards.length - 1].hide = false;
    }
  }

  /**
   * Shows all the cards in the pile onscreen.
   * @param x - the x position to show the pile at
   * @param y - the y position to show the pile at
   * @param {boolean} showLast - if set, the pile will reveal the last card
   * if it is face down
   */
  display(x, y, showLast) {
    this.pos = createVector(x, y);
    //set delta to 40
    let delta = 40;
    let position = y;
    //Display each card and increment position by delta
    if (this.cards.length) {
      this.cards.forEach(c => {
        c.display(x, position);
        position += delta;
      });
    } else {
      this.drawSlot(x, y);
    }
    this.showLast(showLast);
  }
}
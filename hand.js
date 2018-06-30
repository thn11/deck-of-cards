class Hand {
  /**
   * A Hand object represents the cards that have been drawn
   */
  constructor() {
    //reset creates the cards array, so might as well use it here
    this.reset();
  }

  /**
   * Resets the hand by setting the pos to (0,0) and emptying the cards array
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
      //ensure card is not hidden
      card.hide = false;
      //add the card and let the user know
      this.cards[this.cards.length] = card;
      console.log("Added " + card.toString() + " to hand");
    } else {
      //the card is null, let the user know
      console.log("No cards found!");
    }
  }

  /**
   * Gives the coordinates of the hand
   * @return coords - custom object containing an x, a y, a width and a height
   */
  getCoords() {
    //make the object
    let coords = {
      x: 0,
      y: 0,
      w: 0,
      h: 0
    };
    //fill it
    coords.x = this.pos.x;
    coords.y = this.pos.y;
    coords.w = CARDWIDTH;
    coords.h = CARDHEIGHT;
    return coords;
  }

  /**
   * Used by the carrier to give cards to the hand.
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
    if (this.cards.length && this.cards[this.cards.length - 1].checkWithin(createVector(x, y))) {
      return {
        cards: this.cards.splice(this.cards.length - 1, 1),
        origin: this
      };
    } else {
      return null;
    }
  }

  popCard() {
    if (this.cards.length) {
      let tempCard = this.cards[this.cards.length - 1];
      //start splice at index 0 and splice 1 card
      this.cards.splice(this.cards.length - 1, 1);
      return tempCard;
      //could be done in one line:
      //return this.cards.splice(0,1);
      //but I opted for easy reading
    } else {
      //there are no more cards in the deck
      return null;
    }
  }

  /**
   * draws the empty slot when there are no cards in the hand
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
   * Shows the hand onscreen.
   * @param x - the x position to draw the hand at
   * @param y - the y position to draw the hand at
   */
  display(x, y) {
    this.pos = createVector(x, y);
    if (this.cards.length) {
      for (let i = 5; i > 0; i--) {
        //display the top 5 cards
        if (this.cards[this.cards.length - i]) {
          this.cards[this.cards.length - i].display(x, y);
        }
      }
    } else {
      this.drawSlot(x, y);
    }
  }
}
class Aces {
  /**
   * Represents the aces in the top right corner
   * @constructor
   */
  constructor() {
    //reset creates the cards array, so might as well use it here
    this.reset();
  }

  /**
   * Resets the aces, removing all cards
   */
  reset() {
    this.pos = createVector(0, 0);
    this.hearts = [];
    this.diamonds = [];
    this.clubs = [];
    this.spades = [];
    console.log("Aces reset");
  }

  /**
   * Checks if the x,y coordinates are on top of a card in the aces
   * @param {float} x - the X coordinates of the point to check
   * @param {float} y - the Y coordinates of the point to check
   */
  checkCards(x, y) {
    let pos = createVector(x, y);
    //check the last card in each pile
    if (this.hearts.length && this.hearts[this.hearts.length - 1].checkWithin(pos)) {
      return {
        cards: this.hearts.splice(this.hearts.length - 1, 1),
        origin: this
      };

    } else if (this.diamonds.length && this.diamonds[this.diamonds.length - 1].checkWithin(pos)) {
      return {
        cards: this.diamonds.splice(this.diamonds.length - 1, 1),
        origin: this
      };

    } else if (this.clubs.length && this.clubs[this.clubs.length - 1].checkWithin(pos)) {
      return {
        cards: this.clubs.splice(this.clubs.length - 1, 1),
        origin: this
      };

    } else if (this.spades.length && this.spades[this.spades.length - 1].checkWithin(pos)) {
      return {
        cards: this.spades.splice(this.spades.length - 1, 1),
        origin: this
      };

    } else {
      return null;
    }
  }

  /**
   * Runs this.addCard for each card
   * @param {Card} - cards to be added
   */
  giveCards(cards) {
    cards.forEach(c => this.addCard(c));
  }


  getCoords() {
    let coords = {
      x: 0,
      y: 0,
      w: 0,
      h: 0
    };
    coords.x = this.pos.x;
    coords.y = this.pos.y;
    coords.w = CARDWIDTH * 4 + CARDGAP * 3;
    coords.h = CARDHEIGHT;
    return coords;
  }

  //Uses internal functios to add a card. This could be turned into one
  //function, although it handles interaction with the deck
  draw(deck) {
    this.addCard(deck.popCard());
  }

  //Adds a card to the cards array, if it exists.
  addCard(card) {
    card.hide = false;
    //if card is not null
    if (card) {
      switch (card.suit) {
        case 0:
          this.clubs[this.clubs.length] = card;
          break;
        case 1:
          this.spades[this.spades.length] = card;
          break;
        case 2:
          this.hearts[this.hearts.length] = card;
          break;
        case 3:
          this.diamonds[this.diamonds.length] = card;
          break;
      }
    } else {
      //the card is null, let the user know
      console.log("No cards found!");
    }
  }

  displaySlot(x, y) {
    stroke(0);
    fill(255, 255, 255, 100);
    strokeWeight(3);
    rect(x, y, CARDWIDTH, CARDHEIGHT);
  }

  //Shows the hand on the screen. It takes a position and a width as arguments
  //but no height, because that is defined by the global card height
  display(x, y) {
    this.pos = createVector(x, y);
    //find the X increment between cards
    let delta = CARDWIDTH + CARDGAP;
    let position = x;
    //Display each card and increment position by delta
    if (this.spades.length) {
      this.spades[this.spades.length - 1].display(position, y);
    } else {
      this.displaySlot(position, y);
    }
    position += delta;
    if (this.hearts.length) {
      this.hearts[this.hearts.length - 1].display(position, y);
    } else {
      this.displaySlot(position, y);
    }
    position += delta;
    if (this.clubs.length) {
      this.clubs[this.clubs.length - 1].display(position, y);
    } else {
      this.displaySlot(position, y);
    }
    position += delta;
    if (this.diamonds.length) {
      this.diamonds[this.diamonds.length - 1].display(position, y);
    } else {
      this.displaySlot(position, y);
    }
  }
}
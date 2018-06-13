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

  /**
   * Returns the coordinates of the aces, and the width and height
   * @return coords - x, y, w, and h coordiantes
   */
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

  /**
   * Uses the internal addCard functon to add a card to the aces
   * @param deck - the deck to draw from
   */
  draw(deck) {
    this.addCard(deck.popCard());
  }

  /**
   * Adds a card to the aces, sorting it into the correct array.
   * @param card - the card to add
   */
  addCard(card) {
    //show the card
    card.hide = false;
    //if card is not null
    if (card) {
      //put the card into the correct array
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
      //there is no card, let the user know
      console.log("No cards found!");
    }
  }

  /**
   * Display an empty slot to indicate cards can go there
   * @param x - the X position of the slot
   * @param y - the Y position of the slot
   */
  displaySlot(x, y) {
    stroke(0);
    fill(255, 255, 255, 100);
    strokeWeight(3);
    rect(x, y, CARDWIDTH, CARDHEIGHT);
  }

  /**
   * Shows the aces onscreen.
   * @param x - the X position to display the hand at
   * @param y - the Y position to display the hand at
   */
  display(x, y) {
    this.pos = createVector(x, y);
    //find the X increment between cards
    let delta = CARDWIDTH + CARDGAP;
    let position = x;
    //Display each array's last card and increment position by delta
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
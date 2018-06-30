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
    for (let i = cards.length - 1; i >= 0; i--) {
      this.addCard(cards[i]);
    }
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

  getLowestMissing() {
    let obj = {
      suit: 0,
      value: 0
    };
    let lows = [
      this.spades.length,
      this.hearts.length,
      this.clubs.length,
      this.diamonds.length
    ];
    if (lows[0] <= lows[1] && lows[0] <= lows[2] && lows[0] <= lows[3]) {
      console.log(this.spades[lows[0] - 1] + " found");
      obj.suit = this.spades[lows[0] - 1].suit;
      obj.value = this.spades[lows[0] - 1].value;
    } else if (lows[1] <= lows[2] && lows[1] <= lows[3]) {
      console.log(this.hearts[lows[1] - 1] + " found");
      obj.suit = this.hearts[lows[1] - 1].suit;
      obj.value = this.hearts[lows[1] - 1].value;
    } else if (lows[2] <= lows[3]) {
      console.log(this.clubs[lows[2] - 1] + " found");
      obj.suit = this.clubs[lows[2] - 1].suit;
      obj.value = this.clubs[lows[2] - 1].value;
    } else {
      console.log(this.diamonds[lows[3] - 1] + " found");
      obj.suit = this.diamonds[lows[3] - 1].suit;
      obj.value = this.diamonds[lows[3] - 1].value;
    }
    return obj;
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

  count() {
    this.tempPos = this.pos.copy();
    return this.spades.length +
      this.hearts.length +
      this.clubs.length +
      this.diamonds.length;
  }

  drawWinSequence() {
    let SPEED = 20;
    if (!this.current) {
      console.log("Doing setup");
      this.current = 5;
      this.positions = [];
      this.fixedPositions = [];
      for (let i = 0; i < 4; i++) {
        this.positions[i] = createVector(
          this.pos.x + (CARDWIDTH + CARDGAP) * i,
          this.pos.y);
        this.fixedPositions[i] = this.positions[i].copy();
      }
      this.dirs = [
        p5.Vector.random2D().mult(SPEED),
        p5.Vector.random2D().mult(SPEED),
        p5.Vector.random2D().mult(SPEED),
        p5.Vector.random2D().mult(SPEED)
      ]
      this.spades.forEach(c => c.position(this.positions[0]));
      this.hearts.forEach(c => c.position(this.positions[1]));
      this.clubs.forEach(c => c.position(this.positions[2]));
      this.diamonds.forEach(c => c.position(this.positions[3]));
    }

    let currentCards = [];
    if (this.spades.length) {
      currentCards[0] = this.spades[this.spades.length - 1];
    }
    if (this.hearts.length) {
      currentCards[1] = this.hearts[this.hearts.length - 1];
    }
    if (this.clubs.length) {
      currentCards[2] = this.clubs[this.clubs.length - 1];
    }
    if (this.diamonds.length) {
      currentCards[3] = this.diamonds[this.diamonds.length - 1];
    }


    for (let i = 0; i < currentCards.length; i++) {
      if (currentCards[i]) {
        this.positions[i].add(this.dirs[i]);
        currentCards[i].position(this.positions[i]);
        currentCards[i].display();
        if (currentCards[i].isOutOfScreen()) {
          this.removeCard(i);
          this.dirs[i] = p5.Vector.random2D().mult(SPEED);
          this.positions[i] = this.fixedPositions[i].copy();
        }
      }
    }

    // move and draw card at proper position
    // edit position
    // check if card is offscreen
    // if card is offscreen, delete the card and start moving the next card
  }

  removeCard(num) {
    switch (num) {
      case 0:
        this.spades.splice(this.spades.length - 1, 1);
        break;
      case 1:
        this.hearts.splice(this.hearts.length - 1, 1);
        break;
      case 2:
        this.clubs.splice(this.clubs.length - 1, 1);
        break;
      case 3:
        this.diamonds.splice(this.diamonds.length - 1, 1);
        break;
      default:
        console.log("Something went wrong");
    }
  }

  /**
   * Figures out if the aces can take the cards
   * @param cards - the cards to check
   * @returns true if the cards can be taken
   */
  canTake(cards) {
    //cannot take in any hidden cards
    for (let i = 0; i < cards.length; i++) {
      if (cards[i].hide) {
        return false;
      }
    }

    //can take aces when empty, or ascending cards
    let tempAdds = [0, 0, 0, 0];
    for (let i = cards.length - 1; cards.length && i >= 0; i--) {
      if (cards[i].suit == 0) {
        if (cards[i].value == this.clubs.length + tempAdds[0]) {
          tempAdds[0] += 1;
        } else {
          return false;
        }
      } else if (cards[i].suit == 1) {
        if (cards[i].value == this.spades.length + tempAdds[1]) {
          tempAdds[1] += 1;
        } else {
          return false;
        }
      } else if (cards[i].suit == 2) {
        if (cards[i].value == this.hearts.length + tempAdds[2]) {
          tempAdds[2] += 1;
        } else {
          return false;
        }
      } else if (cards[i].suit == 3) {
        if (cards[i].value == this.diamonds.length + tempAdds[3]) {
          tempAdds[3] += 1;
        } else {
          return false;
        }
      }
    }
    return true;
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
    for (let i = 0; i < this.spades.length; i++) {
      this.spades[i].display(position, y);
    }
    if (!this.spades.length) {
      this.displaySlot(position, y);
    }
    position += delta;
    for (let i = 0; i < this.hearts.length; i++) {
      this.hearts[i].display(position, y);
    }
    if (!this.hearts.length) {
      this.displaySlot(position, y);
    }
    position += delta;
    for (let i = 0; i < this.clubs.length; i++) {
      this.clubs[i].display(position, y);
    }
    if (!this.clubs.length) {
      this.displaySlot(position, y);
    }
    position += delta;
    for (let i = 0; i < this.diamonds.length; i++) {
      this.diamonds[i].display(position, y);
    }
    if (!this.diamonds.length) {
      this.displaySlot(position, y);
    }
  }
}
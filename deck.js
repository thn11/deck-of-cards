class Deck {
  /**
   * a deck represents a deck of cards.
   * @param x - the x position of the deck
   * @param y - the y position of the deck
   */
  constructor(x, y) {
    this.pos = createVector(x, y);
    //reset function is called because the same behaviour is required
    //for the start as for the restart
    this.reset();
    //no cards should be shown while they are in the deck
    this.show = false;
  }

  /**
   * Resets the deck, giving it all 52 cards and shuffles them
   */
  reset() {
    this.cards = [];
    //create a deck of cards in ascending order
    for (let i = 0; i < 52; i++) {
      this.cards[i] = new Card(Math.floor(i / 13), i % 13, this.pos.x, this.pos.y, true);
    }
    // use the shuffle function to shuffle the cards.
    // p5.js has an Array.shuffle() function that could replace this.
    this.shuffle();
    console.log("Deck reset");
  }

  /**
   * Enables the hand to transfer the cards back to the deck
   * @param cards - cards array to be added
   *
   */
  transfer(cards) {
    this.cards = [];
    for (let i = 0; i < cards.length; i++) {
      this.cards[i] = cards[i];
    }
  }

  /**
   * Takes the first card in the deck, removes and then returns it.
   * @returns the first card in the deck
   */
  popCard() {
    if (this.cards.length) {
      let tempCard = this.cards[0];
      //start splice at index 0 and splice 1 card
      this.cards.splice(0, 1);
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
   * Shuffles the cards in the deck
   */
  shuffle() {
    //One array contains indexes, the other the objects themselves
    let available = [];
    let tempCards = [];
    for (let i = 0; i < this.cards.length; i++) {
      available[i] = i;
      tempCards[i] = this.cards[i];
      tempCards[i].pos.y += random(-100, 100);
    }

    //for each temporary card, put it somewhere in the deck and remove
    //that index from the array so no other card can go there.
    tempCards.forEach((card) => {
      let random = Math.floor(Math.random() * available.length);
      let index = available[random];
      this.cards[index] = card;
      available.splice(random, 1);
    });
    console.log("Deck is shuffled");
  }

  /**
   * Checks whether or not the target is within the boundaries of the deck
   * @param target - p5.js vector object of the target to check
   * @return {boolean} - true if the target is within the boundaries, false
   * otherwise
   */
  checkWithin(target) {
    if (target.x < this.pos.x) {
      return false;
    } else if (target.x > this.pos.x + CARDWIDTH) {
      return false;
    } else if (target.y < this.pos.y) {
      return false;
    } else if (target.y > this.pos.y + CARDHEIGHT) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * shows the deck onscreen
   */
  display() {
    if (this.cards.length) {
      // show the top card and make all cards move towards the position
      // of the deck
      this.cards[0].display(this.pos.x, this.pos.y, true);
      this.cards.forEach(c => c.approach(this.pos));
    } else {
      //show the empty slot
      stroke(0);
      strokeWeight(3);
      fill(255, 255, 255, 100);
      rect(this.pos.x, this.pos.y, CARDWIDTH, CARDHEIGHT);
    }
  }
}
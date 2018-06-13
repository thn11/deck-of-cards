class Carrier {
  /**
   * A Carrier holds cards and moves them around with the mouse
   * @constructor
   */
  constructor() {
    this.empty();
  }

  /**
   * Resets the carrier, making it ready for the next drag
   */
  empty() {
    this.cards = [];
    this.origin = null;
    this.isCarrying = false;
    this.mouseOffset = createVector(0, 0);
    console.log("Carrier Emptied");
  }


  /**
   * Drops all current cards into the origin of the cards and resets the
   * cards array to ensure no duplication occurs.
   */
  dropBack() {
    if (this.origin) {
      this.origin.giveCards(this.cards);
      this.cards = [];
    }
  }

  /**
   * Checks if the carrier is over a given position.
   * @param position - a custom object containing an x, a y, a width,
   * and a height
   * @param x - the x position to check for
   * @param y - the y position to check for
   */
  checkOver(position, x, y) {
    if (x < position.x) {
      return false;
    } else if (x > position.x + position.w) {
      return false;
    } else if (y < position.y) {
      return false;
    } else if (y > position.y + position.h) {
      return false;
    } else {
      return true;
    }
  }


  /**
   * Drops all current cards into the given object and sets the cards array
   * to empty to ensure no duplication occurs
   * @param object - the object to drop the cards to
   */
  drop(object) {
    object.giveCards(this.cards);
    this.cards = [];
  }

  /**
   * Sets the offset to the position, ensuring if a user clicks a card
   * in the bottom right corner, the card is dragged by that corner, for
   * instance.
   * @param x - the x offset
   * @param y - the y offset
   */
  setOffset(x, y) {
    if (x && y) {
      //x and y are defined, create a vector pointing there
      let tempX = this.cards[0].pos.x - x;
      let tempY = this.cards[0].pos.y - y;
      this.mouseOffset = createVector(tempX, tempY);
    } else {
      //x or y is zero or not defined, set them both to zero
      this.mouseOffset = createVector(0, 0);
    }
  }

  /**
   * Adds a card to the cards array, and updates the origin to the ojbect that
   * gave it the card.
   * @param cards - the array of cards to be added
   * @param origin - a reference to the object that gave the carrier cards
   */
  addCards(cards, origin) {
    //when this.isCarrying is true, piles won't reveal the next card.
    this.isCarrying = true;
    //set the origin
    this.origin = origin;
    console.log("Adding " + cards[0].toString() + " to carrier");
    //if card is not null
    if (cards) {
      // because the carrier should always be empty when it starts carrying
      // new cards, just set the cards array to the cards paramater
      this.cards = cards;
    } else {
      //the card is null, let the user know
      console.log("No cards found!");
    }
  }

  /**
   * Shows the carrier onscreen. It is always shown, but usually it will not
   * have any cards to display.
   * @param x - the x coordinates to display the carrier at (usually mouseX)
   * @param y - the y coordinates to display the carrier at (usually mouseY)
   */
  display(x, y) {
    //add the offset so it displays correctly
    x += this.mouseOffset.x;
    y += this.mouseOffset.y;
    //The distance between each vertical card is 40 pixels
    let delta = 40;
    let position = y;
    //Display each card and increment position by delta
    this.cards.forEach(c => {
      c.display(x, position);
      position += delta;
    });
  }
}
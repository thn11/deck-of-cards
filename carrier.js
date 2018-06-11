class Carrier {
  constructor() {
    //reset creates the cards array, so might as well use it here
    this.empty();
  }

  //reset the hand
  empty() {
    this.cards = [];
    this.origin = null;
    this.isCarrying = false;
    this.mouseOffset = createVector(0, 0);
    console.log("Carrier Emptied");
  }

  dropBack() {
    if (this.origin) {
      this.origin.giveCards(this.cards);
      this.cards = [];
    }
  }

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

  drop(object) {
    object.giveCards(this.cards);
    this.cards = [];
  }

  setOffset(x, y) {
    if (x && y) {
      let tempX = this.cards[0].pos.x - x;
      let tempY = this.cards[0].pos.y - y;
      this.mouseOffset = createVector(tempX, tempY);
    } else {
      this.mouseOffset = createVector(0, 0);
    }
  }

  //Adds a card to the cards array, if it exists.
  addCards(cards, origin) {
    this.isCarrying = true;
    this.origin = origin;
    console.log("Adding " + cards[0].toString() + " to carrier");
    //if card is not null
    if (cards) {
      this.cards = cards;
    } else {
      //the card is null, let the user know
      console.log("No cards found!");
    }
  }

  //Shows the hand on the screen. It takes a position and a width as arguments
  //but no height, because that is defined by the global card height
  display(x, y) {
    x += this.mouseOffset.x;
    y += this.mouseOffset.y;
    //find the X increment between cards
    let delta = 40;
    let position = y;
    //Display each card and increment position by delta
    this.cards.forEach(c => {
      c.display(x, position);
      position += delta;
    });
  }
}

class Pile {
  constructor() {
    //reset creates the cards array, so might as well use it here
    this.reset();
  }

  //reset the hand
  reset() {
    this.pos = createVector(0, 0);
    this.cards = [];
    console.log("Hand reset");
  }

  //Uses internal functios to add a card. This could be turned into one
  //function, although it handles interaction with the deck
  draw(deck) {
    this.addCard(deck.popCard());
  }

  //Adds a card to the cards array, if it exists.
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

  drawSlot(x, y) {
    stroke(0);
    fill(255, 255, 255, 100);
    strokeWeight(3);
    rect(x, y, CARDWIDTH, CARDHEIGHT);
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
    coords.w = CARDWIDTH;
    coords.h = CARDHEIGHT + 40 * this.cards.length;
    return coords;
  }

  giveCards(cards) {
    cards.forEach(c => this.addCard(c));
  }

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

  showLast(showLast) {
    if (showLast && this.cards.length && this.cards[this.cards.length - 1].hide) {
      this.cards[this.cards.length - 1].hide = false;
    }
  }

  //Shows the hand on the screen. It takes a position and a width as arguments
  //but no height, because that is defined by the global card height
  display(x, y, showLast) {
    this.pos = createVector(x, y);
    //find the X increment between cards
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

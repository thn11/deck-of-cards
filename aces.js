class Aces {
  constructor() {
    //reset creates the cards array, so might as well use it here
    this.reset();
  }

  //reset the hand
  reset() {
    this.hearts = [];
    this.diamonds = [];
    this.clubs = [];
    this.spades = [];
    console.log("Hand reset");
  }

  checkCards(x, y) {

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
          this.spades[this.clubs.length] = card;
          break;
        case 2:
          this.hearts[this.clubs.length] = card;
          break;
        case 3:
          this.diamonds[this.clubs.length] = card;
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

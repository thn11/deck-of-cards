class Hand {
  constructor() {
    //reset creates the cards array, so might as well use it here
    this.reset();
  }

  //reset the hand
  reset() {
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
      card.hide = false;
      this.cards[this.cards.length] = card;
      console.log("Added " + card.toString() + " to hand");
    } else {
      //the card is null, let the user know
      console.log("No cards found!");
    }
  }

  //sorts the cards first by suit then by value.
  sort() {
    this.cards.sort((a, b) => {
      //gives the value of the card a 1/100th the "importance" of the suit
      //this could also be a.suit * 13 + a.value - b.suit * 13 + b.value
      return (a.suit - b.suit) + 0.01 * (a.value - b.value);
    });
    console.log("Hand is sorted");
  }

  drawSlot(x, y) {
    stroke(0);
    fill(255, 255, 255, 100);
    strokeWeight(3);
    rect(x, y, CARDWIDTH, CARDHEIGHT);
  }

  checkCards(x, y) {
    if (this.cards.length && this.cards[this.cards.length - 1].checkWithin(createVector(x, y))) {
      return this.cards.splice(this.cards.length - 1, 1);
    } else {
      return null;
    }
  }

  //Shows the hand on the screen. It takes a position and a width as arguments
  //but no height, because that is defined by the global card height
  display(x, y) {
    //find the X increment between cards
    if (this.cards.length) {
      //Display each card and increment position by delta

      for (let i = 5; i > 0; i--) {
        if (this.cards[this.cards.length - i]) {
          this.cards[this.cards.length - i].display(x, y);
        }
      }
    } else {
      this.drawSlot(x, y);
    }
  }
}

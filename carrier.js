class Carrier {
  constructor() {
    //reset creates the cards array, so might as well use it here
    this.empty();
  }

  //reset the hand
  empty() {
    this.cards = [];
    this.mouseOffset = createVector(0, 0);
    console.log("Carrier Emptied");
  }

  //Uses internal functios to add a card. This could be turned into one
  //function, although it handles interaction with the deck
  draw(deck) {
    this.addCard(deck.popCard());
  }

  setOffset(x, y) {
    let tempX = this.cards[0].pos.x - x;
    let tempY = this.cards[0].pos.y - y;
    this.mouseOffset = createVector(tempX, tempY);
  }

  //Adds a card to the cards array, if it exists.
  addCards(cards) {
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

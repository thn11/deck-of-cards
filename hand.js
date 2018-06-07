class Hand {
  constructor() {
    this.reset();
  }

  reset() {
    this.cards = [];
    console.log("Hand reset");
  }

  draw(deck) {
    this.addCard(deck.popCard());
  }

  addCard(card) {
    //if card is not null
    if (card) {
      this.cards[this.cards.length] = card;
      console.log("Added " + card.toString() + " to hand");
    } else {
      console.log("There are no more cards in the deck!");
    }
  }

  sort() {
    this.cards.sort((a, b) => {
      //gives the value of the card a 1/100th the "importance" of the suit
      return (a.suit - b.suit) + 0.01 * (a.value - b.value);
    });
    console.log("Hand is sorted");
  }

  display() {

  }
}

class Hand {
  constructor() {
    this.reset();
  }

  reset() {
    this.cards = [];
    this.updateHTML();
    console.log("Hand reset");
  }

  draw(deck) {
    this.addCard(deck.popCard());
    this.updateHTML();
  }

  addCard(card) {
    //if card is not null
    if (card) {
      this.cards[this.cards.length] = card;
      console.log("Added " + card.toString() + " to hand");
      this.updateHTML();
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
    this.updateHTML();
  }

  updateHTML() {
    //get the paragraph element
    let p = document.getElementById("handP");
    p.innerHTML = "";
    //if there are cards in the hand, show them
    if (this.cards.length) {
      this.cards.forEach((card) => {
        p.innerHTML += card.toString() + "<br/>";
      });
    } 
    //Display the number of cards instead
    p.innerHTML += (this.cards.length < 1 ? "No" : this.cards.length) +
    " cards in the hand";
  }
}

class Deck {
  constructor() {
    //reset function is called because the same behaviour is required
    //for the start as for the restart
    this.reset();
    this.show = false;
  }

  reset() {
    this.cards = [];
    //create a deck of cards in ascending order
    for (let i = 0; i < 52; i++) {
      this.cards[i] = new Card(Math.floor(i / 13), i % 13, -CARDWIDTH, -CARDHEIGHT);
    }
    console.log("Deck reset");
  }

  //toggles hiding the cards the cards and sets the text on the button accordingly
  showHide() {
    this.show = !this.show;
    //set the button text
    select("#showButton").html(this.show ? "Hide" : "Show");
    console.log(this.show);
  }

  /* This function takes the first card in the deck, removes and then
   * returns it.
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
      return null;
    }
  }

  /* This function shuffles the cards in the deck
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

  //See hand.js for detailed explanation
  display(x, y, w) {
    let delta = (w - CARDWIDTH) / (this.cards.length);
    let position = x;
    this.cards.forEach(c => {
      c.display(position, y, !this.show);
      position += delta;
    });
  }
}

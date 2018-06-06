class Deck {
  constructor() {
    //reset function is called because the same behaviour is required
    //for the start as for the restart
    this.reset();
  }

  reset() {
    this.cards = [];
    //create a deck of cards in ascending order
    for (let i = 0; i < 52; i++) {
      this.cards[i] = new Card(Math.floor(i / 13), i % 13);
    }
    this.updateHTML()
    console.log("Deck reset");
  }

  /* This function takes the first card in the deck, removes and then
   * returns it.
   */
  popCard() {
    if (this.cards.length) {
      let tempCard = this.cards[0];
      //start splice at index 0 and splice 1 card
      this.cards.splice(0, 1);
      this.updateHTML()
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
    this.updateHTML()
  }

  //updates the html to display the cards
  updateHTML() {
    //get the paragraph element
    let p = document.getElementById("deckP");
    //If the cards should be shown
    p.innerHTML = "";
    if (document.getElementById("showDeckCheckBox").checked) {
      if (this.cards.length) {
        this.cards.forEach((card) => {
          p.innerHTML += card.toString() + "<br/>";
        });
      }
    }
    //Display the number of cards instead
    p.innerHTML += (this.cards.length < 1 ? "No" : this.cards.length) +
      " cards in the deck";
    
  }
}

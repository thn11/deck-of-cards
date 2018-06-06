class Card {
  constructor(suit, value) {
    //A card has a suit and a value
    this.suit = suit;
    this.value = value;
  }

  //Nicely format a string to show the card in the console
  toString() {
    //First add the card value, if it is a face card or an ace, add a special
    //string instead
    let output = "";
    switch (this.value) {
      case 12:
        output += "Ace";
        break;
      case 11:
        output += "King";
        break;
      case 10:
        output += "Queen";
        break;
      case 9:
        output += "Jack";
        break;
      default:
        output += this.value + 2;
    }
    //Add the word "of" and some spaces to make it look nice
    output += " of ";
    //Add the suit of the card.
    //To make sorting easier, the order of the suits has been changed
    switch (this.suit) {
      case 0:
        output += "Clubs";
        break;
      case 1:
        output += "Spades";
        break;
      case 2:
        output += "Hearts";
        break;
      case 3:
        output += "Diamonds";
        break;
    }
    return output;
  }
}

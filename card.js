class Card {
  constructor(suit, value, x, y) {
    //A card has a suit and a value
    this.suit = suit;
    this.value = value;
    this.pos = createVector(x, y);
  }

  display(x, y) {
    fill(255);
    stroke(25);
    rect(x, y, CARDWIDTH, CARDHEIGHT);
    this.suit > 2 ? fill(255, 0, 0) : fill(0);
    text(this.toString, x + CARDWITH / 100, y + CARDHEIGHT / 100);
  }


  getSuit() {
    switch (this.suit) {
      case 0:
        return "Clubs";
      case 1:
        return "Spades";
      case 2:
        return "Hearts";
      case 3:
        return "Diamonds";
    }
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
    output += this.getSuit();
    return output;
  }
}

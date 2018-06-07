class Card {
  constructor(suit, value, x, y) {
    //A card has a suit and a value
    this.suit = suit;
    this.value = value;
    this.pos = createVector(x, y);
  }

  display(x, y, hide) {
    //console.log("Showing at (" + x + "," + y + ")");
    strokeWeight(1);
    fill(255);
    stroke(25);
    this.aproach(createVector(x, y));
    if (!hide) {
      rect(this.pos.x, this.pos.y, CARDWIDTH, CARDHEIGHT);
      this.suit >= 2 ? fill(255, 0, 0) : fill(0);
      textAlign(LEFT, TOP);
      textSize(16);
      text(this.getSuit(true), this.pos.x + 2, this.pos.y + 2);
      text(this.getValue(true), this.pos.x + 2, this.pos.y + 20);
    } else {
      strokeWeight(3);
      stroke(0);
      fill(100);
      rect(this.pos.x, this.pos.y, CARDWIDTH, CARDHEIGHT);
      strokeWeight(8);
      fill(170);
      ellipse(this.pos.x + CARDWIDTH / 2, this.pos.y + CARDHEIGHT / 2, 52);
    }
  }

  aproach(target) {
    if (true) {
      let difference = p5.Vector.sub(this.pos, target);
      difference.limit(8);
      this.pos.sub(difference);
      this.pos.lerp(target, 0.06);
    } else {
      this.pos.lerp(target, 0.08);
    }
  }

  getSuit(symbol) {
    if (symbol) {
      switch (this.suit) {
        case 0:
          return "♣";
        case 1:
          return "♠";
        case 2:
          return "♥";
        case 3:
          return "♦";
      }
    }
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


  getValue(symbol) {
    if (symbol) {
      switch (this.value) {
        case 12:
          return "A";
        case 11:
          return "K";
        case 10:
          return "Q";
        case 9:
          return "J";
        default:
          return this.value + 2;
      }
    }
    switch (this.value) {
      case 12:
        return "Ace";
      case 11:
        return "King";
      case 10:
        return "Queen";
      case 9:
        return "Jack";
      default:
        return this.value + 2;
    }
  }


  //Nicely format a string to show the card in the console
  toString() {
    //First add the card value, if it is a face card or an ace, add a special
    //string instead
    let output = "";
    output += this.getValue();
    //Add the word "of" and some spaces to make it look nice
    output += " of ";
    //Add the suit of the card.
    //To make sorting easier, the order of the suits has been changed
    output += this.getSuit();
    return output;
  }
}

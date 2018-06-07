class Card {
  constructor(suit, value, x, y) {
    //A card has a suit, a value, and a position
    this.suit = suit;
    this.value = value;
    this.pos = createVector(x, y);
  }

  display(x, y, hide) {
    strokeWeight(1);
    fill(255);
    stroke(25);
    this.aproach(createVector(x, y));
    if (!hide) {
      //Draw the rect that makes up the body of the card
      rect(this.pos.x, this.pos.y, CARDWIDTH, CARDHEIGHT);
      this.suit >= 2 ? fill(255, 0, 0) : fill(0);
      push(); //save state
      //move to the middle of the card
      translate(this.pos.x + CARDWIDTH / 2, this.pos.y + CARDHEIGHT / 2);
      textAlign(LEFT, TOP);
      textSize(16);
      //draw the suit in the top left corner
      text(this.getSuit(true), -CARDWIDTH / 2 + 5, -CARDHEIGHT / 2);
      //draw the value in the top left corner
      text(this.getValue(true), -CARDWIDTH / 2 + 5, -CARDHEIGHT / 2 + 20);
      //rotate 180 degrees and repeat
      rotate(PI);
      text(this.getSuit(true), -CARDWIDTH / 2 + 5, -CARDHEIGHT / 2);
      text(this.getValue(true), -CARDWIDTH / 2 + 5, -CARDHEIGHT / 2 + 20);
      rotate(-PI);
      //Draw the big suit in the middle
      textAlign(CENTER, CENTER);
      textSize(80);
      text(this.getSuit(true), 0, 0);
      pop(); //restore state


    } else {
      //show the back of the card
      strokeWeight(3);
      stroke(0);
      fill(100);
      //draw the body of the card
      rect(this.pos.x, this.pos.y, CARDWIDTH, CARDHEIGHT);
      //increase strokeweight, and fill with a lighter gray
      strokeWeight(8);
      fill(170);
      //draw the circle
      ellipse(this.pos.x + CARDWIDTH / 2, this.pos.y + CARDHEIGHT / 2, 52);
    }
  }

  //This function lets the card slowly approach whatever position the
  //program wants it to be in. It takes a p5.Vector object as a param
  aproach(target) {
    //find the difference between the current position and the wanted position
    let difference = p5.Vector.sub(this.pos, target);
    //limit the length of the vector to 8 units
    difference.limit(8);
    //subtract that from the position
    this.pos.sub(difference);
    //speed things up in the start with some linear interpolation
    this.pos.lerp(target, 0.06);
  }

  //returns the suit in text or as a symbol, depending on whether
  //the paramater is set / true.
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

  //returns the value in text or as a letter / number, depending on whether
  //the paramater is set / true.
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
    //first set the value of the card as the string
    let output = this.getValue();
    //Add the word "of" and some spaces to make it look nice
    output += " of ";
    //Add the suit of the card.
    output += this.getSuit();
    return output;
  }
}

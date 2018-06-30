class Card {
  /**
   * A card has a value, a suit and a position. It also knows
   * if it is face up or down.
   * @constructor
   * @param suit - the card's suit represented by a number between 0 and 3
   * @param value - the card's value, 12 is ace, 0 is 2
   * @param x - the x coordinates for the card
   * @param y - the y coordinates for the card
   * @param hide - defines whether the card should be face up or down
   */
  constructor(suit, value, x, y, hide) {
    this.suit = suit;
    this.value = value;
    this.pos = createVector(x, y);
    if (hide) {
      this.hide = hide;
    } else {
      this.hide = false;
    }
  }

  position(pos) {
    this.pos = pos;
  }

  /**
   * Shows the card on screen. Usually called from one of the other classes
   * @param x - the x coordinates to move towards
   * @param y - the y coordinates to move towards
   * @param hide - updates this.hide to match if defined
   */
  display(x, y, hide) {
    if (hide != null) {
      this.hide = hide;
    }
    strokeWeight(1);
    fill(255);
    stroke(25);
    if (x != null && y != null) {
      this.approach(createVector(x, y));
    }
    if (!this.hide) {
      //Draw the rect that makes up the body of the card
      rect(this.pos.x, this.pos.y, CARDWIDTH, CARDHEIGHT);
      this.suit >= 2 ? fill(255, 0, 0) : fill(0);
      push(); //save state
      //move to the middle of the card
      translate(this.pos.x + CARDWIDTH / 2, this.pos.y + CARDHEIGHT / 2);
      textAlign(LEFT, TOP);
      noStroke();
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

  isOutOfScreen() {
    if (this.pos.x + CARDWIDTH < 0) {
      console.log("Card is off left");
      return true;
    } else if (this.pos.x > width) {
      console.log("Card is off right");
      return true;
    } else if (this.pos.y + CARDHEIGHT < 0) {
      console.log("Card is off top");
      return true;
    } else if (this.pos.y > height) {
      console.log("Card is off bottom");
      return true;
    } else {
      return false;
    }
  }

  /**
   * Checks if the given position is within the boundaries of the card
   * @param pos - p5.js Vector object to check for
   * @return {boolean} - true if the coordinates are within the card
   */
  checkWithin(pos) {
    //pretty standard stuff in here, check if x is less than this.x and
    //the same for y, check if x is more than this.x + this.width, and
    // the same for y, and if none of those are true, return true
    if (pos.x < this.pos.x) {
      return false;
    } else if (pos.x > this.pos.x + CARDWIDTH) {
      return false;
    } else if (pos.y < this.pos.y) {
      return false;
    } else if (pos.y > this.pos.y + CARDHEIGHT) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * Moves the card towards the given target at a moderate speed. A linear
   * component and an exponential component work together to produce the
   * final result.
   * @param target - the position to move towards
   */
  approach(target) {
    //find the difference between the current position and the wanted position
    let difference = p5.Vector.sub(target, this.pos);
    //limit the length of the vector to 8 units
    difference.limit(8);
    //add that to the position
    this.pos.add(difference);
    //speed things up in the start with some linear interpolation
    this.pos.lerp(target, 0.06);
  }

  /**
   * Returns the text representing the suit of the card
   * @param symbol - if set, return the symbol, otherwise the text
   * @return the symbol or text representing the suit
   * @todo - could be made into a single switch statement
   */
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

  /**
   * Returns the text representing the value of the card
   * @param symbol - if set, return the symbol, otherwise the text
   * @return the symbol or text representing the value
   * @todo - could be made into a single switch statement
   */
  getValue(symbol) {
    if (symbol) {
      switch (this.value) {
        case 0:
          return "A";
        case 12:
          return "K";
        case 11:
          return "Q";
        case 10:
          return "J";
        default:
          return this.value + 1;
      }
    }
    switch (this.value) {
      case 0:
        return "Ace";
      case 12:
        return "King";
      case 11:
        return "Queen";
      case 10:
        return "Jack";
      default:
        return this.value + 1;
    }
  }


  /**
   * formats a string representing the card
   * @return output - the string representing the card
   */
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
let deck;
let hand;
let CARDHEIGHT = 200; //set the card height to 200 (arbitrary),
let CARDWIDTH = CARDHEIGHT * 0.7142857; //and set the card width according to
//the actual difference between width
//and height of a normal playing card

//As soon as the window loads, create the deck and the hand objects
//setup is a p5.js function that gets called after the window loads
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  deck = new Deck();
  hand = new Hand();
  if (width > height) {
    CARDHEIGHT = height / 4;
    CARDWIDTH = CARDHEIGHT * 0.7142857;
  }
}

//p5.js function. Gets called about 30 times a second, and usually displays
//objects on screen.
function draw() {
  //set the background to a game table green
  background(0, 67, 0);
  //show the deck
  deck.display(20, CARDHEIGHT / 2, width - 250); //magic number
  //show the hand
  hand.display(20, height - CARDHEIGHT * 1.5, width - 250);
}

//Allows the user to draw more than one card at a time
//if there are not enough cards in the deck, the hand
//draws however many cards are available
function drawMany() {
  //select the number input to set how many cards to get
  let inputField = select("#drawMore");
  //if the user has set it to a negative value, set the value
  //to zero to inform the user that no cards have been taken
  inputField.value(max(0, inputField.value()));
  //draw cards until the value is reached
  for (let i = 0; i < inputField.value(); i++) {
    hand.draw(deck);
  }
}

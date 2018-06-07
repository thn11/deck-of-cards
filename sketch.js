let deck;
let hand;

//As soon as the window loads, create the deck and the hand objects
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  deck = new Deck();
  hand = new Hand();
}

function draw() {
  background(255);
  deck.display(0, 0, width / 2, height);
  hand.display(width / 2, 0, width, height);
}

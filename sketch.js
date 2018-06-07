let deck;
let hand;
const CARDHEIGHT = 200;
const CARDWIDTH = CARDHEIGHT * 0.7142857;

//As soon as the window loads, create the deck and the hand objects
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  deck = new Deck();
  hand = new Hand();
}

function draw() {
  background(0, 67, 0);
  deck.display(20, CARDHEIGHT, width * 9 / 10);
  hand.display(20, height - CARDHEIGHT * 2, width * 9 / 10);
}


function drawMany() {
  for (let i = 0; i < select("#drawMore").value(); i++) {
    hand.draw(deck);
  }
}

 class Deck {
    constructor() {
    this.deck = [];
    this.reset(); 
    this.shuffle(); 
  } 
  
  
  reset() {
    this.deck = [];
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];

    for (let suit in suits) {
      for (let value in values) {
        this.deck.push(values[value] + " of " + suits[suit]);
      }
    }

  } //End of reset()
  
  
  shuffle() {
    let numberOfCards = this.deck.length;  
    for (var i=0; i<numberOfCards; i++) {
      let j = Math.floor(Math.random() * numberOfCards);
      let tmp = this.deck[i];
      this.deck[i] = this.deck[j];
      this.deck[j] = tmp;
    }
  } //End of shuffle()
  
  deal(){
    return this.deck.pop();
  } //End of deal()
  
  isEmpty() {
    return (this.deck.length==0);
  } //End of isEmpty()
  
  length() {
    return this.deck.length;
  } //End of length()
  
} //End of Deck Class

class Card {
  constructor(card) {
      this.card = card;
      const cardValues = {"Ace of Hearts":1, "2 of Hearts":2, "3 of Hearts":3, "4 of Hearts":4, "5 of Hearts":5, "6 of Hearts":6, "7 of Hearts":7, "8 of Hearts":8, "9 of Hearts":9, "10 of Hearts":10, "Jack of Hearts":11, "Queen of Hearts":12, "King of Hearts":13, "Ace of Diamonds":1, "2 of Diamonds":2, "3 of Diamonds":3, "4 of Diamonds":4, "5 of Diamonds":5, "6 of Diamonds":6, "7 of Diamonds":7, "8 of Diamonds":8, "9 of Diamonds":9, "10 of Diamonds":10, "Jack of Diamonds":11, "Queen of Diamonds":12, "King of Diamonds":13, "Ace of Clubs":1, "2 of Clubs":2, "3 of Clubs":3, "4 of Clubs":4, "5 of Clubs":5, "6 of Clubs":6, "7 of Clubs":7, "8 of Clubs":8, "9 of Clubs":9, "10 of Clubs":10, "Jack of Clubs":11, "Queen of Clubs":12, "King of Clubs":13, "Ace of Spades":1, "2 of Spades":2, "3 of Spades":3, "4 of Spades":4, "5 of Spades":5, "6 of Spades":6, "7 of Spades":7, "8 of Spades":8, "9 of Spades":9, "10 of Spades":10, "Jack of Spades":11, "Queen of Spades":12, "King of Spades":13};
    
    this.value = cardValues[card];
    this.suit = card.substring(card.indexOf(" of ")+4);
    this.placeHolder = null;
    this.flipped = false;
  
    var suits = {'Hearts':0, 'Diamonds':13, 'Clubs':26, 'Spades':39 }
    this.position = suits[this.suit] + this.value; //Position in a sorted deck
  } //End of Constructor
  
  displayCard(placeHolder,flipped=true) {
    this.placeHolder = document.getElementById(placeHolder);
    this.placeHolder.classList.add("card");
    this.flipped=flipped;
    if (flipped) {
      this.placeHolder.style.backgroundPosition = -150*this.position + "px";
    } else {
      this.placeHolder.style.backgroundPosition = "0px";  
    }
  } // End of displayCard
  
  flip() {
    if (this.flipped) {
      this.placeHolder.style.backgroundPosition = "0px";
      this.flipped=false;
    } else {
      this.placeHolder.style.backgroundPosition = -150*this.position + "px";
      this.flipped=true;  
    }
  } //End of flip()
  
} //End of Card class

const deck = new Deck();
let card1,card2,card3,card4,card5,playerCard1,playerCard2, computersCard1, computersCard2;

function deal() {
  if (deck.length()<7) {
    deck.reset();
    deck.shuffle();
  }  
  card1 = new Card(deck.deal());
  card2 = new Card(deck.deal());
  card3 = new Card(deck.deal());
  card4 = new Card(deck.deal());
  card5 = new Card(deck.deal());
  playerCard1 = new Card(deck.deal());
  playerCard2 = new Card(deck.deal());
  computersCard1 = new Card(deck.deal());
  computersCard2 = new Card(deck.deal());

  
  card1.displayCard("card1",false);  
  card2.displayCard("card2",false);  
  card3.displayCard("card3",false);  
  card4.displayCard("card4",false);  
  card5.displayCard("card5",false);  
  playerCard1.displayCard("playerCard1",true);  
  playerCard2.displayCard("playerCard2",true); 
  computersCard1.displayCard("computersCard1",true); 
  computersCard2.displayCard("computersCard2",true); 
  playerCard2.displayCard("computerCard1",true); 
  playerCard2.displayCard("computerCard2",true); 
  computersCard2.displayCard("computerCard1",true); 
  computersCard2.displayCard("computerCard2",true); 
} //End of deal()

function nextStep(el) {
  if (!card1.flipped) {
    card1.flip();
    card2.flip();
    card3.flip();
    el.innerHTML="Reveal 4<sup>th</sup> card";
  } else if(!card4.flipped) {
    card4.flip();
    el.innerHTML="Reveal 5<sup>th</sup> card";
} else if(!card5.flipped) {
    card5.flip();
    el.innerHTML="New Round";
} else {
  deal();
  el.innerHTML="Reveal first 3 cards.";
}

const order = "23456789TJQKA"
function getHandDetails(hand) {
    const cards = hand.split(" ")
    const faces = cards.map(a => String.fromCharCode([77 - order.indexOf(a[0])])).sort()
    const suits = cards.map(a => a[1]).sort()
    const counts = faces.reduce(count, {})
    const duplicates = Object.values(counts).reduce(count, {})
    const flush = suits[0] === suits[4]
    const first = faces[0].charCodeAt(0)
    const straight = faces.every((f, index) => f.charCodeAt(0) - first === index)
    let rank =
        (flush && straight && 1) ||
        (duplicates[4] && 2) ||
        (duplicates[3] && duplicates[2] && 3) ||
        (flush && 4) ||
        (straight && 5) ||
        (duplicates[3] && 6) ||
        (duplicates[2] > 1 && 7) ||
        (duplicates[2] && 8) ||
        9

    return { rank, value: faces.sort(byCountFirst).join("") }

    function byCountFirst(a, b) {
        //Counts are in reverse order - bigger is better
        const countDiff = counts[b] - counts[a]
        if (countDiff) return countDiff // If counts don't match return
        return b > a ? -1 : b === a ? 0 : 1
    }

    function count(c, a) {
        c[a] = (c[a] || 0) + 1
        return c
    }
}

function compareHands(h1, h2) {
    let d1 = getHandDetails(h1)
    let d2 = getHandDetails(h2)
    if (d1.rank === d2.rank) {
        if (d1.value < d2.value) {
            return "WIN"
        } else if (d1.value > d2.value) {
            return "LOSE"
        } else {
            return "DRAW"
        }
    }
    return d1.rank < d2.rank ? "WIN" : "LOSE"
}

} //End of nextStep()

deal();
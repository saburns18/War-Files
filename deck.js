

const SUITS = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
const VALUES = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];
let player1Deck = []; //put in player class
let player2Deck = []
let player1Score = 0;
let player2Score = 0;


class Deck {
    constructor (cards = freshDeck()) {
        this.cards = cards;
    }

    get numberOfCards() {
        return this.cards.length;
    }

    shuffle() {
        
        for (let i = this.numberOfCards - 1; i > 0; i--) {
            const newIndex = Math.floor(Math.random() * (i + 1));
            const oldValue = this.cards[newIndex];
            this.cards[newIndex] = this.cards[i];
            this.cards[i] = oldValue;
        }
    }

    pop() {
        return this.cards.shift();
    }
}     

class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    } 

    describe() {
        return `${this.value} of ${this.suit}`
    }

}

const CARD_VALUE_MAP = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "Jack": 11,
    "Queen": 12,
    "King": 13,
    "Ace": 14
}

function freshDeck() {
    return SUITS.flatMap(suit => {
        return VALUES.map(value => {
            return new Card(suit, value);
        })
    })
}

const deck = new Deck();
deck.shuffle();
console.log(deck.cards);

startGame();
function startGame() {
    const deck = new Deck();
    deck.shuffle();

    const deckMidpoint = Math.ceil(deck.numberOfCards / 2);
    player1Deck = new Deck(deck.cards.slice(0, deckMidpoint));
    player2Deck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards));

 
    console.log(player1Deck);
    console.log(player2Deck);

    flipCards(player1Deck, player2Deck);

}


function flipCards(player1Deck, player2Deck) {
    
    let player1Card = player1Deck.pop();
    let player2Card = player2Deck.pop();

    while (player1Deck.numberOfCards > 0 && player2Deck.numberOfCards > 0) {
        if (CARD_VALUE_MAP[player1Card.value] > CARD_VALUE_MAP[player2Card.value]) {
            player1Score++;
        } else if (CARD_VALUE_MAP[player2Card.value] > CARD_VALUE_MAP[player1Card.value]) {
            player2Score++; 
        } else {
            console.log('No change to score');
        }
          console.log(`Player 1 Card: ${player1Card.describe()},     Player 2 Card: ${player2Card.describe()}
          ---------------------------
          Player 1 Score: ${player1Score} --- Player 2 Score ${player2Score}`);
    
    player1Card = player1Deck.pop();
    player2Card = player2Deck.pop();
    }
    alert (`Game Over
        Player 1 Score: ${player1Score}
        Player 2 Score: ${player2Score}`)
}



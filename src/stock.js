import Card from './card.js';

class Stock{
    constructor(cards = []){
        this.cards = cards;
        this.cursor = this.cards.length-28;
    }

    current() {
        return this.cards[this.cursor];
    }

    next() {
        return --this.cursor;
    }

    refresh() {
        this.cursor = this.cards.length;
    }

    take(count) {
        return this.cards.splice(0,count);
    }

    areAllOpened() {
        return this.cursor <= 0;
    }

    state (report) {
        report.stock = {isOpen: this.cursor < this.cards.length, card: this.current(), allOpened : this.areAllOpened()};
    }

};

const cards = {
    Ace : 13,
    2 : 12,
    3 : 11,
    4 : 10,
    5 : 9,
    6 : 8,
    7 : 7,
    8 : 6,
    9 : 5,
    10 : 4,
    Jack : 3,
    Queen : 2,
    King : 1
};

const random = max => Math.floor(Math.random() * (max + 1));

const  shuffle = (array) => {
    let result = array.slice();
    for (let index = result.length - 1; index > 0; index--) {
        const randomIndex = random(index);
        [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
    }
    return result;
};


const suites = [
    {type: "daimond",color:"red"},
    {type:"spade",color:"red"},
    {type:"club",color:"black"},
    {type:"heart",color:"black"}];

const createSuite = (suite) => {
    return Object.keys(cards).map(card => new Card(cards[card],suite.type,card,suite.color));   
};

const stock = () => {
    let cardDeck = [];
    suites.forEach(suite=>{
        cardDeck = [...cardDeck,...createSuite(suite)];
    });
    return new Stock(shuffle(cardDeck));
};

export default stock();
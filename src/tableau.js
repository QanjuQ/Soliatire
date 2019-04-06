import Pile from './pile.js';

class Tableau{
    constructor(piles=[]) {
        this.piles = piles;
    }

    state(report) {
       report.tableau = this.piles.map(pile=>pile.state());
    }

    pile(index) {
        return this.piles[index];
    }

    move(count,from,to) {
        let card = this.pile(from).last();
        if(this.canBePlacedIn(card,to)){
            let cards = this.pile(from).removeLast(count);
            this.pile(from).open();
            cards.forEach(card => this.pile(to).placeCard(card));
        }
        return this;
    }

    canBePlacedIn(card,pile){
        console.log(pile);
        return this.pile(pile).canBePlaced(card);
    }

    place(to,card) {
        this.pile(to).placeCard(card);
    }
}

const createTableau = stock => new Tableau([1,2,3,4,5,6,7].map(size => {
    let pile = new Pile(stock.take(size));
    pile.last().isOpen = true;
    return pile;
    })
);

export default createTableau;

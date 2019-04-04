import Pile from './pile.js';

class Tableau{
    constructor(piles=[]) {
        this.piles = piles;
    }

    state(report) {
       report.tableau = this.piles.map(pile=>pile.state());
    }
    
}

const createTableau = stock => new Tableau([1,2,3,4,5,6,7].map(size => new Pile(stock.take(size))));

export default createTableau;

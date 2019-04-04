import createTableau from "./tableau";
import stock from './stock.js';
import Foundation from './foundation.js';

class Game {
    constructor(tableau,foundations,stock) {
       this.tableau = tableau; 
       this.foundations = foundations; 
       this.stock = stock; 
    }

    hasWon() {
        this.foundations.every(foundation => foundation.isComplete());
    }

    state() {
       let report = {};
       this.tableau.state(report);
       report.foundation = this.foundations.map(foundation => foundation.state());
       this.stock.state(report); 
       return report;
    }

    openCard() {
        this.stock.next();
        return this;
    }

    refreshStock() {
        this.stock.refresh();
        return this;
    }
}

const createGame = () => {
    const tableau = createTableau(stock);
    const foundations = [new Foundation(),new Foundation(),new Foundation(),new Foundation()]
    return new Game(tableau,foundations,stock);
};

export default createGame;
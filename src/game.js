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

    moveBetweenPiles(count,from,to) {
        this.tableau.move(count,from,to);
        return this;
    }

    moveFromStockToPile(to) {
        let card = this.stock.current();
        if(this.tableau.canBePlacedIn(card,to)){
            this.stock.pick();
            this.tableau.place(card);
        }
        return this;
    }

    build(from,to,cardIndex) {
        const card = this.tableau.pickCard(from);
        if(this.foundations[to].canBePlaced(card)){
            this.tableau.remove(from,cardIndex);
            this.foundations[to].placeCard(card);
        }
        return this;
    }

    buildFromStock(to){
        const card = this.stock.take();
        if(this.foundations(to).canBePlaced(card)){
            this.stock.pick();
            this.foundations[to].placeCard(card);
        }
    }

}

const createGame = () => {
    const tableau = createTableau(stock);
    const foundations = [new Foundation(),new Foundation(),new Foundation(),new Foundation()];
    return new Game(tableau,foundations,stock);
};

export default createGame;
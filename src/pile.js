class Pile{
    constructor(cards = []){
        this.cards = cards;
    }

    last() {
        return this.cards[this.cards.length-1];
    }

    isEmpty() {
        return this.cards.length === 0;
    }

    canBePlaced(card) {
        let last = this.last();
        if(this.isEmpty() && card.isKing()) {
            return true;
        }
        if(card.isRankLowerThan(last) && last.isNotSameColor(card)) {
            return true;
        }
        return false;
    }

    placeCard(card) {
        this.cards.push(card);
    }

    state(){
        return {cards:this.cards,last:this.last() || "blank"};
    }

    takeLast(number) {
        const from = this.cards.length - number;
        const to = this.cards.length;
        return this.cards.slice(from,to);
    }

    removeLast(number) {
        const cards = this.cards.splice(number);
        this.open();
        return cards;
    }

    open()  {
        if(this.isEmpty()) return;
        this.last().open();
    }
}
 
export default Pile;
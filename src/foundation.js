class Foundation{
    constructor(cards = []) {
        this.cards = cards;
    }

    first() {
        return this.cards[0];
    }

    last() {
        return this.cards[this.cards.length-1];
    }

    isFirstCard(card) {
        return this.isEmpty() && card.isAce();
    }

    canBePlaced(card){
        return this.last().isRankLower(card) && this.last().isSameFoundation(card);
    }

    isComplete() {
        return this.cards.length === 13;
    }

    placeCard(card) {
        if(this.isFirstCard(card)){
            this.cards.push(card);
            return;
        }
        if(this.canBePlaced(card)) {
            this.cards.push(card);
        }
    }

    state() {
        return {card:this.last(), isComplete: this.isComplete()};
    }

}

export default Foundation;
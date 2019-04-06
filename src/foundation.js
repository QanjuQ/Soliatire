class Foundation{
    constructor(cards = []) {
        this.cards = cards;
    }

    last() {
        return this.cards[this.cards.length-1];
    }

    isEmpty(){
        return this.cards.length === 0;
    }

    isFirstCard(card) {
        return this.isEmpty() && card.isAce();
    }

    canBePlaced(card){
        const validate = {
            true: card => card.isAce(),
            false: card => this.last().isRankLower(card) 
                            && this.last().isSameFoundation(card)
        };

        return validate[this.isEmpty()](card);
    }

    isComplete() {
        return this.cards.length === 13;
    }

    placeCard(card) {
        this.cards.push(card);
    }

    state() {
        return {card:this.last(), isComplete: this.isComplete()};
    }

}

export default Foundation;
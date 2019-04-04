
class Card{
    constructor(rank,type,value,color) {
        this.rank = rank;
        this.type = type;
        this.value = value;
        this.color = color;
    }

    isRankLowerThan(other) {
        return this.rank > other.rank;
    }

    isKing() {
        return this.value === 'King';
    }

    isAce() {
        return this.value === 'Ace';
    }

    isSameColor(other) {
        return this.color === other.color;
    }

    isNotSameColor(other) {
        return this.color !== other.color;
    }

    isSameType(other) {
        return this.type === other.type;
    }

    isSameFoundation(other) {
        return this.isSameColor(other) && this.isSameType(other);
    }

    copy(card) {
        return new Card(card.rank,card.type,card.value,card.color);
    }
}

export default Card;
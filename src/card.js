
class Card{
    constructor(rank,type,value,color,open=false) {
        this.rank = rank;
        this.type = type;
        this.value = value;
        this.color = color;
        this.isOpen = open;
    }

    isRankLowerThan(other) {
        return this.rank - other.rank === 1;
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

    open() {
        this.isOpen = true;
    }
}

export default Card;
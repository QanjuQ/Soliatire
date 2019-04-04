import React,{Component} from 'react';
import './game.css';

class Card extends Component {
    constructor(props){
        super(props);
        this.state = {
            color: this.props.color,
            rank: this.props.rank,
            type: this.props.type,
            value: this.props.value  
        }
        this.className = this.className.bind(this);
        this.onDragStart = this.onDragStart.bind(this);
    }

    className() {
        return [this.props.color,this.props.type,"card","open-card"].join(' ');
    }

    onDragStart(event,id) {
        event.dataTransfer.setData("id",id);
        this.props.move(this.state);
    }

    render() {
        return (<div className = {this.className()} draggable
            onDragStart = {this.onDragStart}>
            {this.props.value + " " + this.props.type}</div>);
    }
}

const ClosedCard = props => <div 
    className="closed-card card" 
    onClick = {props.onClick}
/>;

const openCard = (card,move,index=0) => <Card 
    key = {"card" + card.type + index} 
    color = {card.color} type = {card.type} 
    value = {card.value} 
    rank = {card.rank} move = {move}
/>;

const Pile = (props) => {
    const move = (card) => {card.pile = props.id; props.move(props.id);};
    const closedCard = index => <ClosedCard key={"closedcard-" + index}/>;
    const onDrop = event => {
        event.preventDefault();
        props.drop();
    };

    const onDragOver =  event => {
        event.preventDefault();
        props.place(props.id);
    };

    const createCard = {
        true: (card,move,index) => openCard(card,move,index),
        false: (card,move,index) => closedCard(index)
    };

    return (
        <div className = "pile" 
            onDragOver = {onDragOver} 
            onDrop = {onDrop}>
            {props.cards.map(
                (card,index,array) => 
                createCard[card.isOpen](card,move,index))}
        </div>
    );
};

const Tabeleau = (props) => {
    return(
        <div className = "tableau" > 
        {props.piles.map(
            (pile,index) => <Pile 
            key = {"pile-" + index} 
            id={index}
            cards = {pile.cards} 
            move = {props.move}  
            drop = {props.drop}  
            place = {props.place}/>)}
        </div>
    );
};

const Pillar = (props) => {
    return (<div className = "pillar"></div>)
};

const Stock = (props) => {
    const card = props.stock.card;
    
    const openedCard = {
        false: () => "",  
        true : openCard
    };

    const content = {
        true: () => (<div 
            className="card" 
            onClick={props.refresh}>
            refresh</div>),

        false: ()=><ClosedCard onClick = {props.onClick}/>
    };

    return (<div className = "stock" >
    {content[props.stock.allOpened]()}
    {openedCard[props.stock.isOpen](card)}
    </div>);
    };

const Foundations = (props) => {
    return(<div className="foundation">
    {props.pillars.map(
        (pillar,index) => 
        <Pillar key = {"pillar" + index}/>)}
    </div>);
}

export { Tabeleau,Foundations,Stock};
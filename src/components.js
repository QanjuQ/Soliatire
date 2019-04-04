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

const ClosedCard = (props) => (<div className="closed-card card" onClick = {props.onClick}/>)

const openCard = (card,move,index=0) => <Card key = {"card" + card.type + index} 
    color = {card.color} type = {card.type} value = {card.value} 
    rank = {card.rank} move = {move}/>;

const Pile = (props) => {
    const closedCard = card => <ClosedCard/>;
    const onDrop = (event)=>{
        event.preventDefault(); 
        props.move();
    };

    const isLast = (array,index) => (array.length-1 === index);
    return (
        <div className = "pile" onDrop = {onDrop} >
            {props.cards.map((card,index,array) => isLast(array,index)?openCard(card,props.move,index):closedCard())}
        </div>
    );
};

const Tabeleau = (props) => {
    return(
        <div className = "tableau" > 
        {props.piles.map((pile,index) => <Pile key = {"pile" + index} 
            cards = {pile.cards} move = {props.move} 
            onClick = {props.onClick} place = {props.place}/>)}
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
    true: () => (<div className="card" onClick={props.refresh}>refresh</div>),
    false: ()=><ClosedCard onClick = {props.onClick}/>
    };

    return (<div className = "stock" >
    {content[props.stock.allOpened]()}
    {openedCard[props.stock.isOpen](card)}
    </div>);
    };

const Foundations = (props) => {
    return(<div className="foundation">
{props.pillars.map((pillar,index) => <Pillar key = {"pillar" + index}/>)}
    </div>);
}

export { Tabeleau,Foundations,Stock};
import React,{Component} from 'react';
import './game.css';

class Card extends Component {
    constructor(props){
        super(props);
        this.className = this.className.bind(this);
        this.onDragStart = this.onDragStart.bind(this);
        this.style = this.style.bind(this);
    }

    style(){
        return {
            position: 'relative',
            top: (-this.props.id*160) + "px"
        }
    }


    className() {
        return [this.props.color,this.props.type,"card","open-card"].join(' ');
    }

    onDragStart(event,id) {
        event.dataTransfer.setData("id",id);
        this.props.move({card:this.props.id});
    }

    render() {
        return (<div style = {this.style()} className = {this.className()} draggable
            onDragStart = {this.onDragStart}>
            {this.props.value + " " + this.props.type}</div>);
    }
}

const ClosedCard = props => <div 
    style = {{position: 'relative',top: (-props.id*160)+"px"}}
    className="closed-card card" 
    onClick = {props.onClick}
/>;

const closedCard = (card,move,index) => 
    <ClosedCard id = {index} key={"closedcard-" + index}/>;

const openCard = (card,onDrag,index=0) => <Card 
    id = {index}
    key = {"card" + card.type + index} 
    color = {card.color} type = {card.type} 
    value = {card.value} 
    rank = {card.rank} move = {onDrag}
/>;

class Pile extends Component {
    constructor(props){
        super(props);
        this.move = this.move.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.isEmpty = this.isEmpty.bind(this);
    }

    isEmpty() {
        return this.props.cards.length === 0;
    }

    render() {
        const createCard = {
            true: openCard,
            false: closedCard
        };

        return (
            <div className = "pile"
                onDragOver = {this.onDragOver} 
                onDrop = {this.onDrop}>
                {this.props.cards.map(
                    (card,index) =>
                    createCard[card.isOpen](card,this.move,index))}
            </div>
        );
    }

    move (card){
        card.from = this.props.id; 
        this.props.move(card);
    }

    onDrop (event) {
        event.preventDefault();
        this.props.drop();
    };

    onDragOver (event) {
        event.preventDefault();
        this.props.place(this.props.id);
    };
}

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
    const onDrop = (event) => {
        event.preventDefault();
        props.drop();
    };

    const onDragOver = (event) => {
        event.preventDefault();
        props.place(props.id)
    };
    const content = props.card? openCard(props.card): 
    <div 
        className = "pillar" 
        onDrop = {onDrop}
        onDragOver = {onDragOver}>
    </div>; 
    return (content);
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
    {openedCard[props.stock.isOpen](card,props.pick)}
    </div>);
    };

const Foundations = (props) => {
    return(<div className="foundation">
    {props.pillars.map(
        (pillar,index) => 
        <Pillar key = {"pillar" + index}
        id = {index}
        card = {pillar.card}
        place={props.place}
        drop = {props.drop}/>)}
    </div>);
}

export { Tabeleau,Foundations,Stock};
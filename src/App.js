import React, { Component, Fragment} from 'react';
import './App.css';
import {Foundations,Tabeleau,Stock} from './components.js';
import createGame from './game.js';

class Game extends Component{
  constructor(props) {
    super(props);
    this.state = {game: props.game};
    this.open = this.open.bind(this);
    this.move = this.move.bind(this);
    this.refreshStock = this.refreshStock.bind(this);
    this.place = this.place.bind(this);
    this.drop = this.drop.bind(this);
  }

  open(event) {
    if(this.state.game.stock.allOpened){
      this.open = null;
    }
    this.setState({game:this.state.game.openCard()});
  }

  refreshStock(event) {
    this.setState({game:this.state.game.refreshStock()});
  }

  move(pile) {
    this.setState({from:pile});
  }

  place(pile) {
    this.setState({to:pile});
  }

  drop() {
    let game = this.state.game.moveBetweenPiles(1,this.state.from,this.state.to);
    this.setState({game:game});
  }

  render() {
    let state = this.state.game.state();
    return (
      <Fragment>

      <Stock onClick = {this.open} 
        stock = {state.stock} 
        refresh = {this.refreshStock}/>

      <Tabeleau piles = {state.tableau} 
      move = {this.move} 
      drop = {this.drop} 
      place = {this.place} />

      <Foundations
      pillars = {state.foundation}/>

      </Fragment>
      );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
      <Game game= {createGame()}/>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Helmets from "./helmets.json";
import Header from "./components/Header";
import { throwStatement } from '@babel/types';
import GameBoard from "./components/GameBoard"
import ResultPanel from "./components/ResultPanel"

const shuffleArray = array => {

  for (let i = array.length - 1; i > 0; i--) {

    let randomIdx = Math.floor(Math.random() * (i + 1))
    let randomValue = array[randomIdx]

    array[randomIdx] = array[i]
    array[i] = randomValue

  }

  return array;

}

class App extends Component {
  state = {
    clicks: [],
    clickCount: 0,
    wins: 0,
    losses: 0,
    highScore: 0,
    Helmets,
    results: "rules"
  };
  handleDivClick = (id) => {

    let clickArr = this.state.clicks
    let { highScore, clickCount } = this.state

    console.log(clickArr)

    if (clickArr.indexOf(id) > -1) {
     
      this.setState({ clicks: [], clickCount: 0, losses: this.state.losses + 1,results: "loss" })



    } else {

      clickCount++

      clickArr.push(id)
      this.setState({ clicks: clickArr, clickCount: clickCount })



      if (clickCount > highScore) {
        this.setState({ highScore: clickCount })
      }

      if(clickCount % Helmets.length === 0){
        this.setState({clicks:[], wins: this.state.wins + 1, results: "win" })
      }else{
        this.setState({results: "rules"})
      }

    }

    this.setState({ Helmets: shuffleArray(Helmets) })

  };
  render() {
   
    return (

      <div>

        <Header clicks={this.state.clickCount} highScore={this.state.highScore} wins={this.state.wins} losses={this.state.losses} />

        <GameBoard Helmets={this.state.Helmets} handleDivClick={this.handleDivClick} />

        <ResultPanel display={this.state.results} />
        
      </div>


    );
  }

};

export default App;
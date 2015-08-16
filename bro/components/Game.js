import styles from './Game.css';
import React, { Component } from 'react';
import Board from './Board';
import Face from './Face';

class Game extends Component {
  render() {
    return (
      <div className={ styles.component }>
        <Face/>
        <br/><br/>
        <Board/>
      </div>
    );
  }
}

export default Game;

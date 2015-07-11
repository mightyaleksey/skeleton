'use strict';

import { WIDTH } from '../constants';
import { get } from 'mori';
import { toString } from '../modules/coord';

import React, { Component } from 'react';
import { Connector } from 'redux/react';
import Tile from './Tile';

function select(state) {
  return {state: state.default};
}

function renderTiles({ state, dispatch }) {
  let tiles = [];

  for (let x = 0; x < WIDTH; ++x) {
    for (let y = 0; y < WIDTH; ++y) {
      let xy = `${toString(x)}${toString(y)}`;

      tiles.push(
        <Tile key={xy} x={x} y={y}>
          {get(state, xy)}
        </Tile>
      );
    }
  }

  return <div className='game'>{tiles}</div>;
}

class Game extends Component {
  render() {
    return (
      <Connector select={select}>
        {renderTiles}
      </Connector>
    );
  }
}

export default Game;

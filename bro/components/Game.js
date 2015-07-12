'use strict';

import { WIDTH } from '../constants';
import { get, partial } from 'mori';
import { iterate, toString } from '../modules/coord';
import { move } from '../actions';

import React, { Component } from 'react';
import { Connector } from 'redux/react';
import Tile from './Tile';

function select(state) {
  return {
    board: get(state.default, 'board'),
    vision: get(state.default, 'vision')
  };
}

function renderBoard({ board, vision, dispatch }) {
  let tiles = [];
  iterate((xy, x, y) => {
    let open = partial(dispatch, move(xy));
    tiles.push(<Tile key={xy} onClick={open}>{get(vision, xy) ? get(board, xy) : ''}</Tile>);
  });

  return <div className='game'>{tiles}</div>;
}

class Game extends Component {
  render() {
    return (
      <Connector select={select}>
        {renderBoard}
      </Connector>
    );
  }
}

export default Game;

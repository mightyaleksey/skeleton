'use strict';

import { WIDTH } from '../constants';

import { get, partial } from 'mori';
import { iterate, toString } from '../modules/coord';
import { move, reset } from '../actions';

import React, { Component } from 'react';
import { Connector } from 'redux/react';
import Face from './Face';
import Tile from './Tile';

function select(state) {
  return {
    ingame: get(state.default, 'ingame'),
    board: get(state.default, 'board'),
    vision: get(state.default, 'vision')
  };
}

function renderBoard({ ingame, board, vision, dispatch }) {
  let tiles = [];
  iterate(xy => {
    let open = partial(dispatch, move(xy));

    tiles.push(
      <Tile key={xy} visible={get(vision, xy)} onClick={open}>
        {get(vision, xy) ? get(board, xy) : ''}
      </Tile>
    );
  });

  return <div className='game'>
    <Face onClick={partial(dispatch, reset())} />
    <br /><br />
    <div className='board'>
      {tiles}
    </div>
  </div>;
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

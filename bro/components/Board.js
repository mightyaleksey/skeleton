'use strict';

import { get, partial } from 'mori';
import { iterate } from '../modules/utils';
import { move, pending } from '../actions';

import React, { Component } from 'react';
import { Connector } from 'redux/react';
import Tile from './Tile';

const select = state => ({
  board: get(state.default, 'board'),
  vision: get(state.default, 'vision')
});

class Board extends Component {
  render() {
    return (
      <Connector select={ select }>
        { renderBoard }
      </Connector>
    );
  }
}

function renderBoard({ board, vision, dispatch }) {
  const tiles = iterate(xy => {
    const props = {
      key: xy,
      onClick: partial(dispatch, move(xy)),
      onMouseDown: partial(dispatch, pending(true)),
      onMouseOut: partial(dispatch, pending(false)),
      onMouseUp: partial(dispatch, pending(false)),
      visible: get(vision, xy)
    };

    return (
      <Tile { ...props }>
        { get(vision, xy) ? get(board, xy) : '' }
      </Tile>
    );
  });

  return (
    <div className='board'>
      { tiles }
    </div>
  );
}

export default Board;

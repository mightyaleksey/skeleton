'use strict';

import { WIDTH } from '../constants';

import { get, partial } from 'mori';
import { iterate } from '../modules/utils';
import { toString } from '../modules/coord';
import { move, reset } from '../actions';

import React, { Component } from 'react';
import { Connector } from 'redux/react';
import Face from './Face';
import Tile from './Tile';

function select(state) {
  return {
    ingame: get(state.default, 'ingame'),
    success: get(state.default, 'success'),
    board: get(state.default, 'board'),
    vision: get(state.default, 'vision')
  };
}

function renderBoard({ ingame, success, board, vision, dispatch }) {
  return (
    <div className='game'>
      { renderFace(ingame, success, dispatch) }
      <br/><br/>
      <div className='board'>{ renderTiles(ingame, board, vision, dispatch) }</div>
    </div>
  );
}

function renderFace(ingame, success, dispatch) {
  let state = '';
  if (!ingame) {
    state = success
      ? 'happy'
      : 'upset';
  }

  return (<Face onClick={ partial(dispatch, reset()) } state={ state }/>);
}

function renderTiles(ingame, board, vision, dispatch) {
  return iterate(xy => {
    let props = {
      onClick: partial(dispatch, move(xy)),
      visible: get(vision, xy)
    };

    return (
      <Tile key={ xy } { ...props }>
        { get(vision, xy) ? get(board, xy) : '' }
      </Tile>
    );
  });
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

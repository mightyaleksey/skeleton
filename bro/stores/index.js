'use strict';

import { MINES, MOVE, RESET, WIDTH } from '../constants';

import { assoc, assocIn, get, hashMap } from 'mori';
import { adjacentPoints, iterate, Generator } from '../modules/coord';

const initial = defaultState();

function defaultState() {
  return hashMap(
    'board', generateBoard(),
    'vision', hashMap()
  );
}

function generateBoard() {
  let g = new Generator();
  let mines = [];
  for (let i = MINES; i--;) {
    mines.push(g.generate());
    mines.push('*');
  }

  let state = hashMap.apply(null, mines);
  let isMine = filterMines(state);

  iterate((xy, x, y) => {
    if (isMine(xy)) {
      return;
    }

    state = assoc(state, xy, adjacentPoints(xy).filter(isMine).length);
  });

  return state;
}

function filterMines(state) {
  return (xy) => {
    return get(state, xy) === '*';
  };
}

/**
 * @param  {hashMap} state
 * @param  {hashMap} state.board
 * @param  {hashMap} state.vision
 * @param  {object}  action
 * @return {object}
 */
export default function store(state = initial, action) {
  switch (action.type) {
  case MOVE:
    return assocIn(state, ['vision', action.coord], true);
  case RESET:
    return defaultState();
  default:
    return state;
  }
};

'use strict';

import { MOVE, RESET } from '../actions';
import { MINES, WIDTH } from '../constants';
import { assoc, get, hashMap } from 'mori';
import { Generator } from '../modules/coord';

const initial = defaultState();

function defaultState() {
  let g = new Generator();
  let mines = [];
  for (let i = MINES; i--;) {
    mines.push(g.generate());
    mines.push('*');
  }

  let state = hashMap.apply(null, mines);
  return state;
}

export default function store(state = initial, action) {
  switch (action.type) {
  case MOVE:
    return {};
  case RESET:
    return defaultState();
  default:
    return state;
  }
};

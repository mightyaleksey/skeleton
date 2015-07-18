'use strict';

import { MOVE, RESET } from '../constants';

import { default as move } from './move';
import { default as reset } from './reset';

export default createStore({}, {
  [ MOVE ]: move,
  [ RESET ]: reset
});

function createStore(initialState, handlers) {
  return (state = initialState, action) =>
    handlers[action.type]
      ? handlers[action.type](state, action)
      : state;
}

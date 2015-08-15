import { MOVE, PENDING, RESET } from '../constants';

import { default as move } from './move';
import { default as pending } from './pending';
import { default as reset } from './reset';

function createStore(initialState, handlers) {
  return (state = initialState, action) =>
    handlers[action.type]
      ? handlers[action.type](state, action)
      : state;
}

export default createStore({}, {
  [ MOVE ]: move,
  [ PENDING ]: pending,
  [ RESET ]: reset,
});

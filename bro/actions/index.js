'use strict';

import { MOVE, RESET } from '../constants';

export function move(xy) {
  return {
    position: xy,
    type: MOVE
  };
}

export function reset() {
  return {
    type: RESET
  };
}

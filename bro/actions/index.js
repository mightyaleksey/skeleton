import { MOVE, PENDING, RESET } from '../constants';

export function move(xy) {
  return {
    position: xy,
    type: MOVE,
  };
}

export function pending(value) {
  return {
    type: PENDING,
    value: value,
  };
}

export function reset() {
  return {
    type: RESET,
  };
}

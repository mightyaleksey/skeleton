'use strict';

import { MINES, MOVE, RESET, WIDTH } from '../constants';

import { assoc, assocIn, get, getIn, hashMap } from 'mori';
import { adjacentPoints, adjoiningPoints, iterate, Generator } from '../modules/coord';

const initial = defaultState();

function defaultState() {
  return hashMap(
    'ingame', true,
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
  let isMine = filterPoints(state, '*');

  iterate((xy, x, y) => {
    if (isMine(xy)) {
      return;
    }

    state = assoc(state, xy, adjoiningPoints(xy).filter(isMine).length);
  });

  return state;
}

function filterPoints(state, value) {
  return (xy) => {
    return get(state, xy) === value;
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
    let point = getIn(state, ['board', action.coord]);

    if (point === 0) {
      // open adjacent 0
      let isZero = filterPoints(get(state, 'board'), 0);
      let queue = [action.coord];
      let adjacent = [];
      let visited = {[action.coord]: true};

      while (queue.length) {
        let successor = queue.pop();
        adjacent.push(successor);

        adjacentPoints(successor).filter(isZero).forEach((_xy) => {
          if (visited[_xy]) {
            return;
          }

          queue.push(_xy);
          visited[_xy] = true;
        });
      }

      adjacent.forEach((_xy) => {
        state = assocIn(state, ['vision', _xy], true);
      });

      return state;
    }

    if (point === '*') {
      // game over
      state = assoc(state, 'ingame', false);
    }

    return assocIn(state, ['vision', action.coord], true);

  case RESET:
    return defaultState();

  default:
    return state;
  }
};

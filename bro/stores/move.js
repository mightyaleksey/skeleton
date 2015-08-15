import { MINES, WIDTH } from '../constants';

import { assoc, assocIn, count, get, getIn, hashMap, merge, zipmap } from 'mori';
import { default as fill } from 'lodash/array/fill';
import { default as _ } from '../modules/chain';  // custom build with chain,filter,map,value
import { adjacent } from '../modules/utils';

const TOTAL = WIDTH * WIDTH - MINES;
const filterEmpty = state => xy => getIn(state, ['board', xy]) === 0;
const hasWon = state => count(get(state, 'vision')) === TOTAL;

export default function move(state, action) {
  if (getIn(state, ['vision', action.position])) {
    // already opened
    return state;
  }

  if (getIn(state, ['game', 'ingame']) === false) {
    // game over
    return state;
  }

  switch (getIn(state, ['board', action.position])) {
  case '*':
    return merge(state, hashMap(
      'game', merge(
        get(state, 'game'),
        hashMap(
          'ingame', false,
          'success', false
        )
      ),
      'vision', merge(
        get(state, 'vision'),
        hashMap(
          action.position, true
        )
      )
    ));

  case 0:
    // open adjacent zero points
    const isEmpty = filterEmpty(state);
    const points = [];

    const queue = [action.position];
    const visited = {
      [ action.position ]: true,
    };

    const isVisited = xy => !visited[xy];
    const markPoint = xy => {
      queue.push(xy);
      visited[xy] = true;
    };

    while (queue.length) {
      const empty = queue.pop();
      points.push(empty);

      _(adjacent(empty).filter(isEmpty))
        .filter(isVisited)
        .map(markPoint)
        .value();
    }

    state = assoc(state, 'vision', merge(
      get(state, 'vision'),
      zipmap(points, fill(Array(points.length), true))
    ));

    if (hasWon(state)) {
      return merge(state, hashMap(
        'game', merge(
          get(state, 'game'),
          hashMap(
            'ingame', false,
            'success', true
          )
        )
      ));
    }

    return state;

  default:
    state = assocIn(state, ['vision', action.position], true);

    if (hasWon(state)) {
      return merge(state, hashMap(
        'game', merge(
          get(state, 'game'),
          hashMap(
            'ingame', false,
            'success', true
          )
        )
      ));
    }

    return state;
  }
}

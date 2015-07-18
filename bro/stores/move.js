'use strict';

import { assoc, assocIn, get, getIn, hashMap, merge, zipmap } from 'mori';
import { default as fill } from 'lodash/array/fill';
import { default as _ } from '../modules/chain';  // custom build with chain,filter,map,value
import { adjacent } from '../modules/utils';

const filterEmpty = state => xy => getIn(state, ['board', xy]) === 0;

export default function move(state, action) {
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
      [ action.position ]: true
    };

    while (queue.length) {
      let empty = queue.pop();
      points.push(empty);

      _(adjacent(empty).filter(isEmpty))
        .filter(xy => !visited[xy])
        .map(xy => {
          queue.push(xy);
          visited[xy] = true;
        })
        .value();
    }

    return assoc(state, 'vision', merge(
      get(state, 'vision'),
      zipmap(points, fill(Array(points.length), true))
    ));

  default:
    return assocIn(state, ['vision', action.position], true);
  }
}

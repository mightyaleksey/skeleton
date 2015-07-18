'use strict';

import { MINES, WIDTH } from '../constants';

import { assoc, get, hashMap } from 'mori';
import { default as identity } from 'lodash/utility/identity';
import { default as negate } from 'lodash/function/negate';
import { default as _ } from '../modules/chain'; // custom build with chain,flatten,map,range,value
import { Generator } from '../modules/generate';
import { adjoining, iterate } from '../modules/utils';

const gen = new Generator;
const filter = (state, value) => xy => get(state, xy) === value;

export default function reset() {
  return hashMap(
    'ingame', true,
    'success', false,
    'board', board(),
    'vision', hashMap()
  );
}

function board() {
  gen.drop();

  const mines = _(MINES)
    .range()
    .map(() => [gen.generate(), '*'])
    .flatten()
    .value();

  const state = hashMap.apply(null, mines);
  const isMine = filter(state, '*');

  const points = _(iterate(identity))
    .filter(negate(isMine))
    .map(xy => [xy, adjoining(xy).filter(isMine).length])
    .flatten()
    .value();

  return assoc.apply(null, [state].concat(points));
}

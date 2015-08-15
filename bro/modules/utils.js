import { WIDTH } from '../constants';

import { default as _ } from './chain'; // custom build with chain,filter,map,value
import { toNumber, toString } from './coord';

const ADJOINING = [
  [-1, -1], [ 0, -1], [ 1, -1],
  [-1,  0], /* xy */  [ 1,  0],
  [-1,  1], [ 0,  1], [ 1,  1],
];

const ADJACENT = [
  [-1,  0],           [ 0, -1],
            /* xy */
  [ 0,  1],           [ 1,  0],
];

const fits = x => x > -1 && x < WIDTH;

export function adjoining(xy) {
  const [ x, y ] = xy.split('').map(toNumber);

  return _(ADJOINING)
    .map(d => [x + d[0], y + d[1]])
    .filter(c => fits(c[0]) && fits(c[1]))
    .map(c => `${toString(c[0])}${toString(c[1])}`)
    .value();
}

export function adjacent(xy) {
  const [ x, y ] = xy.split('').map(toNumber);

  return _(ADJACENT)
    .map(d => [x + d[0], y + d[1]])
    .filter(c => fits(c[0]) && fits(c[1]))
    .map(c => `${toString(c[0])}${toString(c[1])}`)
    .value();
}

export function iterate(iterator) {
  const accumulation = [];
  for (let x = WIDTH; x--; ) {
    for (let y = WIDTH; y--; ) {
      accumulation.push(iterator(`${toString(x)}${toString(y)}`, x, y));
    }
  }

  return accumulation;
}

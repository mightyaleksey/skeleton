'use strict';

import { WIDTH } from '../constants';

const A = 'a'.charCodeAt();
const MATRIX = [
  [-1, -1], [ 0, -1], [ 1, -1],
  [-1,  0], /* xy */  [ 1,  0],
  [-1,  1], [ 0,  1], [ 1,  1]
];

export function adjacentPoints(xy) {
  let [ x, y ] = xy.split('').map(toNumber);

  return MATRIX.reduce((t, [ dx, dy ]) => {
    let _x = x + dx;
    let _y = y + dy;

    -1 < _x && _x < WIDTH &&
    -1 < _y && _y < WIDTH &&
      t.push(`${toString(_x)}${toString(_y)}`);

    return t;
  }, []);
}

export function generatePoint() {
  return [0, 1].map(() => {
    return toString(Math.round(Math.random() * (WIDTH - 1)))
  }).join('');
}

export function iterate(iterator) {
  for (let x = 0; x < WIDTH; ++x) {
    for (let y = 0; y < WIDTH; ++y) {
      iterator.call(null, `${toString(x)}${toString(y)}`, x, y);
    }
  }
}

export function toNumber(z) {
  return z.charCodeAt() - A;
}

export function toString(n) {
  return String.fromCharCode(n + A);
}

export function Generator() {
  this.reset();
}

Generator.prototype.generate = function () {
  let point = generatePoint();
  while (this._cache[point]) point = generatePoint();
  this._cache[point] = true;
  return point;
};

Generator.prototype.reset = function () {
  this._cache = {};
};

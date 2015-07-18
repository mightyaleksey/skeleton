'use strict';

import { WIDTH } from '../constants';

import { toString } from './coord';

const LIMIT = WIDTH * WIDTH;

export function abscissa() {
  return toString(Math.round(Math.random() * (WIDTH - 1)));
}

export function point() {
  return `${abscissa()}${abscissa()}`;
}

export class Generator {
  constructor() {
    this.drop();
  }

  drop() {
    this.cache = {};
    return this;
  }

  generate() {
    let xy = point();
    while (this.cache[xy])
      xy = point();

    this.cache[xy] = true;
    return xy;
  }
}

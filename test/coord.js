'use strict';

import { equal, deepEqual } from 'assert';
import { adjacentPoints, generatePoint, toNumber, toString } from '../bro/modules/coord';

describe('coord.js', () => {
  it('adjacentPoints(aa) -> [ ba, ab, bb ]', () => {
    deepEqual(adjacentPoints('aa'), ['ba', 'ab', 'bb']);
  });

  it('generatePoint() -> xx', () => {
    equal(generatePoint().length, 2);
  });

  it('toNumber(a) -> 0', () => {
    equal(toNumber('a'), 0);
  });

  it('toString(0) -> a', () => {
    equal(toString(0), 'a');
  });
});

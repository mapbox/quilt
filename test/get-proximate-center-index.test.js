'use strict';

const getProximateCenterIndex = require('../src/get-proximate-center-index');

describe('getProximateCenterIndex', () => {
  test('returns expected center index', () => {
    expect(getProximateCenterIndex({ x: 256, y: 256 }, 0)).toEqual({ column: 0.5, row: 0.5, zoom: 0 });
    expect(getProximateCenterIndex({ x: 128, y: 128 }, 0, 256)).toEqual({ column: 0.5, row: 0.5, zoom: 0 });
    expect(getProximateCenterIndex({ x: 608256, y: 1011713 }, 12, 512)).toEqual({ column: 1188, row: 1976.001953125, zoom: 12 });
  })
});
'use strict';

const getPixelCoordinates = require('../src/get-pixel-coordinates');

describe('getPixelCoordinates', () => {
  test('returns expected coordinates', () => {
    expect(getPixelCoordinates([0, 0], 0)).toEqual({ x: 256, y: 256 });
    expect(getPixelCoordinates([0, 0], 0, 256)).toEqual({ x: 128, y: 128 });
    expect(getPixelCoordinates([-75.5859, 6.3152], 12)).toEqual({ x: 608256, y: 1011713 })
  });
});
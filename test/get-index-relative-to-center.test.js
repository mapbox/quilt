'use strict';

const getIndexRelativeToCenter = require('../src/get-index-relative-to-center');

describe('getIndexRelativeToCenter', () => {

  const mockProximateCenterIndex = { column: 1188, row: 1976.001953125, zoom: 12 };

  test('returns correct index 256', () => {
    expect(getIndexRelativeToCenter({ x: 0, y: 0 }, mockProximateCenterIndex, { h: 600, w: 600 }, 256))
      .toEqual({ column: 1186, row: 1974, zoom: 12 });
    expect(getIndexRelativeToCenter({ x: 600, y: 600 }, mockProximateCenterIndex, { h: 600, w: 600 }, 256))
      .toEqual({ column: 1189, row: 1977, zoom: 12 });
  });
  test('returns correct index 512', () => {
    expect(getIndexRelativeToCenter({ x: 0, y: 0 }, { column: 0.5, row: 0.5, zoom: 0 }, { h: 600, w: 600 }))
      .toEqual({ column: -1, row: -1, zoom: 0 });
    expect(getIndexRelativeToCenter({ x: 600, y: 600 }, { column: 0.5, row: 0.5, zoom: 0 }, { h: 600, w: 600 }))
      .toEqual({ column: 1, row: 1, zoom: 0 });
    expect(getIndexRelativeToCenter({ x: 1024, y: 1024 }, { column: 10, row: 10, zoom: 2 }, { h: 1024, w: 1024 }))
      .toEqual({ column: 11, row: 11, zoom: 2 })
  });
  test('returns correct index 1024', () => {
    expect(getIndexRelativeToCenter({ x: 0, y: 0 }, mockProximateCenterIndex, { h: 500, w: 600 }, 1024))
      .toEqual({ column: 1187, row: 1975, zoom: 12 });
    expect(getIndexRelativeToCenter({ x: 600, y: 500 }, mockProximateCenterIndex, { h: 500, w: 600 }, 1024))
      .toEqual({ column: 1188, row: 1976, zoom: 12 });
  });
});
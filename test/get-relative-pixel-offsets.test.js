'use strict';

const getPxOffsets = require('../src/get-relative-pixel-offsets');

describe('getPxOffsets', () => {
  const defaultDimensions = { h: 500, w: 500 };

  test('generates different offsets based on image dimensions', () => {
    const mockCenter = { column: 4, row: 3, zoom: 4 };
    const mockIndex = { column: 4, row: 4, zoom: 4 };
    expect(getPxOffsets(mockIndex, mockCenter, defaultDimensions))
      .toEqual({ x: 250, y: 762 });
    expect(getPxOffsets(mockIndex, mockCenter, { h: 1000, w: 1000 }))
      .toEqual({ x: 500, y: 1012 });
    expect(getPxOffsets(mockIndex, mockCenter, { h: 250, w: 250 }))
      .toEqual({ x: 125, y: 637 });
  });

  test('generates different offsets based on sibling tile index', () => {
    const mockCenter = { column: 4.021484375, row: 3.955078125, zoom: 4 };
    expect(getPxOffsets({ column: 5, row: 4, zoom: 4 }, mockCenter, defaultDimensions))
      .toEqual({ x: 751, y: 273 });
    expect(getPxOffsets({ column: 4, row: 4, zoom: 4 }, mockCenter, defaultDimensions))
      .toEqual({ x: 239, y: 273 });
  });

  test('tile size does not affect offsets if indices equal', () => {
    const mockIndex = { column: 0, row: 0, zoom: 1 };
    expect(getPxOffsets(mockIndex, mockIndex, defaultDimensions))
      .toEqual({ x: 250, y: 250 });
    expect(getPxOffsets(mockIndex, mockIndex, defaultDimensions, 256))
      .toEqual({ x: 250, y: 250 });
    expect(getPxOffsets(mockIndex, mockIndex, defaultDimensions, 1024))
      .toEqual({ x: 250, y: 250 });
  });
});

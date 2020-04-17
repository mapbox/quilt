'use strict';

const stitchTiles = require('../src/stitch-tiles');
const { PNG } = require('pngjs');
const fs = require('fs');

const mockTileBuffer = fs.readFileSync('./fixtures/fake-tile.png');
const mockTileArray = Promise.all([
  { buffer: mockTileBuffer, x: 0, y: 0, reencode: true },
  { buffer: mockTileBuffer, x: 0, y: 340, reencode: true },
  { buffer: mockTileBuffer, x: 340, y: 0, reencode: true },
  { buffer: mockTileBuffer, x: 340, y: 340, reencode: true }
]);

const expected = fs.readFileSync('./fixtures/stitch-expected.png');

describe('stitchTiles', () => {
  test('generates expected decoded image', () => {
    const expectDecoded = {
      decoded: PNG.sync.read(expected),
      original: expected.toString('base64')
    };

    stitchTiles(mockTileArray).then((result) => {
      expect(result).toEqual(expectDecoded);
    });
  });

  test('generates expected non-decoded image', () => {
    const expectedNonDecoded = { decoded: null, original: expected.toString('base64') };

    stitchTiles(mockTileArray, 500, false).then((result) => {
      expect(result).toEqual(expectedNonDecoded);
    })
  });

  test('throws if mapnik blend throws', () => {
    const mockBadTileArray = Promise.all(['This is not a tile buffer object']);

    expect(stitchTiles(mockBadTileArray)).rejects.toThrow();
    expect(stitchTiles(mockBadTileArray)).rejects.toEqual(
      TypeError('Uncaught TypeError: First argument must be an array of Buffers.')
    );
  })
});

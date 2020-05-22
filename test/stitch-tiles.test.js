'use strict';

const stitchTiles = require('../src/stitch-tiles');
const fs = require('fs');

const mockTileBuffer = fs.readFileSync(__dirname + '/fixtures/fake-tile.png');
const mockTileArray = Promise.all([
  { buffer: mockTileBuffer, x: 0, y: 0, reencode: true },
  { buffer: mockTileBuffer, x: 0, y: 340, reencode: true },
  { buffer: mockTileBuffer, x: 340, y: 0, reencode: true },
  { buffer: mockTileBuffer, x: 340, y: 340, reencode: true }
]);

describe('stitchTiles', () => {
  test('generates expected string binary', () => {
    const expected = fs.readFileSync(__dirname + '/fixtures/stitch-expected.png');

    stitchTiles(mockTileArray, 500, false).then((result) => {
      expect(result).toEqual(expected);
    });
  });

  test('throws if mapnik blend throws', () => {
    const mockBadTileArray = Promise.all(['not a buffer']);

    expect(stitchTiles(mockBadTileArray)).rejects.toThrow();
    expect(stitchTiles(mockBadTileArray)).rejects.toEqual(
      Error('Expected object for image to composite but received not a buffer of type string')
    );
  });
});

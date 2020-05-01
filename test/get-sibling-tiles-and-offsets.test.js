'use strict';

const getSiblingTiles = require('../src/get-sibling-tiles-and-offsets');
const {
  ImgDim500,
  ImgDim1000,
  ImgTs256,
  ImgTs1024
} = require('./fixtures/img-properties-objs');

describe('getSiblingTilesAndOffsets', () => {
  const mockPx = { x: 2059, y: 2025 };

  test('properly wraps negative tiles', () => {
    getSiblingTiles({ x: 4096, y: 2048 }, 3).then((imgProps) => {
      const minIndex = imgProps.tiles.reduce((prev, current) => {
        return (prev.x < current.x) ? prev.x : current.x;
      });

      expect(minIndex).toEqual(0);
    });
  });

  test('image dimensions affect number of tiles required', () => {
    getSiblingTiles(mockPx, 3).then((imgProps) => {
      expect(imgProps.tiles.length).toEqual(ImgDim500.tiles.length);
    });

    getSiblingTiles(mockPx, 3, 1000).then((imgProps) => {
      expect(imgProps.tiles.length).toEqual(ImgDim1000.tiles.length);
    });
  });

  test('tile size affects number of tiles required', () => {
    getSiblingTiles(mockPx, 3, 500, 256).then((imgProps) => {
      expect(imgProps.tiles.length).toEqual(ImgTs256.tiles.length);
    });

    getSiblingTiles(mockPx, 3, 500, 1023).then((imgProps) => {
      expect(imgProps.tiles.length).toEqual(ImgTs1024.tiles.length);
    });
  });

  test('zoom is passed through properly', () => {
    getSiblingTiles(mockPx, 6).then((imgProps) => {
      expect(imgProps.center.zoom).toEqual(6);
    });

    getSiblingTiles(mockPx, 6).then((imgProps) => {
      const zooms = imgProps.tiles.map((tile) => { return tile.z; });
      zooms.forEach((zoom) => {
        expect(zoom).toEqual(6);
      });
    });
  });

  test('only returns one tile if zoom === 0', () => {
    getSiblingTiles({ x: 256, y: 256 }, 0).then((imgProps) => {
      expect(imgProps.tiles.length).toEqual(1);
    });
  });
});

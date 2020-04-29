'use strict';

const { DEFAULT_LENGTH, TILE_SIZE } = require('../utils/constants');
const getProximateCenterIndex = require('./get-proximate-center-index');
const getIndexRelativeToCenter = require('./get-index-relative-to-center');
const getRelativePx = require('./get-relative-pixel-offsets');

function getSiblingTilesAndOffsets(
  pxCoordinates,
  zoom,
  length = DEFAULT_LENGTH,
  tileSize = TILE_SIZE
) {
  const dimensions = { h: length, w: length };
  const centerIndex = getProximateCenterIndex(pxCoordinates, zoom, tileSize);
  const topLeftIndex = getIndexRelativeToCenter({ x: 0, y: 0 }, centerIndex, dimensions, tileSize);
  const bottomRightIndex = getIndexRelativeToCenter({ x: length, y: length }, centerIndex, dimensions, tileSize);
  const maxTiles = Math.pow(2, zoom);

  const imgProperties = {};
  imgProperties.tiles = [];

  // iterate through our grid & determine what additional tiles are necessary
  // in order to make the final image
  for (let row = topLeftIndex.row; row <= bottomRightIndex.row; row++) {
    if (row < 0) continue;
    if (row > maxTiles) break;
    for (let column = topLeftIndex.column; column <= bottomRightIndex.column; column++) {
      const coordinate = {
        column: column,
        row: row,
        zoom: zoom
      };

      // Ensure we wrap tiles with negative coordinate values
      coordinate.column = (coordinate.column + maxTiles) % maxTiles;

      const relativePx = getRelativePx(coordinate, centerIndex, dimensions, tileSize);

      imgProperties.tiles.push({
        x: coordinate.column,
        y: coordinate.row,
        z: coordinate.zoom,
        px: Math.round(relativePx.x),
        py: Math.round(relativePx.y)
      });
    }
  }

  imgProperties.dimensions = dimensions;
  imgProperties.center = {
    column: Math.floor(centerIndex.column),
    row: Math.floor(centerIndex.row),
    zoom: centerIndex.zoom
  };

  return Promise.resolve(imgProperties);
}

module.exports = getSiblingTilesAndOffsets;

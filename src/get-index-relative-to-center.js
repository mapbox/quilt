'use strict';

const { TILE_SIZE } = require('../utils/constants');

function getIndexRelativeToCenter(point, centerIndex, dimensions, tileSize = TILE_SIZE) {
  /*
    Note:
    - point, dimensions, & tileSize are in pixel units
    - centerIndex and return value are tile indices 
  */
  const pxCoord = {
    column: centerIndex.column,
    row: centerIndex.row,
  };
  pxCoord.column += (point.x - (dimensions.w / 2)) / tileSize;
  pxCoord.row += (point.y - (dimensions.h / 2)) / tileSize;

  return {
    column: Math.floor(pxCoord.column),
    row: Math.floor(pxCoord.row),
    zoom: centerIndex.zoom
  };
};

module.exports = getIndexRelativeToCenter;
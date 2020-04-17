'use strict';

const { TILE_SIZE } = require('../constants');

function getRelativePx(tileIndex, centerIndex, dimensions, tileSize = TILE_SIZE) {
  const relativePx = {
    x: dimensions.w / 2 + tileSize * (tileIndex.column - centerIndex.column),
    y: dimensions.h / 2 + tileSize * (tileIndex.row - centerIndex.row)
  };

  return relativePx;
};

module.exports = getRelativePx;
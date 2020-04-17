'use strict';

const { TILE_SIZE } = require('../utils/constants');

function getProximateCenterIndex(pxCoord, zoom, tileSize = TILE_SIZE) {
  // values must remain unrounded to ensure additional calculations are correct
  return {
    column: pxCoord.x / tileSize,
    row: pxCoord.y / tileSize,
    zoom: zoom
  };
}

module.exports = getProximateCenterIndex;

'use strict';

const getTileUrl = require('../utils/get-tile-url');
const getStaticTile = require('./get-static-tile');

function getAllTiles(tileImgProperties, { style, accessToken }) {
  const tiles = tileImgProperties.tiles;

  const retrievedTiles = tiles.map((tile) => {
    const tileUrl = getTileUrl({ style, accessToken }, tile.z, tile.x, tile.y);
    // ensure our pixel offsets are associated with the tiles so we can
    // properly blend them when stitching tiles later
    const { px, py } = tile;
    return getStaticTile(tileUrl, { x: px, y: py });
  });

  return Promise.all(retrievedTiles).catch((e) => {
    throw new Error(e);
  });
}

module.exports = getAllTiles;

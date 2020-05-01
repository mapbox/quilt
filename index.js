'use strict';

const { DEFAULT_LENGTH } = require('./utils/constants');
const getPixelCoordinates = require('./src/get-pixel-coordinates');
const getSiblingTilesAndOffsets = require('./src/get-sibling-tiles-and-offsets');
const getAllTiles = require('./src/get-all-static-tiles');
const stitchTiles = require('./src/stitch-tiles');


function makeGetQuilt(coordinates, zoom, length = DEFAULT_LENGTH, decode = true) {
  return (style) => {
    const pixelCoords = getPixelCoordinates(coordinates, zoom);
    const finalImage = getSiblingTilesAndOffsets(pixelCoords, zoom, length)
      .then((imageIngredients) => getAllTiles(imageIngredients, style))
      .then((requiredTiles) => stitchTiles(requiredTiles, length, decode))
      .catch((e) => { throw new Error(e); });

    return finalImage;
  };
}

module.exports = makeGetQuilt;

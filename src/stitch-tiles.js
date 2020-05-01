'use strict';

const { DEFAULT_LENGTH } = require('../utils/constants');
const mapnik = require('mapnik');

async function stitchTiles(tileArray, length = DEFAULT_LENGTH) {
  const tiles = await tileArray;

  return new Promise((resolve, reject) => {
    mapnik.blend(tiles,
      {
        format: 'png',
        width: length,
        height: length,
        reencode: true
      }, (err, img) => {
        if (err) return reject(err);
        return resolve(img);
      });
  });
}

module.exports = stitchTiles;

'use strict'

const { DEFAULT_LENGTH } = require('../constants');
const mapnik = require('mapnik');
const { PNG } = require('pngjs');

async function stitchTiles(tileArray, length = DEFAULT_LENGTH, decode = true) {
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
        return resolve(
          {
            decoded: decode ? PNG.sync.read(img) : null,
            original: img.toString('base64')
          }
        );
      });
  });
}

module.exports = stitchTiles;
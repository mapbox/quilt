'use strict';

const { DEFAULT_LENGTH } = require('../utils/constants');
const sharp = require('sharp');

async function stitchTiles(tileArray, length = DEFAULT_LENGTH) {
  const tiles = await tileArray;

  return new Promise((resolve, reject) => {
    sharp({
      create: {
        width: length,
        height: length,
        channels: 4,
        background: { r: 100, g: 100, b: 100, alpha: 1 }
      }
    })
      .composite(tiles)
      .png()
      .toBuffer()
      .then((img) => {
        return resolve(img);
      })
      .catch((err) => {
        return reject(err);
      });
  });
}

module.exports = stitchTiles;

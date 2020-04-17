'use strict';

const { TILE_SIZE } = require('../utils/constants');
const SphericalMercator = require('@mapbox/sphericalmercator');

function getPixelCoordinates(coordinates, zoom, tileSize = TILE_SIZE) {
  /*
    coordinates is expected to be an array in the form of [lon, lat]
  */
  const sm = new SphericalMercator({ size: tileSize });
  const pxy = sm.px([coordinates[0], coordinates[1]], zoom);

  return { x: pxy[0], y: pxy[1] };
}

module.exports = getPixelCoordinates;

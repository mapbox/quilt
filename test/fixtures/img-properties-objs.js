'use strict';

module.exports.ImgDim500 = {
  tiles: [
    { x: 3, y: 3, z: 4, px: -273, py: -239 },
    { x: 3, y: 4, z: 4, px: -273, py: 273 },
    { x: 4, y: 3, z: 4, px: 239, py: -239 },
    { x: 4, y: 4, z: 4, px: 239, py: 273 }
  ],
  dimensions: { h: 500, w: 500 },
  center: { column: 4, row: 3, zoom: 4 }
};

module.exports.ImgDim1000 = {
  tiles: [
    { x: 3, y: 2, z: 4, px: -23, py: -501 },
    { x: 3, y: 3, z: 4, px: -23, py: 11 },
    { x: 3, y: 4, z: 4, px: -23, py: 523 },
    { x: 4, y: 2, z: 4, px: 489, py: -501 },
    { x: 4, y: 3, z: 4, px: 489, py: 11 },
    { x: 4, y: 4, z: 4, px: 489, py: 523 }
  ],
  dimensions: { h: 1000, w: 1000 },
  center: { column: 4, row: 3, zoom: 4 }
};

module.exports.ImgTs256 = {
  tiles: [
    { x: 3, y: 2, z: 4, px: -11, py: -250 },
    { x: 3, y: 3, z: 4, px: -11, py: 6 },
    { x: 3, y: 4, z: 4, px: -11, py: 262 },
    { x: 4, y: 2, z: 4, px: 245, py: -250 },
    { x: 4, y: 3, z: 4, px: 245, py: 6 },
    { x: 4, y: 4, z: 4, px: 245, py: 262 }
  ],
  dimensions: { h: 500, w: 500 },
  center: { column: 4, row: 3, zoom: 4 }
};

module.exports.ImgTs1024 = {
  tiles: [
    { x: 3, y: 3, z: 4, px: -796, py: -728 },
    { x: 3, y: 4, z: 4, px: -796, py: 296 },
    { x: 4, y: 3, z: 4, px: 228, py: -728 },
    { x: 4, y: 4, z: 4, px: 228, py: 296 }
  ],
  dimensions: { h: 500, w: 500 },
  center: { column: 4, row: 3, zoom: 4 }
};

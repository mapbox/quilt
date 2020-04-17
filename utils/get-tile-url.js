'use strict';

const { BASE_URL } = require('./constants');
const checkToken = require('./check-token');
const invalidStyleUrl = require('./invalid-style-url');


function getTileUrl(
  { style, accessToken },
  zoom,
  tileX,
  tileY
) {
  if (invalidStyleUrl(style)) {
    throw new Error(invalidStyleUrl(style));
  }
  const token = checkToken(accessToken);
  const id = style.split('mapbox://styles/').pop();

  return `${BASE_URL}/${id}/tiles/${zoom}/${tileX}/${tileY}?access_token=${token}`;
}

module.exports = getTileUrl;
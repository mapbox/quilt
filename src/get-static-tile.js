'use strict';

const { FETCH_RETRIES } = require('../utils/constants');
const fetch = require('node-fetch');
const pRetry = require('p-retry');

function getStaticTile(url, pxOffsets) {
  const getImg = async (attempt) => {
    (attempt > 1) ? url += '&fresh=true' : url;
    const response = await fetch(url);
    // Throw if resource doesn't exist to trigger a retry
    if (response.status === 404) {
      throw new Error(response.statusText);
    }

    // Abort retries if status is neither 404 or 200
    if (response.status !== 200) {
      throw new pRetry.AbortError(response.statusText);
    }

    return response;
  };

  return pRetry((attempt) => getImg(attempt), {
    retries: FETCH_RETRIES
  })
    .then((res) => res.buffer())
    .then((buffer) => {
      return {
        buffer: buffer,
        x: pxOffsets.x,
        y: pxOffsets.y,
        reencode: true
      };
    })
    .catch((e) => {
      throw new Error(e);
    });
}

module.exports = getStaticTile;

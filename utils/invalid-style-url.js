'use strict';

function invalidStyleUrl(styleUrl) {
  return !styleUrl || !styleUrl.match(/^mapbox:\/\/styles\/([^/]*)\/([^/]*)$/)
    ? 'invalid style url'
    : false;
}

module.exports = invalidStyleUrl;

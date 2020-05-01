'use strict';

function checkToken(token) {

  if (!token || !token.match(/^(sk|pk|tk)\.([^/]*)$/)) {
    throw new Error('Invalid accessToken');
  }

  return token;
}

module.exports = checkToken;

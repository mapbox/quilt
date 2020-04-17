'use strict';

function checkToken(token) {

  if (!token || !token.match(/^(sk|pk)\.([^/]*)$/)) {
    throw new Error('Invalid accessToken');
  }

  return token;
}

module.exports = checkToken;
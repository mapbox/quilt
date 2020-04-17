'use strict';

const checkToken = require('../utils/check-token');

describe('checkToken', () => {

  test('bad arg', () => {
    expect(() => checkToken('invalid')).toThrow();
  });

  test('valid arg', () => {
    expect(checkToken('sk.1234')).toEqual('sk.1234');
  });
});
'use strict';

const invalidStyleUrl = require('../utils/invalid-style-url');

describe('invalidStyleUrl', () => {
  test('bad arg', () => {
    expect(invalidStyleUrl(undefined)).toEqual('invalid style url');

    expect(invalidStyleUrl('geocities://styles/cyrus/1234')).toEqual(
      'invalid style url'
    );
  });

  test('valid arg', () => {
    expect(invalidStyleUrl('mapbox://styles/cyrus/1234')).toEqual(false);
  });
});

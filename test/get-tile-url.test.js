'use strict';

const getTileUrl = require('../utils/get-tile-url');


describe('getTileUrl', () => {
  test('invalid style + missing token', () => {
    expect(() =>
      getTileUrl(
        {
          style: 'ping://pong/fancy/style',
          accessToken: 'sk.1234'
        },
        1,
        9,
        17
      )
    ).toThrow();
    expect(() =>
      getTileUrl(
        {
          style: 'mapbox://styles/cyrus/1234',
          accessToken: 'invalid'
        },
        1,
        9,
        17
      )
    ).toThrow();
  });

  test('valid args', () => {
    expect(
      getTileUrl(
        {
          style: 'mapbox://styles/cyrus/1234',
          accessToken: 'sk.1234'
        },
        1,
        9,
        17
      )
    ).toEqual('https://api.mapbox.com/styles/v1/cyrus/1234/tiles/1/9/17?access_token=sk.1234');
  });
});

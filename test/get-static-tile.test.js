'use strict';

const fetch = require('node-fetch');
jest.mock('node-fetch', () => jest.fn());

const getStaticTile = require('../src/get-static-tile');
const accessToken = process.env.MAPBOX_ACCESS_TOKEN || process.env.MapboxAccessToken;

const urlFixture = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/0/0/0?access_token=${accessToken}`;
const pxFixture = { x: 256, y: 256 };

describe('getStaticTile', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('returns on 200', async () => {
    const response = Promise.resolve({
      status: 200,
      buffer: jest.fn(() => ({
        toString: jest.fn()
      }))
    });

    fetch.mockImplementation(() => response);
    const staticTile = await getStaticTile(urlFixture, pxFixture);

    expect(staticTile).toEqual({
      input: expect.any(Object),
      top: 256,
      left: 256
    });
  });

  test('retries on 404', async () => {
    const response = Promise.resolve({
      status: 404,
      buffer: jest.fn()
    });

    fetch.mockImplementation(() => response);
    const staticTile = getStaticTile(urlFixture, pxFixture);
    expect(staticTile).resolves.toEqual({
      input: undefined,
      top: null,
      left: null
    });
  });

  test('throws on 403', async () => {
    const response = Promise.resolve({
      status: 403,
      statusText: 'Forbidden'
    });

    fetch.mockImplementation(() => response);
    const staticTile = getStaticTile(urlFixture, pxFixture);
    await expect(staticTile).rejects.toThrow();
  });

  test('throws on 429', async () => {
    const response = Promise.resolve({
      status: 429,
      statusText: 'Too many requests'
    });

    fetch.mockImplementation(() => response);
    const staticTile = getStaticTile(urlFixture, pxFixture);
    await expect(staticTile).rejects.toThrow();
  });

});

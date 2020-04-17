'use strict';

const fs = require('fs');
const fetch = require('node-fetch');
jest.mock('node-fetch', () => jest.fn());

const makeGetQuilt = require('../index');
const accessToken = process.env.MAPBOX_ACCESS_TOKEN || process.env.MapboxAccessToken;

const fixture = {
  style: 'mapbox://styles/mapbox/streets-v11',
  accessToken
};

const mockBuffer = fs.readFileSync('./fixtures/fake-tile.png')

const options = [[0, 0], 1, 500, false];

describe('makeGetQuilt', () => {
  test('returns on 200', async () => {
    const response = Promise.resolve({
      status: 200,
      buffer: () => { return mockBuffer }
    });

    fetch.mockImplementation(() => response);
    const getQuilt = makeGetQuilt(...options);
    const image = await getQuilt(fixture);

    expect(image).toEqual({
      decoded: null,
      original: expect.any(String)
    });
  });

  test('retries on 404', async () => {
    const response = Promise.resolve({
      status: 404,
      buffer: jest.fn()
    });

    fetch.mockImplementation(() => response);
    const getQuilt = makeGetQuilt(...options);
    expect(getQuilt(fixture)).resolves.toEqual({
      decoded: null,
      original: undefined
    });
  });

  test('throws on 403', async () => {
    const response = Promise.resolve({
      status: 403,
      statusText: 'Forbidden'
    });

    fetch.mockImplementation(() => response);
    const getQuilt = makeGetQuilt(...options);
    await expect(getQuilt(fixture)).rejects.toThrow();
  });
});

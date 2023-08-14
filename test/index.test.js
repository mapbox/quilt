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

const mockBuffer = fs.readFileSync(__dirname + '/fixtures/fake-tile.png');

const options = [[0, 0], 1, 500, false];

describe('makeGetQuilt', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('returns on 200', async () => {
    const response = Promise.resolve({
      status: 200,
      buffer: () => { return mockBuffer; }
    });

    fetch.mockImplementation(() => response);
    const getQuilt = makeGetQuilt(...options);
    const image = await getQuilt(fixture);

    expect(image).toEqual(expect.any(Buffer));
  });

  test('retries on 404', async () => {
    const response404 = Promise.resolve({
      status: 404,
      buffer: jest.fn()
    });
    const response200 = Promise.resolve({
      status: 200,
      buffer: () => { return mockBuffer; }
    });

    fetch.mockImplementationOnce(() => response404).mockImplementation(() => response200);
    const getQuilt = makeGetQuilt(...options);
    const image = await getQuilt(fixture);
    expect(image).toEqual(expect.any(Buffer));
    expect(fetch).toHaveBeenCalledTimes(5);
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

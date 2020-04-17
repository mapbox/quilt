'use strict';

const getAllStaticTiles = require('../src/get-all-static-tiles');

jest.mock('../src/get-static-tile', () => {
  return jest.fn().mockImplementation(() => {
    return Promise.resolve('💠');
  })
});
const getTile = require('../src/get-static-tile');


const { ImgDim500 } = require('./fixtures/img-properties-objs');
const accessToken = process.env.MAPBOX_ACCESS_TOKEN || process.env.MapboxAccessToken;

const requestOptions = {
  style: 'mapbox://styles/mapbox/streets-v11',
  accessToken
};

describe('getAllStaticTiles', () => {
  test('calls function for each tile', async () => {
    const results = await getAllStaticTiles(ImgDim500, requestOptions);
    expect(getTile).toHaveBeenCalledTimes(4);
    expect(results).toEqual(['💠', '💠', '💠', '💠']);
  });

  test('throws if error', async () => {
    getTile.mockImplementation(() => Promise.reject('whüps'));
    await expect(getAllStaticTiles(ImgDim500, requestOptions)).rejects.toThrow('whüps');
  });
});

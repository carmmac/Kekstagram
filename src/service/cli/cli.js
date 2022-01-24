'use strict';

const info = require(`./info`);
const server = require(`./server`);
const generateMocks = require(`../generate-mocks`);

module.exports = {
  [info.name]: info,
  [server.name]: server,
  [generateMocks.name]: generateMocks
};

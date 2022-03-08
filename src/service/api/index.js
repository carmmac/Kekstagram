'use strict';

const {Router} = require(`express`);
const path = require(`path`);
const fs = require(`fs`).promises;

const photosRouter = require(`./photos.js`);
const PhotosService = require(`../data-service/photos-service.js`);

const app = new Router();

(async () => {
  try {
    const fileContent = await fs.readFile(path.resolve(process.cwd(), `mocks/mocks.json`));
    const mockData = JSON.parse(fileContent);
    photosRouter(app, new PhotosService(mockData));
  } catch (error) {
    console.error(error);
    throw new Error(`Error while setting up server-side API: ${error.message}`);
  }
})();

module.exports = app;

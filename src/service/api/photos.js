'use strict';

const {Router} = require(`express`);
const cors = require(`cors`);

const {HttpCode, DEFAULT_URL} = require(`../const.js`);

const photosRouter = new Router();

const corsOptions = {
  origin: `${DEFAULT_URL}`
};

module.exports = (app, photosService) => {
  app.use(`/photos`, photosRouter);

  photosRouter.get(`/`, cors(corsOptions), (req, res) => {
    const photos = photosService.findAll();
    if (!photos) {
      res.status(HttpCode.NOT_FOUND)
        .send(`NOT FOUND`);
    }
    res.status(HttpCode.OK)
      .json(photos);
  });

  photosRouter.get(`/:id`, cors(corsOptions), (req, res) => {
    const {id} = req.params;
    const photo = photosService.findOne(id);
    if (!photo) {
      res.status(HttpCode.NOT_FOUND)
        .send(`Photo with id ${id} not found`);
    }
    res.status(HttpCode.OK)
      .json(photo);
  });
};

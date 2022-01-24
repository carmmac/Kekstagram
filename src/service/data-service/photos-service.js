'use strict';

class PhotosService {
  constructor(photos) {
    this._photos = photos;
  }

  findAll() {
    return this._photos;
  }
}

module.exports = PhotosService;

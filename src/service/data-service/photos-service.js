'use strict';

class PhotosService {
  constructor(photos) {
    this._photos = photos;
  }

  findAll() {
    return this._photos;
  }

  findOne(id) {
    return this._photos.find((photo) => photo.id === id);
  }
}

module.exports = PhotosService;

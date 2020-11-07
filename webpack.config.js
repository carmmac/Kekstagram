const path = require("path");

module.exports = {
  entry: [
    "./js/util.js",
    "./js/debounce.js",
    "./js/render-picture.js",
    "./js/show-big-picture.js",
    "./js/form.js",
    "./js/load.js",
    "./js/filters.js",
    "./js/render-photos.js",
    "./js/show-popup.js",
    "./js/main.js",
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};

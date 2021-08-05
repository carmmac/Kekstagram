const path = require("path");

module.exports = {
  entry: [
    "./src/js/util.js",
    "./src/js/debounce.js",
    "./src/js/render-picture.js",
    "./src/js/show-big-picture.js",
    "./src/js/form.js",
    "./src/js/load.js",
    "./src/js/filters.js",
    "./src/js/render-photos.js",
    "./src/js/show-popup.js",
    "./src/js/main.js",
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, 'express/public'),
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'express/public'),
    watchContentBase: true,
  },
  devtool: 'source-map',
};

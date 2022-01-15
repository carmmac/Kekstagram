const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, 'frontend/public'),
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'frontend/public'),
    watchContentBase: true,
    open: true,
    port: 8080,
  },
  devtool: 'source-map',
};

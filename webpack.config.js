const path = require("path");

module.exports = {
  entry: "./src/frontend/public/js/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, 'src/frontend/public'),
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'src/frontend/public'),
    watchContentBase: true,
    open: true,
    port: 8080,
  },
  devtool: 'source-map',
};

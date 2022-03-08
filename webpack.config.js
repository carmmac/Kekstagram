const path = require("path");

module.exports = {
  entry: "./src/frontend/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, 'src/frontend/public'),
  },
  devServer: {
    open: true,
    port: 8080,
    static: {
      directory: path.resolve(__dirname, 'src/frontend/public'),
      watch: true
    }
  },
  module: {
    rules: [
      {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map',
};

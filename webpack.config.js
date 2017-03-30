const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './dist/Emoji.js',
  output: {
    filename: 'Emoji.min.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ]
};

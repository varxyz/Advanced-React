const path = require('path');

module.exports = {
  entry: ['babel-polyfill', './lib/components/index.js'],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {loader: 'babel-loader', options: {
          presets: ['react', 'env', 'stage-2']
        }},
        exclude: /node_modules/
      }
    ]
  }
};

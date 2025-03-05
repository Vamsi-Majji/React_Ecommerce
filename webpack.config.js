const webpack = require('webpack');

module.exports = {
  // Other configuration options...
  resolve: {
    // Removed fallback property for compatibility with Webpack 4
  },




  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
};

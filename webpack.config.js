var webpack = require('webpack');

var babelPlugin = new webpack.DefinePlugin({
  "process.env": {
    NODE_ENV: JSON.stringify("production")
  },
  test: /\.jsx?$/,         // Match both .js and .jsx files
  exclude: /node_modules/,
  loader: "babel",
  query:
  {
    presets:['react']
  }
});


module.exports = {
  entry: ['./js/app.js'],
  devtool: "inline-source-map",
  output: {
    path: '/home/janson/Works/www/ChromeExtension/public',
    filename: 'index.js',
    publicPath: '/public/'
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.css'],
    modulesDirectories: ['node_modules', 'js']
  },
  plugins: [
    babelPlugin
  ],
  module: {
    loaders: [
      {
        test: /\.js(x)?$/,
        exclude: /(node_modules)/,
        loaders: ['babel']
      }
    ]
  },

  devServer: {
    stats: 'errors-only',

    assets: false,
    colors: true,
    version: false,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false
  }
};
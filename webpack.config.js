var path = require('path');
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
  entry: {index: './js/app.js', background: './js/background.js'},
  devtool: "inline-source-map",
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].js',
    publicPath: '/public/'
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.css'],
    modulesDirectories: ['node_modules', 'js', 'app']
  },
  plugins: [
    // babelPlugin,
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js(x)?$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets:['react']
        }
      },
      {
        loader: "babel-loader",
        // Skip any files outside of your project's `src` directory
        exclude: [
          path.resolve(__dirname, "node_modules"),
        ],
        // Only run `.js` and `.jsx` files through Babel
        test: /\.jsx?$/,
        // Options to configure babel with
        query: {
          presets: ['es2015', 'react'],
        }
      },
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
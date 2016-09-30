const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpackUglifyJsPlugin = require('webpack-uglify-js-plugin');

let outputPath = path.resolve(__dirname, 'dist')
let sourcePath = path.resolve(__dirname, 'app')
let otsimoPath = path.resolve(__dirname, 'node_modules', 'otsimo')
let fastClickPath = path.resolve(__dirname, 'node_modules', 'fastclick', 'lib')

module.exports = {
  devtool: null,
  cache: true,
  entry: {
    'vendor': ['angular', 'angular-mocks', 'ngtouch'],
    'app': path.join(sourcePath, 'app.js')
  },
  output: {
    path: outputPath,
    filename: '[name].js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'babel',
      query: {
        presets: ['es2015']
      }
    }]
  },
  resolve: {
    root: [sourcePath],
    modules: [
      'node_modules',
      sourcePath
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor'],
      minChunks: Infinity
    }),
    new webpackUglifyJsPlugin({
      cacheFolder: path.resolve(__dirname, 'public/cached_uglify/'),
      debug: true,
      minimize: true,
      sourceMap: false,
      output: {
        comments: false
      },
      compressor: {
        warnings: false
      }
    }),
    new CopyWebpackPlugin([
      {
        context: sourcePath,
        from: '**/*.{html,css,woff,json,svg}',
        ignore: ['symbols/test-en/**/*.{html,css,woff,json,svg}']
      },
      {
        context: otsimoPath,
        from: 'otsimo.js'
      },
      {
        from: 'i18n',
        to: 'i18n'
      },
      {
        context: fastClickPath,
        from: 'fastclick.js'
      }
    ]),
    new webpack.NoErrorsPlugin()
  ]
}

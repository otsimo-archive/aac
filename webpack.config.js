const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpackUglifyJsPlugin = require('webpack-uglify-js-plugin');
const webpackDevConfig = require('./tasks/webpack.dev.config.js');
const webpackProdConfig = require('./tasks/webpack.prod.config.js');

let outputPath = path.resolve(__dirname, 'dist')
let sourcePath = path.resolve(__dirname, 'app')
let otsimoPath = path.resolve(__dirname, 'node_modules', 'otsimo')
let fastClickPath = path.resolve(__dirname, 'node_modules', 'fastclick', 'lib')

let isProduction = process.env.NODE_ENV === 'production'

if (isProduction) {
  module.exports = webpackProdConfig;
} else {
  module.exports = webpackDevConfig;
}

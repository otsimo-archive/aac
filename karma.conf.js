'use strict'
const path = require('path');
const isTravis = !!process.env.TRAVIS
module.exports = function (config) {
  let sourcePath = './app'
  let cr = null
  let browsers = ['Chrome']
  if (isTravis) {
    cr = {
      type: 'text'
    }
    browsers = ['Chrome_travis_ci'];
  }
  config.set({
    basePath: '.',
    files: [
      'karma.shim.js'
    ],
    reporters: ['progress', 'coverage'],
    preprocessors: {
      'karma.shim.js': ['webpack'],
    },
    webpack: {
      cache: true,
      devtool: 'inline-source-map',
      entry: {},
      output: {},
      isparta: {
        embedSource: true,
        noAutoWrap: true,
        // these babel options will be passed only to isparta and not to babel-loader
        babel: {
          presets: ['es2015']
        }
      },
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /(node_modules)/,
            loader: 'babel',
            query: {
              presets: ['es2015']
            }
          },
          // transpile and instrument only testing sources with isparta
          {
            test: /\.js$/,
            include: /^(?!.*\-test.js$)[\/\w\.-]+$/,
            exclude: /(node_modules|mocks.js)/,
            loader: 'isparta'
          }
        ]
      },
      resolve: {
        root: [sourcePath],
        modules: [
          'node_modules',
          sourcePath
        ]
      }
    },
    coverageReporter: cr,
    autoWatch: true,
    frameworks: ['jasmine'],
    browsers: browsers,
    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-webpack',
      'karma-coverage',
    ],
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    }
  });
}

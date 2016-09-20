'use strict'
const path = require('path');

module.exports = function (config) {
  let sourcePath = './app'
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
    autoWatch: true,
    frameworks: ['jasmine'],
    browsers: ['Chrome'],
    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-webpack',
      'karma-coverage',
    ]
  });
  let configuration = {
    // other things
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
  };
  if (process.env.TRAVIS) {
    configuration.browsers = ['Chrome_travis_ci'];
  }
  config.set(configuration);
}

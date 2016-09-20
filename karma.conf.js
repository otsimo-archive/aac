'use strict'

module.exports = function (config) {
  let sourcePath = './app'
  config.set({
    basePath: '.',
    files: [
      'karma.shim.js',
      'node_modules/karma-read-json/karma-read-json.js',
      {pattern: 'app/symbols/**/*.json', included: false}
    ],
    preprocessors: {
      'karma.shim.js': ['webpack']
    },
    webpack: {
      cache: true,
      devtool: 'inline-source-map',
      entry: {},
      output: {},
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
      }
    },
    autoWatch: true,
    frameworks: ['jasmine'],
    browsers: ['Chrome'],
    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-webpack'
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

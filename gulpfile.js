var gulp = require('gulp');
var sequence = require('run-sequence');
var requireDir = require('require-dir');



// Require production tasks
requireDir('./tasks');

// Initiate production tasks
gulp.task('build', () => {
  sequence('clean:prod',
    [
      'img:prod',
      'js:prod',
      'json:prod',
      'css:prod',
      'data:prod',
      'i18n:prod',
      'symbols:prod'
    ],
    'html:prod'
  );
});

// Initiate development tasks
gulp.task('default', () => {
  sequence('clean:dev',
    [
      'img:dev',
      'js:dev',
      'css:dev',      
      'html:dev',
      'json:dev',
      'data:dev'      
    ],
    'watch',
    'serve'
  );
});
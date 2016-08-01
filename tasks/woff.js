var config = require('./config.js');
var gulp = require('gulp');
var util = require('gulp-util')

gulp.task('woff:dev', function () {
  return gulp.src(config.paths.src.woff)
    .pipe(gulp.dest(config.paths.builds.dev.woff))
});

gulp.task('woff:prod', function () {
  return gulp.src(config.paths.src.woff)
    .pipe(gulp.dest(config.paths.builds.prod.woff))
    .on('error', util.log);
});

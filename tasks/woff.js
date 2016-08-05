var config = require('./config.js');
var gulp = require('gulp');
var util = require('gulp-util')

gulp.task('woff:dev', function () {
  return gulp.src(config.paths.src.woff)
    .pipe(gulp.dest(config.paths.builds.dev.font))
});

gulp.task('woff:prod', function () {
  return gulp.src(config.paths.src.woff)
    .pipe(gulp.dest(config.paths.builds.prod.font))
    .on('error', util.log);
});

gulp.task('woff2:dev', function () {
  return gulp.src(config.paths.src.woff2)
    .pipe(gulp.dest(config.paths.builds.dev.font))
});

gulp.task('woff2:prod', function () {
  return gulp.src(config.paths.src.woff2)
    .pipe(gulp.dest(config.paths.builds.prod.font))
    .on('error', util.log);
});

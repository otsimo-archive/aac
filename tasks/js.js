var config = require('./config.js');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var util = require('gulp-util')


gulp.task('js:dev', function () {
  return gulp.src(config.paths.src.js)
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.paths.builds.dev.js));
});


gulp.task('js:prod', function () {
  return gulp.src(config.paths.src.js)
    .pipe(concat('main.js'))
    .pipe(gulp.dest(config.paths.builds.prod.js))
    .on('error', util.log);
});

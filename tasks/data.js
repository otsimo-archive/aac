var config = require('./config.js');
var gulp = require('gulp');

gulp.task('data:dev', function () {
  return gulp.src(config.paths.src.data)
    .pipe(gulp.dest(config.paths.builds.dev.data))
});

gulp.task('data:prod', function () {
  return gulp.src(config.paths.src.data)
    .pipe(gulp.dest(config.paths.builds.prod.data))
});

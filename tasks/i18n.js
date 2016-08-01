
var gulp = require('gulp');
var config = require('./config.js');
var util = require('gulp-util')

// Copy all files
gulp.task('i18n:prod', function () {
    return gulp.src(config.paths.src.i18n)
        .pipe(gulp.dest(config.paths.builds.prod.i18n))
        .on('error', util.log);
});

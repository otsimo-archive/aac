
var gulp = require('gulp');
var config = require('./config.js');
var imagemin = require('gulp-imagemin');

// Copy all static images
gulp.task('img:dev', function () {
    return gulp.src([config.paths.src.img])
        .pipe(gulp.dest(config.paths.builds.dev.img));
})

// Copy all static images
gulp.task('img:prod', function () {
    return gulp.src([config.paths.src.img, config.paths.src.symbols])
        // Pass in options to the task
        .pipe(imagemin({ optimizationLevel: 5 }))
        .pipe(gulp.dest(config.paths.builds.prod.img));
});


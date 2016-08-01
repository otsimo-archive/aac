var config = require('./config.js');
var gulp = require('gulp');
var util = require('gulp-util')
var usemin = require('gulp-usemin')
var uglify = require('gulp-uglify')
var htmlmin = require('gulp-htmlmin')

gulp.task('html:dev', function () {
    return gulp.src(config.paths.src.html)
        .pipe(gulp.dest(config.paths.builds.dev.root))
});

gulp.task('html:prod', () => {
    return gulp.src(config.paths.src.html)
        .pipe(gulp.dest(config.paths.builds.prod.root))
        .pipe(usemin({
            otsimo: [],
            vendor: [],
            html: [htmlmin({
                removeComments: true,
                collapseWhitespace: true
            })]
        }))
        .pipe(gulp.dest(config.paths.builds.prod.root))
        .on('error', util.log);
});
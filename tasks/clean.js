var config = require('./config.js');
var gulp = require('gulp');
var del = require('del');

gulp.task('clean:dev', () => {
    return del.sync(config.paths.builds.dev.root);
});

gulp.task('clean:prod', () => {
    return del.sync(config.paths.builds.prod.root);
});


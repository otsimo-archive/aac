var gulp = require('gulp');
var config = require('./config.js');
var browserSync = require('browser-sync');
var path = require('path');

gulp.task('serve', () => {
    browserSync({
        server: {
            baseDir: config.paths.builds.dev.root,
            routes: {
                "/node_modules": "node_modules",
                "/symbols": path(config.paths.src.root, "app", "symbols")
            }
        }
    });
});
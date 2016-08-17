var gulp = require('gulp');
var config = require('./config.js');
var browserSync = require('browser-sync');
var refresh = require('gulp-livereload');
var path = require('path');

gulp.task('serve', () => {
    browserSync({
        server: {
            baseDir: config.paths.builds.dev.root,
            routes: {
                "/node_modules": "node_modules",
                "/symbols": path.join(config.paths.src.root, "app", "symbols"),
                "/symbols/tr": path.join(config.paths.src.root, "app", "symbols", "tr"),
                "/symbols/en": path.join(config.paths.src.root, "app", "symbols", "en")
            }
        }
    });
});

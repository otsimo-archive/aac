var gulp = require('gulp');
var config = require('./config.js');
var path = require('path');

gulp.task('watch', () => {
    gulp.watch(config.paths.src.js + '**/*.js', ['js:dev'], { debounceDelay: 1000 });
    gulp.watch(config.paths.src.img, ['img:dev'], { debounceDelay: 1000 });
    gulp.watch(config.paths.src.data, ['data:dev'], { debounceDelay: 1000 });
    gulp.watch(config.paths.src.json, ['json:dev'], { debounceDelay: 1000 });
    gulp.watch(path.join(config.paths.src.root, 'app' + '**', '*.html'), ['html:dev'], { debounceDelay: 1000 });
});

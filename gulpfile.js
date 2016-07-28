var http = require('http');
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var refresh = require('gulp-livereload');
var del = require('del');
var connect = require('gulp-connect');
var useref = require('gulp-useref');

var paths = {
  scripts: 'js/**.js',
  images: ['img/**', 'symbols/**']
};

gulp.task('useref', function(){
  return gulp.src('*.html')
    .pipe(useref())
    .pipe(gulp.dest('dist'))
});

gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del(['build']);
});

gulp.task('scripts', ['clean'], function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(concat('all.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/js'));
});

// Copy all static images
gulp.task('images', ['clean'], function() {
  return gulp.src(paths.images)
    // Pass in options to the task
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('build/img'));
});

gulp.task('html', function () {
  gulp.src('*.html')
    .pipe(connect.reload());
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.images, ['images']);
  gulp.watch(['*.html'], ['html']);
});

gulp.task('connect', function() {
  connect.server({
    livereload: true,
    port: 8894
  });
});


// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'scripts', 'images', 'connect', 'useref']);
//gulp.task('build', [ 'scripts', 'images',  'useref',"jsmin"]);

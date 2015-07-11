'use strict';

var browserify = require('browserify');
var concat = require('gulp-concat');
var gulp = require('gulp');
var source = require('vinyl-source-stream');

/**
 * Starts the development server with live reload.
 */
gulp.task('server', function () {
  process.env.WORKERS = 1;
  var cluster = require('./app');

  gulp.watch(['bro/*/*.css'], ['css']);
  gulp.watch(['bro/*/*.js', 'pages/*/*.js'], ['js']);
  gulp.watch(['app/@(controllers|modules|routes)/*.js', 'app/*.js', 'bro/*/*.js'], function () {
    cluster.reload();
  });
});

gulp.task('css', function () {
  gulp.src('bro/*/*.css')
    .pipe(concat('index/index.css'))
    .pipe(gulp.dest('static'));
});

gulp.task('js', function () {
  browserify('pages/index/index.js')
    .transform('babelify')
    .bundle()
    .pipe(source('index/index.js'))
    .pipe(gulp.dest('static'));
});

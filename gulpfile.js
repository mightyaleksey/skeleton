'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');

/**
 * Starts the development server with live reload.
 */
gulp.task('server', function () {
  process.env.WORKERS = 1;
  var cluster = require('./app');

  gulp.watch(['app/@(controllers|modules|routes)/*.js', 'app/*.js'], function () {
    cluster.reload();
  });
});

gulp.task('static', function () {
  browserify('./pages/index/browser.js')
    .transform('babelify')
    .plugin('css-modulesify', {o: 'static/index/common.css'})
    .bundle()
    .pipe(source('index/browser.js'))
    .pipe(gulp.dest('static'));
});

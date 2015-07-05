'use strict';

var gulp = require('gulp');

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

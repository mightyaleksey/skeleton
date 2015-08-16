'use strict';

var browserify = require('browserify');
var concat = require('gulp-concat');
var gulp = require('gulp');
var lrload = require('livereactload');
var source = require('vinyl-source-stream');

/**
 * Starts the development server with live reload.
 */
gulp.task('server', ['js', 'pic'], function () {
  process.env.WORKERS = 1;
  var cluster = require('./app');

  gulp.watch(['bro/*/*.js', 'pages/*/*.js'], ['js']);
  gulp.watch(['app/@(controllers|modules|routes)/*.js', 'app/*.js', 'bro/*/*.js'], function () {
    cluster.reload();
  });

  lrload.monitor('static/index/index.js', {displayNotification: true});
});

gulp.task('js', function () {
  browserify({entries: 'pages/index/index.js', fullPaths: true})
    .transform('babelify')
    .transform(lrload)
    .plugin('css-modulesify', {
      rootDir: __dirname,
      output: 'static/index/index.css'
    })
    .bundle()
    .on('error', function (err) {
      var msg = err.codeFrame
        ? err.codeFrame + '\n' + err.message
        : err.message;

      console.error(msg);
    })
    .pipe(source('index/index.js'))
    .pipe(gulp.dest('static'));
});

gulp.task('pic', function () {
  gulp.src('bro/components/*.png')
    .pipe(gulp.dest('static/index'));
});

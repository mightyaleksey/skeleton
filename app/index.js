'use strict';

var path = require('path');
var recluster = require('recluster');
var worker = path.join(__dirname, 'worker.js');
var workers = process.env.WORKERS || undefined;

var cluster = recluster(worker, {workers: workers});

cluster.run();

// Making cluster accessible from parent modules.
// Helps to build live reload server with gulp.
if (module.parent) {
  return module.exports = cluster;
}

process.on('SIGUSR2', function () {
  console.log('reloading');
  cluster.reload();
});

console.log('spawned cluster %s', process.pid);

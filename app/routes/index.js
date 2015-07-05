'use strict';

export default function routes(app) {
  app.get('/', [
    require('../controllers/detectmobile'),
    require('../controllers/prerender'),
    require('../controllers/render')
  ]);

  app.use('/', require('../controllers/static')('../static'));
  app.use('*', require('../controllers/times'));
}

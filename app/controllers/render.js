'use strict';

var debug = require('debug')('render');

export default function renderMiddleware(req, res) {
  var page = res.locals.page;
  if (!page) {
    page = res.locals.page = 'index';
  }

  debug(res.locals);
  res.render(page, res.locals);
};

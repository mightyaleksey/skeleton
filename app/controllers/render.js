const debug = require('debug')('render');

export default function renderMiddleware(req, res) {
  let page = res.locals.page;
  if (!page) {
    page = res.locals.page = 'index';
  }

  debug(res.locals);
  res.render(page, res.locals);
}

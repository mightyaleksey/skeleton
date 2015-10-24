import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
const doctype = '<!doctype html>';

export default (file, opts, cb) => {
  let markup = doctype;

  try {
    const component = require(file);
    markup += renderToStaticMarkup(
      createElement(component, opts)
    );
  } catch (e) {
    return void cb(e);
  }

  if (opts.settings.env === 'development') {
    const detectView = new RegExp(`^${opts.settings.views}`);

    Object.keys(require.cache).forEach(cachedView => {
      detectView.test(require.cache[cachedView].filename)
        && delete require.cache[cachedView];
    });
  }

  cb(null, markup);
};

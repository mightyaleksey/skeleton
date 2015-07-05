'use strict';

import React from 'react';
import App from '../../components/App.jsx';

export default function prerender(req, res, next) {
  res.locals.children = React.renderToString(<App>Hello, world!</App>);
  next();
}

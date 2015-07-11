'use strict';

import { join } from 'path';

export default function configure(app) {
  app.set('x-powered-by', false);

  // Setting render engine to jade and views folter to app/views
  app.set('views', join(__dirname, './views'));
  app.set('view engine', 'jade');
};

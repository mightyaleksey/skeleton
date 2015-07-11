'use strict';

import { createRedux } from 'redux';
import * as stores from '../../bro/stores';
import { reset } from '../../bro/actions';
import React from 'react';
import App from '../../bro/components/App';
import { toJs } from 'mori';

export default function prerender(req, res, next) {
  const redux = createRedux(stores);
  redux.dispatch(reset());
  const state = redux.getState();

  res.locals.children = React.renderToString(<App redux={redux} />);

  state.default = toJs(state.default);
  res.locals.state = JSON.stringify(state);

  next();
};

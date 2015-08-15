import lrApi from 'livereactload-api';
import { comp, toClj } from 'mori';
import { createRedux } from 'redux';
import * as stores from '../../bro/stores';

import React from 'react';
import App from '../../bro/components/App';

function transform(state) {
  state.default = toClj(state.default);
  return state;
}

function initialize() {
  const initialState = lrApi.getState() || transform(window.STATE_FROM_SERVER);
  const redux = createRedux(stores, initialState);
  redux.subscribe(comp(lrApi.setState, redux.getState));

  React.render(<App redux={ redux } />, document.querySelector('body'));
}

lrApi.onReload(initialize);
document.addEventListener('DOMContentLoaded', initialize);

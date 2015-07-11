'use strict';

import { createRedux } from 'redux';
import * as stores from '../../bro/stores';
import React from 'react';
import App from '../../bro/components/App';
import { toClj } from 'mori';

const initialState = window.STATE_FROM_SERVER;
initialState.default = toClj(initialState.default);
const redux = createRedux(stores, initialState);

React.render(<App redux={redux} />, document.querySelector('body'));

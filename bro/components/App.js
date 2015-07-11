'use strict';

import React from 'react';
import Game from './Game';
import { Provider } from 'redux/react';

export default class App {
  render() {
    const redux = this.props.redux;

    return (
      <Provider redux={redux}>
        {() => <Game/ >}
      </Provider>
    );
  }
}

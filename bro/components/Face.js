'use strict';

import { getIn, partial } from 'mori';
import { pending, reset } from '../actions';

import React, { Component } from 'react';
import { Connector } from 'redux/react';

const select = state => ({
  inaction: getIn(state.default, ['game', 'inaction']),
  ingame: getIn(state.default, ['game', 'ingame']),
  success: getIn(state.default, ['game', 'success'])
});

class Face extends Component {
  render() {
    return (
      <Connector select={ select }>
        { renderFace }
      </Connector>
    );
  }
}

function renderFace({ ingame, inaction, success, dispatch }) {
  const mod = inaction
    ? ' face--confused'
    : !ingame && (success ? ' face--happy' : ' face--upset') || '';

  const props = {
    className: 'face' + mod,
    onClick: partial(dispatch, reset()),
    onMouseDown: partial(dispatch, pending(true)),
    onMouseOut: partial(dispatch, pending(false)),
    onMouseUp: partial(dispatch, pending(false))
  };

  return (<a { ...props }/>);
}

export default Face;

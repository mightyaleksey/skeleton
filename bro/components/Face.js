import { getIn, partial } from 'mori';
import { pending, reset } from '../actions';

import styles from './Face.css';
import React, { Component } from 'react';
import { Connector } from 'redux/react';

const select = state => ({
  inaction: getIn(state.default, ['game', 'inaction']),
  ingame: getIn(state.default, ['game', 'ingame']),
  success: getIn(state.default, ['game', 'success']),
});

function renderFace({ ingame, inaction, success, dispatch }) {
  const classNames = [styles.component];

  if (inaction) {
    classNames.push(styles.confused);
  } else if (!ingame) {
    classNames.push(success ? styles.happy : styles.upset);
  }

  const props = {
    className: classNames.join(' '),
    onClick: partial(dispatch, reset()),
    onMouseDown: partial(dispatch, pending(true)),
    onMouseOut: partial(dispatch, pending(false)),
    onMouseUp: partial(dispatch, pending(false)),
  };

  return (<a { ...props }/>);
}

class Face extends Component {
  render() {
    return (
      <Connector select={ select }>
        { renderFace }
      </Connector>
    );
  }
}

export default Face;

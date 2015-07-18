'use strict';

import React, { Component, PropTypes } from 'react';

class Tile extends Component {
  render() {
    let { visible } = this.props;
    let classes = 'tile' + (visible ? ' tile--opened' : '');

    return (
      <i className={ classes } { ...this.props }>
        { this.props.children }
      </i>
    );
  }
}

export default Tile;

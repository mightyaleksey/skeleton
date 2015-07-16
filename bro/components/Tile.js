'use strict';

import React, { Component, PropTypes } from 'react';

class Tile extends Component {
  render() {
    let { visible, onClick } = this.props;
    let classes = 'tile' + (visible ? ' tile--opened' : '');

    return (
      <i className={ classes } onClick={ onClick }>
        { this.props.children }
      </i>
    );
  }
}

export default Tile;

'use strict';

import React, { Component } from 'react';

class Tile extends Component {
  render() {
    return <i className='tile'>{this.props.children}</i>;
  }
}

Tile.propTypes = {
  x: React.PropTypes.number,
  y: React.PropTypes.number
};

export default Tile;

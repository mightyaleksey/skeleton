'use strict';

import React, { Component } from 'react';

class Tile extends Component {
  render() {
    return <i className='tile' onClick={this.props.onClick}>{this.props.children}</i>;
  }
}

Tile.propTypes = {
  x: React.PropTypes.number,
  y: React.PropTypes.number
};

export default Tile;

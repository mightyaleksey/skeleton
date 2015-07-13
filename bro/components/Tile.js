'use strict';

import React, { Component } from 'react';

class Tile extends Component {
  render() {
    return <i className='tile' onClick={this.props.onClick}>{this.props.children}</i>;
  }
}

export default Tile;

'use strict';

import React, { Component } from 'react';

class Tile extends Component {
  render() {
    let classes = 'tile';
    let visible = this.props.visible;
    if (visible) {
      classes += ' tile--opened';
    }

    return <i className={classes} onClick={this.props.onClick}>{this.props.children}</i>;
  }
}

export default Tile;

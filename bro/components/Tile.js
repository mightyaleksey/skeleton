import React, { Component } from 'react';

class Tile extends Component {
  render() {
    const { visible } = this.props;
    const classes = 'tile' + (visible ? ' tile--opened' : '');

    return (
      <i className={ classes } { ...this.props }>
        { this.props.children }
      </i>
    );
  }
}

export default Tile;

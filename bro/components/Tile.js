import styles from './Tile.css';
import React, { Component } from 'react';

class Tile extends Component {
  render() {
    const { visible } = this.props;
    const classNames = [styles.component];
    if (visible) {
      classNames.push(styles.opened);
    }

    return (
      <i className={ classNames.join(' ') } { ...this.props }>
        { this.props.children }
      </i>
    );
  }
}

export default Tile;

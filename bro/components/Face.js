'use strict';

import React, { Component } from 'react';

class Face extends Component {
  constructor(props) {
    super();
    this.state = {current: props.state || ''};
  }

  onMouseDown() {
    this.setState({current: 'confused'});
  }

  onMouseUp() {
    this.setState({current: this.props.state || ''});
  }

  render() {
    var classes = 'face';
    if (this.state.current || this.props.state) {
      classes += ` face--${this.state.current || this.props.state}`;
    }

    return <a
      className={classes}
      onClick={this.props.onClick}
      onMouseDown={this.onMouseDown.bind(this)}
      onMouseUp={this.onMouseUp.bind(this)}
      href="#">Reset</a>;
  }
}

export default Face;

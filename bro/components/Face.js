'use strict';

import React, { Component } from 'react';

class Face extends Component {
  render() {
    let classes = 'face' + (this.props.state ? ` face--${this.props.state}` : '');
    return (<a className={ classes } onClick={ this.props.onClick }/>);
  }
}

export default Face;

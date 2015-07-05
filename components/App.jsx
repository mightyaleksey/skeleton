'use strict';

import React, {Component} from 'react';
import cm from 'classname-manipulator';

class App extends Component {
  render() {
    var classes = cm(this.props);

    return (
      <div className={classes}>
        {this.props.children}
      </div>
    );
  }
}

App.defaultProps = {className: 'app'};

export default App;

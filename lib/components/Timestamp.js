import React, { Component } from 'react';
import storeProvider from './storeProvider';

class Timestamp extends Component {
  render() {
    console.log('hui',this.props.timestamp);
    return (
      <div>
        {this.props.timestamp}
      </div>
    );
  }
}

function extraProps(store) {
  return {
    timestamp: store.getState().timestamp.toString()
  };
}

export default storeProvider(extraProps)(Timestamp);

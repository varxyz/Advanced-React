import React from 'react';
import PropTypes from 'prop-types';

const storeProvider = (extraProps) => (Component) => {
  // create a container component

  /**
   * Usually a HOC will need to manage some state or make
   * use of lifecycle methods so better use a class rather than a fc
   */

  return class extends React.Component {
     static displayName = `${Component.name}Container`;
     static contextTypes = {
       store: PropTypes.object
     };
     render() {
       return <Component {...this.props} {...extraProps(this.context.store, this.props)} store={this.context.store} />;
     }
  };

//   const WihtStore = (props, {store}) =>
//     <Component {...props} store={store} />;

  /**
 * In order to allow this component to access the context, we
 * need to define the `contextTypes` first
 */

//   WihtStore.contextTypes = {
//     store: PropTypes.object
//   };
  /**
   * storeProvider being a HOC, we can make the displayName dynamic and
   * everityme we build a component with it, it will display coreresponding names
   */
//   WihtStore.displayName = `${Component.name}Container`;

//   return WihtStore;

};

export default storeProvider;

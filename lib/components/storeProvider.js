import React from 'react';
import PropTypes from 'prop-types';

const storeProvider = (extraProps = () => ({})) => (Component) => {
  // create a container component

  /**
   * Usually a HOC will need to manage some state or make
   * use of lifecycle methods so better use a class rather than a fc
   */

  return class extends React.PureComponent {
     static displayName = `${Component.name}Container`;
     static contextTypes = {
       store: PropTypes.object
     };
     usedState = () => {
       return extraProps(this.context.store, this.props);
     }
     state = this.usedState()

     /**
      * to make the timestamp container trully be connected with the store
      * we need to subscribe it to the store so the props change every second
      * Because of this, it will rerender even if the timestamp container is a
      * Pure component (which means it wont update unless it receives new props
      * or new state). We dont have to pass the state down as props, we can
      * subscribe to an external state individually
      */
     onStoreChange = () => {
       if(this.subscriptionId) {
         // this.setState(this.props.store.getState());

         //  this.forceUpdate();

         /**
         * doing forceUpdate is waistful as it renders components that
         * dont need rendering aka those that dont use the getState()
         * method in extrProps
         */
         this.setState(this.usedState());
       }
     }
     componentDidMount() {
       this.subscriptionId = this.context.store.subscribe(this.onStoreChange);
     }
     componentWillUnmount() {
       this.context.store.unsubscribe(this.subscriptionId);
     }
     render() {
       return <Component {...this.props} {...this.usedState()} store={this.context.store} />;
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

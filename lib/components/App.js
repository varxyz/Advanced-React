import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArticleList from './ArticleList';

/**
 * install babel-polyfill and add it to webpack config
 * to use async/await
 */

class App extends Component {
  state = this.props.store.getState();

  /**
   * In order to make the context available, first we need to
   * define the context type using `PropTypes`, then whatever we
   * return from `getChildContext` function will be
   * our context object and be available globally,
   * so we return the `store`
   */

  static childContextTypes = {
    store: PropTypes.object
  }
  getChildContext() {
    return {
      store: this.props.store
    };
  }

  render() {
    return <ArticleList
      articles={this.state.articles}
      store={this.props.store}
    />;
  }
}

export default App;

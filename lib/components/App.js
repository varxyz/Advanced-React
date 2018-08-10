import React, { Component } from 'react';
import PropTypes from 'prop-types';
import pickBy from 'lodash.pickby';

import ArticleList from './ArticleList';
import SearchBar from './SearchBar';
import Timestamp from './Timestamp';
/**
 * install babel-polyfill and add it to webpack config
 * to use async/await
 */
class App extends Component {


  /**
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
  appState = () => {
    const {articles, searchTerm} = this.props.store.getState();
    return {articles, searchTerm};
  }

  state = this.appState();

  onStoreChange = () => {
    this.setState(this.appState) ;
  }
  componentDidMount() {
    this.subscriptionId = this.props.store.subscribe(this.onStoreChange);
    this.props.store.startClock();
  }
  componentWillUnmount() {
    this.props.store.unsubscribe(this.subscriptionId);
    this.subscriptionId = null;
  }
  // setSearchTerm = (searchTerm) => {
  //   this.setState({searchTerm});
  // }
  render() {
    let {articles, searchTerm} = this.state;
    const searchRegex = new RegExp(searchTerm, 'i');
    if(searchTerm) {
      articles = pickBy(articles, (value) => {
        return value.title.match(searchRegex) || value.body.match(searchRegex);
      });
    }
    return <div>
      <Timestamp />
      <SearchBar />
      <ArticleList
        articles={articles}
      />
    </div>;
  }
}

export default App;

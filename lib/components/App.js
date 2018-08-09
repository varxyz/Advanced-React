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
  onStoreChange = () => {
    this.setState(this.props.store.getState());
  }
  componentDidMount() {
    this.subscriptionId = this.props.store.subscribe(this.onStoreChange);
    this.props.store.startClock();
  }
  componentWillUnmount() {
    this.props.store.unsubscribe(this.subscriptionId);
  }
  // setSearchTerm = (searchTerm) => {
  //   this.setState({searchTerm});
  // }
  render() {
    let {articles, searchTerm} = this.state;
    if(searchTerm) {
      articles = pickBy(articles, (value) => {
        console.log(value);
        return value.title.match(searchTerm) || value.body.match(searchTerm);
      });
    }
    return <div>
      <Timestamp timestamp={this.state.timestamp} />
      <SearchBar
        doSearch={this.props.store.setSearchTerm}
      />
      <ArticleList
        articles={articles}
        store={this.props.store}
      />
    </div>;
  }
}

export default App;

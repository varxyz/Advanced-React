import React, { PureComponent } from 'react';
import debounce from 'lodash.debounce';
import storeProvider from './storeProvider';
/**
 * we should use PureComponent because otherwise this component
 * will rerender every second because the `App` state changes timestamp
 * and it causes all its children to rerender, but this
 * particular component doesnt need to. By using PureComponent,
 * internally `componentWillUpdate` and `shouldComponentUpdate`
 * return false as the prevProps and nextProps are the same
 */
class SearchBar extends PureComponent {
  state = {
    searchTerm: ''
  }

  doSearch = debounce(() => {
    this.props.store.setSearchTerm(this.state.searchTerm);
  }, 300)
  handleSearch = (e) => {
    this.setState({searchTerm: e.target.value}, () => {
      this.doSearch();
    });
  }
  render() {
    return (
      <input
        value={this.state.searchTerm}
        type="search"
        placeholder="search query"
        onChange={this.handleSearch}
      />
    );
  }
}

export default storeProvider()(SearchBar);

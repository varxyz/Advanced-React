import React, { Component } from 'react';
import debounce from 'lodash.debounce';

class SearchBar extends Component {
  state = {
    searchTerm: ''
  }
  doSearch = debounce(() => {
    this.props.doSearch(this.state.searchTerm);
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

export default SearchBar;

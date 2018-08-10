import React from 'react';
import PropTypes from 'prop-types';
import storeProvider from './storeProvider';

const dateDisplay = (dateString) => new Date(dateString).toDateString();

class Article extends React.PureComponent {
  render() {
    const {article, author } = this.props;
    return (
      <div>
        <div>{article.title}</div>
        <div>{dateDisplay(article.date)}</div>
        <div>
          <a href={author.website}>
            {author.firstName} {author.lastName}
          </a>
        </div>
        <div>{article.body}</div>
      </div>
    );
  }
}

Article.propTypes = {
  article: PropTypes.shape({
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired
  })
};

// const author = store.lookupAuthor(article.authorId);

function extraProps(store, originalProps) {
  return {
    author: store.lookupAuthor(originalProps.article.authorId),
  };
}

export default storeProvider(extraProps)(Article);

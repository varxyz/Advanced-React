import React from 'react';
import PropTypes from 'prop-types';
const dateDisplay = (dateString) => new Date(dateString).toDateString();

const Article = ({ article }, context) => {

  /**
   * context will become available as the second argument in
   * a functional component, so now we can read the store from
   * the context instead of the props
   */

  const author = context.store.lookupAuthor(article.authorId);

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
};

Article.propTypes = {
  article: PropTypes.shape({
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired
  })
};

/**
 * In order to allow this component to access the context, we
 * need to define the `contextTypes` first
 */

Article.contextTypes = {
  store: PropTypes.object
};

export default Article;

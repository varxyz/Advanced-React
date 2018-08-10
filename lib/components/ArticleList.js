import React from 'react';
import Article from './Article';

/**
 * articleList doesnt need to rerender everytime,but function components
 * in react render regardless, they are not optimized perf wise. Unless
 * we dont use a HOC library like react-redux that wraps the function
 * component and optimizes it, we have 2 solutions for this --
 * One solution will be to call this function in the parent `App`
 * as {ArticleList()} the usual way instead of component style
 * like <ArticleList/>
 * The second option is to use a PureComponent instead of a function
 */

class ArticleList extends React.PureComponent {
  render() {
    return (
      <div>
        {Object.values(this.props.articles).map((article) => (
          <Article
            key={article.id}
            article={article}
          />
        ))}
      </div>
    );
  }
}

export default ArticleList;

import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Article from '../Article';

configure({ adapter: new Adapter() });

import ArticleList from '../ArticleList';

describe('ArticleList', () => {
  const testProps = {
    articles: {
      a: {id: 2},
      b: {id: 1}
    },
    /**
     * WE no longer pass the store down to the article comp
     * through props, but access it directly through context
     */

    // store: {
    //   lookupAuthor: jest.fn(() => ({}))
    // }
  };

  Article.propTypes = {};

  it('renders correctly', () => {
    /**
     * with shallow we just render the articleList without the
     * childs (Articles)
     */
    const wrapper = shallow(
      <ArticleList
        {...testProps}
      />
    );

    expect(wrapper.find('Article').length).toBe(2);
    expect(wrapper).toMatchSnapshot();

    //   const el = renderer
    //     .create(
    //       <ArticleList
    //         {...testProps}
    //       />
    //     )
    //     .toJSON();
    //   expect(el.children.length).toBe(2);
    //   expect(el).toMatchSnapshot();
    // });
  });
});

/**
 * after adding the context object to our app, the tests fail,
 * as `ArticleList` no longer passes the store down to the
 * Article component, so the `lookupAuthor` method is now undefined.
 * We will make use of shallow rendering, to unit test just the article
 * 
 */

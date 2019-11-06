import React, { Component } from 'react';
import { bool } from 'prop-types';

import ArticlesService from 'Services/Articles';
import Styles from './articles.styles.scss';
import ArticleCards from './ArticleCards';

export default class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentArticleId: 0,
      articlesList: [],
    };
  }

  componentDidMount() {
    ArticlesService.getAllArticles()
      .then((res) => {
        this.setState({
          articlesList: res.data.articles,
        });
      })
      .catch((e) => {
        console.log('ERROR:', e);
      });
  }

  render() {
    const { currentArticleId, articlesList } = this.state;

    const { noHeading } = this.props;

    return (
      <div className={Styles.articles}>
        {noHeading || <h2 className={Styles.heading}>Did I mention that I Write?</h2>}
        <ArticleCards
          currentArticleId={currentArticleId}
          articles={articlesList}
        />
      </div>
    );
  }
}

Articles.propTypes = {
  noHeading: bool,
};

Articles.defaultProps = {
  noHeading: false,
};

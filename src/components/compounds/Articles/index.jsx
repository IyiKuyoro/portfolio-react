import React, { Component } from 'react';
import { bool } from 'prop-types';

import ArticlesService from 'Services/Articles';
import Styles from './articles.styles.scss';
import ArticleCards from './ArticleCards';
import LoadingSpinner from '../../atoms/LoadingSpinner';
import { Notification } from 'HOC/Notifications';

export default class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentArticleId: 0,
      articlesList: [],
      loading: true,
      error: false,
    };
  }

  componentDidMount() {
    ArticlesService.getAllArticles()
      .then((res) => {
        this.setState({
          articlesList: res.data.articles,
          loading: false,
        });
      })
      .catch((e) => {
        console.log('ERROR:', e);
        this.setState({
          loading: false,
          error: true,
        });
      });
  }

  render() {
    const {
      currentArticleId, articlesList, loading, error,
    } = this.state;

    const { noHeading } = this.props;

    return (
      <>
        <div className={!error ? Styles.articles : Styles.noArticles}>
          {noHeading || <h2 className={Styles.heading}>Did I mention that I Write?</h2>}
          {loading && <LoadingSpinner />}
          {!loading && !error && (
          <ArticleCards
            currentArticleId={currentArticleId}
            articles={articlesList}
          />
          )}
        </div>
        {error && <Notification message="Could not load articles..." />}
      </>
    );
  }
}

Articles.propTypes = {
  noHeading: bool,
};

Articles.defaultProps = {
  noHeading: false,
};

import React, { Component } from 'react';
import { bool } from 'prop-types';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import LoadingSpinner from 'Atoms/LoadingSpinner';
import { Notification } from 'HOC/Notifications';
import ArticlesService from 'Services/Articles';

import ArticleCards from './ArticleCards';
import Styles from './articles.styles.scss';

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
    this.articlesSubscription = ArticlesService.getAllArticles()
      .pipe(
        catchError((error) => {
          this.setState({
            loading: false,
            error: true,
          });
          return of(error);
        }),
        map((res) => res.response),
      )
      .subscribe((res) => {
        this.setState({
          articlesList: res.data.articles,
          loading: false,
        });
      });
  }

  componentWillUnmount() {
    this.articlesSubscription.unsubscribe();
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

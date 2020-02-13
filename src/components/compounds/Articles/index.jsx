import React, { Component } from 'react';
import { bool, func } from 'prop-types';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { connect } from 'react-redux';

import { addNotification } from 'Actions/notifications';
import LoadingSpinner from 'Atoms/LoadingSpinner';
import ArticlesService from 'Services/Articles';

import ArticleCards from './ArticleCards';
import Styles from './articles.styles.scss';

class Articles extends Component {
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
    const { addNotificationMessage } = this.props;

    ArticlesService.getAllArticles()
      .pipe(
        catchError((error) => {
          addNotificationMessage('Could not load articles...');
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
      </>
    );
  }
}

Articles.propTypes = {
  noHeading: bool,
  addNotificationMessage: func.isRequired,
};

Articles.defaultProps = {
  noHeading: false,
};

function mapStateToProps() {
  return { };
}

function mapDispatchToProps(dispatch) {
  return {
    addNotificationMessage: (message) => dispatch(addNotification(message)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Articles);

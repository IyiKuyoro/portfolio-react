import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import ArticlesService from 'Services/Articles';
import Loading from '../components/compounds/Loading';

export default function (Article) {
  class PreLoadArticle extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
        article: {},
      };
      this.handleError = this.handleError.bind(this);
    }

    componentDidMount() {
      const { match: { params } } = this.props;

      this.article = ArticlesService.getArticleBySlug(params.slug)
        .pipe(
          catchError(this.handleError),
          map((res) => res.response),
        )
        .subscribe((res) => {
          this.setState({
            article: res.data,
            loading: false,
          });
        });
    }

    componentWillUnmount() {
      this.article.unsubscribe();
    }

    handleError(error) {
      const { history } = this.props;

      const errorMessage = error.status === 404
        ? 'I could not find that exact article. Perhaps you can check one of these.'
        : 'Sorry an error occurred while trying to load that article. Maybe you can try one of these.';

      history.push(error.status === 404 ? '/404' : '/error', {
        error: error.status,
        errorMessage,
      });
      return of(error);
    }

    render() {
      const { loading, article } = this.state;

      return (
        <>
          {!loading && <Article article={article} />}
          {loading && <Loading />}
        </>
      );
    }
  }

  PreLoadArticle.propTypes = {
    match: PropTypes.shape({
      params: PropTypes.objectOf(PropTypes.string.isRequired),
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  return withRouter(PreLoadArticle);
}

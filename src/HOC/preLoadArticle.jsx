import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

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
    }

    componentDidMount() {
      const { match: { params }, history } = this.props;

      ArticlesService.getArticleBySlug(params.slug)
        .then((res) => {
          if (!res.success) {
            history.push('/404', {
              error: 404,
              errorMessage: 'I could not find that exact article. Perhaps you can check one of these.'
            });
          } else {
            this.setState({
              article: res.data,
              loading: false,
            });
          }
        })
        .catch(() => {
          history.push('/error', {
            error: 500,
            errorMessage: 'Sorry an error occurred while trying to load that article. Maybe you can try one of these.'
          });
        });
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

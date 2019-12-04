import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  shape, func, bool, number, string, arrayOf,
} from 'prop-types';

export default function (ComposedComponent) {
  class ArticleWriteEditGuard extends Component {
    constructor(props) {
      super(props);

      const { history, authUser: { isAuthenticated } } = props;
      if (!isAuthenticated) {
        history.push('/login', {
          prevPath: history.location.pathname,
          errorMessage: 'You have to be signed in to write.',
        });
      }
    }

    render() {
      const { authUser: { userData }, article } = this.props;

      return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <ComposedComponent userData={userData} article={article} />
      );
    }
  }

  ArticleWriteEditGuard.defaultProps = {
    article: {
      title: '',
      category: '',
      body: '',
      authors: [],
      authorsIds: [],
      imageUrl: '',
      imagePublicId: '',
      updatedAt: '',
      slug: '',
    },
  };

  ArticleWriteEditGuard.propTypes = {
    history: shape({
      push: func.isRequired,
    }).isRequired,
    authUser: shape({
      isAuthenticated: bool.isRequired,
      userData: shape({
        id: number,
      }),
    }).isRequired,
    article: shape({
      title: string.isRequired,
      category: string.isRequired,
      body: string.isRequired,
      authors: arrayOf(string.isRequired).isRequired,
      authorsIds: arrayOf(number.isRequired).isRequired,
      imageUrl: string,
      imagePublicId: string,
      updatedAt: string.isRequired,
      slug: string.isRequired,
    }),
  };

  function mapStateToProps(state) {
    return {
      authUser: state.authUser,
    };
  }

  return connect(mapStateToProps)(withRouter(ArticleWriteEditGuard));
}

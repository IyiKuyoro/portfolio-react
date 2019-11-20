import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  shape, func, bool, number,
} from 'prop-types';

export default function (ComposedComponent) {
  class IsLoggedIn extends Component {
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
      const { authUser: { userData } } = this.props;

      return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <ComposedComponent userData={userData} />
      );
    }
  }

  IsLoggedIn.propTypes = {
    history: shape({
      push: func.isRequired,
    }).isRequired,
    authUser: shape({
      isAuthenticated: bool.isRequired,
      userData: shape({
        id: number.isRequired,
      }).isRequired,
    }).isRequired,
  };

  function mapStateToProps(state) {
    return {
      authUser: state.authUser,
    };
  }

  return connect(mapStateToProps)(withRouter(IsLoggedIn));
}

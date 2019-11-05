import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default function (ComposedComponent) {
  class RequireAuth extends Component {
    componentDidMount() {
      const { isAuthenticated, history } = this.props;

      if (isAuthenticated) {
        history.push('/');
      }
    }

    componentDidUpdate() {
      const { isAuthenticated, history } = this.props;

      if (isAuthenticated) {
        history.push('/');
      }
    }

    render() {
      return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <ComposedComponent {...this.props} />
      );
    }
  }

  RequireAuth.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  const mapStateToProps = (state) => ({
    isAuthenticated: state.authUser.isAuthenticated,
  });

  return connect(mapStateToProps)(withRouter(RequireAuth));
}

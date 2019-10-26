import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Home from 'Pages/Home';
import Login from 'Pages/Login';
import noAuthCheck from 'HOC/noAuthCheck';
import { resetUser } from './store/actions/authUser';

class App extends Component {
  componentWillMount() {
    const { createSetUserAction } = this.props;

    createSetUserAction();
  }

  render() {
    return (
      <div>
        <Router>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={noAuthCheck(Login)} />
        </Router>
      </div>
    );
  }
}

App.propTypes = {
  createSetUserAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  createSetUserAction: () => dispatch(resetUser()),
});

const mapStateToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import Article from 'Pages/Article';
import Home from 'Pages/Home';
import Login from 'Pages/Login';
import notFound from 'Pages/404';
import noAuthCheck from 'HOC/noAuthCheck';
import preLoadArticle from 'HOC/preLoadArticle';
import UserMenu from 'Compounds/UserMenu';
import { resetUser } from './store/actions/authUser';

class App extends Component {
  componentDidMount() {
    const { createSetUserAction } = this.props;

    createSetUserAction();
  }

  render() {
    return (
      <Router>
        <>
          <UserMenu />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={noAuthCheck(Login)} />
            <Route exact path="/read/:slug" component={preLoadArticle(Article)} />
            <Route component={notFound} />
          </Switch>
        </>
      </Router>
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

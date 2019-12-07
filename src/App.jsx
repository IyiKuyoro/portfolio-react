import React, { Component, Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { func } from 'prop-types';

import Home from 'Pages/Home';
import articleWriteEditGuard from 'HOC/ArticleWriteEditGuard';
import noAuthCheck from 'HOC/noAuthCheck';
import preLoadArticle from 'HOC/preLoadArticle';
import Loading from 'Compounds/Loading';

import { resetUser } from './store/actions/authUser';

const UserMenu = lazy(() => import('Compounds/UserMenu'));
const NotFound = lazy(() => import('Pages/404'));
const Article = lazy(() => import('Pages/Article'));
const EditArticle = lazy(() => import('Pages/EditArticle'));
const Login = lazy(() => import('Pages/Login'));

class App extends Component {
  constructor(props) {
    super(props);
    const { createSetUserAction } = this.props;
    createSetUserAction();
  }

  render() {
    return (
      <Router>
        <Suspense fallback={<Loading />}>
          <UserMenu />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={noAuthCheck(Login)} />
            <Route exact path="/read/:slug" component={preLoadArticle(Article)} />
            <Route exact path="/write" component={articleWriteEditGuard(EditArticle)} />
            <Route exact path="/edit/:slug" component={preLoadArticle(articleWriteEditGuard(EditArticle))} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    );
  }
}

App.propTypes = {
  createSetUserAction: func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  createSetUserAction: () => dispatch(resetUser()),
});

const mapStateToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);

import React, { Component, Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { func, bool } from 'prop-types';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faWheelchair, faTimesCircle, faImage, faTrashAlt,
  faGraduationCap, faCertificate, faMedal, faPlus,
  faMinus, faEnvelope,
} from '@fortawesome/free-solid-svg-icons';

import Home from 'Pages/Home';
import articleWriteEditGuard from 'HOC/ArticleWriteEditGuard';
import noAuthCheck from 'HOC/noAuthCheck';
import preLoadArticle from 'HOC/preLoadArticle';
import { Notification } from 'HOC/Notifications';
import Loading from 'Compounds/Loading';
import Handicap from 'Compounds/Handicap';
import UserMenu from 'Compounds/UserMenu';

import { resetUser } from './store/actions/authUser';

// Loading font-awesome icons
library.add(
  faWheelchair, faTimesCircle, faImage, faTrashAlt,
  faGraduationCap, faCertificate, faMedal, faPlus,
  faMinus, faEnvelope,
);

const NotFound = lazy(() => import('Pages/404'));
const Article = lazy(() => import('Pages/Article'));
const EditArticle = lazy(() => import('Pages/EditArticle'));
const Login = lazy(() => import('Pages/Login'));
const SudokuSolver = lazy(() => import('Pages/SudokuSolver'));

class App extends Component {
  constructor(props) {
    super(props);
    const { createSetUserAction } = this.props;
    createSetUserAction();
  }

  render() {
    const { userMenuOpen, error } = this.props;

    return (
      <Router>
        <Suspense fallback={<Loading />}>
          <Handicap />
          { userMenuOpen && <UserMenu />}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={noAuthCheck(Login)} />
            <Route exact path="/read/:slug" component={preLoadArticle(Article)} />
            <Route exact path="/write" component={articleWriteEditGuard(EditArticle)} />
            <Route exact path="/edit/:slug" component={preLoadArticle(articleWriteEditGuard(EditArticle))} />
            <Route exact path="/sudoku-solver" component={SudokuSolver} />
            <Route component={NotFound} />
          </Switch>
          {error && <Notification />}
        </Suspense>
      </Router>
    );
  }
}

App.propTypes = {
  createSetUserAction: func.isRequired,
  error: bool.isRequired,
  userMenuOpen: bool.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  createSetUserAction: () => dispatch(resetUser()),
});

const mapStateToProps = (state) => ({
  isAuthenticated: state.authUser.isAuthenticated,
  error: state.notifications.error,
  userMenuOpen: state.controls.userMenuOpen,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { func } from 'prop-types';

import Article from 'Pages/Article';
import Home from 'Pages/Home';
import Login from 'Pages/Login';
import EditArticle from 'Pages/EditArticle';
import notFound from 'Pages/404';
import articleWriteEditGuard from 'HOC/ArticleWriteEditGuard';
import noAuthCheck from 'HOC/noAuthCheck';
import preLoadArticle from 'HOC/preLoadArticle';
import UserMenu from 'Compounds/UserMenu';
import { resetUser } from './store/actions/authUser';

class App extends Component {
  constructor(props) {
    super(props);
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
            <Route exact path="/write" component={articleWriteEditGuard(EditArticle)} />
            <Route exact path="/edit/:slug" component={preLoadArticle(articleWriteEditGuard(EditArticle))} />
            <Route component={notFound} />
          </Switch>
        </>
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

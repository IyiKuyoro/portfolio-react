import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { authenticateUser } from 'Actions/authUser';
import { addNotification } from 'Actions/notifications';
import Input from 'Components/atoms/InputFields';
import Header from 'Components/compounds/Header';

import Styles from './login.styles.scss';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      userNameError: false,
      userNameErrorMessage: '',
      passwordError: false,
      passwordErrorMessage: '',
    };

    const {
      history: {
        location: {
          state,
        },
      },
      addNotificationMessage,
    } = props;

    if (state && state.errorMessage) {
      addNotificationMessage(state.errorMessage);
    }

    this.editUserName = this.editUserName.bind(this);
    this.editPassword = this.editPassword.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.validateInput = this.validateInput.bind(this);
  }

  handleLogin(event) {
    event.preventDefault();
    const { userName, password } = this.state;
    const { createLoginAction, history } = this.props;

    const userInfo = {
      userName,
      password,
    };

    createLoginAction(userInfo, history);
  }

  editUserName(userName) {
    this.setState({
      userName,
    });
  }

  editPassword(password) {
    this.setState({
      password,
    });
  }

  validateInput(name, value) {
    switch (name) {
      case 'userName':
        if (/[+=)(!'"/$#*&%]+/.test(value.trim())) {
          this.setState({
            userNameError: true,
            userNameErrorMessage: 'Username is invalid',
          });
        } else if (value.trim() === '') {
          this.setState({
            userNameError: true,
            userNameErrorMessage: 'Please provide a username',
          });
        } else {
          this.setState({
            userNameError: false,
            userNameErrorMessage: '',
          });
        }
        break;
      case 'password':
        if (value === '') {
          this.setState({
            passwordError: true,
            passwordErrorMessage: 'Please provide a password',
          });
        } else {
          this.setState({
            passwordError: false,
            passwordErrorMessage: '',
          });
        }
        break;
      default:
        break;
    }
  }

  render() {
    const {
      loading,
      errorMessage,
      error,
    } = this.props;

    const {
      userName,
      password,
      userNameError,
      userNameErrorMessage,
      passwordError,
      passwordErrorMessage,
    } = this.state;

    return (
      <div>
        <Header />
        <div className={Styles.formContainer}>
          <form className={Styles.loginForm} onSubmit={(e) => this.handleLogin(e)}>
            <h1 className={Styles.header}>Login Form</h1>
            <p className={`${error ? Styles.errorMessage : Styles.errorMessageInvisible}`}>{errorMessage}</p>
            <Input
              name="userName"
              type="text"
              label="Username:"
              addedWrapperStyle={Styles.input}
              value={userName}
              editValue={this.editUserName}
              validateInput={this.validateInput}
              error={userNameError}
              errorMessage={userNameErrorMessage}
            />
            <Input
              name="password"
              type="password"
              label="Password:"
              addedWrapperStyle={Styles.input}
              value={password}
              editValue={this.editPassword}
              validateInput={this.validateInput}
              error={passwordError}
              errorMessage={passwordErrorMessage}
            />
            <input type="submit" value="submit" className={Styles.btn} />
            <h1>{loading}</h1>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  createLoginAction: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      state: PropTypes.objectOf(PropTypes.string),
    }).isRequired,
  }).isRequired,
  addNotificationMessage: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  createLoginAction: (loginData, history) => dispatch(authenticateUser(loginData, history)),
  addNotificationMessage: (message) => dispatch(addNotification(message)),
});

const mapStateToProps = (state) => ({
  loading: state.authUser.loading,
  errorMessage: state.authUser.errorMessage,
  error: state.authUser.error,
  isAuthenticated: state.authUser.isAuthenticated,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));

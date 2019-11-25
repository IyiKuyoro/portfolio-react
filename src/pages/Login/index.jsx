import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { authenticateUser } from 'Actions/authUser';
import Input from 'Components/atoms/InputFields';
import Button from 'Components/atoms/Button';
import Header from 'Components/compounds/Header';
import { Notification, NotificationSeverity } from 'HOC/Notifications';

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
    this.editUserName = this.editUserName.bind(this);
    this.editPassword = this.editPassword.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.validateInput = this.validateInput.bind(this);
  }

  handleLogin() {
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
            passwordErrorMessage: 'Please please provide a password',
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
      history: {
        location: {
          state,
        },
      },
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
        {
          state
          && state.errorMessage
          && <Notification severity={NotificationSeverity.error} message={state.errorMessage} />
        }
        <Header />
        <div className={Styles.formContainer}>
          <form className={Styles.loginForm}>
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
            <Button text="submit" style={Styles.btn} handleClick={this.handleLogin} />
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
};

const mapDispatchToProps = (dispatch) => ({
  createLoginAction: (loginData, history) => dispatch(authenticateUser(loginData, history)),
});

const mapStateToProps = (state) => ({
  loading: state.authUser.loading,
  errorMessage: state.authUser.errorMessage,
  error: state.authUser.error,
  isAuthenticated: state.authUser.isAuthenticated,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));

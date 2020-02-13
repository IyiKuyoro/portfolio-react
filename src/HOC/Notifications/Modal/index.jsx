import React, { Component } from 'react';
import { string, bool, func } from 'prop-types';
import { connect } from 'react-redux';

import { removeNotification } from 'Actions/notifications';

import Styles from './modalNotifications.styles.scss';

class ModalNotification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };

    if (props.error) {
      setInterval(() => {
        props.removeErrorMessage();
      }, 9000);
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      open: false,
    });
  }

  render() {
    const { errorMessage, severity } = this.props;
    const { open } = this.state;
    let style = Styles.modal;

    switch (severity) {
      case 'info':
        style += ` ${Styles.info}`;
        break;
      case 'caution':
        style += ` ${Styles.caution}`;
        break;
      default:
        style += ` ${Styles.error}`;
        break;
    }

    return (
      <div
        tabIndex="0"
        role="button"
        onKeyDown={(e) => {
          if (e.keyCode === 27) this.handleClick();
        }}
        onClick={this.handleClick}
        className={open ? Styles.overlay : Styles.noOverlay}
      >
        <div className={style}>
          <p className={Styles.message}>{errorMessage}</p>
          <button
            onClick={this.handleClick}
            type="button"
            className={Styles.closeButton}
          >
            OK
          </button>
        </div>
      </div>
    );
  }
}

ModalNotification.propTypes = {
  error: bool.isRequired,
  errorMessage: string.isRequired,
  severity: string.isRequired,
  removeErrorMessage: func.isRequired,
};

function mapStateToProps(state) {
  return {
    error: state.notifications.error,
    errorMessage: state.notifications.errorMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removeErrorMessage: () => dispatch(removeNotification()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalNotification);

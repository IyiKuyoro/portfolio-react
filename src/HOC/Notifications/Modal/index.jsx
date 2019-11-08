import React, { Component } from 'react';
import { string } from 'prop-types';

import Styles from './modalNotifications.styles.scss';

export default class ModalNotification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      open: false,
    });
  }

  render() {
    const { message, severity } = this.props;
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
          <p className={Styles.message}>{message}</p>
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
  message: string.isRequired,
  severity: string.isRequired,
};

import React from 'react';
import { string, bool, func } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';

import { removeNotification } from 'Actions/notifications';

import Styles from './anchorNotifications.styles.scss';

function AnchorNotification(props) {
  const {
    error, errorMessage, severity, removeErrorMessage,
  } = props;
  let style = Styles.anchor;

  if (error) {
    setInterval(() => {
      removeErrorMessage();
    }, 9000);
  }

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
    <div className={style}>
      <button className={Styles.closeButton} type="button">
        <FontAwesomeIcon icon="times-circle" />
      </button>
      <p className={Styles.message}>{errorMessage}</p>
    </div>
  );
}

AnchorNotification.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(AnchorNotification);

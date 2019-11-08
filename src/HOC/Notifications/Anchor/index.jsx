import React from 'react';
import { string } from 'prop-types';

import Styles from './anchorNotifications.styles.scss';

export default function AnchorNotification(props) {
  const { message, severity } = props;
  let style = Styles.anchor;

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
        <i className="far fa-times-circle" />
      </button>
      <p className={Styles.message}>{message}</p>
    </div>
  );
}

AnchorNotification.propTypes = {
  message: string.isRequired,
  severity: string.isRequired,
};

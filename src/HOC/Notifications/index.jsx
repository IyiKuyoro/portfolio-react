import React from 'react';
import { string } from 'prop-types';

import ModalNotification from './Modal';
import AnchorNotification from './Anchor';

export const NotificationType = {
  modal: 'modal',
  anchor: 'anchor',
};

export const NotificationSeverity = {
  info: 'info',
  error: 'error',
  caution: 'caution',
};

export function Notification(props) {
  const {
    message,
    type,
    severity,
  } = props;

  let notification = {};
  if (type === NotificationType.anchor) {
    notification = <ModalNotification type={type} severity={severity} message={message} />;
  } else {
    notification = <AnchorNotification type={type} severity={severity} message={message} />;
  }

  return (notification);
}

Notification.propTypes = {
  type: string,
  message: string.isRequired,
  severity: string,
};

Notification.defaultProps = {
  type: NotificationType.anchor,
  severity: NotificationSeverity.info,
};

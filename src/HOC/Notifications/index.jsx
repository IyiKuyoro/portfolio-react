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
    type,
    severity,
  } = props;

  let notification = {};
  if (type === NotificationType.anchor) {
    notification = <AnchorNotification severity={severity} />;
  } else {
    notification = <ModalNotification severity={severity} />;
  }

  return (notification);
}

Notification.propTypes = {
  type: string,
  severity: string,
};

Notification.defaultProps = {
  type: NotificationType.anchor,
  severity: NotificationSeverity.info,
};

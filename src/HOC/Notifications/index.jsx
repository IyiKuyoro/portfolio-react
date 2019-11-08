import React from 'react';
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

export function Notification(
  message,
  type = NotificationType.anchor,
  severity = NotificationSeverity.info,
) {
  let notification = {};
  if (type === NotificationType.anchor) {
    notification = <ModalNotification type={type} severity={severity} message={message} />;
  } else {
    notification = <AnchorNotification type={type} severity={severity} message={message} />;
  }

  return notification;
}

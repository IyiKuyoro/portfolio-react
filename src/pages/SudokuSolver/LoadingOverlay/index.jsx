import React from 'react';

import Styles from './LoadingOverlay.styles.scss';

export default function LoadingOverlay() {
  return (
    <div className={Styles.loader}>
      <div className={Styles.spinner} />
    </div>
  );
}

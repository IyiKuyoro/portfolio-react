import React from 'react';

import Styles from './loading.styles.scss';

export default function Loading() {
  const style = {
    width: '100%',
    height: '100%',
  };

  return (
    <div>
      <div className={Styles.ldsCss}>
        <div style={style} className={Styles.ldsBall}>
          <div />
        </div>
      </div>
    </div>
  );
}

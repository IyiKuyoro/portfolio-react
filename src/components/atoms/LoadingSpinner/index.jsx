import React from 'react';

import Styles from './loadingSpinner.styles.scss';

export default function LoadingSpinner() {
  const styleA = {
    width: '200px',
    height: '200px',
    margin: '0 auto',
  };
  const styleB = {
    width: '100%',
    height: '100%',
  };

  return (
    <div className="lds-css ng-scope" style={styleA}>
      <div style={styleB} className={Styles.ldsEclipse}>
        <div />
      </div>
    </div>
  );
}

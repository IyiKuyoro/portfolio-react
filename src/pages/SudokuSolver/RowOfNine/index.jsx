import React from 'react';

import Styles from './RowOfNine.styles.scss';

function SquareOfNine() {
  return (
    <div className={Styles.nineRow}>
      <button className={Styles.num} type="button">a</button>
      <button className={Styles.num} type="button">a</button>
      <button className={Styles.num} type="button">a</button>
      <button className={Styles.num} type="button">a</button>
      <button className={Styles.num} type="button">a</button>
      <button className={Styles.num} type="button">a</button>
      <button className={Styles.num} type="button">a</button>
      <button className={Styles.num} type="button">a</button>
      <button className={Styles.num} type="button">a</button>
    </div>
  );
}

export default SquareOfNine;

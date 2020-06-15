import React from 'react';

import Styles from './RowOfNine.styles.scss';

function SquareOfNine(props) {
  const { sudokuBoard, dispatchChange, row } = props;

  return (
    <div className={Styles.nineRow}>
      <button className={Styles.num} type="button">{sudokuBoard[row][0] || ''}</button>
      <button className={Styles.num} type="button">{sudokuBoard[row][1] || ''}</button>
      <button className={Styles.num} type="button">{sudokuBoard[row][2] || ''}</button>
      <button className={Styles.num} type="button">{sudokuBoard[row][3] || ''}</button>
      <button className={Styles.num} type="button">{sudokuBoard[row][4] || ''}</button>
      <button className={Styles.num} type="button">{sudokuBoard[row][5] || ''}</button>
      <button className={Styles.num} type="button">{sudokuBoard[row][6] || ''}</button>
      <button className={Styles.num} type="button">{sudokuBoard[row][7] || ''}</button>
      <button className={Styles.num} type="button">{sudokuBoard[row][8] || ''}</button>
    </div>
  );
}

export default SquareOfNine;

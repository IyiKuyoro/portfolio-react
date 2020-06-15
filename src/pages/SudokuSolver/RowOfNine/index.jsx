import React from 'react';
import PropTypes from 'prop-types';

import Styles from './RowOfNine.styles.scss';

function handleClick(event, dispatch, row, col, isRightClick = false) {
  event.preventDefault();

  if (isRightClick) {
    dispatch({ type: 'decrement', payload: { row, col } });
  } else {
    dispatch({ type: 'increment', payload: { row, col } });
  }
}

function RowOfNine(props) {
  const { sudokuBoard, dispatchChange, row } = props;

  return (
    <div className={Styles.nineRow}>
      <button
        onContextMenu={(event) => handleClick(event, dispatchChange, row, 0, true)}
        onClick={(event) => handleClick(event, dispatchChange, row, 0)}
        className={Styles.num}
        type="button"
      >
        {sudokuBoard[row][0] || ''}
      </button>
      <button
        onContextMenu={(event) => handleClick(event, dispatchChange, row, 1, true)}
        onClick={(event) => handleClick(event, dispatchChange, row, 1)}
        className={Styles.num}
        type="button"
      >
        {sudokuBoard[row][1] || ''}
      </button>
      <button
        onContextMenu={(event) => handleClick(event, dispatchChange, row, 2, true)}
        onClick={(event) => handleClick(event, dispatchChange, row, 2)}
        className={Styles.num}
        type="button"
      >
        {sudokuBoard[row][2] || ''}
      </button>
      <button
        onContextMenu={(event) => handleClick(event, dispatchChange, row, 3, true)}
        onClick={(event) => handleClick(event, dispatchChange, row, 3)}
        className={Styles.num}
        type="button"
      >
        {sudokuBoard[row][3] || ''}
      </button>
      <button
        onContextMenu={(event) => handleClick(event, dispatchChange, row, 4, true)}
        onClick={(event) => handleClick(event, dispatchChange, row, 4)}
        className={Styles.num}
        type="button"
      >
        {sudokuBoard[row][4] || ''}
      </button>
      <button
        onContextMenu={(event) => handleClick(event, dispatchChange, row, 5, true)}
        onClick={(event) => handleClick(event, dispatchChange, row, 5)}
        className={Styles.num}
        type="button"
      >
        {sudokuBoard[row][5] || ''}
      </button>
      <button
        onContextMenu={(event) => handleClick(event, dispatchChange, row, 6, true)}
        onClick={(event) => handleClick(event, dispatchChange, row, 6)}
        className={Styles.num}
        type="button"
      >
        {sudokuBoard[row][6] || ''}
      </button>
      <button
        onContextMenu={(event) => handleClick(event, dispatchChange, row, 7, true)}
        onClick={(event) => handleClick(event, dispatchChange, row, 7)}
        className={Styles.num}
        type="button"
      >
        {sudokuBoard[row][7] || ''}
      </button>
      <button
        onContextMenu={(event) => handleClick(event, dispatchChange, row, 8, true)}
        onClick={(event) => handleClick(event, dispatchChange, row, 8)}
        className={Styles.num}
        type="button"
      >
        {sudokuBoard[row][8] || ''}
      </button>
    </div>
  );
}

RowOfNine.propTypes = {
  sudokuBoard: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
  ).isRequired,
  dispatchChange: PropTypes.func.isRequired,
  row: PropTypes.number.isRequired,
};

export default RowOfNine;

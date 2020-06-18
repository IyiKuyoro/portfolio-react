import React from 'react';
import PropTypes from 'prop-types';

import Cell from './Cell';
import Styles from './RowOfNine.styles.scss';

function RowOfNine(props) {
  const {
    sudokuBoard, changeDispatch,
    row, currentFocus, setCurrentFocus,
  } = props;
  const cols = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className={Styles.nineRow}>
      {cols.map((col) => (
        <Cell
          key={col}
          classString={Styles.num}
          row={row}
          col={col}
          setCurrentFocus={setCurrentFocus}
          currentFocus={currentFocus}
          changeDispatch={changeDispatch}
          cellValue={sudokuBoard[row][col] || 0}
        />
      ))}
    </div>
  );
}

RowOfNine.propTypes = {
  sudokuBoard: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  ).isRequired,
  changeDispatch: PropTypes.func.isRequired,
  row: PropTypes.number.isRequired,
  currentFocus: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  setCurrentFocus: PropTypes.func.isRequired,
};

export default RowOfNine;

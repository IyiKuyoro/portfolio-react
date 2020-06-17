import React from 'react';
import PropTypes from 'prop-types';

import Cell from './Cell';
import Styles from './RowOfNine.styles.scss';

function RowOfNine(props) {
  const { sudokuBoard, changeDispatch, row } = props;
  const cols = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className={Styles.nineRow}>
      {cols.map((col) => (
        <Cell
          key={col}
          classString={Styles.num}
          row={row}
          col={col}
          changeDispatch={changeDispatch}
          cellValue={sudokuBoard[row][col] || 0}
        />
      ))}
    </div>
  );
}

RowOfNine.propTypes = {
  sudokuBoard: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
  ).isRequired,
  changeDispatch: PropTypes.func.isRequired,
  row: PropTypes.string.isRequired,
};

export default RowOfNine;

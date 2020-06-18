import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { INCREASE_CELL, DECREASE_CELL, CHANGE_CELL } from '../../../../store/constants';

function handleClick(event, dispatch, row, col, isRightClick, setCurrentFocus) {
  event.preventDefault();
  event.stopPropagation();

  setCurrentFocus([row, col, false]);
  if (isRightClick) {
    dispatch({ type: DECREASE_CELL, payload: { row, col } });
  } else {
    dispatch({ type: INCREASE_CELL, payload: { row, col } });
  }
}

function handleKeyPress(event, dispatch, row, col) {
  if (event.charCode >= 48 && event.charCode <= 57) {
    dispatch({ type: CHANGE_CELL, payload: { row, col, value: event.charCode - 48 } });
  }
}

function Cell(props) {
  const {
    cellValue, changeDispatch,
    row, col, classString,
    currentFocus, setCurrentFocus,
  } = props;

  const cellRef = useRef(null);
  useEffect(() => {
    if (!currentFocus[2] && (currentFocus[0] === row && currentFocus[1] === col)) {
      cellRef.current.focus();
    }
  }, [currentFocus]);

  return (
    <button
      ref={cellRef}
      onKeyPress={(event) => handleKeyPress(event, changeDispatch, row, col)}
      onContextMenu={(event) => handleClick(event, changeDispatch, row, col, true, setCurrentFocus)}
      onClick={(event) => handleClick(event, changeDispatch, row, col, false, setCurrentFocus)}
      className={classString}
      type="button"
      role="gridcell"
      aria-label={`Row ${row} column ${col}. Value is ${cellValue}`}
    >
      { cellValue || '' }
    </button>
  );
}

Cell.propTypes = {
  cellValue: PropTypes.number.isRequired,
  changeDispatch: PropTypes.func.isRequired,
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  classString: PropTypes.string.isRequired,
  currentFocus: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  setCurrentFocus: PropTypes.func.isRequired,
};

export default Cell;

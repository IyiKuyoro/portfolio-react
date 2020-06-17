import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { INCREASE_CELL, DECREASE_CELL, CHANGE_CELL } from '../../../../store/constants';

function handleClick(event, dispatch, row, col, isRightClick = false) {
  event.preventDefault();

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
    row, col, classString, isFocus,
  } = props;

  const cellRef = useRef(null);
  useEffect(() => {
    if ((row === 0 && col === 0) || isFocus) {
      cellRef.current.focus();
    }
  }, []);

  return (
    <button
      ref={cellRef}
      onKeyPress={(event) => handleKeyPress(event, changeDispatch, row, col)}
      onContextMenu={(event) => handleClick(event, changeDispatch, row, col, true)}
      onClick={(event) => handleClick(event, changeDispatch, row, col)}
      className={classString}
      type="button"
      aria-label={`Row ${row} column ${col} ${cellValue}`}
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
  isFocus: PropTypes.bool,
};

Cell.defaultProps = {
  isFocus: false,
};

export default Cell;

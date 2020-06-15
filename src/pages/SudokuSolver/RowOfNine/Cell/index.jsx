import React from 'react';
import PropTypes from 'prop-types';

function handleClick(event, dispatch, row, col, isRightClick = false) {
  event.preventDefault();

  if (isRightClick) {
    dispatch({ type: 'decrement', payload: { row, col } });
  } else {
    dispatch({ type: 'increment', payload: { row, col } });
  }
}

function Cell(props) {
  const {
    cellValue, changeDispatch, row, col, classString,
  } = props;

  return (
    <button
      onContextMenu={(event) => handleClick(event, changeDispatch, row, col, true)}
      onClick={(event) => handleClick(event, changeDispatch, row, col)}
      className={classString}
      type="button"
    >
      { cellValue }
    </button>
  );
}

Cell.propTypes = {
  cellValue: PropTypes.number.isRequired,
  changeDispatch: PropTypes.func.isRequired,
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  classString: PropTypes.string.isRequired,
};

export default Cell;

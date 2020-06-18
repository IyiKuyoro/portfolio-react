import React, { useReducer, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { addNotification } from 'Actions/notifications';
import Header from 'Compounds/Header';

import RowOfNine from './RowOfNine';
import LoadingOverlay from './LoadingOverlay';
import { reducer, initialState, convertToString } from './helper';
import SudokuSolverService from '../../services/SudokuSolver';
import { REPLACE_BOARD } from '../../store/constants';
import Styles from './SudokuSolver.styles.scss';

function handleError(error, addNotificationMessage) {
  addNotificationMessage(error.response.message);

  return of(error);
}

function handleKeyDown(event, currentFocus, setCurrentFocus, btnRef) {
  let r = currentFocus[0];
  let c = currentFocus[1];
  let ignore = false;

  switch (event.keyCode) {
    case (37):
      c = c - 1 < 0 ? 8 : c - 1;
      break;
    case (38):
      r = r - 1 < 0 ? 8 : r - 1;
      break;
    case (39):
      c = c + 1 > 8 ? 0 : c + 1;
      break;
    case (40):
      r = r + 1 > 8 ? 0 : r + 1;
      break;
    case (9):
      event.preventDefault();
      ignore = true;
      btnRef.current.focus();
      break;
    default:
      // Do Nothing
  }

  setCurrentFocus([r, c, ignore]);
}

function SudokuSolver(props) {
  const { addNotificationMessage } = props;
  const [sudokuBoard, dispatch] = useReducer(reducer, initialState);
  const [currentFocus, setCurrentFocus] = useState([0, 0, false]);
  const [loading, setLoading] = useState(false);
  const btnRef = useRef(null);
  const noOfRows = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  function handleProblemSubmit(board) {
    setLoading(true);
    SudokuSolverService
      .solveBoard(convertToString(board))
      .pipe(
        map((res) => res.response),
        catchError((error) => handleError(error, addNotificationMessage)),
      )
      .subscribe((res) => {
        setLoading(false);
        if (res.success) {
          dispatch({
            type: REPLACE_BOARD,
            payload: res.data,
          });
        }
      });
  }

  return (
    <div>
      <Header />
      <div className={Styles.background}>
        <div
          role="grid"
          tabIndex="0"
          className={Styles.board}
          onKeyDown={(event) => handleKeyDown(event, currentFocus, setCurrentFocus, btnRef)}
        >
          {noOfRows.map((item) => (
            <RowOfNine
              sudokuBoard={sudokuBoard}
              changeDispatch={dispatch}
              row={item}
              currentFocus={currentFocus}
              setCurrentFocus={setCurrentFocus}
            />
          ))}
          {loading && <LoadingOverlay />}
        </div>
        <button
          disabled={loading}
          ref={btnRef}
          className={Styles.solve}
          onClick={() => handleProblemSubmit(
            sudokuBoard,
          )}
          type="button"
        >
          Solve
        </button>
      </div>
    </div>
  );
}

SudokuSolver.propTypes = {
  addNotificationMessage: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    addNotificationMessage: (message) => dispatch(addNotification(message)),
  };
}

export default connect(() => ({}), mapDispatchToProps)(SudokuSolver);

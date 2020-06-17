import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { addNotification } from 'Actions/notifications';
import Header from 'Compounds/Header';

import RowOfNine from './RowOfNine';
import { reducer, initialState, convertToString } from './helper';
import SudokuSolverService from '../../services/SudokuSolver';
import { REPLACE_BOARD } from '../../store/constants';
import Styles from './SudokuSolver.styles.scss';

function handleError(error, addNotificationMessage) {
  addNotificationMessage(error.response.message);

  return of(error);
}

function handleProblemSubmit(board, addNotificationMessage, dispatch) {
  SudokuSolverService
    .solveBoard(convertToString(board))
    .pipe(
      map((res) => res.response),
      catchError((error) => handleError(error, addNotificationMessage)),
    )
    .subscribe((res) => {
      if (res.success) {
        dispatch({
          type: REPLACE_BOARD,
          payload: res.data,
        });
      }
    });
}

function SudokuSolver(props) {
  const { addNotificationMessage } = props;
  const [sudokuBoard, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <Header />
      <div className={Styles.background}>
        <div className={Styles.board}>
          <RowOfNine sudokuBoard={sudokuBoard} changeDispatch={dispatch} row={0} />
          <RowOfNine sudokuBoard={sudokuBoard} changeDispatch={dispatch} row={1} />
          <RowOfNine sudokuBoard={sudokuBoard} changeDispatch={dispatch} row={2} />
          <RowOfNine sudokuBoard={sudokuBoard} changeDispatch={dispatch} row={3} />
          <RowOfNine sudokuBoard={sudokuBoard} changeDispatch={dispatch} row={4} />
          <RowOfNine sudokuBoard={sudokuBoard} changeDispatch={dispatch} row={5} />
          <RowOfNine sudokuBoard={sudokuBoard} changeDispatch={dispatch} row={6} />
          <RowOfNine sudokuBoard={sudokuBoard} changeDispatch={dispatch} row={7} />
          <RowOfNine sudokuBoard={sudokuBoard} changeDispatch={dispatch} row={8} />
        </div>
        <button
          className={Styles.solve}
          onClick={() => handleProblemSubmit(sudokuBoard, addNotificationMessage, dispatch)}
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

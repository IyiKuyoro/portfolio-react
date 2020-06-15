import React, { useReducer } from 'react';

import Header from 'Compounds/Header';
import RowOfNine from './RowOfNine';
import { reducer, initialState } from './helper';
import Styles from './SudokuSolver.styles.scss';

function SudokuSolver() {
  const [sudokuBoard, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <Header />
      <div className={Styles.background}>
        <div className={Styles.board}>
          <RowOfNine sudokuBoard={sudokuBoard} changeDispatch={dispatch} row="0" />
          <RowOfNine sudokuBoard={sudokuBoard} changeDispatch={dispatch} row="1" />
          <RowOfNine sudokuBoard={sudokuBoard} changeDispatch={dispatch} row="2" />
          <RowOfNine sudokuBoard={sudokuBoard} changeDispatch={dispatch} row="3" />
          <RowOfNine sudokuBoard={sudokuBoard} changeDispatch={dispatch} row="4" />
          <RowOfNine sudokuBoard={sudokuBoard} changeDispatch={dispatch} row="5" />
          <RowOfNine sudokuBoard={sudokuBoard} changeDispatch={dispatch} row="6" />
          <RowOfNine sudokuBoard={sudokuBoard} changeDispatch={dispatch} row="7" />
          <RowOfNine sudokuBoard={sudokuBoard} changeDispatch={dispatch} row="8" />
        </div>
      </div>
    </div>
  );
}

export default SudokuSolver;

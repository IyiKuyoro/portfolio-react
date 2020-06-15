import React from 'react';

import Header from 'Compounds/Header';
import RowOfNine from './RowOfNine';
import Styles from './SudokuSolver.styles.scss';

function SudokuSolver() {
  return (
    <div>
      <Header />
      <div className={Styles.background}>
        <div className={Styles.board}>
          <RowOfNine group="0" />
          <RowOfNine group="1" />
          <RowOfNine group="2" />
          <RowOfNine group="3" />
          <RowOfNine group="4" />
          <RowOfNine group="5" />
          <RowOfNine group="6" />
          <RowOfNine group="7" />
          <RowOfNine group="8" />
        </div>
      </div>
    </div>
  );
}

export default SudokuSolver;

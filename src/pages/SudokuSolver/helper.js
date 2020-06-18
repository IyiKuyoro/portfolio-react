import { INCREASE_CELL, DECREASE_CELL, REPLACE_BOARD } from '../../store/constants';

/**
 * Get the region or 3 X 3 cells the current selected cell falls into
 *
 * @param  {number} row The row index
 * @param  {number} col The col index
 * @returns {object} An object containing the minRow, maxRow, minCol and maxCol
 */
function getGroupRegion(row, col) {
  let minRow = Math.floor(row / 3) * 2;
  minRow = minRow === 0 ? 0 : minRow + (1 * Math.floor(col / 3));

  let minCol = Math.floor(col / 3) * 2;
  minCol = minCol === 0 ? 0 : minCol + (1 * Math.floor(col / 3));

  return {
    minRow,
    maxRow: minRow + 2,
    minCol,
    maxCol: minCol + 2,
  };
}

/**
 * Validate that a number can be placed in the cell
 *
 * @param  {number} row The row where new value is to be places
 * @param  {number} col The column where new value is to be placed
 * @param  {number[][]} state The state of the matrix
 */
function validateCellValue(row, col, val, state) {
  const region = getGroupRegion(row, col);
  const found = [];

  for (let i = 0; i < 9; i += 1) {
    const horizontalScanRow = row;
    const horizontalScanCol = i;
    const verticalScanRow = i;
    const verticalScanCol = col;

    // Check that same value cannot be found in row
    if (horizontalScanCol !== col) {
      if (state[horizontalScanRow][horizontalScanCol] === val && val !== 0) {
        found.push([horizontalScanRow, horizontalScanCol]);
      }
    }
    // Check that same value cannot be found in col
    if (verticalScanRow !== row) {
      if (state[verticalScanRow][verticalScanCol] === val && val !== 0) {
        found.push([verticalScanRow, verticalScanCol]);
      }
    }

    // Check that same value cannot be found in 3 X 3 matrix
    const r = region.minRow + Math.floor(i / 3);
    const c = region.minCol + i - (Math.floor(i / 3) * 3);
    if (r !== row && c !== col) {
      if (state[r][c] === val && val !== 0) {
        found.push([r, c]);
      }
    }
  }

  return found;
}

/**
 * Change a value in the matrix
 *
 * @param  {number} row The matrix row
 * @param  {number} col The matrix column
 * @param  {number} newValue The new value to be in the matrix cell
 * @param  {number[][]} state The previous state
 */
function changeValue(row, col, newValue, state) {
  state[row][col] = newValue;

  return state;
}

/**
 * Modify the state value
 *
 * @param  {number[][]} state The previous state
 * @param  {object} payload An object containing the row and column of the value to be modified
 * @param  {number[][]} newState A copy of the previous state
 * @param  {boolean} isIncrease=true Is the value to be increased or decreased
 */
function modifyValue(state, payload, newState, type, value) {
  let newValue = value;
  if (type === 'increment') {
    newValue = state[payload.row][payload.col] < 9
      ? state[payload.row][payload.col] + 1
      : 0;
  } else if (type === 'decrement') {
    newValue = state[payload.row][payload.col] > 0
      ? state[payload.row][payload.col] - 1
      : 9;
  }
  const found = validateCellValue(payload.row, payload.col, newValue, newState);
  found.forEach((item) => {
    changeValue(item[0], item[1], 0, newState);
  });
  return changeValue(payload.row, payload.col, newValue, newState);
}

export const initialState = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

/**
 * Change the state based on the action type
 *
 * @param  {number[][]} state The previous state
 * @param  {object} action An object containing the payload and action
 * @returns {number[][]} The new state
 */
export function reducer(state, action) {
  const { type, payload } = action;
  const newState = [
    [...state[0]],
    [...state[1]],
    [...state[2]],
    [...state[3]],
    [...state[4]],
    [...state[5]],
    [...state[6]],
    [...state[7]],
    [...state[8]],
  ];

  switch (type) {
    case INCREASE_CELL:
      return modifyValue(state, payload, newState, type);
    case DECREASE_CELL:
      return modifyValue(state, payload, newState, type);
    case REPLACE_BOARD:
      return payload;
    default:
      return modifyValue(state, payload, newState, type, payload.value);
  }
}

export function convertToString(board) {
  let resString = '[[';

  for (let r = 0; r < board.length; r += 1) {
    if (r !== 0) {
      resString += '],[';
    }
    for (let c = 0; c < board[0].length; c += 1) {
      if (c !== board[0].length) {
        resString += `${board[r][c]},`;
      } else {
        resString += `${board[r][c]}`;
      }
    }
  }

  return `${resString}]]`;
}

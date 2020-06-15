/**
 * Get the region or 3 X 3 cells the current selected cell falls into
 *
 * @param  {number} row The row index
 * @param  {number} col The col index
 * @returns {object} An object containing the minRow, maxRow, minCol and maxCol
 */
function getGroupRegion(row, col) {
  let minRow = Math.floor(row / 3) * 2;
  minRow = minRow === 0 ? 0 : minRow + 1;

  let minCol = Math.floor(col / 3) * 2;
  minCol = minCol === 0 ? 0 : minCol + 1;

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
 * @param  {} row
 * @param  {} col
 * @param  {} state
 */
function validateCellValue(row, col, val, state) {
  const region = getGroupRegion(row, col);
  const found = [];

  for (let i = 0; i < 9; i += 1) {
    const horizontalScanRow = row;
    const horizontalScanCol = i;
    const verticalScanRow = i;
    const verticalScanCol = col;

    if (horizontalScanCol !== col) {
      if (state[horizontalScanRow][horizontalScanCol] === val && val !== 0) {
        found.push([horizontalScanRow, horizontalScanCol]);
      }
    }
    if (verticalScanRow !== row) {
      if (state[verticalScanRow][verticalScanCol] === val && val !== 0) {
        found.push([verticalScanRow, verticalScanCol]);
      }
    }

    const r = region.minRow + Math.floor(i / 3);
    const c = region.minRow + i - (Math.floor(i / 3) * 3);
    // if (i <= 2) {
    //   r = region.minRow;
    //   c = region.minCol + i;
    // } else if (i <= 5) {
    //   r = region.minRow + 1;
    //   c = region.minCol + i - 3;
    // } else {
    //   r = region.minRow + 2;
    //   c = region.minCol + i - 6;
    // }

    if (r !== row && c !== col) {
      if (state[r][c] === val && val !== 0) {
        found.push([r][c]);
      }
    }
  }

  return found;
}

function changeValue(row, col, newValue, state) {
  state[row][col] = newValue;

  return state;
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

export function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case 'increment':
      if (state[payload.row][payload.col] < 9) {
        const newValue = state[payload.row][payload.col] + 1;
        const found = validateCellValue(payload.row, payload.col, newValue, state);
        found.forEach((item) => {
          changeValue(item[0], item[1], 0, state);
        });
        return changeValue(payload.row, payload.col, newValue, state);
      }

      state[payload.row][payload.col] = 0;
      return state;
    default:
      if (state[payload.group][payload.cell] > 0) {
        const newValue = state[payload.row][payload.col] - 1;
        const found = validateCellValue(payload.row, payload.col, newValue, state);
        found.forEach((item) => {
          changeValue(item[0], item[1], 0, state);
        });
        return changeValue(payload.row, payload.col, newValue, state);
      }
      state[payload.row][payload.col] = 9;
      return state;
  }
}

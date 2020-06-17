import { ajax } from 'rxjs/ajax';

export default class SudokuSolverService {
  static solveBoard(board) {
    return ajax({
      url: 'https://iyikuyoroalgofunc.azurewebsites.net/api/SudokuFunction',
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: JSON.stringify({
        board,
      }),
    });
  }
}

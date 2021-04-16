//Creation of board grid
module.exports = function createBoard(dimension) {
  let grid = [];
  for (let i = 0; i < dimension; i++) {
    grid[i] = [];
    for (let j = 0; j < dimension; j++) {
      grid[i][j] = '-';
    }
  }
  return grid;
};

let boardSize = prompt("enter board size for the game");

let userOneBoard = createBoard(boardSize);
let userTwoBoard = createBoard(boardSize);

displayGrid(userOneBoard);
displayGrid(userTwoBoard);

function createBoard(dimension) {
  let grid = [];
  for (let i = 0; i < dimension; i++) {
    for (let j = 0; j < dimension; j++) {
      grid[i][j] = "-";
    }
  }
  return grid;
}

function displayGrid(grid) {
  const columns = columnHeading(grid.length);
  // console.log(columns);
  for (let i = 0; i < grid.length; i++) {
    let rows = i + " ";
    for (let cell of grid[i]) {
      if (cell === "Ship") {
        row += "- ";
      } else {
        row += cell + " ";
      }
    }
    console.log(row);
  }
}

function columnHeading(size) {
  let result = "  ";
  for (let i = 0; i < size; i++) {
    result += i + " ";
  }
  return result;
}

let boardSize = prompt("enter board size for the game");

let userOneBoard = createBoard(boardSize);
let userTwoBoard = createBoard(boardSize);
let userOneHitCount = 3; // if hit reaches 0 then print message of who wins the game
let userTwoHitCount = 3;
// let myGrid = createBoard(boardSize);

drawBreak();
displayGrid(userOneBoard);
displayGrid(userTwoBoard);
gameSetup();
// createBoard(myGrid);
function gameSetup() {
  for (let i = 0; i < 1; i++) {
    let index = parseInt(i);
    let shipNumber = index + 1;
    // console.log(typeof(index))
    let x = prompt(`Enter the x coordinate for your ship number ${shipNumber}`);
    let y = prompt(`Enter the y coordinate for your ship number ${shipNumber}`);
    let Ordinate1 = parseInt(x);
    let Ordinate2 = parseInt(y);
    if (boardSize >= Ordinate1 && boardSize >= Ordinate2) {
      // console.log(typeof(x))
      placeCharacter(x, y, "O", userOneBoard);
      x = prompt(`Enter the x coordinate for your ship number ${shipNumber}`);
      y = prompt(`Enter the y coordinate for your ship number ${shipNumber}`);
      placeCharacter(x, y, "O", userTwoBoard);
      drawBreak();
      console.log("USER ONE BOARD");
      displayGrid(userOneBoard);
      console.log("COMPUTER BOARD");
      displayGrid(userTwoBoard);
    } else {
      gameSetup();
    }
  }
}
while (userOneHitCount > 0 && userTwoHitCount > 0) {
  x = prompt("Enter the x coordinate for your attack");
  y = prompt("Enter the y coordinate for your attack");

  if (attack(x, y, userTwoBoard)) {
    userOneHitCount--;
  }
  x = getRandomInt(boardSize);
  y = getRandomInt(boardSize);
    console.log(x)
    console.log(y)
  if (userTwoHitCount > 0 && attack(x, y, userOneBoard)) {
    userTwoHitCount--;
  }

  drawBreak();
  console.log("USER ONE BOARD");
  displayGrid(userOneBoard);
  console.log("COMPUTER BOARD");
  displayGrid(userTwoBoard);
}

if (userOneHitCount < userTwoHitCount) {
  console.log("you won this game!!!");
} else {
  console.log("computer won this game!!!");
}

function createBoard(dimension) {
  let grid = [];
  for (let i = 0; i < dimension; i++) {
    grid[i] = [];
    for (let j = 0; j < dimension; j++) {
      grid[i][j] = "-";
    }
  }
  return grid;
}

function displayGrid(grid) {
  const columns = columnHeading(grid.length);
  console.log(columns);
  for (let i = 0; i < grid.length; i++) {
    let rows = `${i} `;
    for (let cell of grid[i]) {
      if (cell === "ship") {
        rows += "- ";
      } else {
        rows += `${cell} `;
      }
    }
    console.log(rows);
  }
}

function columnHeading(size) {
  let result = "  ";
  for (let i = 0; i < size; i++) {
    result += `${i} `;
  }
  return result;
}

function placeCharacter(x, y, c, grid) {
  let i = parseInt(x);
  let j = parseInt(y);
  // console.log(grid === userOneBoard)
  let vertOrHorz = prompt(
    "Enter whether you want to place it vertically (PRESS V) or horizontally (PRESS H"
  );
  if (vertOrHorz === "V") {
    let upDown = prompt(
      "Enter whether you want to place the ship upside (PRESS U) or downside (PRESS D)"
    );
    //   try{
    //     if(grid[i-1][j]=== '-')
    //     console.log(grid[i][j])
    //   else
    //   throw error;
    //   }
    // catch(error)
    // {
    //   console.log("error in your code")
    //   console.log("try again")
    //   placeCharacter(x, y, 'O', userOneBoard);
    // }
    if (upDown === "U") {
      // console.log(grid[i][j] === "-");
      // console.log(grid[i - 1][j] === "-");
      // console.log(grid[i - 2][j] === "-");
      // try{
      if (
        grid[i][j] === "-" &&
        grid[i-1][j] === "-" &&
        grid[i-2][j] === "-"
      ) {
        // console.log(typeof(i),typeof(j));
        // console.log(grid[i - 1][j] === "-");
        // console.log(grid[i - 2][j] === "-");
        grid[i][j] = c;
        grid[i-1][j] = c;
        grid[i-2][j] = c;
        drawBreak();
        console.log("USER ONE BOARD");
        displayGrid(userOneBoard);
        console.log("COMPUTER BOARD");
        displayGrid(userTwoBoard);
        
      } else {
        console.log("invalid value, ship can't be placed here");
        if (grid === userOneBoard) placeCharacter(x, y, "O", userOneBoard);
        else {
          placeCharacter(x, y, "O", userTwoBoard);
          drawBreak();
          console.log("USER ONE BOARD");
          displayGrid(userOneBoard);
          console.log("COMPUTER BOARD");
          displayGrid(userTwoBoard);
        }
        // }
        // catch
        // {
        //   console.log("error in your code")
        //     console.log("try again")
        //     placeCharacter(x, y, 'O', userOneBoard);
        // }
      }
      if (upDown === "D") {
        if (
          grid[i][j] === "-" &&
          grid[i+1][j] === "-" &&
          grid[i+2][j] === "-"
        ) {
          // console.log(typeof(i),typeof(j));
          grid[i][j] = c;
          grid[i+1][j] = c;
          grid[i+2][j] = c;
          drawBreak();
          console.log("USER ONE BOARD");
          displayGrid(userOneBoard);
          console.log("COMPUTER BOARD");
          displayGrid(userTwoBoard);
        } else {
          console.log("invalid value, ship can't be placed here");

          placeCharacter(x, y, "O", userTwoBoard);
          drawBreak();
          console.log("USER ONE BOARD");
          displayGrid(userOneBoard);
          console.log("COMPUTER BOARD");
          displayGrid(userTwoBoard);
        }
      }
    }
  }
  if (vertOrHorz === "H") {
    let side = prompt(
      "Enter whether you want to place the ship left (PRESS L) or right (PRESS R) side"
    );

    if (side === "L") {
      // console.log(grid[i][j] === "-");
      // console.log(grid[i][j - 1] === "-");
      // console.log(grid[i][j - 2] === "-");

      if (
        grid[i][j] === "-" &&
        grid[i][j - 1] === "-" &&
        grid[i][j - 2] === "-"
      ) {
        grid[i][j] = c;
        grid[i][j - 1] = c;
        grid[i][j - 2] = c;
        drawBreak();
        console.log("USER ONE BOARD");
        displayGrid(userOneBoard);
        console.log("COMPUTER BOARD");
        displayGrid(userTwoBoard);
      } else {
        console.log("invalid value, ship can't be placed here");
        placeCharacter(x, y, "O", userTwoBoard);
        drawBreak();
        console.log("USER ONE BOARD");
        displayGrid(userOneBoard);
        console.log("COMPUTER BOARD");
        displayGrid(userTwoBoard);
      }
    }
    if (side === "R") {
      if (
        grid[i][j] === "-" &&
        grid[i][j + 1] === "-" &&
        grid[i][j + 2] === "-"

      ) {
        grid[i][j] = c;
        grid[i][j + 1] = c;
        grid[i][j + 2] = c;
        drawBreak();
        console.log("USER ONE BOARD");
        displayGrid(userOneBoard);
        console.log("COMPUTER BOARD");
        displayGrid(userTwoBoard);
      } else {
        console.log("invalid value, ship can't be placed here");
        placeCharacter(x, y, "O", userTwoBoard);
        drawBreak();
        console.log("USER ONE BOARD");
        displayGrid(userOneBoard);
        console.log("COMPUTER BOARD");
        displayGrid(userTwoBoard);
      }
    }
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function attack(x, y, grid) {
  if (grid[x][y] === "O") {
    grid[x][y] = "!";
    return true;
  } else if (grid[x][y] === "-") {
    grid[x][y] = "x";
    return false;
  } else {
    return false;
  }
}

function drawBreak() {
  console.log("---==========-----OUTPUT CHANGES----========----");
}

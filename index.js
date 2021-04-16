let boardSize = prompt("enter board size for the game");

let userOneBoard = createBoard(boardSize);
let userTwoBoard = createBoard(boardSize);
let userOneHitCount = 3; // if hit reaches 0 then user one wins the game
let userTwoHitCount = 3; // if hit reaches 0 then use two wins the game


drawBreak(); 
console.log("USER ONE BOARD");
displayGrid(userOneBoard);
console.log("USER TWO BOARD");
displayGrid(userTwoBoard);
gameSetup();



//Placing ship on both the user game boards
function gameSetup() {
  for (let i = 0; i < 1; i++) {
    let index = parseInt(i);
    let shipNumber = index + 1;
    
    let x = prompt(`Enter the x coordinate for your ship number ${shipNumber}`);
    let y = prompt(`Enter the y coordinate for your ship number ${shipNumber}`);
    let Ordinate1 = parseInt(x);
    let Ordinate2 = parseInt(y);
    if (boardSize >= Ordinate1 && boardSize >= Ordinate2) {
      
      placeCharacter(x, y, "O", userOneBoard);
      x = prompt(`Enter the x coordinate for your ship number ${shipNumber}`);
      y = prompt(`Enter the y coordinate for your ship number ${shipNumber}`);
      placeCharacter(x, y, "O", userTwoBoard);
      drawBreak();
      console.log("USER ONE BOARD");
      displayGrid(userOneBoard);
      console.log("USER TWO BOARD");
      displayGrid(userTwoBoard);
    } else {
      gameSetup();
    }
  }
}

//Logic of attack on both the game boards and winner declaration
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

//winner decalaration after successfull attacks
if (userOneHitCount < userTwoHitCount) {
  console.log("user one won this game!!!");
} else {
  console.log("user two won this game!!!");
}

//Creation of board grid
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


//displaying boards 
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

//Display column number on top
function columnHeading(size) {
  let result = "  ";
  for (let i = 0; i < size; i++) {
    result += `${i} `;
  }
  return result;
}


//Placing ship on both the boards either in vertical or horizontal direction
function placeCharacter(x, y, c, grid) {
  let i = parseInt(x);
  let j = parseInt(y);
 
  let vertOrHorz = prompt(
    "Enter whether you want to place it vertically (PRESS V) or horizontally (PRESS H"
  );
  if (vertOrHorz === "V") {
    let upDown = prompt(
      "Enter whether you want to place the ship upside (PRESS U) or downside (PRESS D)"
    );
    
    if (upDown === "U") {
     
      if (
        grid[i][j] === "-" &&
        grid[i-1][j] === "-" &&
        grid[i-2][j] === "-"
      ) {
       
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
      
      }
      if (upDown === "D") {
        if (
          grid[i][j] === "-" &&
          grid[i+1][j] === "-" &&
          grid[i+2][j] === "-"
        ) {
         
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
        console.log("USER TWO BOARD");
        displayGrid(userTwoBoard);
      }
    }
  }
}

//Selecting attack index randomly for user two
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

//Deciding if the attack is a "Hit" or a "Miss" on the game boards
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

//Changing output 
function drawBreak() {
  console.log("---==========-----OUTPUT CHANGES----========----");
}

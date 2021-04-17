const readline = require('readline-sync');

const message = require('./constant/message');
const createBoard = require('./createBoard');
const displayGrid = require('./displayGrid');
const getRandomInt = require('./utils/random');
const drawBreak = require('./utils/drawbreak');
const attack = require('./attack');

let boardSize = 8;

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

    let x = readline.question(
      `${message.ROWSHIP} ${shipNumber}---`
    );
    let y = readline.question(
      `${message.COLSHIP} ${shipNumber}---`
    );
    let Ordinate1 = parseInt(x);
    let Ordinate2 = parseInt(y);

    drawBreak();
    console.log("USER ONE BOARD");
    displayGrid(userOneBoard);
    console.log("USER TWO BOARD");
    displayGrid(userTwoBoard);

    if (Ordinate1 <= boardSize - 1 || Ordinate2 <= boardSize - 1) {
      placeCharacter(x, y, "O", userOneBoard);
      x = readline.question(
        `${message.ROWSHIP} ${shipNumber}---`
      );
      y = readline.question(
        `${message.COLSHIP} ${shipNumber}---`
      );
      placeCharacter(x, y, "O", userTwoBoard);
      drawBreak();
      console.log("USER ONE BOARD");
      displayGrid(userOneBoard);
      console.log("USER TWO BOARD");
      displayGrid(userTwoBoard);
    } else {
      console.log("Invalid value for ship co-ordinate");
      gameSetup();
    }
  }
}

let count = 0;
//Logic of attack on both the game boards and winner declaration
while (userOneHitCount > 0 && userTwoHitCount > 0) {
  x = readline.question(`${message.ROWATTACKS}`);
  y = readline.question(`${message.COLATTACKS}`);
  if (x !== "" && y !== "") {
    if (boardSize > x && boardSize > y) {
      if (attack(x, y, userTwoBoard)) {
        userOneHitCount--;
      }
      x = getRandomInt(boardSize);
      y = getRandomInt(boardSize);
      console.log(x);
      console.log(y);
      if (userTwoHitCount > 0 && attack(x, y, userOneBoard)) {
        userTwoHitCount--;
      }

      drawBreak();
      console.log("USER ONE BOARD");
      displayGrid(userOneBoard);
      console.log("USER TWO BOARD");
      displayGrid(userTwoBoard);
    } else {
      console.log("invalid attack !!'please select correct values'");
      count++;
      if (count === 3) {
        console.log(" lost chance !! Game over ");
        process.exit(0);
      }
    }
  } else {
    console.log("please enter coordinates");
  }
}

//winner decalaration after successfull attacks
if (userOneHitCount < userTwoHitCount) {
  console.log("user one won this game!!!");
} else {
  console.log("user two won this game!!!");
}

//Placing ship on both the boards either in vertical or horizontal direction
function placeCharacter(x, y, c, grid) {
  let i = parseInt(x);
  let j = parseInt(y);

  if (i > 7 || j > 7) {
    console.log("invalid attack value on the game board");
    process.exit(0);
  } else {
    let vertOrHorz = readline.question(`${message.VERTICALHORIZONTAL}`
    );
    if (vertOrHorz === "V" || vertOrHorz === "v") {
      let upDown = readline.question(
        `${message.UPDOWN}`
      );

      if (upDown === "U" || upDown === "u") {
        if (
          grid[i][j] === "-" &&
          grid[i - 1][j] === "-" &&
          grid[i - 2][j] === "-"
        ) {
          grid[i][j] = c;
          grid[i - 1][j] = c;
          grid[i - 2][j] = c;
          // drawBreak();
          // console.log("USER ONE BOARD");
          // displayGrid(userOneBoard);
          // console.log("USER TWO BOARD");
          // displayGrid(userTwoBoard);
        }
        // } else {
        //   console.log("invalid value, ship can't be placed here");
        //   if (grid === userOneBoard) placeCharacter(x, y, "O", userOneBoard);
        else {
          placeCharacter(x, y, "O", userTwoBoard);
          drawBreak();
          console.log("USER ONE BOARD");
          displayGrid(userOneBoard);
          console.log("USER TWO BOARD");
          displayGrid(userTwoBoard);
        }

        if (upDown === "D" || upDown === "d") {
          if (
            grid[i][j] === "-" &&
            grid[i + 1][j] === "-" &&
            grid[i + 2][j] === "-"
          ) {
            grid[i][j] = c;
            grid[i + 1][j] = c;
            grid[i + 2][j] = c;
            // drawBreak();
            // console.log("USER ONE BOARD");
            // displayGrid(userOneBoard);
            // console.log("USER TWO BOARD");
            // displayGrid(userTwoBoard);
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
    if (vertOrHorz === "H" || vertOrHorz === "h") {
      let side = readline.question(
        `${message.RIGHLEFT}`
      );

      if (side === "L" || side === "l") {
        if (
          grid[i][j] === "-" &&
          grid[i][j - 1] === "-" &&
          grid[i][j - 2] === "-"
        ) {
          grid[i][j] = c;
          grid[i][j - 1] = c;
          grid[i][j - 2] = c;
          // drawBreak();
          // console.log("USER ONE BOARD");
          // displayGrid(userOneBoard);
          // console.log("USER TWO BOARD");
          // displayGrid(userTwoBoard);
        } else {
          console.log("invalid value, ship can't be placed here");
          if (grid === userOneBoard) placeCharacter(x, y, "O", userOneBoard);
          else placeCharacter(x, y, "O", userTwoBoard);

          drawBreak();
          console.log("USER ONE BOARD");
          displayGrid(userOneBoard);
          console.log("USER TWO BOARD");
          displayGrid(userTwoBoard);
        }
      }
      if (side === "R" || side === "r") {
        if (
          grid[i][j] === "-" &&
          grid[i][j + 1] === "-" &&
          grid[i][j + 2] === "-"
        ) {
          grid[i][j] = c;
          grid[i][j + 1] = c;
          grid[i][j + 2] = c;
          // drawBreak();
          // console.log("USER ONE BOARD");
          // displayGrid(userOneBoard);
          // console.log("USER TWO BOARD");
          // displayGrid(userTwoBoard);
        } else {
          console.log("invalid value, ship can't be placed here");
          if (grid === userOneBoard) placeCharacter(x, y, "O", userOneBoard);
          else placeCharacter(x, y, "O", userTwoBoard);

          drawBreak();
          console.log("USER ONE BOARD");
          displayGrid(userOneBoard);
          console.log("USER TWO BOARD");
          displayGrid(userTwoBoard);
        }
      }
    }
  }
}

const readline = require('readline-sync');

const message = require('./constant/message');
const createBoard = require('./createBoard');
const displayGrid = require('./displayGrid');
const getRandomInt = require('./utils/random');
const drawBreak = require('./utils/drawbreak');
const attack = require('./attack');

//default board size
let boardSize = 8;

//create boards
let userOneBoard = createBoard(boardSize);
let userTwoBoard = createBoard(boardSize);
let userOneHitCount = 3; // if hit reaches 0 then user one wins the game
let userTwoHitCount = 3; // if hit reaches 0 then use two wins the game

//display boards
drawBreak();
console.log(`${message.USERONEBOARD}`);
displayGrid(userOneBoard);
console.log(`${message.USERTWOBOARD}`);
displayGrid(userTwoBoard);
gameSetup();

//Placing ship on both the user game boards
function gameSetup() {
  for (let i = 0; i < 1; i++) {
    let index = parseInt(i);
    let shipNumber = index + 1;

    let x = readline.question(
      `${message.ROW_SHIP} ${shipNumber}---player1-->`
    );

    let y = readline.question(
      `${message.COL_SHIP} ${shipNumber}---player1-->`
    );
    let Ordinate1 = parseInt(x);
    let Ordinate2 = parseInt(y);

    // drawBreak();
    // console.log("USER ONE BOARD");
    // displayGrid(userOneBoard);
    // console.log("USER TWO BOARD");
    // displayGrid(userTwoBoard);

    if (Number.isNaN(Ordinate1) || Number.isNaN(Ordinate2)) {
      gameSetup();
    }

    if (x <= boardSize - 1 && y <= boardSize - 1) {
      placeCharacter(x, y, "O", userOneBoard, user = "player1");
      x = readline.question(
        `${message.ROW_SHIP} ${shipNumber}---player2-->`
      );
      y = readline.question(
        `${message.COL_SHIP} ${shipNumber}---player2-->`
      );
      placeCharacter(x, y, "O", userTwoBoard, user = "player2");
      drawBreak();
      console.log(`${message.USER_ONE_BOARD}`);
      displayGrid(userOneBoard);
      console.log(`${message.USER_TWO_BOARD}`);
      displayGrid(userTwoBoard);
    } else {
      console.log(`${message.INVAILID_SHIP}`);
      gameSetup();
    }
  }
}



//using count variable to give only three chances to user after selecting wrong values else terminate game
let count = 0;
//Logic of attack on both the game boards and winner declaration

while (userOneHitCount > 0 && userTwoHitCount > 0) {
  x = readline.question(`${message.ROW_ATTACKS}`);
  y = readline.question(`${message.COL_ATTACKS}`);
  if (x !== "" && y !== "") {
    if (x <= boardSize - 1 && y <= boardSize - 1) {
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
      console.log(`${message.USER_ONE_BOARD}`);
      displayGrid(userOneBoard);
      console.log(`${message.USER_TWO_BOARD}`);
      displayGrid(userTwoBoard);
    } else {
      console.log(`${message.SELECT_ATTACK}`);
      count++;
      if (count === 3) {
        console.log(`${message.LOST_CHANCE}`);
        process.exit(0);
      }
    }
  } else {
    console.log(`${message.ENTER_ATTACK_VALUE}`);
  }
}

//winner decalaration after successfull attacks
if (userOneHitCount < userTwoHitCount) {
  console.log(`${message.USER_ONE_WON}`);
  console.log(`${message.USER_TWO_LOSS}`);
} else {
  console.log(`${message.USER_TWO_WON}`);
  console.log(`${message.USER_ONE_LOSS}`);
}

//Placing ship on both the boards either in vertical or horizontal direction
function placeCharacter(x, y, c, grid, user) {
  let i = parseInt(x);
  let j = parseInt(y);

  if (i > 7 && j > 7) {
    console.log(`${message.INVAILID_COORDINATE}`);
    // process.exit(0);
    console.log("=======================", user)
    x = readline.question(
      `${message.ROW_SHIP}`
    );
    y = readline.question(
      `${message.COL_SHIP}`
    );
    if (grid === userOneBoard) placeCharacter(x, y, 'O', userOneBoard, user = "player1");
    else placeCharacter(x, y, 'O', userTwoBoard, user = "player2");
  } else {

    console.log("=========================", user)
    let vertOrHorz = readline.question(`${message.VERTICAL_HORIZONTAL}`);

    //for vertical
    if (vertOrHorz === "V" || vertOrHorz === "v") {
      let upDown = readline.question(
        `${message.UP_DOWN}`
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

        }

        else {
          console.log(`${message.SHIP_NOT_PLACED}`);
          if (grid === userOneBoard) placeCharacter(x, y, 'O', userOneBoard);
          else placeCharacter(x, y, 'O', userTwoBoard);

          drawBreak();
          console.log(`${message.USER_ONE_BOARD}`);
          displayGrid(userOneBoard);
          console.log(`${message.USER_TWO_BOARD}`);
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

          } else {
            console.log(`${message.SHIP_NOT_PLACED}`);
            if (grid === userOneBoard) placeCharacter(x, y, 'O', userOneBoard);
            else placeCharacter(x, y, 'O', userTwoBoard);

            drawBreak();
            console.log(`${message.USER_ONE_BOARD}`);
            displayGrid(userOneBoard);
            console.log(`${message.USER_TWO_BOARD}`);
            displayGrid(userTwoBoard);
          }
        }
      }
    }
    //==============
    //for horizontal
    if (vertOrHorz === "H" || vertOrHorz === "h") {
      let side = readline.question(
        `${message.RIGHT_LEFT}`
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

        } else {
          console.log(`${message.SHIP_NOT_PLACED}`);
          if (grid === userOneBoard) placeCharacter(x, y, 'O', userOneBoard);
          else placeCharacter(x, y, 'O', userTwoBoard);

          drawBreak();
          console.log(`${message.USER_ONE_BOARD}`);
          displayGrid(userOneBoard);
          console.log(`${message.USER_TWO_BOARD}`);
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

        } else {
          console.log(`${message.SHIP_NOT_PLACED}`);
          if (grid === userOneBoard) placeCharacter(x, y, 'O', userOneBoard);
          else placeCharacter(x, y, 'O', userTwoBoard);

          drawBreak();
          console.log(`${message.USER_ONE_BOARD}`);
          displayGrid(userOneBoard);
          console.log(`${message.USER_TWO_BOARD}`);
          displayGrid(userTwoBoard);
        }
      }
    }
  }
}
//=================
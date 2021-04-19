const readlineSync = require('readline-sync');

const displayGrid= require("./displayGrid");
const createBoard = require("./createBoard")
const attack = require("./attack");
const getRandomInt = require("./utils/random");
const drawBreak = require("./utils/drawBreak");
const message = require("./constants/message");

//initialize variables
let userBoardSize = 8;
let enemyBoardSize = userBoardSize;
let userBoard = createBoard(userBoardSize);
let enemyBoard = createBoard(enemyBoardSize);

// console.log(attack(2,4,enemyBoard))
let userAttacks = 3;
let enemyAttacks = 3;
let enemyLocations = {};

drawBreak();
console.log(`${message.ENEMY_BOARD}`);
displayGrid(enemyBoard, true);
console.log(`${message.USER_BOARD}`);
displayGrid(userBoard);
gameSetup();
enemy('O', enemyBoard, enemyBoardSize);
drawBreak();
console.log(`${message.ENEMY_BOARD}`);
displayGrid(enemyBoard, true);
console.log(`${message.USER_BOARD}`);
displayGrid(userBoard);

//game setup
function gameSetup() {
    for (let totalShip = 1; totalShip <= 1; totalShip++) {
        let x = readlineSync.question(`${message.USER_ROW_SHIP}`);
        let y = readlineSync.question(`${message.USER_COL_SHIP}`);
        if (x !== "" && y !== "") {
            if (userBoardSize > x && userBoardSize > y) {
                //user
                let shipView = readlineSync.question(`${message.VERTICAL_HORIZONTAL}`);
                if (shipView.toLowerCase() === 'yes' && shipView !== " " && shipView.toLowerCase() !== "no") {
                    placeCharacterVertical(x, y, 'O', userBoard, "user");
                } else {
                    placeCharacter(x, y, 'O', userBoard, "user");
                }
            } else {
                console.log(`${message.SHIP_VALUE_WRONG}`);
                gameSetup();
            }
        } else {
            console.log(`${message.SHIP_EMPTY}`);
            gameSetup();
        }
    }
}

let count = 0;
// //game loop for attacking eachother
while (enemyAttacks > 0 && userAttacks > 0) {
    let x = readlineSync.question(`${message.ROW_ATTACKS}`);
    let y = readlineSync.question(`${message.COL_ATTACKS}`);
    if (x !== "" && y !== "") {
        if (userBoardSize > x && userBoardSize > y) {

            if (attack(x, y, enemyBoard)) {
                enemyAttacks--;
            }
            x = getRandomInt(userBoardSize);
            y = getRandomInt(userBoardSize);
            if (enemyAttacks > 0 && attack(x, y, userBoard)) {
                userAttacks--;
            }
            drawBreak();
            console.log(`${message.ENEMY_BOARD}`);
            displayGrid(enemyBoard, true);
            console.log(`${message.USER_BOARD}`);
            displayGrid(userBoard);
        } else {
            console.log(`${message.CORRECT_ATTACK_VALUE}`);
        }
    } else {
        count++;
        console.log(`${message.ENTER_ATTACK_VALUE}`);
        if (count === 3) {
            console.log(`${message.LOST_CHANCE}`);
            process.exit(0);
        }
    }
}
//lose Win Result 
if (userAttacks < enemyAttacks) {
    console.log(`${message.ENEMY_WON}`);
    console.log(`${message.USER_LOSS}`);
} else {
    console.log(`${message.USER_WON}`);
    console.log(`${message.ENEMY_LOSS}`);
}

//horizontally ship view 
function placeCharacter(x, y, c, grid, flag) {
    //left
    let leftRight = readlineSync.question(`${message.RIGHT_LEFT}`);
    if (leftRight.toLowerCase() === "left" && leftRight.toLowerCase() !== "right" && leftRight.toLowerCase() !== "") {
        if (grid[parseInt(y)][parseInt(x) - 1] === "-" && grid[parseInt(y)][parseInt(x) - 2] === "-") {
            grid[parseInt(y)][parseInt(x)] = c;
            grid[parseInt(y)][parseInt(x) - 1] = c;
            grid[parseInt(y)][parseInt(x) - 2] = c;
        } else {
            // console.log(`${message.LEFT_COORDINATE}`);
            if (flag === "user") {
                gameSetup();
            } else {
                enemy(c, grid);
            }
        }
    }
    else {
        //right
        if (grid[parseInt(y)][parseInt(x) + 1] === "-" && grid[parseInt(y)][parseInt(x) + 2] === "-" && grid[parseInt(y)][parseInt(x)] === "-") {
            grid[parseInt(y)][parseInt(x)] = c;
            grid[parseInt(y)][parseInt(x) + 1] = c;
            grid[parseInt(y)][parseInt(x) + 2] = c;
        }
        else {
            console.log(`${message.RIGHT_COORDINATE}`);
            if (flag === "user") {
                gameSetup();
            } else {
                enemy(c, grid);
            }
        }
    }
}


//vertically ship view 
function placeCharacterVertical(x, y, c, grid, flag) {
    //Up
    let upDownShipPosition = readlineSync.question(`${message.UP_DOWN}`);
    if (upDownShipPosition.toLowerCase() === "up" && upDownShipPosition.toLowerCase() !== "down" && upDownShipPosition.toLowerCase() !== "") {
        if (parseInt(x) !== 0 && parseInt(x) !== 1) {
            if (grid[parseInt(x)][parseInt(y)] === "-" && grid[parseInt(x) - 1][parseInt(y)] === "-" && grid[parseInt(x) - 2][parseInt(y)] === "-") {
                grid[parseInt(x)][parseInt(y)] = c;
                grid[parseInt(x) - 1][parseInt(y)] = c;
                grid[parseInt(x) - 2][parseInt(y)] = c;
            }
        } else {
            console.log(`${message.UP_COORDINATE}`);
            if (flag === "user") {
                gameSetup();
            } else {
                enemy(c, grid);
            }
        }
    } else {
        //down
        if (parseInt(x) !== 6 && parseInt(x) !== 7) {
            if (grid[parseInt(x)][parseInt(y)] === "-" && grid[parseInt(x) + 1][parseInt(y)] === "-" && grid[parseInt(x) + 2][parseInt(y)] === "-" && grid[parseInt(x)][parseInt(y)] !== "" && grid[parseInt(x) + 1][parseInt(y)] !== "" && grid[parseInt(x) + 2][parseInt(y)] !== "") {
                grid[parseInt(x)][parseInt(y)] = c;
                grid[parseInt(x) + 1][parseInt(y)] = c;
                grid[parseInt(x) + 2][parseInt(y)] = c;
            }
        } else {
            console.log(`${message.DOWN_COORDINATE}`);
            if (flag === "user") {
                gameSetup();
            } else {
                enemy(c, grid);
            }
        }
    }
}


//enemy
function enemy(c, grid) {
    let didPlace = false;
    while (!didPlace) {
        let x = readlineSync.question(`${message.ENEMY_ROW_SHIP}`);
        let y = readlineSync.question(`${message.ENEMY_COL_SHIP}`);
        if (!enemyLocations[`${x}-${y}`]) {
            if (x !== "" && y !== "") {
                if (enemyBoardSize > x && enemyBoardSize > y) {
                    let enemyShipView = readlineSync.question(`${message.VERTICAL_HORIZONTAL}`);
                    if (enemyShipView.toLowerCase() === 'yes' && enemyShipView !== " " && enemyShipView.toLowerCase() !== "no") {
                        placeCharacterVertical(x, y, c, grid, "enemy");
                    } else {
                        placeCharacter(x, y, c, grid, "enemy");
                    }
                } else {
                    console.log(`${message.SHIP_VALUE_WRONG}`);
                    enemy(c, grid);
                }
            } else {
                console.log(`${message.SHIP_EMPTY}`);
                enemy(c, grid);
            }
            didPlace = true;
            enemyLocations[`${x}-${y}`] = true;
        }

    }
}


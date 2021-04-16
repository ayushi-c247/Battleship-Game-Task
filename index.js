//initialize variables
var readlineSync = require('readline-sync');
let userBoardSize = readlineSync.question('What size would you like your board to be?');
let enemyBoardSize = userBoardSize;
let userBoard = createBoard(userBoardSize);
let enemyBoard = createBoard(enemyBoardSize);
let userAttacks = 3;
let enemyAttacks = 3;
let enemyLocations = {};

console.log("---Enemy Board---");
displayGrid(enemyBoard, true);
console.log("---User board---");
displayGrid(userBoard);
gameSetup();


//game setup
function gameSetup() {
    for (let totalShip = 1; totalShip <= 1; totalShip++) {
        let x = readlineSync.question('Enter the x coordinate for your ship placement as "User"');
        let y = readlineSync.question('Enter the y coordinate for your ship placement "User"');
        if (userBoardSize > x && userBoardSize > y) {
            //user
            let shipView = readlineSync.question('Enter "yes" if, you want ship vertically otherwise enter "no"');
            if (shipView.toLowerCase() === 'yes' && shipView !== " " && shipView.toLowerCase() !== "no") {
                placeCharacterVertical(x, y, 'O', userBoard);
            } else {
                placeCharacter(x, y, 'O', userBoard);
            }
            //enemy
            enemy('O', enemyBoard, enemyBoardSize);
            drawBreak();
            console.log("---Enemy Board---");
            displayGrid(enemyBoard, true);
            console.log("---User board---");
            displayGrid(userBoard);
        } else {
            console.log('Your coordinate value is wrong please enter correct coordinate');
            gameSetup();
        }
    }
}


//game loop for attacking eachother
while (enemyAttacks > 0 && userAttacks > 0) {
    let x = readlineSync.question('Enter the x coordinate for your attack');
    let y = readlineSync.question('Enter the y coordinate for your attack');
    if (attack(x, y, enemyBoard)) {
        enemyAttacks--;
    }
    x = getRandomInt(userBoardSize);
    y = getRandomInt(userBoardSize);
    if (enemyAttacks > 0 && attack(x, y, userBoard)) {
        userAttacks--;
    }
    drawBreak();
    console.log("---Enemy Board---");
    displayGrid(enemyBoard, true);
    console.log("---User board---");
    displayGrid(userBoard);
}


//lose Win Result 
if (userAttacks < enemyAttacks) {
    console.log('LOSE it !!!!!!!!!!!!!!!!!!');
} else {
    console.log('YOU MISSED! HAHA!!!!!! Victory!!!!');
}


//createBoard
function createBoard(size) {
    let grid = [];
    for (let i = 0; i < size; i++) {
        grid[i] = [];
        for (let j = 0; j < size; j++) {
            grid[i][j] = '-';
        }
    }
    return grid;
}


//displayGrid
function displayGrid(grid, isEnemy = false) {
    const headers = createHeaders(grid.length);
    console.log(headers);
    for (let i = 0; i < grid.length; i++) {
        let rows = i + ' ';
        for (let cell of grid[i]) {
            if (isEnemy && cell == 'O') {
                rows += '- ';
            } else {
                rows += cell + ' ';
            }
        }
        console.log(rows);
    }
}


//create column index
function createHeaders(size) {
    let result = '  ';
    for (let i = 0; i < size; i++) {
        result += i + ' ';
    }
    return result;
}


//horizontally ship view 
function placeCharacter(x, y, c, grid) {
    //left
    let leftRight = readlineSync.question('"Enter "left" if you want left side and Enter "right" if you want right side  ');
    if (leftRight.toLowerCase() === "left" && leftRight.toLowerCase() !== "right" && leftRight.toLowerCase() !== "") {
        if (grid[parseInt(y)][parseInt(x) - 1] === "-" && grid[parseInt(y)][parseInt(x) - 2] === "-") {
            grid[parseInt(y)][parseInt(x)] = c;
            grid[parseInt(y)][parseInt(x) - 1] = c;
            grid[parseInt(y)][parseInt(x) - 2] = c;
        } else {
            console.log("alter!! your ship value goes out of board!! Please select coordinate again!");
            placeCharacter(x, y, c, grid);
        }
    }
    else {
        //right
        if (grid[parseInt(y)][parseInt(x) + 1] === "-" && grid[parseInt(y)][parseInt(x) + 2] === "-") {
            grid[parseInt(y)][parseInt(x)] = c;
            grid[parseInt(y)][parseInt(x) + 1] = c;
            grid[parseInt(y)][parseInt(x) + 2] = c;
        }
        else {
            console.log("alter!! your ship value goes out of board!! Please select coordinate again!");
        }
    }
}


//vertically ship view 
function placeCharacterVertical(x, y, c, grid) {
    grid[parseInt(x)][parseInt(y)] = c;

    //Up
    let upDownShipPosition = readlineSync.question('"Enter "Up" if you want up side and Enter "Down" if you want Down side  ');
    if (upDownShipPosition.toLowerCase() === "up" && upDownShipPosition.toLowerCase() !== "down" && upDownShipPosition.toLowerCase() !== "") {
        grid[parseInt(x) - 1][parseInt(y)] = c;
        grid[parseInt(x) - 2][parseInt(y)] = c;
    } else {
        //down
        grid[parseInt(x) + 1][parseInt(y)] = c;
        grid[parseInt(x) + 2][parseInt(y)] = c;
    }
}


//enemy
function enemy(c, grid) {
    let didPlace = false;
    while (!didPlace) {
        let x = readlineSync.question('Enter the x coordinate for your ship placement of enemy');
        let y = readlineSync.question('Enter the y coordinate for your ship placement of enemy');
        if (!enemyLocations[`${x}-${y}`]) {
            if (enemyBoardSize > x && enemyBoardSize > y) {
                let userShipView = readlineSync.question('Enter "yes" if, you want ship vertically otherwise enter "no"');
                if (userShipView.toLowerCase() === 'yes' && userShipView !== " " && userShipView.toLowerCase() !== "no") {
                    placeCharacterVertical(x, y, c, grid);
                } else {
                    placeCharacter(x, y, c, grid);
                }
            } else {
                console('Your coordinate value is wrong please enter correct coordinate');
                enemy('O', enemyBoard, enemyBoardSize);
            }
            didPlace = true;
            enemyLocations[`${x}-${y}`] = true;
        }
    }
}


//getRandomInt take values randomly
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

//attacks
function attack(x, y, grid) {
    if (grid[y][x] == 'O') {
        grid[y][x] = '!';
        return true;
    } else if (grid[y][x] == '-') {
        grid[y][x] = 'x';
        return false;
    } else {
        return false;
    }
}


function drawBreak() {
    console.log('****************************************Game start***********************************************');
}

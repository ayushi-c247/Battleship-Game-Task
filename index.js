//initialize variables
let flag = 0;
let userBoardSize = prompt('What size would you like your grid to be?');
let enemyBoardSize = userBoardSize;
let userBoard = createGrid(userBoardSize);
let enemyBoard = createGrid(enemyBoardSize);
let userAttacks = 3;
let enemyAttacks = 3;
let enemyLocations = {};
printGrid(enemyBoard, true);
printGrid(userBoard);
gameSetup();


//game setup
function gameSetup() {
    for (let totalShip = 1; totalShip <= 1; totalShip++) {
        let x = prompt('Enter the x coordinate for your ship placement' + totalShip);
        let y = prompt('Enter the y coordinate for your ship placement' + totalShip);
        if (userBoardSize >= x && userBoardSize >= y) {
            let shipView = prompt('Enter "yes" if, you want ship vertically otherwise enter "no"');
            if (shipView.toLowerCase() === 'yes' && shipView !== " " && shipView.toLowerCase() !== "no") {
                placeCharacterVertical(x, y, 'O', userBoard);
            } else {
                placeCharacter(x, y, 'O', userBoard);
            }
            enemy('O', enemyBoard, enemyBoardSize);
            drawBreak();
            printGrid(enemyBoard, true);
            printGrid(userBoard);
        } else {
            alert('Your coordinate value is wrong please enter correct coordinate');
            // confirm('You want to continue! click ok');
            gameSetup();
        }
    }
}


//game loop
while (enemyAttacks > 0 && userAttacks > 0) {
    let x = prompt('Enter the x coordinate for your attack');
    let y = prompt('Enter the y coordinate for your attack');
    if (attack(x, y, enemyBoard)) {
        enemyAttacks--;
    }
    x = getRandomInt(userBoardSize);
    y = getRandomInt(userBoardSize);
    if (enemyAttacks > 0 && attack(x, y, userBoard)) {
        userAttacks--;
    }

    drawBreak();
    printGrid(enemyBoard, true);
    printGrid(userBoard);
}


//lose Win Result 
if (userAttacks < enemyAttacks) {
    console.log('Lose it all!');
} else {
    console.log('Victory!!!');
}


//CreateGrid
function createGrid(size) {
    let grid = [];
    for (let i = 0; i < size; i++) {
        grid[i] = [];
        for (let j = 0; j < size; j++) {
            grid[i][j] = '-';
        }
    }
    return grid;
}


//printGrid
function printGrid(grid, isEnemy = false) {
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

//
function createHeaders(size) {
    let result = '  ';
    for (let i = 0; i < size; i++) {
        result += i + ' ';
    }
    return result;
}


//horizontally ship view 
function placeCharacter(x, y, c, grid) {
    grid[parseInt(y)][parseInt(x)] = c;
    //left
    let leftRightShipPosition = prompt('"Enter "left" if you want left side and Enter "right" if you want right side  ');
    if (leftRightShipPosition.toLowerCase() === "left" && leftRightShipPosition.toLowerCase() !== "right" && leftRightShipPosition.toLowerCase() !== "") {
        grid[parseInt(y)][parseInt(x) - 1] = c;
        grid[parseInt(y)][parseInt(x) - 2] = c;
    }
    else {
        //right
        grid[parseInt(y)][parseInt(x) + 1] = c;
        grid[parseInt(y)][parseInt(x) + 2] = c;
    }
}

//vertically ship view 
function placeCharacterVertical(x, y, c, grid) {
    grid[parseInt(x)][parseInt(y)] = c;

    //Up
    let upDownShipPosition = prompt('"Enter "Up" if you want up side and Enter "Down" if you want Down side  ');
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
function enemy(c, grid, max) {
    let didPlace = false;
    while (!didPlace) {
        let x = prompt('Enter the x coordinate for your ship placement of enemy');
        let y = prompt('Enter the y coordinate for your ship placement of enemy');
        if (!enemyLocations[`${x}-${y}`]) {
            if (enemyBoardSize >= x && enemyBoardSize >= y) {
                let userShipView = prompt('Enter "yes" if, you want ship vertically otherwise enter "no"');
                if (userShipView.toLowerCase() === 'yes' && userShipView !== " " && userShipView.toLowerCase() !== "no") {
                    placeCharacterVertical(x, y, c, grid);
                } else {
                    placeCharacter(x, y, c, grid);
                }
            } else {
                alert('Your coordinate value is wrong please enter correct coordinate');
                enemy('O', enemyBoard, enemyBoardSize);
            }
            //placeCharacter(x, y, c, grid);
            didPlace = true;
            enemyLocations[`${x}-${y}`] = true;
        }
    }
}

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


//result
function drawBreak() {
    console.log('****************************************Game Result***********************************************');
}

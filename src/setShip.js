const readlineSync = require('readline-sync');
const { gameSetup } = require('./index');
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
            // placeCharacter(x, y, c, grid);
        }
        else {
            console.log("alter!! your ship value goes out of board!! Please select coordinate again!");
            placeCharacter(x, y, c, grid);
        }
    }
}


//vertically ship view 
function placeCharacterVertical(x, y, c, grid) {

    //Up
    let upDownShipPosition = readlineSync.question('"Enter "Up" if you want up side and Enter "Down" if you want Down side  ');
    if (upDownShipPosition.toLowerCase() === "up" && upDownShipPosition.toLowerCase() !== "down" && upDownShipPosition.toLowerCase() !== "") {
        grid[parseInt(x)][parseInt(y)] = c;
        grid[parseInt(x) - 1][parseInt(y)] = c;
        grid[parseInt(x) - 2][parseInt(y)] = c;
    } else {
        //down
        grid[parseInt(x)][parseInt(y)] = c;
        grid[parseInt(x) + 1][parseInt(y)] = c;
        grid[parseInt(x) + 2][parseInt(y)] = c;
    }
}

module.exports = { placeCharacterVertical, placeCharacter }

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

//create columns
function createHeaders(size) {
    let result = '  ';
    for (let i = 0; i < size; i++) {
        result += i + ' ';
    }
    return result;
}

//display board
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

module.exports = { createBoard, displayGrid, createHeaders }
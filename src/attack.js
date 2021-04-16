
module.exports = function attack(x, y, grid) {
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



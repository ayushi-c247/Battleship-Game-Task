module.exports = function attack(x, y, grid) {
  if (grid[x][y] === 'O') {
    grid[x][y] = '!';
    return true;
  } else if (grid[x][y] === '-') {
    grid[x][y] = 'x';
    return false;
  } else {
    return false;
  }
};

const columnHeading = require('./utils/columnHeading');

//displaying boards
module.exports = function displayGrid(grid,isEnemy=false) {
  const columns = columnHeading(grid.length);
  console.log(columns);
  for (let i = 0; i < grid.length; i++) {
    let rows = `${i} `;
   
    for (let cell of grid[i]) {
      if (cell === 'O'&& isEnemy ) {
        rows += '- ';
      } else {
        rows += `${cell} `;
      }
    }
    console.log(rows);
    
  }
};

const columnHeading = require("./columnHeading");

//displaying boards
module.exports = function displayGrid(grid) {
  const columns = columnHeading(grid.length);
  console.log(columns);
  for (let i = 0; i < grid.length; i++) {
    let rows = `${i} `;
    for (let cell of grid[i]) {
      if (cell === "ship") {
        rows += "- ";
      } else {
        rows += `${cell} `;
      }
    }
    console.log(rows);
  }
};

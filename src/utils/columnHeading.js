//Display column number on top
module.exports = function columnHeading(size) {
  let result = "  ";
  for (let i = 0; i < size; i++) {
    result += `${i} `;
  }
  return result;
};

const columnHeadingTest = require('./columnHeadingTest');
const getRandomIntTest = require('./randomTest');
const drawBreakTest = require('./DrawBreakTest');
describe('Battleship unit test cases', () => {
  // Get Random Integer function test
  getRandomIntTest();
  // Drawbrack  function test
  drawBreakTest();
  // columnHeading  function test
  columnHeadingTest();
});

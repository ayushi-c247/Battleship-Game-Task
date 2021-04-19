const columnHeadingTest = require('./columnHeading.test');
const getRandomIntTest = require('./Random.test');
const drawBreakTest = require('./DrawBreak.test');
describe('Battleship unit test cases', () => {
  // Get Random Integer function test
  getRandomIntTest();
  // Drawbreak  function test
  drawBreakTest();
  // columnHeading  function test
  columnHeadingTest();
});

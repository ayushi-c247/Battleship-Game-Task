const columnHeadingTest = require('./columnHeading.test');
const getRandomIntTest = require('./random.test');
const drawBreakTest = require('./drawBreak.test');
const createBoardTest = require('./createBoard.test');
const attackTest = require('./attack.test');


describe('Battleship unit test cases', () => {
  // Get Random Integer function test
  getRandomIntTest();
  // Drawbreak  function test
  drawBreakTest();
  // columnHeading  function test
  columnHeadingTest();
  //createBoard function test
  createBoardTest();
  //attack function test
  attackTest();
});


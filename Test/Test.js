const assert = require('assert');
const expect = require('chai').expect;
let { player1, player2 } = require('../src/Board');
let setShip = require('../src/SetShips');
let randomTurn = require('../src/RandomTurn');
const SetShipByUser = require('../src/SetShipByUser');
const userTurns = require('../src/UserTurns');

describe('Battleship unit test cases', () => {
  describe('player1 board and set ship', () => {
    it('should exist', () => {
      expect(player1.setShipForPlayer1).to.exist;
    });
    it('it should return 1 when player1 set ship ', () => {
      assert.equal(1, player1.setShipForPlayer1(2, 3));
    });
    it('it should return length 8 when player1 set board', () => {
      assert.equal(8, player1.board.length);
    });
  });
  describe('player2 board and set ship', () => {
    it('should exist', () => {
      expect(player1.setShipForPlayer1).to.exist;
    });
    it('it should return 1 when player2 set ship', () => {
      assert.equal(1, player2.setShipForPlayer2(5, 3));
    });
    it('it should return length 8 when player2 set board', () => {
      assert.equal(8, player2.board.length);
    });
  });
  // describe('Set Ship function', () => {
  //   it('should exist', () => {
  //     expect(setShip).to.exist;
  //   });
  //   it('Should be a function', () => {
  //     expect(setShip).to.be.a('function');
  //   });
  // });
  describe('Set Ship By user function', () => {
    it('should exist', () => {
      expect(SetShipByUser).to.exist;
    });
    it('Should be a function', () => {
      expect(SetShipByUser).to.be.a('function');
    });
  });
  describe('User turns function', () => {
    it('should exist', () => {
      expect(userTurns).to.exist;
    });
    it('Should be a function', () => {
      expect(userTurns).to.be.a('function');
    });
  });
  // describe('Random turns function', () => {
  //   it('should exist', () => {
  //     expect(randomTurn).to.exist;
  //   });
  //   it('Should be a function', () => {
  //     expect(randomTurn).to.be.a('function');
  //   });
  // });
});

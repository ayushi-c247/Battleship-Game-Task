const assert = require('assert');
const expect = require('chai').expect;
const createBoard = require('../src/createBoard');

const attack = require('../src/Attack');

module.exports = () => {
  describe('attack() function', () => {
    it('should exist', () => {
      expect(attack).to.exist;
    });
    it('it should not return false ', () => {
      let grid1 = createBoard(8);
      grid1[2][2] = '-';
      assert.strictEqual(false, attack(2, 2, grid1));
    });
    it('it should return length true ', () => {
      let grid2 = createBoard(8);
      grid2[3][3] = 'O';
      assert.strictEqual(true, attack(3, 3, grid2));
    });
    it('it should return false when no condition match ', () => {
      let grid3 = createBoard(8);
      grid3[2][3] = '';
      assert.strictEqual(false, attack(2, 3, grid3));
    });
    it('Should be a function', () => {
      expect(attack).to.be.a('function');
    });
  });
};

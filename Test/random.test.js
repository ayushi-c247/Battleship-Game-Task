const assert = require('assert');
const expect = require('chai').expect;
const getRandomInt = require('../src/utils/random');
module.exports = () => {
  describe('getRandomInt() function', () => {
    it('should exist', () => {
      expect(getRandomInt).to.exist;
    });
    it('it should not return -1 when give positive integer ', () => {
      assert.notStrictEqual(-1, getRandomInt(5));
    });
    it('it should return length 1 ', () => {
      assert.equal(1, getRandomInt.length);
    });
    it('it should not return 5 when max input is 5 ', () => {
      assert.notStrictEqual(5, getRandomInt(5));
    });
    it('Should be a function', () => {
      expect(getRandomInt).to.be.a('function');
    });
  });
};

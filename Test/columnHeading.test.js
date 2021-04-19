const assert = require('assert');
const expect = require('chai').expect;
const columnHeading = require('../src/utils/columnHeading');
module.exports = () => {
  describe('columnHeading() function', () => {
    // beforeEach(function () {
    //   this.sinon.stub(console, 'log');
    // });
    it('should exist', () => {
      expect(columnHeading).to.exist;
    });
    it('it should not return -1 ', () => {
      assert.notStrictEqual(-1, columnHeading(5));
    });
    it('it should return length 1 ', () => {
      assert.equal(1, columnHeading.length);
    });
    it('it should return length 12 ', () => {
      assert.equal(12, columnHeading(5).length);
    });
    it('Should be a function', () => {
      expect(columnHeading).to.be.a('function');
    });
  });
};

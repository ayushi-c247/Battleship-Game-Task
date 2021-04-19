const assert = require('assert');
const expect = require('chai').expect;
require('mocha-sinon');
const drawBreak = require('../src/utils/drawBreak');

module.exports = () => {
  describe('drawBreak() function', () => {
    beforeEach(function () {
      this.sinon.stub(console, 'log');
    });
    it('should exist', () => {
      expect(drawBreak).to.exist;
    });
    it('it should return ', () => {
      drawBreak();
      expect(console.log.calledOnce).to.be.true;
  
    });
    it('it should return length 0 ', () => {
      assert.equal(0, drawBreak.length);
    });
    it('Should be a function', () => {
      expect(drawBreak).to.be.a('function');
    });
  });
};

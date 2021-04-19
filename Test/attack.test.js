const assert = require('assert');
const expect = require('chai').expect;
require('mocha-sinon');
const attack = require('../src/attack');
const createBoard = require('../src/createBoard');

const grid = createBoard(8);
module.exports = () => {
    describe('attack() function', () => {
      it('should exist', () => {
        expect(attack).to.exist;
      });
      it('it should return true ', () => {
        assert.equal(false, attack(4,4,grid));
      });
      
  
    })};
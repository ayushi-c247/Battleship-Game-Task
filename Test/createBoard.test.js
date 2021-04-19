const assert = require('assert');
const expect = require('chai').expect;
const createBoard = require('../src/createBoard');
// const createBoard = require('../src/createBoard');

const grid = createBoard(8);

module.exports = () => {
    describe('createBoard() function', () => {
        it('should exist', () => {
            expect(createBoard).to.exist;
          });
          it('it should return false', () => {
            assert.equal(false, createBoard(-8));
          });
          it('it should return true ', () => {
            assert.equal(grid.length,createBoard(8).length);
          });

        })};
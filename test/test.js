const utils = require('./utils');
// const map = require('./../maps');
// const player = require('./../player');
// const overlay = require('./../overlay');
// const enemies = require('./../enemy');

// Need to figure out how to run index.html to test values in the game

var assert = require('assert');

describe('Array', function () {
  describe('#indexOf()', function () {
    it('should have a map.js file', () => {
      const map = require('./../map.js');
      assert(map);
    })

    // Breaks on p5 not defined
    // it('should have a player.js file', () => {
    //   const player = require('./../player.js');

    //   assert(player);
    // })

    it('should have an overlay.js file', () => {
      const overlay = require('./../overlay.js');
      assert(overlay);
    })

    it('should have an enemies.js file', () => {
      const enemies = require('./../enemies.js');
      assert(enemies);
    })

    // pending test below
    it('Test requirement pending');
  });
});
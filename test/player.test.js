//import Player from '../src/Player'
import Ship from '../src/Ship'
//var player = require('../src/Player');
let ship = new Ship(["c01","c02","c03"])
 
test('Test player to create new player',()=>{
    expect('Ship').toBe(typeof ship)
})
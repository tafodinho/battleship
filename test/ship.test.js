/* eslint-disable no-undef */
import Ship from '../src/Ship';

test('Test if ship is hit', () => {
  const ship = new Ship([0, 1, 2]);
  expect(typeof ship.isHit(0)).toBe('boolean');
  expect(ship.isHit(0)).toBe(true);
});

test('when ship is not hit', () => {
  const ship = new Ship([0, 1, 2]);
  expect(typeof ship.isHit(0)).toBe('boolean');
  expect(ship.isHit(3)).toBe(false);
});

test('if ship is sunk', () => {
  const ship = new Ship([0, 1]);
  ship.isHit(0);
  ship.isHit(1);
  expect(typeof ship.isSunk()).toBe('boolean');
  expect(ship.isSunk()).toBe(true);
});

test('test when ship is not sunk', () => {
  const ship = new Ship([2, 3, 4]);
  ship.isHit(2);
  ship.isHit(4);
  expect(typeof ship.isSunk()).toBe('boolean');
  expect(ship.isSunk()).toBe(false);
});

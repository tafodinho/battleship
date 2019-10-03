/* eslint-disable no-plusplus */
/* eslint-disable no-use-before-define */
import Ship from './Ship';

const markHitLocation = (hitSpot, board) => board.receiveStrike(hitSpot);

const clearMessage = () => {
  setInterval(() => {
    const messageArea = document.getElementById('message');
    messageArea.innerHTML = '';
  }, 10000);
};

const displayBoard = (board, parent) => {
  board.renderBoard(parent);
};

const generateSpot = (board) => {
  let spot = '';
  do {
    const firstDigit = Math.floor(Math.random() * 10);
    const secondDigit = Math.floor(Math.random() * 10);
    spot = `p${firstDigit}${secondDigit}`;
  } while (board.isPositionTaken(spot));
  return spot;
};
const generateShips = (owner) => {
  const ships = [];
  // genereate two ships with length 4
  for (let i = 0; i < 2; i++) {
    ships.push(createAShip(4, owner, 'horizontal', ships));
  }
  // genereate three ships with length 3
  for (let i = 0; i < 2; i++) {
    ships.push(createAShip(3, owner, null, ships));
  }
  // genereate 2 ships with length 2
  for (let i = 0; i < 2; i++) {
    ships.push(createAShip(2, owner, 'horizontal', ships));
  }
  // genereate 4 ships with length 1
  for (let i = 0; i < 3; i++) {
    ships.push(createAShip(1, owner, null, ships));
  }
  return ships;
};

const createAShip = (lengthOfShip, owner, orientation, ships) => {
  const location = [];
  let firstDigit = null;
  let secondDigit = null;
  let spot = '';
  while (location.length < lengthOfShip) {
    if (orientation === 'horizontal') {
      if (location.length === 0) {
        do {
          secondDigit = Math.floor(Math.random() * 10);
        } while (secondDigit + lengthOfShip > 8);
        firstDigit = Math.floor(Math.random() * 10);
      } else {
        secondDigit += 1;
      }
    } else if (location.length === 0) {
      do {
        firstDigit = Math.floor(Math.random() * 10);
      } while (firstDigit + lengthOfShip > 8);
      secondDigit = Math.floor(Math.random() * 10);
    } else {
      firstDigit += 1;
    }
    spot = owner + firstDigit + secondDigit;
    location.push(spot);
  }
  return checkSuperImposition(ships, new Ship(location), lengthOfShip, owner, orientation);
};
const checkSuperImposition = (ships, ship, lengthOfShip, owner, orientation) => {
  let imposition = 0;
  if (ships.length > 0) {
    ships.forEach((currentValue) => {
      imposition = currentValue.location.filter((element) => ship.location.includes(element));
    });
  }
  // eslint-disable-next-line eqeqeq
  if (imposition === 0) {
    return ship;
  }
  return createAShip(lengthOfShip, owner, orientation, ships);
};

export {
  displayBoard,
  markHitLocation,
  clearMessage,
  generateSpot,
  createAShip,
  checkSuperImposition,
  generateShips,
};

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/GameBoard.js":
/*!**************************!*\
  !*** ./src/GameBoard.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* eslint-disable class-methods-use-this */
/* eslint-disable no-else-return */
/* eslint-disable no-param-reassign */
class GameBoard {
  constructor(ships, owner) {
    this.grid = new Array(100);
    this.numRows = 10;
    this.numColumns = 10;
    this.owner = owner;
    this.visitedCells = [];
    this.damagedShips = 0;
    this.locationsTaken = [];
    this.ships = ships;
  }

  setShipsPosition(ship, location) {
    ship.location = location;
    this.ships.push(ship);
  }

  isAllShipSunk() {
    let count = 0;
    this.ships.forEach((ship) => {
      if (ship.isSunk()) {
        count += 1;
      }
    });
    if (count >= this.ships.length) {
      return true;
    }
    return false;
  }

  receiveStrike(spot) {
    let hit = false;
    if (!this.isAllShipSunk()) {
      if (!this.isPositionTaken(spot)) {
        this.visitedCells.push(spot);
        this.ships.forEach((ship) => {
          if (ship.isHit(spot)) {
            hit = true;
            const hitSpot = document.getElementById(spot);
            hitSpot.setAttribute('class', 'hit-spot');
            if (ship.isSunk()) {
              this.displayMessage(`One ${this.owner} ship destroyed`);
              if (this.isAllShipSunk()) {
                this.displayMessage(`Game over all ships destroyed ${this.owner} wins`);
              }
            }
          }
        });
        if (!hit) {
          const location = document.getElementById(spot);
          location.innerHTML = 'X';
        }
        return true;
      }
      this.displayMessage('choose another spot');
      return false;
    } else {
      this.displayMessage(`Game over all ships destroyed ${this.owner} wins`);
      return false;
    }
  }

  isPositionTaken(position) {
    if (this.visitedCells.includes(position)) {
      return true;
    }
    return false;
  }

  isPlacementSpotTaken(spot) {
    if (this.locationsTaken.includes(spot)) {
      return true;
    }
    return false;
  }

  renderBoard(parent) {
    for (let i = 0; i < this.numRows; i += 1) {
      const row = document.createElement('tr');
      row.setAttribute('id', `row-${i}`);
      row.setAttribute('class', 'row');
      for (let j = 0; j < this.numColumns; j += 1) {
        const box = document.createElement('td');
        box.setAttribute('id', `${this.owner}${i}${j}`);
        box.setAttribute('class', 'box');
        row.appendChild(box);
      }
      parent.appendChild(row);
    }

    if (this.owner === 'p') {
      this.ships.forEach((ship) => {
        this.placeShip(ship);
      });
    }
  }

  placeShip(ship) {
    for (let i = 0; i < ship.location.length; i += 1) {
      const box = document.getElementById(ship.location[i]);
      box.setAttribute('class', 'box-ship');
    }
  }

  displayMessage(message) {
    const messageArea = document.getElementById('message');
    messageArea.innerHTML = message;
  }
}
/* harmony default export */ __webpack_exports__["default"] = (GameBoard);


/***/ }),

/***/ "./src/Ship.js":
/*!*********************!*\
  !*** ./src/Ship.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Ship {
  constructor(location) {
    this.location = location;
    this.length = location.length;
    this.hits = 0;
  }

  isHit(position) {
    if (this.location.includes(position)) {
      this.hits += 1;
      return true;
    }
    return false;
  }

  isSunk() {
    if (this.hits >= this.location.length) {
      return true;
    }
    return false;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Ship);


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GameBoard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameBoard */ "./src/GameBoard.js");
/* harmony import */ var _ultility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ultility */ "./src/ultility.js");
/* eslint-disable no-restricted-globals */



const reset = document.getElementById('reset');


const computerShips = Object(_ultility__WEBPACK_IMPORTED_MODULE_1__["generateShips"])('c');
const playerShips = Object(_ultility__WEBPACK_IMPORTED_MODULE_1__["generateShips"])('p');
const playerParent = document.getElementById('player1-board');
const computerParent = document.getElementById('player2-board');
const container = document.getElementById('container');
const playerBoard = new _GameBoard__WEBPACK_IMPORTED_MODULE_0__["default"](playerShips, 'p');
const computerBoard = new _GameBoard__WEBPACK_IMPORTED_MODULE_0__["default"](computerShips, 'c');

Object(_ultility__WEBPACK_IMPORTED_MODULE_1__["displayBoard"])(playerBoard, playerParent);
Object(_ultility__WEBPACK_IMPORTED_MODULE_1__["displayBoard"])(computerBoard, computerParent);


container.addEventListener('click', (e) => {
  if (Object(_ultility__WEBPACK_IMPORTED_MODULE_1__["markHitLocation"])(e.target.id, computerBoard)) {
    Object(_ultility__WEBPACK_IMPORTED_MODULE_1__["markHitLocation"])(Object(_ultility__WEBPACK_IMPORTED_MODULE_1__["generateSpot"])(playerBoard), playerBoard);
  }
});

reset.addEventListener('click', () => {
  location.reload();
});


/***/ }),

/***/ "./src/ultility.js":
/*!*************************!*\
  !*** ./src/ultility.js ***!
  \*************************/
/*! exports provided: displayBoard, markHitLocation, clearMessage, generateSpot, createAShip, checkSuperImposition, generateShips */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "displayBoard", function() { return displayBoard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "markHitLocation", function() { return markHitLocation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearMessage", function() { return clearMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateSpot", function() { return generateSpot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createAShip", function() { return createAShip; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkSuperImposition", function() { return checkSuperImposition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateShips", function() { return generateShips; });
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ "./src/Ship.js");
/* eslint-disable no-plusplus */
/* eslint-disable no-use-before-define */


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
  return checkSuperImposition(ships, new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"](location), lengthOfShip, owner, orientation);
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




/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dhbWVCb2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvU2hpcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VsdGlsaXR5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsV0FBVztBQUNwRDtBQUNBLHFFQUFxRSxXQUFXO0FBQ2hGO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLDJEQUEyRCxXQUFXO0FBQ3RFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGtCQUFrQjtBQUNyQztBQUNBLG9DQUFvQyxFQUFFO0FBQ3RDO0FBQ0EscUJBQXFCLHFCQUFxQjtBQUMxQztBQUNBLGtDQUFrQyxXQUFXLEVBQUUsRUFBRSxFQUFFLEVBQUU7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQiwwQkFBMEI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNlLHdFQUFTLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUNoSHpCO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVlLG1FQUFJLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUN2QnBCO0FBQUE7QUFBQTtBQUFBO0FBQ29DO0FBTWhCOztBQUVwQjs7O0FBR0Esc0JBQXNCLCtEQUFhO0FBQ25DLG9CQUFvQiwrREFBYTtBQUNqQztBQUNBO0FBQ0E7QUFDQSx3QkFBd0Isa0RBQVM7QUFDakMsMEJBQTBCLGtEQUFTOztBQUVuQyw4REFBWTtBQUNaLDhEQUFZOzs7QUFHWjtBQUNBLE1BQU0saUVBQWU7QUFDckIsSUFBSSxpRUFBZSxDQUFDLDhEQUFZO0FBQ2hDO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ2hDRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQzBCOztBQUUxQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsV0FBVyxFQUFFLFlBQVk7QUFDeEMsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsT0FBTztBQUN4QjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsT0FBTztBQUN4QjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsT0FBTztBQUN4QjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsT0FBTztBQUN4QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5Qyw2Q0FBSTtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBVUUiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiLyogZXNsaW50LWRpc2FibGUgY2xhc3MtbWV0aG9kcy11c2UtdGhpcyAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tZWxzZS1yZXR1cm4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG5jbGFzcyBHYW1lQm9hcmQge1xuICBjb25zdHJ1Y3RvcihzaGlwcywgb3duZXIpIHtcbiAgICB0aGlzLmdyaWQgPSBuZXcgQXJyYXkoMTAwKTtcbiAgICB0aGlzLm51bVJvd3MgPSAxMDtcbiAgICB0aGlzLm51bUNvbHVtbnMgPSAxMDtcbiAgICB0aGlzLm93bmVyID0gb3duZXI7XG4gICAgdGhpcy52aXNpdGVkQ2VsbHMgPSBbXTtcbiAgICB0aGlzLmRhbWFnZWRTaGlwcyA9IDA7XG4gICAgdGhpcy5sb2NhdGlvbnNUYWtlbiA9IFtdO1xuICAgIHRoaXMuc2hpcHMgPSBzaGlwcztcbiAgfVxuXG4gIHNldFNoaXBzUG9zaXRpb24oc2hpcCwgbG9jYXRpb24pIHtcbiAgICBzaGlwLmxvY2F0aW9uID0gbG9jYXRpb247XG4gICAgdGhpcy5zaGlwcy5wdXNoKHNoaXApO1xuICB9XG5cbiAgaXNBbGxTaGlwU3VuaygpIHtcbiAgICBsZXQgY291bnQgPSAwO1xuICAgIHRoaXMuc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgaWYgKHNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgY291bnQgKz0gMTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoY291bnQgPj0gdGhpcy5zaGlwcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZWNlaXZlU3RyaWtlKHNwb3QpIHtcbiAgICBsZXQgaGl0ID0gZmFsc2U7XG4gICAgaWYgKCF0aGlzLmlzQWxsU2hpcFN1bmsoKSkge1xuICAgICAgaWYgKCF0aGlzLmlzUG9zaXRpb25UYWtlbihzcG90KSkge1xuICAgICAgICB0aGlzLnZpc2l0ZWRDZWxscy5wdXNoKHNwb3QpO1xuICAgICAgICB0aGlzLnNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgICAgICBpZiAoc2hpcC5pc0hpdChzcG90KSkge1xuICAgICAgICAgICAgaGl0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnN0IGhpdFNwb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzcG90KTtcbiAgICAgICAgICAgIGhpdFNwb3Quc2V0QXR0cmlidXRlKCdjbGFzcycsICdoaXQtc3BvdCcpO1xuICAgICAgICAgICAgaWYgKHNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5TWVzc2FnZShgT25lICR7dGhpcy5vd25lcn0gc2hpcCBkZXN0cm95ZWRgKTtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuaXNBbGxTaGlwU3VuaygpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5TWVzc2FnZShgR2FtZSBvdmVyIGFsbCBzaGlwcyBkZXN0cm95ZWQgJHt0aGlzLm93bmVyfSB3aW5zYCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIWhpdCkge1xuICAgICAgICAgIGNvbnN0IGxvY2F0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc3BvdCk7XG4gICAgICAgICAgbG9jYXRpb24uaW5uZXJIVE1MID0gJ1gnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgdGhpcy5kaXNwbGF5TWVzc2FnZSgnY2hvb3NlIGFub3RoZXIgc3BvdCcpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRpc3BsYXlNZXNzYWdlKGBHYW1lIG92ZXIgYWxsIHNoaXBzIGRlc3Ryb3llZCAke3RoaXMub3duZXJ9IHdpbnNgKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBpc1Bvc2l0aW9uVGFrZW4ocG9zaXRpb24pIHtcbiAgICBpZiAodGhpcy52aXNpdGVkQ2VsbHMuaW5jbHVkZXMocG9zaXRpb24pKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaXNQbGFjZW1lbnRTcG90VGFrZW4oc3BvdCkge1xuICAgIGlmICh0aGlzLmxvY2F0aW9uc1Rha2VuLmluY2x1ZGVzKHNwb3QpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmVuZGVyQm9hcmQocGFyZW50KSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm51bVJvd3M7IGkgKz0gMSkge1xuICAgICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcbiAgICAgIHJvdy5zZXRBdHRyaWJ1dGUoJ2lkJywgYHJvdy0ke2l9YCk7XG4gICAgICByb3cuc2V0QXR0cmlidXRlKCdjbGFzcycsICdyb3cnKTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5udW1Db2x1bW5zOyBqICs9IDEpIHtcbiAgICAgICAgY29uc3QgYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcbiAgICAgICAgYm94LnNldEF0dHJpYnV0ZSgnaWQnLCBgJHt0aGlzLm93bmVyfSR7aX0ke2p9YCk7XG4gICAgICAgIGJveC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2JveCcpO1xuICAgICAgICByb3cuYXBwZW5kQ2hpbGQoYm94KTtcbiAgICAgIH1cbiAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChyb3cpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm93bmVyID09PSAncCcpIHtcbiAgICAgIHRoaXMuc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgICB0aGlzLnBsYWNlU2hpcChzaGlwKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHBsYWNlU2hpcChzaGlwKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxvY2F0aW9uLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBib3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzaGlwLmxvY2F0aW9uW2ldKTtcbiAgICAgIGJveC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2JveC1zaGlwJyk7XG4gICAgfVxuICB9XG5cbiAgZGlzcGxheU1lc3NhZ2UobWVzc2FnZSkge1xuICAgIGNvbnN0IG1lc3NhZ2VBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lc3NhZ2UnKTtcbiAgICBtZXNzYWdlQXJlYS5pbm5lckhUTUwgPSBtZXNzYWdlO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBHYW1lQm9hcmQ7XG4iLCJjbGFzcyBTaGlwIHtcbiAgY29uc3RydWN0b3IobG9jYXRpb24pIHtcbiAgICB0aGlzLmxvY2F0aW9uID0gbG9jYXRpb247XG4gICAgdGhpcy5sZW5ndGggPSBsb2NhdGlvbi5sZW5ndGg7XG4gICAgdGhpcy5oaXRzID0gMDtcbiAgfVxuXG4gIGlzSGl0KHBvc2l0aW9uKSB7XG4gICAgaWYgKHRoaXMubG9jYXRpb24uaW5jbHVkZXMocG9zaXRpb24pKSB7XG4gICAgICB0aGlzLmhpdHMgKz0gMTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpc1N1bmsoKSB7XG4gICAgaWYgKHRoaXMuaGl0cyA+PSB0aGlzLmxvY2F0aW9uLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTaGlwO1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tcmVzdHJpY3RlZC1nbG9iYWxzICovXG5pbXBvcnQgR2FtZUJvYXJkIGZyb20gJy4vR2FtZUJvYXJkJztcbmltcG9ydCB7XG4gIG1hcmtIaXRMb2NhdGlvbixcbiAgZGlzcGxheUJvYXJkLFxuICBnZW5lcmF0ZVNwb3QsXG4gIGdlbmVyYXRlU2hpcHMsXG59IGZyb20gJy4vdWx0aWxpdHknO1xuXG5jb25zdCByZXNldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNldCcpO1xuXG5cbmNvbnN0IGNvbXB1dGVyU2hpcHMgPSBnZW5lcmF0ZVNoaXBzKCdjJyk7XG5jb25zdCBwbGF5ZXJTaGlwcyA9IGdlbmVyYXRlU2hpcHMoJ3AnKTtcbmNvbnN0IHBsYXllclBhcmVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXIxLWJvYXJkJyk7XG5jb25zdCBjb21wdXRlclBhcmVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXIyLWJvYXJkJyk7XG5jb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJyk7XG5jb25zdCBwbGF5ZXJCb2FyZCA9IG5ldyBHYW1lQm9hcmQocGxheWVyU2hpcHMsICdwJyk7XG5jb25zdCBjb21wdXRlckJvYXJkID0gbmV3IEdhbWVCb2FyZChjb21wdXRlclNoaXBzLCAnYycpO1xuXG5kaXNwbGF5Qm9hcmQocGxheWVyQm9hcmQsIHBsYXllclBhcmVudCk7XG5kaXNwbGF5Qm9hcmQoY29tcHV0ZXJCb2FyZCwgY29tcHV0ZXJQYXJlbnQpO1xuXG5cbmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gIGlmIChtYXJrSGl0TG9jYXRpb24oZS50YXJnZXQuaWQsIGNvbXB1dGVyQm9hcmQpKSB7XG4gICAgbWFya0hpdExvY2F0aW9uKGdlbmVyYXRlU3BvdChwbGF5ZXJCb2FyZCksIHBsYXllckJvYXJkKTtcbiAgfVxufSk7XG5cbnJlc2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBsb2NhdGlvbi5yZWxvYWQoKTtcbn0pO1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tcGx1c3BsdXMgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVzZS1iZWZvcmUtZGVmaW5lICovXG5pbXBvcnQgU2hpcCBmcm9tICcuL1NoaXAnO1xuXG5jb25zdCBtYXJrSGl0TG9jYXRpb24gPSAoaGl0U3BvdCwgYm9hcmQpID0+IGJvYXJkLnJlY2VpdmVTdHJpa2UoaGl0U3BvdCk7XG5cbmNvbnN0IGNsZWFyTWVzc2FnZSA9ICgpID0+IHtcbiAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgIGNvbnN0IG1lc3NhZ2VBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lc3NhZ2UnKTtcbiAgICBtZXNzYWdlQXJlYS5pbm5lckhUTUwgPSAnJztcbiAgfSwgMTAwMDApO1xufTtcblxuY29uc3QgZGlzcGxheUJvYXJkID0gKGJvYXJkLCBwYXJlbnQpID0+IHtcbiAgYm9hcmQucmVuZGVyQm9hcmQocGFyZW50KTtcbn07XG5cbmNvbnN0IGdlbmVyYXRlU3BvdCA9IChib2FyZCkgPT4ge1xuICBsZXQgc3BvdCA9ICcnO1xuICBkbyB7XG4gICAgY29uc3QgZmlyc3REaWdpdCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBjb25zdCBzZWNvbmREaWdpdCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBzcG90ID0gYHAke2ZpcnN0RGlnaXR9JHtzZWNvbmREaWdpdH1gO1xuICB9IHdoaWxlIChib2FyZC5pc1Bvc2l0aW9uVGFrZW4oc3BvdCkpO1xuICByZXR1cm4gc3BvdDtcbn07XG5jb25zdCBnZW5lcmF0ZVNoaXBzID0gKG93bmVyKSA9PiB7XG4gIGNvbnN0IHNoaXBzID0gW107XG4gIC8vIGdlbmVyZWF0ZSB0d28gc2hpcHMgd2l0aCBsZW5ndGggNFxuICBmb3IgKGxldCBpID0gMDsgaSA8IDI7IGkrKykge1xuICAgIHNoaXBzLnB1c2goY3JlYXRlQVNoaXAoNCwgb3duZXIsICdob3Jpem9udGFsJywgc2hpcHMpKTtcbiAgfVxuICAvLyBnZW5lcmVhdGUgdGhyZWUgc2hpcHMgd2l0aCBsZW5ndGggM1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDI7IGkrKykge1xuICAgIHNoaXBzLnB1c2goY3JlYXRlQVNoaXAoMywgb3duZXIsIG51bGwsIHNoaXBzKSk7XG4gIH1cbiAgLy8gZ2VuZXJlYXRlIDIgc2hpcHMgd2l0aCBsZW5ndGggMlxuICBmb3IgKGxldCBpID0gMDsgaSA8IDI7IGkrKykge1xuICAgIHNoaXBzLnB1c2goY3JlYXRlQVNoaXAoMiwgb3duZXIsICdob3Jpem9udGFsJywgc2hpcHMpKTtcbiAgfVxuICAvLyBnZW5lcmVhdGUgNCBzaGlwcyB3aXRoIGxlbmd0aCAxXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgc2hpcHMucHVzaChjcmVhdGVBU2hpcCgxLCBvd25lciwgbnVsbCwgc2hpcHMpKTtcbiAgfVxuICByZXR1cm4gc2hpcHM7XG59O1xuXG5jb25zdCBjcmVhdGVBU2hpcCA9IChsZW5ndGhPZlNoaXAsIG93bmVyLCBvcmllbnRhdGlvbiwgc2hpcHMpID0+IHtcbiAgY29uc3QgbG9jYXRpb24gPSBbXTtcbiAgbGV0IGZpcnN0RGlnaXQgPSBudWxsO1xuICBsZXQgc2Vjb25kRGlnaXQgPSBudWxsO1xuICBsZXQgc3BvdCA9ICcnO1xuICB3aGlsZSAobG9jYXRpb24ubGVuZ3RoIDwgbGVuZ3RoT2ZTaGlwKSB7XG4gICAgaWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgIGlmIChsb2NhdGlvbi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgZG8ge1xuICAgICAgICAgIHNlY29uZERpZ2l0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICB9IHdoaWxlIChzZWNvbmREaWdpdCArIGxlbmd0aE9mU2hpcCA+IDgpO1xuICAgICAgICBmaXJzdERpZ2l0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2Vjb25kRGlnaXQgKz0gMTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGxvY2F0aW9uLmxlbmd0aCA9PT0gMCkge1xuICAgICAgZG8ge1xuICAgICAgICBmaXJzdERpZ2l0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgfSB3aGlsZSAoZmlyc3REaWdpdCArIGxlbmd0aE9mU2hpcCA+IDgpO1xuICAgICAgc2Vjb25kRGlnaXQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpcnN0RGlnaXQgKz0gMTtcbiAgICB9XG4gICAgc3BvdCA9IG93bmVyICsgZmlyc3REaWdpdCArIHNlY29uZERpZ2l0O1xuICAgIGxvY2F0aW9uLnB1c2goc3BvdCk7XG4gIH1cbiAgcmV0dXJuIGNoZWNrU3VwZXJJbXBvc2l0aW9uKHNoaXBzLCBuZXcgU2hpcChsb2NhdGlvbiksIGxlbmd0aE9mU2hpcCwgb3duZXIsIG9yaWVudGF0aW9uKTtcbn07XG5jb25zdCBjaGVja1N1cGVySW1wb3NpdGlvbiA9IChzaGlwcywgc2hpcCwgbGVuZ3RoT2ZTaGlwLCBvd25lciwgb3JpZW50YXRpb24pID0+IHtcbiAgbGV0IGltcG9zaXRpb24gPSAwO1xuICBpZiAoc2hpcHMubGVuZ3RoID4gMCkge1xuICAgIHNoaXBzLmZvckVhY2goKGN1cnJlbnRWYWx1ZSkgPT4ge1xuICAgICAgaW1wb3NpdGlvbiA9IGN1cnJlbnRWYWx1ZS5sb2NhdGlvbi5maWx0ZXIoKGVsZW1lbnQpID0+IHNoaXAubG9jYXRpb24uaW5jbHVkZXMoZWxlbWVudCkpO1xuICAgIH0pO1xuICB9XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcWVxZXFcbiAgaWYgKGltcG9zaXRpb24gPT09IDApIHtcbiAgICByZXR1cm4gc2hpcDtcbiAgfVxuICByZXR1cm4gY3JlYXRlQVNoaXAobGVuZ3RoT2ZTaGlwLCBvd25lciwgb3JpZW50YXRpb24sIHNoaXBzKTtcbn07XG5cbmV4cG9ydCB7XG4gIGRpc3BsYXlCb2FyZCxcbiAgbWFya0hpdExvY2F0aW9uLFxuICBjbGVhck1lc3NhZ2UsXG4gIGdlbmVyYXRlU3BvdCxcbiAgY3JlYXRlQVNoaXAsXG4gIGNoZWNrU3VwZXJJbXBvc2l0aW9uLFxuICBnZW5lcmF0ZVNoaXBzLFxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=
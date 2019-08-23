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
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ "./src/Ship.js");


class GameBoard {
    
    constructor(ships, owner) {
        this.grid = new Array(100)
        this.numRows = 10
        this.numColumns = 10
        this.ships = ships
        this.owner = owner
        this.visitedCells = []
        this.damagedShips = 0
    }
    
    setShipsPosition(ship, location) {
        ship.location = location;
        this.ships.push(ship);
    }
    
    isAllShipSunk() {
        let count = 0
        this.ships.forEach(ship => {
            if(ship.isSunk()) {
                count++
            }
        });
        if(count >= this.ships.length) {
            return true
        } else {
            return false
        }
    }

    receiveStrike(position) {
        if(!this.isPositionTaken(position)) {
            this.visitedCells.push(position)
            return true
        } 
        return false
    }

    isPositionTaken(position) {
        if(this.visitedCells.includes(position)) {
            return true
        }
        return false
        
    }
    
}
/* harmony default export */ __webpack_exports__["default"] = (GameBoard);

/***/ }),

/***/ "./src/Player.js":
/*!***********************!*\
  !*** ./src/Player.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// import { isModuleSpecifier } from "@babel/types";

class Player {
    constructor(name, board) {
        this.name = name
        this.board = board
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Player);

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

    constructor(length, location) {
        this.length = length
        this.location = location
        this.hits = 0
    }

    isHit(position) {
        if(this.location.includes(position)) {
            this.hits++
            return true
        } 
        return false;
    }
    
    isSunk() {
        if(this.hits >= this.location.length) {
            return true
        }
        return false
    
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
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Ship */ "./src/Ship.js");
/* harmony import */ var _ultility__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ultility */ "./src/ultility.js");
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Player */ "./src/Player.js");





const playerParent = document.getElementById("player1-board")
const computerParent = document.getElementById("player2-board")
const playerShip1 = new _Ship__WEBPACK_IMPORTED_MODULE_1__["default"](3, ["p00", "p01", "p02"])
const playerShip2 = new _Ship__WEBPACK_IMPORTED_MODULE_1__["default"](3, ["p30", "p40", "p50"])
const cShip1 = new _Ship__WEBPACK_IMPORTED_MODULE_1__["default"](3, ["c00", "c01", "c02"])
const cShip2 = new _Ship__WEBPACK_IMPORTED_MODULE_1__["default"](3, ["c34", "c44", "c54"])
const playerBoard = new _GameBoard__WEBPACK_IMPORTED_MODULE_0__["default"]([playerShip1, playerShip2], "p")
const computerBoard = new _GameBoard__WEBPACK_IMPORTED_MODULE_0__["default"]([cShip1, cShip2], "c")
const player = new _Player__WEBPACK_IMPORTED_MODULE_3__["default"]("player", playerBoard)
const computer = new _Player__WEBPACK_IMPORTED_MODULE_3__["default"]("computer", computerBoard)

Object(_ultility__WEBPACK_IMPORTED_MODULE_2__["renderBoard"])(playerBoard, playerParent)

Object(_ultility__WEBPACK_IMPORTED_MODULE_2__["renderBoard"])(computerBoard, computerParent)

computerParent.addEventListener("click", (e) => {
    console.log(e.target.id)
    Object(_ultility__WEBPACK_IMPORTED_MODULE_2__["markHitLocation"])(e.target.id, computerBoard)
})

Object(_ultility__WEBPACK_IMPORTED_MODULE_2__["clearMessage"])()


/***/ }),

/***/ "./src/ultility.js":
/*!*************************!*\
  !*** ./src/ultility.js ***!
  \*************************/
/*! exports provided: renderBoard, markHitLocation, clearMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderBoard", function() { return renderBoard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "markHitLocation", function() { return markHitLocation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearMessage", function() { return clearMessage; });

const renderBoard = (board, parent) => {
    for(let i = 0; i < board.numRows; i++) {
        const row = document.createElement("tr")
        row.setAttribute("id", `row-${i}`)
        row.setAttribute("class", "row")
        for(let j = 0; j < board.numColumns; j++) {
            const box = document.createElement('td')
            box.setAttribute("id", `${board.owner}${i}${j}`)
            box.setAttribute("class", "box")
            row.appendChild(box)
        }
        parent.appendChild(row)
    }
    
    if(board.owner === "c") {

    } else {
        board.ships.forEach(ship => {
            placeShip(ship)
        });
    }
    
    
}

const placeShip = (ship) => {
    for(let i = 0; i < ship.location.length; i++) {
        const box = document.getElementById(ship.location[i])
        box.setAttribute("class", "box-ship")
    }
}

const markHitLocation = (hitSpot, board) => {
    if(board.isAllShipSunk()) {
        displayMessage("Game over all ships destroyed")
        return
    } else {
        if(board.receiveStrike(hitSpot)) {
            board.ships.forEach(ship => {
                if(ship.isHit(hitSpot)) {
                    const spot = document.getElementById(hitSpot)
                    spot.setAttribute("class", "hit-spot")
                    if(ship.isSunk()) {
                        displayMessage("One Enemy ship Destroyed")
                    }
                    throw BreakException
                }
            })
            const location = document.getElementById(hitSpot)
            location.innerHTML = "X"
        } else {
            displayMessage("play again")
        }
    }
    
}

const displayMessage = (message) => {
    const messageArea = document.getElementById("message")
    messageArea.innerHTML = message
}

const clearMessage = () => {
    setInterval(() => {
        const messageArea = document.getElementById("message")
        messageArea.innerHTML = ""
    }, 10000)
}





/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dhbWVCb2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUGxheWVyLmpzIiwid2VicGFjazovLy8uL3NyYy9TaGlwLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdWx0aWxpdHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQXlCOztBQUV6Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNlLHdFOzs7Ozs7Ozs7Ozs7QUNsRGY7QUFBQSxXQUFXLG9CQUFvQjs7QUFFL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVlLHFFOzs7Ozs7Ozs7Ozs7QUNUZjtBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRWUsbUU7Ozs7Ozs7Ozs7OztBQ3pCZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQW1DO0FBQ1Y7QUFDNkM7QUFDeEM7O0FBRTlCO0FBQ0E7QUFDQSx3QkFBd0IsNkNBQUk7QUFDNUIsd0JBQXdCLDZDQUFJO0FBQzVCLG1CQUFtQiw2Q0FBSTtBQUN2QixtQkFBbUIsNkNBQUk7QUFDdkIsd0JBQXdCLGtEQUFTO0FBQ2pDLDBCQUEwQixrREFBUztBQUNuQyxtQkFBbUIsK0NBQU07QUFDekIscUJBQXFCLCtDQUFNOztBQUUzQiw2REFBVzs7QUFFWCw2REFBVzs7QUFFWDtBQUNBO0FBQ0EsSUFBSSxpRUFBZTtBQUNuQixDQUFDOztBQUVELDhEQUFZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4Qlo7QUFDQSxrQkFBa0IsbUJBQW1CO0FBQ3JDO0FBQ0Esc0NBQXNDLEVBQUU7QUFDeEM7QUFDQSxzQkFBc0Isc0JBQXNCO0FBQzVDO0FBQ0Esc0NBQXNDLFlBQVksRUFBRSxFQUFFLEVBQUUsRUFBRTtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsU0FBUztBQUNUOzs7QUFHQTs7QUFFQTtBQUNBLGtCQUFrQiwwQkFBMEI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IFNoaXAgZnJvbSAnLi9TaGlwJ1xuXG5jbGFzcyBHYW1lQm9hcmQge1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKHNoaXBzLCBvd25lcikge1xuICAgICAgICB0aGlzLmdyaWQgPSBuZXcgQXJyYXkoMTAwKVxuICAgICAgICB0aGlzLm51bVJvd3MgPSAxMFxuICAgICAgICB0aGlzLm51bUNvbHVtbnMgPSAxMFxuICAgICAgICB0aGlzLnNoaXBzID0gc2hpcHNcbiAgICAgICAgdGhpcy5vd25lciA9IG93bmVyXG4gICAgICAgIHRoaXMudmlzaXRlZENlbGxzID0gW11cbiAgICAgICAgdGhpcy5kYW1hZ2VkU2hpcHMgPSAwXG4gICAgfVxuICAgIFxuICAgIHNldFNoaXBzUG9zaXRpb24oc2hpcCwgbG9jYXRpb24pIHtcbiAgICAgICAgc2hpcC5sb2NhdGlvbiA9IGxvY2F0aW9uO1xuICAgICAgICB0aGlzLnNoaXBzLnB1c2goc2hpcCk7XG4gICAgfVxuICAgIFxuICAgIGlzQWxsU2hpcFN1bmsoKSB7XG4gICAgICAgIGxldCBjb3VudCA9IDBcbiAgICAgICAgdGhpcy5zaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgICAgICAgaWYoc2hpcC5pc1N1bmsoKSkge1xuICAgICAgICAgICAgICAgIGNvdW50KytcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmKGNvdW50ID49IHRoaXMuc2hpcHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWNlaXZlU3RyaWtlKHBvc2l0aW9uKSB7XG4gICAgICAgIGlmKCF0aGlzLmlzUG9zaXRpb25UYWtlbihwb3NpdGlvbikpIHtcbiAgICAgICAgICAgIHRoaXMudmlzaXRlZENlbGxzLnB1c2gocG9zaXRpb24pXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9IFxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBpc1Bvc2l0aW9uVGFrZW4ocG9zaXRpb24pIHtcbiAgICAgICAgaWYodGhpcy52aXNpdGVkQ2VsbHMuaW5jbHVkZXMocG9zaXRpb24pKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICBcbiAgICB9XG4gICAgXG59XG5leHBvcnQgZGVmYXVsdCBHYW1lQm9hcmQiLCIvLyBpbXBvcnQgeyBpc01vZHVsZVNwZWNpZmllciB9IGZyb20gXCJAYmFiZWwvdHlwZXNcIjtcblxuY2xhc3MgUGxheWVyIHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBib2FyZCkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lXG4gICAgICAgIHRoaXMuYm9hcmQgPSBib2FyZFxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyIiwiY2xhc3MgU2hpcCB7XG5cbiAgICBjb25zdHJ1Y3RvcihsZW5ndGgsIGxvY2F0aW9uKSB7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoXG4gICAgICAgIHRoaXMubG9jYXRpb24gPSBsb2NhdGlvblxuICAgICAgICB0aGlzLmhpdHMgPSAwXG4gICAgfVxuXG4gICAgaXNIaXQocG9zaXRpb24pIHtcbiAgICAgICAgaWYodGhpcy5sb2NhdGlvbi5pbmNsdWRlcyhwb3NpdGlvbikpIHtcbiAgICAgICAgICAgIHRoaXMuaGl0cysrXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9IFxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIFxuICAgIGlzU3VuaygpIHtcbiAgICAgICAgaWYodGhpcy5oaXRzID49IHRoaXMubG9jYXRpb24ubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIFxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2hpcCIsImltcG9ydCBHYW1lQm9hcmQgZnJvbSAnLi9HYW1lQm9hcmQnXG5pbXBvcnQgU2hpcCBmcm9tICcuL1NoaXAnXG5pbXBvcnQgeyByZW5kZXJCb2FyZCwgbWFya0hpdExvY2F0aW9uLCBjbGVhck1lc3NhZ2V9IGZyb20gJy4vdWx0aWxpdHknXG5pbXBvcnQgUGxheWVyIGZyb20gJy4vUGxheWVyJztcblxuY29uc3QgcGxheWVyUGFyZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXIxLWJvYXJkXCIpXG5jb25zdCBjb21wdXRlclBhcmVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyMi1ib2FyZFwiKVxuY29uc3QgcGxheWVyU2hpcDEgPSBuZXcgU2hpcCgzLCBbXCJwMDBcIiwgXCJwMDFcIiwgXCJwMDJcIl0pXG5jb25zdCBwbGF5ZXJTaGlwMiA9IG5ldyBTaGlwKDMsIFtcInAzMFwiLCBcInA0MFwiLCBcInA1MFwiXSlcbmNvbnN0IGNTaGlwMSA9IG5ldyBTaGlwKDMsIFtcImMwMFwiLCBcImMwMVwiLCBcImMwMlwiXSlcbmNvbnN0IGNTaGlwMiA9IG5ldyBTaGlwKDMsIFtcImMzNFwiLCBcImM0NFwiLCBcImM1NFwiXSlcbmNvbnN0IHBsYXllckJvYXJkID0gbmV3IEdhbWVCb2FyZChbcGxheWVyU2hpcDEsIHBsYXllclNoaXAyXSwgXCJwXCIpXG5jb25zdCBjb21wdXRlckJvYXJkID0gbmV3IEdhbWVCb2FyZChbY1NoaXAxLCBjU2hpcDJdLCBcImNcIilcbmNvbnN0IHBsYXllciA9IG5ldyBQbGF5ZXIoXCJwbGF5ZXJcIiwgcGxheWVyQm9hcmQpXG5jb25zdCBjb21wdXRlciA9IG5ldyBQbGF5ZXIoXCJjb21wdXRlclwiLCBjb21wdXRlckJvYXJkKVxuXG5yZW5kZXJCb2FyZChwbGF5ZXJCb2FyZCwgcGxheWVyUGFyZW50KVxuXG5yZW5kZXJCb2FyZChjb21wdXRlckJvYXJkLCBjb21wdXRlclBhcmVudClcblxuY29tcHV0ZXJQYXJlbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgY29uc29sZS5sb2coZS50YXJnZXQuaWQpXG4gICAgbWFya0hpdExvY2F0aW9uKGUudGFyZ2V0LmlkLCBjb21wdXRlckJvYXJkKVxufSlcblxuY2xlYXJNZXNzYWdlKClcbiIsIlxuY29uc3QgcmVuZGVyQm9hcmQgPSAoYm9hcmQsIHBhcmVudCkgPT4ge1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBib2FyZC5udW1Sb3dzOyBpKyspIHtcbiAgICAgICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpXG4gICAgICAgIHJvdy5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgcm93LSR7aX1gKVxuICAgICAgICByb3cuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJyb3dcIilcbiAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IGJvYXJkLm51bUNvbHVtbnM7IGorKykge1xuICAgICAgICAgICAgY29uc3QgYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKVxuICAgICAgICAgICAgYm94LnNldEF0dHJpYnV0ZShcImlkXCIsIGAke2JvYXJkLm93bmVyfSR7aX0ke2p9YClcbiAgICAgICAgICAgIGJveC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImJveFwiKVxuICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKGJveClcbiAgICAgICAgfVxuICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQocm93KVxuICAgIH1cbiAgICBcbiAgICBpZihib2FyZC5vd25lciA9PT0gXCJjXCIpIHtcblxuICAgIH0gZWxzZSB7XG4gICAgICAgIGJvYXJkLnNoaXBzLmZvckVhY2goc2hpcCA9PiB7XG4gICAgICAgICAgICBwbGFjZVNoaXAoc2hpcClcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIFxufVxuXG5jb25zdCBwbGFjZVNoaXAgPSAoc2hpcCkgPT4ge1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzaGlwLmxvY2F0aW9uLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNoaXAubG9jYXRpb25baV0pXG4gICAgICAgIGJveC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImJveC1zaGlwXCIpXG4gICAgfVxufVxuXG5jb25zdCBtYXJrSGl0TG9jYXRpb24gPSAoaGl0U3BvdCwgYm9hcmQpID0+IHtcbiAgICBpZihib2FyZC5pc0FsbFNoaXBTdW5rKCkpIHtcbiAgICAgICAgZGlzcGxheU1lc3NhZ2UoXCJHYW1lIG92ZXIgYWxsIHNoaXBzIGRlc3Ryb3llZFwiKVxuICAgICAgICByZXR1cm5cbiAgICB9IGVsc2Uge1xuICAgICAgICBpZihib2FyZC5yZWNlaXZlU3RyaWtlKGhpdFNwb3QpKSB7XG4gICAgICAgICAgICBib2FyZC5zaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgICAgICAgICAgIGlmKHNoaXAuaXNIaXQoaGl0U3BvdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3BvdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGhpdFNwb3QpXG4gICAgICAgICAgICAgICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJoaXQtc3BvdFwiKVxuICAgICAgICAgICAgICAgICAgICBpZihzaGlwLmlzU3VuaygpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TWVzc2FnZShcIk9uZSBFbmVteSBzaGlwIERlc3Ryb3llZFwiKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRocm93IEJyZWFrRXhjZXB0aW9uXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGNvbnN0IGxvY2F0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaGl0U3BvdClcbiAgICAgICAgICAgIGxvY2F0aW9uLmlubmVySFRNTCA9IFwiWFwiXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkaXNwbGF5TWVzc2FnZShcInBsYXkgYWdhaW5cIilcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbn1cblxuY29uc3QgZGlzcGxheU1lc3NhZ2UgPSAobWVzc2FnZSkgPT4ge1xuICAgIGNvbnN0IG1lc3NhZ2VBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZXNzYWdlXCIpXG4gICAgbWVzc2FnZUFyZWEuaW5uZXJIVE1MID0gbWVzc2FnZVxufVxuXG5jb25zdCBjbGVhck1lc3NhZ2UgPSAoKSA9PiB7XG4gICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBjb25zdCBtZXNzYWdlQXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWVzc2FnZVwiKVxuICAgICAgICBtZXNzYWdlQXJlYS5pbm5lckhUTUwgPSBcIlwiXG4gICAgfSwgMTAwMDApXG59XG5cblxuXG5leHBvcnQgeyByZW5kZXJCb2FyZCwgbWFya0hpdExvY2F0aW9uLCBjbGVhck1lc3NhZ2UgfSJdLCJzb3VyY2VSb290IjoiIn0=
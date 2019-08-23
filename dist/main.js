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

    receiveStrike(spot) {
        if(!this.isAllShipSunk()) {
            if(!this.isPositionTaken(spot)) {
                this.visitedCells.push(spot)
                this.ships.forEach(ship => {
                    if(ship.isHit(spot)) {
                        const hitSpot = document.getElementById(spot)
                        hitSpot.setAttribute("class", "hit-spot")
                        if(ship.isSunk()) {
                            this.displayMessage("One Enemy ship Destroyed")
                            if(this.isAllShipSunk()) {
                                this.displayMessage("Game over all ships destroyed")
                            }
                        }
                        throw BreakException
                    }
                })
                
                const location = document.getElementById(spot)
                location.innerHTML = "X"
            } else {
                this.displayMessage("choose another spot")
            }
        } else {
            this.displayMessage("Game over all ships destroyed")
        }
    }

    isPositionTaken(position) {
        if(this.visitedCells.includes(position)) {
            return true
        }
        return false
        
    }

    renderBoard (parent){
        for(let i = 0; i < this.numRows; i++) {
            const row = document.createElement("tr")
            row.setAttribute("id", `row-${i}`)
            row.setAttribute("class", "row")
            for(let j = 0; j < this.numColumns; j++) {
                const box = document.createElement('td')
                box.setAttribute("id", `${this.owner}${i}${j}`)
                box.setAttribute("class", "box")
                row.appendChild(box)
            }
            parent.appendChild(row)
        }
        
        if(this.owner === "p") {
            this.ships.forEach(ship => {
                this.placeShip(ship)
            });
        } 
    }

    placeShip(ship) {
        for(let i = 0; i < ship.location.length; i++) {
            const box = document.getElementById(ship.location[i])
            box.setAttribute("class", "box-ship")
        }
    }
    
     displayMessage(message) {
        const messageArea = document.getElementById("message")
        messageArea.innerHTML = message
    }
}
/* harmony default export */ __webpack_exports__["default"] = (GameBoard);

/***/ }),

/***/ "./src/Player.js":
/*!***********************!*\
  !*** ./src/Player.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

// import { isModuleSpecifier } from "@babel/types";

class Player {
    constructor(name, board) {
        this.name = name
        this.board = board;
        this.turn = false;
    }
}

//export default Player
module.exports = Player;

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
        this.hits = 0;
    }

    isHit(position) {
        if(this.location.includes(position)) {
            this.hits++;
            return true;
        } 
        return false;
    }
    
    isSunk() {
        if(this.hits >= this.location.length) {
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
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Ship */ "./src/Ship.js");
/* harmony import */ var _ultility__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ultility */ "./src/ultility.js");
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Player */ "./src/Player.js");
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Player__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ships__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ships */ "./src/ships.js");






const playerParent = document.getElementById("player1-board")
const computerParent = document.getElementById("player2-board")
const playerShip1 = new _Ship__WEBPACK_IMPORTED_MODULE_1__["default"]( ["p00", "p01", "p02"])
const playerShip2 = new _Ship__WEBPACK_IMPORTED_MODULE_1__["default"]( ["p30", "p40", "p50"])
const cShip1 = new _Ship__WEBPACK_IMPORTED_MODULE_1__["default"](["c00", "c01", "c02"])
const cShip2 = new _Ship__WEBPACK_IMPORTED_MODULE_1__["default"](["c34", "c44", "c54"])
const playerBoard = new _GameBoard__WEBPACK_IMPORTED_MODULE_0__["default"](_ships__WEBPACK_IMPORTED_MODULE_4__["ships"], "p")
const computerBoard = new _GameBoard__WEBPACK_IMPORTED_MODULE_0__["default"]([cShip1, cShip2], "c")
const player = new _Player__WEBPACK_IMPORTED_MODULE_3___default.a("player", playerBoard)
const computer = new _Player__WEBPACK_IMPORTED_MODULE_3___default.a("computer", computerBoard)

Object(_ultility__WEBPACK_IMPORTED_MODULE_2__["displayBoard"])(playerBoard, playerParent)

Object(_ultility__WEBPACK_IMPORTED_MODULE_2__["displayBoard"])(computerBoard, computerParent)

computerParent.addEventListener("click", (e) => {
    console.log(e.target.id)
    Object(_ultility__WEBPACK_IMPORTED_MODULE_2__["markHitLocation"])(e.target.id, computerBoard)
})

Object(_ultility__WEBPACK_IMPORTED_MODULE_2__["clearMessage"])()


/***/ }),

/***/ "./src/ships.js":
/*!**********************!*\
  !*** ./src/ships.js ***!
  \**********************/
/*! exports provided: ships */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ships", function() { return ships; });
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ "./src/Ship.js");


const ship1 = new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"](["p00", "p01", "p02"])
const ship2 = new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"](["p67", "p77", "p87"])
const ship3 = new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"](["p51", "p61"])
const ship4 = new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"](["p37", "p38"])
const ship5 = new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"](["p24", "p34", "p44", "p54"])
const ship6 = new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"](["p17"])
const ship7 = new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"](["p92"])
const ship8 = new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"](["p73", "p74", "p75"])

const ships = [ship1, ship2, ship3, ship4, ship5, ship6, ship7, ship8]



/***/ }),

/***/ "./src/ultility.js":
/*!*************************!*\
  !*** ./src/ultility.js ***!
  \*************************/
/*! exports provided: displayBoard, markHitLocation, clearMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "displayBoard", function() { return displayBoard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "markHitLocation", function() { return markHitLocation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearMessage", function() { return clearMessage; });

const markHitLocation = (hitSpot, board) => {
    board.receiveStrike(hitSpot)
}

const clearMessage = () => {
    setInterval(() => {
        const messageArea = document.getElementById("message")
        messageArea.innerHTML = ""
    }, 10000)
}

const displayBoard = (board, parent) => {
    board.renderBoard(parent)
}



/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dhbWVCb2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUGxheWVyLmpzIiwid2VicGFjazovLy8uL3NyYy9TaGlwLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hpcHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VsdGlsaXR5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUF5Qjs7QUFFekI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0Esc0JBQXNCLGtCQUFrQjtBQUN4QztBQUNBLDBDQUEwQyxFQUFFO0FBQzVDO0FBQ0EsMEJBQTBCLHFCQUFxQjtBQUMvQztBQUNBLDBDQUEwQyxXQUFXLEVBQUUsRUFBRSxFQUFFLEVBQUU7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsUztBQUNBOztBQUVBO0FBQ0Esc0JBQXNCLDBCQUEwQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2Usd0U7Ozs7Ozs7Ozs7O0FDdEdmLFdBQVcsb0JBQW9COztBQUUvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdCOzs7Ozs7Ozs7Ozs7QUNYQTtBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWUsbUU7Ozs7Ozs7Ozs7OztBQ3ZCZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFtQztBQUNWO0FBQzJEO0FBQ3REO0FBQ0M7O0FBRS9CO0FBQ0E7QUFDQSx3QkFBd0IsNkNBQUk7QUFDNUIsd0JBQXdCLDZDQUFJO0FBQzVCLG1CQUFtQiw2Q0FBSTtBQUN2QixtQkFBbUIsNkNBQUk7QUFDdkIsd0JBQXdCLGtEQUFTLENBQUMsNENBQUs7QUFDdkMsMEJBQTBCLGtEQUFTO0FBQ25DLG1CQUFtQiw4Q0FBTTtBQUN6QixxQkFBcUIsOENBQU07O0FBRTNCLDhEQUFZOztBQUVaLDhEQUFZOztBQUVaO0FBQ0E7QUFDQSxJQUFJLGlFQUFlO0FBQ25CLENBQUM7O0FBRUQsOERBQVk7Ozs7Ozs7Ozs7Ozs7QUMxQlo7QUFBQTtBQUFBO0FBQXlCOztBQUV6QixrQkFBa0IsNkNBQUk7QUFDdEIsa0JBQWtCLDZDQUFJO0FBQ3RCLGtCQUFrQiw2Q0FBSTtBQUN0QixrQkFBa0IsNkNBQUk7QUFDdEIsa0JBQWtCLDZDQUFJO0FBQ3RCLGtCQUFrQiw2Q0FBSTtBQUN0QixrQkFBa0IsNkNBQUk7QUFDdEIsa0JBQWtCLDZDQUFJOztBQUV0Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1ZBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IFNoaXAgZnJvbSAnLi9TaGlwJ1xuXG5jbGFzcyBHYW1lQm9hcmQge1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKHNoaXBzLCBvd25lcikge1xuICAgICAgICB0aGlzLmdyaWQgPSBuZXcgQXJyYXkoMTAwKVxuICAgICAgICB0aGlzLm51bVJvd3MgPSAxMFxuICAgICAgICB0aGlzLm51bUNvbHVtbnMgPSAxMFxuICAgICAgICB0aGlzLnNoaXBzID0gc2hpcHNcbiAgICAgICAgdGhpcy5vd25lciA9IG93bmVyXG4gICAgICAgIHRoaXMudmlzaXRlZENlbGxzID0gW11cbiAgICAgICAgdGhpcy5kYW1hZ2VkU2hpcHMgPSAwXG4gICAgfVxuICAgIFxuICAgIHNldFNoaXBzUG9zaXRpb24oc2hpcCwgbG9jYXRpb24pIHtcbiAgICAgICAgc2hpcC5sb2NhdGlvbiA9IGxvY2F0aW9uO1xuICAgICAgICB0aGlzLnNoaXBzLnB1c2goc2hpcCk7XG4gICAgfVxuXG4gICAgaXNBbGxTaGlwU3VuaygpIHtcbiAgICAgICAgbGV0IGNvdW50ID0gMFxuICAgICAgICB0aGlzLnNoaXBzLmZvckVhY2goc2hpcCA9PiB7XG4gICAgICAgICAgICBpZihzaGlwLmlzU3VuaygpKSB7XG4gICAgICAgICAgICAgICAgY291bnQrK1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYoY291bnQgPj0gdGhpcy5zaGlwcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlY2VpdmVTdHJpa2Uoc3BvdCkge1xuICAgICAgICBpZighdGhpcy5pc0FsbFNoaXBTdW5rKCkpIHtcbiAgICAgICAgICAgIGlmKCF0aGlzLmlzUG9zaXRpb25UYWtlbihzcG90KSkge1xuICAgICAgICAgICAgICAgIHRoaXMudmlzaXRlZENlbGxzLnB1c2goc3BvdClcbiAgICAgICAgICAgICAgICB0aGlzLnNoaXBzLmZvckVhY2goc2hpcCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHNoaXAuaXNIaXQoc3BvdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhpdFNwb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzcG90KVxuICAgICAgICAgICAgICAgICAgICAgICAgaGl0U3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImhpdC1zcG90XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzaGlwLmlzU3VuaygpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5TWVzc2FnZShcIk9uZSBFbmVteSBzaGlwIERlc3Ryb3llZFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNBbGxTaGlwU3VuaygpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheU1lc3NhZ2UoXCJHYW1lIG92ZXIgYWxsIHNoaXBzIGRlc3Ryb3llZFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IEJyZWFrRXhjZXB0aW9uXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGNvbnN0IGxvY2F0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc3BvdClcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5pbm5lckhUTUwgPSBcIlhcIlxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlNZXNzYWdlKFwiY2hvb3NlIGFub3RoZXIgc3BvdFwiKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5TWVzc2FnZShcIkdhbWUgb3ZlciBhbGwgc2hpcHMgZGVzdHJveWVkXCIpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc1Bvc2l0aW9uVGFrZW4ocG9zaXRpb24pIHtcbiAgICAgICAgaWYodGhpcy52aXNpdGVkQ2VsbHMuaW5jbHVkZXMocG9zaXRpb24pKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICBcbiAgICB9XG5cbiAgICByZW5kZXJCb2FyZCAocGFyZW50KXtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMubnVtUm93czsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIilcbiAgICAgICAgICAgIHJvdy5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgcm93LSR7aX1gKVxuICAgICAgICAgICAgcm93LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwicm93XCIpXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgdGhpcy5udW1Db2x1bW5zOyBqKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpXG4gICAgICAgICAgICAgICAgYm94LnNldEF0dHJpYnV0ZShcImlkXCIsIGAke3RoaXMub3duZXJ9JHtpfSR7an1gKVxuICAgICAgICAgICAgICAgIGJveC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImJveFwiKVxuICAgICAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChib3gpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQocm93KVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZih0aGlzLm93bmVyID09PSBcInBcIikge1xuICAgICAgICAgICAgdGhpcy5zaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucGxhY2VTaGlwKHNoaXApXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBcbiAgICB9XG5cbiAgICBwbGFjZVNoaXAoc2hpcCkge1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2hpcC5sb2NhdGlvbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2hpcC5sb2NhdGlvbltpXSlcbiAgICAgICAgICAgIGJveC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImJveC1zaGlwXCIpXG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgIGRpc3BsYXlNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICAgICAgY29uc3QgbWVzc2FnZUFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1lc3NhZ2VcIilcbiAgICAgICAgbWVzc2FnZUFyZWEuaW5uZXJIVE1MID0gbWVzc2FnZVxuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEdhbWVCb2FyZCIsIi8vIGltcG9ydCB7IGlzTW9kdWxlU3BlY2lmaWVyIH0gZnJvbSBcIkBiYWJlbC90eXBlc1wiO1xuXG5jbGFzcyBQbGF5ZXIge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGJvYXJkKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWVcbiAgICAgICAgdGhpcy5ib2FyZCA9IGJvYXJkO1xuICAgICAgICB0aGlzLnR1cm4gPSBmYWxzZTtcbiAgICB9XG59XG5cbi8vZXhwb3J0IGRlZmF1bHQgUGxheWVyXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXllcjsiLCJjbGFzcyBTaGlwIHtcblxuICAgIGNvbnN0cnVjdG9yKGxvY2F0aW9uKSB7XG4gICAgICAgIHRoaXMubG9jYXRpb24gPSBsb2NhdGlvbjtcbiAgICAgICAgdGhpcy5oaXRzID0gMDtcbiAgICB9XG5cbiAgICBpc0hpdChwb3NpdGlvbikge1xuICAgICAgICBpZih0aGlzLmxvY2F0aW9uLmluY2x1ZGVzKHBvc2l0aW9uKSkge1xuICAgICAgICAgICAgdGhpcy5oaXRzKys7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBcbiAgICBpc1N1bmsoKSB7XG4gICAgICAgIGlmKHRoaXMuaGl0cyA+PSB0aGlzLmxvY2F0aW9uLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2hpcCIsImltcG9ydCBHYW1lQm9hcmQgZnJvbSAnLi9HYW1lQm9hcmQnXG5pbXBvcnQgU2hpcCBmcm9tICcuL1NoaXAnXG5pbXBvcnQgeyByZW5kZXJCb2FyZCwgbWFya0hpdExvY2F0aW9uLCBjbGVhck1lc3NhZ2UsIGRpc3BsYXlCb2FyZH0gZnJvbSAnLi91bHRpbGl0eSdcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9QbGF5ZXInO1xuaW1wb3J0IHsgc2hpcHMgfSBmcm9tICcuL3NoaXBzJ1xuXG5jb25zdCBwbGF5ZXJQYXJlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllcjEtYm9hcmRcIilcbmNvbnN0IGNvbXB1dGVyUGFyZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXIyLWJvYXJkXCIpXG5jb25zdCBwbGF5ZXJTaGlwMSA9IG5ldyBTaGlwKCBbXCJwMDBcIiwgXCJwMDFcIiwgXCJwMDJcIl0pXG5jb25zdCBwbGF5ZXJTaGlwMiA9IG5ldyBTaGlwKCBbXCJwMzBcIiwgXCJwNDBcIiwgXCJwNTBcIl0pXG5jb25zdCBjU2hpcDEgPSBuZXcgU2hpcChbXCJjMDBcIiwgXCJjMDFcIiwgXCJjMDJcIl0pXG5jb25zdCBjU2hpcDIgPSBuZXcgU2hpcChbXCJjMzRcIiwgXCJjNDRcIiwgXCJjNTRcIl0pXG5jb25zdCBwbGF5ZXJCb2FyZCA9IG5ldyBHYW1lQm9hcmQoc2hpcHMsIFwicFwiKVxuY29uc3QgY29tcHV0ZXJCb2FyZCA9IG5ldyBHYW1lQm9hcmQoW2NTaGlwMSwgY1NoaXAyXSwgXCJjXCIpXG5jb25zdCBwbGF5ZXIgPSBuZXcgUGxheWVyKFwicGxheWVyXCIsIHBsYXllckJvYXJkKVxuY29uc3QgY29tcHV0ZXIgPSBuZXcgUGxheWVyKFwiY29tcHV0ZXJcIiwgY29tcHV0ZXJCb2FyZClcblxuZGlzcGxheUJvYXJkKHBsYXllckJvYXJkLCBwbGF5ZXJQYXJlbnQpXG5cbmRpc3BsYXlCb2FyZChjb21wdXRlckJvYXJkLCBjb21wdXRlclBhcmVudClcblxuY29tcHV0ZXJQYXJlbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgY29uc29sZS5sb2coZS50YXJnZXQuaWQpXG4gICAgbWFya0hpdExvY2F0aW9uKGUudGFyZ2V0LmlkLCBjb21wdXRlckJvYXJkKVxufSlcblxuY2xlYXJNZXNzYWdlKClcbiIsImltcG9ydCBTaGlwIGZyb20gJy4vU2hpcCdcblxuY29uc3Qgc2hpcDEgPSBuZXcgU2hpcChbXCJwMDBcIiwgXCJwMDFcIiwgXCJwMDJcIl0pXG5jb25zdCBzaGlwMiA9IG5ldyBTaGlwKFtcInA2N1wiLCBcInA3N1wiLCBcInA4N1wiXSlcbmNvbnN0IHNoaXAzID0gbmV3IFNoaXAoW1wicDUxXCIsIFwicDYxXCJdKVxuY29uc3Qgc2hpcDQgPSBuZXcgU2hpcChbXCJwMzdcIiwgXCJwMzhcIl0pXG5jb25zdCBzaGlwNSA9IG5ldyBTaGlwKFtcInAyNFwiLCBcInAzNFwiLCBcInA0NFwiLCBcInA1NFwiXSlcbmNvbnN0IHNoaXA2ID0gbmV3IFNoaXAoW1wicDE3XCJdKVxuY29uc3Qgc2hpcDcgPSBuZXcgU2hpcChbXCJwOTJcIl0pXG5jb25zdCBzaGlwOCA9IG5ldyBTaGlwKFtcInA3M1wiLCBcInA3NFwiLCBcInA3NVwiXSlcblxuY29uc3Qgc2hpcHMgPSBbc2hpcDEsIHNoaXAyLCBzaGlwMywgc2hpcDQsIHNoaXA1LCBzaGlwNiwgc2hpcDcsIHNoaXA4XVxuXG5leHBvcnQgeyBzaGlwcyB9IiwiXG5jb25zdCBtYXJrSGl0TG9jYXRpb24gPSAoaGl0U3BvdCwgYm9hcmQpID0+IHtcbiAgICBib2FyZC5yZWNlaXZlU3RyaWtlKGhpdFNwb3QpXG59XG5cbmNvbnN0IGNsZWFyTWVzc2FnZSA9ICgpID0+IHtcbiAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2VBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZXNzYWdlXCIpXG4gICAgICAgIG1lc3NhZ2VBcmVhLmlubmVySFRNTCA9IFwiXCJcbiAgICB9LCAxMDAwMClcbn1cblxuY29uc3QgZGlzcGxheUJvYXJkID0gKGJvYXJkLCBwYXJlbnQpID0+IHtcbiAgICBib2FyZC5yZW5kZXJCb2FyZChwYXJlbnQpXG59XG5cbmV4cG9ydCB7IGRpc3BsYXlCb2FyZCwgbWFya0hpdExvY2F0aW9uLCBjbGVhck1lc3NhZ2UgfSJdLCJzb3VyY2VSb290IjoiIn0=
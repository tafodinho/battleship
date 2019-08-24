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
const container = document.getElementById("container")
const playerBoard = new _GameBoard__WEBPACK_IMPORTED_MODULE_0__["default"](_ships__WEBPACK_IMPORTED_MODULE_4__["playerShips"], "p")
const computerBoard = new _GameBoard__WEBPACK_IMPORTED_MODULE_0__["default"](_ships__WEBPACK_IMPORTED_MODULE_4__["computerShips"], "c")
const player = new _Player__WEBPACK_IMPORTED_MODULE_3___default.a("player", playerBoard)
const computer = new _Player__WEBPACK_IMPORTED_MODULE_3___default.a("computer", computerBoard)

Object(_ultility__WEBPACK_IMPORTED_MODULE_2__["displayBoard"])(playerBoard, playerParent)

Object(_ultility__WEBPACK_IMPORTED_MODULE_2__["displayBoard"])(computerBoard, computerParent)

container.addEventListener("click", (e) => {
    console.log(e.target.id)
    Object(_ultility__WEBPACK_IMPORTED_MODULE_2__["markHitLocation"])(e.target.id, computerBoard)
    Object(_ultility__WEBPACK_IMPORTED_MODULE_2__["markHitLocation"])(Object(_ultility__WEBPACK_IMPORTED_MODULE_2__["generateSpot"])(playerBoard), playerBoard)
})

Object(_ultility__WEBPACK_IMPORTED_MODULE_2__["clearMessage"])()
const createAShip = ((lengthOfShip, owner, orientation) => {
    let location = [];
    let firstDigit = null;
    let secondDigit = null;
    let spot = ""
    let i = 0
    while(location.length < lengthOfShip) {
        if(orientation == "horizontal") {
            if(location.length == 0) {
                firstDigit = Math.floor(Math.random() * 10);
                secondDigit = Math.floor(Math.random() * 10);
            } else {
                secondDigit += 1
            }
        } else {
            if(location.length == 0) {
                firstDigit = Math.floor(Math.random() * 10);
                secondDigit = Math.floor(Math.random() * 10);
            } else {
                firstDigit += 1
            }
        }
       
        spot = owner+firstDigit+secondDigit
        location.push(spot)
    }
    return new _Ship__WEBPACK_IMPORTED_MODULE_1__["default"](location);
})(4, "p", "vertical")


/***/ }),

/***/ "./src/ships.js":
/*!**********************!*\
  !*** ./src/ships.js ***!
  \**********************/
/*! exports provided: playerShips, computerShips */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "playerShips", function() { return playerShips; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "computerShips", function() { return computerShips; });
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ "./src/Ship.js");


const ship1 = new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"](["p00", "p01", "p02"])
const ship2 = new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"](["p67", "p77", "p87"])
const ship3 = new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"](["p51", "p61"])
const ship4 = new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"](["p37", "p38"])
const ship5 = new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"](["p24", "p34", "p44", "p54"])
const ship6 = new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"](["p17"])
const ship7 = new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"](["p92"])
const ship8 = new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"](["p73", "p74", "p75"])

const cship1 = new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"](["c00", "c01", "c02"])
const cship2 = new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"](["c67", "c77", "c87"])
const cship3 = new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"](["c51", "c61"])
const cship4 = new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"](["c37", "c38"])
const cship5 = new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"](["c24", "c34", "c44", "c54"])
const cship6 = new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"](["c17"])
const cship7 = new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"](["c92"])
const cship8 = new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"](["c73", "c74", "c75"])

const playerShips = [ship1, ship2, ship3, ship4, ship5, ship6, ship7, ship8]
const computerShips = [cship1, cship2, cship3, cship4, cship5, cship6, cship7, cship8]



/***/ }),

/***/ "./src/ultility.js":
/*!*************************!*\
  !*** ./src/ultility.js ***!
  \*************************/
/*! exports provided: displayBoard, markHitLocation, clearMessage, generateSpot */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "displayBoard", function() { return displayBoard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "markHitLocation", function() { return markHitLocation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearMessage", function() { return clearMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateSpot", function() { return generateSpot; });

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

const generateSpot = (board) => {
    let spot = ""
    do {
        let firstDigit = Math.floor(Math.random()*10)
        let secondDigit = Math.floor(Math.random()*10)
        spot = "p"+firstDigit+secondDigit;
    } while(board.isPositionTaken(spot))
    return spot
}

const createAShip = (lengthOfShip, owner, orientation) => {
    let location = [];
    let firstDigit = null;
    let secondDigit = null;
    let spot = ""
    let i = 0
    while(location.length < lengthOfShip) {
        if(orientation == "horizontal") {
            if(location.length == 0) {
                firstDigit = Math.floor(Math.random() * 10);
                secondDigit = Math.floor(Math.random() * 10);
            } else {
                secondDigit += 1
            }
        } else {
            if(location.length == 0) {
                firstDigit = Math.floor(Math.random() * 10);
                secondDigit = Math.floor(Math.random() * 10);
            } else {
                firstDigit += 1
            }
        }
       
        spot = owner+firstDigit+secondDigit
        location.push(spot)
    }
    return new Ship(location);
}



/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dhbWVCb2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUGxheWVyLmpzIiwid2VicGFjazovLy8uL3NyYy9TaGlwLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hpcHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VsdGlsaXR5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztB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bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiY2xhc3MgR2FtZUJvYXJkIHtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihzaGlwcywgb3duZXIpIHtcbiAgICAgICAgdGhpcy5ncmlkID0gbmV3IEFycmF5KDEwMClcbiAgICAgICAgdGhpcy5udW1Sb3dzID0gMTBcbiAgICAgICAgdGhpcy5udW1Db2x1bW5zID0gMTBcbiAgICAgICAgdGhpcy5zaGlwcyA9IHNoaXBzXG4gICAgICAgIHRoaXMub3duZXIgPSBvd25lclxuICAgICAgICB0aGlzLnZpc2l0ZWRDZWxscyA9IFtdXG4gICAgICAgIHRoaXMuZGFtYWdlZFNoaXBzID0gMFxuICAgIH1cbiAgICBcbiAgICBzZXRTaGlwc1Bvc2l0aW9uKHNoaXAsIGxvY2F0aW9uKSB7XG4gICAgICAgIHNoaXAubG9jYXRpb24gPSBsb2NhdGlvbjtcbiAgICAgICAgdGhpcy5zaGlwcy5wdXNoKHNoaXApO1xuICAgIH1cblxuICAgIGlzQWxsU2hpcFN1bmsoKSB7XG4gICAgICAgIGxldCBjb3VudCA9IDBcbiAgICAgICAgdGhpcy5zaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgICAgICAgaWYoc2hpcC5pc1N1bmsoKSkge1xuICAgICAgICAgICAgICAgIGNvdW50KytcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmKGNvdW50ID49IHRoaXMuc2hpcHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWNlaXZlU3RyaWtlKHNwb3QpIHtcbiAgICAgICAgaWYoIXRoaXMuaXNBbGxTaGlwU3VuaygpKSB7XG4gICAgICAgICAgICBpZighdGhpcy5pc1Bvc2l0aW9uVGFrZW4oc3BvdCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZpc2l0ZWRDZWxscy5wdXNoKHNwb3QpXG4gICAgICAgICAgICAgICAgdGhpcy5zaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZihzaGlwLmlzSGl0KHNwb3QpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoaXRTcG90ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc3BvdClcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpdFNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJoaXQtc3BvdFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2hpcC5pc1N1bmsoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheU1lc3NhZ2UoXCJPbmUgRW5lbXkgc2hpcCBEZXN0cm95ZWRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmlzQWxsU2hpcFN1bmsoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlNZXNzYWdlKFwiR2FtZSBvdmVyIGFsbCBzaGlwcyBkZXN0cm95ZWRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBCcmVha0V4Y2VwdGlvblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBjb25zdCBsb2NhdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNwb3QpXG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaW5uZXJIVE1MID0gXCJYXCJcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5TWVzc2FnZShcImNob29zZSBhbm90aGVyIHNwb3RcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheU1lc3NhZ2UoXCJHYW1lIG92ZXIgYWxsIHNoaXBzIGRlc3Ryb3llZFwiKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNQb3NpdGlvblRha2VuKHBvc2l0aW9uKSB7XG4gICAgICAgIGlmKHRoaXMudmlzaXRlZENlbGxzLmluY2x1ZGVzKHBvc2l0aW9uKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgXG4gICAgfVxuXG4gICAgcmVuZGVyQm9hcmQgKHBhcmVudCl7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLm51bVJvd3M7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpXG4gICAgICAgICAgICByb3cuc2V0QXR0cmlidXRlKFwiaWRcIiwgYHJvdy0ke2l9YClcbiAgICAgICAgICAgIHJvdy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInJvd1wiKVxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IHRoaXMubnVtQ29sdW1uczsgaisrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKVxuICAgICAgICAgICAgICAgIGJveC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHt0aGlzLm93bmVyfSR7aX0ke2p9YClcbiAgICAgICAgICAgICAgICBib3guc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJib3hcIilcbiAgICAgICAgICAgICAgICByb3cuYXBwZW5kQ2hpbGQoYm94KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKHJvdylcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYodGhpcy5vd25lciA9PT0gXCJwXCIpIHtcbiAgICAgICAgICAgIHRoaXMuc2hpcHMuZm9yRWFjaChzaGlwID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYWNlU2hpcChzaGlwKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gXG4gICAgfVxuXG4gICAgcGxhY2VTaGlwKHNoaXApIHtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHNoaXAubG9jYXRpb24ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNoaXAubG9jYXRpb25baV0pXG4gICAgICAgICAgICBib3guc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJib3gtc2hpcFwiKVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgICBkaXNwbGF5TWVzc2FnZShtZXNzYWdlKSB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2VBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZXNzYWdlXCIpXG4gICAgICAgIG1lc3NhZ2VBcmVhLmlubmVySFRNTCA9IG1lc3NhZ2VcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBHYW1lQm9hcmQiLCIvLyBpbXBvcnQgeyBpc01vZHVsZVNwZWNpZmllciB9IGZyb20gXCJAYmFiZWwvdHlwZXNcIjtcblxuY2xhc3MgUGxheWVyIHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBib2FyZCkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lXG4gICAgICAgIHRoaXMuYm9hcmQgPSBib2FyZDtcbiAgICAgICAgdGhpcy50dXJuID0gZmFsc2U7XG4gICAgfVxufVxuXG4vL2V4cG9ydCBkZWZhdWx0IFBsYXllclxubW9kdWxlLmV4cG9ydHMgPSBQbGF5ZXI7IiwiY2xhc3MgU2hpcCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihsb2NhdGlvbikge1xuICAgICAgICB0aGlzLmxvY2F0aW9uID0gbG9jYXRpb247XG4gICAgICAgIHRoaXMuaGl0cyA9IDA7XG4gICAgfVxuXG4gICAgaXNIaXQocG9zaXRpb24pIHtcbiAgICAgICAgaWYodGhpcy5sb2NhdGlvbi5pbmNsdWRlcyhwb3NpdGlvbikpIHtcbiAgICAgICAgICAgIHRoaXMuaGl0cysrO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgXG4gICAgaXNTdW5rKCkge1xuICAgICAgICBpZih0aGlzLmhpdHMgPj0gdGhpcy5sb2NhdGlvbi5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNoaXAiLCJpbXBvcnQgR2FtZUJvYXJkIGZyb20gJy4vR2FtZUJvYXJkJ1xuaW1wb3J0IFNoaXAgZnJvbSAnLi9TaGlwJ1xuaW1wb3J0IHsgXG4gICAgICAgIG1hcmtIaXRMb2NhdGlvbiwgXG4gICAgICAgIGNsZWFyTWVzc2FnZSwgXG4gICAgICAgIGRpc3BsYXlCb2FyZCxcbiAgICAgICAgZ2VuZXJhdGVTcG90IH0gZnJvbSAnLi91bHRpbGl0eSdcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9QbGF5ZXInO1xuaW1wb3J0IHsgcGxheWVyU2hpcHMsIGNvbXB1dGVyU2hpcHMgfSBmcm9tICcuL3NoaXBzJ1xuXG5jb25zdCBwbGF5ZXJQYXJlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllcjEtYm9hcmRcIilcbmNvbnN0IGNvbXB1dGVyUGFyZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXIyLWJvYXJkXCIpXG5jb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRhaW5lclwiKVxuY29uc3QgcGxheWVyQm9hcmQgPSBuZXcgR2FtZUJvYXJkKHBsYXllclNoaXBzLCBcInBcIilcbmNvbnN0IGNvbXB1dGVyQm9hcmQgPSBuZXcgR2FtZUJvYXJkKGNvbXB1dGVyU2hpcHMsIFwiY1wiKVxuY29uc3QgcGxheWVyID0gbmV3IFBsYXllcihcInBsYXllclwiLCBwbGF5ZXJCb2FyZClcbmNvbnN0IGNvbXB1dGVyID0gbmV3IFBsYXllcihcImNvbXB1dGVyXCIsIGNvbXB1dGVyQm9hcmQpXG5cbmRpc3BsYXlCb2FyZChwbGF5ZXJCb2FyZCwgcGxheWVyUGFyZW50KVxuXG5kaXNwbGF5Qm9hcmQoY29tcHV0ZXJCb2FyZCwgY29tcHV0ZXJQYXJlbnQpXG5cbmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICBjb25zb2xlLmxvZyhlLnRhcmdldC5pZClcbiAgICBtYXJrSGl0TG9jYXRpb24oZS50YXJnZXQuaWQsIGNvbXB1dGVyQm9hcmQpXG4gICAgbWFya0hpdExvY2F0aW9uKGdlbmVyYXRlU3BvdChwbGF5ZXJCb2FyZCksIHBsYXllckJvYXJkKVxufSlcblxuY2xlYXJNZXNzYWdlKClcbmNvbnN0IGNyZWF0ZUFTaGlwID0gKChsZW5ndGhPZlNoaXAsIG93bmVyLCBvcmllbnRhdGlvbikgPT4ge1xuICAgIGxldCBsb2NhdGlvbiA9IFtdO1xuICAgIGxldCBmaXJzdERpZ2l0ID0gbnVsbDtcbiAgICBsZXQgc2Vjb25kRGlnaXQgPSBudWxsO1xuICAgIGxldCBzcG90ID0gXCJcIlxuICAgIGxldCBpID0gMFxuICAgIHdoaWxlKGxvY2F0aW9uLmxlbmd0aCA8IGxlbmd0aE9mU2hpcCkge1xuICAgICAgICBpZihvcmllbnRhdGlvbiA9PSBcImhvcml6b250YWxcIikge1xuICAgICAgICAgICAgaWYobG9jYXRpb24ubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgICBmaXJzdERpZ2l0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICAgICAgICAgIHNlY29uZERpZ2l0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWNvbmREaWdpdCArPSAxXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZihsb2NhdGlvbi5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgIGZpcnN0RGlnaXQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgICAgICAgICAgc2Vjb25kRGlnaXQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZpcnN0RGlnaXQgKz0gMVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgXG4gICAgICAgIHNwb3QgPSBvd25lcitmaXJzdERpZ2l0K3NlY29uZERpZ2l0XG4gICAgICAgIGxvY2F0aW9uLnB1c2goc3BvdClcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBTaGlwKGxvY2F0aW9uKTtcbn0pKDQsIFwicFwiLCBcInZlcnRpY2FsXCIpXG4iLCJpbXBvcnQgU2hpcCBmcm9tICcuL1NoaXAnXG5cbmNvbnN0IHNoaXAxID0gbmV3IFNoaXAoW1wicDAwXCIsIFwicDAxXCIsIFwicDAyXCJdKVxuY29uc3Qgc2hpcDIgPSBuZXcgU2hpcChbXCJwNjdcIiwgXCJwNzdcIiwgXCJwODdcIl0pXG5jb25zdCBzaGlwMyA9IG5ldyBTaGlwKFtcInA1MVwiLCBcInA2MVwiXSlcbmNvbnN0IHNoaXA0ID0gbmV3IFNoaXAoW1wicDM3XCIsIFwicDM4XCJdKVxuY29uc3Qgc2hpcDUgPSBuZXcgU2hpcChbXCJwMjRcIiwgXCJwMzRcIiwgXCJwNDRcIiwgXCJwNTRcIl0pXG5jb25zdCBzaGlwNiA9IG5ldyBTaGlwKFtcInAxN1wiXSlcbmNvbnN0IHNoaXA3ID0gbmV3IFNoaXAoW1wicDkyXCJdKVxuY29uc3Qgc2hpcDggPSBuZXcgU2hpcChbXCJwNzNcIiwgXCJwNzRcIiwgXCJwNzVcIl0pXG5cbmNvbnN0IGNzaGlwMSA9IG5ldyBTaGlwKFtcImMwMFwiLCBcImMwMVwiLCBcImMwMlwiXSlcbmNvbnN0IGNzaGlwMiA9IG5ldyBTaGlwKFtcImM2N1wiLCBcImM3N1wiLCBcImM4N1wiXSlcbmNvbnN0IGNzaGlwMyA9IG5ldyBTaGlwKFtcImM1MVwiLCBcImM2MVwiXSlcbmNvbnN0IGNzaGlwNCA9IG5ldyBTaGlwKFtcImMzN1wiLCBcImMzOFwiXSlcbmNvbnN0IGNzaGlwNSA9IG5ldyBTaGlwKFtcImMyNFwiLCBcImMzNFwiLCBcImM0NFwiLCBcImM1NFwiXSlcbmNvbnN0IGNzaGlwNiA9IG5ldyBTaGlwKFtcImMxN1wiXSlcbmNvbnN0IGNzaGlwNyA9IG5ldyBTaGlwKFtcImM5MlwiXSlcbmNvbnN0IGNzaGlwOCA9IG5ldyBTaGlwKFtcImM3M1wiLCBcImM3NFwiLCBcImM3NVwiXSlcblxuY29uc3QgcGxheWVyU2hpcHMgPSBbc2hpcDEsIHNoaXAyLCBzaGlwMywgc2hpcDQsIHNoaXA1LCBzaGlwNiwgc2hpcDcsIHNoaXA4XVxuY29uc3QgY29tcHV0ZXJTaGlwcyA9IFtjc2hpcDEsIGNzaGlwMiwgY3NoaXAzLCBjc2hpcDQsIGNzaGlwNSwgY3NoaXA2LCBjc2hpcDcsIGNzaGlwOF1cblxuZXhwb3J0IHsgcGxheWVyU2hpcHMsIGNvbXB1dGVyU2hpcHMgfSIsIlxuY29uc3QgbWFya0hpdExvY2F0aW9uID0gKGhpdFNwb3QsIGJvYXJkKSA9PiB7XG4gICAgYm9hcmQucmVjZWl2ZVN0cmlrZShoaXRTcG90KVxufVxuXG5jb25zdCBjbGVhck1lc3NhZ2UgPSAoKSA9PiB7XG4gICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBjb25zdCBtZXNzYWdlQXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWVzc2FnZVwiKVxuICAgICAgICBtZXNzYWdlQXJlYS5pbm5lckhUTUwgPSBcIlwiXG4gICAgfSwgMTAwMDApXG59XG5cbmNvbnN0IGRpc3BsYXlCb2FyZCA9IChib2FyZCwgcGFyZW50KSA9PiB7XG4gICAgYm9hcmQucmVuZGVyQm9hcmQocGFyZW50KVxufVxuXG5jb25zdCBnZW5lcmF0ZVNwb3QgPSAoYm9hcmQpID0+IHtcbiAgICBsZXQgc3BvdCA9IFwiXCJcbiAgICBkbyB7XG4gICAgICAgIGxldCBmaXJzdERpZ2l0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjEwKVxuICAgICAgICBsZXQgc2Vjb25kRGlnaXQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMTApXG4gICAgICAgIHNwb3QgPSBcInBcIitmaXJzdERpZ2l0K3NlY29uZERpZ2l0O1xuICAgIH0gd2hpbGUoYm9hcmQuaXNQb3NpdGlvblRha2VuKHNwb3QpKVxuICAgIHJldHVybiBzcG90XG59XG5cbmNvbnN0IGNyZWF0ZUFTaGlwID0gKGxlbmd0aE9mU2hpcCwgb3duZXIsIG9yaWVudGF0aW9uKSA9PiB7XG4gICAgbGV0IGxvY2F0aW9uID0gW107XG4gICAgbGV0IGZpcnN0RGlnaXQgPSBudWxsO1xuICAgIGxldCBzZWNvbmREaWdpdCA9IG51bGw7XG4gICAgbGV0IHNwb3QgPSBcIlwiXG4gICAgbGV0IGkgPSAwXG4gICAgd2hpbGUobG9jYXRpb24ubGVuZ3RoIDwgbGVuZ3RoT2ZTaGlwKSB7XG4gICAgICAgIGlmKG9yaWVudGF0aW9uID09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgICAgICAgICBpZihsb2NhdGlvbi5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgIGZpcnN0RGlnaXQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgICAgICAgICAgc2Vjb25kRGlnaXQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlY29uZERpZ2l0ICs9IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmKGxvY2F0aW9uLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgZmlyc3REaWdpdCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICAgICAgICBzZWNvbmREaWdpdCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZmlyc3REaWdpdCArPSAxXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICBcbiAgICAgICAgc3BvdCA9IG93bmVyK2ZpcnN0RGlnaXQrc2Vjb25kRGlnaXRcbiAgICAgICAgbG9jYXRpb24ucHVzaChzcG90KVxuICAgIH1cbiAgICByZXR1cm4gbmV3IFNoaXAobG9jYXRpb24pO1xufVxuXG5leHBvcnQgeyBkaXNwbGF5Qm9hcmQsIG1hcmtIaXRMb2NhdGlvbiwgY2xlYXJNZXNzYWdlLCBnZW5lcmF0ZVNwb3QgfSJdLCJzb3VyY2VSb290IjoiIn0=
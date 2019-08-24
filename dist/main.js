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



/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dhbWVCb2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUGxheWVyLmpzIiwid2VicGFjazovLy8uL3NyYy9TaGlwLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hpcHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VsdGlsaXR5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLHNCQUFzQixrQkFBa0I7QUFDeEM7QUFDQSwwQ0FBMEMsRUFBRTtBQUM1QztBQUNBLDBCQUEwQixxQkFBcUI7QUFDL0M7QUFDQSwwQ0FBMEMsV0FBVyxFQUFFLEVBQUUsRUFBRSxFQUFFO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFM7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQiwwQkFBMEI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNlLHdFOzs7Ozs7Ozs7OztBQ25HZixXQUFXLG9CQUFvQjs7QUFFL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3Qjs7Ozs7Ozs7Ozs7O0FDWEE7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVlLG1FOzs7Ozs7Ozs7Ozs7QUN2QmY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBbUM7QUFDVjtBQUtlO0FBQ1Y7QUFDc0I7O0FBRXBEO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixrREFBUyxDQUFDLGtEQUFXO0FBQzdDLDBCQUEwQixrREFBUyxDQUFDLG9EQUFhO0FBQ2pELG1CQUFtQiw4Q0FBTTtBQUN6QixxQkFBcUIsOENBQU07O0FBRTNCLDhEQUFZOztBQUVaLDhEQUFZOztBQUVaO0FBQ0E7QUFDQSxJQUFJLGlFQUFlO0FBQ25CLElBQUksaUVBQWUsQ0FBQyw4REFBWTtBQUNoQyxDQUFDOztBQUVELDhEQUFZOzs7Ozs7Ozs7Ozs7O0FDNUJaO0FBQUE7QUFBQTtBQUFBO0FBQXlCOztBQUV6QixrQkFBa0IsNkNBQUk7QUFDdEIsa0JBQWtCLDZDQUFJO0FBQ3RCLGtCQUFrQiw2Q0FBSTtBQUN0QixrQkFBa0IsNkNBQUk7QUFDdEIsa0JBQWtCLDZDQUFJO0FBQ3RCLGtCQUFrQiw2Q0FBSTtBQUN0QixrQkFBa0IsNkNBQUk7QUFDdEIsa0JBQWtCLDZDQUFJOztBQUV0QixtQkFBbUIsNkNBQUk7QUFDdkIsbUJBQW1CLDZDQUFJO0FBQ3ZCLG1CQUFtQiw2Q0FBSTtBQUN2QixtQkFBbUIsNkNBQUk7QUFDdkIsbUJBQW1CLDZDQUFJO0FBQ3ZCLG1CQUFtQiw2Q0FBSTtBQUN2QixtQkFBbUIsNkNBQUk7QUFDdkIsbUJBQW1CLDZDQUFJOztBQUV2QjtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BCQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImNsYXNzIEdhbWVCb2FyZCB7XG4gICAgXG4gICAgY29uc3RydWN0b3Ioc2hpcHMsIG93bmVyKSB7XG4gICAgICAgIHRoaXMuZ3JpZCA9IG5ldyBBcnJheSgxMDApXG4gICAgICAgIHRoaXMubnVtUm93cyA9IDEwXG4gICAgICAgIHRoaXMubnVtQ29sdW1ucyA9IDEwXG4gICAgICAgIHRoaXMuc2hpcHMgPSBzaGlwc1xuICAgICAgICB0aGlzLm93bmVyID0gb3duZXJcbiAgICAgICAgdGhpcy52aXNpdGVkQ2VsbHMgPSBbXVxuICAgICAgICB0aGlzLmRhbWFnZWRTaGlwcyA9IDBcbiAgICB9XG4gICAgXG4gICAgc2V0U2hpcHNQb3NpdGlvbihzaGlwLCBsb2NhdGlvbikge1xuICAgICAgICBzaGlwLmxvY2F0aW9uID0gbG9jYXRpb247XG4gICAgICAgIHRoaXMuc2hpcHMucHVzaChzaGlwKTtcbiAgICB9XG5cbiAgICBpc0FsbFNoaXBTdW5rKCkge1xuICAgICAgICBsZXQgY291bnQgPSAwXG4gICAgICAgIHRoaXMuc2hpcHMuZm9yRWFjaChzaGlwID0+IHtcbiAgICAgICAgICAgIGlmKHNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgICAgICAgICBjb3VudCsrXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZihjb3VudCA+PSB0aGlzLnNoaXBzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVjZWl2ZVN0cmlrZShzcG90KSB7XG4gICAgICAgIGlmKCF0aGlzLmlzQWxsU2hpcFN1bmsoKSkge1xuICAgICAgICAgICAgaWYoIXRoaXMuaXNQb3NpdGlvblRha2VuKHNwb3QpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52aXNpdGVkQ2VsbHMucHVzaChzcG90KVxuICAgICAgICAgICAgICAgIHRoaXMuc2hpcHMuZm9yRWFjaChzaGlwID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYoc2hpcC5pc0hpdChzcG90KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGl0U3BvdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNwb3QpXG4gICAgICAgICAgICAgICAgICAgICAgICBoaXRTcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiaGl0LXNwb3RcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlNZXNzYWdlKFwiT25lIEVuZW15IHNoaXAgRGVzdHJveWVkXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5pc0FsbFNoaXBTdW5rKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5TWVzc2FnZShcIkdhbWUgb3ZlciBhbGwgc2hpcHMgZGVzdHJveWVkXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgQnJlYWtFeGNlcHRpb25cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgY29uc3QgbG9jYXRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzcG90KVxuICAgICAgICAgICAgICAgIGxvY2F0aW9uLmlubmVySFRNTCA9IFwiWFwiXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheU1lc3NhZ2UoXCJjaG9vc2UgYW5vdGhlciBzcG90XCIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlNZXNzYWdlKFwiR2FtZSBvdmVyIGFsbCBzaGlwcyBkZXN0cm95ZWRcIilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzUG9zaXRpb25UYWtlbihwb3NpdGlvbikge1xuICAgICAgICBpZih0aGlzLnZpc2l0ZWRDZWxscy5pbmNsdWRlcyhwb3NpdGlvbikpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIFxuICAgIH1cblxuICAgIHJlbmRlckJvYXJkIChwYXJlbnQpe1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5udW1Sb3dzOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKVxuICAgICAgICAgICAgcm93LnNldEF0dHJpYnV0ZShcImlkXCIsIGByb3ctJHtpfWApXG4gICAgICAgICAgICByb3cuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJyb3dcIilcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCB0aGlzLm51bUNvbHVtbnM7IGorKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJylcbiAgICAgICAgICAgICAgICBib3guc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7dGhpcy5vd25lcn0ke2l9JHtqfWApXG4gICAgICAgICAgICAgICAgYm94LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiYm94XCIpXG4gICAgICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKGJveClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChyb3cpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmKHRoaXMub3duZXIgPT09IFwicFwiKSB7XG4gICAgICAgICAgICB0aGlzLnNoaXBzLmZvckVhY2goc2hpcCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGFjZVNoaXAoc2hpcClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IFxuICAgIH1cblxuICAgIHBsYWNlU2hpcChzaGlwKSB7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzaGlwLmxvY2F0aW9uLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBib3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzaGlwLmxvY2F0aW9uW2ldKVxuICAgICAgICAgICAgYm94LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiYm94LXNoaXBcIilcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAgZGlzcGxheU1lc3NhZ2UobWVzc2FnZSkge1xuICAgICAgICBjb25zdCBtZXNzYWdlQXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWVzc2FnZVwiKVxuICAgICAgICBtZXNzYWdlQXJlYS5pbm5lckhUTUwgPSBtZXNzYWdlXG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgR2FtZUJvYXJkIiwiLy8gaW1wb3J0IHsgaXNNb2R1bGVTcGVjaWZpZXIgfSBmcm9tIFwiQGJhYmVsL3R5cGVzXCI7XG5cbmNsYXNzIFBsYXllciB7XG4gICAgY29uc3RydWN0b3IobmFtZSwgYm9hcmQpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZVxuICAgICAgICB0aGlzLmJvYXJkID0gYm9hcmQ7XG4gICAgICAgIHRoaXMudHVybiA9IGZhbHNlO1xuICAgIH1cbn1cblxuLy9leHBvcnQgZGVmYXVsdCBQbGF5ZXJcbm1vZHVsZS5leHBvcnRzID0gUGxheWVyOyIsImNsYXNzIFNoaXAge1xuXG4gICAgY29uc3RydWN0b3IobG9jYXRpb24pIHtcbiAgICAgICAgdGhpcy5sb2NhdGlvbiA9IGxvY2F0aW9uO1xuICAgICAgICB0aGlzLmhpdHMgPSAwO1xuICAgIH1cblxuICAgIGlzSGl0KHBvc2l0aW9uKSB7XG4gICAgICAgIGlmKHRoaXMubG9jYXRpb24uaW5jbHVkZXMocG9zaXRpb24pKSB7XG4gICAgICAgICAgICB0aGlzLmhpdHMrKztcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IFxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIFxuICAgIGlzU3VuaygpIHtcbiAgICAgICAgaWYodGhpcy5oaXRzID49IHRoaXMubG9jYXRpb24ubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTaGlwIiwiaW1wb3J0IEdhbWVCb2FyZCBmcm9tICcuL0dhbWVCb2FyZCdcbmltcG9ydCBTaGlwIGZyb20gJy4vU2hpcCdcbmltcG9ydCB7IFxuICAgICAgICBtYXJrSGl0TG9jYXRpb24sIFxuICAgICAgICBjbGVhck1lc3NhZ2UsIFxuICAgICAgICBkaXNwbGF5Qm9hcmQsXG4gICAgICAgIGdlbmVyYXRlU3BvdCB9IGZyb20gJy4vdWx0aWxpdHknXG5pbXBvcnQgUGxheWVyIGZyb20gJy4vUGxheWVyJztcbmltcG9ydCB7IHBsYXllclNoaXBzLCBjb21wdXRlclNoaXBzIH0gZnJvbSAnLi9zaGlwcydcblxuY29uc3QgcGxheWVyUGFyZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXIxLWJvYXJkXCIpXG5jb25zdCBjb21wdXRlclBhcmVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyMi1ib2FyZFwiKVxuY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250YWluZXJcIilcbmNvbnN0IHBsYXllckJvYXJkID0gbmV3IEdhbWVCb2FyZChwbGF5ZXJTaGlwcywgXCJwXCIpXG5jb25zdCBjb21wdXRlckJvYXJkID0gbmV3IEdhbWVCb2FyZChjb21wdXRlclNoaXBzLCBcImNcIilcbmNvbnN0IHBsYXllciA9IG5ldyBQbGF5ZXIoXCJwbGF5ZXJcIiwgcGxheWVyQm9hcmQpXG5jb25zdCBjb21wdXRlciA9IG5ldyBQbGF5ZXIoXCJjb21wdXRlclwiLCBjb21wdXRlckJvYXJkKVxuXG5kaXNwbGF5Qm9hcmQocGxheWVyQm9hcmQsIHBsYXllclBhcmVudClcblxuZGlzcGxheUJvYXJkKGNvbXB1dGVyQm9hcmQsIGNvbXB1dGVyUGFyZW50KVxuXG5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgY29uc29sZS5sb2coZS50YXJnZXQuaWQpXG4gICAgbWFya0hpdExvY2F0aW9uKGUudGFyZ2V0LmlkLCBjb21wdXRlckJvYXJkKVxuICAgIG1hcmtIaXRMb2NhdGlvbihnZW5lcmF0ZVNwb3QocGxheWVyQm9hcmQpLCBwbGF5ZXJCb2FyZClcbn0pXG5cbmNsZWFyTWVzc2FnZSgpXG4iLCJpbXBvcnQgU2hpcCBmcm9tICcuL1NoaXAnXG5cbmNvbnN0IHNoaXAxID0gbmV3IFNoaXAoW1wicDAwXCIsIFwicDAxXCIsIFwicDAyXCJdKVxuY29uc3Qgc2hpcDIgPSBuZXcgU2hpcChbXCJwNjdcIiwgXCJwNzdcIiwgXCJwODdcIl0pXG5jb25zdCBzaGlwMyA9IG5ldyBTaGlwKFtcInA1MVwiLCBcInA2MVwiXSlcbmNvbnN0IHNoaXA0ID0gbmV3IFNoaXAoW1wicDM3XCIsIFwicDM4XCJdKVxuY29uc3Qgc2hpcDUgPSBuZXcgU2hpcChbXCJwMjRcIiwgXCJwMzRcIiwgXCJwNDRcIiwgXCJwNTRcIl0pXG5jb25zdCBzaGlwNiA9IG5ldyBTaGlwKFtcInAxN1wiXSlcbmNvbnN0IHNoaXA3ID0gbmV3IFNoaXAoW1wicDkyXCJdKVxuY29uc3Qgc2hpcDggPSBuZXcgU2hpcChbXCJwNzNcIiwgXCJwNzRcIiwgXCJwNzVcIl0pXG5cbmNvbnN0IGNzaGlwMSA9IG5ldyBTaGlwKFtcImMwMFwiLCBcImMwMVwiLCBcImMwMlwiXSlcbmNvbnN0IGNzaGlwMiA9IG5ldyBTaGlwKFtcImM2N1wiLCBcImM3N1wiLCBcImM4N1wiXSlcbmNvbnN0IGNzaGlwMyA9IG5ldyBTaGlwKFtcImM1MVwiLCBcImM2MVwiXSlcbmNvbnN0IGNzaGlwNCA9IG5ldyBTaGlwKFtcImMzN1wiLCBcImMzOFwiXSlcbmNvbnN0IGNzaGlwNSA9IG5ldyBTaGlwKFtcImMyNFwiLCBcImMzNFwiLCBcImM0NFwiLCBcImM1NFwiXSlcbmNvbnN0IGNzaGlwNiA9IG5ldyBTaGlwKFtcImMxN1wiXSlcbmNvbnN0IGNzaGlwNyA9IG5ldyBTaGlwKFtcImM5MlwiXSlcbmNvbnN0IGNzaGlwOCA9IG5ldyBTaGlwKFtcImM3M1wiLCBcImM3NFwiLCBcImM3NVwiXSlcblxuY29uc3QgcGxheWVyU2hpcHMgPSBbc2hpcDEsIHNoaXAyLCBzaGlwMywgc2hpcDQsIHNoaXA1LCBzaGlwNiwgc2hpcDcsIHNoaXA4XVxuY29uc3QgY29tcHV0ZXJTaGlwcyA9IFtjc2hpcDEsIGNzaGlwMiwgY3NoaXAzLCBjc2hpcDQsIGNzaGlwNSwgY3NoaXA2LCBjc2hpcDcsIGNzaGlwOF1cblxuZXhwb3J0IHsgcGxheWVyU2hpcHMsIGNvbXB1dGVyU2hpcHMgfSIsIlxuY29uc3QgbWFya0hpdExvY2F0aW9uID0gKGhpdFNwb3QsIGJvYXJkKSA9PiB7XG4gICAgYm9hcmQucmVjZWl2ZVN0cmlrZShoaXRTcG90KVxufVxuXG5jb25zdCBjbGVhck1lc3NhZ2UgPSAoKSA9PiB7XG4gICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBjb25zdCBtZXNzYWdlQXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWVzc2FnZVwiKVxuICAgICAgICBtZXNzYWdlQXJlYS5pbm5lckhUTUwgPSBcIlwiXG4gICAgfSwgMTAwMDApXG59XG5cbmNvbnN0IGRpc3BsYXlCb2FyZCA9IChib2FyZCwgcGFyZW50KSA9PiB7XG4gICAgYm9hcmQucmVuZGVyQm9hcmQocGFyZW50KVxufVxuXG5jb25zdCBnZW5lcmF0ZVNwb3QgPSAoYm9hcmQpID0+IHtcbiAgICBsZXQgc3BvdCA9IFwiXCJcbiAgICBkbyB7XG4gICAgICAgIGxldCBmaXJzdERpZ2l0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjEwKVxuICAgICAgICBsZXQgc2Vjb25kRGlnaXQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMTApXG4gICAgICAgIHNwb3QgPSBcInBcIitmaXJzdERpZ2l0K3NlY29uZERpZ2l0O1xuICAgIH0gd2hpbGUoYm9hcmQuaXNQb3NpdGlvblRha2VuKHNwb3QpKVxuICAgIHJldHVybiBzcG90XG59XG5cbmV4cG9ydCB7IGRpc3BsYXlCb2FyZCwgbWFya0hpdExvY2F0aW9uLCBjbGVhck1lc3NhZ2UsIGdlbmVyYXRlU3BvdCB9Il0sInNvdXJjZVJvb3QiOiIifQ==
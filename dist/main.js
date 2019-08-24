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
    
    constructor(owner) {
        this.grid = new Array(100)
        this.numRows = 10
        this.numColumns = 10
        this.owner = owner
        this.visitedCells = []
        this.damagedShips = 0
        this.locationsTaken = []
        this.ships = this.generateShips()
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
                        //throw BreakException
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
    isPlacementSpotTaken(spot) {
        if(this.locationsTaken.includes(spot)) {
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
            console.log(ship)
            const box = document.getElementById(ship.location[i])
            box.setAttribute("class", "box-ship")
        }
    }
    
    displayMessage(message) {
        const messageArea = document.getElementById("message")
        messageArea.innerHTML = message
    }

    generateShip(lengthOfShip, orientation) {
        let location = [];
        let firstDigit = null;
        let secondDigit = null;
        let spot = ""
        while(location.length < lengthOfShip) {
            do {
                if(orientation == "horizontal") {
                    if(location.length == 0) {
                        firstDigit = Math.floor(Math.random() * 10);
                        secondDigit = Math.floor(Math.random() * 10);
                    } else if((secondDigit+lengthOfShip) <= 9){
                        secondDigit += 1
                    } else {
                        secondDigit -= 1
                    }
                } else {
                    if(location.length == 0) {
                        firstDigit = Math.floor(Math.random() * 10);
                        secondDigit = Math.floor(Math.random() * 10);
                    } else if((firstDigit+lengthOfShip) <= 9) {
                        firstDigit += 1
                    }else {
                        firstDigit -= 1
                    }
                }
                spot = this.owner+firstDigit+secondDigit
            }while(this.isPlacementSpotTaken(spot))
            location.push(spot)
            this.locationsTaken.push(spot)
        }
        return new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"](location);
    }

    generateShips () {
        let ships = []
        let i = 0
        while(i < 3) {
            ships.push(this.generateShip(3, "horizontal"))
            i++
        }
        i = 0
        while(i < 3) {
            ships.push(this.generateShip(3, "vertical"))
            i++
        }
        i = 0
        while(i < 3) {
            ships.push(this.generateShip(4, "horizontal"))
            i++
        }
        i = 0
        while(i < 3) {
            ships.push(this.generateShip(4, "vertical"))
            i++
        }
        i = 0
        while(i < 2) {
            ships.push(this.generateShip(2, "horizontal"))
            i++
        }
        i = 0
        while(i < 2) {
            ships.push(this.generateShip(1, "horizontal"))
            i++
        }
        return ships
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
/* harmony import */ var _ultility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ultility */ "./src/ultility.js");
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Player */ "./src/Player.js");
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Player__WEBPACK_IMPORTED_MODULE_2__);




const playerParent = document.getElementById("player1-board")
const computerParent = document.getElementById("player2-board")
const container = document.getElementById("container")
const playerBoard = new _GameBoard__WEBPACK_IMPORTED_MODULE_0__["default"]("p")
const computerBoard = new _GameBoard__WEBPACK_IMPORTED_MODULE_0__["default"]("c")
const player = new _Player__WEBPACK_IMPORTED_MODULE_2___default.a("player", playerBoard)
const computer = new _Player__WEBPACK_IMPORTED_MODULE_2___default.a("computer", computerBoard)

Object(_ultility__WEBPACK_IMPORTED_MODULE_1__["displayBoard"])(playerBoard, playerParent)

Object(_ultility__WEBPACK_IMPORTED_MODULE_1__["displayBoard"])(computerBoard, computerParent)

container.addEventListener("click", (e) => {
    console.log(e.target.id)
    Object(_ultility__WEBPACK_IMPORTED_MODULE_1__["markHitLocation"])(e.target.id, computerBoard)
    Object(_ultility__WEBPACK_IMPORTED_MODULE_1__["markHitLocation"])(Object(_ultility__WEBPACK_IMPORTED_MODULE_1__["generateSpot"])(playerBoard), playerBoard)
})

Object(_ultility__WEBPACK_IMPORTED_MODULE_1__["clearMessage"])()



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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dhbWVCb2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUGxheWVyLmpzIiwid2VicGFjazovLy8uL3NyYy9TaGlwLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdWx0aWxpdHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQXlCOztBQUV6Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0JBQXNCLGtCQUFrQjtBQUN4QztBQUNBLDBDQUEwQyxFQUFFO0FBQzVDO0FBQ0EsMEJBQTBCLHFCQUFxQjtBQUMvQztBQUNBLDBDQUEwQyxXQUFXLEVBQUUsRUFBRSxFQUFFLEVBQUU7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsUztBQUNBOztBQUVBO0FBQ0Esc0JBQXNCLDBCQUEwQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLDZDQUFJO0FBQ3ZCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDZSx3RTs7Ozs7Ozs7Ozs7QUNsTGYsV0FBVyxvQkFBb0I7O0FBRS9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0I7Ozs7Ozs7Ozs7OztBQ1hBO0FBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZSxtRTs7Ozs7Ozs7Ozs7O0FDdkJmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBbUM7QUFLSztBQUNWOztBQUU5QjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0Isa0RBQVM7QUFDakMsMEJBQTBCLGtEQUFTO0FBQ25DLG1CQUFtQiw4Q0FBTTtBQUN6QixxQkFBcUIsOENBQU07O0FBRTNCLDhEQUFZOztBQUVaLDhEQUFZOztBQUVaO0FBQ0E7QUFDQSxJQUFJLGlFQUFlO0FBQ25CLElBQUksaUVBQWUsQ0FBQyw4REFBWTtBQUNoQyxDQUFDOztBQUVELDhEQUFZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pCWjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImltcG9ydCBTaGlwIGZyb20gJy4vU2hpcCdcblxuY2xhc3MgR2FtZUJvYXJkIHtcbiAgICBcbiAgICBjb25zdHJ1Y3Rvcihvd25lcikge1xuICAgICAgICB0aGlzLmdyaWQgPSBuZXcgQXJyYXkoMTAwKVxuICAgICAgICB0aGlzLm51bVJvd3MgPSAxMFxuICAgICAgICB0aGlzLm51bUNvbHVtbnMgPSAxMFxuICAgICAgICB0aGlzLm93bmVyID0gb3duZXJcbiAgICAgICAgdGhpcy52aXNpdGVkQ2VsbHMgPSBbXVxuICAgICAgICB0aGlzLmRhbWFnZWRTaGlwcyA9IDBcbiAgICAgICAgdGhpcy5sb2NhdGlvbnNUYWtlbiA9IFtdXG4gICAgICAgIHRoaXMuc2hpcHMgPSB0aGlzLmdlbmVyYXRlU2hpcHMoKVxuICAgIH1cbiAgICBcbiAgICBzZXRTaGlwc1Bvc2l0aW9uKHNoaXAsIGxvY2F0aW9uKSB7XG4gICAgICAgIHNoaXAubG9jYXRpb24gPSBsb2NhdGlvbjtcbiAgICAgICAgdGhpcy5zaGlwcy5wdXNoKHNoaXApO1xuICAgIH1cblxuICAgIGlzQWxsU2hpcFN1bmsoKSB7XG4gICAgICAgIGxldCBjb3VudCA9IDBcbiAgICAgICAgdGhpcy5zaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgICAgICAgaWYoc2hpcC5pc1N1bmsoKSkge1xuICAgICAgICAgICAgICAgIGNvdW50KytcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmKGNvdW50ID49IHRoaXMuc2hpcHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWNlaXZlU3RyaWtlKHNwb3QpIHtcbiAgICAgICAgaWYoIXRoaXMuaXNBbGxTaGlwU3VuaygpKSB7XG4gICAgICAgICAgICBpZighdGhpcy5pc1Bvc2l0aW9uVGFrZW4oc3BvdCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZpc2l0ZWRDZWxscy5wdXNoKHNwb3QpXG4gICAgICAgICAgICAgICAgdGhpcy5zaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZihzaGlwLmlzSGl0KHNwb3QpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoaXRTcG90ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc3BvdClcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpdFNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJoaXQtc3BvdFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2hpcC5pc1N1bmsoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheU1lc3NhZ2UoXCJPbmUgRW5lbXkgc2hpcCBEZXN0cm95ZWRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmlzQWxsU2hpcFN1bmsoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlNZXNzYWdlKFwiR2FtZSBvdmVyIGFsbCBzaGlwcyBkZXN0cm95ZWRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3Rocm93IEJyZWFrRXhjZXB0aW9uXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIGNvbnN0IGxvY2F0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc3BvdClcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5pbm5lckhUTUwgPSBcIlhcIlxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlNZXNzYWdlKFwiY2hvb3NlIGFub3RoZXIgc3BvdFwiKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5TWVzc2FnZShcIkdhbWUgb3ZlciBhbGwgc2hpcHMgZGVzdHJveWVkXCIpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc1Bvc2l0aW9uVGFrZW4ocG9zaXRpb24pIHtcbiAgICAgICAgaWYodGhpcy52aXNpdGVkQ2VsbHMuaW5jbHVkZXMocG9zaXRpb24pKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICBcbiAgICB9XG4gICAgaXNQbGFjZW1lbnRTcG90VGFrZW4oc3BvdCkge1xuICAgICAgICBpZih0aGlzLmxvY2F0aW9uc1Rha2VuLmluY2x1ZGVzKHNwb3QpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIHJlbmRlckJvYXJkIChwYXJlbnQpe1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5udW1Sb3dzOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKVxuICAgICAgICAgICAgcm93LnNldEF0dHJpYnV0ZShcImlkXCIsIGByb3ctJHtpfWApXG4gICAgICAgICAgICByb3cuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJyb3dcIilcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCB0aGlzLm51bUNvbHVtbnM7IGorKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJylcbiAgICAgICAgICAgICAgICBib3guc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7dGhpcy5vd25lcn0ke2l9JHtqfWApXG4gICAgICAgICAgICAgICAgYm94LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiYm94XCIpXG4gICAgICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKGJveClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChyb3cpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmKHRoaXMub3duZXIgPT09IFwicFwiKSB7XG4gICAgICAgICAgICB0aGlzLnNoaXBzLmZvckVhY2goc2hpcCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGFjZVNoaXAoc2hpcClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IFxuICAgIH1cblxuICAgIHBsYWNlU2hpcChzaGlwKSB7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzaGlwLmxvY2F0aW9uLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzaGlwKVxuICAgICAgICAgICAgY29uc3QgYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2hpcC5sb2NhdGlvbltpXSlcbiAgICAgICAgICAgIGJveC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImJveC1zaGlwXCIpXG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgZGlzcGxheU1lc3NhZ2UobWVzc2FnZSkge1xuICAgICAgICBjb25zdCBtZXNzYWdlQXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWVzc2FnZVwiKVxuICAgICAgICBtZXNzYWdlQXJlYS5pbm5lckhUTUwgPSBtZXNzYWdlXG4gICAgfVxuXG4gICAgZ2VuZXJhdGVTaGlwKGxlbmd0aE9mU2hpcCwgb3JpZW50YXRpb24pIHtcbiAgICAgICAgbGV0IGxvY2F0aW9uID0gW107XG4gICAgICAgIGxldCBmaXJzdERpZ2l0ID0gbnVsbDtcbiAgICAgICAgbGV0IHNlY29uZERpZ2l0ID0gbnVsbDtcbiAgICAgICAgbGV0IHNwb3QgPSBcIlwiXG4gICAgICAgIHdoaWxlKGxvY2F0aW9uLmxlbmd0aCA8IGxlbmd0aE9mU2hpcCkge1xuICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgIGlmKG9yaWVudGF0aW9uID09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKGxvY2F0aW9uLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdERpZ2l0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kRGlnaXQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZigoc2Vjb25kRGlnaXQrbGVuZ3RoT2ZTaGlwKSA8PSA5KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlY29uZERpZ2l0ICs9IDFcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlY29uZERpZ2l0IC09IDFcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKGxvY2F0aW9uLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdERpZ2l0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kRGlnaXQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZigoZmlyc3REaWdpdCtsZW5ndGhPZlNoaXApIDw9IDkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0RGlnaXQgKz0gMVxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdERpZ2l0IC09IDFcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzcG90ID0gdGhpcy5vd25lcitmaXJzdERpZ2l0K3NlY29uZERpZ2l0XG4gICAgICAgICAgICB9d2hpbGUodGhpcy5pc1BsYWNlbWVudFNwb3RUYWtlbihzcG90KSlcbiAgICAgICAgICAgIGxvY2F0aW9uLnB1c2goc3BvdClcbiAgICAgICAgICAgIHRoaXMubG9jYXRpb25zVGFrZW4ucHVzaChzcG90KVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgU2hpcChsb2NhdGlvbik7XG4gICAgfVxuXG4gICAgZ2VuZXJhdGVTaGlwcyAoKSB7XG4gICAgICAgIGxldCBzaGlwcyA9IFtdXG4gICAgICAgIGxldCBpID0gMFxuICAgICAgICB3aGlsZShpIDwgMykge1xuICAgICAgICAgICAgc2hpcHMucHVzaCh0aGlzLmdlbmVyYXRlU2hpcCgzLCBcImhvcml6b250YWxcIikpXG4gICAgICAgICAgICBpKytcbiAgICAgICAgfVxuICAgICAgICBpID0gMFxuICAgICAgICB3aGlsZShpIDwgMykge1xuICAgICAgICAgICAgc2hpcHMucHVzaCh0aGlzLmdlbmVyYXRlU2hpcCgzLCBcInZlcnRpY2FsXCIpKVxuICAgICAgICAgICAgaSsrXG4gICAgICAgIH1cbiAgICAgICAgaSA9IDBcbiAgICAgICAgd2hpbGUoaSA8IDMpIHtcbiAgICAgICAgICAgIHNoaXBzLnB1c2godGhpcy5nZW5lcmF0ZVNoaXAoNCwgXCJob3Jpem9udGFsXCIpKVxuICAgICAgICAgICAgaSsrXG4gICAgICAgIH1cbiAgICAgICAgaSA9IDBcbiAgICAgICAgd2hpbGUoaSA8IDMpIHtcbiAgICAgICAgICAgIHNoaXBzLnB1c2godGhpcy5nZW5lcmF0ZVNoaXAoNCwgXCJ2ZXJ0aWNhbFwiKSlcbiAgICAgICAgICAgIGkrK1xuICAgICAgICB9XG4gICAgICAgIGkgPSAwXG4gICAgICAgIHdoaWxlKGkgPCAyKSB7XG4gICAgICAgICAgICBzaGlwcy5wdXNoKHRoaXMuZ2VuZXJhdGVTaGlwKDIsIFwiaG9yaXpvbnRhbFwiKSlcbiAgICAgICAgICAgIGkrK1xuICAgICAgICB9XG4gICAgICAgIGkgPSAwXG4gICAgICAgIHdoaWxlKGkgPCAyKSB7XG4gICAgICAgICAgICBzaGlwcy5wdXNoKHRoaXMuZ2VuZXJhdGVTaGlwKDEsIFwiaG9yaXpvbnRhbFwiKSlcbiAgICAgICAgICAgIGkrK1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzaGlwc1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEdhbWVCb2FyZCIsIi8vIGltcG9ydCB7IGlzTW9kdWxlU3BlY2lmaWVyIH0gZnJvbSBcIkBiYWJlbC90eXBlc1wiO1xuXG5jbGFzcyBQbGF5ZXIge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGJvYXJkKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWVcbiAgICAgICAgdGhpcy5ib2FyZCA9IGJvYXJkO1xuICAgICAgICB0aGlzLnR1cm4gPSBmYWxzZTtcbiAgICB9XG59XG5cbi8vZXhwb3J0IGRlZmF1bHQgUGxheWVyXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXllcjsiLCJjbGFzcyBTaGlwIHtcblxuICAgIGNvbnN0cnVjdG9yKGxvY2F0aW9uKSB7XG4gICAgICAgIHRoaXMubG9jYXRpb24gPSBsb2NhdGlvbjtcbiAgICAgICAgdGhpcy5oaXRzID0gMDtcbiAgICB9XG5cbiAgICBpc0hpdChwb3NpdGlvbikge1xuICAgICAgICBpZih0aGlzLmxvY2F0aW9uLmluY2x1ZGVzKHBvc2l0aW9uKSkge1xuICAgICAgICAgICAgdGhpcy5oaXRzKys7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBcbiAgICBpc1N1bmsoKSB7XG4gICAgICAgIGlmKHRoaXMuaGl0cyA+PSB0aGlzLmxvY2F0aW9uLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2hpcCIsImltcG9ydCBHYW1lQm9hcmQgZnJvbSAnLi9HYW1lQm9hcmQnXG5pbXBvcnQgeyBcbiAgICAgICAgbWFya0hpdExvY2F0aW9uLCBcbiAgICAgICAgY2xlYXJNZXNzYWdlLCBcbiAgICAgICAgZGlzcGxheUJvYXJkLFxuICAgICAgICBnZW5lcmF0ZVNwb3QgfSBmcm9tICcuL3VsdGlsaXR5J1xuaW1wb3J0IFBsYXllciBmcm9tICcuL1BsYXllcic7XG5cbmNvbnN0IHBsYXllclBhcmVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyMS1ib2FyZFwiKVxuY29uc3QgY29tcHV0ZXJQYXJlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllcjItYm9hcmRcIilcbmNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFpbmVyXCIpXG5jb25zdCBwbGF5ZXJCb2FyZCA9IG5ldyBHYW1lQm9hcmQoXCJwXCIpXG5jb25zdCBjb21wdXRlckJvYXJkID0gbmV3IEdhbWVCb2FyZChcImNcIilcbmNvbnN0IHBsYXllciA9IG5ldyBQbGF5ZXIoXCJwbGF5ZXJcIiwgcGxheWVyQm9hcmQpXG5jb25zdCBjb21wdXRlciA9IG5ldyBQbGF5ZXIoXCJjb21wdXRlclwiLCBjb21wdXRlckJvYXJkKVxuXG5kaXNwbGF5Qm9hcmQocGxheWVyQm9hcmQsIHBsYXllclBhcmVudClcblxuZGlzcGxheUJvYXJkKGNvbXB1dGVyQm9hcmQsIGNvbXB1dGVyUGFyZW50KVxuXG5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgY29uc29sZS5sb2coZS50YXJnZXQuaWQpXG4gICAgbWFya0hpdExvY2F0aW9uKGUudGFyZ2V0LmlkLCBjb21wdXRlckJvYXJkKVxuICAgIG1hcmtIaXRMb2NhdGlvbihnZW5lcmF0ZVNwb3QocGxheWVyQm9hcmQpLCBwbGF5ZXJCb2FyZClcbn0pXG5cbmNsZWFyTWVzc2FnZSgpXG5cbiIsIlxuY29uc3QgbWFya0hpdExvY2F0aW9uID0gKGhpdFNwb3QsIGJvYXJkKSA9PiB7XG4gICAgYm9hcmQucmVjZWl2ZVN0cmlrZShoaXRTcG90KVxufVxuXG5jb25zdCBjbGVhck1lc3NhZ2UgPSAoKSA9PiB7XG4gICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBjb25zdCBtZXNzYWdlQXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWVzc2FnZVwiKVxuICAgICAgICBtZXNzYWdlQXJlYS5pbm5lckhUTUwgPSBcIlwiXG4gICAgfSwgMTAwMDApXG59XG5cbmNvbnN0IGRpc3BsYXlCb2FyZCA9IChib2FyZCwgcGFyZW50KSA9PiB7XG4gICAgYm9hcmQucmVuZGVyQm9hcmQocGFyZW50KVxufVxuXG5jb25zdCBnZW5lcmF0ZVNwb3QgPSAoYm9hcmQpID0+IHtcbiAgICBsZXQgc3BvdCA9IFwiXCJcbiAgICBkbyB7XG4gICAgICAgIGxldCBmaXJzdERpZ2l0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjEwKVxuICAgICAgICBsZXQgc2Vjb25kRGlnaXQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMTApXG4gICAgICAgIHNwb3QgPSBcInBcIitmaXJzdERpZ2l0K3NlY29uZERpZ2l0O1xuICAgIH0gd2hpbGUoYm9hcmQuaXNQb3NpdGlvblRha2VuKHNwb3QpKVxuICAgIHJldHVybiBzcG90XG59XG5cbmV4cG9ydCB7IGRpc3BsYXlCb2FyZCwgbWFya0hpdExvY2F0aW9uLCBjbGVhck1lc3NhZ2UsIGdlbmVyYXRlU3BvdCB9Il0sInNvdXJjZVJvb3QiOiIifQ==
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
    
    setShipsPosition() {

    }

    isShipsSunk() {
        
    }

    receiveStrike(position) {
        if(!this.isPositionTaken(position)) {
            this.visitedCells.push(position)
            return true
        } else {
            return false
        }
    }

    isPositionTaken(position) {
        if(this.visitedCells.includes(position)) {
            return true
        } else {
            return false
        }
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
        } else {
            return false
        }
    }
    isSunk() {
        if(this.hits >= this.location.length) {
            return true
        } else {
            return false
        }
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
    
    board.ships.forEach(ship => {
        placeShip(ship)
    });
    
}

const placeShip = (ship) => {
    for(let i = 0; i < ship.location.length; i++) {
        const box = document.getElementById(ship.location[i])
        box.setAttribute("class", "box-ship")
    }
}

const markHitLocation = (hitSpot, board) => {
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

const displayMessage = (message) => {
    const messageArea = document.getElementById("message")
    messageArea.innerHTML = message
}

const clearMessage = () => {
    setInterval(() => {
        const messageArea = document.getElementById("message")
        messageArea.innerHTML = ""
    }, 3000)
}





/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dhbWVCb2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUGxheWVyLmpzIiwid2VicGFjazovLy8uL3NyYy9TaGlwLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdWx0aWxpdHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNlLHdFOzs7Ozs7Ozs7Ozs7QUN0Q2Y7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVlLHFFOzs7Ozs7Ozs7Ozs7QUNSZjtBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVlLG1FOzs7Ozs7Ozs7Ozs7QUN6QmY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFtQztBQUNWO0FBQzZDO0FBQ3hDOztBQUU5QjtBQUNBO0FBQ0Esd0JBQXdCLDZDQUFJO0FBQzVCLHdCQUF3Qiw2Q0FBSTtBQUM1QixtQkFBbUIsNkNBQUk7QUFDdkIsbUJBQW1CLDZDQUFJO0FBQ3ZCLHdCQUF3QixrREFBUztBQUNqQywwQkFBMEIsa0RBQVM7QUFDbkMsbUJBQW1CLCtDQUFNO0FBQ3pCLHFCQUFxQiwrQ0FBTTs7QUFFM0IsNkRBQVc7O0FBRVgsNkRBQVc7O0FBRVg7QUFDQTtBQUNBLElBQUksaUVBQWU7QUFDbkIsQ0FBQzs7QUFFRCw4REFBWTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeEJaO0FBQ0Esa0JBQWtCLG1CQUFtQjtBQUNyQztBQUNBLHNDQUFzQyxFQUFFO0FBQ3hDO0FBQ0Esc0JBQXNCLHNCQUFzQjtBQUM1QztBQUNBLHNDQUFzQyxZQUFZLEVBQUUsRUFBRSxFQUFFLEVBQUU7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBLGtCQUFrQiwwQkFBMEI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJjbGFzcyBHYW1lQm9hcmQge1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKHNoaXBzLCBvd25lcikge1xuICAgICAgICB0aGlzLmdyaWQgPSBuZXcgQXJyYXkoMTAwKVxuICAgICAgICB0aGlzLm51bVJvd3MgPSAxMFxuICAgICAgICB0aGlzLm51bUNvbHVtbnMgPSAxMFxuICAgICAgICB0aGlzLnNoaXBzID0gc2hpcHNcbiAgICAgICAgdGhpcy5vd25lciA9IG93bmVyXG4gICAgICAgIHRoaXMudmlzaXRlZENlbGxzID0gW11cbiAgICAgICAgdGhpcy5kYW1hZ2VkU2hpcHMgPSAwXG4gICAgfVxuICAgIFxuICAgIHNldFNoaXBzUG9zaXRpb24oKSB7XG5cbiAgICB9XG5cbiAgICBpc1NoaXBzU3VuaygpIHtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgcmVjZWl2ZVN0cmlrZShwb3NpdGlvbikge1xuICAgICAgICBpZighdGhpcy5pc1Bvc2l0aW9uVGFrZW4ocG9zaXRpb24pKSB7XG4gICAgICAgICAgICB0aGlzLnZpc2l0ZWRDZWxscy5wdXNoKHBvc2l0aW9uKVxuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNQb3NpdGlvblRha2VuKHBvc2l0aW9uKSB7XG4gICAgICAgIGlmKHRoaXMudmlzaXRlZENlbGxzLmluY2x1ZGVzKHBvc2l0aW9uKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgfVxuICAgIFxufVxuZXhwb3J0IGRlZmF1bHQgR2FtZUJvYXJkIiwiY2xhc3MgUGxheWVyIHtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGJvYXJkKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWVcbiAgICAgICAgdGhpcy5ib2FyZCA9IGJvYXJkXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXIiLCJjbGFzcyBTaGlwIHtcblxuICAgIGNvbnN0cnVjdG9yKGxlbmd0aCwgbG9jYXRpb24pIHtcbiAgICAgICAgdGhpcy5sZW5ndGggPSBsZW5ndGhcbiAgICAgICAgdGhpcy5sb2NhdGlvbiA9IGxvY2F0aW9uXG4gICAgICAgIHRoaXMuaGl0cyA9IDBcbiAgICB9XG5cbiAgICBpc0hpdChwb3NpdGlvbikge1xuICAgICAgICBpZih0aGlzLmxvY2F0aW9uLmluY2x1ZGVzKHBvc2l0aW9uKSkge1xuICAgICAgICAgICAgdGhpcy5oaXRzKytcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgIH1cbiAgICBpc1N1bmsoKSB7XG4gICAgICAgIGlmKHRoaXMuaGl0cyA+PSB0aGlzLmxvY2F0aW9uLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTaGlwIiwiaW1wb3J0IEdhbWVCb2FyZCBmcm9tICcuL0dhbWVCb2FyZCdcbmltcG9ydCBTaGlwIGZyb20gJy4vU2hpcCdcbmltcG9ydCB7IHJlbmRlckJvYXJkLCBtYXJrSGl0TG9jYXRpb24sIGNsZWFyTWVzc2FnZX0gZnJvbSAnLi91bHRpbGl0eSdcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9QbGF5ZXInO1xuXG5jb25zdCBwbGF5ZXJQYXJlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllcjEtYm9hcmRcIilcbmNvbnN0IGNvbXB1dGVyUGFyZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXIyLWJvYXJkXCIpXG5jb25zdCBwbGF5ZXJTaGlwMSA9IG5ldyBTaGlwKDMsIFtcInAwMFwiLCBcInAwMVwiLCBcInAwMlwiXSlcbmNvbnN0IHBsYXllclNoaXAyID0gbmV3IFNoaXAoMywgW1wicDMwXCIsIFwicDQwXCIsIFwicDUwXCJdKVxuY29uc3QgY1NoaXAxID0gbmV3IFNoaXAoMywgW1wiYzAwXCIsIFwiYzAxXCIsIFwiYzAyXCJdKVxuY29uc3QgY1NoaXAyID0gbmV3IFNoaXAoMywgW1wiYzM0XCIsIFwiYzQ0XCIsIFwiYzU0XCJdKVxuY29uc3QgcGxheWVyQm9hcmQgPSBuZXcgR2FtZUJvYXJkKFtwbGF5ZXJTaGlwMSwgcGxheWVyU2hpcDJdLCBcInBcIilcbmNvbnN0IGNvbXB1dGVyQm9hcmQgPSBuZXcgR2FtZUJvYXJkKFtjU2hpcDEsIGNTaGlwMl0sIFwiY1wiKVxuY29uc3QgcGxheWVyID0gbmV3IFBsYXllcihcInBsYXllclwiLCBwbGF5ZXJCb2FyZClcbmNvbnN0IGNvbXB1dGVyID0gbmV3IFBsYXllcihcImNvbXB1dGVyXCIsIGNvbXB1dGVyQm9hcmQpXG5cbnJlbmRlckJvYXJkKHBsYXllckJvYXJkLCBwbGF5ZXJQYXJlbnQpXG5cbnJlbmRlckJvYXJkKGNvbXB1dGVyQm9hcmQsIGNvbXB1dGVyUGFyZW50KVxuXG5jb21wdXRlclBhcmVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICBjb25zb2xlLmxvZyhlLnRhcmdldC5pZClcbiAgICBtYXJrSGl0TG9jYXRpb24oZS50YXJnZXQuaWQsIGNvbXB1dGVyQm9hcmQpXG59KVxuXG5jbGVhck1lc3NhZ2UoKVxuIiwiXG5jb25zdCByZW5kZXJCb2FyZCA9IChib2FyZCwgcGFyZW50KSA9PiB7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGJvYXJkLm51bVJvd3M7IGkrKykge1xuICAgICAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIilcbiAgICAgICAgcm93LnNldEF0dHJpYnV0ZShcImlkXCIsIGByb3ctJHtpfWApXG4gICAgICAgIHJvdy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInJvd1wiKVxuICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgYm9hcmQubnVtQ29sdW1uczsgaisrKSB7XG4gICAgICAgICAgICBjb25zdCBib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpXG4gICAgICAgICAgICBib3guc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7Ym9hcmQub3duZXJ9JHtpfSR7an1gKVxuICAgICAgICAgICAgYm94LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiYm94XCIpXG4gICAgICAgICAgICByb3cuYXBwZW5kQ2hpbGQoYm94KVxuICAgICAgICB9XG4gICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChyb3cpXG4gICAgfVxuICAgIFxuICAgIGJvYXJkLnNoaXBzLmZvckVhY2goc2hpcCA9PiB7XG4gICAgICAgIHBsYWNlU2hpcChzaGlwKVxuICAgIH0pO1xuICAgIFxufVxuXG5jb25zdCBwbGFjZVNoaXAgPSAoc2hpcCkgPT4ge1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzaGlwLmxvY2F0aW9uLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNoaXAubG9jYXRpb25baV0pXG4gICAgICAgIGJveC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImJveC1zaGlwXCIpXG4gICAgfVxufVxuXG5jb25zdCBtYXJrSGl0TG9jYXRpb24gPSAoaGl0U3BvdCwgYm9hcmQpID0+IHtcbiAgICBpZihib2FyZC5yZWNlaXZlU3RyaWtlKGhpdFNwb3QpKSB7XG4gICAgICAgIGJvYXJkLnNoaXBzLmZvckVhY2goc2hpcCA9PiB7XG4gICAgICAgICAgICBpZihzaGlwLmlzSGl0KGhpdFNwb3QpKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3BvdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGhpdFNwb3QpXG4gICAgICAgICAgICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImhpdC1zcG90XCIpXG4gICAgICAgICAgICAgICAgaWYoc2hpcC5pc1N1bmsoKSkge1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TWVzc2FnZShcIk9uZSBFbmVteSBzaGlwIERlc3Ryb3llZFwiKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBCcmVha0V4Y2VwdGlvblxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBjb25zdCBsb2NhdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGhpdFNwb3QpXG4gICAgICAgIGxvY2F0aW9uLmlubmVySFRNTCA9IFwiWFwiXG4gICAgfSBlbHNlIHtcbiAgICAgICAgZGlzcGxheU1lc3NhZ2UoXCJwbGF5IGFnYWluXCIpXG4gICAgfVxufVxuXG5jb25zdCBkaXNwbGF5TWVzc2FnZSA9IChtZXNzYWdlKSA9PiB7XG4gICAgY29uc3QgbWVzc2FnZUFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1lc3NhZ2VcIilcbiAgICBtZXNzYWdlQXJlYS5pbm5lckhUTUwgPSBtZXNzYWdlXG59XG5cbmNvbnN0IGNsZWFyTWVzc2FnZSA9ICgpID0+IHtcbiAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2VBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZXNzYWdlXCIpXG4gICAgICAgIG1lc3NhZ2VBcmVhLmlubmVySFRNTCA9IFwiXCJcbiAgICB9LCAzMDAwKVxufVxuXG5cblxuZXhwb3J0IHsgcmVuZGVyQm9hcmQsIG1hcmtIaXRMb2NhdGlvbiwgY2xlYXJNZXNzYWdlIH0iXSwic291cmNlUm9vdCI6IiJ9
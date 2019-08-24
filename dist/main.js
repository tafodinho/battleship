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

/***/ "./src/gamePlay.js":
/*!*************************!*\
  !*** ./src/gamePlay.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ultility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ultility */ "./src/ultility.js");


class GamePlay {
    
    constructor(playerBorad, ComputerBoard) {
        this.playerBorad = playerBorad
        this.ComputerBoard = ComputerBoard;
    }

    playBattleShip() {
        do {
            console.log("in game");
          }
          while (!isGameOver());
          
    }
    isGameOver(){
        if(this.ComputerBoard.isAllShipSunk() || this.playerBorad.isAllShipSunk()){
            return true;
        }
        return false;
    }
   

}
/* harmony default export */ __webpack_exports__["default"] = (GamePlay);

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
/* harmony import */ var _gamePlay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gamePlay */ "./src/gamePlay.js");
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Ship */ "./src/Ship.js");
/* harmony import */ var _ultility__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ultility */ "./src/ultility.js");
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Player */ "./src/Player.js");
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_Player__WEBPACK_IMPORTED_MODULE_4__);






const computerShips = Object(_ultility__WEBPACK_IMPORTED_MODULE_3__["generateShips"])("c")
const playerShips = Object(_ultility__WEBPACK_IMPORTED_MODULE_3__["generateShips"])("p")
const playerParent = document.getElementById("player1-board")
const computerParent = document.getElementById("player2-board")
const container = document.getElementById("container")
const playerBoard = new _GameBoard__WEBPACK_IMPORTED_MODULE_0__["default"](playerShips, "p")
const computerBoard = new _GameBoard__WEBPACK_IMPORTED_MODULE_0__["default"](computerShips, "c")


Object(_ultility__WEBPACK_IMPORTED_MODULE_3__["displayBoard"])(playerBoard, playerParent)

Object(_ultility__WEBPACK_IMPORTED_MODULE_3__["displayBoard"])(computerBoard, computerParent)

container.addEventListener("click", (e) => {
    Object(_ultility__WEBPACK_IMPORTED_MODULE_3__["markHitLocation"])(e.target.id, computerBoard)
    Object(_ultility__WEBPACK_IMPORTED_MODULE_3__["markHitLocation"])(Object(_ultility__WEBPACK_IMPORTED_MODULE_3__["generateSpot"])(playerBoard), playerBoard)
})
let reset = document.querySelector(".reset");
reset.addEventListener('click', function(event) {
    Object(_ultility__WEBPACK_IMPORTED_MODULE_3__["generateShips"])("c");
    Object(_ultility__WEBPACK_IMPORTED_MODULE_3__["generateShips"])("p");
});


// clearMessage()
// const createAShip = ((lengthOfShip, owner, orientation) => {
//     let location = [];
//     let firstDigit = null;
//     let secondDigit = null;
//     let spot = ""
//     let i = 0
//     while(location.length < lengthOfShip) {
//         if(orientation == "horizontal") {
//             if(location.length == 0) {
//                 firstDigit = Math.floor(Math.random() * 10);
//                 secondDigit = Math.floor(Math.random() * 10);
//             } else {
//                 secondDigit += 1
//             }
//         } else {
//             if(location.length == 0) {
//                 firstDigit = Math.floor(Math.random() * 10);
//                 secondDigit = Math.floor(Math.random() * 10);
//             } else {
//                 firstDigit += 1
//             }
//         }
       
//         spot = owner+firstDigit+secondDigit
//         location.push(spot)
//     }
//     return new Ship(location);
// })(4, "p", "vertical")


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
const generateShips = (owner) => {
    let ships =[];
    // genereate two ships with length 4
    for(let i =0; i<2; i++){
        ships.push(createAShip(4,owner,"horizontal",ships))
    }
     // genereate three ships with length 3
    for(let i =0; i<2; i++){
        ships.push(createAShip(3,owner,null,ships))
    }
      // genereate 2 ships with length 2
    for(let i =0; i<2; i++){
        ships.push(createAShip(2,owner,"horizontal",ships))
    }
      // genereate 4 ships with length 1
    for(let i =0; i<3; i++){
        ships.push(createAShip(1,owner,null,ships))
    }
    return ships;
}

const createAShip = (lengthOfShip, owner, orientation, ships) => {
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
            } else if(secondDigit + lengthOfShip > 8){
                secondDigit -= 1
            }else{
                secondDigit +=1
            }
        } else {
            if(location.length == 0) {
                firstDigit = Math.floor(Math.random() * 10);
                secondDigit = Math.floor(Math.random() * 10);
            } else if(firstDigit + lengthOfShip > 8){
                firstDigit -= 1
            }else{
                firstDigit +=1
            }
        }
        spot = owner+firstDigit+secondDigit
        location.push(spot)
    } 
    return checkSuperImposition(ships, new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"](location),lengthOfShip, owner, orientation);
}
const checkSuperImposition = (ships, ship,lengthOfShip, owner, orientation)=> {
    let imposition = 0;
    if (ships.length >0){
        ships.forEach(function(currentValue){
            imposition = currentValue.location.filter(element => ship.location.includes(element));
        });
    }
    if (imposition == 0){
        return ship;
    }else{
       return createAShip(lengthOfShip, owner, orientation, ships)
    }
}



/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dhbWVCb2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUGxheWVyLmpzIiwid2VicGFjazovLy8uL3NyYy9TaGlwLmpzIiwid2VicGFjazovLy8uL3NyYy9nYW1lUGxheS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VsdGlsaXR5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNB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O0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJjbGFzcyBHYW1lQm9hcmQge1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKHNoaXBzLCBvd25lcikge1xuICAgICAgICB0aGlzLmdyaWQgPSBuZXcgQXJyYXkoMTAwKVxuICAgICAgICB0aGlzLm51bVJvd3MgPSAxMFxuICAgICAgICB0aGlzLm51bUNvbHVtbnMgPSAxMFxuICAgICAgICB0aGlzLnNoaXBzID0gc2hpcHNcbiAgICAgICAgdGhpcy5vd25lciA9IG93bmVyXG4gICAgICAgIHRoaXMudmlzaXRlZENlbGxzID0gW11cbiAgICAgICAgdGhpcy5kYW1hZ2VkU2hpcHMgPSAwXG4gICAgfVxuICAgIFxuICAgIHNldFNoaXBzUG9zaXRpb24oc2hpcCwgbG9jYXRpb24pIHtcbiAgICAgICAgc2hpcC5sb2NhdGlvbiA9IGxvY2F0aW9uO1xuICAgICAgICB0aGlzLnNoaXBzLnB1c2goc2hpcCk7XG4gICAgfVxuXG4gICAgaXNBbGxTaGlwU3VuaygpIHtcbiAgICAgICAgbGV0IGNvdW50ID0gMFxuICAgICAgICB0aGlzLnNoaXBzLmZvckVhY2goc2hpcCA9PiB7XG4gICAgICAgICAgICBpZihzaGlwLmlzU3VuaygpKSB7XG4gICAgICAgICAgICAgICAgY291bnQrK1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYoY291bnQgPj0gdGhpcy5zaGlwcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlY2VpdmVTdHJpa2Uoc3BvdCkge1xuICAgICAgICBpZighdGhpcy5pc0FsbFNoaXBTdW5rKCkpIHtcbiAgICAgICAgICAgIGlmKCF0aGlzLmlzUG9zaXRpb25UYWtlbihzcG90KSkge1xuICAgICAgICAgICAgICAgIHRoaXMudmlzaXRlZENlbGxzLnB1c2goc3BvdClcbiAgICAgICAgICAgICAgICB0aGlzLnNoaXBzLmZvckVhY2goc2hpcCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHNoaXAuaXNIaXQoc3BvdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhpdFNwb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzcG90KVxuICAgICAgICAgICAgICAgICAgICAgICAgaGl0U3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImhpdC1zcG90XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzaGlwLmlzU3VuaygpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5TWVzc2FnZShcIk9uZSBFbmVteSBzaGlwIERlc3Ryb3llZFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNBbGxTaGlwU3VuaygpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheU1lc3NhZ2UoXCJHYW1lIG92ZXIgYWxsIHNoaXBzIGRlc3Ryb3llZFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhyb3cgQnJlYWtFeGNlcHRpb25cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgY29uc3QgbG9jYXRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzcG90KVxuICAgICAgICAgICAgICAgIGxvY2F0aW9uLmlubmVySFRNTCA9IFwiWFwiXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheU1lc3NhZ2UoXCJjaG9vc2UgYW5vdGhlciBzcG90XCIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlNZXNzYWdlKFwiR2FtZSBvdmVyIGFsbCBzaGlwcyBkZXN0cm95ZWRcIilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzUG9zaXRpb25UYWtlbihwb3NpdGlvbikge1xuICAgICAgICBpZih0aGlzLnZpc2l0ZWRDZWxscy5pbmNsdWRlcyhwb3NpdGlvbikpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIFxuICAgIH1cblxuICAgIHJlbmRlckJvYXJkIChwYXJlbnQpe1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5udW1Sb3dzOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKVxuICAgICAgICAgICAgcm93LnNldEF0dHJpYnV0ZShcImlkXCIsIGByb3ctJHtpfWApXG4gICAgICAgICAgICByb3cuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJyb3dcIilcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCB0aGlzLm51bUNvbHVtbnM7IGorKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJylcbiAgICAgICAgICAgICAgICBib3guc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7dGhpcy5vd25lcn0ke2l9JHtqfWApXG4gICAgICAgICAgICAgICAgYm94LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiYm94XCIpXG4gICAgICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKGJveClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChyb3cpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmKHRoaXMub3duZXIgPT09IFwicFwiKSB7XG4gICAgICAgICAgICB0aGlzLnNoaXBzLmZvckVhY2goc2hpcCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGFjZVNoaXAoc2hpcClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IFxuICAgIH1cblxuICAgIHBsYWNlU2hpcChzaGlwKSB7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzaGlwLmxvY2F0aW9uLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBib3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzaGlwLmxvY2F0aW9uW2ldKVxuICAgICAgICAgICAgYm94LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiYm94LXNoaXBcIilcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAgZGlzcGxheU1lc3NhZ2UobWVzc2FnZSkge1xuICAgICAgICBjb25zdCBtZXNzYWdlQXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWVzc2FnZVwiKVxuICAgICAgICBtZXNzYWdlQXJlYS5pbm5lckhUTUwgPSBtZXNzYWdlXG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgR2FtZUJvYXJkIiwiLy8gaW1wb3J0IHsgaXNNb2R1bGVTcGVjaWZpZXIgfSBmcm9tIFwiQGJhYmVsL3R5cGVzXCI7XG5cbmNsYXNzIFBsYXllciB7XG4gICAgY29uc3RydWN0b3IobmFtZSwgYm9hcmQpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZVxuICAgICAgICB0aGlzLmJvYXJkID0gYm9hcmQ7XG4gICAgICAgIHRoaXMudHVybiA9IGZhbHNlO1xuICAgIH1cbn1cblxuLy9leHBvcnQgZGVmYXVsdCBQbGF5ZXJcbm1vZHVsZS5leHBvcnRzID0gUGxheWVyOyIsImNsYXNzIFNoaXAge1xuXG4gICAgY29uc3RydWN0b3IobG9jYXRpb24pIHtcbiAgICAgICAgdGhpcy5sb2NhdGlvbiA9IGxvY2F0aW9uO1xuICAgICAgICB0aGlzLmhpdHMgPSAwO1xuICAgIH1cblxuICAgIGlzSGl0KHBvc2l0aW9uKSB7XG4gICAgICAgIGlmKHRoaXMubG9jYXRpb24uaW5jbHVkZXMocG9zaXRpb24pKSB7XG4gICAgICAgICAgICB0aGlzLmhpdHMrKztcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IFxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIFxuICAgIGlzU3VuaygpIHtcbiAgICAgICAgaWYodGhpcy5oaXRzID49IHRoaXMubG9jYXRpb24ubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTaGlwIiwiXG5pbXBvcnQge2NyZWF0ZUFTaGlwLGNoZWNrU3VwZXJJbXBvc2l0aW9uIH0gZnJvbSAnLi91bHRpbGl0eSdcbmNsYXNzIEdhbWVQbGF5IHtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihwbGF5ZXJCb3JhZCwgQ29tcHV0ZXJCb2FyZCkge1xuICAgICAgICB0aGlzLnBsYXllckJvcmFkID0gcGxheWVyQm9yYWRcbiAgICAgICAgdGhpcy5Db21wdXRlckJvYXJkID0gQ29tcHV0ZXJCb2FyZDtcbiAgICB9XG5cbiAgICBwbGF5QmF0dGxlU2hpcCgpIHtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJpbiBnYW1lXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB3aGlsZSAoIWlzR2FtZU92ZXIoKSk7XG4gICAgICAgICAgXG4gICAgfVxuICAgIGlzR2FtZU92ZXIoKXtcbiAgICAgICAgaWYodGhpcy5Db21wdXRlckJvYXJkLmlzQWxsU2hpcFN1bmsoKSB8fCB0aGlzLnBsYXllckJvcmFkLmlzQWxsU2hpcFN1bmsoKSl7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgXG5cbn1cbmV4cG9ydCBkZWZhdWx0IEdhbWVQbGF5IiwiaW1wb3J0IEdhbWVCb2FyZCBmcm9tICcuL0dhbWVCb2FyZCdcbmltcG9ydCBHYW1lUGxheSBmcm9tICcuL2dhbWVQbGF5J1xuaW1wb3J0IFNoaXAgZnJvbSAnLi9TaGlwJ1xuaW1wb3J0IHsgXG4gICAgICAgIG1hcmtIaXRMb2NhdGlvbiwgXG4gICAgICAgIGNsZWFyTWVzc2FnZSwgXG4gICAgICAgIGRpc3BsYXlCb2FyZCxcbiAgICAgICAgZ2VuZXJhdGVTcG90LGdlbmVyYXRlU2hpcHMgfSBmcm9tICcuL3VsdGlsaXR5J1xuaW1wb3J0IFBsYXllciBmcm9tICcuL1BsYXllcic7XG5cbmNvbnN0IGNvbXB1dGVyU2hpcHMgPSBnZW5lcmF0ZVNoaXBzKFwiY1wiKVxuY29uc3QgcGxheWVyU2hpcHMgPSBnZW5lcmF0ZVNoaXBzKFwicFwiKVxuY29uc3QgcGxheWVyUGFyZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXIxLWJvYXJkXCIpXG5jb25zdCBjb21wdXRlclBhcmVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyMi1ib2FyZFwiKVxuY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250YWluZXJcIilcbmNvbnN0IHBsYXllckJvYXJkID0gbmV3IEdhbWVCb2FyZChwbGF5ZXJTaGlwcywgXCJwXCIpXG5jb25zdCBjb21wdXRlckJvYXJkID0gbmV3IEdhbWVCb2FyZChjb21wdXRlclNoaXBzLCBcImNcIilcblxuXG5kaXNwbGF5Qm9hcmQocGxheWVyQm9hcmQsIHBsYXllclBhcmVudClcblxuZGlzcGxheUJvYXJkKGNvbXB1dGVyQm9hcmQsIGNvbXB1dGVyUGFyZW50KVxuXG5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgbWFya0hpdExvY2F0aW9uKGUudGFyZ2V0LmlkLCBjb21wdXRlckJvYXJkKVxuICAgIG1hcmtIaXRMb2NhdGlvbihnZW5lcmF0ZVNwb3QocGxheWVyQm9hcmQpLCBwbGF5ZXJCb2FyZClcbn0pXG5sZXQgcmVzZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlc2V0XCIpO1xucmVzZXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xuICAgIGdlbmVyYXRlU2hpcHMoXCJjXCIpO1xuICAgIGdlbmVyYXRlU2hpcHMoXCJwXCIpO1xufSk7XG5cblxuLy8gY2xlYXJNZXNzYWdlKClcbi8vIGNvbnN0IGNyZWF0ZUFTaGlwID0gKChsZW5ndGhPZlNoaXAsIG93bmVyLCBvcmllbnRhdGlvbikgPT4ge1xuLy8gICAgIGxldCBsb2NhdGlvbiA9IFtdO1xuLy8gICAgIGxldCBmaXJzdERpZ2l0ID0gbnVsbDtcbi8vICAgICBsZXQgc2Vjb25kRGlnaXQgPSBudWxsO1xuLy8gICAgIGxldCBzcG90ID0gXCJcIlxuLy8gICAgIGxldCBpID0gMFxuLy8gICAgIHdoaWxlKGxvY2F0aW9uLmxlbmd0aCA8IGxlbmd0aE9mU2hpcCkge1xuLy8gICAgICAgICBpZihvcmllbnRhdGlvbiA9PSBcImhvcml6b250YWxcIikge1xuLy8gICAgICAgICAgICAgaWYobG9jYXRpb24ubGVuZ3RoID09IDApIHtcbi8vICAgICAgICAgICAgICAgICBmaXJzdERpZ2l0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuLy8gICAgICAgICAgICAgICAgIHNlY29uZERpZ2l0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuLy8gICAgICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgICAgICBzZWNvbmREaWdpdCArPSAxXG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgICBpZihsb2NhdGlvbi5sZW5ndGggPT0gMCkge1xuLy8gICAgICAgICAgICAgICAgIGZpcnN0RGlnaXQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4vLyAgICAgICAgICAgICAgICAgc2Vjb25kRGlnaXQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4vLyAgICAgICAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAgICAgICAgIGZpcnN0RGlnaXQgKz0gMVxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9XG4gICAgICAgXG4vLyAgICAgICAgIHNwb3QgPSBvd25lcitmaXJzdERpZ2l0K3NlY29uZERpZ2l0XG4vLyAgICAgICAgIGxvY2F0aW9uLnB1c2goc3BvdClcbi8vICAgICB9XG4vLyAgICAgcmV0dXJuIG5ldyBTaGlwKGxvY2F0aW9uKTtcbi8vIH0pKDQsIFwicFwiLCBcInZlcnRpY2FsXCIpXG4iLCJpbXBvcnQgU2hpcCBmcm9tICcuL1NoaXAnXG5cbmNvbnN0IG1hcmtIaXRMb2NhdGlvbiA9IChoaXRTcG90LCBib2FyZCkgPT4ge1xuICAgIGJvYXJkLnJlY2VpdmVTdHJpa2UoaGl0U3BvdClcbn1cblxuY29uc3QgY2xlYXJNZXNzYWdlID0gKCkgPT4ge1xuICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgY29uc3QgbWVzc2FnZUFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1lc3NhZ2VcIilcbiAgICAgICAgbWVzc2FnZUFyZWEuaW5uZXJIVE1MID0gXCJcIlxuICAgIH0sIDEwMDAwKVxufVxuXG5jb25zdCBkaXNwbGF5Qm9hcmQgPSAoYm9hcmQsIHBhcmVudCkgPT4ge1xuICAgIGJvYXJkLnJlbmRlckJvYXJkKHBhcmVudClcbn1cblxuY29uc3QgZ2VuZXJhdGVTcG90ID0gKGJvYXJkKSA9PiB7XG4gICAgbGV0IHNwb3QgPSBcIlwiXG4gICAgZG8ge1xuICAgICAgICBsZXQgZmlyc3REaWdpdCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoxMClcbiAgICAgICAgbGV0IHNlY29uZERpZ2l0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjEwKVxuICAgICAgICBzcG90ID0gXCJwXCIrZmlyc3REaWdpdCtzZWNvbmREaWdpdDtcbiAgICB9IHdoaWxlKGJvYXJkLmlzUG9zaXRpb25UYWtlbihzcG90KSlcbiAgICByZXR1cm4gc3BvdFxufVxuY29uc3QgZ2VuZXJhdGVTaGlwcyA9IChvd25lcikgPT4ge1xuICAgIGxldCBzaGlwcyA9W107XG4gICAgLy8gZ2VuZXJlYXRlIHR3byBzaGlwcyB3aXRoIGxlbmd0aCA0XG4gICAgZm9yKGxldCBpID0wOyBpPDI7IGkrKyl7XG4gICAgICAgIHNoaXBzLnB1c2goY3JlYXRlQVNoaXAoNCxvd25lcixcImhvcml6b250YWxcIixzaGlwcykpXG4gICAgfVxuICAgICAvLyBnZW5lcmVhdGUgdGhyZWUgc2hpcHMgd2l0aCBsZW5ndGggM1xuICAgIGZvcihsZXQgaSA9MDsgaTwyOyBpKyspe1xuICAgICAgICBzaGlwcy5wdXNoKGNyZWF0ZUFTaGlwKDMsb3duZXIsbnVsbCxzaGlwcykpXG4gICAgfVxuICAgICAgLy8gZ2VuZXJlYXRlIDIgc2hpcHMgd2l0aCBsZW5ndGggMlxuICAgIGZvcihsZXQgaSA9MDsgaTwyOyBpKyspe1xuICAgICAgICBzaGlwcy5wdXNoKGNyZWF0ZUFTaGlwKDIsb3duZXIsXCJob3Jpem9udGFsXCIsc2hpcHMpKVxuICAgIH1cbiAgICAgIC8vIGdlbmVyZWF0ZSA0IHNoaXBzIHdpdGggbGVuZ3RoIDFcbiAgICBmb3IobGV0IGkgPTA7IGk8MzsgaSsrKXtcbiAgICAgICAgc2hpcHMucHVzaChjcmVhdGVBU2hpcCgxLG93bmVyLG51bGwsc2hpcHMpKVxuICAgIH1cbiAgICByZXR1cm4gc2hpcHM7XG59XG5cbmNvbnN0IGNyZWF0ZUFTaGlwID0gKGxlbmd0aE9mU2hpcCwgb3duZXIsIG9yaWVudGF0aW9uLCBzaGlwcykgPT4ge1xuICAgIGxldCBsb2NhdGlvbiA9IFtdO1xuICAgIGxldCBmaXJzdERpZ2l0ID0gbnVsbDtcbiAgICBsZXQgc2Vjb25kRGlnaXQgPSBudWxsO1xuICAgIGxldCBzcG90ID0gXCJcIlxuICAgIGxldCBpID0gMFxuICAgIHdoaWxlKGxvY2F0aW9uLmxlbmd0aCA8IGxlbmd0aE9mU2hpcCkge1xuICAgICAgICBpZihvcmllbnRhdGlvbiA9PSBcImhvcml6b250YWxcIikge1xuICAgICAgICAgICAgaWYobG9jYXRpb24ubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgICBmaXJzdERpZ2l0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICAgICAgICAgIHNlY29uZERpZ2l0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICAgICAgfSBlbHNlIGlmKHNlY29uZERpZ2l0ICsgbGVuZ3RoT2ZTaGlwID4gOCl7XG4gICAgICAgICAgICAgICAgc2Vjb25kRGlnaXQgLT0gMVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgc2Vjb25kRGlnaXQgKz0xXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZihsb2NhdGlvbi5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgIGZpcnN0RGlnaXQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgICAgICAgICAgc2Vjb25kRGlnaXQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYoZmlyc3REaWdpdCArIGxlbmd0aE9mU2hpcCA+IDgpe1xuICAgICAgICAgICAgICAgIGZpcnN0RGlnaXQgLT0gMVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgZmlyc3REaWdpdCArPTFcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzcG90ID0gb3duZXIrZmlyc3REaWdpdCtzZWNvbmREaWdpdFxuICAgICAgICBsb2NhdGlvbi5wdXNoKHNwb3QpXG4gICAgfSBcbiAgICByZXR1cm4gY2hlY2tTdXBlckltcG9zaXRpb24oc2hpcHMsIG5ldyBTaGlwKGxvY2F0aW9uKSxsZW5ndGhPZlNoaXAsIG93bmVyLCBvcmllbnRhdGlvbik7XG59XG5jb25zdCBjaGVja1N1cGVySW1wb3NpdGlvbiA9IChzaGlwcywgc2hpcCxsZW5ndGhPZlNoaXAsIG93bmVyLCBvcmllbnRhdGlvbik9PiB7XG4gICAgbGV0IGltcG9zaXRpb24gPSAwO1xuICAgIGlmIChzaGlwcy5sZW5ndGggPjApe1xuICAgICAgICBzaGlwcy5mb3JFYWNoKGZ1bmN0aW9uKGN1cnJlbnRWYWx1ZSl7XG4gICAgICAgICAgICBpbXBvc2l0aW9uID0gY3VycmVudFZhbHVlLmxvY2F0aW9uLmZpbHRlcihlbGVtZW50ID0+IHNoaXAubG9jYXRpb24uaW5jbHVkZXMoZWxlbWVudCkpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGltcG9zaXRpb24gPT0gMCl7XG4gICAgICAgIHJldHVybiBzaGlwO1xuICAgIH1lbHNle1xuICAgICAgIHJldHVybiBjcmVhdGVBU2hpcChsZW5ndGhPZlNoaXAsIG93bmVyLCBvcmllbnRhdGlvbiwgc2hpcHMpXG4gICAgfVxufVxuXG5leHBvcnQgeyBkaXNwbGF5Qm9hcmQsIG1hcmtIaXRMb2NhdGlvbiwgY2xlYXJNZXNzYWdlLCBnZW5lcmF0ZVNwb3QsIGNyZWF0ZUFTaGlwLCBjaGVja1N1cGVySW1wb3NpdGlvbixnZW5lcmF0ZVNoaXBzIH0iXSwic291cmNlUm9vdCI6IiJ9
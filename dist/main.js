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
        this.owner = owner
        this.visitedCells = []
        this.damagedShips = 0
        this.locationsTaken = []
        this.ships = ships
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
        }
        return false
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
                            this.displayMessage(`One ${this.owner} ship destroyed`)
                            if(this.isAllShipSunk()) {
                                this.displayMessage(`Game over all ships destroyed ${this.owner} wins`)
                                console.log(2)
                            }
                            console.log("bread")
                        }
                        // throw BreakException
                        return true
                    } 
                })
                const location = document.getElementById(spot)
                location.innerHTML = "X"
            } else {
                this.displayMessage("choose another spot")
            }
        } else {
            this.displayMessage(`Game over all ships destroyed ${this.owner} wins`)
            console.log(1)
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
/* harmony import */ var _ultility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ultility */ "./src/ultility.js");
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Player */ "./src/Player.js");
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Player__WEBPACK_IMPORTED_MODULE_2__);




const computerShips = Object(_ultility__WEBPACK_IMPORTED_MODULE_1__["generateShips"])("c")
const playerShips = Object(_ultility__WEBPACK_IMPORTED_MODULE_1__["generateShips"])("p")
console.log(computerShips)
const playerParent = document.getElementById("player1-board")
const computerParent = document.getElementById("player2-board")
const container = document.getElementById("container")
const playerBoard = new _GameBoard__WEBPACK_IMPORTED_MODULE_0__["default"](playerShips, "p")
const computerBoard = new _GameBoard__WEBPACK_IMPORTED_MODULE_0__["default"](computerShips, "c")


Object(_ultility__WEBPACK_IMPORTED_MODULE_1__["displayBoard"])(playerBoard, playerParent)

Object(_ultility__WEBPACK_IMPORTED_MODULE_1__["displayBoard"])(computerBoard, computerParent)

container.addEventListener("click", (e) => {
    Object(_ultility__WEBPACK_IMPORTED_MODULE_1__["markHitLocation"])(e.target.id, computerBoard)
    Object(_ultility__WEBPACK_IMPORTED_MODULE_1__["markHitLocation"])(Object(_ultility__WEBPACK_IMPORTED_MODULE_1__["generateSpot"])(playerBoard), playerBoard)
})
let reset = document.querySelector(".reset");

reset.addEventListener('click', function(event) {
    Object(_ultility__WEBPACK_IMPORTED_MODULE_1__["generateShips"])("c");
    Object(_ultility__WEBPACK_IMPORTED_MODULE_1__["generateShips"])("p");
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
    for(let i = 0; i < 2; i++){
        ships.push(createAShip(4,owner,"horizontal",ships))
    }
     // genereate three ships with length 3
    for(let i = 0; i < 2; i++){
        ships.push(createAShip(3,owner,null,ships))
    }
      // genereate 2 ships with length 2
    for(let i = 0; i < 2; i++){
        ships.push(createAShip(2,owner,"horizontal",ships))
    }
      // genereate 4 ships with length 1
    for(let i = 0; i < 3; i++){
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
                do {
                    secondDigit = Math.floor(Math.random() * 10);
                } while(secondDigit + lengthOfShip > 8)
                firstDigit = Math.floor(Math.random() * 10);
            } else {
                secondDigit += 1
            }
        } else {
            if(location.length == 0) {
                do {
                    firstDigit = Math.floor(Math.random() * 10);
                } while(firstDigit + lengthOfShip > 8)
                secondDigit = Math.floor(Math.random() * 10);
            } else {
                firstDigit += 1
            }
        }
        spot = owner+firstDigit+secondDigit
        location.push(spot)
    } 
    return checkSuperImposition(ships, new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"](location),lengthOfShip, owner, orientation);
}
const checkSuperImposition = (ships, ship,lengthOfShip, owner, orientation)=> {
    let imposition = 0;
    if (ships.length > 0){
        ships.forEach(currentValue => {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dhbWVCb2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUGxheWVyLmpzIiwid2VicGFjazovLy8uL3NyYy9TaGlwLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdWx0aWxpdHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQXlCOztBQUV6Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtB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ZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImltcG9ydCBTaGlwIGZyb20gJy4vU2hpcCdcblxuY2xhc3MgR2FtZUJvYXJkIHtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihzaGlwcywgb3duZXIpIHtcbiAgICAgICAgdGhpcy5ncmlkID0gbmV3IEFycmF5KDEwMClcbiAgICAgICAgdGhpcy5udW1Sb3dzID0gMTBcbiAgICAgICAgdGhpcy5udW1Db2x1bW5zID0gMTBcbiAgICAgICAgdGhpcy5vd25lciA9IG93bmVyXG4gICAgICAgIHRoaXMudmlzaXRlZENlbGxzID0gW11cbiAgICAgICAgdGhpcy5kYW1hZ2VkU2hpcHMgPSAwXG4gICAgICAgIHRoaXMubG9jYXRpb25zVGFrZW4gPSBbXVxuICAgICAgICB0aGlzLnNoaXBzID0gc2hpcHNcbiAgICB9XG4gICAgXG4gICAgc2V0U2hpcHNQb3NpdGlvbihzaGlwLCBsb2NhdGlvbikge1xuICAgICAgICBzaGlwLmxvY2F0aW9uID0gbG9jYXRpb247XG4gICAgICAgIHRoaXMuc2hpcHMucHVzaChzaGlwKTtcbiAgICB9XG5cbiAgICBpc0FsbFNoaXBTdW5rKCkge1xuICAgICAgICBsZXQgY291bnQgPSAwXG4gICAgICAgIHRoaXMuc2hpcHMuZm9yRWFjaChzaGlwID0+IHtcbiAgICAgICAgICAgIGlmKHNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgICAgICAgICBjb3VudCsrXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZihjb3VudCA+PSB0aGlzLnNoaXBzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICByZWNlaXZlU3RyaWtlKHNwb3QpIHtcbiAgICAgICAgaWYoIXRoaXMuaXNBbGxTaGlwU3VuaygpKSB7XG4gICAgICAgICAgICBpZighdGhpcy5pc1Bvc2l0aW9uVGFrZW4oc3BvdCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZpc2l0ZWRDZWxscy5wdXNoKHNwb3QpXG4gICAgICAgICAgICAgICAgdGhpcy5zaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZihzaGlwLmlzSGl0KHNwb3QpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoaXRTcG90ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc3BvdClcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpdFNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJoaXQtc3BvdFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2hpcC5pc1N1bmsoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheU1lc3NhZ2UoYE9uZSAke3RoaXMub3duZXJ9IHNoaXAgZGVzdHJveWVkYClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmlzQWxsU2hpcFN1bmsoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlNZXNzYWdlKGBHYW1lIG92ZXIgYWxsIHNoaXBzIGRlc3Ryb3llZCAke3RoaXMub3duZXJ9IHdpbnNgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygyKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImJyZWFkXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aHJvdyBCcmVha0V4Y2VwdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIGNvbnN0IGxvY2F0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc3BvdClcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5pbm5lckhUTUwgPSBcIlhcIlxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlNZXNzYWdlKFwiY2hvb3NlIGFub3RoZXIgc3BvdFwiKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5TWVzc2FnZShgR2FtZSBvdmVyIGFsbCBzaGlwcyBkZXN0cm95ZWQgJHt0aGlzLm93bmVyfSB3aW5zYClcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKDEpXG4gICAgICAgIH1cbiAgICB9XG4gICAgaXNQb3NpdGlvblRha2VuKHBvc2l0aW9uKSB7XG4gICAgICAgIGlmKHRoaXMudmlzaXRlZENlbGxzLmluY2x1ZGVzKHBvc2l0aW9uKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgXG4gICAgfVxuICAgIGlzUGxhY2VtZW50U3BvdFRha2VuKHNwb3QpIHtcbiAgICAgICAgaWYodGhpcy5sb2NhdGlvbnNUYWtlbi5pbmNsdWRlcyhzcG90KSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICByZW5kZXJCb2FyZCAocGFyZW50KXtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMubnVtUm93czsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIilcbiAgICAgICAgICAgIHJvdy5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgcm93LSR7aX1gKVxuICAgICAgICAgICAgcm93LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwicm93XCIpXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgdGhpcy5udW1Db2x1bW5zOyBqKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpXG4gICAgICAgICAgICAgICAgYm94LnNldEF0dHJpYnV0ZShcImlkXCIsIGAke3RoaXMub3duZXJ9JHtpfSR7an1gKVxuICAgICAgICAgICAgICAgIGJveC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImJveFwiKVxuICAgICAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChib3gpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQocm93KVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZih0aGlzLm93bmVyID09PSBcInBcIikge1xuICAgICAgICAgICAgdGhpcy5zaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucGxhY2VTaGlwKHNoaXApXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBcbiAgICB9XG5cbiAgICBwbGFjZVNoaXAoc2hpcCkge1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2hpcC5sb2NhdGlvbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2hpcC5sb2NhdGlvbltpXSlcbiAgICAgICAgICAgIGJveC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImJveC1zaGlwXCIpXG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgZGlzcGxheU1lc3NhZ2UobWVzc2FnZSkge1xuICAgICAgICBjb25zdCBtZXNzYWdlQXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWVzc2FnZVwiKVxuICAgICAgICBtZXNzYWdlQXJlYS5pbm5lckhUTUwgPSBtZXNzYWdlXG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgR2FtZUJvYXJkIiwiLy8gaW1wb3J0IHsgaXNNb2R1bGVTcGVjaWZpZXIgfSBmcm9tIFwiQGJhYmVsL3R5cGVzXCI7XG5cbmNsYXNzIFBsYXllciB7XG4gICAgY29uc3RydWN0b3IobmFtZSwgYm9hcmQpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZVxuICAgICAgICB0aGlzLmJvYXJkID0gYm9hcmQ7XG4gICAgICAgIHRoaXMudHVybiA9IGZhbHNlO1xuICAgIH1cbn1cblxuLy9leHBvcnQgZGVmYXVsdCBQbGF5ZXJcbm1vZHVsZS5leHBvcnRzID0gUGxheWVyOyIsImNsYXNzIFNoaXAge1xuXG4gICAgY29uc3RydWN0b3IobG9jYXRpb24pIHtcbiAgICAgICAgdGhpcy5sb2NhdGlvbiA9IGxvY2F0aW9uO1xuICAgICAgICB0aGlzLmhpdHMgPSAwO1xuICAgIH1cblxuICAgIGlzSGl0KHBvc2l0aW9uKSB7XG4gICAgICAgIGlmKHRoaXMubG9jYXRpb24uaW5jbHVkZXMocG9zaXRpb24pKSB7XG4gICAgICAgICAgICB0aGlzLmhpdHMrKztcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IFxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIFxuICAgIGlzU3VuaygpIHtcbiAgICAgICAgaWYodGhpcy5oaXRzID49IHRoaXMubG9jYXRpb24ubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTaGlwIiwiaW1wb3J0IEdhbWVCb2FyZCBmcm9tICcuL0dhbWVCb2FyZCdcbmltcG9ydCB7IFxuICAgICAgICBtYXJrSGl0TG9jYXRpb24sIFxuICAgICAgICBjbGVhck1lc3NhZ2UsIFxuICAgICAgICBkaXNwbGF5Qm9hcmQsXG4gICAgICAgIGdlbmVyYXRlU3BvdCxnZW5lcmF0ZVNoaXBzIH0gZnJvbSAnLi91bHRpbGl0eSdcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9QbGF5ZXInO1xuXG5jb25zdCBjb21wdXRlclNoaXBzID0gZ2VuZXJhdGVTaGlwcyhcImNcIilcbmNvbnN0IHBsYXllclNoaXBzID0gZ2VuZXJhdGVTaGlwcyhcInBcIilcbmNvbnNvbGUubG9nKGNvbXB1dGVyU2hpcHMpXG5jb25zdCBwbGF5ZXJQYXJlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllcjEtYm9hcmRcIilcbmNvbnN0IGNvbXB1dGVyUGFyZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXIyLWJvYXJkXCIpXG5jb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRhaW5lclwiKVxuY29uc3QgcGxheWVyQm9hcmQgPSBuZXcgR2FtZUJvYXJkKHBsYXllclNoaXBzLCBcInBcIilcbmNvbnN0IGNvbXB1dGVyQm9hcmQgPSBuZXcgR2FtZUJvYXJkKGNvbXB1dGVyU2hpcHMsIFwiY1wiKVxuXG5cbmRpc3BsYXlCb2FyZChwbGF5ZXJCb2FyZCwgcGxheWVyUGFyZW50KVxuXG5kaXNwbGF5Qm9hcmQoY29tcHV0ZXJCb2FyZCwgY29tcHV0ZXJQYXJlbnQpXG5cbmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICBtYXJrSGl0TG9jYXRpb24oZS50YXJnZXQuaWQsIGNvbXB1dGVyQm9hcmQpXG4gICAgbWFya0hpdExvY2F0aW9uKGdlbmVyYXRlU3BvdChwbGF5ZXJCb2FyZCksIHBsYXllckJvYXJkKVxufSlcbmxldCByZXNldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVzZXRcIik7XG5cbnJlc2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBnZW5lcmF0ZVNoaXBzKFwiY1wiKTtcbiAgICBnZW5lcmF0ZVNoaXBzKFwicFwiKTtcbn0pO1xuXG5cbi8vIGNsZWFyTWVzc2FnZSgpXG4vLyBjb25zdCBjcmVhdGVBU2hpcCA9ICgobGVuZ3RoT2ZTaGlwLCBvd25lciwgb3JpZW50YXRpb24pID0+IHtcbi8vICAgICBsZXQgbG9jYXRpb24gPSBbXTtcbi8vICAgICBsZXQgZmlyc3REaWdpdCA9IG51bGw7XG4vLyAgICAgbGV0IHNlY29uZERpZ2l0ID0gbnVsbDtcbi8vICAgICBsZXQgc3BvdCA9IFwiXCJcbi8vICAgICBsZXQgaSA9IDBcbi8vICAgICB3aGlsZShsb2NhdGlvbi5sZW5ndGggPCBsZW5ndGhPZlNoaXApIHtcbi8vICAgICAgICAgaWYob3JpZW50YXRpb24gPT0gXCJob3Jpem9udGFsXCIpIHtcbi8vICAgICAgICAgICAgIGlmKGxvY2F0aW9uLmxlbmd0aCA9PSAwKSB7XG4vLyAgICAgICAgICAgICAgICAgZmlyc3REaWdpdCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbi8vICAgICAgICAgICAgICAgICBzZWNvbmREaWdpdCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbi8vICAgICAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgICAgICAgc2Vjb25kRGlnaXQgKz0gMVxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAgICAgaWYobG9jYXRpb24ubGVuZ3RoID09IDApIHtcbi8vICAgICAgICAgICAgICAgICBmaXJzdERpZ2l0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuLy8gICAgICAgICAgICAgICAgIHNlY29uZERpZ2l0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuLy8gICAgICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgICAgICBmaXJzdERpZ2l0ICs9IDFcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfVxuICAgICAgIFxuLy8gICAgICAgICBzcG90ID0gb3duZXIrZmlyc3REaWdpdCtzZWNvbmREaWdpdFxuLy8gICAgICAgICBsb2NhdGlvbi5wdXNoKHNwb3QpXG4vLyAgICAgfVxuLy8gICAgIHJldHVybiBuZXcgU2hpcChsb2NhdGlvbik7XG4vLyB9KSg0LCBcInBcIiwgXCJ2ZXJ0aWNhbFwiKVxuIiwiaW1wb3J0IFNoaXAgZnJvbSAnLi9TaGlwJ1xuXG5jb25zdCBtYXJrSGl0TG9jYXRpb24gPSAoaGl0U3BvdCwgYm9hcmQpID0+IHtcbiAgICBib2FyZC5yZWNlaXZlU3RyaWtlKGhpdFNwb3QpXG59XG5cbmNvbnN0IGNsZWFyTWVzc2FnZSA9ICgpID0+IHtcbiAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2VBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZXNzYWdlXCIpXG4gICAgICAgIG1lc3NhZ2VBcmVhLmlubmVySFRNTCA9IFwiXCJcbiAgICB9LCAxMDAwMClcbn1cblxuY29uc3QgZGlzcGxheUJvYXJkID0gKGJvYXJkLCBwYXJlbnQpID0+IHtcbiAgICBib2FyZC5yZW5kZXJCb2FyZChwYXJlbnQpXG59XG5cbmNvbnN0IGdlbmVyYXRlU3BvdCA9IChib2FyZCkgPT4ge1xuICAgIGxldCBzcG90ID0gXCJcIlxuICAgIGRvIHtcbiAgICAgICAgbGV0IGZpcnN0RGlnaXQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMTApXG4gICAgICAgIGxldCBzZWNvbmREaWdpdCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoxMClcbiAgICAgICAgc3BvdCA9IFwicFwiK2ZpcnN0RGlnaXQrc2Vjb25kRGlnaXQ7XG4gICAgfSB3aGlsZShib2FyZC5pc1Bvc2l0aW9uVGFrZW4oc3BvdCkpXG4gICAgcmV0dXJuIHNwb3Rcbn1cbmNvbnN0IGdlbmVyYXRlU2hpcHMgPSAob3duZXIpID0+IHtcbiAgICBsZXQgc2hpcHMgPVtdO1xuICAgIC8vIGdlbmVyZWF0ZSB0d28gc2hpcHMgd2l0aCBsZW5ndGggNFxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCAyOyBpKyspe1xuICAgICAgICBzaGlwcy5wdXNoKGNyZWF0ZUFTaGlwKDQsb3duZXIsXCJob3Jpem9udGFsXCIsc2hpcHMpKVxuICAgIH1cbiAgICAgLy8gZ2VuZXJlYXRlIHRocmVlIHNoaXBzIHdpdGggbGVuZ3RoIDNcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgMjsgaSsrKXtcbiAgICAgICAgc2hpcHMucHVzaChjcmVhdGVBU2hpcCgzLG93bmVyLG51bGwsc2hpcHMpKVxuICAgIH1cbiAgICAgIC8vIGdlbmVyZWF0ZSAyIHNoaXBzIHdpdGggbGVuZ3RoIDJcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgMjsgaSsrKXtcbiAgICAgICAgc2hpcHMucHVzaChjcmVhdGVBU2hpcCgyLG93bmVyLFwiaG9yaXpvbnRhbFwiLHNoaXBzKSlcbiAgICB9XG4gICAgICAvLyBnZW5lcmVhdGUgNCBzaGlwcyB3aXRoIGxlbmd0aCAxXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IDM7IGkrKyl7XG4gICAgICAgIHNoaXBzLnB1c2goY3JlYXRlQVNoaXAoMSxvd25lcixudWxsLHNoaXBzKSlcbiAgICB9XG4gICAgcmV0dXJuIHNoaXBzO1xufVxuXG5jb25zdCBjcmVhdGVBU2hpcCA9IChsZW5ndGhPZlNoaXAsIG93bmVyLCBvcmllbnRhdGlvbiwgc2hpcHMpID0+IHtcbiAgICBsZXQgbG9jYXRpb24gPSBbXTtcbiAgICBsZXQgZmlyc3REaWdpdCA9IG51bGw7XG4gICAgbGV0IHNlY29uZERpZ2l0ID0gbnVsbDtcbiAgICBsZXQgc3BvdCA9IFwiXCJcbiAgICBsZXQgaSA9IDBcbiAgICB3aGlsZShsb2NhdGlvbi5sZW5ndGggPCBsZW5ndGhPZlNoaXApIHtcbiAgICAgICAgaWYob3JpZW50YXRpb24gPT0gXCJob3Jpem9udGFsXCIpIHtcbiAgICAgICAgICAgIGlmKGxvY2F0aW9uLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgICAgICBzZWNvbmREaWdpdCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICAgICAgICB9IHdoaWxlKHNlY29uZERpZ2l0ICsgbGVuZ3RoT2ZTaGlwID4gOClcbiAgICAgICAgICAgICAgICBmaXJzdERpZ2l0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWNvbmREaWdpdCArPSAxXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZihsb2NhdGlvbi5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICAgICAgZmlyc3REaWdpdCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICAgICAgICB9IHdoaWxlKGZpcnN0RGlnaXQgKyBsZW5ndGhPZlNoaXAgPiA4KVxuICAgICAgICAgICAgICAgIHNlY29uZERpZ2l0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmaXJzdERpZ2l0ICs9IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzcG90ID0gb3duZXIrZmlyc3REaWdpdCtzZWNvbmREaWdpdFxuICAgICAgICBsb2NhdGlvbi5wdXNoKHNwb3QpXG4gICAgfSBcbiAgICByZXR1cm4gY2hlY2tTdXBlckltcG9zaXRpb24oc2hpcHMsIG5ldyBTaGlwKGxvY2F0aW9uKSxsZW5ndGhPZlNoaXAsIG93bmVyLCBvcmllbnRhdGlvbik7XG59XG5jb25zdCBjaGVja1N1cGVySW1wb3NpdGlvbiA9IChzaGlwcywgc2hpcCxsZW5ndGhPZlNoaXAsIG93bmVyLCBvcmllbnRhdGlvbik9PiB7XG4gICAgbGV0IGltcG9zaXRpb24gPSAwO1xuICAgIGlmIChzaGlwcy5sZW5ndGggPiAwKXtcbiAgICAgICAgc2hpcHMuZm9yRWFjaChjdXJyZW50VmFsdWUgPT4ge1xuICAgICAgICAgICAgaW1wb3NpdGlvbiA9IGN1cnJlbnRWYWx1ZS5sb2NhdGlvbi5maWx0ZXIoZWxlbWVudCA9PiBzaGlwLmxvY2F0aW9uLmluY2x1ZGVzKGVsZW1lbnQpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChpbXBvc2l0aW9uID09IDApe1xuICAgICAgICByZXR1cm4gc2hpcDtcbiAgICB9ZWxzZXtcbiAgICAgICByZXR1cm4gY3JlYXRlQVNoaXAobGVuZ3RoT2ZTaGlwLCBvd25lciwgb3JpZW50YXRpb24sIHNoaXBzKVxuICAgIH1cbn1cblxuZXhwb3J0IHsgZGlzcGxheUJvYXJkLCBtYXJrSGl0TG9jYXRpb24sIGNsZWFyTWVzc2FnZSwgZ2VuZXJhdGVTcG90LCBjcmVhdGVBU2hpcCwgY2hlY2tTdXBlckltcG9zaXRpb24sZ2VuZXJhdGVTaGlwcyB9XG4iXSwic291cmNlUm9vdCI6IiJ9
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
        let hit = false
        if(!this.isAllShipSunk()) {
            if(!this.isPositionTaken(spot)) {
                this.visitedCells.push(spot)
                this.ships.forEach(ship => {
                    if(ship.isHit(spot)) {
                        hit = true
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
                    }  
                })
                if(!hit) {
                    const location = document.getElementById(spot)
                    location.innerHTML = "X"
                }
                return true
            } else {
                this.displayMessage("choose another spot")
                return false
            }
        } else {
            this.displayMessage(`Game over all ships destroyed ${this.owner} wins`)
            console.log(1)
            return false
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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// import { isModuleSpecifier } from "@babel/types";

class Player {
    constructor(name, board) {
        this.name = name
        this.board = board;
        this.turn = false;
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




const reset = document.getElementById("reset");
const start = document.getElementById("start")


    const computerShips = Object(_ultility__WEBPACK_IMPORTED_MODULE_1__["generateShips"])("c")
    const playerShips = Object(_ultility__WEBPACK_IMPORTED_MODULE_1__["generateShips"])("p")
    const playerParent = document.getElementById("player1-board")
    const computerParent = document.getElementById("player2-board")
    const container = document.getElementById("container")
    const playerBoard = new _GameBoard__WEBPACK_IMPORTED_MODULE_0__["default"](playerShips, "p")
    const computerBoard = new _GameBoard__WEBPACK_IMPORTED_MODULE_0__["default"](computerShips, "c")

    Object(_ultility__WEBPACK_IMPORTED_MODULE_1__["displayBoard"])(playerBoard, playerParent)
    Object(_ultility__WEBPACK_IMPORTED_MODULE_1__["displayBoard"])(computerBoard, computerParent)


container.addEventListener("click", (e) => {
    if(Object(_ultility__WEBPACK_IMPORTED_MODULE_1__["markHitLocation"])(e.target.id, computerBoard)) {
        Object(_ultility__WEBPACK_IMPORTED_MODULE_1__["markHitLocation"])(Object(_ultility__WEBPACK_IMPORTED_MODULE_1__["generateSpot"])(playerBoard), playerBoard)
    }
    
})


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
    return board.receiveStrike(hitSpot)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dhbWVCb2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUGxheWVyLmpzIiwid2VicGFjazovLy8uL3NyYy9TaGlwLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdWx0aWxpdHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQXlCOztBQUV6Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELFdBQVc7QUFDbEU7QUFDQSxxRkFBcUYsV0FBVztBQUNoRztBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULGlFQUFpRSxXQUFXO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQixrQkFBa0I7QUFDeEM7QUFDQSwwQ0FBMEMsRUFBRTtBQUM1QztBQUNBLDBCQUEwQixxQkFBcUI7QUFDL0M7QUFDQSwwQ0FBMEMsV0FBVyxFQUFFLEVBQUUsRUFBRSxFQUFFO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFM7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQiwwQkFBMEI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNlLHdFOzs7Ozs7Ozs7Ozs7QUNuSGY7QUFBQSxXQUFXLG9CQUFvQjs7QUFFL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWUscUU7Ozs7Ozs7Ozs7OztBQ1ZmO0FBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZSxtRTs7Ozs7Ozs7Ozs7O0FDdkJmO0FBQUE7QUFBQTtBQUFBO0FBQW1DO0FBS21CO0FBQ3hCOztBQUU5QjtBQUNBOzs7QUFHQSwwQkFBMEIsK0RBQWE7QUFDdkMsd0JBQXdCLCtEQUFhO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixrREFBUztBQUNyQyw4QkFBOEIsa0RBQVM7O0FBRXZDLElBQUksOERBQVk7QUFDaEIsSUFBSSw4REFBWTs7O0FBR2hCO0FBQ0EsT0FBTyxpRUFBZTtBQUN0QixRQUFRLGlFQUFlLENBQUMsOERBQVk7QUFDcEM7O0FBRUEsQ0FBQzs7Ozs7Ozs7Ozs7OztBQzdCRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBeUI7O0FBRXpCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsT0FBTztBQUN6QjtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsT0FBTztBQUN6QjtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsT0FBTztBQUN6QjtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsT0FBTztBQUN6QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLO0FBQ0EsMkNBQTJDLDZDQUFJO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVxSCIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJpbXBvcnQgU2hpcCBmcm9tICcuL1NoaXAnXG5cbmNsYXNzIEdhbWVCb2FyZCB7XG4gICAgXG4gICAgY29uc3RydWN0b3Ioc2hpcHMsIG93bmVyKSB7XG4gICAgICAgIHRoaXMuZ3JpZCA9IG5ldyBBcnJheSgxMDApXG4gICAgICAgIHRoaXMubnVtUm93cyA9IDEwXG4gICAgICAgIHRoaXMubnVtQ29sdW1ucyA9IDEwXG4gICAgICAgIHRoaXMub3duZXIgPSBvd25lclxuICAgICAgICB0aGlzLnZpc2l0ZWRDZWxscyA9IFtdXG4gICAgICAgIHRoaXMuZGFtYWdlZFNoaXBzID0gMFxuICAgICAgICB0aGlzLmxvY2F0aW9uc1Rha2VuID0gW11cbiAgICAgICAgdGhpcy5zaGlwcyA9IHNoaXBzXG4gICAgfVxuICAgIFxuICAgIHNldFNoaXBzUG9zaXRpb24oc2hpcCwgbG9jYXRpb24pIHtcbiAgICAgICAgc2hpcC5sb2NhdGlvbiA9IGxvY2F0aW9uO1xuICAgICAgICB0aGlzLnNoaXBzLnB1c2goc2hpcCk7XG4gICAgfVxuXG4gICAgaXNBbGxTaGlwU3VuaygpIHtcbiAgICAgICAgbGV0IGNvdW50ID0gMFxuICAgICAgICB0aGlzLnNoaXBzLmZvckVhY2goc2hpcCA9PiB7XG4gICAgICAgICAgICBpZihzaGlwLmlzU3VuaygpKSB7XG4gICAgICAgICAgICAgICAgY291bnQrK1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYoY291bnQgPj0gdGhpcy5zaGlwcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgcmVjZWl2ZVN0cmlrZShzcG90KSB7XG4gICAgICAgIGxldCBoaXQgPSBmYWxzZVxuICAgICAgICBpZighdGhpcy5pc0FsbFNoaXBTdW5rKCkpIHtcbiAgICAgICAgICAgIGlmKCF0aGlzLmlzUG9zaXRpb25UYWtlbihzcG90KSkge1xuICAgICAgICAgICAgICAgIHRoaXMudmlzaXRlZENlbGxzLnB1c2goc3BvdClcbiAgICAgICAgICAgICAgICB0aGlzLnNoaXBzLmZvckVhY2goc2hpcCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHNoaXAuaXNIaXQoc3BvdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpdCA9IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhpdFNwb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzcG90KVxuICAgICAgICAgICAgICAgICAgICAgICAgaGl0U3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImhpdC1zcG90XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzaGlwLmlzU3VuaygpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5TWVzc2FnZShgT25lICR7dGhpcy5vd25lcn0gc2hpcCBkZXN0cm95ZWRgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNBbGxTaGlwU3VuaygpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheU1lc3NhZ2UoYEdhbWUgb3ZlciBhbGwgc2hpcHMgZGVzdHJveWVkICR7dGhpcy5vd25lcn0gd2luc2ApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKDIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYnJlYWRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSAgXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBpZighaGl0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxvY2F0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc3BvdClcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24uaW5uZXJIVE1MID0gXCJYXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5TWVzc2FnZShcImNob29zZSBhbm90aGVyIHNwb3RcIilcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheU1lc3NhZ2UoYEdhbWUgb3ZlciBhbGwgc2hpcHMgZGVzdHJveWVkICR7dGhpcy5vd25lcn0gd2luc2ApXG4gICAgICAgICAgICBjb25zb2xlLmxvZygxKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICB9XG4gICAgaXNQb3NpdGlvblRha2VuKHBvc2l0aW9uKSB7XG4gICAgICAgIGlmKHRoaXMudmlzaXRlZENlbGxzLmluY2x1ZGVzKHBvc2l0aW9uKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgXG4gICAgfVxuICAgIGlzUGxhY2VtZW50U3BvdFRha2VuKHNwb3QpIHtcbiAgICAgICAgaWYodGhpcy5sb2NhdGlvbnNUYWtlbi5pbmNsdWRlcyhzcG90KSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICByZW5kZXJCb2FyZCAocGFyZW50KXtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMubnVtUm93czsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIilcbiAgICAgICAgICAgIHJvdy5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgcm93LSR7aX1gKVxuICAgICAgICAgICAgcm93LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwicm93XCIpXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgdGhpcy5udW1Db2x1bW5zOyBqKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpXG4gICAgICAgICAgICAgICAgYm94LnNldEF0dHJpYnV0ZShcImlkXCIsIGAke3RoaXMub3duZXJ9JHtpfSR7an1gKVxuICAgICAgICAgICAgICAgIGJveC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImJveFwiKVxuICAgICAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChib3gpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQocm93KVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZih0aGlzLm93bmVyID09PSBcInBcIikge1xuICAgICAgICAgICAgdGhpcy5zaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucGxhY2VTaGlwKHNoaXApXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBcbiAgICB9XG5cbiAgICBwbGFjZVNoaXAoc2hpcCkge1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2hpcC5sb2NhdGlvbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2hpcC5sb2NhdGlvbltpXSlcbiAgICAgICAgICAgIGJveC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImJveC1zaGlwXCIpXG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgZGlzcGxheU1lc3NhZ2UobWVzc2FnZSkge1xuICAgICAgICBjb25zdCBtZXNzYWdlQXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWVzc2FnZVwiKVxuICAgICAgICBtZXNzYWdlQXJlYS5pbm5lckhUTUwgPSBtZXNzYWdlXG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgR2FtZUJvYXJkIiwiLy8gaW1wb3J0IHsgaXNNb2R1bGVTcGVjaWZpZXIgfSBmcm9tIFwiQGJhYmVsL3R5cGVzXCI7XG5cbmNsYXNzIFBsYXllciB7XG4gICAgY29uc3RydWN0b3IobmFtZSwgYm9hcmQpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZVxuICAgICAgICB0aGlzLmJvYXJkID0gYm9hcmQ7XG4gICAgICAgIHRoaXMudHVybiA9IGZhbHNlO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyIiwiY2xhc3MgU2hpcCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihsb2NhdGlvbikge1xuICAgICAgICB0aGlzLmxvY2F0aW9uID0gbG9jYXRpb247XG4gICAgICAgIHRoaXMuaGl0cyA9IDA7XG4gICAgfVxuXG4gICAgaXNIaXQocG9zaXRpb24pIHtcbiAgICAgICAgaWYodGhpcy5sb2NhdGlvbi5pbmNsdWRlcyhwb3NpdGlvbikpIHtcbiAgICAgICAgICAgIHRoaXMuaGl0cysrO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgXG4gICAgaXNTdW5rKCkge1xuICAgICAgICBpZih0aGlzLmhpdHMgPj0gdGhpcy5sb2NhdGlvbi5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNoaXAiLCJpbXBvcnQgR2FtZUJvYXJkIGZyb20gJy4vR2FtZUJvYXJkJ1xuaW1wb3J0IHsgXG4gICAgICAgIG1hcmtIaXRMb2NhdGlvbiwgXG4gICAgICAgIGNsZWFyTWVzc2FnZSwgXG4gICAgICAgIGRpc3BsYXlCb2FyZCxcbiAgICAgICAgZ2VuZXJhdGVTcG90LGdlbmVyYXRlU2hpcHMgfSBmcm9tICcuL3VsdGlsaXR5J1xuaW1wb3J0IFBsYXllciBmcm9tICcuL1BsYXllcic7XG5cbmNvbnN0IHJlc2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXNldFwiKTtcbmNvbnN0IHN0YXJ0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydFwiKVxuXG5cbiAgICBjb25zdCBjb21wdXRlclNoaXBzID0gZ2VuZXJhdGVTaGlwcyhcImNcIilcbiAgICBjb25zdCBwbGF5ZXJTaGlwcyA9IGdlbmVyYXRlU2hpcHMoXCJwXCIpXG4gICAgY29uc3QgcGxheWVyUGFyZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXIxLWJvYXJkXCIpXG4gICAgY29uc3QgY29tcHV0ZXJQYXJlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllcjItYm9hcmRcIilcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRhaW5lclwiKVxuICAgIGNvbnN0IHBsYXllckJvYXJkID0gbmV3IEdhbWVCb2FyZChwbGF5ZXJTaGlwcywgXCJwXCIpXG4gICAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IG5ldyBHYW1lQm9hcmQoY29tcHV0ZXJTaGlwcywgXCJjXCIpXG5cbiAgICBkaXNwbGF5Qm9hcmQocGxheWVyQm9hcmQsIHBsYXllclBhcmVudClcbiAgICBkaXNwbGF5Qm9hcmQoY29tcHV0ZXJCb2FyZCwgY29tcHV0ZXJQYXJlbnQpXG5cblxuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgIGlmKG1hcmtIaXRMb2NhdGlvbihlLnRhcmdldC5pZCwgY29tcHV0ZXJCb2FyZCkpIHtcbiAgICAgICAgbWFya0hpdExvY2F0aW9uKGdlbmVyYXRlU3BvdChwbGF5ZXJCb2FyZCksIHBsYXllckJvYXJkKVxuICAgIH1cbiAgICBcbn0pXG4iLCJpbXBvcnQgU2hpcCBmcm9tICcuL1NoaXAnXG5cbmNvbnN0IG1hcmtIaXRMb2NhdGlvbiA9IChoaXRTcG90LCBib2FyZCkgPT4ge1xuICAgIHJldHVybiBib2FyZC5yZWNlaXZlU3RyaWtlKGhpdFNwb3QpXG59XG5cbmNvbnN0IGNsZWFyTWVzc2FnZSA9ICgpID0+IHtcbiAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2VBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZXNzYWdlXCIpXG4gICAgICAgIG1lc3NhZ2VBcmVhLmlubmVySFRNTCA9IFwiXCJcbiAgICB9LCAxMDAwMClcbn1cblxuY29uc3QgZGlzcGxheUJvYXJkID0gKGJvYXJkLCBwYXJlbnQpID0+IHtcbiAgICBib2FyZC5yZW5kZXJCb2FyZChwYXJlbnQpXG59XG5cbmNvbnN0IGdlbmVyYXRlU3BvdCA9IChib2FyZCkgPT4ge1xuICAgIGxldCBzcG90ID0gXCJcIlxuICAgIGRvIHtcbiAgICAgICAgbGV0IGZpcnN0RGlnaXQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMTApXG4gICAgICAgIGxldCBzZWNvbmREaWdpdCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoxMClcbiAgICAgICAgc3BvdCA9IFwicFwiK2ZpcnN0RGlnaXQrc2Vjb25kRGlnaXQ7XG4gICAgfSB3aGlsZShib2FyZC5pc1Bvc2l0aW9uVGFrZW4oc3BvdCkpXG4gICAgcmV0dXJuIHNwb3Rcbn1cbmNvbnN0IGdlbmVyYXRlU2hpcHMgPSAob3duZXIpID0+IHtcbiAgICBsZXQgc2hpcHMgPVtdO1xuICAgIC8vIGdlbmVyZWF0ZSB0d28gc2hpcHMgd2l0aCBsZW5ndGggNFxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCAyOyBpKyspe1xuICAgICAgICBzaGlwcy5wdXNoKGNyZWF0ZUFTaGlwKDQsb3duZXIsXCJob3Jpem9udGFsXCIsc2hpcHMpKVxuICAgIH1cbiAgICAgLy8gZ2VuZXJlYXRlIHRocmVlIHNoaXBzIHdpdGggbGVuZ3RoIDNcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgMjsgaSsrKXtcbiAgICAgICAgc2hpcHMucHVzaChjcmVhdGVBU2hpcCgzLG93bmVyLG51bGwsc2hpcHMpKVxuICAgIH1cbiAgICAgIC8vIGdlbmVyZWF0ZSAyIHNoaXBzIHdpdGggbGVuZ3RoIDJcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgMjsgaSsrKXtcbiAgICAgICAgc2hpcHMucHVzaChjcmVhdGVBU2hpcCgyLG93bmVyLFwiaG9yaXpvbnRhbFwiLHNoaXBzKSlcbiAgICB9XG4gICAgICAvLyBnZW5lcmVhdGUgNCBzaGlwcyB3aXRoIGxlbmd0aCAxXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IDM7IGkrKyl7XG4gICAgICAgIHNoaXBzLnB1c2goY3JlYXRlQVNoaXAoMSxvd25lcixudWxsLHNoaXBzKSlcbiAgICB9XG4gICAgcmV0dXJuIHNoaXBzO1xufVxuXG5jb25zdCBjcmVhdGVBU2hpcCA9IChsZW5ndGhPZlNoaXAsIG93bmVyLCBvcmllbnRhdGlvbiwgc2hpcHMpID0+IHtcbiAgICBsZXQgbG9jYXRpb24gPSBbXTtcbiAgICBsZXQgZmlyc3REaWdpdCA9IG51bGw7XG4gICAgbGV0IHNlY29uZERpZ2l0ID0gbnVsbDtcbiAgICBsZXQgc3BvdCA9IFwiXCJcbiAgICBsZXQgaSA9IDBcbiAgICB3aGlsZShsb2NhdGlvbi5sZW5ndGggPCBsZW5ndGhPZlNoaXApIHtcbiAgICAgICAgaWYob3JpZW50YXRpb24gPT0gXCJob3Jpem9udGFsXCIpIHtcbiAgICAgICAgICAgIGlmKGxvY2F0aW9uLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgICAgICBzZWNvbmREaWdpdCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICAgICAgICB9IHdoaWxlKHNlY29uZERpZ2l0ICsgbGVuZ3RoT2ZTaGlwID4gOClcbiAgICAgICAgICAgICAgICBmaXJzdERpZ2l0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWNvbmREaWdpdCArPSAxXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZihsb2NhdGlvbi5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICAgICAgZmlyc3REaWdpdCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICAgICAgICB9IHdoaWxlKGZpcnN0RGlnaXQgKyBsZW5ndGhPZlNoaXAgPiA4KVxuICAgICAgICAgICAgICAgIHNlY29uZERpZ2l0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmaXJzdERpZ2l0ICs9IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzcG90ID0gb3duZXIrZmlyc3REaWdpdCtzZWNvbmREaWdpdFxuICAgICAgICBsb2NhdGlvbi5wdXNoKHNwb3QpXG4gICAgfSBcbiAgICByZXR1cm4gY2hlY2tTdXBlckltcG9zaXRpb24oc2hpcHMsIG5ldyBTaGlwKGxvY2F0aW9uKSxsZW5ndGhPZlNoaXAsIG93bmVyLCBvcmllbnRhdGlvbik7XG59XG5jb25zdCBjaGVja1N1cGVySW1wb3NpdGlvbiA9IChzaGlwcywgc2hpcCxsZW5ndGhPZlNoaXAsIG93bmVyLCBvcmllbnRhdGlvbik9PiB7XG4gICAgbGV0IGltcG9zaXRpb24gPSAwO1xuICAgIGlmIChzaGlwcy5sZW5ndGggPiAwKXtcbiAgICAgICAgc2hpcHMuZm9yRWFjaChjdXJyZW50VmFsdWUgPT4ge1xuICAgICAgICAgICAgaW1wb3NpdGlvbiA9IGN1cnJlbnRWYWx1ZS5sb2NhdGlvbi5maWx0ZXIoZWxlbWVudCA9PiBzaGlwLmxvY2F0aW9uLmluY2x1ZGVzKGVsZW1lbnQpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChpbXBvc2l0aW9uID09IDApe1xuICAgICAgICByZXR1cm4gc2hpcDtcbiAgICB9ZWxzZXtcbiAgICAgICByZXR1cm4gY3JlYXRlQVNoaXAobGVuZ3RoT2ZTaGlwLCBvd25lciwgb3JpZW50YXRpb24sIHNoaXBzKVxuICAgIH1cbn1cblxuZXhwb3J0IHsgZGlzcGxheUJvYXJkLCBtYXJrSGl0TG9jYXRpb24sIGNsZWFyTWVzc2FnZSwgZ2VuZXJhdGVTcG90LCBjcmVhdGVBU2hpcCwgY2hlY2tTdXBlckltcG9zaXRpb24sZ2VuZXJhdGVTaGlwcyB9XG4iXSwic291cmNlUm9vdCI6IiJ9
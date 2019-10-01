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

    renderBoard(parent){
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



const reset = document.getElementById("reset");
const start = document.getElementById("start")


const computerShips = Object(_ultility__WEBPACK_IMPORTED_MODULE_1__["generateShips"])("c")
const playerShips = Object(_ultility__WEBPACK_IMPORTED_MODULE_1__["generateShips"])("p")
const playerParent = document.getElementById("player1-board")
const computerParent = document.getElementById("player2-board")
const container = document.getElementById("container")
console.log(playerShips)
const playerBoard = new _GameBoard__WEBPACK_IMPORTED_MODULE_0__["default"](playerShips, "p")
const computerBoard = new _GameBoard__WEBPACK_IMPORTED_MODULE_0__["default"](computerShips, "c")

Object(_ultility__WEBPACK_IMPORTED_MODULE_1__["displayBoard"])(playerBoard, playerParent)
Object(_ultility__WEBPACK_IMPORTED_MODULE_1__["displayBoard"])(computerBoard, computerParent)


container.addEventListener("click", (e) => {
    if(Object(_ultility__WEBPACK_IMPORTED_MODULE_1__["markHitLocation"])(e.target.id, computerBoard)) {
        Object(_ultility__WEBPACK_IMPORTED_MODULE_1__["markHitLocation"])(Object(_ultility__WEBPACK_IMPORTED_MODULE_1__["generateSpot"])(playerBoard), playerBoard)
    }
})

reset.addEventListener('click', function(event) {
    Object(_ultility__WEBPACK_IMPORTED_MODULE_1__["generateShips"])("c");
    Object(_ultility__WEBPACK_IMPORTED_MODULE_1__["generateShips"])("p");

Object(_ultility__WEBPACK_IMPORTED_MODULE_1__["displayBoard"])(playerBoard, playerParent)

Object(_ultility__WEBPACK_IMPORTED_MODULE_1__["displayBoard"])(computerBoard, computerParent)
});

Object(_ultility__WEBPACK_IMPORTED_MODULE_1__["clearMessage"])()


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dhbWVCb2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvU2hpcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VsdGlsaXR5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUF5Qjs7QUFFekI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RCxXQUFXO0FBQ2xFO0FBQ0EscUZBQXFGLFdBQVc7QUFDaEc7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQjtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxpRUFBaUUsV0FBVztBQUM1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0Isa0JBQWtCO0FBQ3hDO0FBQ0EsMENBQTBDLEVBQUU7QUFDNUM7QUFDQSwwQkFBMEIscUJBQXFCO0FBQy9DO0FBQ0EsMENBQTBDLFdBQVcsRUFBRSxFQUFFLEVBQUUsRUFBRTtBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0IsMEJBQTBCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDZSx3RTs7Ozs7Ozs7Ozs7O0FDbkhmO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWUsbUVBQUksRTs7Ozs7Ozs7Ozs7O0FDdkJuQjtBQUFBO0FBQUE7QUFBbUM7QUFLbUI7O0FBRXREO0FBQ0E7OztBQUdBLHNCQUFzQiwrREFBYTtBQUNuQyxvQkFBb0IsK0RBQWE7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0Isa0RBQVM7QUFDakMsMEJBQTBCLGtEQUFTOztBQUVuQyw4REFBWTtBQUNaLDhEQUFZOzs7QUFHWjtBQUNBLE9BQU8saUVBQWU7QUFDdEIsUUFBUSxpRUFBZSxDQUFDLDhEQUFZO0FBQ3BDO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBLElBQUksK0RBQWE7QUFDakIsSUFBSSwrREFBYTs7QUFFakIsOERBQVk7O0FBRVosOERBQVk7QUFDWixDQUFDOztBQUVELDhEQUFZOzs7Ozs7Ozs7Ozs7O0FDdkNaO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUF5Qjs7QUFFekI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixPQUFPO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixPQUFPO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixPQUFPO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixPQUFPO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEs7QUFDQSwyQ0FBMkMsNkNBQUk7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRXFIIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImltcG9ydCBTaGlwIGZyb20gJy4vU2hpcCdcblxuY2xhc3MgR2FtZUJvYXJkIHtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihzaGlwcywgb3duZXIpIHtcbiAgICAgICAgdGhpcy5ncmlkID0gbmV3IEFycmF5KDEwMClcbiAgICAgICAgdGhpcy5udW1Sb3dzID0gMTBcbiAgICAgICAgdGhpcy5udW1Db2x1bW5zID0gMTBcbiAgICAgICAgdGhpcy5vd25lciA9IG93bmVyXG4gICAgICAgIHRoaXMudmlzaXRlZENlbGxzID0gW11cbiAgICAgICAgdGhpcy5kYW1hZ2VkU2hpcHMgPSAwXG4gICAgICAgIHRoaXMubG9jYXRpb25zVGFrZW4gPSBbXVxuICAgICAgICB0aGlzLnNoaXBzID0gc2hpcHNcbiAgICB9XG4gICAgXG4gICAgc2V0U2hpcHNQb3NpdGlvbihzaGlwLCBsb2NhdGlvbikge1xuICAgICAgICBzaGlwLmxvY2F0aW9uID0gbG9jYXRpb247XG4gICAgICAgIHRoaXMuc2hpcHMucHVzaChzaGlwKTtcbiAgICB9XG5cbiAgICBpc0FsbFNoaXBTdW5rKCkge1xuICAgICAgICBsZXQgY291bnQgPSAwXG4gICAgICAgIHRoaXMuc2hpcHMuZm9yRWFjaChzaGlwID0+IHtcbiAgICAgICAgICAgIGlmKHNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgICAgICAgICBjb3VudCsrXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZihjb3VudCA+PSB0aGlzLnNoaXBzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICByZWNlaXZlU3RyaWtlKHNwb3QpIHtcbiAgICAgICAgbGV0IGhpdCA9IGZhbHNlXG4gICAgICAgIGlmKCF0aGlzLmlzQWxsU2hpcFN1bmsoKSkge1xuICAgICAgICAgICAgaWYoIXRoaXMuaXNQb3NpdGlvblRha2VuKHNwb3QpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52aXNpdGVkQ2VsbHMucHVzaChzcG90KVxuICAgICAgICAgICAgICAgIHRoaXMuc2hpcHMuZm9yRWFjaChzaGlwID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYoc2hpcC5pc0hpdChzcG90KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGl0ID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGl0U3BvdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNwb3QpXG4gICAgICAgICAgICAgICAgICAgICAgICBoaXRTcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiaGl0LXNwb3RcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlNZXNzYWdlKGBPbmUgJHt0aGlzLm93bmVyfSBzaGlwIGRlc3Ryb3llZGApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5pc0FsbFNoaXBTdW5rKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5TWVzc2FnZShgR2FtZSBvdmVyIGFsbCBzaGlwcyBkZXN0cm95ZWQgJHt0aGlzLm93bmVyfSB3aW5zYClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coMilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJicmVhZFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9ICBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIGlmKCFoaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbG9jYXRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzcG90KVxuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbi5pbm5lckhUTUwgPSBcIlhcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlNZXNzYWdlKFwiY2hvb3NlIGFub3RoZXIgc3BvdFwiKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5TWVzc2FnZShgR2FtZSBvdmVyIGFsbCBzaGlwcyBkZXN0cm95ZWQgJHt0aGlzLm93bmVyfSB3aW5zYClcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKDEpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgIH1cbiAgICBpc1Bvc2l0aW9uVGFrZW4ocG9zaXRpb24pIHtcbiAgICAgICAgaWYodGhpcy52aXNpdGVkQ2VsbHMuaW5jbHVkZXMocG9zaXRpb24pKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICBcbiAgICB9XG4gICAgaXNQbGFjZW1lbnRTcG90VGFrZW4oc3BvdCkge1xuICAgICAgICBpZih0aGlzLmxvY2F0aW9uc1Rha2VuLmluY2x1ZGVzKHNwb3QpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIHJlbmRlckJvYXJkKHBhcmVudCl7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLm51bVJvd3M7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpXG4gICAgICAgICAgICByb3cuc2V0QXR0cmlidXRlKFwiaWRcIiwgYHJvdy0ke2l9YClcbiAgICAgICAgICAgIHJvdy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInJvd1wiKVxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IHRoaXMubnVtQ29sdW1uczsgaisrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKVxuICAgICAgICAgICAgICAgIGJveC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHt0aGlzLm93bmVyfSR7aX0ke2p9YClcbiAgICAgICAgICAgICAgICBib3guc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJib3hcIilcbiAgICAgICAgICAgICAgICByb3cuYXBwZW5kQ2hpbGQoYm94KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKHJvdylcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYodGhpcy5vd25lciA9PT0gXCJwXCIpIHtcbiAgICAgICAgICAgIHRoaXMuc2hpcHMuZm9yRWFjaChzaGlwID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYWNlU2hpcChzaGlwKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gXG4gICAgfVxuXG4gICAgcGxhY2VTaGlwKHNoaXApIHtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHNoaXAubG9jYXRpb24ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNoaXAubG9jYXRpb25baV0pXG4gICAgICAgICAgICBib3guc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJib3gtc2hpcFwiKVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGRpc3BsYXlNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICAgICAgY29uc3QgbWVzc2FnZUFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1lc3NhZ2VcIilcbiAgICAgICAgbWVzc2FnZUFyZWEuaW5uZXJIVE1MID0gbWVzc2FnZVxuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEdhbWVCb2FyZCIsImNsYXNzIFNoaXAge1xuICAgIGNvbnN0cnVjdG9yKGxvY2F0aW9uKSB7XG4gICAgICAgIHRoaXMubG9jYXRpb24gPSBsb2NhdGlvbjtcbiAgICAgICAgdGhpcy5sZW5ndGggPSBsb2NhdGlvbi5sZW5ndGg7XG4gICAgICAgIHRoaXMuaGl0cyA9IDA7XG4gICAgfVxuXG4gICAgaXNIaXQocG9zaXRpb24pIHtcbiAgICAgICAgaWYodGhpcy5sb2NhdGlvbi5pbmNsdWRlcyhwb3NpdGlvbikpIHtcbiAgICAgICAgICAgIHRoaXMuaGl0cysrO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgXG4gICAgaXNTdW5rKCkge1xuICAgICAgICBpZih0aGlzLmhpdHMgPj0gdGhpcy5sb2NhdGlvbi5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNoaXA7IiwiaW1wb3J0IEdhbWVCb2FyZCBmcm9tICcuL0dhbWVCb2FyZCdcbmltcG9ydCB7IFxuICAgICAgICBtYXJrSGl0TG9jYXRpb24sIFxuICAgICAgICBjbGVhck1lc3NhZ2UsIFxuICAgICAgICBkaXNwbGF5Qm9hcmQsXG4gICAgICAgIGdlbmVyYXRlU3BvdCxnZW5lcmF0ZVNoaXBzIH0gZnJvbSAnLi91bHRpbGl0eSdcblxuY29uc3QgcmVzZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlc2V0XCIpO1xuY29uc3Qgc3RhcnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXJ0XCIpXG5cblxuY29uc3QgY29tcHV0ZXJTaGlwcyA9IGdlbmVyYXRlU2hpcHMoXCJjXCIpXG5jb25zdCBwbGF5ZXJTaGlwcyA9IGdlbmVyYXRlU2hpcHMoXCJwXCIpXG5jb25zdCBwbGF5ZXJQYXJlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllcjEtYm9hcmRcIilcbmNvbnN0IGNvbXB1dGVyUGFyZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXIyLWJvYXJkXCIpXG5jb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRhaW5lclwiKVxuY29uc29sZS5sb2cocGxheWVyU2hpcHMpXG5jb25zdCBwbGF5ZXJCb2FyZCA9IG5ldyBHYW1lQm9hcmQocGxheWVyU2hpcHMsIFwicFwiKVxuY29uc3QgY29tcHV0ZXJCb2FyZCA9IG5ldyBHYW1lQm9hcmQoY29tcHV0ZXJTaGlwcywgXCJjXCIpXG5cbmRpc3BsYXlCb2FyZChwbGF5ZXJCb2FyZCwgcGxheWVyUGFyZW50KVxuZGlzcGxheUJvYXJkKGNvbXB1dGVyQm9hcmQsIGNvbXB1dGVyUGFyZW50KVxuXG5cbmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICBpZihtYXJrSGl0TG9jYXRpb24oZS50YXJnZXQuaWQsIGNvbXB1dGVyQm9hcmQpKSB7XG4gICAgICAgIG1hcmtIaXRMb2NhdGlvbihnZW5lcmF0ZVNwb3QocGxheWVyQm9hcmQpLCBwbGF5ZXJCb2FyZClcbiAgICB9XG59KVxuXG5yZXNldC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgZ2VuZXJhdGVTaGlwcyhcImNcIik7XG4gICAgZ2VuZXJhdGVTaGlwcyhcInBcIik7XG5cbmRpc3BsYXlCb2FyZChwbGF5ZXJCb2FyZCwgcGxheWVyUGFyZW50KVxuXG5kaXNwbGF5Qm9hcmQoY29tcHV0ZXJCb2FyZCwgY29tcHV0ZXJQYXJlbnQpXG59KTtcblxuY2xlYXJNZXNzYWdlKClcbiIsImltcG9ydCBTaGlwIGZyb20gJy4vU2hpcCdcblxuY29uc3QgbWFya0hpdExvY2F0aW9uID0gKGhpdFNwb3QsIGJvYXJkKSA9PiB7XG4gICAgcmV0dXJuIGJvYXJkLnJlY2VpdmVTdHJpa2UoaGl0U3BvdClcbn1cblxuY29uc3QgY2xlYXJNZXNzYWdlID0gKCkgPT4ge1xuICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgY29uc3QgbWVzc2FnZUFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1lc3NhZ2VcIilcbiAgICAgICAgbWVzc2FnZUFyZWEuaW5uZXJIVE1MID0gXCJcIlxuICAgIH0sIDEwMDAwKVxufVxuXG5jb25zdCBkaXNwbGF5Qm9hcmQgPSAoYm9hcmQsIHBhcmVudCkgPT4ge1xuICAgIGJvYXJkLnJlbmRlckJvYXJkKHBhcmVudClcbn1cblxuY29uc3QgZ2VuZXJhdGVTcG90ID0gKGJvYXJkKSA9PiB7XG4gICAgbGV0IHNwb3QgPSBcIlwiXG4gICAgZG8ge1xuICAgICAgICBsZXQgZmlyc3REaWdpdCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoxMClcbiAgICAgICAgbGV0IHNlY29uZERpZ2l0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjEwKVxuICAgICAgICBzcG90ID0gXCJwXCIrZmlyc3REaWdpdCtzZWNvbmREaWdpdDtcbiAgICB9IHdoaWxlKGJvYXJkLmlzUG9zaXRpb25UYWtlbihzcG90KSlcbiAgICByZXR1cm4gc3BvdFxufVxuY29uc3QgZ2VuZXJhdGVTaGlwcyA9IChvd25lcikgPT4ge1xuICAgIGxldCBzaGlwcyA9W107XG4gICAgLy8gZ2VuZXJlYXRlIHR3byBzaGlwcyB3aXRoIGxlbmd0aCA0XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IDI7IGkrKyl7XG4gICAgICAgIHNoaXBzLnB1c2goY3JlYXRlQVNoaXAoNCxvd25lcixcImhvcml6b250YWxcIixzaGlwcykpXG4gICAgfVxuICAgICAvLyBnZW5lcmVhdGUgdGhyZWUgc2hpcHMgd2l0aCBsZW5ndGggM1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCAyOyBpKyspe1xuICAgICAgICBzaGlwcy5wdXNoKGNyZWF0ZUFTaGlwKDMsb3duZXIsbnVsbCxzaGlwcykpXG4gICAgfVxuICAgICAgLy8gZ2VuZXJlYXRlIDIgc2hpcHMgd2l0aCBsZW5ndGggMlxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCAyOyBpKyspe1xuICAgICAgICBzaGlwcy5wdXNoKGNyZWF0ZUFTaGlwKDIsb3duZXIsXCJob3Jpem9udGFsXCIsc2hpcHMpKVxuICAgIH1cbiAgICAgIC8vIGdlbmVyZWF0ZSA0IHNoaXBzIHdpdGggbGVuZ3RoIDFcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgMzsgaSsrKXtcbiAgICAgICAgc2hpcHMucHVzaChjcmVhdGVBU2hpcCgxLG93bmVyLG51bGwsc2hpcHMpKVxuICAgIH1cbiAgICByZXR1cm4gc2hpcHM7XG59XG5cbmNvbnN0IGNyZWF0ZUFTaGlwID0gKGxlbmd0aE9mU2hpcCwgb3duZXIsIG9yaWVudGF0aW9uLCBzaGlwcykgPT4ge1xuICAgIGxldCBsb2NhdGlvbiA9IFtdO1xuICAgIGxldCBmaXJzdERpZ2l0ID0gbnVsbDtcbiAgICBsZXQgc2Vjb25kRGlnaXQgPSBudWxsO1xuICAgIGxldCBzcG90ID0gXCJcIlxuICAgIGxldCBpID0gMFxuICAgIHdoaWxlKGxvY2F0aW9uLmxlbmd0aCA8IGxlbmd0aE9mU2hpcCkge1xuICAgICAgICBpZihvcmllbnRhdGlvbiA9PSBcImhvcml6b250YWxcIikge1xuICAgICAgICAgICAgaWYobG9jYXRpb24ubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgICAgIHNlY29uZERpZ2l0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICAgICAgICAgIH0gd2hpbGUoc2Vjb25kRGlnaXQgKyBsZW5ndGhPZlNoaXAgPiA4KVxuICAgICAgICAgICAgICAgIGZpcnN0RGlnaXQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlY29uZERpZ2l0ICs9IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmKGxvY2F0aW9uLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgICAgICBmaXJzdERpZ2l0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICAgICAgICAgIH0gd2hpbGUoZmlyc3REaWdpdCArIGxlbmd0aE9mU2hpcCA+IDgpXG4gICAgICAgICAgICAgICAgc2Vjb25kRGlnaXQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZpcnN0RGlnaXQgKz0gMVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHNwb3QgPSBvd25lcitmaXJzdERpZ2l0K3NlY29uZERpZ2l0XG4gICAgICAgIGxvY2F0aW9uLnB1c2goc3BvdClcbiAgICB9IFxuICAgIHJldHVybiBjaGVja1N1cGVySW1wb3NpdGlvbihzaGlwcywgbmV3IFNoaXAobG9jYXRpb24pLGxlbmd0aE9mU2hpcCwgb3duZXIsIG9yaWVudGF0aW9uKTtcbn1cbmNvbnN0IGNoZWNrU3VwZXJJbXBvc2l0aW9uID0gKHNoaXBzLCBzaGlwLGxlbmd0aE9mU2hpcCwgb3duZXIsIG9yaWVudGF0aW9uKT0+IHtcbiAgICBsZXQgaW1wb3NpdGlvbiA9IDA7XG4gICAgaWYgKHNoaXBzLmxlbmd0aCA+IDApe1xuICAgICAgICBzaGlwcy5mb3JFYWNoKGN1cnJlbnRWYWx1ZSA9PiB7XG4gICAgICAgICAgICBpbXBvc2l0aW9uID0gY3VycmVudFZhbHVlLmxvY2F0aW9uLmZpbHRlcihlbGVtZW50ID0+IHNoaXAubG9jYXRpb24uaW5jbHVkZXMoZWxlbWVudCkpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGltcG9zaXRpb24gPT0gMCl7XG4gICAgICAgIHJldHVybiBzaGlwO1xuICAgIH1lbHNle1xuICAgICAgIHJldHVybiBjcmVhdGVBU2hpcChsZW5ndGhPZlNoaXAsIG93bmVyLCBvcmllbnRhdGlvbiwgc2hpcHMpXG4gICAgfVxufVxuXG5leHBvcnQgeyBkaXNwbGF5Qm9hcmQsIG1hcmtIaXRMb2NhdGlvbiwgY2xlYXJNZXNzYWdlLCBnZW5lcmF0ZVNwb3QsIGNyZWF0ZUFTaGlwLCBjaGVja1N1cGVySW1wb3NpdGlvbixnZW5lcmF0ZVNoaXBzIH1cbiJdLCJzb3VyY2VSb290IjoiIn0=
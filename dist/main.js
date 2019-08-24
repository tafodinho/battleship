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
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ "./src/Ship.js");


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
    generateShips(owner){
        let ships =[];
        // genereate two ships with length 4
        for(let i =0; i>2; i++){
            let ship = this.createAShip(4,owner)
            if(checkSuperimposition(ships, ship)){
                this.createAShip(4,owner);
            }
        }
         // genereate three ships with length 3
         for(let i =0; i>3; i++){
            let ship = this.createAShip(3,owner);
            if(checkSuperimposition(ships, ship)){
                this.createAShip(3,owner);
            }
        }
          // genereate 2 ships with length 2
          for(let i =0; i>2; i++){
            let ship = this.createAShip(2,owner)
            if(checkSuperimposition(ships, ship)){
                this.createAShip(2,owner);
            }
        }
          // genereate 4 ships with length 1
          for(let i =0; i>4; i++){
            let ship = this.createAShip(1,owner)
            if(checkSuperimposition(ships, ship)){
                this.createAShip(1,owner);
            }
        }
    }
    checkSuperimposition(ships, ship){
        let imposition = 0;
        ships.forEach(function(currentValue){
            imposition = currentValue.location.filter(element => ship.location.includes(element));
        });
        if (imposition == 0){
            return true;
        }
        return false;
    }
    createAShip(lengthOfShip, owner){
        let location = [];
        let firstDigit = null;
        secondDigit = null;
        for(let i=0; i>lengthOfShip; i++){
            if(i = 0){
                firstDigit = Math.floor(Math.random() * 10);     
            } else if (firstDigit + lengthOfShip <= 9){
                secondDigit = firstDigit + 1; 
            }else{
                secondDigit = firstDigit - 1;
            } 
            let spot  = owner+firstDigit+secondDigit;
            location.push(spot);
        }
        return new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"](location);
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
let reset = document.querySelector(".reset");
reset.addEventListener('click', function(event) {
    const gamepPlay = new _gamePlay__WEBPACK_IMPORTED_MODULE_1__["default"](playerBoard, computerBoard);
    gamepPlay.generateShips("c");
    gamepPlay.generateShips("p");
});


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
    return new Ship(location);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dhbWVCb2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUGxheWVyLmpzIiwid2VicGFjazovLy8uL3NyYy9TaGlwLmpzIiwid2VicGFjazovLy8uL3NyYy9nYW1lUGxheS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoaXBzLmpzIiwid2VicGFjazovLy8uL3NyYy91bHRpbGl0eS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtB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QkFBa0IsNkNBQUk7QUFDdEIsa0JBQWtCLDZDQUFJO0FBQ3RCLGtCQUFrQiw2Q0FBSTtBQUN0QixrQkFBa0IsNkNBQUk7QUFDdEIsa0JBQWtCLDZDQUFJOztBQUV0QixtQkFBbUIsNkNBQUk7QUFDdkIsbUJBQW1CLDZDQUFJO0FBQ3ZCLG1CQUFtQiw2Q0FBSTtBQUN2QixtQkFBbUIsNkNBQUk7QUFDdkIsbUJBQW1CLDZDQUFJO0FBQ3ZCLG1CQUFtQiw2Q0FBSTtBQUN2QixtQkFBbUIsNkNBQUk7QUFDdkIsbUJBQW1CLDZDQUFJOztBQUV2QjtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BCQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiY2xhc3MgR2FtZUJvYXJkIHtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihzaGlwcywgb3duZXIpIHtcbiAgICAgICAgdGhpcy5ncmlkID0gbmV3IEFycmF5KDEwMClcbiAgICAgICAgdGhpcy5udW1Sb3dzID0gMTBcbiAgICAgICAgdGhpcy5udW1Db2x1bW5zID0gMTBcbiAgICAgICAgdGhpcy5zaGlwcyA9IHNoaXBzXG4gICAgICAgIHRoaXMub3duZXIgPSBvd25lclxuICAgICAgICB0aGlzLnZpc2l0ZWRDZWxscyA9IFtdXG4gICAgICAgIHRoaXMuZGFtYWdlZFNoaXBzID0gMFxuICAgIH1cbiAgICBcbiAgICBzZXRTaGlwc1Bvc2l0aW9uKHNoaXAsIGxvY2F0aW9uKSB7XG4gICAgICAgIHNoaXAubG9jYXRpb24gPSBsb2NhdGlvbjtcbiAgICAgICAgdGhpcy5zaGlwcy5wdXNoKHNoaXApO1xuICAgIH1cblxuICAgIGlzQWxsU2hpcFN1bmsoKSB7XG4gICAgICAgIGxldCBjb3VudCA9IDBcbiAgICAgICAgdGhpcy5zaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgICAgICAgaWYoc2hpcC5pc1N1bmsoKSkge1xuICAgICAgICAgICAgICAgIGNvdW50KytcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmKGNvdW50ID49IHRoaXMuc2hpcHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWNlaXZlU3RyaWtlKHNwb3QpIHtcbiAgICAgICAgaWYoIXRoaXMuaXNBbGxTaGlwU3VuaygpKSB7XG4gICAgICAgICAgICBpZighdGhpcy5pc1Bvc2l0aW9uVGFrZW4oc3BvdCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZpc2l0ZWRDZWxscy5wdXNoKHNwb3QpXG4gICAgICAgICAgICAgICAgdGhpcy5zaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZihzaGlwLmlzSGl0KHNwb3QpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoaXRTcG90ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc3BvdClcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpdFNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJoaXQtc3BvdFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2hpcC5pc1N1bmsoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheU1lc3NhZ2UoXCJPbmUgRW5lbXkgc2hpcCBEZXN0cm95ZWRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmlzQWxsU2hpcFN1bmsoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlNZXNzYWdlKFwiR2FtZSBvdmVyIGFsbCBzaGlwcyBkZXN0cm95ZWRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3Rocm93IEJyZWFrRXhjZXB0aW9uXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIGNvbnN0IGxvY2F0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc3BvdClcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5pbm5lckhUTUwgPSBcIlhcIlxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlNZXNzYWdlKFwiY2hvb3NlIGFub3RoZXIgc3BvdFwiKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5TWVzc2FnZShcIkdhbWUgb3ZlciBhbGwgc2hpcHMgZGVzdHJveWVkXCIpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc1Bvc2l0aW9uVGFrZW4ocG9zaXRpb24pIHtcbiAgICAgICAgaWYodGhpcy52aXNpdGVkQ2VsbHMuaW5jbHVkZXMocG9zaXRpb24pKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICBcbiAgICB9XG5cbiAgICByZW5kZXJCb2FyZCAocGFyZW50KXtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMubnVtUm93czsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIilcbiAgICAgICAgICAgIHJvdy5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgcm93LSR7aX1gKVxuICAgICAgICAgICAgcm93LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwicm93XCIpXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgdGhpcy5udW1Db2x1bW5zOyBqKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpXG4gICAgICAgICAgICAgICAgYm94LnNldEF0dHJpYnV0ZShcImlkXCIsIGAke3RoaXMub3duZXJ9JHtpfSR7an1gKVxuICAgICAgICAgICAgICAgIGJveC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImJveFwiKVxuICAgICAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChib3gpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQocm93KVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZih0aGlzLm93bmVyID09PSBcInBcIikge1xuICAgICAgICAgICAgdGhpcy5zaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucGxhY2VTaGlwKHNoaXApXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBcbiAgICB9XG5cbiAgICBwbGFjZVNoaXAoc2hpcCkge1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2hpcC5sb2NhdGlvbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2hpcC5sb2NhdGlvbltpXSlcbiAgICAgICAgICAgIGJveC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImJveC1zaGlwXCIpXG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgIGRpc3BsYXlNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICAgICAgY29uc3QgbWVzc2FnZUFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1lc3NhZ2VcIilcbiAgICAgICAgbWVzc2FnZUFyZWEuaW5uZXJIVE1MID0gbWVzc2FnZVxuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEdhbWVCb2FyZCIsIi8vIGltcG9ydCB7IGlzTW9kdWxlU3BlY2lmaWVyIH0gZnJvbSBcIkBiYWJlbC90eXBlc1wiO1xuXG5jbGFzcyBQbGF5ZXIge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGJvYXJkKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWVcbiAgICAgICAgdGhpcy5ib2FyZCA9IGJvYXJkO1xuICAgICAgICB0aGlzLnR1cm4gPSBmYWxzZTtcbiAgICB9XG59XG5cbi8vZXhwb3J0IGRlZmF1bHQgUGxheWVyXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXllcjsiLCJjbGFzcyBTaGlwIHtcblxuICAgIGNvbnN0cnVjdG9yKGxvY2F0aW9uKSB7XG4gICAgICAgIHRoaXMubG9jYXRpb24gPSBsb2NhdGlvbjtcbiAgICAgICAgdGhpcy5oaXRzID0gMDtcbiAgICB9XG5cbiAgICBpc0hpdChwb3NpdGlvbikge1xuICAgICAgICBpZih0aGlzLmxvY2F0aW9uLmluY2x1ZGVzKHBvc2l0aW9uKSkge1xuICAgICAgICAgICAgdGhpcy5oaXRzKys7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBcbiAgICBpc1N1bmsoKSB7XG4gICAgICAgIGlmKHRoaXMuaGl0cyA+PSB0aGlzLmxvY2F0aW9uLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2hpcCIsImltcG9ydCBTaGlwIGZyb20gJy4vU2hpcCdcblxuY2xhc3MgR2FtZVBsYXkge1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKHBsYXllckJvcmFkLCBDb21wdXRlckJvYXJkKSB7XG4gICAgICAgIHRoaXMucGxheWVyQm9yYWQgPSBwbGF5ZXJCb3JhZFxuICAgICAgICB0aGlzLkNvbXB1dGVyQm9hcmQgPSBDb21wdXRlckJvYXJkO1xuICAgIH1cblxuICAgIHBsYXlCYXR0bGVTaGlwKCkge1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImluIGdhbWVcIik7XG4gICAgICAgICAgfVxuICAgICAgICAgIHdoaWxlICghaXNHYW1lT3ZlcigpKTtcbiAgICAgICAgICBcbiAgICB9XG4gICAgaXNHYW1lT3Zlcigpe1xuICAgICAgICBpZih0aGlzLkNvbXB1dGVyQm9hcmQuaXNBbGxTaGlwU3VuaygpIHx8IHRoaXMucGxheWVyQm9yYWQuaXNBbGxTaGlwU3VuaygpKXtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZ2VuZXJhdGVTaGlwcyhvd25lcil7XG4gICAgICAgIGxldCBzaGlwcyA9W107XG4gICAgICAgIC8vIGdlbmVyZWF0ZSB0d28gc2hpcHMgd2l0aCBsZW5ndGggNFxuICAgICAgICBmb3IobGV0IGkgPTA7IGk+MjsgaSsrKXtcbiAgICAgICAgICAgIGxldCBzaGlwID0gdGhpcy5jcmVhdGVBU2hpcCg0LG93bmVyKVxuICAgICAgICAgICAgaWYoY2hlY2tTdXBlcmltcG9zaXRpb24oc2hpcHMsIHNoaXApKXtcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUFTaGlwKDQsb3duZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgICAvLyBnZW5lcmVhdGUgdGhyZWUgc2hpcHMgd2l0aCBsZW5ndGggM1xuICAgICAgICAgZm9yKGxldCBpID0wOyBpPjM7IGkrKyl7XG4gICAgICAgICAgICBsZXQgc2hpcCA9IHRoaXMuY3JlYXRlQVNoaXAoMyxvd25lcik7XG4gICAgICAgICAgICBpZihjaGVja1N1cGVyaW1wb3NpdGlvbihzaGlwcywgc2hpcCkpe1xuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlQVNoaXAoMyxvd25lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgICAvLyBnZW5lcmVhdGUgMiBzaGlwcyB3aXRoIGxlbmd0aCAyXG4gICAgICAgICAgZm9yKGxldCBpID0wOyBpPjI7IGkrKyl7XG4gICAgICAgICAgICBsZXQgc2hpcCA9IHRoaXMuY3JlYXRlQVNoaXAoMixvd25lcilcbiAgICAgICAgICAgIGlmKGNoZWNrU3VwZXJpbXBvc2l0aW9uKHNoaXBzLCBzaGlwKSl7XG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVBU2hpcCgyLG93bmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAgIC8vIGdlbmVyZWF0ZSA0IHNoaXBzIHdpdGggbGVuZ3RoIDFcbiAgICAgICAgICBmb3IobGV0IGkgPTA7IGk+NDsgaSsrKXtcbiAgICAgICAgICAgIGxldCBzaGlwID0gdGhpcy5jcmVhdGVBU2hpcCgxLG93bmVyKVxuICAgICAgICAgICAgaWYoY2hlY2tTdXBlcmltcG9zaXRpb24oc2hpcHMsIHNoaXApKXtcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUFTaGlwKDEsb3duZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGNoZWNrU3VwZXJpbXBvc2l0aW9uKHNoaXBzLCBzaGlwKXtcbiAgICAgICAgbGV0IGltcG9zaXRpb24gPSAwO1xuICAgICAgICBzaGlwcy5mb3JFYWNoKGZ1bmN0aW9uKGN1cnJlbnRWYWx1ZSl7XG4gICAgICAgICAgICBpbXBvc2l0aW9uID0gY3VycmVudFZhbHVlLmxvY2F0aW9uLmZpbHRlcihlbGVtZW50ID0+IHNoaXAubG9jYXRpb24uaW5jbHVkZXMoZWxlbWVudCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGltcG9zaXRpb24gPT0gMCl7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNyZWF0ZUFTaGlwKGxlbmd0aE9mU2hpcCwgb3duZXIpe1xuICAgICAgICBsZXQgbG9jYXRpb24gPSBbXTtcbiAgICAgICAgbGV0IGZpcnN0RGlnaXQgPSBudWxsO1xuICAgICAgICBzZWNvbmREaWdpdCA9IG51bGw7XG4gICAgICAgIGZvcihsZXQgaT0wOyBpPmxlbmd0aE9mU2hpcDsgaSsrKXtcbiAgICAgICAgICAgIGlmKGkgPSAwKXtcbiAgICAgICAgICAgICAgICBmaXJzdERpZ2l0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApOyAgICAgXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGZpcnN0RGlnaXQgKyBsZW5ndGhPZlNoaXAgPD0gOSl7XG4gICAgICAgICAgICAgICAgc2Vjb25kRGlnaXQgPSBmaXJzdERpZ2l0ICsgMTsgXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBzZWNvbmREaWdpdCA9IGZpcnN0RGlnaXQgLSAxO1xuICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIGxldCBzcG90ICA9IG93bmVyK2ZpcnN0RGlnaXQrc2Vjb25kRGlnaXQ7XG4gICAgICAgICAgICBsb2NhdGlvbi5wdXNoKHNwb3QpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgU2hpcChsb2NhdGlvbik7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgR2FtZVBsYXkiLCJpbXBvcnQgR2FtZUJvYXJkIGZyb20gJy4vR2FtZUJvYXJkJ1xuaW1wb3J0IEdhbWVQbGF5IGZyb20gJy4vZ2FtZVBsYXknXG5pbXBvcnQgeyBcbiAgICAgICAgbWFya0hpdExvY2F0aW9uLCBcbiAgICAgICAgY2xlYXJNZXNzYWdlLCBcbiAgICAgICAgZGlzcGxheUJvYXJkLFxuICAgICAgICBnZW5lcmF0ZVNwb3QgfSBmcm9tICcuL3VsdGlsaXR5J1xuaW1wb3J0IFBsYXllciBmcm9tICcuL1BsYXllcic7XG5pbXBvcnQgeyBwbGF5ZXJTaGlwcywgY29tcHV0ZXJTaGlwcyB9IGZyb20gJy4vc2hpcHMnXG5cbmNvbnN0IHBsYXllclBhcmVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyMS1ib2FyZFwiKVxuY29uc3QgY29tcHV0ZXJQYXJlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllcjItYm9hcmRcIilcbmNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFpbmVyXCIpXG5jb25zdCBwbGF5ZXJCb2FyZCA9IG5ldyBHYW1lQm9hcmQocGxheWVyU2hpcHMsIFwicFwiKVxuY29uc3QgY29tcHV0ZXJCb2FyZCA9IG5ldyBHYW1lQm9hcmQoY29tcHV0ZXJTaGlwcywgXCJjXCIpXG5jb25zdCBwbGF5ZXIgPSBuZXcgUGxheWVyKFwicGxheWVyXCIsIHBsYXllckJvYXJkKVxuY29uc3QgY29tcHV0ZXIgPSBuZXcgUGxheWVyKFwiY29tcHV0ZXJcIiwgY29tcHV0ZXJCb2FyZClcblxuZGlzcGxheUJvYXJkKHBsYXllckJvYXJkLCBwbGF5ZXJQYXJlbnQpXG5cbmRpc3BsYXlCb2FyZChjb21wdXRlckJvYXJkLCBjb21wdXRlclBhcmVudClcblxuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgIGNvbnNvbGUubG9nKGUudGFyZ2V0LmlkKVxuICAgIG1hcmtIaXRMb2NhdGlvbihlLnRhcmdldC5pZCwgY29tcHV0ZXJCb2FyZClcbiAgICBtYXJrSGl0TG9jYXRpb24oZ2VuZXJhdGVTcG90KHBsYXllckJvYXJkKSwgcGxheWVyQm9hcmQpXG59KVxubGV0IHJlc2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZXNldFwiKTtcbnJlc2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBjb25zdCBnYW1lcFBsYXkgPSBuZXcgR2FtZVBsYXkocGxheWVyQm9hcmQsIGNvbXB1dGVyQm9hcmQpO1xuICAgIGdhbWVwUGxheS5nZW5lcmF0ZVNoaXBzKFwiY1wiKTtcbiAgICBnYW1lcFBsYXkuZ2VuZXJhdGVTaGlwcyhcInBcIik7XG59KTtcblxuXG5jbGVhck1lc3NhZ2UoKVxuY29uc3QgY3JlYXRlQVNoaXAgPSAoKGxlbmd0aE9mU2hpcCwgb3duZXIsIG9yaWVudGF0aW9uKSA9PiB7XG4gICAgbGV0IGxvY2F0aW9uID0gW107XG4gICAgbGV0IGZpcnN0RGlnaXQgPSBudWxsO1xuICAgIGxldCBzZWNvbmREaWdpdCA9IG51bGw7XG4gICAgbGV0IHNwb3QgPSBcIlwiXG4gICAgbGV0IGkgPSAwXG4gICAgd2hpbGUobG9jYXRpb24ubGVuZ3RoIDwgbGVuZ3RoT2ZTaGlwKSB7XG4gICAgICAgIGlmKG9yaWVudGF0aW9uID09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgICAgICAgICBpZihsb2NhdGlvbi5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgIGZpcnN0RGlnaXQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgICAgICAgICAgc2Vjb25kRGlnaXQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlY29uZERpZ2l0ICs9IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmKGxvY2F0aW9uLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgZmlyc3REaWdpdCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICAgICAgICBzZWNvbmREaWdpdCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZmlyc3REaWdpdCArPSAxXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICBcbiAgICAgICAgc3BvdCA9IG93bmVyK2ZpcnN0RGlnaXQrc2Vjb25kRGlnaXRcbiAgICAgICAgbG9jYXRpb24ucHVzaChzcG90KVxuICAgIH1cbiAgICByZXR1cm4gbmV3IFNoaXAobG9jYXRpb24pO1xufSkoNCwgXCJwXCIsIFwidmVydGljYWxcIilcbiIsImltcG9ydCBTaGlwIGZyb20gJy4vU2hpcCdcblxuY29uc3Qgc2hpcDEgPSBuZXcgU2hpcChbXCJwMDBcIiwgXCJwMDFcIiwgXCJwMDJcIl0pXG5jb25zdCBzaGlwMiA9IG5ldyBTaGlwKFtcInA2N1wiLCBcInA3N1wiLCBcInA4N1wiXSlcbmNvbnN0IHNoaXAzID0gbmV3IFNoaXAoW1wicDUxXCIsIFwicDYxXCJdKVxuY29uc3Qgc2hpcDQgPSBuZXcgU2hpcChbXCJwMzdcIiwgXCJwMzhcIl0pXG5jb25zdCBzaGlwNSA9IG5ldyBTaGlwKFtcInAyNFwiLCBcInAzNFwiLCBcInA0NFwiLCBcInA1NFwiXSlcbmNvbnN0IHNoaXA2ID0gbmV3IFNoaXAoW1wicDE3XCJdKVxuY29uc3Qgc2hpcDcgPSBuZXcgU2hpcChbXCJwOTJcIl0pXG5jb25zdCBzaGlwOCA9IG5ldyBTaGlwKFtcInA3M1wiLCBcInA3NFwiLCBcInA3NVwiXSlcblxuY29uc3QgY3NoaXAxID0gbmV3IFNoaXAoW1wiYzAwXCIsIFwiYzAxXCIsIFwiYzAyXCJdKVxuY29uc3QgY3NoaXAyID0gbmV3IFNoaXAoW1wiYzY3XCIsIFwiYzc3XCIsIFwiYzg3XCJdKVxuY29uc3QgY3NoaXAzID0gbmV3IFNoaXAoW1wiYzUxXCIsIFwiYzYxXCJdKVxuY29uc3QgY3NoaXA0ID0gbmV3IFNoaXAoW1wiYzM3XCIsIFwiYzM4XCJdKVxuY29uc3QgY3NoaXA1ID0gbmV3IFNoaXAoW1wiYzI0XCIsIFwiYzM0XCIsIFwiYzQ0XCIsIFwiYzU0XCJdKVxuY29uc3QgY3NoaXA2ID0gbmV3IFNoaXAoW1wiYzE3XCJdKVxuY29uc3QgY3NoaXA3ID0gbmV3IFNoaXAoW1wiYzkyXCJdKVxuY29uc3QgY3NoaXA4ID0gbmV3IFNoaXAoW1wiYzczXCIsIFwiYzc0XCIsIFwiYzc1XCJdKVxuXG5jb25zdCBwbGF5ZXJTaGlwcyA9IFtzaGlwMSwgc2hpcDIsIHNoaXAzLCBzaGlwNCwgc2hpcDUsIHNoaXA2LCBzaGlwNywgc2hpcDhdXG5jb25zdCBjb21wdXRlclNoaXBzID0gW2NzaGlwMSwgY3NoaXAyLCBjc2hpcDMsIGNzaGlwNCwgY3NoaXA1LCBjc2hpcDYsIGNzaGlwNywgY3NoaXA4XVxuXG5leHBvcnQgeyBwbGF5ZXJTaGlwcywgY29tcHV0ZXJTaGlwcyB9IiwiXG5jb25zdCBtYXJrSGl0TG9jYXRpb24gPSAoaGl0U3BvdCwgYm9hcmQpID0+IHtcbiAgICBib2FyZC5yZWNlaXZlU3RyaWtlKGhpdFNwb3QpXG59XG5cbmNvbnN0IGNsZWFyTWVzc2FnZSA9ICgpID0+IHtcbiAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2VBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZXNzYWdlXCIpXG4gICAgICAgIG1lc3NhZ2VBcmVhLmlubmVySFRNTCA9IFwiXCJcbiAgICB9LCAxMDAwMClcbn1cblxuY29uc3QgZGlzcGxheUJvYXJkID0gKGJvYXJkLCBwYXJlbnQpID0+IHtcbiAgICBib2FyZC5yZW5kZXJCb2FyZChwYXJlbnQpXG59XG5cbmNvbnN0IGdlbmVyYXRlU3BvdCA9IChib2FyZCkgPT4ge1xuICAgIGxldCBzcG90ID0gXCJcIlxuICAgIGRvIHtcbiAgICAgICAgbGV0IGZpcnN0RGlnaXQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMTApXG4gICAgICAgIGxldCBzZWNvbmREaWdpdCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoxMClcbiAgICAgICAgc3BvdCA9IFwicFwiK2ZpcnN0RGlnaXQrc2Vjb25kRGlnaXQ7XG4gICAgfSB3aGlsZShib2FyZC5pc1Bvc2l0aW9uVGFrZW4oc3BvdCkpXG4gICAgcmV0dXJuIHNwb3Rcbn1cblxuY29uc3QgY3JlYXRlQVNoaXAgPSAobGVuZ3RoT2ZTaGlwLCBvd25lciwgb3JpZW50YXRpb24pID0+IHtcbiAgICBsZXQgbG9jYXRpb24gPSBbXTtcbiAgICBsZXQgZmlyc3REaWdpdCA9IG51bGw7XG4gICAgbGV0IHNlY29uZERpZ2l0ID0gbnVsbDtcbiAgICBsZXQgc3BvdCA9IFwiXCJcbiAgICBsZXQgaSA9IDBcbiAgICB3aGlsZShsb2NhdGlvbi5sZW5ndGggPCBsZW5ndGhPZlNoaXApIHtcbiAgICAgICAgaWYob3JpZW50YXRpb24gPT0gXCJob3Jpem9udGFsXCIpIHtcbiAgICAgICAgICAgIGlmKGxvY2F0aW9uLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgZmlyc3REaWdpdCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICAgICAgICBzZWNvbmREaWdpdCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2Vjb25kRGlnaXQgKz0gMVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYobG9jYXRpb24ubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgICBmaXJzdERpZ2l0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICAgICAgICAgIHNlY29uZERpZ2l0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmaXJzdERpZ2l0ICs9IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgIFxuICAgICAgICBzcG90ID0gb3duZXIrZmlyc3REaWdpdCtzZWNvbmREaWdpdFxuICAgICAgICBsb2NhdGlvbi5wdXNoKHNwb3QpXG4gICAgfVxuICAgIHJldHVybiBuZXcgU2hpcChsb2NhdGlvbik7XG59XG5cbmV4cG9ydCB7IGRpc3BsYXlCb2FyZCwgbWFya0hpdExvY2F0aW9uLCBjbGVhck1lc3NhZ2UsIGdlbmVyYXRlU3BvdCB9Il0sInNvdXJjZVJvb3QiOiIifQ==
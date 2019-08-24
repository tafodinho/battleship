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
!(function webpackMissingModule() { var e = new Error("Cannot find module './ship'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var _ultility__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ultility */ "./src/ultility.js");
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Player */ "./src/Player.js");
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_Player__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ships__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ships */ "./src/ships.js");







const playerParent = document.getElementById("player1-board")
const computerParent = document.getElementById("player2-board")
const container = document.getElementById("container")
const playerBoard = new _GameBoard__WEBPACK_IMPORTED_MODULE_0__["default"](_ships__WEBPACK_IMPORTED_MODULE_5__["playerShips"], "p")
const computerBoard = new _GameBoard__WEBPACK_IMPORTED_MODULE_0__["default"](_ships__WEBPACK_IMPORTED_MODULE_5__["computerShips"], "c")
const player = new _Player__WEBPACK_IMPORTED_MODULE_4___default.a("player", playerBoard)
const computer = new _Player__WEBPACK_IMPORTED_MODULE_4___default.a("computer", computerBoard)

Object(_ultility__WEBPACK_IMPORTED_MODULE_3__["displayBoard"])(playerBoard, playerParent)

Object(_ultility__WEBPACK_IMPORTED_MODULE_3__["displayBoard"])(computerBoard, computerParent)

container.addEventListener("click", (e) => {
    console.log(e.target.id)
    Object(_ultility__WEBPACK_IMPORTED_MODULE_3__["markHitLocation"])(e.target.id, computerBoard)
    Object(_ultility__WEBPACK_IMPORTED_MODULE_3__["markHitLocation"])(Object(_ultility__WEBPACK_IMPORTED_MODULE_3__["generateSpot"])(playerBoard), playerBoard)
})
let reset = document.querySelector(".reset");
reset.addEventListener('click', function(event) {
    const gamepPlay = new _gamePlay__WEBPACK_IMPORTED_MODULE_1__["default"](playerBoard, computerBoard);
    gamepPlay.generateShips("c");
    gamepPlay.generateShips("p");
});


Object(_ultility__WEBPACK_IMPORTED_MODULE_3__["clearMessage"])()
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
    return new !(function webpackMissingModule() { var e = new Error("Cannot find module './ship'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(location);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dhbWVCb2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUGxheWVyLmpzIiwid2VicGFjazovLy8uL3NyYy9TaGlwLmpzIiwid2VicGFjazovLy8uL3NyYy9nYW1lUGxheS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoaXBzLmpzIiwid2VicGFjazovLy8uL3NyYy91bHRpbGl0eS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtB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QixrQkFBa0IsNkNBQUk7QUFDdEIsa0JBQWtCLDZDQUFJO0FBQ3RCLGtCQUFrQiw2Q0FBSTtBQUN0QixrQkFBa0IsNkNBQUk7QUFDdEIsa0JBQWtCLDZDQUFJO0FBQ3RCLGtCQUFrQiw2Q0FBSTs7QUFFdEIsbUJBQW1CLDZDQUFJO0FBQ3ZCLG1CQUFtQiw2Q0FBSTtBQUN2QixtQkFBbUIsNkNBQUk7QUFDdkIsbUJBQW1CLDZDQUFJO0FBQ3ZCLG1CQUFtQiw2Q0FBSTtBQUN2QixtQkFBbUIsNkNBQUk7QUFDdkIsbUJBQW1CLDZDQUFJO0FBQ3ZCLG1CQUFtQiw2Q0FBSTs7QUFFdkI7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQkE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImNsYXNzIEdhbWVCb2FyZCB7XG4gICAgXG4gICAgY29uc3RydWN0b3Ioc2hpcHMsIG93bmVyKSB7XG4gICAgICAgIHRoaXMuZ3JpZCA9IG5ldyBBcnJheSgxMDApXG4gICAgICAgIHRoaXMubnVtUm93cyA9IDEwXG4gICAgICAgIHRoaXMubnVtQ29sdW1ucyA9IDEwXG4gICAgICAgIHRoaXMuc2hpcHMgPSBzaGlwc1xuICAgICAgICB0aGlzLm93bmVyID0gb3duZXJcbiAgICAgICAgdGhpcy52aXNpdGVkQ2VsbHMgPSBbXVxuICAgICAgICB0aGlzLmRhbWFnZWRTaGlwcyA9IDBcbiAgICB9XG4gICAgXG4gICAgc2V0U2hpcHNQb3NpdGlvbihzaGlwLCBsb2NhdGlvbikge1xuICAgICAgICBzaGlwLmxvY2F0aW9uID0gbG9jYXRpb247XG4gICAgICAgIHRoaXMuc2hpcHMucHVzaChzaGlwKTtcbiAgICB9XG5cbiAgICBpc0FsbFNoaXBTdW5rKCkge1xuICAgICAgICBsZXQgY291bnQgPSAwXG4gICAgICAgIHRoaXMuc2hpcHMuZm9yRWFjaChzaGlwID0+IHtcbiAgICAgICAgICAgIGlmKHNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgICAgICAgICBjb3VudCsrXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZihjb3VudCA+PSB0aGlzLnNoaXBzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVjZWl2ZVN0cmlrZShzcG90KSB7XG4gICAgICAgIGlmKCF0aGlzLmlzQWxsU2hpcFN1bmsoKSkge1xuICAgICAgICAgICAgaWYoIXRoaXMuaXNQb3NpdGlvblRha2VuKHNwb3QpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52aXNpdGVkQ2VsbHMucHVzaChzcG90KVxuICAgICAgICAgICAgICAgIHRoaXMuc2hpcHMuZm9yRWFjaChzaGlwID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYoc2hpcC5pc0hpdChzcG90KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGl0U3BvdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNwb3QpXG4gICAgICAgICAgICAgICAgICAgICAgICBoaXRTcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiaGl0LXNwb3RcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlNZXNzYWdlKFwiT25lIEVuZW15IHNoaXAgRGVzdHJveWVkXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5pc0FsbFNoaXBTdW5rKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5TWVzc2FnZShcIkdhbWUgb3ZlciBhbGwgc2hpcHMgZGVzdHJveWVkXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aHJvdyBCcmVha0V4Y2VwdGlvblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBjb25zdCBsb2NhdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNwb3QpXG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaW5uZXJIVE1MID0gXCJYXCJcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5TWVzc2FnZShcImNob29zZSBhbm90aGVyIHNwb3RcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheU1lc3NhZ2UoXCJHYW1lIG92ZXIgYWxsIHNoaXBzIGRlc3Ryb3llZFwiKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNQb3NpdGlvblRha2VuKHBvc2l0aW9uKSB7XG4gICAgICAgIGlmKHRoaXMudmlzaXRlZENlbGxzLmluY2x1ZGVzKHBvc2l0aW9uKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgXG4gICAgfVxuXG4gICAgcmVuZGVyQm9hcmQgKHBhcmVudCl7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLm51bVJvd3M7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpXG4gICAgICAgICAgICByb3cuc2V0QXR0cmlidXRlKFwiaWRcIiwgYHJvdy0ke2l9YClcbiAgICAgICAgICAgIHJvdy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInJvd1wiKVxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IHRoaXMubnVtQ29sdW1uczsgaisrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKVxuICAgICAgICAgICAgICAgIGJveC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHt0aGlzLm93bmVyfSR7aX0ke2p9YClcbiAgICAgICAgICAgICAgICBib3guc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJib3hcIilcbiAgICAgICAgICAgICAgICByb3cuYXBwZW5kQ2hpbGQoYm94KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKHJvdylcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYodGhpcy5vd25lciA9PT0gXCJwXCIpIHtcbiAgICAgICAgICAgIHRoaXMuc2hpcHMuZm9yRWFjaChzaGlwID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYWNlU2hpcChzaGlwKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gXG4gICAgfVxuXG4gICAgcGxhY2VTaGlwKHNoaXApIHtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHNoaXAubG9jYXRpb24ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNoaXAubG9jYXRpb25baV0pXG4gICAgICAgICAgICBib3guc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJib3gtc2hpcFwiKVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgICBkaXNwbGF5TWVzc2FnZShtZXNzYWdlKSB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2VBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZXNzYWdlXCIpXG4gICAgICAgIG1lc3NhZ2VBcmVhLmlubmVySFRNTCA9IG1lc3NhZ2VcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBHYW1lQm9hcmQiLCIvLyBpbXBvcnQgeyBpc01vZHVsZVNwZWNpZmllciB9IGZyb20gXCJAYmFiZWwvdHlwZXNcIjtcblxuY2xhc3MgUGxheWVyIHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBib2FyZCkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lXG4gICAgICAgIHRoaXMuYm9hcmQgPSBib2FyZDtcbiAgICAgICAgdGhpcy50dXJuID0gZmFsc2U7XG4gICAgfVxufVxuXG4vL2V4cG9ydCBkZWZhdWx0IFBsYXllclxubW9kdWxlLmV4cG9ydHMgPSBQbGF5ZXI7IiwiY2xhc3MgU2hpcCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihsb2NhdGlvbikge1xuICAgICAgICB0aGlzLmxvY2F0aW9uID0gbG9jYXRpb247XG4gICAgICAgIHRoaXMuaGl0cyA9IDA7XG4gICAgfVxuXG4gICAgaXNIaXQocG9zaXRpb24pIHtcbiAgICAgICAgaWYodGhpcy5sb2NhdGlvbi5pbmNsdWRlcyhwb3NpdGlvbikpIHtcbiAgICAgICAgICAgIHRoaXMuaGl0cysrO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgXG4gICAgaXNTdW5rKCkge1xuICAgICAgICBpZih0aGlzLmhpdHMgPj0gdGhpcy5sb2NhdGlvbi5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNoaXAiLCJpbXBvcnQgU2hpcCBmcm9tICcuL1NoaXAnXG5cbmNsYXNzIEdhbWVQbGF5IHtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihwbGF5ZXJCb3JhZCwgQ29tcHV0ZXJCb2FyZCkge1xuICAgICAgICB0aGlzLnBsYXllckJvcmFkID0gcGxheWVyQm9yYWRcbiAgICAgICAgdGhpcy5Db21wdXRlckJvYXJkID0gQ29tcHV0ZXJCb2FyZDtcbiAgICB9XG5cbiAgICBwbGF5QmF0dGxlU2hpcCgpIHtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJpbiBnYW1lXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB3aGlsZSAoIWlzR2FtZU92ZXIoKSk7XG4gICAgICAgICAgXG4gICAgfVxuICAgIGlzR2FtZU92ZXIoKXtcbiAgICAgICAgaWYodGhpcy5Db21wdXRlckJvYXJkLmlzQWxsU2hpcFN1bmsoKSB8fCB0aGlzLnBsYXllckJvcmFkLmlzQWxsU2hpcFN1bmsoKSl7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGdlbmVyYXRlU2hpcHMob3duZXIpe1xuICAgICAgICBsZXQgc2hpcHMgPVtdO1xuICAgICAgICAvLyBnZW5lcmVhdGUgdHdvIHNoaXBzIHdpdGggbGVuZ3RoIDRcbiAgICAgICAgZm9yKGxldCBpID0wOyBpPjI7IGkrKyl7XG4gICAgICAgICAgICBsZXQgc2hpcCA9IHRoaXMuY3JlYXRlQVNoaXAoNCxvd25lcilcbiAgICAgICAgICAgIGlmKGNoZWNrU3VwZXJpbXBvc2l0aW9uKHNoaXBzLCBzaGlwKSl7XG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVBU2hpcCg0LG93bmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAgLy8gZ2VuZXJlYXRlIHRocmVlIHNoaXBzIHdpdGggbGVuZ3RoIDNcbiAgICAgICAgIGZvcihsZXQgaSA9MDsgaT4zOyBpKyspe1xuICAgICAgICAgICAgbGV0IHNoaXAgPSB0aGlzLmNyZWF0ZUFTaGlwKDMsb3duZXIpO1xuICAgICAgICAgICAgaWYoY2hlY2tTdXBlcmltcG9zaXRpb24oc2hpcHMsIHNoaXApKXtcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUFTaGlwKDMsb3duZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgICAgLy8gZ2VuZXJlYXRlIDIgc2hpcHMgd2l0aCBsZW5ndGggMlxuICAgICAgICAgIGZvcihsZXQgaSA9MDsgaT4yOyBpKyspe1xuICAgICAgICAgICAgbGV0IHNoaXAgPSB0aGlzLmNyZWF0ZUFTaGlwKDIsb3duZXIpXG4gICAgICAgICAgICBpZihjaGVja1N1cGVyaW1wb3NpdGlvbihzaGlwcywgc2hpcCkpe1xuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlQVNoaXAoMixvd25lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgICAvLyBnZW5lcmVhdGUgNCBzaGlwcyB3aXRoIGxlbmd0aCAxXG4gICAgICAgICAgZm9yKGxldCBpID0wOyBpPjQ7IGkrKyl7XG4gICAgICAgICAgICBsZXQgc2hpcCA9IHRoaXMuY3JlYXRlQVNoaXAoMSxvd25lcilcbiAgICAgICAgICAgIGlmKGNoZWNrU3VwZXJpbXBvc2l0aW9uKHNoaXBzLCBzaGlwKSl7XG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVBU2hpcCgxLG93bmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBjaGVja1N1cGVyaW1wb3NpdGlvbihzaGlwcywgc2hpcCl7XG4gICAgICAgIGxldCBpbXBvc2l0aW9uID0gMDtcbiAgICAgICAgc2hpcHMuZm9yRWFjaChmdW5jdGlvbihjdXJyZW50VmFsdWUpe1xuICAgICAgICAgICAgaW1wb3NpdGlvbiA9IGN1cnJlbnRWYWx1ZS5sb2NhdGlvbi5maWx0ZXIoZWxlbWVudCA9PiBzaGlwLmxvY2F0aW9uLmluY2x1ZGVzKGVsZW1lbnQpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChpbXBvc2l0aW9uID09IDApe1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjcmVhdGVBU2hpcChsZW5ndGhPZlNoaXAsIG93bmVyKXtcbiAgICAgICAgbGV0IGxvY2F0aW9uID0gW107XG4gICAgICAgIGxldCBmaXJzdERpZ2l0ID0gbnVsbDtcbiAgICAgICAgc2Vjb25kRGlnaXQgPSBudWxsO1xuICAgICAgICBmb3IobGV0IGk9MDsgaT5sZW5ndGhPZlNoaXA7IGkrKyl7XG4gICAgICAgICAgICBpZihpID0gMCl7XG4gICAgICAgICAgICAgICAgZmlyc3REaWdpdCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTsgICAgIFxuICAgICAgICAgICAgfSBlbHNlIGlmIChmaXJzdERpZ2l0ICsgbGVuZ3RoT2ZTaGlwIDw9IDkpe1xuICAgICAgICAgICAgICAgIHNlY29uZERpZ2l0ID0gZmlyc3REaWdpdCArIDE7IFxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgc2Vjb25kRGlnaXQgPSBmaXJzdERpZ2l0IC0gMTtcbiAgICAgICAgICAgIH0gXG4gICAgICAgICAgICBsZXQgc3BvdCAgPSBvd25lcitmaXJzdERpZ2l0K3NlY29uZERpZ2l0O1xuICAgICAgICAgICAgbG9jYXRpb24ucHVzaChzcG90KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFNoaXAobG9jYXRpb24pO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEdhbWVQbGF5IiwiaW1wb3J0IEdhbWVCb2FyZCBmcm9tICcuL0dhbWVCb2FyZCdcbmltcG9ydCBHYW1lUGxheSBmcm9tICcuL2dhbWVQbGF5J1xuaW1wb3J0IFNoaXAgZnJvbSAnLi9zaGlwJ1xuaW1wb3J0IHsgXG4gICAgICAgIG1hcmtIaXRMb2NhdGlvbiwgXG4gICAgICAgIGNsZWFyTWVzc2FnZSwgXG4gICAgICAgIGRpc3BsYXlCb2FyZCxcbiAgICAgICAgZ2VuZXJhdGVTcG90IH0gZnJvbSAnLi91bHRpbGl0eSdcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9QbGF5ZXInO1xuaW1wb3J0IHsgcGxheWVyU2hpcHMsIGNvbXB1dGVyU2hpcHMgfSBmcm9tICcuL3NoaXBzJ1xuXG5jb25zdCBwbGF5ZXJQYXJlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllcjEtYm9hcmRcIilcbmNvbnN0IGNvbXB1dGVyUGFyZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXIyLWJvYXJkXCIpXG5jb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRhaW5lclwiKVxuY29uc3QgcGxheWVyQm9hcmQgPSBuZXcgR2FtZUJvYXJkKHBsYXllclNoaXBzLCBcInBcIilcbmNvbnN0IGNvbXB1dGVyQm9hcmQgPSBuZXcgR2FtZUJvYXJkKGNvbXB1dGVyU2hpcHMsIFwiY1wiKVxuY29uc3QgcGxheWVyID0gbmV3IFBsYXllcihcInBsYXllclwiLCBwbGF5ZXJCb2FyZClcbmNvbnN0IGNvbXB1dGVyID0gbmV3IFBsYXllcihcImNvbXB1dGVyXCIsIGNvbXB1dGVyQm9hcmQpXG5cbmRpc3BsYXlCb2FyZChwbGF5ZXJCb2FyZCwgcGxheWVyUGFyZW50KVxuXG5kaXNwbGF5Qm9hcmQoY29tcHV0ZXJCb2FyZCwgY29tcHV0ZXJQYXJlbnQpXG5cbmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICBjb25zb2xlLmxvZyhlLnRhcmdldC5pZClcbiAgICBtYXJrSGl0TG9jYXRpb24oZS50YXJnZXQuaWQsIGNvbXB1dGVyQm9hcmQpXG4gICAgbWFya0hpdExvY2F0aW9uKGdlbmVyYXRlU3BvdChwbGF5ZXJCb2FyZCksIHBsYXllckJvYXJkKVxufSlcbmxldCByZXNldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVzZXRcIik7XG5yZXNldC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgY29uc3QgZ2FtZXBQbGF5ID0gbmV3IEdhbWVQbGF5KHBsYXllckJvYXJkLCBjb21wdXRlckJvYXJkKTtcbiAgICBnYW1lcFBsYXkuZ2VuZXJhdGVTaGlwcyhcImNcIik7XG4gICAgZ2FtZXBQbGF5LmdlbmVyYXRlU2hpcHMoXCJwXCIpO1xufSk7XG5cblxuY2xlYXJNZXNzYWdlKClcbmNvbnN0IGNyZWF0ZUFTaGlwID0gKChsZW5ndGhPZlNoaXAsIG93bmVyLCBvcmllbnRhdGlvbikgPT4ge1xuICAgIGxldCBsb2NhdGlvbiA9IFtdO1xuICAgIGxldCBmaXJzdERpZ2l0ID0gbnVsbDtcbiAgICBsZXQgc2Vjb25kRGlnaXQgPSBudWxsO1xuICAgIGxldCBzcG90ID0gXCJcIlxuICAgIGxldCBpID0gMFxuICAgIHdoaWxlKGxvY2F0aW9uLmxlbmd0aCA8IGxlbmd0aE9mU2hpcCkge1xuICAgICAgICBpZihvcmllbnRhdGlvbiA9PSBcImhvcml6b250YWxcIikge1xuICAgICAgICAgICAgaWYobG9jYXRpb24ubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgICBmaXJzdERpZ2l0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICAgICAgICAgIHNlY29uZERpZ2l0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWNvbmREaWdpdCArPSAxXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZihsb2NhdGlvbi5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgIGZpcnN0RGlnaXQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgICAgICAgICAgc2Vjb25kRGlnaXQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZpcnN0RGlnaXQgKz0gMVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgXG4gICAgICAgIHNwb3QgPSBvd25lcitmaXJzdERpZ2l0K3NlY29uZERpZ2l0XG4gICAgICAgIGxvY2F0aW9uLnB1c2goc3BvdClcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBTaGlwKGxvY2F0aW9uKTtcbn0pKDQsIFwicFwiLCBcInZlcnRpY2FsXCIpXG4iLCJpbXBvcnQgU2hpcCBmcm9tICcuL1NoaXAnXG5cbmNvbnN0IHNoaXAxID0gbmV3IFNoaXAoW1wicDAwXCIsIFwicDAxXCIsIFwicDAyXCJdKVxuY29uc3Qgc2hpcDIgPSBuZXcgU2hpcChbXCJwNjdcIiwgXCJwNzdcIiwgXCJwODdcIl0pXG5jb25zdCBzaGlwMyA9IG5ldyBTaGlwKFtcInA1MVwiLCBcInA2MVwiXSlcbmNvbnN0IHNoaXA0ID0gbmV3IFNoaXAoW1wicDM3XCIsIFwicDM4XCJdKVxuY29uc3Qgc2hpcDUgPSBuZXcgU2hpcChbXCJwMjRcIiwgXCJwMzRcIiwgXCJwNDRcIiwgXCJwNTRcIl0pXG5jb25zdCBzaGlwNiA9IG5ldyBTaGlwKFtcInAxN1wiXSlcbmNvbnN0IHNoaXA3ID0gbmV3IFNoaXAoW1wicDkyXCJdKVxuY29uc3Qgc2hpcDggPSBuZXcgU2hpcChbXCJwNzNcIiwgXCJwNzRcIiwgXCJwNzVcIl0pXG5cbmNvbnN0IGNzaGlwMSA9IG5ldyBTaGlwKFtcImMwMFwiLCBcImMwMVwiLCBcImMwMlwiXSlcbmNvbnN0IGNzaGlwMiA9IG5ldyBTaGlwKFtcImM2N1wiLCBcImM3N1wiLCBcImM4N1wiXSlcbmNvbnN0IGNzaGlwMyA9IG5ldyBTaGlwKFtcImM1MVwiLCBcImM2MVwiXSlcbmNvbnN0IGNzaGlwNCA9IG5ldyBTaGlwKFtcImMzN1wiLCBcImMzOFwiXSlcbmNvbnN0IGNzaGlwNSA9IG5ldyBTaGlwKFtcImMyNFwiLCBcImMzNFwiLCBcImM0NFwiLCBcImM1NFwiXSlcbmNvbnN0IGNzaGlwNiA9IG5ldyBTaGlwKFtcImMxN1wiXSlcbmNvbnN0IGNzaGlwNyA9IG5ldyBTaGlwKFtcImM5MlwiXSlcbmNvbnN0IGNzaGlwOCA9IG5ldyBTaGlwKFtcImM3M1wiLCBcImM3NFwiLCBcImM3NVwiXSlcblxuY29uc3QgcGxheWVyU2hpcHMgPSBbc2hpcDEsIHNoaXAyLCBzaGlwMywgc2hpcDQsIHNoaXA1LCBzaGlwNiwgc2hpcDcsIHNoaXA4XVxuY29uc3QgY29tcHV0ZXJTaGlwcyA9IFtjc2hpcDEsIGNzaGlwMiwgY3NoaXAzLCBjc2hpcDQsIGNzaGlwNSwgY3NoaXA2LCBjc2hpcDcsIGNzaGlwOF1cblxuZXhwb3J0IHsgcGxheWVyU2hpcHMsIGNvbXB1dGVyU2hpcHMgfSIsIlxuY29uc3QgbWFya0hpdExvY2F0aW9uID0gKGhpdFNwb3QsIGJvYXJkKSA9PiB7XG4gICAgYm9hcmQucmVjZWl2ZVN0cmlrZShoaXRTcG90KVxufVxuXG5jb25zdCBjbGVhck1lc3NhZ2UgPSAoKSA9PiB7XG4gICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBjb25zdCBtZXNzYWdlQXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWVzc2FnZVwiKVxuICAgICAgICBtZXNzYWdlQXJlYS5pbm5lckhUTUwgPSBcIlwiXG4gICAgfSwgMTAwMDApXG59XG5cbmNvbnN0IGRpc3BsYXlCb2FyZCA9IChib2FyZCwgcGFyZW50KSA9PiB7XG4gICAgYm9hcmQucmVuZGVyQm9hcmQocGFyZW50KVxufVxuXG5jb25zdCBnZW5lcmF0ZVNwb3QgPSAoYm9hcmQpID0+IHtcbiAgICBsZXQgc3BvdCA9IFwiXCJcbiAgICBkbyB7XG4gICAgICAgIGxldCBmaXJzdERpZ2l0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjEwKVxuICAgICAgICBsZXQgc2Vjb25kRGlnaXQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMTApXG4gICAgICAgIHNwb3QgPSBcInBcIitmaXJzdERpZ2l0K3NlY29uZERpZ2l0O1xuICAgIH0gd2hpbGUoYm9hcmQuaXNQb3NpdGlvblRha2VuKHNwb3QpKVxuICAgIHJldHVybiBzcG90XG59XG5cbmNvbnN0IGNyZWF0ZUFTaGlwID0gKGxlbmd0aE9mU2hpcCwgb3duZXIsIG9yaWVudGF0aW9uKSA9PiB7XG4gICAgbGV0IGxvY2F0aW9uID0gW107XG4gICAgbGV0IGZpcnN0RGlnaXQgPSBudWxsO1xuICAgIGxldCBzZWNvbmREaWdpdCA9IG51bGw7XG4gICAgbGV0IHNwb3QgPSBcIlwiXG4gICAgbGV0IGkgPSAwXG4gICAgd2hpbGUobG9jYXRpb24ubGVuZ3RoIDwgbGVuZ3RoT2ZTaGlwKSB7XG4gICAgICAgIGlmKG9yaWVudGF0aW9uID09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgICAgICAgICBpZihsb2NhdGlvbi5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgIGZpcnN0RGlnaXQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgICAgICAgICAgc2Vjb25kRGlnaXQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlY29uZERpZ2l0ICs9IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmKGxvY2F0aW9uLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgZmlyc3REaWdpdCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICAgICAgICBzZWNvbmREaWdpdCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZmlyc3REaWdpdCArPSAxXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICBcbiAgICAgICAgc3BvdCA9IG93bmVyK2ZpcnN0RGlnaXQrc2Vjb25kRGlnaXRcbiAgICAgICAgbG9jYXRpb24ucHVzaChzcG90KVxuICAgIH1cbiAgICByZXR1cm4gbmV3IFNoaXAobG9jYXRpb24pO1xufVxuXG5leHBvcnQgeyBkaXNwbGF5Qm9hcmQsIG1hcmtIaXRMb2NhdGlvbiwgY2xlYXJNZXNzYWdlLCBnZW5lcmF0ZVNwb3QgfSJdLCJzb3VyY2VSb290IjoiIn0=
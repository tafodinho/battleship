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
        this.visitedGrids = []
    }
    
    setShipsPosition() {

    }

    isShipsSunk() {

    }

    receiveStrike() {
        
    }

    fire() {

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

    hit() {

    }
    isSunk() {

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
    Object(_ultility__WEBPACK_IMPORTED_MODULE_2__["markHitLocation"])(e.target.id)
})

/***/ }),

/***/ "./src/ultility.js":
/*!*************************!*\
  !*** ./src/ultility.js ***!
  \*************************/
/*! exports provided: renderBoard, markHitLocation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderBoard", function() { return renderBoard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "markHitLocation", function() { return markHitLocation; });

const renderBoard = (board, parent) => {
    for(let i = 0; i <= board.numRows; i++) {
        const row = document.createElement("tr")
       
        row.setAttribute("id", `row-${i}`)
        row.setAttribute("class", "row")
        for(let j = 0; j <= board.numColumns; j++) {
            const box = document.createElement('td')
            // if (i==-1){
            //     if (j!=-1){
            //         box.innerHTML = j
            //     }
                
            // }
            // if (j==-1){
            //     if (i!=-1){
            //         box.innerHTML = i
            //     }
            // }
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

const markHitLocation = (hitSpot) => {
    const location = document.getElementById(hitSpot)
    location.innerHTML = "X"
}




/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dhbWVCb2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUGxheWVyLmpzIiwid2VicGFjazovLy8uL3NyYy9TaGlwLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdWx0aWxpdHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDZSx3RTs7Ozs7Ozs7Ozs7O0FDNUJmO0FBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZSxxRTs7Ozs7Ozs7Ozs7O0FDUmY7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFZSxtRTs7Ozs7Ozs7Ozs7O0FDaEJmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBbUM7QUFDVjtBQUMrQjtBQUMxQjs7QUFFOUI7QUFDQTtBQUNBLHdCQUF3Qiw2Q0FBSTtBQUM1Qix3QkFBd0IsNkNBQUk7QUFDNUIsbUJBQW1CLDZDQUFJO0FBQ3ZCLG1CQUFtQiw2Q0FBSTtBQUN2Qix3QkFBd0Isa0RBQVM7QUFDakMsMEJBQTBCLGtEQUFTO0FBQ25DLG1CQUFtQiwrQ0FBTTtBQUN6QixxQkFBcUIsK0NBQU07O0FBRTNCLDZEQUFXOztBQUVYLDZEQUFXOztBQUVYO0FBQ0E7QUFDQSxJQUFJLGlFQUFlO0FBQ25CLENBQUMsQzs7Ozs7Ozs7Ozs7Ozs7OztBQ3RCRDtBQUNBLGtCQUFrQixvQkFBb0I7QUFDdEM7O0FBRUEsc0NBQXNDLEVBQUU7QUFDeEM7QUFDQSxzQkFBc0IsdUJBQXVCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLFlBQVksRUFBRSxFQUFFLEVBQUUsRUFBRTtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0Esa0JBQWtCLDBCQUEwQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJjbGFzcyBHYW1lQm9hcmQge1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKHNoaXBzLCBvd25lcikge1xuICAgICAgICB0aGlzLmdyaWQgPSBuZXcgQXJyYXkoMTAwKVxuICAgICAgICB0aGlzLm51bVJvd3MgPSAxMFxuICAgICAgICB0aGlzLm51bUNvbHVtbnMgPSAxMFxuICAgICAgICB0aGlzLnNoaXBzID0gc2hpcHNcbiAgICAgICAgdGhpcy5vd25lciA9IG93bmVyXG4gICAgICAgIHRoaXMudmlzaXRlZEdyaWRzID0gW11cbiAgICB9XG4gICAgXG4gICAgc2V0U2hpcHNQb3NpdGlvbigpIHtcblxuICAgIH1cblxuICAgIGlzU2hpcHNTdW5rKCkge1xuXG4gICAgfVxuXG4gICAgcmVjZWl2ZVN0cmlrZSgpIHtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgZmlyZSgpIHtcblxuICAgIH1cbiAgICBcbn1cbmV4cG9ydCBkZWZhdWx0IEdhbWVCb2FyZCIsImNsYXNzIFBsYXllciB7XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBib2FyZCkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lXG4gICAgICAgIHRoaXMuYm9hcmQgPSBib2FyZFxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyIiwiY2xhc3MgU2hpcCB7XG5cbiAgICBjb25zdHJ1Y3RvcihsZW5ndGgsIGxvY2F0aW9uKSB7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoXG4gICAgICAgIHRoaXMubG9jYXRpb24gPSBsb2NhdGlvblxuICAgICAgICB0aGlzLmhpdHMgPSAwXG4gICAgfVxuXG4gICAgaGl0KCkge1xuXG4gICAgfVxuICAgIGlzU3VuaygpIHtcblxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2hpcCIsImltcG9ydCBHYW1lQm9hcmQgZnJvbSAnLi9HYW1lQm9hcmQnXG5pbXBvcnQgU2hpcCBmcm9tICcuL1NoaXAnXG5pbXBvcnQgeyByZW5kZXJCb2FyZCwgbWFya0hpdExvY2F0aW9ufSBmcm9tICcuL3VsdGlsaXR5J1xuaW1wb3J0IFBsYXllciBmcm9tICcuL1BsYXllcic7XG5cbmNvbnN0IHBsYXllclBhcmVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyMS1ib2FyZFwiKVxuY29uc3QgY29tcHV0ZXJQYXJlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllcjItYm9hcmRcIilcbmNvbnN0IHBsYXllclNoaXAxID0gbmV3IFNoaXAoMywgW1wicDAwXCIsIFwicDAxXCIsIFwicDAyXCJdKVxuY29uc3QgcGxheWVyU2hpcDIgPSBuZXcgU2hpcCgzLCBbXCJwMzBcIiwgXCJwNDBcIiwgXCJwNTBcIl0pXG5jb25zdCBjU2hpcDEgPSBuZXcgU2hpcCgzLCBbXCJjMDBcIiwgXCJjMDFcIiwgXCJjMDJcIl0pXG5jb25zdCBjU2hpcDIgPSBuZXcgU2hpcCgzLCBbXCJjMzRcIiwgXCJjNDRcIiwgXCJjNTRcIl0pXG5jb25zdCBwbGF5ZXJCb2FyZCA9IG5ldyBHYW1lQm9hcmQoW3BsYXllclNoaXAxLCBwbGF5ZXJTaGlwMl0sIFwicFwiKVxuY29uc3QgY29tcHV0ZXJCb2FyZCA9IG5ldyBHYW1lQm9hcmQoW2NTaGlwMSwgY1NoaXAyXSwgXCJjXCIpXG5jb25zdCBwbGF5ZXIgPSBuZXcgUGxheWVyKFwicGxheWVyXCIsIHBsYXllckJvYXJkKVxuY29uc3QgY29tcHV0ZXIgPSBuZXcgUGxheWVyKFwiY29tcHV0ZXJcIiwgY29tcHV0ZXJCb2FyZClcblxucmVuZGVyQm9hcmQocGxheWVyQm9hcmQsIHBsYXllclBhcmVudClcblxucmVuZGVyQm9hcmQoY29tcHV0ZXJCb2FyZCwgY29tcHV0ZXJQYXJlbnQpXG5cbmNvbXB1dGVyUGFyZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgIGNvbnNvbGUubG9nKGUudGFyZ2V0LmlkKVxuICAgIG1hcmtIaXRMb2NhdGlvbihlLnRhcmdldC5pZClcbn0pIiwiXG5jb25zdCByZW5kZXJCb2FyZCA9IChib2FyZCwgcGFyZW50KSA9PiB7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8PSBib2FyZC5udW1Sb3dzOyBpKyspIHtcbiAgICAgICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpXG4gICAgICAgXG4gICAgICAgIHJvdy5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgcm93LSR7aX1gKVxuICAgICAgICByb3cuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJyb3dcIilcbiAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8PSBib2FyZC5udW1Db2x1bW5zOyBqKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJylcbiAgICAgICAgICAgIC8vIGlmIChpPT0tMSl7XG4gICAgICAgICAgICAvLyAgICAgaWYgKGohPS0xKXtcbiAgICAgICAgICAgIC8vICAgICAgICAgYm94LmlubmVySFRNTCA9IGpcbiAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAvLyBpZiAoaj09LTEpe1xuICAgICAgICAgICAgLy8gICAgIGlmIChpIT0tMSl7XG4gICAgICAgICAgICAvLyAgICAgICAgIGJveC5pbm5lckhUTUwgPSBpXG4gICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgYm94LnNldEF0dHJpYnV0ZShcImlkXCIsIGAke2JvYXJkLm93bmVyfSR7aX0ke2p9YClcbiAgICAgICAgICAgIGJveC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImJveFwiKVxuICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKGJveClcbiAgICAgICAgfVxuICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQocm93KVxuICAgIH1cbiAgICBcbiAgICBib2FyZC5zaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgICBwbGFjZVNoaXAoc2hpcClcbiAgICB9KTtcbiAgICBcbn1cblxuY29uc3QgcGxhY2VTaGlwID0gKHNoaXApID0+IHtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2hpcC5sb2NhdGlvbi5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBib3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzaGlwLmxvY2F0aW9uW2ldKVxuICAgICAgICBib3guc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJib3gtc2hpcFwiKVxuICAgIH1cbn1cblxuY29uc3QgbWFya0hpdExvY2F0aW9uID0gKGhpdFNwb3QpID0+IHtcbiAgICBjb25zdCBsb2NhdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGhpdFNwb3QpXG4gICAgbG9jYXRpb24uaW5uZXJIVE1MID0gXCJYXCJcbn1cblxuXG5leHBvcnQgeyByZW5kZXJCb2FyZCwgbWFya0hpdExvY2F0aW9uIH0iXSwic291cmNlUm9vdCI6IiJ9
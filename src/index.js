import GameBoard from './GameBoard'
import GamePlay from './gamePlay'
import Ship from './Ship'
import { 
        markHitLocation, 
        clearMessage, 
        displayBoard,
        generateSpot,generateShips } from './ultility'
import Player from './Player';

const computerShips = generateShips("c")
const playerShips = generateShips("p")
const playerParent = document.getElementById("player1-board")
const computerParent = document.getElementById("player2-board")
const container = document.getElementById("container")
const playerBoard = new GameBoard(playerShips, "p")
const computerBoard = new GameBoard(computerShips, "c")


displayBoard(playerBoard, playerParent)

displayBoard(computerBoard, computerParent)

container.addEventListener("click", (e) => {
    markHitLocation(e.target.id, computerBoard)
    markHitLocation(generateSpot(playerBoard), playerBoard)
})
let reset = document.querySelector(".reset");
reset.addEventListener('click', function(event) {
    generateShips("c");
    generateShips("p");

displayBoard(playerBoard, playerParent)

displayBoard(computerBoard, computerParent)
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

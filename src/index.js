import GameBoard from './GameBoard'
import { 
        markHitLocation, 
        clearMessage, 
        displayBoard,
        generateSpot,generateShips } from './ultility'

const reset = document.getElementById("reset");
const start = document.getElementById("start")


const computerShips = generateShips("c")
const playerShips = generateShips("p")
const playerParent = document.getElementById("player1-board")
const computerParent = document.getElementById("player2-board")
const container = document.getElementById("container")
console.log(playerShips)
const playerBoard = new GameBoard(playerShips, "p")
const computerBoard = new GameBoard(computerShips, "c")

displayBoard(playerBoard, playerParent)
displayBoard(computerBoard, computerParent)


container.addEventListener("click", (e) => {
    if(markHitLocation(e.target.id, computerBoard)) {
        markHitLocation(generateSpot(playerBoard), playerBoard)
    }
})

reset.addEventListener('click', function(event) {
    generateShips("c");
    generateShips("p");

displayBoard(playerBoard, playerParent)

displayBoard(computerBoard, computerParent)
});

clearMessage()

import GameBoard from './GameBoard'
import { 
        markHitLocation, 
        clearMessage, 
        displayBoard,
        generateSpot } from './ultility'
import Player from './Player';

const playerParent = document.getElementById("player1-board")
const computerParent = document.getElementById("player2-board")
const container = document.getElementById("container")
const playerBoard = new GameBoard("p")
const computerBoard = new GameBoard("c")
const player = new Player("player", playerBoard)
const computer = new Player("computer", computerBoard)

displayBoard(playerBoard, playerParent)

displayBoard(computerBoard, computerParent)

container.addEventListener("click", (e) => {
    console.log(e.target.id)
    markHitLocation(e.target.id, computerBoard)
    markHitLocation(generateSpot(playerBoard), playerBoard)
})

clearMessage()


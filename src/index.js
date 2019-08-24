import GameBoard from './GameBoard'
import GamePlay from './gamePlay'
import { 
        markHitLocation, 
        clearMessage, 
        displayBoard,
        generateSpot } from './ultility'
import Player from './Player';
import { playerShips, computerShips } from './ships'

const playerParent = document.getElementById("player1-board")
const computerParent = document.getElementById("player2-board")
const container = document.getElementById("container")
const playerBoard = new GameBoard(playerShips, "p")
const computerBoard = new GameBoard(computerShips, "c")
const player = new Player("player", playerBoard)
const computer = new Player("computer", computerBoard)

displayBoard(playerBoard, playerParent)

displayBoard(computerBoard, computerParent)

container.addEventListener("click", (e) => {
    console.log(e.target.id)
    markHitLocation(e.target.id, computerBoard)
    markHitLocation(generateSpot(playerBoard), playerBoard)
})
let reset = document.querySelector(".reset");
reset.addEventListener('click', function(event) {
    const gamepPlay = new GamePlay(playerBoard, computerBoard);
    gamepPlay.generateShips("c");
    gamepPlay.generateShips("p");
});


clearMessage()

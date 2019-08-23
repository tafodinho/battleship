import GameBoard from './GameBoard'
import Ship from './Ship'
import { markHitLocation, clearMessage, displayBoard} from './ultility'
import Player from './Player';
import { playerShips, computerShips } from './ships'

const playerParent = document.getElementById("player1-board")
const computerParent = document.getElementById("player2-board")
const playerBoard = new GameBoard(playerShips, "p")
const computerBoard = new GameBoard(computerShips, "c")
const player = new Player("player", playerBoard)
const computer = new Player("computer", computerBoard)

displayBoard(playerBoard, playerParent)

displayBoard(computerBoard, computerParent)

computerParent.addEventListener("click", (e) => {
    console.log(e.target.id)
    markHitLocation(e.target.id, computerBoard)
})

clearMessage()

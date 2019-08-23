import GameBoard from './GameBoard'
import Ship from './Ship'
import { renderBoard, markHitLocation, clearMessage, displayBoard} from './ultility'
import Player from './Player';
import { ships } from './ships'

const playerParent = document.getElementById("player1-board")
const computerParent = document.getElementById("player2-board")
const playerShip1 = new Ship( ["p00", "p01", "p02"])
const playerShip2 = new Ship( ["p30", "p40", "p50"])
const cShip1 = new Ship(["c00", "c01", "c02"])
const cShip2 = new Ship(["c34", "c44", "c54"])
const playerBoard = new GameBoard(ships, "p")
const computerBoard = new GameBoard([cShip1, cShip2], "c")
const player = new Player("player", playerBoard)
const computer = new Player("computer", computerBoard)

displayBoard(playerBoard, playerParent)

displayBoard(computerBoard, computerParent)

computerParent.addEventListener("click", (e) => {
    console.log(e.target.id)
    markHitLocation(e.target.id, computerBoard)
})

clearMessage()

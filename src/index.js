import GameBoard from './GameBoard'
import Ship from './Ship'
import { renderBoard, markHitLocation, clearMessage} from './ultility'
import Player from './Player';

const playerParent = document.getElementById("player1-board")
const computerParent = document.getElementById("player2-board")
const playerShip1 = new Ship(3, ["p00", "p01", "p02"])
const playerShip2 = new Ship(3, ["p30", "p40", "p50"])
const cShip1 = new Ship(3, ["c00", "c01", "c02"])
const cShip2 = new Ship(3, ["c34", "c44", "c54"])
const playerBoard = new GameBoard([playerShip1, playerShip2], "p")
const computerBoard = new GameBoard([cShip1, cShip2], "c")
const player = new Player("player", playerBoard)
const computer = new Player("computer", computerBoard)

renderBoard(playerBoard, playerParent)

renderBoard(computerBoard, computerParent)

computerParent.addEventListener("click", (e) => {
    console.log(e.target.id)
    markHitLocation(e.target.id, computerBoard)
})

clearMessage()

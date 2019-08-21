import GameBoard from './GameBoard'
import Ship from './Ship'
import { renderBoard, placeShip} from './ultility'
import Player from './Player';

const playerParent = document.getElementById("player1-board")
const computerParent = document.getElementById("player2-board")
const ship1 = new Ship(3, ["00", "01", "02"])
const ship2 = new Ship(3, ["30", "40", "50"])
const playerBoard = new GameBoard(ship1, ship2)
const computerBoard = new GameBoard(ship1, ship2)
const player = new Player("player", playerBoard)
const computer = new Player("computer", computerBoard)

renderBoard(playerBoard, playerParent)

renderBoard(computerBoard, computerParent)

import GameBoard from './GameBoard'
import Ship from './Ship'
import { renderBoard, placeShip} from './ultility'

const parent = document.getElementById("player-board")
const ship = new Ship(3, ["00", "01", "02"])
const board = new GameBoard(ship)

renderBoard(board, parent)

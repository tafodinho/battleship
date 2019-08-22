class GameBoard {
    
    constructor(ships, owner) {
        this.grid = new Array(100)
        this.numRows = 10
        this.numColumns = 10
        this.ships = ships
        this.owner = owner
        this.visitedCells = []
    }
    
    setShipsPosition() {

    }

    isShipsSunk() {

    }

    receiveStrike(position) {
        if(!this.isPositionTaken(position)) {
            this.visitedCells.push(position)
            return true
        } else {
            return false
        }
    }

    isPositionTaken(position) {
        if(this.visitedCells.includes(position)) {
            return true
        } else {
            return false
        }
    }

    fire() {

    }
    
}
export default GameBoard
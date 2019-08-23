import Ship from './Ship'

class GameBoard {
    
    constructor(ships, owner) {
        this.grid = new Array(100)
        this.numRows = 10
        this.numColumns = 10
        this.ships = ships
        this.owner = owner
        this.visitedGrids = []
    }
    
    setShipsPosition(ship, location) {
        ship.location = location;
        this.ships.push(ship);

    }

    isShipsSunk(ship) {
        return ship.isSunk();
    }

    receiveStrike() {
        
    }

    fire() {

    }
    
}
export default GameBoard
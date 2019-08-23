import Ship from './Ship'

class GameBoard {
    
    constructor(ships, owner) {
        this.grid = new Array(100)
        this.numRows = 10
        this.numColumns = 10
        this.ships = ships
        this.owner = owner
        this.visitedCells = []
        this.damagedShips = 0
    }
    
    setShipsPosition(ship, location) {
        ship.location = location;
        this.ships.push(ship);
    }
    
    isAllShipSunk() {
        let count = 0
        this.ships.forEach(ship => {
            if(ship.isSunk()) {
                count++
            }
        });
        if(count >= this.ships.length) {
            return true
        } else {
            return false
        }
    }

    receiveStrike(position) {
        if(!this.isPositionTaken(position)) {
            this.visitedCells.push(position)
            return true
        } 
        return false
    }

    isPositionTaken(position) {
        if(this.visitedCells.includes(position)) {
            return true
        }
        return false
        
    }
    
}
export default GameBoard
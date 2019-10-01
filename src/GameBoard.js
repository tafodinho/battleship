import Ship from './Ship'

class GameBoard {
    
    constructor(ships, owner) {
        this.grid = new Array(100)
        this.numRows = 10
        this.numColumns = 10
        this.owner = owner
        this.visitedCells = []
        this.damagedShips = 0
        this.locationsTaken = []
        this.ships = ships
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
        }
        return false
    }

    receiveStrike(spot) {
        let hit = false
        if(!this.isAllShipSunk()) {
            if(!this.isPositionTaken(spot)) {
                this.visitedCells.push(spot)
                this.ships.forEach(ship => {
                    if(ship.isHit(spot)) {
                        hit = true
                        const hitSpot = document.getElementById(spot)
                        hitSpot.setAttribute("class", "hit-spot")
                        if(ship.isSunk()) {
                            this.displayMessage(`One ${this.owner} ship destroyed`)
                            if(this.isAllShipSunk()) {
                                this.displayMessage(`Game over all ships destroyed ${this.owner} wins`)
                                console.log(2)
                            }
                            console.log("bread")
                        }
                    }  
                })
                if(!hit) {
                    const location = document.getElementById(spot)
                    location.innerHTML = "X"
                }
                return true
            } else {
                this.displayMessage("choose another spot")
                return false
            }
        } else {
            this.displayMessage(`Game over all ships destroyed ${this.owner} wins`)
            console.log(1)
            return false
        }
    }
    isPositionTaken(position) {
        if(this.visitedCells.includes(position)) {
            return true
        }
        return false
        
    }
    isPlacementSpotTaken(spot) {
        if(this.locationsTaken.includes(spot)) {
            return true
        }
        return false
    }

    renderBoard(parent){
        for(let i = 0; i < this.numRows; i++) {
            const row = document.createElement("tr")
            row.setAttribute("id", `row-${i}`)
            row.setAttribute("class", "row")
            for(let j = 0; j < this.numColumns; j++) {
                const box = document.createElement('td')
                box.setAttribute("id", `${this.owner}${i}${j}`)
                box.setAttribute("class", "box")
                row.appendChild(box)
            }
            parent.appendChild(row)
        }
        
        if(this.owner === "p") {
            this.ships.forEach(ship => {
                this.placeShip(ship)
            });
        } 
    }

    placeShip(ship) {
        for(let i = 0; i < ship.location.length; i++) {
            const box = document.getElementById(ship.location[i])
            box.setAttribute("class", "box-ship")
        }
    }
    
    displayMessage(message) {
        const messageArea = document.getElementById("message")
        messageArea.innerHTML = message
    }
}
export default GameBoard
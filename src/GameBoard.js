import Ship from './Ship'

class GameBoard {
    
    constructor(owner) {
        this.grid = new Array(100)
        this.numRows = 10
        this.numColumns = 10
        this.owner = owner
        this.visitedCells = []
        this.damagedShips = 0
        this.locationsTaken = []
        this.ships = this.generateShips()
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

    receiveStrike(spot) {
        if(!this.isAllShipSunk()) {
            if(!this.isPositionTaken(spot)) {
                this.visitedCells.push(spot)
                this.ships.forEach(ship => {
                    if(ship.isHit(spot)) {
                        const hitSpot = document.getElementById(spot)
                        hitSpot.setAttribute("class", "hit-spot")
                        if(ship.isSunk()) {
                            this.displayMessage("One Enemy ship Destroyed")
                            if(this.isAllShipSunk()) {
                                this.displayMessage("Game over all ships destroyed")
                            }
                        }
                        //throw BreakException
                    }
                })
                const location = document.getElementById(spot)
                location.innerHTML = "X"
            } else {
                this.displayMessage("choose another spot")
            }
        } else {
            this.displayMessage("Game over all ships destroyed")
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

    renderBoard (parent){
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
            console.log(ship)
            const box = document.getElementById(ship.location[i])
            box.setAttribute("class", "box-ship")
        }
    }
    
    displayMessage(message) {
        const messageArea = document.getElementById("message")
        messageArea.innerHTML = message
    }

    generateShip(lengthOfShip, orientation) {
        let location = [];
        let firstDigit = null;
        let secondDigit = null;
        let spot = ""
        while(location.length < lengthOfShip) {
            do {
                if(orientation == "horizontal") {
                    if(location.length == 0) {
                        firstDigit = Math.floor(Math.random() * 10);
                        secondDigit = Math.floor(Math.random() * 10);
                    } else if((secondDigit+lengthOfShip) <= 9){
                        secondDigit += 1
                    } else {
                        secondDigit -= 1
                    }
                } else {
                    if(location.length == 0) {
                        firstDigit = Math.floor(Math.random() * 10);
                        secondDigit = Math.floor(Math.random() * 10);
                    } else if((firstDigit+lengthOfShip) <= 9) {
                        firstDigit += 1
                    }else {
                        firstDigit -= 1
                    }
                }
                spot = this.owner+firstDigit+secondDigit
            }while(this.isPlacementSpotTaken(spot))
            location.push(spot)
            this.locationsTaken.push(spot)
        }
        return new Ship(location);
    }

    generateShips () {
        let ships = []
        let i = 0
        while(i < 3) {
            ships.push(this.generateShip(3, "horizontal"))
            i++
        }
        i = 0
        while(i < 3) {
            ships.push(this.generateShip(3, "vertical"))
            i++
        }
        i = 0
        while(i < 3) {
            ships.push(this.generateShip(4, "horizontal"))
            i++
        }
        i = 0
        while(i < 3) {
            ships.push(this.generateShip(4, "vertical"))
            i++
        }
        i = 0
        while(i < 2) {
            ships.push(this.generateShip(2, "horizontal"))
            i++
        }
        i = 0
        while(i < 2) {
            ships.push(this.generateShip(1, "horizontal"))
            i++
        }
        return ships
    }
}
export default GameBoard


const placeShip = (ship) => {
    for(let i = 0; i < ship.location.length; i++) {
        const box = document.getElementById(ship.location[i])
        box.setAttribute("class", "box-ship")
    }
}

const markHitLocation = (hitSpot, board) => {
    if(board.isAllShipSunk()) {
        displayMessage("Game over all ships destroyed")
        return
    } else {
        if(board.receiveStrike(hitSpot)) {
            board.ships.forEach(ship => {
                if(ship.isHit(hitSpot)) {
                    const spot = document.getElementById(hitSpot)
                    spot.setAttribute("class", "hit-spot")
                    if(ship.isSunk()) {
                        displayMessage("One Enemy ship Destroyed")
                    }
                    throw BreakException
                }
            })
            const location = document.getElementById(hitSpot)
            location.innerHTML = "X"
        } else {
            displayMessage("play again")
        }
    }
    
}

const displayMessage = (message) => {
    const messageArea = document.getElementById("message")
    messageArea.innerHTML = message
}

const clearMessage = () => {
    setInterval(() => {
        const messageArea = document.getElementById("message")
        messageArea.innerHTML = ""
    }, 10000)
}



export { renderBoard, markHitLocation, clearMessage }
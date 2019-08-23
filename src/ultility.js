
const markHitLocation = (hitSpot, board) => {
    
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
    if(board.isAllShipSunk()) {
        displayMessage("Game over all ships destroyed")
        return
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

const displayBoard = (board, parent) => {
    board.renderBoard(parent)
}

export { displayBoard, markHitLocation, clearMessage }
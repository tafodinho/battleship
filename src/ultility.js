import Ship from './Ship'

const markHitLocation = (hitSpot, board) => {
    board.receiveStrike(hitSpot)
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

const generateSpot = (board) => {
    let spot = ""
    do {
        let firstDigit = Math.floor(Math.random()*10)
        let secondDigit = Math.floor(Math.random()*10)
        spot = "p"+firstDigit+secondDigit;
    } while(board.isPositionTaken(spot))
    return spot
}

const createAShip = (lengthOfShip, owner, orientation, ships) => {
    console.log(lengthOfShip);
    let location = [];
    let firstDigit = null;
    let secondDigit = null;
    let spot = ""
    let i = 0
    while(location.length < lengthOfShip) {
        if(orientation == "horizontal") {
            if(location.length == 0) {
                firstDigit = Math.floor(Math.random() * 10);
                secondDigit = Math.floor(Math.random() * 10);
            } else if(secondDigit + lengthOfShip > 8){
                secondDigit -= 1
            }else{
                secondDigit +=1
            }
        } else {
            if(location.length == 0) {
                firstDigit = Math.floor(Math.random() * 10);
                secondDigit = Math.floor(Math.random() * 10);
            } else if(firstDigit + lengthOfShip > 8){
                firstDigit -= 1
            }else{
                firstDigit +=1
            }
        }
       
        spot = owner+firstDigit+secondDigit
        location.push(spot)
    } 
    return checkSuperImposition(ships, new Ship(location),lengthOfShip, owner, orientation);
}
const checkSuperImposition = (ships, ship,lengthOfShip, owner, orientation)=> {
    let imposition = 0;
    console.log(ships);
    console.log(ship);
    if (ships.length >0){
        ships.forEach(function(currentValue){
            imposition = currentValue.location.filter(element => ship.location.includes(element));
            console.log("this is imposition" +imposition);
        });
    }
    if (imposition == 0){
        return ship;
    }else{
        createAShip(lengthOfShip, owner, orientation, ships)
    }

    
}

export { displayBoard, markHitLocation, clearMessage, generateSpot, createAShip, checkSuperImposition }

const renderBoard = (board, parent) => {
    for(let i = 0; i <= board.numRows; i++) {
        const row = document.createElement("tr")
       
        row.setAttribute("id", `row-${i}`)
        row.setAttribute("class", "row")
        for(let j = 0; j <= board.numColumns; j++) {
            const box = document.createElement('td')
            if (i==0){
                if (j!=0){
                    box.innerHTML = j-1
                }
                
            }
            if (j==0){
                if (i!=0){
                    box.innerHTML = i-1
                }
            }
            box.setAttribute("id", `${board.owner}${i}${j}`)
            box.setAttribute("class", "box")
            row.appendChild(box)
        }
        parent.appendChild(row)
    }
    
    board.ships.forEach(ship => {
        placeShip(ship)
    });
    
}

const placeShip = (ship) => {
    for(let i = 0; i < ship.location.length; i++) {
        const box = document.getElementById(ship.location[i])
        box.setAttribute("class", "box-ship")
    }
}

const markHitLocation = (hitSpot) => {
    const location = document.getElementById(hitSpot)
    location.innerHTML = "X"
}


export { renderBoard, markHitLocation }
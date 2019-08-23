class Ship {

    constructor(length, location) {
        this.length = length
        this.location = location
        this.hits = 0
    }

    isHit(position) {
        if(this.location.includes(position)) {
            this.hits++
            return true
        } 
        return false;
    }
    isSunk() {
        if(this.hits >= this.location.length) {
            return true
        }
        return false
    
    }
}

export default Ship
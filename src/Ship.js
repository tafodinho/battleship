class Ship {

    constructor(length, location) {
        this.length = length
        this.location = location
        this.hits = 0
    }

    hit(position) {
        if (this.location.contains(position)){
            hits++;
        }
    }
    isSunk() {
        if (this.hits == this.length){
            return true;
        }
        return false;
    }
}

export default Ship
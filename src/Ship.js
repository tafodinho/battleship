class Ship {

    constructor(length, location) {
        this.length = length
        this.location = location
        this.hits = 0
    }
    hit(position) {
        if (this.location.contains(position)){
            hits++;
            return true;
        }
        return false;
    }
    isSunk() {
        if (this.hits == this.length){
            return true;
        }
        return false;
    }
}

export default Ship
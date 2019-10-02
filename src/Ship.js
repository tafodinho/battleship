class Ship {
  constructor(location) {
    this.location = location;
    this.length = location.length;
    this.hits = 0;
  }

  isHit(position) {
    if (this.location.includes(position)) {
      this.hits += 1;
      return true;
    }
    return false;
  }

  isSunk() {
    if (this.hits >= this.location.length) {
      return true;
    }
    return false;
  }
}

export default Ship;

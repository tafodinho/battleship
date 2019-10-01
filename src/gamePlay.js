class GamePlay {
  constructor(playerBorad, ComputerBoard) {
    this.playerBorad = playerBorad;
    this.ComputerBoard = ComputerBoard;
  }

  playBattleShip() {
    do {
      console.log('in game');
    }
    while (!this.isGameOver());
  }

  isGameOver() {
    if (this.ComputerBoard.isAllShipSunk() || this.playerBorad.isAllShipSunk()) {
      return true;
    }
    return false;
  }
}
export default GamePlay;

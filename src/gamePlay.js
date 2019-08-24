
import {createAShip,checkSuperImposition } from './ultility'
class GamePlay {
    
    constructor(playerBorad, ComputerBoard) {
        this.playerBorad = playerBorad
        this.ComputerBoard = ComputerBoard;
    }

    playBattleShip() {
        do {
            console.log("in game");
          }
          while (!isGameOver());
          
    }
    isGameOver(){
        if(this.ComputerBoard.isAllShipSunk() || this.playerBorad.isAllShipSunk()){
            return true;
        }
        return false;
    }
    generateShips(owner){
        let ships =[];
        // genereate two ships with length 4
        for(let i =0; i<2; i++){
            ships.push(createAShip(4,owner,"horizontal",ships))
        }
         // genereate three ships with length 3
        for(let i =0; i<2; i++){
            ships.push(createAShip(3,owner,null,ships))
        }
          // genereate 2 ships with length 2
        for(let i =0; i<2; i++){
            ships.push(createAShip(2,owner,"horizontal",ships))
        }
          // genereate 4 ships with length 1
        for(let i =0; i<3; i++){
            ships.push(createAShip(1,owner,null,ships))
        }
        console.log(ships);
    }

}
export default GamePlay
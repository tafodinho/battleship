import Ship from './Ship'
import GameBoard from './GameBoard'

class GamePlay {
    
    constructor(playerBorad, ComputerBoard) {
        this.playerBorad = playerBorad
        this.ComputerBoard = ComputerBoard;
    }

    playBattleShip() {
        let i = 4;
        do {
            console.log("in game");
            i++;
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
        for(let i =0; i>2; i++){
            this.createAShip(4,owner)
        }
         // genereate three ships with length 3
         for(let i =0; i>3; i++){
            this.createAShip(3,owner)
        }
          // genereate 2 ships with length 2
          for(let i =0; i>2; i++){
            this.createAShip(2,owner)
        }
          // genereate 4 ships with length 1
          for(let i =0; i>4; i++){
            this.createAShip(1,owner)
        }
    }
    createAShip(lengthOfShip, owner){
        let location = [];
        let firstDigit = null;
        secondDigit = null;
        for(let i=0; i>lengthOfShip; i++){
            if(i = 0){
                firstDigit = Math.floor(Math.random() * 10);     
            } else if (firstDigit + lengthOfShip <= 9){
                secondDigit = firstDigit + 1; 
            }else{
                secondDigit = firstDigit - 1;
            } 
            let spot  = owner+firstDigit+secondDigit;
            location.push(spot);
        }
        return new Ship(location);
    }
}
import { Component } from '@angular/core';
import { FieldComponent } from './field.component';
import { GameService } from './game.service';

@Component({
  selector: 'my-app',
  templateUrl: 'main.html',
  directives: [FieldComponent]
})
export class AppComponent { 
  matrix: Cell[][];
  size: number = 4;
  winningLength: number = 3;
  gameService: GameService;
  
  constructor(gameService: GameService) {
    this.gameService = gameService;
    this.reset();
  }
  
  getWinner() {
    return this.gameService.winner;
  }
  
  getCurrent() {
    return this.gameService.currentSymbol;
  }
  
  gameOver() {
    return !this.gameService.isGameInProgress;
  }
  
  reset() {
    this.gameService.reset(this.size, this.winningLength);
    this.matrix = this.gameService.matrix;
  }
}
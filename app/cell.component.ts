import { Component, Input } from '@angular/core';
import { GameService } from './game.service';
import { Cell } from './cell';

@Component({
  selector: 'cell',
  templateUrl: 'cell.html'
})
export class CellComponent {
  @Input()
  cell: Cell;
  gameService: GameService;
  
  constructor(gameService: GameService) {
    this.gameService = gameService;
  }
  
  step() {
    if (this.gameService.isGameInProgress && this.cell.step(this.gameService.currentSymbol)) {
      this.gameService.checkWinningCombination();
      this.gameService.switchCurrentSymbol();
    };
  }
}
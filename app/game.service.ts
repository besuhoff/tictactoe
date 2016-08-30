import { Injectable } from '@angular/core';
import { Cell, Symbol } from './cell';

@Injectable()
export class GameService {
  matrix: Number[][];
  currentSymbol: Symbol = 'x'; 
  isGameInProgress: boolean = false;
  winner: Symbol = ' ';
  protected _lineSpread: Array = [];
  
  reset(size: number, winningLength: number): void {
    this.currentSymbol = 'x';
    this.winner = undefined;
    this.isGameInProgress = true;
    this.matrix = new Array(size);
    for (let i: number = 0; i < size; i++) {
      this.matrix[i] = new Array(size);
      
      for (let j: number = 0; j < size; j++) {
        this.matrix[i][j] = new Cell(i, j);
      }
    }
    
    this._lineSpread = [];
    
    // Copy horizontal and vertical lines into line spread
    for (let i: number = 0; i < size; i++) {
      let lineSouth = new Array(size),
        lineEast = new Array(size);
      
      for (let j: number = 0; j < size; j++) {
        lineEast[j] = this.matrix[i][j];
        lineSouth[j] = this.matrix[j][i];
      }
      
      for (let j: number = 0; j <= size - winningLength; j++) {
        this._lineSpread.push(
          lineEast.slice(j, j + winningLength),
          lineSouth.slice(j, j + winningLength)
        );
      }
    }

    // Copy diagonal sections into line spread
    for (let i: number = winningLength - 1; i < size; i++) {
      let lineNorthEast = [],
        lineNorthWest = [],
        lineNorthEastBottom = [],
        lineNorthWestBottom = [];
        
      for (let j: number = 0; j <= i; j++) {
        lineNorthEast.push(this.matrix[i - j][j]);
        lineNorthWest.push(this.matrix[i - j][size - j - 1]);
        if (i !== size - 1) {
          lineNorthEastBottom.push(this.matrix[size - j - 1][size - i - 1 + j]);
          lineNorthWestBottom.push(this.matrix[size - j - 1][i - j]);
        }
      }
      
      for (let j: number = 0; j <= i + 1 - winningLength; j++) {
        this._lineSpread.push(
          lineNorthEast.slice(j, j + winningLength),
          lineNorthWest.slice(j, j + winningLength)
        );

        if (i !== size - 1) {
          this._lineSpread.push(
            lineNorthEastBottom.slice(j, j + winningLength),
            lineNorthWestBottom.slice(j, j + winningLength)
          );
        }
      }
    }
  }
  
  checkWinningCombination() {
    let winningLine = this._lineSpread.filter(line => line.every(cell => cell.value === this.currentSymbol))[0];
    
    if (winningLine) {
      winningLine.forEach(function(cell) {
        cell.won = true;
      });
      
      this.winner = this.currentSymbol;
      this.isGameInProgress = false;
    } else {
      if (!this.matrix.some(line => line.some(cell => cell.value === ' '))) {
        this.isGameInProgress = false;
      }
    }
    
    return !!winningLine;
  }
  
  switchCurrentSymbol() {
    this.currentSymbol = this.currentSymbol === 'x' ? 'o' : 'x';
  }
}
export enum Symbol { ' ', 'x', 'o' };

export class Cell {
  value: Symbol = ' ';
  x: number = 0;
  y: number = 0;
  
  constructor(x: number, y: number) {
    [this.x, this.y] = [x, y];
  }
  
  step(symbol: Symbol) {
    if (this.value === ' ') {
      this.value = symbol;
      return true;
    } else {
      return false;
    }
  }
}
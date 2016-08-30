export enum Symbol { 0, 1 };

export class Cell {
  value: Symbol;
  x: number = 0;
  y: number = 0;
  
  constructor(x: number, y: number) {
    [this.x, this.y] = [x, y];
  }
  
  step(symbol: Symbol) {
    if (this.value === undefined) {
      this.value = symbol;
      return true;
    } else {
      return false;
    }
  }
}

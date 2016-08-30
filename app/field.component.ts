import { Component, Input } from '@angular/core';
import { CellComponent } from './cell.component';

@Component({
  selector: 'field',
  templateUrl: 'field.html',
  directives: [CellComponent]
})
export class FieldComponent {
  @Input()
  matrix: Number[][];
}
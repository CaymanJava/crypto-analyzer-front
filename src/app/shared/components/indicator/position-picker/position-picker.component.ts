import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-position-picker',
  templateUrl: './position-picker.component.html',
  styleUrls: ['./position-picker.component.scss']
})
export class PositionPickerComponent implements OnInit {

  @Input() positions: string[];
  @Input() label = 'Positions';
  @Input() onlyEntries = false;
  @Input() onlyExits = false;
  @Input() onlyLongPositions = false;
  @Input() onlyShortPositions = false;

  @Output() onPositionSelected: EventEmitter<string[]> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  positionsSelected(positions: string[]) {
    this.positions = positions;
    this.onPositionSelected.emit(this.positions);
  }

}

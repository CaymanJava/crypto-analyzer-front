import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-moving-average-type-picker',
  templateUrl: './moving-average-type-picker.component.html'
})
export class MovingAverageTypePickerComponent implements OnInit {

  @Input() configForm: FormGroup;
  @Input() key: string;
  @Input() label = 'Moving average type';
  @Input() fullList = false;
  @Output('movingAverageChange') movingAverageChange: EventEmitter<string> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  onChange(type) {
    this.movingAverageChange.emit(type);
  }

}

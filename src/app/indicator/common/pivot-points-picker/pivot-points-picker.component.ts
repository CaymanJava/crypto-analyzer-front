import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-pivot-point-picker',
  templateUrl: './pivot-points-picker.component.html'
})
export class PivotPointsPickerComponent implements OnInit {

  @Input() configForm: FormGroup;
  @Input() key: string;
  @Input() label = 'Pivot point type';

  constructor() { }

  ngOnInit() {
  }

}

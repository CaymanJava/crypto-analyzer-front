import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-shift-type-picker',
  templateUrl: './shift-type-picker.component.html'
})
export class ShiftTypePickerComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() key: string;

  constructor() { }

  ngOnInit() {
  }

}

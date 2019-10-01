import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-time-unit-picker',
  templateUrl: './time-unit-picker.component.html'
})
export class TimeUnitPickerComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() key: string;
  @Input() label = 'Update time unit';
  @Input() disabled = false;

  constructor() {
  }

  ngOnInit() {
  }

  onChange(type) {
    this.form.get(this.key).setValue(type);
  }

}
